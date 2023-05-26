import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions } from 'rollup';

const sharedConfig = {
  external: [
    // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    ...Object.keys(require('./package.json').dependencies),
  ],
  plugins: [
    nodeResolve(),
    typescript({
      allowSyntheticDefaultImports: true,
    }),
  ],
};

const config: RollupOptions = {
  input: './src/index.ts',
  output: {
    file: `dist/index.js`,
    format: 'cjs',
    exports: 'auto',
  },
  ...sharedConfig,
};

const cliConfig: RollupOptions = {
  input: './src/cli.ts',
  output: {
    file: 'dist/cli.js',
    format: 'cjs',
    exports: 'auto',
  },
  ...sharedConfig,
};

export default [config, cliConfig];
