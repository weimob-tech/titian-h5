/* eslint-disable no-underscore-dangle */
// 简单数据类型
import { IAnyObject, Key } from '../common/interface/index';
import { isDisabled, isPlainObject, randomString } from '../common/utils/index';

export type IPickerResultAnyMap = Map<Key, { value: unknown; options: unknown }>;

/**
 * options
 * 1. acronym 简单数据类型-数组 PickerAcronymColumn[][]
 * 2. intact 完整数据类型-数组  PickerColumn[]
 *
 *  当仅有一列时候可支持
 * 1. acronym 简单数据类型  PickerAcronymColumn[]
 * 2. intact 完整数据   PickerColumn
 */
export enum PickerStatusEnum {
  /** 行下标 */
  'ROW_INDEX' = 'row_index',

  /** 行全等 */
  'ROW_ALL' = 'row_all',

  /** 行别名 */
  'ROW_ALIAS' = 'row_alias',
}
export interface PickerColumn {
  colAlias: Key;
  column: PickerAcronymColumn[];
  id: string;
  isTree: boolean;
  children?: undefined;
  columnId: string;
  [key: string]: unknown;
}

export interface PickerAcronymTypeColumn {
  disabled?: boolean;
}
export type PickerAcronymColumn = string | (PickerAcronymTypeColumn & { [key: string]: unknown });

export type PickerProps = {
  options: PickerAcronymColumn[] | PickerAcronymColumn[][] | PickerColumn | PickerColumn[];

  rowAlias: null | number | string;
  useRowIndex: boolean;
  value: unknown;
  cascade: string;
};

export interface PickerTreeColumn<T extends string = 'children'> extends PickerAcronymTypeColumn {
  T?: PickerTreeColumn<T>[];
  [key: string]: unknown;
}
/** 是否是 完整数据类型 */
export function isIntact(params: unknown): params is PickerColumn {
  return isPlainObject(params) && typeof params.colAlias !== 'undefined' && Array.isArray(params.column);
}

/** 是否 简单数据类型 */
export function isAcronym(params: unknown): params is PickerAcronymColumn {
  return Array.isArray(params) && params.every(item => !Array.isArray(item) && !isIntact(item));
}

/** 是否 简单数据类型 - 数组 */
export function isAcronymColumn(params: unknown): params is PickerAcronymColumn[][] {
  return Array.isArray(params) && params.every(item => isAcronym(item));
}

/** 是否  完整数据类型 - 数组 */
export function isIntactColumn(params: unknown): params is PickerColumn[] {
  return Array.isArray(params) && params.every(item => isIntact(item));
}

/** 是否是单独一列(省略掉外层数组) */
export function isIncomplete(params: unknown): params is PickerColumn | PickerAcronymColumn[] {
  return isIntact(params) || isAcronym(params);
}

export function isTree<T extends string = 'children'>(params: unknown, cascade: T): params is PickerTreeColumn<T> {
  return isPlainObject(params) && Array.isArray(params[cascade]);
}
export function isTreeColumn<T extends string = 'children'>(
  params: unknown,
  cascade: T,
): params is PickerTreeColumn<T>[] {
  return (
    Array.isArray(params) && params.some(item => isTree<T>(item, cascade)) && params.every(item => isPlainObject(item))
  );
}
export function getCascadeKey(key: unknown) {
  return `${randomString()}-${key}`;
}
export const treeBFS = <T extends PickerTreeColumn<P>, P extends string = 'children'>(
  tree: T[],
  key: string | number,
  cascade: P,
) => {
  const map: Map<Key, PickerTreeColumn<P>> = new Map();
  let children = [...tree];
  while (children[0]) {
    const [{ ...child }] = children;
    let keyValue = '';
    if ((child as T & { __key__: string }).__key__) {
      keyValue = (child as T & { __key__: string }).__key__;
    } else {
      keyValue = getCascadeKey(child[key]);
      (child as T & { __key__: string }).__key__ = keyValue;
    }
    const curChildren = child[cascade];
    if (Array.isArray(curChildren) && curChildren.length > 0) {
      const newChildren = curChildren.map(({ ...item }) => ({
        ...item,
        __key__: getCascadeKey(item[key]),
      }));
      children = children.concat(newChildren as T[]);
      const mapChildren = newChildren.map(item => {
        const opt: { [key: string | number]: unknown } = {};
        Object.keys(item).forEach(k => {
          if (k !== cascade) {
            opt[k] = item[k] as unknown;
          }
        });
        return opt;
      });
      map.set(keyValue, { ...child, [cascade]: mapChildren });
    } else {
      map.set(keyValue, { ...child, [cascade]: [] });
    }
    children.shift();
  }
  return map;
};
export function getAvailable(list: unknown[], number: number) {
  if (number === -1) {
    number = list.findIndex(item => !isDisabled(item));
  }
  number = number === -1 ? 0 : number;
  return number;
}

export function getAvailableAlias(list: unknown[], value: unknown, rowAlias: string | number) {
  const number = list.findIndex(row => !isDisabled(row) && (row as IAnyObject)[rowAlias] === value);
  return getAvailable(list, number);
}

export function getAvailableIndex(list: unknown[], value: unknown) {
  const number = list.findIndex((row, index) => !isDisabled(row) && index === value);
  return getAvailable(list, number);
}

export function getAvailableAll(list: unknown[], value: unknown) {
  const number = list.findIndex(row => !isDisabled(row) && row === value);
  return getAvailable(list, number);
}
