import { defineConfig, ResolvedConfig, UserConfig } from './exec/config';
import Command, { CommandHooks, HookFun } from './models/Command';
import { normalizePath } from './utils';
import logger from './utils/logger';
import { pathExistsSync, pathExists } from './utils/path-exists';
import { spawn } from './utils/spawn';
import { spinner } from './utils/spinner';

export { normalizePath, logger, Command, spawn, spinner, pathExistsSync, pathExists, defineConfig };

export type { CommandHooks, UserConfig, ResolvedConfig, HookFun };

export default {};
