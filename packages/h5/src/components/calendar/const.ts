export enum DateStatusEnum {
  /** 无状态 */
  'NOT_STATUS' = '',

  /** 禁用状态 */
  'DISABLED' = 'disabled',

  /** 单选选中状态 */
  'SINGLE' = 'single',

  /** 范围选择：起始状态 */
  'RANGE_START' = 'range_start',

  /** 范围选择：起始时间与结束时间为同一天 */
  'RANGE_FULL' = 'range_full',

  /** 范围选择：结束状态 */
  'RANGE_END' = 'range_end',

  /** 孤立多选（无连接）    */
  'MULTIPLE' = 'multiple',

  /** 多选（有连接） 起始状态    */
  'MULTIPLE_START' = 'multiple_start',

  /** 多选（有连接） 中间状态    */
  'MULTIPLE_MIDDLE' = 'multiple_middle',

  /** 多选（有连接） 结束状态    */
  'MULTIPLE_END' = 'multiple_end',
}

export enum CalTypeEnum {
  /** 单选 */
  'SINGLE' = 'single',

  /** 多选 */
  'MULTIPLE' = 'multiple',

  /** 范围选 */
  'RANGE' = 'range',
}

export interface CalWeekProps {
  name: string;
  text: string;
  value: number;
}

export const WEEK: CalWeekProps[] = [
  { name: 'Sunday', text: '日', value: 0 },
  { name: 'Monday', text: '一', value: 1 },
  { name: 'Tuesday', text: '二', value: 2 },
  { name: 'Wednesday', text: '三', value: 3 },
  { name: 'Thursday', text: '四', value: 4 },
  { name: 'Friday', text: '五', value: 5 },
  { name: 'Saturday', text: '六', value: 6 },
];

export type CalDateTimeType = Date | number | string;
/** 日历 日期格式 CalDate */
export interface CalDateProps {
  /** 日期 */
  date: Date;

  /** 毫秒数 */
  time: number;

  /** 年 */
  year: number;

  /** 月 */
  month: number;

  /** 日 */
  day: number;

  /** 星期 */
  week: number;

  /** 例 : 20211231 */
  fullDateNum: number;

  text: string | number;

  /** 状态 */
  status: DateStatusEnum;

  /** 顶部文案 */
  topInfo: string;

  /** 底部文案 */
  bottomInfo: string;
}

export interface CalRenderDateProps extends CalDateProps {
  parentIndex: number;
}

export interface CalErrorProps {
  message: string;
  type: 'maxSize' | 'maxRange' | 'disabled';
}
export interface CalMonthRenderProps {
  /** 标题 */
  title: string;

  /** 是否被覆盖 */
  isCover: boolean;

  /** 是否需要计算 */
  isCompare: boolean;

  /** 结果 */
  curDate: CalRenderDateProps[];
  dateList: CalRenderDateProps[];

  /** 星期偏移 */
  offset: number;
  week: CalWeekProps[];
  year: number;
  month: number;
}
export interface CalMonthProps {
  time: number;
  year: number;
  month: number;
}
