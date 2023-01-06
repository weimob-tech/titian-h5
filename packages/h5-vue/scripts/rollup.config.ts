import * as fs from 'fs';
import * as path from 'path';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions, OutputOptions } from 'rollup';

function basicConfig(format: OutputOptions['format'] = 'esm', extenalConfig = {}) {
  const packageJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));

  const esmConfig: RollupOptions = {
    input: './src/index.ts',
    output: {
      file: `dist/index.${format}.js`,
      format,
      sourcemap: true,
      ...(format === 'umd' ? { name: 'TitianH5Vue', inlineDynamicImports: true } : {}),
      banner: `console.log('%c @titian-design/vue: ${packageJSON.version}', 'background: #222; color: #bada55');`,
    },
    external: ['vue'],
    plugins: [
      typescript({
        tsconfig: path.join(process.cwd(), 'src/tsconfig.json'),
        compilerOptions: {
          declaration: true,
        },
      }),
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
