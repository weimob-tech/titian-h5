import { existsSync, unlinkSync, writeFileSync } from 'fs';
import { join, resolve, dirname, isAbsolute, extname } from 'path';
import { performance } from 'perf_hooks';
import { pathToFileURL } from 'url';
import { build, OnResolveArgs, OnResolveResult, PluginBuild } from 'esbuild';
import * as readPkgUp from 'read-pkg-up';
import type { HookFun } from '../models/Command';
import Package from '../models/package';
import { dynamicImport, isDir, isObject, normalizePath } from '../utils';
import logger from '../utils/logger';

export interface UserConfig<T = HookFun> {
  root?: string;
  mode?: string;
  cacheDir?: string;
  compiler?: string;
  version?: string;
  hooks?: T[];
  projectId?: string | number;
  mainPackage?: string;
}

export type ResolvedConfig = Readonly<
  UserConfig & {
    configFile: string | undefined;
    configFileDependencies?: string[];
    inlineConfig?: InlineConfig;
    compilerPath?: string | undefined;
  }
>;

export interface InlineConfig extends UserConfig {
  configFile?: string | boolean;
  compiler?: string;
  mode?: string;
  args?: string[];
}

export type UserConfigFn = (env: ConfigEnv) => UserConfig | Promise<UserConfig>;

export type UserConfigExport = UserConfig | Promise<UserConfig> | UserConfigFn;

export interface ConfigEnv {
  command: string;
  mode: string;
}

async function bundleConfigFile(fileName: string, isESM = false) {
  const result = await build({
    absWorkingDir: process.cwd(),
    entryPoints: [fileName],
    outfile: 'out.js',
    write: false,
    platform: 'node',
    bundle: true,
    format: isESM ? 'esm' : 'cjs',
    sourcemap: 'inline',
    metafile: true,
    plugins: [
      {
        name: 'externalize-deps',
        setup(_build: PluginBuild) {
          _build.onResolve(
            { filter: /.*/ },
            (args: OnResolveArgs): OnResolveResult | null | undefined | Promise<OnResolveResult | null | undefined> => {
              const id = args.path;
              if (id[0] !== '.' && !isAbsolute(id)) {
                return {
                  external: true,
                };
              }
              return null;
            },
          );
        },
      },
    ],
  });
  const { text } = result.outputFiles[0];
  return { code: text, dependencies: result.metafile ? Object.keys(result.metafile.inputs) : [] };
}

interface NodeModuleWithCompile extends NodeModule {
  _compile(code: string, filename: string): any;
}

async function loadConfigFromBundledFile(fileName: string, bundledCode: string): Promise<UserConfig> {
  logger.trace(`Loading config from bundled file: ${fileName}`);
  const extension = extname(fileName);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const defaultLoader = require.extensions[extension]!;
  require.extensions[extension] = (module: NodeModule, filename: string) => {
    if (filename === fileName) {
      // eslint-disable-next-line no-underscore-dangle
      (module as NodeModuleWithCompile)._compile(bundledCode, filename);
    } else {
      defaultLoader(module, filename);
    }
  };

  // clear cache in case of server restart
  delete require.cache[require.resolve(fileName)];
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires, import/no-dynamic-require
  const raw = require(fileName);
  // eslint-disable-next-line no-underscore-dangle
  return raw.__esModule ? raw.default : raw;
}

export async function loadConfigFromFile<T = unknown>(
  configEnv: ConfigEnv,
  configFile?: string,
  configRoot: string = process.cwd(),
): Promise<{ path: string; config: UserConfig<T>; dependencies: string[] }> {
  const start = performance.now();
  const getTime = () => `${(performance.now() - start).toFixed(2)}ms`;

  let isESM = false;
  let isTS = false;
  let resolvedPath: string | undefined;
  let dependencies: string[] = [];
  try {
    const { packageJson: pkg } = readPkgUp.sync({ cwd: __dirname }) as readPkgUp.ReadResult;
    if (pkg && pkg.type === 'module') {
      isESM = true;
    }
  } catch (error) {
    logger.error('loadConfigFromFile', error.message);
  }

  if (configFile) {
    resolvedPath = resolve(configFile);
    isTS = configFile.endsWith('.ts');

    if (configFile.endsWith('.mjs')) {
      isESM = true;
    }
  } else {
    const jsconfig = resolve(configRoot, 'titian.config.js');
    if (existsSync(jsconfig)) {
      resolvedPath = jsconfig;
    }

    if (!resolvedPath) {
      const mjsconfig = resolve(configRoot, 'titian.config.mjs');
      if (existsSync(mjsconfig)) {
        resolvedPath = mjsconfig;
        isESM = true;
      }
    }

    if (!resolvedPath) {
      const tsconfigFile = resolve(configRoot, 'titian.config.ts');
      if (existsSync(tsconfigFile)) {
        resolvedPath = tsconfigFile;
        isTS = true;
      }
    }

    if (!resolvedPath) {
      const cjsConfigFile = resolve(configRoot, 'titian.config.cjs');
      if (existsSync(cjsConfigFile)) {
        resolvedPath = cjsConfigFile;
        isESM = false;
      }
    }
  }

  if (!resolvedPath) {
    logger.error('config file not found');
    process.exit(1);
  }

  try {
    let userConfig: UserConfigExport | undefined;

    if (isESM) {
      const fileUrl = pathToFileURL(resolvedPath);
      const bundled = await bundleConfigFile(resolvedPath, true);
      dependencies = bundled.dependencies;
      if (isTS) {
        writeFileSync(`${resolvedPath}.js`, bundled.code);
        userConfig = (await dynamicImport(`${fileUrl}.js?t=${Date.now()}`)).default;
        unlinkSync(`${resolvedPath}.js`);
        logger.debug(`Ts + native esm config load in ${getTime()}`, fileUrl);
      } else {
        userConfig = (await dynamicImport(`${fileUrl}?t=${Date.now()}`)).default;
        logger.debug(`native esm config load in ${getTime()}`, fileUrl);
      }
    }

    if (!userConfig) {
      const bundled = await bundleConfigFile(resolvedPath);
      dependencies = bundled.dependencies;
      userConfig = await loadConfigFromBundledFile(resolvedPath, bundled.code);
      logger.debug(`bundled config file loaded in ${getTime()}`);
    }

    const config = await (typeof userConfig === 'function' ? userConfig(configEnv) : userConfig);
    if (!isObject(config)) {
      logger.error('config file must return an object');
      process.exit(1);
    }
    return { path: normalizePath(resolvedPath), dependencies, config };
  } catch (error) {
    logger.error(`failed to load config from ${resolvedPath}`, error);
    return { path: normalizePath(resolvedPath), dependencies, config: {} };
  }
}

export function mergeConfig(defaults: Record<string, any>, overrides: Record<string, any>): Record<string, any> {
  return { ...defaults, ...overrides };
}

export async function resolveConfig(inlineConfig: InlineConfig, command: string, defaultMode = 'development') {
  let config = { ...inlineConfig };
  let configFileDependencies: string[] = [];
  let mode = inlineConfig.mode || defaultMode;

  const configEnv: ConfigEnv = {
    mode,
    command,
  };

  let { configFile } = config;

  if (configFile !== false) {
    const loadResult = await loadConfigFromFile(configEnv, configFile as string, config.root);
    if (loadResult) {
      config = mergeConfig(loadResult.config, config);
      configFile = loadResult.path;
      configFileDependencies = loadResult.dependencies;
    }
  }

  mode = inlineConfig.mode || config.mode || mode;
  configEnv.mode = mode;

  if (mode === 'production') {
    process.env.NODE_ENV = 'production';
  }

  const resolvedRoot = normalizePath(config.root ? resolve(config.root) : process.cwd());

  const { path: pkgPath } = readPkgUp.sync({ cwd: resolvedRoot }) as readPkgUp.ReadResult;
  let cacheDir: string | undefined;

  if (config.cacheDir) {
    cacheDir = resolve(resolvedRoot, config.cacheDir);
  } else if (pkgPath) {
    cacheDir = join(dirname(pkgPath), 'node_modules/.titian-cache');
  } else {
    cacheDir = join(resolvedRoot, '.titian-cache');
  }

  // compiler path
  const { compiler } = config;

  if (!compiler) {
    logger.error(`compiler config not found`);
    process.exit(1);
  }

  let compilerPath: string | undefined;
  if (await isDir(compiler)) {
    compilerPath = compiler;
    const { packageJson: pkg } = readPkgUp.sync({ cwd: compiler }) as readPkgUp.ReadResult;
    const pkgInfo = new Package({
      targetPath: compiler,
      name: pkg.name || '',
      version: pkg.version,
    });
    compilerPath = pkgInfo.getRootFilePath(compiler);
    logger.debug(`local + compiler found in ${compilerPath}`);
  }

  if (!compilerPath) {
    const compilerPathInNodeModules = normalizePath(resolve(resolvedRoot, 'node_modules', compiler));
    if (existsSync(compilerPathInNodeModules)) {
      const pkgInfo = new Package({
        targetPath: compilerPathInNodeModules,
        name: compiler,
        version: config.version,
      });
      compilerPath = pkgInfo.getRootFilePath(compilerPathInNodeModules);
      logger.debug(`module + compiler found in ${compilerPath}`);
    }
  }

  if (!compilerPath) {
    const pkgInfo = new Package({
      targetPath: cacheDir,
      name: compiler,
      version: config.version,
    });
    const isExists = await pkgInfo.exists();

    if (isExists) {
      await pkgInfo.update();
    } else {
      await pkgInfo.install();
    }

    compilerPath = pkgInfo.getRootFilePath();
  }

  if (!compilerPath) {
    logger.error(`compiler not found`);
    process.exit(1);
  }

  const resolved: ResolvedConfig = {
    ...config,
    configFile: configFile ? normalizePath(configFile as string) : undefined,
    configFileDependencies: configFileDependencies.map(name => normalizePath(resolve(name))),
    inlineConfig,
    root: resolvedRoot,
    mode,
    compiler,
    compilerPath,
  };

  return resolved;
}

export function defineConfig(config: UserConfigExport): UserConfigExport {
  return config;
}
