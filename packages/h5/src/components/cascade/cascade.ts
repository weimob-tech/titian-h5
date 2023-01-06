/* eslint-disable class-methods-use-this */
export type CascadeOption = { [key: string | number]: unknown };

export type CascadeFn = (date?: unknown) => CascadeOption[] | Promise<CascadeOption[]>;
type IteratorBack = { done: boolean; value: CascadeOption[] };
export function isValidOption(options: unknown): options is CascadeOption[] {
  return Array.isArray(options) && options.length > 0;
}
export default class Cascade {
  cascade = 'child';

  last = 0;

  options: CascadeOption[] = [];

  tabs: string[] = [];

  getOptions: CascadeFn = () => [];

  constructor({
    tabs,
    options,
    getOptions,
    cascade,
  }: {
    tabs: string[];
    options: CascadeOption[];
    getOptions: CascadeFn;
    cascade: string;
  }) {
    this.tabs = tabs;
    this.options = options;
    this.getOptions = getOptions;
    this.cascade = cascade;
  }

  async next(value?: { [key: string]: unknown }): Promise<IteratorBack> {
    const { cascade, options, last, tabs } = this;
    if (last >= tabs.length) {
      return { done: false, value: [] };
    }
    let currentOptions: unknown[] = [];
    // 数据无效 则从上一组结果中获取
    if (last === 0) {
      if (isValidOption(options)) {
        currentOptions = options;
      } else {
        const backOption = this.getOptions();
        if (Array.isArray(backOption)) {
          currentOptions = backOption;
        } else if (backOption instanceof Promise) {
          currentOptions = await backOption;
        }
      }
    } else if (value) {
      const temp = value[cascade];
      if (!isValidOption(temp)) {
        const backOption = this.getOptions(value);
        if (Array.isArray(backOption)) {
          currentOptions = backOption;
        } else if (backOption instanceof Promise) {
          currentOptions = await backOption;
        }
      } else {
        currentOptions = temp;
      }
    }
    return {
      done: Array.isArray(currentOptions) && currentOptions.length > 0,
      value: currentOptions,
    };
  }

  async getData(active: number, code: string, value: unknown[]) {
    const iterator = this[Symbol.asyncIterator]();
    let it = await iterator.next();
    const columnValueList: CascadeOption[] = [];
    const columnList: CascadeOption[][] = [];
    while (it.done) {
      this.last += 1;
      if (it.value) {
        columnList.push(it.value);
      }
      const select = it.value.find(i => i[code] === (value || [])[this.last - 1]) || undefined;
      if (select) {
        columnValueList.push(select);
      }
      // eslint-disable-next-line no-await-in-loop
      it = await iterator.next(select);
    }
    this.last -= 1;
    if (active > columnList.length - 1) {
      active = columnList.length - 1;
    }
    this.last = this.last < 0 ? 0 : this.last;
    return {
      last: this.last,
      columnList,
      columnValueList,
      active: active < 0 ? 0 : active,
    };
  }

  async getNextData({
    columnList,
    columnValueList,
    index,
    code,
    id,
  }: {
    columnList: CascadeOption[][];
    columnValueList: CascadeOption[];
    index: number;
    id: unknown;
    code: string;
  }): Promise<
    undefined | { columnValueList: CascadeOption[]; columnList?: CascadeOption[][]; active?: number; last?: number }
  > {
    const { tabs } = this;
    const currentOption = columnList[index];
    const content = columnValueList[index];
    if (content && content[code] && content[code] === id) {
      return Promise.resolve(undefined);
    }
    const value = currentOption.find(i => i[code] === id);
    if (!value) {
      return Promise.resolve(undefined);
    }
    columnValueList[index] = value;
    if (index === tabs.length - 1) {
      return Promise.resolve({ columnValueList: [...columnValueList] });
    }
    this.last = index + 1;
    const iterator = this[Symbol.asyncIterator]();
    const it = await iterator.next(value);
    columnList[index + 1] = it.value;
    columnList.length = index + 2;
    columnValueList[index] = value;
    columnValueList.length = index + 1;
    return {
      columnList,
      columnValueList,
      active: index + 1,
      last: this.last,
    };
  }

  getResult({ columnValueList, code }: { columnValueList: CascadeOption[]; code: string }) {
    const { cascade } = this;
    const options: CascadeOption[] = [];
    const value: unknown[] = [];
    columnValueList.forEach(item => {
      const column = { ...item };
      if (cascade in column) {
        delete column[cascade];
      }
      value.push(column[code]);
      options.push(column);
    });
    return { value, options };
  }

  [Symbol.asyncIterator]() {
    return this;
  }
}
