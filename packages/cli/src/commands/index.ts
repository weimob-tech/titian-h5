import { Command as Command$0 } from 'commander';
import type { Command } from 'commander';
import * as readPkgUp from 'read-pkg-up';
import logger from '../utils/logger';
import { buildCommand } from './build';
import { releaseCommand } from './release';
import { startCommand } from './start';

const registerDebug = (command: Command) => {
  const { packageJson: pkg } = readPkgUp.sync({ cwd: __dirname }) as readPkgUp.ReadResult;

  if (pkg && pkg.bin) {
    command
      .name(Object.keys(pkg.bin)[0])
      .usage('<command> [options]')
      .version(pkg.version || '')
      .option('-d, --debug', 'enable debug mode', false);
    return;
  }
  logger.error('cli package.json not found');
  process.exit(1);
};

const addOptionsListener = (command: Command) => {
  command.on('option:debug', function handleDebug() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const that = this as Command;
    const { debug } = that.opts();
    if (debug) {
      process.env.TITIAN_LOG_LEVEL = 'debug';
      logger.level = 'debug';
    }
  });

  command.on('command:*', (obj: string[]) => {
    const availableCommands = command.commands.map(cmd => cmd.name());
    logger.error(`not support command: ${obj[0]}`);

    if (availableCommands.length > 0) {
      logger.info(`support commands: ${availableCommands.join(', ')}`);
    }
  });
};

export const registerCommands = () => {
  const program = new Command$0();

  program.addCommand(startCommand());

  program.addCommand(buildCommand());

  program.addCommand(releaseCommand());

  registerDebug(program);

  addOptionsListener(program);

  program.parse(process.argv);
};

export default {};
