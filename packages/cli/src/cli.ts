import { registerCommands } from './commands';
import { prepare } from './prepare';
import logger from './utils/logger';

process.on('unhandleRejection', error => {
  logger.error('unhandleRejection', error);
});

const cli = async () => {
  try {
    await prepare();
    registerCommands();
  } catch (e) {
    logger.error('cli exec error: ', e.message);
  }
};

export default cli;
