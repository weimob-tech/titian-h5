import { performance } from 'perf_hooks';
import chalk from 'chalk';
import { Command } from 'commander';
import logger from '../utils/logger';
import { spawn } from '../utils/spawn';
import { resolveConfig, InlineConfig } from './config';

export async function exec(args$0: InlineConfig, options$0: InlineConfig | Command, command$0: Command): Promise<void> {
  const command: Command = command$0 || options$0;
  const options: InlineConfig = (command$0 ? options$0 : args$0) as InlineConfig;
  const commandName = command.name();
  const config = await resolveConfig(
    { ...options, args: command.args },
    commandName,
    commandName === 'start' ? 'development' : 'production',
  );

  const compilerVersion = config.version || 'latest';

  logger.info(`exec command: ${commandName}`);
  logger.info(`use compiler: ${config.compiler}@${compilerVersion}`);
  logger.debug(`compiler path: ${config.compilerPath}`);

  const code = `require('${config.compilerPath}').${commandName}.call(null, ${JSON.stringify(
    config,
  )}, '${commandName}')`;
  const child = spawn('node', ['-e', code], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  child.on('error', err => {
    logger.error(`${command} exec error: `, err);
    process.exit(1);
  });

  child.on('exit', e => {
    logger.info(`child process exited with code ${e}`);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (global.__start_time as string) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      logger.info(`run time is ${chalk.yellowBright(`${(performance.now() - global.__start_time).toFixed(2)}ms`)}`);
    }
    process.exit(e ?? 1);
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  if (global.__start_time as string) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line no-underscore-dangle
    logger.info(`ready in ${chalk.yellowBright(`${(performance.now() - global.__start_time).toFixed(2)}ms`)}`);
  }
}

export default {};
