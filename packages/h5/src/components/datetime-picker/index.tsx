import { Component, h, Prop, State, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { isCustomEvent } from '../common/utils';
import getCurYear, {
  DateTimePickerColumnEnum,
  DateTimePickerEnum,
  DateTimePickerHelper,
  getOrderPickerValue,
  getOrderValue,
  DateTimeTypeMapping,
} from './utils';

const currentYear = getCurYear();
const defaultProps = {
  type: DateTimePickerEnum.DATE,
  minDate: new Date(currentYear - 10, 0, 1).getTime(),
  maxDate: new Date(currentYear + 10, 11, 31).getTime(),
  sort: [DateTimePickerColumnEnum.YEAR, DateTimePickerColumnEnum.MONTH, DateTimePickerColumnEnum.DAY],
  label: 'label',
  title: 'title',
  titlebar: true,
  visibleItemCount: 5,
  optionItemHeight: 108,
};
@Component({
  tag: 'ti-datetime-picker',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiDatetimePicker {
  @Prop() value: unknown;

  @Prop() type?: `${DateTimePickerEnum}` = defaultProps.type;

  @Prop() minDate: number = defaultProps.minDate;

  @Prop() maxDate: number = defaultProps.maxDate;

  @Prop() filter?: (
    type: DateTimePickerColumnEnum,
    values: {
      [x: string]: unknown;
      value: number;
    }[],
    params: { day: unknown; hour: unknown; minute: unknown; year: unknown; month: unknown },
  ) => unknown;

  @Prop() formatter?: (
    type: DateTimePickerColumnEnum,
    value: number,
    params: { day: unknown; hour: unknown; minute: unknown; year: unknown; month: unknown },
  ) => unknown;

  @Prop() loading?: boolean;

  @Prop() sort?: DateTimePickerColumnEnum[] = defaultProps.sort;

  @Prop() label? = defaultProps.label;

  @Prop() titlebar = defaultProps.titlebar;

  @Prop() title = defaultProps.title;

  @Prop() subTitle?: string;

  @Prop() confirmText?: string;

  @Prop() cancelText?: string;

  @Prop() visibleItemCount?: number = defaultProps.visibleItemCount;

  @Prop() optionItemHeight?: string | number = defaultProps.optionItemHeight;

  @Prop() extStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  @Prop() extOptionStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  @Prop() extHairlineClass?: string = '';

  @Prop() extMaskClass?: string = '';

  @Prop() extOptionClass?: string = '';

  @Prop() extOptionItemClass?: string = '';

  @Prop() extClass?: string = '';

  @Prop() yearUseSelectSlot?: boolean = false;

  @Prop() monthUseSelectSlot?: boolean = false;

  @Prop() dayUseSelectSlot?: boolean = false;

  @Prop() hourUseSelectSlot?: boolean = false;

  @Prop() minuteUseSelectSlot?: boolean = false;

  @State() yearOption: unknown[] = [];

  @State() yearValue: unknown;

  @State() monthOption: unknown[] = [];

  @State() monthValue: unknown;

  @State() dayOption: unknown[] = [];

  @State() dayValue: unknown;

  @State() hourOption: unknown[] = [];

  @State() hourValue: unknown;

  @State() minuteOption: unknown[] = [];

  @State() minuteValue: unknown;

  @State() pickerSort: unknown[] = [];

  helper!: DateTimePickerHelper;

  status!: string;

  result!: number;

  max!: number;

  temp: { [key: string]: unknown } = {};

  componentWillLoad() {
    this.status = 'created';
    this.helper = new DateTimePickerHelper();
    this.result = 0;
    this.max = 0;
  }

  componentDidLoad() {
    this.status = 'ready';
    const {
      minDate = defaultProps.minDate,
      maxDate = defaultProps.maxDate,
      type = defaultProps.type,
      label = defaultProps.label,
      sort = defaultProps.sort,
      value,
      formatter,
      filter,
    } = this;
    this.temp.value = value;
    this.temp.minDate = minDate;
    this.temp.maxDate = maxDate;
    this.temp.type = type;
    this.temp.label = label;
    this.temp.sort = sort;
    this.temp.formatter = formatter;
    this.temp.filter = filter;
    if (!this.helper.isChangeProps) {
      this.updateValue();
    }
  }

  @Event({ eventName: 'confirm', composed: false }) confirmEvent!: EventEmitter<unknown>;

  @Event({ eventName: 'cancel', composed: false }) cancelEvent!: EventEmitter<unknown>;

  @Event({ eventName: 'change', composed: false }) changeEvent!: EventEmitter<unknown>;

  onConfirm = (event: CustomEvent) => {
    event.stopPropagation();
    const { value } = event.detail;
    const { type = DateTimePickerEnum.DATE } = this;
    const val = getOrderValue(type, value);
    this.helper.changeValue(val);
    this.confirmEvent.emit({ type, value: this.helper.standardValue });
  };

  onCancel = (event: CustomEvent) => {
    event.stopPropagation();
    const { value } = event.detail;
    const { type = DateTimePickerEnum.DATE } = this;
    const val = getOrderValue(type, value);
    this.helper.changeValue(val);
    this.cancelEvent.emit({ type, value: this.helper.standardValue });
  };

  componentDidUpdate() {
    const {
      value,
      minDate = defaultProps.minDate,
      maxDate = defaultProps.maxDate,
      type = defaultProps.type,
      label = defaultProps.label,
      sort = defaultProps.sort,
      formatter,
      filter,
    } = this;
    if (
      this.temp.value !== value ||
      this.temp.minDate !== minDate ||
      this.temp.maxDate !== maxDate ||
      this.temp.type !== type ||
      this.temp.label !== label ||
      this.temp.sort !== sort ||
      this.temp.formatter !== formatter ||
      this.temp.filter !== filter
    ) {
      this.temp.value = value;
      this.temp.minDate = minDate;
      this.temp.maxDate = maxDate;
      this.temp.type = type;
      this.temp.label = label;
      this.temp.sort = sort;
      this.temp.formatter = formatter;
      this.temp.filter = filter;
      this.updateValue();
    }
  }

  onCalendarChange = (e: CustomEvent | Event) => {
    if (!isCustomEvent(e)) {
      return;
    }
    e.stopPropagation();
    const { colAlias, value } = e.detail;
    const { type = DateTimePickerEnum.DATE } = this;
    if (!colAlias) {
      this.result += 1;
      if (this.result < this.max) {
        return;
      }
      this.result = 0;
    }
    if (
      (type === DateTimePickerEnum.YEARMONTH && colAlias === DateTimePickerColumnEnum.YEAR) ||
      (type === DateTimePickerEnum.DATE &&
        (colAlias === DateTimePickerColumnEnum.YEAR || colAlias === DateTimePickerColumnEnum.MONTH)) ||
      (type === DateTimePickerEnum.DATETIME &&
        (colAlias === DateTimePickerColumnEnum.YEAR ||
          colAlias === DateTimePickerColumnEnum.MONTH ||
          colAlias === DateTimePickerColumnEnum.DAY ||
          colAlias === DateTimePickerColumnEnum.HOUR))
    ) {
      const newValue = getOrderPickerValue(type, value).map(
        (item: { colAlias: DateTimePickerColumnEnum; value: string }) => {
          if (item.colAlias === 'month') {
            return Number.parseInt(item.value, 10) - 1;
          }
          return Number.parseInt(item.value, 10);
        },
      ) as [number, number, number];
      const day = new Date(newValue[0], newValue[1] + 1, 0).getDate();
      newValue[2] = newValue[2] > day ? day : newValue[2];
      if (type === DateTimePickerEnum.YEARMONTH) {
        const min = new Date(this.minDate);
        const [minYear, minMonth] = [min.getFullYear(), min.getMonth()];
        const max = new Date(this.maxDate);
        const [maxYear, maxMonth] = [max.getFullYear(), max.getMonth()];
        if (minYear === newValue[0] && minMonth === newValue[1]) {
          newValue[2] = min.getDate();
        } else if (maxYear === newValue[0] && maxMonth === newValue[1]) {
          newValue[2] = max.getDate();
        } else {
          newValue[2] = 1;
        }
      }
      const newDate = new Date(...newValue);
      this.helper.changeValue(newDate);
      this.helper.setPickValue();
      this.helper.setScope();
      this.helper.setPickColumns();
      let list = DateTimeTypeMapping[type];
      const start = list.findIndex(item => item === colAlias);
      if (start === list.length - 1) {
        return;
      }
      list = list.slice(start + 1, list.length);
      const update = list.reduce((target, item) => {
        const optionKey = `${item}Option`;
        const valueKey = `${item}Value`;
        target[optionKey] = this.helper[optionKey];
        target[valueKey] = this.helper[valueKey];
        return target;
      }, {});
      this.max = Object.keys(update).length / 2;
      Object.assign(this, update);
      return;
    }
    const val = getOrderValue(type, value);
    this.helper.changeValue(val);
    this.helper.setPickValue();
    this.changeEvent.emit({ type, value: this.helper.standardValue });
  };

  updateValue() {
    const {
      minDate = defaultProps.minDate,
      maxDate = defaultProps.maxDate,
      type = defaultProps.type,
      label = defaultProps.label,
      sort = defaultProps.sort,

      value,
      formatter,
      filter,
    } = this;
    const update = this.helper.changeProps({ value, minDate, maxDate, label, type, sort, formatter, filter });
    this.max = this.helper.sort.length;
    Object.assign(this, update);
  }

  render() {
    const {
      label = defaultProps.label,
      title = defaultProps.title,
      titlebar = defaultProps.titlebar,
      visibleItemCount = defaultProps.visibleItemCount,
      optionItemHeight = defaultProps.optionItemHeight,
      loading,
      subTitle,
      confirmText,
      cancelText,
      extStyle,
      extOptionStyle = '',
      extHairlineClass = '',
      extMaskClass = '',
      extOptionClass = ' ',
      extOptionItemClass = ' ',
      extClass = '',
    } = this;
    const {
      pickerSort,
      minuteOption,
      minuteValue,
      hourValue,
      hourOption,
      dayOption,
      dayValue,
      monthOption,
      monthValue,
      yearOption,
      yearValue,
      yearUseSelectSlot,
      monthUseSelectSlot,
      dayUseSelectSlot,
      hourUseSelectSlot,
      minuteUseSelectSlot,
    } = this;
    // https://www.w3.org/TR/css-shadow-parts-1/#exportparts-attr
    return (
      <ti-picker
        loading={loading}
        titlebar={titlebar}
        visibleItemCount={visibleItemCount}
        optionItemHeight={optionItemHeight}
        title={title}
        subTitle={subTitle}
        confirmText={confirmText}
        cancelText={cancelText}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        onChange={this.onCalendarChange}
        extClass={extClass}
        extStyle={extStyle}
        extHairlineClass={extHairlineClass}
        extMaskClass={extMaskClass}
        exportparts={` ${extHairlineClass}:${extHairlineClass}, ${extMaskClass}:${extMaskClass}`}
      >
        {pickerSort.map(item => {
          if (item === 'year') {
            return (
              <ti-picker-column
                key={item}
                columns={yearOption}
                value={yearValue}
                colAlias={item}
                rowAlias="value"
                label={label}
                extStyle={extOptionStyle}
                extOptionItemClass={extOptionItemClass}
                extClass={extOptionClass}
                exportparts={` ${extOptionClass}:${extOptionClass}, ${extOptionItemClass}:${extOptionItemClass}`}
                useSelectSlot={yearUseSelectSlot}
                sports
              >
                <slot name="yearSelectSlot" slot="select" />
              </ti-picker-column>
            );
          }
          if (item === 'month') {
            return (
              <ti-picker-column
                key={item}
                columns={monthOption}
                value={monthValue}
                colAlias={item}
                rowAlias="value"
                label={label}
                extStyle={extOptionStyle}
                extOptionItemClass={extOptionItemClass}
                extClass={extOptionClass}
                exportparts={` ${extOptionClass}:${extOptionClass}, ${extOptionItemClass}:${extOptionItemClass}`}
                useSelectSlot={monthUseSelectSlot}
                sports
              >
                <slot name="monthSelectSlot" slot="select" />
              </ti-picker-column>
            );
          }
          if (item === 'day') {
            return (
              <ti-picker-column
                key={item}
                columns={dayOption}
                value={dayValue}
                colAlias={item}
                rowAlias="value"
                label={label}
                extStyle={extOptionStyle}
                extOptionItemClass={extOptionItemClass}
                extClass={extOptionClass}
                exportparts={` ${extOptionClass}:${extOptionClass}, ${extOptionItemClass}:${extOptionItemClass}`}
                useSelectSlot={dayUseSelectSlot}
                sports
              >
                <slot name="daySelectSlot" slot="select" />
              </ti-picker-column>
            );
          }
          if (item === 'hour') {
            return (
              <ti-picker-column
                key={item}
                columns={hourOption}
                value={hourValue}
                colAlias={item}
                rowAlias="value"
                label={label}
                extStyle={extOptionStyle}
                extOptionItemClass={extOptionItemClass}
                extClass={extOptionClass}
                exportparts={` ${extOptionClass}:${extOptionClass}, ${extOptionItemClass}:${extOptionItemClass}`}
                useSelectSlot={hourUseSelectSlot}
                sports
              >
                <slot name="hourSelectSlot" slot="select" />
              </ti-picker-column>
            );
          }
          if (item === 'minute') {
            return (
              <ti-picker-column
                key={item}
                columns={minuteOption}
                value={minuteValue}
                colAlias={item}
                rowAlias="value"
                label={label}
                extStyle={extOptionStyle}
                extOptionItemClass={extOptionItemClass}
                extClass={extOptionClass}
                exportparts={` ${extOptionClass}:${extOptionClass}, ${extOptionItemClass}:${extOptionItemClass}`}
                useSelectSlot={minuteUseSelectSlot}
                sports
              >
                <slot name="minuteSelectSlot" slot="select" />
              </ti-picker-column>
            );
          }
          return null;
        })}
      </ti-picker>
    );
  }
}
