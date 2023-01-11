import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';

const config: RollupOptions = {
  input: './src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'cjs',
  },
  plugins: [typescript()],
};

export default [config];
