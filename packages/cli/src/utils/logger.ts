import chalk from 'chalk';
import * as log4js from 'log4js';
import type { Logger } from 'log4js';
import { v4 } from 'uuid';

const key = `${chalk.magentaBright('titian')}`;

log4js.configure({
  appenders: {
    [key]: { type: 'stdout' },
  },
  categories: {
    default: { appenders: [key], level: 'info' },
    [key]: { appenders: [key], level: 'info' },
  },
});

const logger: Logger = log4js.getLogger(key);

logger.level = process.env.TITIAN_LOG_LEVEL || 'info';

logger.addContext('uid', v4());

export default logger;
