import { spawn as spawn$0, SpawnOptions } from 'child_process';
import type { CommonOptions } from 'execa';
import logger from './logger';

export const spawn = (command: string, args: string[], options: SpawnOptions) => {
  const win32 = process.platform === 'win32';
  const cmd = win32 ? 'cmd' : command;
  const cmdArgs = win32 ? ['/c'].concat(command, args) : args;

  logger.debug('spawn', `exec command: ${command} ${args.join(' ')}`);

  return spawn$0(cmd, cmdArgs, options);
};

export function exec(bin: string, args: string[], opts: CommonOptions<'utf8'> = {}) {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const execa = require('execa');
  return execa(bin, args, { stdio: 'inherit', ...opts });
}
