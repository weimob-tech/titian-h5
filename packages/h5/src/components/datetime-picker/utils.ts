import { isDisabled, isValidDate, padZero, range } from '../common/utils/index';

export default function getCurYear() {
  return new Date().getFullYear();
}
export enum DateTimePickerColumnEnum {
  YEAR = 'year',
  MONTH = 'month',
  DAY = 'day',
  HOUR = 'hour',
  MINUTE = 'minute',
}
export const DateTimeTypeMapping = Object.freeze({
  'date': Object.freeze([DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH, DateTimePickerColumnEnum.DAY]),
  'time': Object.freeze([DateTimePickerColumnEnum.HOUR, DateTimePickerColumnEnum.MINUTE]),
  'datetime': Object.freeze([
    DateTimePickerColumnEnum.YEAR,
    DateTimePickerColumnEnum.MONTH,
    DateTimePickerColumnEnum.DAY,
    DateTimePickerColumnEnum.HOUR,
    DateTimePickerColumnEnum.MINUTE,
  ]),
  'year-month': Object.freeze([DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH]),
});
export enum DateTimePickerEnum {
  /** 年月日 */
  'DATE' = 'date',

  /** 时分 */
  'TIME' = 'time',

  /** 年月日 - 时分 */
  'DATETIME' = 'datetime',

  /** 年月 */
  'YEARMONTH' = 'year-month',
}

export const GenerallyDateTime = new Map<`${DateTimePickerEnum}`, DateTimePickerColumnEnum[]>([
  [
    DateTimePickerEnum.DATE,
    [DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH, DateTimePickerColumnEnum.DAY],
  ],
  [DateTimePickerEnum.TIME, [DateTimePickerColumnEnum.HOUR, DateTimePickerColumnEnum.MINUTE]],
  [
    DateTimePickerEnum.DATETIME,
    [
      DateTimePickerColumnEnum.YEAR,
      DateTimePickerColumnEnum.MONTH,
      DateTimePickerColumnEnum.DAY,
      DateTimePickerColumnEnum.HOUR,
      DateTimePickerColumnEnum.MINUTE,
    ],
  ],
  [DateTimePickerEnum.YEARMONTH, [DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH]],
]);
export function getOrderPickerValue(
  type: `${DateTimePickerEnum}`,
  value: { colAlias: DateTimePickerColumnEnum; value: string }[],
): { colAlias: DateTimePickerColumnEnum; value: string }[] {
  return (GenerallyDateTime.get(type) || []).map(item => value.find(val => val.colAlias === item)).filter(Boolean) as {
    colAlias: DateTimePickerColumnEnum;
    value: string;
  }[];
}

export function getOrderValue(
  type: `${DateTimePickerEnum}`,
  value: { colAlias: DateTimePickerColumnEnum; value: string }[],
): string | Date {
  const orderValue = getOrderPickerValue(type, value);
  if (type !== DateTimePickerEnum.TIME) {
    const orderMonthValue = orderValue.map(item => {
      if (item.colAlias === DateTimePickerColumnEnum.MONTH) {
        return Number.parseInt(item.value, 10) - 1;
      }
      return Number.parseInt(item.value, 10);
    }) as [number, number, number];
    return new Date(...orderMonthValue);
  }
  return orderValue.map(item => item.value).join(':');
}

export class DateTimePickerHelper {
  type: `${DateTimePickerEnum}` = DateTimePickerEnum.DATE;

  value: unknown;

  minDate = 0;

  maxDate = 0;

  minHour = 0;

  maxHour = 23;

  minMinute = 0;

  maxMinute = 59;

  standardValue: unknown;

  scopes: { type: DateTimePickerColumnEnum; scope: [number, number] }[] = [];

  yearOption: unknown[];

  yearValue: unknown = '';

  monthOption: unknown[];

  monthValue: unknown = '';

  dayOption: unknown[];

  dayValue: unknown = '';

  hourOption: unknown[];

  hourValue: unknown = '';

  minuteOption: unknown[];

  minuteValue: unknown = '';

  sort: DateTimePickerColumnEnum[] = [];

  formatter?: (
    type: DateTimePickerColumnEnum,
    value: number,
    params: { day: unknown; hour: unknown; minute: unknown; year: unknown; month: unknown },
  ) => unknown;

  filter?: (
    type: DateTimePickerColumnEnum,
    values: {
      [x: string]: unknown;
      value: number;
    }[],
    params: { day: unknown; hour: unknown; minute: unknown; year: unknown; month: unknown },
  ) => unknown;

  label = 'label';

  isChangeProps = false;

  constructor() {
    this.yearOption = [];
    this.monthOption = [];
    this.dayOption = [];
    this.hourOption = [];
    this.minuteOption = [];
  }

  changeProps({
    type,
    label,
    value,
    minDate,
    maxDate,
    sort = [],
    formatter,
    filter,
  }: {
    value: unknown;
    minDate: number;
    maxDate: number;
    label: string;
    type: `${DateTimePickerEnum}`;
    sort: DateTimePickerColumnEnum[];
    formatter?: (
      type: DateTimePickerColumnEnum,
      value: number,
      params: { day: unknown; hour: unknown; minute: unknown; year: unknown; month: unknown },
    ) => unknown;
    filter?: (
      type: DateTimePickerColumnEnum,
      values: {
        [x: string]: unknown;
        value: number;
      }[],
      params: { day: unknown; hour: unknown; minute: unknown; year: unknown; month: unknown },
    ) => unknown;
    [key: string]: unknown;
  }) {
    this.isChangeProps = true;
    this.type = type;
    this.label = label;
    this.value = value;
    this.minDate = minDate;
    this.maxDate = maxDate;
    this.sort = sort;
    this.formatter = formatter;
    this.filter = filter;
    this.changeSort();
    this.changeValue(value);
    this.setPickValue();
    this.setScope();
    this.setPickColumns();
    return {
      pickerSort: this.sort,
      yearOption: this.yearOption,
      yearValue: this.yearValue,
      monthOption: this.monthOption,
      monthValue: this.monthValue,
      dayOption: this.dayOption,
      dayValue: this.dayValue,
      hourOption: this.hourOption,
      hourValue: this.hourValue,
      minuteOption: this.minuteOption,
      minuteValue: this.minuteValue,
    };
  }

  changeSort() {
    let sortOption: DateTimePickerColumnEnum[] = [];
    switch (this.type) {
      case DateTimePickerEnum.DATE:
        sortOption = [DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH, DateTimePickerColumnEnum.DAY];
        break;
      case DateTimePickerEnum.TIME:
        sortOption = [DateTimePickerColumnEnum.HOUR, DateTimePickerColumnEnum.MINUTE];
        break;
      case DateTimePickerEnum.DATETIME:
        sortOption = [
          DateTimePickerColumnEnum.YEAR,
          DateTimePickerColumnEnum.MONTH,
          DateTimePickerColumnEnum.DAY,
          DateTimePickerColumnEnum.HOUR,
          DateTimePickerColumnEnum.MINUTE,
        ];
        break;
      case DateTimePickerEnum.YEARMONTH:
        sortOption = [DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH];
        break;
      default:
        throw new Error('type error');
    }
    if (
      [...this.sort].sort((a, b) => a.localeCompare(b)).join('') !==
      [...sortOption].sort((a, b) => a.localeCompare(b)).join('')
    ) {
      this.sort = sortOption;
    }
  }

  /** 设置标准格式 */
  changeValue(value: unknown) {
    const { type, minHour, maxHour, minDate, maxDate, minMinute, maxMinute } = this;
    let val = value;
    if (type === DateTimePickerEnum.TIME) {
      if (!val || typeof val !== 'string') {
        val = `${padZero(minHour)}:00`;
      }
    } else if (!isValidDate(val)) {
      val = minDate;
    }

    if (type === DateTimePickerEnum.TIME) {
      const [hour, minute] = (val as string).split(':').map(item => Number(item));
      const hourStr = padZero(range(hour, minHour, maxHour));
      const minuteSTr = padZero(range(minute, minMinute, maxMinute));
      this.standardValue = `${hourStr}:${minuteSTr}`;
      return;
    }

    this.standardValue = range(val as number, minDate, maxDate);
  }

  /** 设置picker 需要格式 */
  setPickValue() {
    const { type, standardValue } = this;
    if (type === DateTimePickerEnum.TIME) {
      const [hour, minute] = (standardValue as string).split(':');
      this.hourValue = Number(hour);
      this.minuteValue = Number(minute);
      return;
    }
    const date = new Date(standardValue as number | string | Date);
    this.yearValue = date.getFullYear();
    this.monthValue = date.getMonth() + 1;
    if (this.type === DateTimePickerEnum.DATE) {
      this.dayValue = date.getDate();
    }
    if (this.type === DateTimePickerEnum.DATETIME) {
      this.dayValue = date.getDate();
      this.hourValue = date.getHours();
      this.minuteValue = date.getMinutes();
    }
  }

  /** 设置picker 纵列 */
  setPickColumns() {
    this.scopes.forEach(({ type, scope }) => {
      let values = new Array(scope[1] - scope[0] + 1).fill(0).map((_item, index) => {
        const val = scope[0] + index;
        if (typeof this.formatter === 'function') {
          const formatVal = this.formatter(type, val, {
            day: this.dayValue,
            hour: this.hourValue,
            minute: this.minuteValue,
            year: this.yearValue,
            month: this.monthValue,
          });
          return {
            [this.label]: formatVal,
            value: val,
          };
        }
        return {
          [this.label]: type === DateTimePickerColumnEnum.YEAR ? `${val}` : padZero(val),
          value: val,
        };
      });
      if (typeof this.filter === 'function') {
        values = this.filter(type, values, {
          day: this.dayValue,
          hour: this.hourValue,
          minute: this.minuteValue,
          year: this.yearValue,
          month: this.monthValue,
        }) as { [x: string]: unknown; value: number }[];
      }
      const number = values.findIndex(item => item.value === this[`${type}Value`] && !isDisabled(item));
      if (number === -1) {
        // eslint-disable-next-line no-console
        console.warn('结果被过滤出列表', this[`${type}Value`]);
      }
      this[`${type}Option`] = values;
    });
  }

  /**
   *  获取最大最小值
   */
  getBoundary(type: 'min' | 'max') {
    const value = new Date(this.standardValue as number | string | Date);
    const boundary = new Date(this[`${type}Date`]);
    const year = boundary.getFullYear();
    let month = 1;
    let date = 1;
    let hour = 0;
    let minute = 0;

    if (type === 'max') {
      month = 12;
      date = new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate();
      hour = 23;
      minute = 59;
    }
    if (value.getFullYear() === year) {
      month = boundary.getMonth() + 1;
      if (value.getMonth() + 1 === month) {
        date = boundary.getDate();
        if (value.getDate() === date) {
          hour = boundary.getHours();
          if (value.getHours() === hour) {
            minute = boundary.getMinutes();
          }
        }
      }
    }
    return {
      [`${type}Year`]: year,
      [`${type}Month`]: month,
      [`${type}Date`]: date,
      [`${type}Hour`]: hour,
      [`${type}Minute`]: minute,
    };
  }

  setScope() {
    if (this.type === DateTimePickerEnum.TIME) {
      this.scopes = [
        {
          type: DateTimePickerColumnEnum.HOUR,
          scope: [this.minHour, this.maxHour],
        },
        {
          type: DateTimePickerColumnEnum.MINUTE,
          scope: [this.minMinute, this.maxMinute],
        },
      ];
      return;
    }
    const { maxYear, maxDate, maxMonth, maxHour, maxMinute } = this.getBoundary('max');
    const { minYear, minDate, minMonth, minHour, minMinute } = this.getBoundary('min');
    const result: { type: DateTimePickerColumnEnum; scope: [number, number] }[] = [
      {
        type: DateTimePickerColumnEnum.YEAR,
        scope: [minYear, maxYear],
      },
      {
        type: DateTimePickerColumnEnum.MONTH,
        scope: [minMonth, maxMonth],
      },
      {
        type: DateTimePickerColumnEnum.DAY,
        scope: [minDate, maxDate],
      },
      {
        type: DateTimePickerColumnEnum.HOUR,
        scope: [minHour, maxHour],
      },
      {
        type: DateTimePickerColumnEnum.MINUTE,
        scope: [minMinute, maxMinute],
      },
    ];

    if (this.type === 'date') result.splice(3, 2);
    if (this.type === 'year-month') result.splice(2, 3);
    this.scopes = result;
  }
}
