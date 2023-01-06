import { promises } from 'fs';
import { platform } from 'os';
import { posix } from 'path';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const usingDynamicImport = typeof global.jest === 'undefined';

// eslint-disable-next-line @typescript-eslint/no-implied-eval
export const dynamicImport = usingDynamicImport ? new Function('file', 'return import(file)') : require;

export function isObject(value: unknown): value is Record<string, unknown> {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function slash(p: string): string {
  return p.replace(/\\/g, '/');
}

export const isWindows = platform() === 'win32';

export function normalizePath(id: string): string {
  return posix.normalize(isWindows ? slash(id) : id);
}

export async function isDir(dirname: string) {
  try {
    const stat = await promises.lstat(dirname);
    return stat.isDirectory();
  } catch (error) {
    return false;
  }
}
