import type { Logger } from 'log4js';
import * as readPkgUp from 'read-pkg-up';
import { satisfies } from 'semver';
import { SyncHook } from 'tapable';
import { loadConfigFromFile, ResolvedConfig } from '../exec/config';
import logger from '../utils/logger';

export interface CommandHooks {
  beforeInit: SyncHook<never>;
  init: SyncHook<never>;
  afterInit: SyncHook<never>;
  beforeRun: SyncHook<never>;
  run: SyncHook<never>;
  afterRun: SyncHook<never>;
  watch: SyncHook<never>;
  release: SyncHook<string | any>;
}

export type HookFun = (hook: CommandHooks) => void;

export default class Command {
  root: string = process.cwd();

  execName: string;

  config: ResolvedConfig;

  runner: Promise<unknown>;

  hooks: CommandHooks;

  logger: Logger;

  constructor(options: ResolvedConfig, execName: string) {
    if (!options) {
      logger.error('Command options are required');
    }

    this.root = options.root || this.root;
    this.execName = execName;
    this.config = options;

    this.runner = new Promise((resolve, reject) => {
      let chain = Promise.resolve();

      chain = chain.then(() => this.checkNodeVersion());
      chain = chain.then(() => this.initArgs());

      chain = chain.then(() => this.beforeInit());
      chain = chain.then(() => this.init());
      chain = chain.then(() => this.afterInit());

      chain = chain.then(() => this.beforeRun());
      chain = chain.then(() => this.run());
      chain = chain.then(() => this.afterRun());

      chain = chain.then(resolve);
      chain.catch(err => {
        reject(err);
      });
    });

    this.hooks = {
      beforeInit: new SyncHook(),
      init: new SyncHook(),
      afterInit: new SyncHook(),
      beforeRun: new SyncHook(),
      run: new SyncHook(),
      afterRun: new SyncHook(),
      watch: new SyncHook(),
      release: new SyncHook(['params']),
    };

    this.logger = logger;
  }

  protected async beforeInit() {
    this.hooks.beforeInit.call();
  }

  protected async init() {
    this.hooks.init.call();
    this.logger.error(`init methods must be implement`);
    process.exit(1);
  }

  protected async afterInit() {
    this.hooks.afterInit.call();
  }

  protected async beforeRun() {
    this.hooks.beforeRun.call();
  }

  protected async run() {
    this.hooks.run.call();
    this.logger.error(`run methods must be implement`);
    process.exit(1);
  }

  protected async afterRun() {
    this.hooks.afterRun.call();
  }

  private async getConfig() {
    const loadResult = await loadConfigFromFile<HookFun>(
      { command: this.execName, mode: this.config.mode || 'development' },
      this.config.configFile,
      this.root,
    );
    return loadResult?.config;
  }

  private async registerHooks(hooks: HookFun[]) {
    return hooks.reduce(async (prev, hook, idx: number) => {
      if (typeof hook !== 'function') {
        this.logger.error(`hooks must be function, hook indexNumber: ${idx}`);
        return prev;
      }
      return hook.call(this, this.hooks);
    }, Promise.resolve());
  }

  private async initArgs() {
    this.logger.debug('init args');
    const config = await this.getConfig();
    const hooks = config?.hooks || [];
    await this.registerHooks(hooks);
  }

  private checkNodeVersion() {
    const { packageJson } = readPkgUp.sync({ cwd: __dirname }) as readPkgUp.ReadResult;

    if (packageJson.engines) {
      if (!satisfies(process.version, packageJson.engines.node)) {
        this.logger.error(`node version must be ${packageJson.version}`);
      }
    }
  }
}
