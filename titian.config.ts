import { join } from 'path';
import type { UserConfig, CommandHooks } from '@titian-design/cli';
import webhook from './task/notify';

function releaseHook(hooks: CommandHooks) {
  // hooks.release.tap('titian', ({ data }) => {
  //   webhook(data);
  // });
  hooks.releaseAsync.tapPromise('titian', webhook);
}

const config: UserConfig = {
  compiler: join(__dirname, 'packages/compiler'),
  hooks: [releaseHook],
};

export default config;
