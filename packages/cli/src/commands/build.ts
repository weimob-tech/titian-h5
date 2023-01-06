import { createCommand } from 'commander';
import { exec } from '../exec';

export const build = createCommand('build');

export const buildCommand = () => {
  build.option('-c, --configFile <config>', 'config file path');
  build.option('-p, --compiler <compiler>', 'compiler name');
  build.option('-m, --mode <mode>', 'mode');

  build.description('run the app development mode');
  build.action(exec);
  return build;
};
