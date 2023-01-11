import { getDate } from '../common/utils/index';
import { CalDateProps, CalDateTimeType, CalErrorProps, CalMonthRenderProps, CalRenderDateProps } from './const';
import { getCalDate } from './utils';

export default abstract class CalendarCalc {
  minDate: CalDateProps;

  maxDate: CalDateProps;

  formatter?: (day: CalRenderDateProps) => CalRenderDateProps;

  /** 转换成 日历 普通类型(date/string/number) 转换 日历日期类型 */
  abstract calcCalDate(calDateList: CalDateTimeType | CalDateTimeType[] | null): CalDateProps[];

  /** 日期选中操作 */
  abstract select(params: {
    calDateList: CalRenderDateProps[];
    actionCalDate: CalRenderDateProps;
  }): IterableIterator<CalErrorProps | CalRenderDateProps[]>;

  /** 计算更新数据 */
  abstract calcUpdateData(params: {
    prevData: CalRenderDateProps[];
    nextData: CalRenderDateProps[];
    monthList: CalMonthRenderProps[];
    actionCalDate: CalRenderDateProps;
  }): { [key: string]: unknown } | null;
  constructor({
    minDate,
    maxDate,
    formatter,
  }: {
    minDate: CalDateTimeType;
    maxDate: CalDateTimeType;
    formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
  }) {
    const min = getCalDate(getDate(minDate));
    const max = getCalDate(getDate(maxDate));
    if (min.fullDateNum > max.fullDateNum) {
      this.minDate = max;
      this.maxDate = min;
    } else {
      this.minDate = min;
      this.maxDate = max;
    }
    this.formatter = formatter;
  }

  /** 过滤 日历日期格式 是否合法 */
  abstract filterInvalidCalDate(calDateList: CalRenderDateProps[]): CalDateProps[];
  filterInvalidDate(value: CalDateTimeType | CalDateTimeType[] | null) {
    if (!value) {
      return [];
    }
    const calDateProps = Array.isArray(value) ? value : [value];
    return this.filterBorder(
      calDateProps
        .map(item => new Date(item))
        .filter(item => item.toString() !== 'Invalid Date')
        .map((item: Date) => getCalDate(item)),
    );
  }

  // TODO: 边界 过滤 结果 可能有问题,后期或可修改成 结果 修改 边界
  filterBorder<T extends CalDateProps>(value: T[]): T[] {
    return value.filter(
      item =>
        (this.minDate.fullDateNum === item.fullDateNum || item.fullDateNum > this.minDate.fullDateNum) &&
        (this.maxDate.fullDateNum === item.fullDateNum || item.fullDateNum < this.maxDate.fullDateNum),
    );
  }
}
