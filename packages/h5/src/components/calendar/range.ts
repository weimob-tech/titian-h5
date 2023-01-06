import CalendarCalc from './calc';
import type { CalDateProps, CalDateTimeType, CalMonthRenderProps, CalRenderDateProps } from './const';
import { DateStatusEnum } from './const';
import { diff, getCalDate } from './utils';

export default class RangeCalendarCalc extends CalendarCalc {
  maxRange: number;

  allowSameDay?: boolean = false;

  constructor(
    params: ConstructorParameters<typeof CalendarCalc>[0],
    { allowSameDay, maxRange }: { allowSameDay: boolean; maxRange: number },
  ) {
    super(params);
    this.maxRange = maxRange;
    this.allowSameDay = allowSameDay;
  }

  filterInvalidCalDate(calDateList: CalRenderDateProps[]) {
    return this.prune(this.filterBorder(calDateList));
  }

  calcCalDate(CalDate: CalDateTimeType | CalDateTimeType[] | null) {
    return this.prune(this.filterInvalidDate(CalDate));
  }

  private prune(calDateList: CalDateProps[]) {
    if (calDateList.length === 0) {
      return [];
    }
    if (calDateList.length === 1) {
      return [{ ...calDateList[0], status: DateStatusEnum.RANGE_START }];
    }
    let [before, after] = calDateList;
    if (before.fullDateNum > after.fullDateNum) {
      [before, after] = [after, before];
    }
    before.status = DateStatusEnum.RANGE_START;
    after.status = DateStatusEnum.RANGE_END;
    if (before.fullDateNum === after.fullDateNum) {
      if (this.allowSameDay) {
        before.status = DateStatusEnum.RANGE_FULL;
        after.status = DateStatusEnum.RANGE_FULL;
        return [before, after];
      }
      return [before];
    }
    if (this.maxRange > 0 && diff(before, after) > this.maxRange) {
      const next = new Date(before.year, before.month - 1, before.day + this.maxRange - 1);
      const nextCalendarDay = getCalDate(next);
      nextCalendarDay.status = DateStatusEnum.RANGE_END;
      return [before, nextCalendarDay];
    }
    return [before, after];
  }

  *select({ calDateList, actionCalDate }: { calDateList: CalRenderDateProps[]; actionCalDate: CalRenderDateProps }) {
    const nextCalDate = this.changeStatus({ calDateList, actionCalDate });
    if (nextCalDate.length > 1) {
      if (this.maxRange > 0 && diff(nextCalDate[0], nextCalDate[1]) > this.maxRange) {
        yield {
          type: 'maxRange',
          message: '超出最大选择数量',
        } as const;

        const [before] = nextCalDate;
        const next = new Date(before.year, before.month - 1, before.day + this.maxRange - 1);
        const nextCalendarDay = getCalDate(next);
        nextCalendarDay.status = DateStatusEnum.RANGE_END;
        let number = 0;
        if (before.year === nextCalendarDay.year && before.month === nextCalendarDay.month) {
          number = before.parentIndex;
        } else {
          number = before.parentIndex + 1;
        }
        return [
          before,
          {
            ...nextCalendarDay,
            parentIndex: number,
          },
        ];
      }
    }
    return nextCalDate;
  }

  changeStatus({
    calDateList,
    actionCalDate,
  }: {
    calDateList: CalRenderDateProps[];
    actionCalDate: CalRenderDateProps;
  }): CalRenderDateProps[] {
    if (calDateList.length >= 2 || calDateList.length === 0) {
      return [{ ...actionCalDate, status: DateStatusEnum.RANGE_START }];
    }
    const [before] = calDateList;
    if (before.status === DateStatusEnum.RANGE_FULL) {
      return [{ ...actionCalDate, status: DateStatusEnum.RANGE_START }];
    }
    if (before.fullDateNum < actionCalDate.fullDateNum) {
      return [before, { ...actionCalDate, status: DateStatusEnum.RANGE_END }];
    }
    // 同一天，且允许同一天
    if (before.fullDateNum === actionCalDate.fullDateNum && this.allowSameDay) {
      return [{ ...actionCalDate, status: DateStatusEnum.RANGE_FULL }];
    }
    return [{ ...actionCalDate, status: DateStatusEnum.RANGE_START }];
  }

  calcUpdateData({
    prevData,
    nextData,
    monthList,
  }: {
    prevData: CalRenderDateProps[];
    nextData: CalRenderDateProps[];
    monthList: CalMonthRenderProps[];
  }) {
    const curRangeData: { [key: string]: unknown } = {};
    prevData.forEach(item => {
      const key = `monthList[${item.parentIndex}].dateList[${item.day - 1}]`;
      if (typeof this.formatter === 'function') {
        curRangeData[key] = this.formatter({ ...item, status: DateStatusEnum.NOT_STATUS });
      } else {
        curRangeData[key] = { ...item, status: DateStatusEnum.NOT_STATUS };
      }

      const monthCoverKey = `monthList[${item.parentIndex}].isCover`;
      const monthCompareKey = `monthList[${item.parentIndex}].isCompare`;
      const monthCurDateKey = `monthList[${item.parentIndex}].curDate`;

      curRangeData[monthCoverKey] = false;
      curRangeData[monthCompareKey] = false;
      curRangeData[monthCurDateKey] = [];
    });
    nextData.forEach((item, _index, cur) => {
      const key = `monthList[${item.parentIndex}].dateList[${item.day - 1}]`;
      if (typeof this.formatter === 'function') {
        if (item.status === DateStatusEnum.RANGE_FULL) {
          const start = this.formatter({ ...item, status: DateStatusEnum.RANGE_START });
          const end = this.formatter({ ...item, status: DateStatusEnum.RANGE_END });
          const bottomInfo = [start.bottomInfo, end.bottomInfo].map(i => i).join('/');
          curRangeData[key] = { ...start, status: DateStatusEnum.RANGE_FULL, bottomInfo };
        } else {
          curRangeData[key] = this.formatter({ ...item });
        }
      } else {
        curRangeData[key] = { ...item };
      }
      const monthCoverKey = `monthList[${item.parentIndex}].isCover`;
      const monthCompareKey = `monthList[${item.parentIndex}].isCompare`;
      const monthCurDateKey = `monthList[${item.parentIndex}].curDate`;
      curRangeData[monthCoverKey] = false;
      curRangeData[monthCompareKey] = true;
      curRangeData[monthCurDateKey] = cur.map(i => ({ ...i }));
    });
    if (nextData.length === 2) {
      const [start, end] = nextData;
      const startIndex = start.parentIndex || 0;
      const endIndex = end.parentIndex || 0;

      const len = monthList.length;
      for (let i = 0; i < len; i += 1) {
        const item = monthList[i];
        if (i !== startIndex && i !== endIndex) {
          if (i > startIndex && i < endIndex) {
            const monthCoverKey = `monthList[${i}].isCover`;
            if (!item.isCover) {
              curRangeData[monthCoverKey] = true;
            }
          } else {
            const monthCoverKey = `monthList[${i}].isCover`;
            if (item.isCover) {
              curRangeData[monthCoverKey] = false;
            }
          }
        }
      }
    } else if (nextData.length === 1 && prevData.length === 2) {
      const len = monthList.length;
      for (let i = 0; i < len; i += 1) {
        const item = monthList[i];
        if (item.isCover) {
          const monthCoverKey = `monthList[${i}].isCover`;
          curRangeData[monthCoverKey] = false;
        }
      }
    }
    return curRangeData;
  }
}
