import CalendarCalc from './calc';
import type {
  CalDateProps,
  CalDateTimeType,
  CalMonthProps,
  CalMonthRenderProps,
  CalRenderDateProps,
  CalWeekProps,
} from './const';
import { CalTypeEnum, DateStatusEnum } from './const';
import MultipleCalendarCalc from './multiple';
import RangeCalendarCalc from './range';
import SingleCalendarCalc from './single';
import { calcMonthData, getCalDate, getDayByMonth, getWeek, judgeCompare, judgeCover } from './utils';

interface CalendarProps {
  mode: `${CalTypeEnum}`;
  minDate: CalDateTimeType;
  maxDate: CalDateTimeType;
  allowSameDay: boolean;
  start: string;
  maxRange: number;
  maxSize: number;
  value: CalDateTimeType | CalDateTimeType[] | null;
  defaultValue: CalDateTimeType | CalDateTimeType[] | null;
  formatter?: (day: CalRenderDateProps) => CalRenderDateProps;
}

export default class Calendar {
  private mode: `${CalTypeEnum}` = CalTypeEnum.SINGLE;

  monthList: CalMonthRenderProps[] = [];

  currentDate: CalRenderDateProps[] = [];

  currentCalDate: CalDateProps[] | null = null;

  week: CalWeekProps[] = [];

  id!: string;

  start!: string;

  strategy!: CalendarCalc;

  controlled = false;

  init = false;

  private getStrategy(
    strategy: ConstructorParameters<typeof CalendarCalc>[0],
    auxiliary: {
      maxRange: number;
      allowSameDay: boolean;
      maxSize: number;
    },
  ) {
    if (this.mode === CalTypeEnum.SINGLE) {
      return new SingleCalendarCalc(strategy);
    }
    if (this.mode === CalTypeEnum.MULTIPLE) {
      return new MultipleCalendarCalc(strategy, auxiliary.maxSize);
    }
    return new RangeCalendarCalc(strategy, auxiliary);
  }

  private getCalMonthList(monthList: CalMonthProps[]): CalMonthRenderProps[] {
    return monthList.map(({ time }, index) => {
      const dateList = getDayByMonth({
        month: time,
        select: this.currentDate,
        border: { min: this.strategy.minDate, max: this.strategy.maxDate },
        formatter: this.strategy.formatter,
        parentIndex: index,
      });
      const isCover = judgeCover(dateList[0], this.currentDate, this.mode);
      const isCompare = judgeCompare(dateList[0], this.currentDate, this.mode);
      const offset = this.week.findIndex(i => i.value === dateList[0].week);
      const { year, month } = dateList[0];
      return {
        title: `${year}年${month}月`,
        year,
        month,
        isCover,
        isCompare,
        curDate: isCompare ? this.currentDate.map(i => ({ ...i })) : [],
        dateList,
        offset,
        week: this.week,
      };
    });
  }

  findMonthLocation() {
    // 默认 靠近今天定位
    let locationCalData = this.strategy.minDate;
    if (this.currentDate.length !== 0) {
      // 结果定位
      [locationCalData] = this.currentDate;
    } else {
      const today = getCalDate(new Date());
      if (
        this.strategy.minDate.fullDateNum <= today.fullDateNum &&
        this.strategy.maxDate.fullDateNum >= today.fullDateNum
      ) {
        // 今天定位
        locationCalData = today;
      } else if (
        Math.abs(this.strategy.minDate.fullDateNum - today.fullDateNum) >
        Math.abs(this.strategy.maxDate.fullDateNum - today.fullDateNum)
      ) {
        // 靠近今天定位
        locationCalData = this.strategy.maxDate;
      }
    }
    const index = this.monthList.findIndex(
      month => month.year === locationCalData.year && month.month === locationCalData.month,
    );
    return `month${index}`;
  }

  isControlled(value: CalDateTimeType[] | null | CalDateTimeType) {
    if (!this.init) {
      this.init = true;
      if (value === null) {
        this.controlled = false;
      } else {
        this.controlled = true;
      }
    }
  }

  changeProps({
    mode,
    minDate,
    maxDate,
    allowSameDay,
    start,
    value,
    defaultValue,
    maxRange,
    maxSize,
    formatter,
  }: CalendarProps) {
    this.mode = mode;
    this.start = start;
    this.strategy = this.getStrategy({ minDate, maxDate, formatter }, { maxRange, allowSameDay, maxSize });
    if (this.controlled) {
      this.currentCalDate = this.strategy.calcCalDate(value);
    } else if (!this.currentCalDate) {
      this.currentCalDate = this.strategy.calcCalDate(defaultValue);
    } else {
      this.currentCalDate = this.strategy.filterInvalidCalDate(this.currentDate);
    }
    const [monthList, currentDate] = calcMonthData(
      { min: this.strategy.minDate, max: this.strategy.maxDate },
      this.currentCalDate,
    );
    this.currentDate = currentDate;
    this.week = getWeek(this.start);
    this.monthList = this.getCalMonthList(monthList);
    this.id = this.findMonthLocation();
  }

  *calcUpdateData(calDate: CalRenderDateProps) {
    const gen = this.strategy.select({ actionCalDate: calDate, calDateList: this.currentDate });
    let genNext = gen.next();
    while (!genNext.done) {
      yield genNext.value;
      genNext = gen.next();
    }
    const nextData = genNext.value;
    if (this.currentDate === nextData) {
      return null;
    }
    const updataData = this.strategy.calcUpdateData({
      prevData: this.currentDate,
      nextData,
      actionCalDate: calDate,
      monthList: this.monthList,
    });
    this.currentDate = nextData;
    return updataData;
  }

  get data() {
    if (this.currentDate.length > 0) {
      const [cur] = this.currentDate;
      if (cur.status === DateStatusEnum.RANGE_FULL) {
        const start = this.strategy.formatter
          ? this.strategy.formatter({
              ...cur,
              status: DateStatusEnum.RANGE_START,
            })
          : { ...cur, status: DateStatusEnum.RANGE_START };
        const end = this.strategy.formatter
          ? this.strategy.formatter({
              ...cur,
              status: DateStatusEnum.RANGE_END,
            })
          : { ...cur, status: DateStatusEnum.RANGE_END };
        return [start, end];
      }
    }
    return this.currentDate;
  }
}
