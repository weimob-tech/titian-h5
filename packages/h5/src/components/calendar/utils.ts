/* eslint-disable @titian/no-more-args */
import { getDate } from '../common/utils/index';
import type { CalDateProps, CalMonthProps, CalRenderDateProps, CalWeekProps } from './const';
import { CalTypeEnum, DateStatusEnum, WEEK } from './const';

export const DAYTIME = 1000 * 60 * 60 * 24; // 每天的毫秒数

export function getCalDate(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const week = date.getDay();
  const formatStr = `${year}${month > 9 ? month : `0${month}`}${day > 9 ? day : `0${day}`}`;
  const format = Number(formatStr);
  const calendarDay: CalDateProps = {
    date,
    time: date.getTime(),
    year,
    month,
    day,
    week,
    fullDateNum: format,
    text: day,
    status: DateStatusEnum.NOT_STATUS,
    topInfo: '',
    bottomInfo: '',
  };
  return calendarDay;
}
export const getWeek = (startWeek = WEEK[0].name, week: CalWeekProps[] = WEEK): CalWeekProps[] => {
  const begin = startWeek || WEEK[0].name;
  const number = week.findIndex(item => item.name === begin);
  if (number === 0) {
    return week;
  }
  const end = week.slice(0, number);
  const start = week.slice(number, week.length);
  return [...start, ...end];
};
export function diff(before: CalDateProps, after: CalDateProps) {
  return Math.abs((after.time - before.time) / DAYTIME) + 1;
}
export function calcMonthData(
  { min, max }: { min: CalDateProps; max: CalDateProps },
  currentDate: CalDateProps[],
): [CalMonthProps[], CalRenderDateProps[]] {
  let number = (max.year - min.year) * 12 + (max.month - min.month) + 1;
  number = number > 0 ? number : 1;
  let id = '';
  const renderDate: CalRenderDateProps[] = [];
  const monthList = new Array(number).fill(0).map((_item, index) => {
    const date = getDate(min.year, min.month - 1 + index);
    const [time, year, month] = [date.getTime(), date.getFullYear(), date.getMonth() + 1];
    currentDate.forEach(cur => {
      if (cur.year === year && cur.month === month) {
        if (!id) {
          id = `month${index}`;
        }
        renderDate.push({ ...cur, parentIndex: index });
      }
    });
    return { time, year, month };
  });
  return [monthList, renderDate];
}

/**
 * 是否需要覆盖
 * @param month  月份
 * @param select 选中值
 * @param mode 类型
 * @returns booolean
 */
export function judgeCover(month: CalRenderDateProps, select: CalRenderDateProps[], mode: `${CalTypeEnum}`): boolean {
  if (mode !== CalTypeEnum.RANGE) {
    return false;
  }
  if (select.length !== 2) {
    return false;
  }
  const [start, end] = select;
  const startIndex = start.parentIndex;
  const endIndex = end.parentIndex;
  const number = month.parentIndex;
  return number > startIndex && number < endIndex;
}

/**
 * 是否需要计算
 * @param month  月份
 * @param select 选中值
 * @param mode 类型
 * @returns booolean
 */
export function judgeCompare(month: CalRenderDateProps, select: CalRenderDateProps[], mode: `${CalTypeEnum}`): boolean {
  if (mode !== CalTypeEnum.RANGE) {
    return false;
  }
  return select.some(i => i.parentIndex === month.parentIndex);
}

function getCalculateStatus(
  day: CalDateProps,
  border: { min?: CalDateProps; max?: CalDateProps },
  select: CalDateProps[],
): DateStatusEnum {
  const selected = select.find(i => i.fullDateNum === day.fullDateNum);
  if (selected) {
    return selected.status;
  }
  let status = DateStatusEnum.NOT_STATUS;
  if (border.min && border.max) {
    status =
      border.min.fullDateNum > day.fullDateNum || day.fullDateNum > border.max.fullDateNum
        ? DateStatusEnum.DISABLED
        : DateStatusEnum.NOT_STATUS;
  } else {
    if (border.min) {
      status = border.min.fullDateNum > day.fullDateNum ? DateStatusEnum.DISABLED : DateStatusEnum.NOT_STATUS;
    }
    if (border.max) {
      status = day.fullDateNum > border.max.fullDateNum ? DateStatusEnum.DISABLED : DateStatusEnum.NOT_STATUS;
    }
  }
  return status;
}

const getRenderDateByCalendar = ({
  calDate,
  select,
  border,
  index,
  formatter,
}: {
  calDate: CalDateProps;
  select: CalDateProps[];
  border: { max?: CalDateProps; min?: CalDateProps };
  index: number;
  formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
}): CalRenderDateProps => {
  const status = getCalculateStatus(calDate, border, select);
  const calRenderDate = {
    ...calDate,
    status,
    parentIndex: index,
  };
  if (typeof formatter === 'function') {
    if (calRenderDate.status === DateStatusEnum.RANGE_FULL) {
      const startDate = formatter({
        ...calRenderDate,
        status: DateStatusEnum.RANGE_START,
      });
      const endDate = formatter({
        ...calRenderDate,
        status: DateStatusEnum.RANGE_END,
      });
      const bottomInfo = [startDate.bottomInfo, endDate.bottomInfo].map(i => i).join('/');
      calRenderDate.bottomInfo = bottomInfo;
      return calRenderDate;
    }
    return formatter(calRenderDate);
  }
  return calRenderDate;
};

export function getDayByMonth({
  month,
  select,
  border,
  formatter,
  parentIndex,
}: {
  month: string | number | Date;
  select: CalDateProps[];
  border: { max?: CalDateProps; min?: CalDateProps };
  formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
  parentIndex: number;
}): CalRenderDateProps[] {
  const date: Date = getDate(month);
  const end = getDate(date.getFullYear(), date.getMonth() + 1, 0);
  const number = end.getDate();
  return new Array(number).fill(null).map((_item, index) => {
    const calDate = getCalDate(getDate(date.getFullYear(), date.getMonth(), index + 1));
    return getRenderDateByCalendar({ calDate, select, border, index: parentIndex, formatter });
  });
}

export const mergeContinuousDate = <T extends CalDateProps>(list: T[]): T[] => {
  let temp: T[] = [list[0]];
  const result = [temp];
  let i = 0;
  if (list.length < 2) {
    return list.map(item => ({
      ...item,
      status: DateStatusEnum.MULTIPLE,
    }));
  }
  for (let j = 1; j < list.length; j += 1) {
    const last = getDate(list[i].year, list[i].month - 1, list[i].day + 1);
    const day = getDate(list[j].year, list[j].month - 1, list[j].day);
    const year = day.getFullYear();
    const month = day.getMonth();
    const date = day.getDate();
    const lastYear = last.getFullYear();
    const lastMonth = last.getMonth();
    const lastDate = last.getDate();
    if (year === lastYear && month === lastMonth && date === lastDate) {
      temp.push(list[j]);
    } else {
      temp = [list[j]];
      result.push(temp);
    }
    i = j;
  }
  const resetResult: T[] = [];

  for (let x = 0; x < result.length; x += 1) {
    const curList = result[x];
    const curLength = curList.length;
    curList.forEach((item, index) => {
      if (curLength === 1) {
        resetResult.push({ ...item, status: DateStatusEnum.MULTIPLE });
        return;
      }
      if (index === 0) {
        resetResult.push({ ...item, status: DateStatusEnum.MULTIPLE_START });
        return;
      }
      if (index === curLength - 1) {
        resetResult.push({ ...item, status: DateStatusEnum.MULTIPLE_END });
        return;
      }
      resetResult.push({ ...item, status: DateStatusEnum.MULTIPLE_MIDDLE });
    });
  }
  return resetResult;
};
