/* eslint-disable class-methods-use-this */
import CalendarCalc from './calc';
import type { CalDateProps, CalDateTimeType, CalRenderDateProps } from './const';
import { DateStatusEnum } from './const';

export default class SingleCalendarCalc extends CalendarCalc {
  filterInvalidCalDate(calDateList: CalRenderDateProps[]) {
    const [calDate] = this.filterBorder(calDateList);
    if (!calDate) {
      return [];
    }
    if (calDate.status !== DateStatusEnum.SINGLE) {
      calDate.status = DateStatusEnum.SINGLE;
    }
    return [calDate];
  }

  calcCalDate(calDate: CalDateTimeType | CalDateTimeType[] | null): CalDateProps[] {
    return this.filterInvalidDate(calDate).map((item): CalDateProps => ({ ...item, status: DateStatusEnum.SINGLE }));
  }

  // eslint-disable-next-line require-yield
  *select({ actionCalDate }: { actionCalDate: CalRenderDateProps }) {
    return [{ ...actionCalDate, status: DateStatusEnum.SINGLE }];
  }

  calcUpdateData({ nextData, prevData }: { nextData: CalRenderDateProps[]; prevData: CalRenderDateProps[] }) {
    if (prevData[0] && nextData[0].fullDateNum === prevData[0].fullDateNum) {
      return null;
    }
    const curData: { [key: string]: CalRenderDateProps } = {};

    // monthList[nextData[0].parentIndex]['dateList'][nextData[0].day - 1]
    const selectKey = `monthList[${nextData[0].parentIndex}].dateList[${nextData[0].day - 1}]`;
    if (typeof this.formatter === 'function') {
      curData[selectKey] = this.formatter({
        ...nextData[0],
        status: DateStatusEnum.SINGLE,
      });
      // monthList[nextData[0].parentIndex].dateList[nextData[0].day - 1] = curData[selectKey];
    } else {
      curData[selectKey] = {
        ...nextData[0],
        status: DateStatusEnum.SINGLE,
      };
      // monthList[nextData[0].parentIndex].dateList[nextData[0].day - 1] = curData[selectKey];
    }
    if (prevData.length !== 0) {
      const key = `monthList[${prevData[0].parentIndex}].dateList[${prevData[0].day - 1}]`;

      if (typeof this.formatter === 'function') {
        curData[key] = this.formatter({ ...prevData[0], status: DateStatusEnum.NOT_STATUS });
        // monthList[prevData[0].parentIndex].dateList[prevData[0].day - 1] = curData[key];
      } else {
        curData[key] = { ...prevData[0], status: DateStatusEnum.NOT_STATUS };
        // monthList[prevData[0].parentIndex].dateList[prevData[0].day - 1] = curData[key];
      }
    }
    return curData;
  }
}
