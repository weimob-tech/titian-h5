import * as fs from 'fs';
import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { RollupOptions, OutputOptions } from 'rollup';

function autoDefineCustomElements() {
  return {
    name: 'auto-define-custom-elements',
    transform(code, id) {
      const inputPath = path.join('dist-custom-elements', 'index.js');
      if (id.endsWith(inputPath)) {
        const lines = code.split('\n');
        const index = lines.findIndex(line => /^export.*defineCustomElements.*/.test(line));
        lines.splice(index, 0, 'defineCustomElements();');
        return lines.join('\n');
      }
      return code;
    },
  };
}

function basicConfig(format: OutputOptions['format'] = 'esm', externalConfig: RollupOptions = {}) {
  const packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

  const esmConfig: RollupOptions = {
    input: './dist-custom-elements/index.js',
    output: {
      file: `dist/index.umd.js`,
      format,
      sourcemap: true,
      name: 'TitianH5Basic',
      inlineDynamicImports: true,
      banner: `console.log('%c titian-h5: ${packageJSON.version}', 'background: #222; color: #bada55');`,
      ...(externalConfig.output ? externalConfig.output : {}),
    },
    plugins: [autoDefineCustomElements(), commonjs(), nodeResolve()],
  };

  return { ...esmConfig };
}

export default [
  basicConfig('umd'),
  basicConfig('umd', { output: { file: `dist/index.umd.min.js` }, plugins: [terser()] }),
];
