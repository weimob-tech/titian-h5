import { existsSync } from 'fs';
import chalk from 'chalk';
import type { ParsedArgs } from 'minimist';
import * as readPkgUp from 'read-pkg-up';
import userHome from 'user-home';
import logger from './utils/logger';
import { getPackageRegistry } from './utils/npminfo';

const checkPkgVersion = () => {
  const { packageJson: pkg } = readPkgUp.sync({ cwd: __dirname }) as readPkgUp.ReadResult;
  logger.info(`Titian cli version: ${pkg.version}`);
};

const checkRoot = () => {
  if (process.getuid) {
    const isRoot = process.getuid() === 0;

    if (!isRoot) {
      logger.warn(chalk.gray('You are running as root. This is not recommended.'));
    }
  }
};

const checkUserHome = () => {
  logger.debug(`user home: ${userHome}`);

  if (!userHome || !existsSync(userHome)) {
    logger.warn(chalk.red(`user home not found: ${userHome}`));
    process.exit(1);
  }
};

const checkInputArgs = () => {
  logger.debug('check input arguments ...');

  const checkArgs = (args: ParsedArgs) => {
    if (args.debug) {
      process.env.TITIAN_LOG_LEVEL = 'debug';
    } else {
      process.env.TITIAN_LOG_LEVEL = 'info';
    }

    logger.level = process.env.TITIAN_LOG_LEVEL;
  };

  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const args = require('minimist')(process.argv.slice(2));
  checkArgs(args);
  logger.debug(`check input arguments done. args: ${JSON.stringify(args)}`);
};

const checkEnv = () => {
  logger.info('check environment ...');
};

const checkGlobalUpdate = async () => {
  logger.debug('check global update ...');
  getPackageRegistry();
};

export const prepare = async (): Promise<void> => {
  checkInputArgs();
  checkPkgVersion();
  checkRoot();
  checkUserHome();
  checkEnv();
  await checkGlobalUpdate();
};

export default {};
