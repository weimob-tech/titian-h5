import { logger, ResolvedConfig } from '@titian/cli';
import Release from './release';

process.on('unhandledRejection', e => {
  logger.error('compiler unhandledRejection:', e);
});

export function start() {
  logger.error('not support in titian compiler');
}

export function build() {
  logger.error('not support in titian compiler');
}

export function release(options: ResolvedConfig, commandName: string) {
  // eslint-disable-next-line no-new
  new Release(options, commandName);
}

export default {};
