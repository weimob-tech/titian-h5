import * as fs from 'fs';
import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import { RollupOptions, OutputOptions } from 'rollup';

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
    plugins: [commonjs(), nodeResolve(), ...(externalConfig.plugins ? externalConfig.plugins : [])],
  };

  return { ...esmConfig };
}

export default [
  basicConfig('umd'),
  basicConfig('umd', { output: { file: `dist/index.umd.min.js` }, plugins: [terser()] }),
];
