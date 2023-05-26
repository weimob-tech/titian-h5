import { existsSync } from 'fs';
import { resolve } from 'path';
import { mkdirp } from 'fs-extra';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import npminstall from 'npminstall';
import * as readPkgUp from 'read-pkg-up';
import * as semver from 'semver';
import { normalizePath } from '../utils';
import logger from '../utils/logger';
import { getPackageRegistry } from '../utils/npminfo';

export interface PackageOptions {
  targetPath: string;
  storeDir?: string;
  version?: string;
  name: string;
}

interface PKG {
  name: string;
  version: string;
}

export interface InstallOptions {
  pkgs: PKG[];
  targetDir?: string; // 目标文件夹
  binDir?: string; // bin 文件夹
  register?: string;
  debug?: boolean;
  storeDir?: string;
  ignoreScripts?: boolean;
}

export default class Package {
  targetPath: string;

  storeDir?: string;

  version: string;

  name: string;

  cacheFilePathPrefix: string;

  registryUrl: string;

  constructor(options: PackageOptions) {
    this.targetPath = options.targetPath;
    this.storeDir = options.storeDir || `${this.targetPath}/node_modules`;
    this.name = options.name;
    this.version = options.version || 'latest';
    this.cacheFilePathPrefix = this.name.replace('/', '_');

    if (!this.name) {
      logger.error('package name is required');
      process.exit(1);
    }
    this.registryUrl = getPackageRegistry();
    if (!semver.valid(this.version)) {
      logger.error(`invalid package version: ${this.version}, use latest instead`);
      this.version = 'latest';
    }
  }

  private getSpecificCacheFilePath(version: string) {
    // npminstall 特殊文件夹路径
    if (this.storeDir) {
      return resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${version}@${this.name}`);
    }
    return '';
  }

  private cacheFilePath() {
    if (this.storeDir) {
      return resolve(this.storeDir, `_${this.cacheFilePathPrefix}@${this.version}@${this.name}`);
    }
    return '';
  }

  async prepare() {
    if (this.storeDir && !existsSync(this.storeDir)) {
      await mkdirp(this.storeDir);
      logger.debug('mkdirp store dir:', this.storeDir);
    }
  }

  async exists() {
    if (this.storeDir) {
      await this.prepare();
      return existsSync(this.getSpecificCacheFilePath(this.version));
    }

    return false;
  }

  async install() {
    await this.prepare();

    return npminstall({
      root: this.storeDir,
      storeDir: this.storeDir,
      registry: this.registryUrl,
      debug: true,
      pkgs: [
        {
          name: this.name,
          version: this.version,
        },
      ],
    } as InstallOptions);
  }

  async update() {
    logger.info(`check package update: ${this.name}@${this.version}`);
    await this.prepare();

    const cacheFilePath = this.getSpecificCacheFilePath(this.version);

    if (existsSync(cacheFilePath)) {
      logger.info('package is already installed');
      return Promise.resolve();
    }

    await npminstall({
      root: this.targetPath,
      storeDir: this.storeDir,
      registry: this.registryUrl,
      pkgs: [
        {
          name: this.name,
          version: this.version,
        },
      ],
    } as InstallOptions);

    logger.info(`updated package: ${this.name}@${this.version}`);
    return Promise.resolve();
  }

  getRootFilePath(customPath?: string) {
    const getRootFile = (target: string = this.targetPath): string | undefined => {
      const { packageJson: pkg } = readPkgUp.sync({ cwd: target }) as readPkgUp.ReadResult;
      if (pkg && pkg.main) {
        const rootFile = normalizePath(resolve(target, pkg.main));
        logger.debug(`root exec file: ${rootFile}`);
        return rootFile;
      }
      return '';
    };

    if (customPath) {
      return getRootFile(customPath);
    }

    if (this.storeDir) {
      return getRootFile(this.cacheFilePath());
    }
    return getRootFile();
  }
}
