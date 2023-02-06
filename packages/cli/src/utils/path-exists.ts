import { accessSync } from 'fs';
import logger from './logger';

export const pathExists = async (path: string) => {
  let ret;
  try {
    await accessSync(path);
    ret = true;
  } catch (error) {
    ret = false;
  }

  logger.debug('path-exists', `pathExists: ${path} ${ret}`);
  return ret;
};

export const pathExistsSync = (path: string) => {
  let ret;
  try {
    accessSync(path);
    ret = true;
  } catch (error) {
    ret = false;
  }

  logger.debug('path-exists', `pathExistsSync: ${path} ${ret}`);
  return ret;
};
