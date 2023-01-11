import { createCommand } from 'commander';
import { exec } from '../exec';

export const start = createCommand('start');

export const startCommand = () => {
  start.option('-c, --configFile <config>', 'config file path');
  start.option('-p, --compiler <compiler>', 'compiler name');
  start.option('-m, --mode <mode>', 'mode');

  start.description('run the app development mode');
  start.action(exec);
  return start;
};
