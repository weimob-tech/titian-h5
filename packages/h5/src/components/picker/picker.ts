import { IAnyObject, Key } from '../common/interface/index';
import Column from './column';
import {
  IPickerResultAnyMap,
  isAcronymColumn,
  isIncomplete,
  isIntactColumn,
  PickerAcronymColumn,
  PickerColumn,
  PickerProps,
  PickerStatusEnum,
} from './const';

export default class Picker<P extends string = 'children'> {
  /** 是否自定义列别名  */
  isCustomColAlias = false;

  value: unknown;

  /** 未拆解 包含级联数据 */
  private columnList: Column<P>[] = [];

  /** 结果 */
  columnMap: IPickerResultAnyMap = new Map();

  rowAlias: null | string | number = null;

  /** 是否装箱 */
  private isPackage = false;

  private check(options: PickerProps['options'], value: unknown) {
    let opt: (PickerAcronymColumn | PickerAcronymColumn[] | PickerColumn)[] = [];
    let val: unknown = value;
    // 是否是数组
    if (!Array.isArray(options)) {
      opt = [options];
      val = [value];
      this.isPackage = true;
    } else {
      opt = options;
      this.isPackage = false;
    }

    // 是一组数据
    if (isIncomplete(opt)) {
      opt = [opt];
      val = [value];
      this.isPackage = true;
    }
    if (!Array.isArray(val)) {
      val = [];
    }
    val = (val as unknown[]).filter(item => !(typeof item === 'undefined' || item === null));

    this.columnMap.clear();
    this.isCustomColAlias = false;
    if (isAcronymColumn(opt)) {
      (val as unknown[]).forEach((item, idx) => {
        this.columnMap.set(idx, { value: item, options: [] });
      });
      return opt.map((item, idx) => ({ colAlias: idx, column: item })) as PickerColumn[];
    }
    if (isIntactColumn(opt)) {
      this.isCustomColAlias = true;
      (val as unknown[]).forEach(item => {
        this.columnMap.set((item as IAnyObject).colAlias as Key, { value: (item as IAnyObject).value, options: [] });
      });
      return opt;
    }
    throw new Error('数据结构错误');
  }

  changeProps({ options, rowAlias, useRowIndex, value, cascade }: PickerProps) {
    let list: PickerColumn[] = [];
    let optionIndex: number[] = [];
    let state = PickerStatusEnum.ROW_INDEX;
    if (rowAlias) {
      state = PickerStatusEnum.ROW_ALIAS;
      this.rowAlias = rowAlias;
    } else if (!rowAlias && !useRowIndex) {
      state = PickerStatusEnum.ROW_ALL;
    }
    this.columnList = this.check(options, value).map(
      ({ column, colAlias, ...other }) =>
        new Column({
          options: column,
          colAlias,
          rowAlias,
          cascade,
          value: this.columnMap.get(colAlias)?.value,
          state,
          other,
        }),
    );
    this.columnList.forEach(column => {
      const { pickerColumnList, coordinate, colAlias } = column;
      list = list.concat(pickerColumnList);
      optionIndex = optionIndex.concat(coordinate);
      const result = this.columnMap.get(colAlias);
      if (result) {
        result.options = column.options;
        result.value = column.value;
      } else {
        this.columnMap.set(colAlias, { options: column.options, value: column.value });
      }
    });

    return { colsIndex: optionIndex, list };
  }

  update(rowIndex: number, activityColumn: PickerColumn) {
    let colsIndex: number[] = [];
    let list: PickerColumn[] = [];
    this.columnList.forEach(column => {
      if (column.id === activityColumn.columnId) {
        column.update(rowIndex, activityColumn);
      }
      const result = this.columnMap.get(column.colAlias);
      if (result) {
        result.options = column.options;
        result.value = column.value;
      }
      colsIndex = colsIndex.concat(column.coordinate);
      list = list.concat(column.pickerColumnList);
    });
    if (activityColumn.isTree) {
      return { colsIndex, list };
    }
    return { colsIndex };
  }

  get data() {
    const value: unknown[] = [];
    const options: unknown[] = [];
    this.columnMap.forEach((item, key) => {
      if (this.isCustomColAlias) {
        value.push({ colAlias: key, value: item.value });
        options.push({ colAlias: key, options: item.options });
      } else {
        value[key as number] = item.value;
        options[key as number] = item.options;
      }
    });
    if (this.isPackage && value.length === 1 && options.length === 1) {
      return { value: value[0], options: options[0] };
    }
    return { value, options };
  }
}
