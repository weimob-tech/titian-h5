import { createCommand } from 'commander';
import { exec } from '../exec';

export const release = createCommand('release');

export const releaseCommand = () => {
  release.option('-c, --configFile <config>', 'config file path');
  release.option('-p, --compiler <compiler>', 'compiler name');
  release.option('-m, --mode <mode>', 'mode');

  release.description('run the app development mode');
  release.action(exec);
  return release;
};
