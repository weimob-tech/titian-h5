import * as fs from 'fs';
import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import MagicString, { SourceMap } from 'magic-string';
import { RollupOptions, Plugin, OutputOptions } from 'rollup';

interface ReplaceOptions {
  sourceMap?: boolean;
  sourcemap?: boolean;
}

function replace(options: ReplaceOptions = {}): Plugin {
  const pattern = /return isSupported;/g;
  const replacement = `return isSupported && [ 'onchange', 'oninput', 'onfocus', 'onblur', 'onclose', 'oncancel', 'onselect', 'onsearch', 'onload'].indexOf(eventName) === -1;`;

  function codeHasReplacements(code: string, _id: string, magicString: MagicString) {
    let result = false;
    let match: RegExpExecArray;

    // eslint-disable-next-line no-cond-assign
    while ((match = pattern.exec(code))) {
      result = true;
      const start = match.index;
      const end = start + match[0].length;
      magicString.overwrite(start, end, replacement);
    }
    return result;
  }

  function isSourceMapEnabled() {
    return options.sourceMap !== false && options.sourcemap !== false;
  }

  function executeReplacement(code: string, id: string) {
    const magicString = new MagicString(code);

    if (!codeHasReplacements(code, id, magicString)) {
      return null;
    }
    const result: { map?: SourceMap; code?: string } = { code: magicString.toString() };

    if (isSourceMapEnabled()) {
      result.map = magicString.generateMap({ hires: true });
    }

    return result;
  }

  return {
    name: 'replace',
    transform(code, id) {
      return executeReplacement(code, id);
    },
  };
}

function basicConfig(format: OutputOptions['format'] = 'esm', extenalConfig = {}) {
  const packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

  const esmConfig: RollupOptions = {
    input: './src/index.tsx',
    output: {
      file: `dist/index.${format}.js`,
      format,
      sourcemap: true,
      ...(format === 'umd' ? { name: 'TitianH5', inlineDynamicImports: true } : {}),
      banner: `console.log('%c @titian-design/mobile-react: ${packageJSON.version}', 'background: #222; color: #bada55');`,
    },
    external: ['react', 'react-dom'],
    plugins: [
      typescript({
        tsconfig: path.join(process.cwd(), 'src/tsconfig.json'),
        compilerOptions: {
          declaration: true,
        },
      }),
      replace(),
      ...(format === 'umd'
        ? [
            commonjs({
              include: ['titian-h5/dist/components/*.js'],
            }),
            nodeResolve(),
          ]
        : []),
    ],
  };

  return { ...esmConfig, ...extenalConfig };
}

export default [basicConfig('esm'), basicConfig('cjs'), basicConfig('umd')];
