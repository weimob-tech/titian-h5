import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';

const sharedConfig = {
  external: [
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    ...Object.keys(require('./package.json').dependencies),
    'isomorphic-git/http/node',
  ],
  plugins: [nodeResolve(), typescript()],
};
const config: RollupOptions = {
  input: './src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'cjs',
  },
  ...sharedConfig,
};

export default [config];
