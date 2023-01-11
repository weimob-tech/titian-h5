import CalendarCalc from './calc';
import type { CalDateProps, CalDateTimeType, CalRenderDateProps } from './const';
import { DateStatusEnum } from './const';
import { mergeContinuousDate } from './utils';

export default class MultipleCalendarCalc extends CalendarCalc {
  maxSize: number;

  constructor(props: ConstructorParameters<typeof CalendarCalc>[0], maxSize: number) {
    super(props);
    this.maxSize = maxSize;
  }

  filterInvalidCalDate(calDateList: CalRenderDateProps[]) {
    return this.prune(this.filterBorder(calDateList));
  }

  calcCalDate(calDate: CalDateTimeType | CalDateTimeType[] | null) {
    return this.prune(this.filterInvalidDate(calDate));
  }

  *select({ calDateList, actionCalDate }: { calDateList: CalRenderDateProps[]; actionCalDate: CalRenderDateProps }) {
    let nextData: CalRenderDateProps[] = [];

    if (calDateList.some(item => item.fullDateNum === actionCalDate.fullDateNum)) {
      nextData = calDateList.filter(item => item.fullDateNum !== actionCalDate.fullDateNum);
    } else {
      if (calDateList.length >= this.maxSize && this.maxSize > 0) {
        yield {
          type: 'maxSize',
          message: '超出最大选择数量',
        } as const;
        return calDateList;
      }
      nextData = [...calDateList, { ...actionCalDate, status: DateStatusEnum.MULTIPLE }];
    }
    nextData = nextData.sort((before, after) => before.fullDateNum - after.fullDateNum);
    return mergeContinuousDate(nextData);
  }

  calcUpdateData({ nextData, actionCalDate }: { nextData: CalRenderDateProps[]; actionCalDate: CalRenderDateProps }) {
    const updateDate: { [key: string]: unknown } = {};
    if (!nextData.some(item => item.fullDateNum === actionCalDate.fullDateNum)) {
      const key = `monthList[${actionCalDate.parentIndex}].dateList[${actionCalDate.day - 1}]`;
      if (typeof this.formatter === 'function') {
        updateDate[key] = this.formatter({ ...actionCalDate, status: DateStatusEnum.NOT_STATUS });
      } else {
        updateDate[key] = { ...actionCalDate, status: DateStatusEnum.NOT_STATUS };
      }
    }
    return nextData.reduce((next, target) => {
      const key = `monthList[${target.parentIndex}].dateList[${target.day - 1}]`;
      if (typeof this.formatter === 'function') {
        return {
          ...next,
          [key]: this.formatter({ ...target }),
        };
      }
      return {
        ...next,
        [key]: { ...target },
      };
    }, updateDate);
  }

  private prune<T extends CalDateProps>(calDateList: T[]): T[] {
    const cal = calDateList;
    if (this.maxSize > 0 && calDateList.length > this.maxSize) {
      cal.length = this.maxSize;
    }
    return mergeContinuousDate(
      cal
        .sort((before, after) => before.fullDateNum - after.fullDateNum)
        .map(item => ({ ...item, status: DateStatusEnum.MULTIPLE })),
    );
  }
}
