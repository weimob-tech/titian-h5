/* eslint-disable class-methods-use-this */
/* eslint-disable @titian/no-more-args */
import { Component, State, Prop, Watch, Event, EventEmitter, h, Fragment, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, isPlainObject, isPlainArray, addShadowRootStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import Calendar from './calendar';
import {
  CalTypeEnum,
  DateStatusEnum,
  CalErrorProps,
  CalRenderDateProps,
  CalMonthRenderProps,
  CalDateProps,
  CalWeekProps,
  WEEK,
  CalDateTimeType,
} from './const';

const DateStatusClass: {
  [key in {
    [k in DateStatusEnum]: k extends '' ? never : k;
  }[DateStatusEnum]]: {
    className: string[];
    roundClassName: string[] | ((...agrn: any[]) => string[]);
  };
} = {
  disabled: {
    className: ['date-disabled'],
    roundClassName: ['date-disabled'],
  },
  single: {
    className: ['date-selected', 'date-sig'],
    roundClassName: ['date-selected', 'date-sig-round'],
  },
  range_start: {
    className: ['date-selected', 'date-rs-sig'],
    roundClassName(length: number) {
      return length > 1 ? ['date-selected', 'date-rs-round'] : ['date-selected', 'date-rs-sig-round'];
    },
  },
  range_full: {
    className: ['date-selected', 'date-rs-sig'],
    roundClassName: ['date-selected', 'date-rs-sig-round'],
  },
  range_end: {
    className: ['date-selected', 'date-rs-sig'],
    roundClassName: ['date-selected', 'date-re-round'],
  },
  multiple: {
    className: ['date-selected', 'date-m'],
    roundClassName: ['date-selected', 'date-m-round'],
  },
  multiple_start: {
    className: ['date-selected', 'date-ms'],
    roundClassName: ['date-selected', 'date-ms-round'],
  },
  multiple_middle: {
    className: ['date-selected', 'date-mm'],
    roundClassName: ['date-selected', 'date-mm-round'],
  },
  multiple_end: {
    className: ['date-selected', 'date-me'],
    roundClassName: ['date-selected', 'date-me-round'],
  },
};
function mergeStyle(index: number, offset: number) {
  if (index === 0) {
    return `margin-left:${(100 / 7) * offset}%;`;
  }
  return '';
}
function getClass(calDate: CalRenderDateProps, round: boolean, curData: CalRenderDateProps[], isCompare: boolean) {
  if (isCompare && curData.length === 2) {
    if (calDate.fullDateNum > curData[0].fullDateNum && calDate.fullDateNum < curData[1].fullDateNum) {
      if (round) {
        return ['date-cover-round'];
      }
      return ['date-cover'];
    }
  }
  const gather = calDate.status === DateStatusEnum.NOT_STATUS ? undefined : DateStatusClass[calDate.status];
  if (gather) {
    const className = round ? gather.roundClassName : gather.className;
    if (typeof className === 'function') {
      return className(curData.length);
    }
    return className;
  }
  return [];
}
const defaultProps = {
  position: 'bottom' as HTMLTiPopupElement['position'],
  confirmText: '确定',
  title: '日期选择',
  color: '#2580FF',
  start: WEEK[0].name,
  mode: CalTypeEnum.SINGLE,
  closeOnMask: true,
  maxRange: 0,
  maxSize: 0,
  minDate: Date.now(),
  maxDate: new Date(new Date().getFullYear(), new Date().getMonth() + 6, new Date().getDate()).getTime(),
};
@Component({
  tag: 'ti-calendar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCalendar {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() visible = false;

  @Prop() position: HTMLTiPopupElement['position'] = defaultProps.position;

  @Prop() closeOnMask = defaultProps.closeOnMask;

  @Prop() destroyOnClose = false;

  @Prop() confirmText = defaultProps.confirmText;

  @Prop() title = defaultProps.title;

  @Prop() extPopupClass?: string = '';

  @Prop() extPopupContentClass?: string = '';

  @Prop() extPopupMaskClass?: string = '';

  @Prop() extClass?: string = '';

  @Prop() color?: string = defaultProps.color;

  @Prop() start = defaultProps.start;

  @Prop() mode: `${CalTypeEnum}` = defaultProps.mode;

  @Prop() defaultValue?: CalDateTimeType[] | CalDateTimeType | null = null;

  @Prop() value?: CalDateTimeType[] | CalDateTimeType | null = null;

  @Prop() round = false;

  @Prop() allowSameDay = false;

  @Prop() maxRange = defaultProps.maxRange;

  @Prop() maxSize = defaultProps.maxSize;

  @Prop() formatter?: (date: CalRenderDateProps) => CalRenderDateProps;

  @Prop() minDate?: number = defaultProps.minDate;

  @Prop() maxDate?: number = defaultProps.maxDate;

  @Prop() disableGlobalTouchMove?: boolean = false;

  @Prop() usePopup?: boolean = true;

  @State() week?: CalWeekProps[] = [];

  @State() monthList: CalMonthRenderProps[] = [];

  @State() monthTitle = '';

  @Event({ bubbles: false, eventName: 'error', composed: false }) errorEvent!: EventEmitter<{
    error: CalErrorProps;
    date: CalDateProps;
    currentDate: CalRenderDateProps[];
  }>;

  @Event({ bubbles: false, eventName: 'select', composed: false }) selectEvent!: EventEmitter<{
    date: CalDateProps;
    currentDate: CalRenderDateProps[];
  }>;

  @Event({ bubbles: false, eventName: 'close', composed: false }) closeEvent!: EventEmitter;

  @Event({ bubbles: false, eventName: 'confirm', composed: false }) confirmEvent!: EventEmitter<CalRenderDateProps[]>;

  calendar!: Calendar;

  scroll!: HTMLElement;

  status = '';

  intersectionScroll!: IntersectionObserver;

  box!: HTMLElement;

  temp: { [key: string]: unknown } = {};

  componentWillLoad() {
    this.status = 'created';
    this.calendar = new Calendar();

    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    this.updateDataByProps();
    if (this.visible) {
      this.intersectionObserver();
      this.addEventListener();
    }
    const {
      minDate = defaultProps.minDate,
      maxDate = defaultProps.maxDate,
      mode = defaultProps.mode,
      maxRange = defaultProps.maxRange,
      maxSize = defaultProps.maxSize,
      start = defaultProps.start,
      allowSameDay,
      value,
      defaultValue,
      formatter,
    } = this;
    this.temp.minDate = minDate;
    this.temp.maxDate = maxDate;
    this.temp.mode = mode;
    this.temp.maxRange = maxRange;
    this.temp.allowSameDay = allowSameDay;
    this.temp.start = start;
    this.temp.value = value;
    this.temp.defaultValue = defaultValue;
    this.temp.formatter = formatter;
    this.temp.maxSize = maxSize;
  }

  componentDidUpdate() {
    const {
      minDate = defaultProps.minDate,
      maxDate = defaultProps.maxDate,
      mode = defaultProps.mode,
      maxRange = defaultProps.maxRange,
      maxSize = defaultProps.maxSize,
      start = defaultProps.start,
      allowSameDay,
      value,
      defaultValue,
      formatter,
    } = this;
    if (
      this.temp.minDate !== minDate ||
      this.temp.maxDate !== maxDate ||
      this.temp.mode !== mode ||
      this.temp.maxRange !== maxRange ||
      this.temp.allowSameDay !== allowSameDay ||
      this.temp.start !== start ||
      this.temp.value !== value ||
      this.temp.defaultValue !== defaultValue ||
      this.temp.formatter !== formatter ||
      this.temp.maxSize !== maxSize
    ) {
      this.temp.minDate = minDate;
      this.temp.maxDate = maxDate;
      this.temp.mode = mode;
      this.temp.maxRange = maxRange;
      this.temp.allowSameDay = allowSameDay;
      this.temp.start = start;
      this.temp.value = value;
      this.temp.defaultValue = defaultValue;
      this.temp.formatter = formatter;
      this.temp.maxSize = maxSize;
      this.updateDataByProps();
    }
  }

  @Watch('visible')
  observerVisible(val: boolean) {
    if (val && this.calendar.init) {
      requestAnimationFrame(() => {
        this.calendar.id = this.calendar.findMonthLocation();
        const position = this.calendar.monthList.find((_month, index) => `month${index}` === this.calendar.id);
        if (position) {
          this.monthTitle = position.title;
        }
        this.scrollIntoCurrentMonth();
      });
    }
    if (val) {
      this.addEventListener();
    } else {
      this.removeEventListener();
    }
  }

  scrollIntoCurrentMonth() {
    const element = this.scroll.querySelector(`#${this.calendar.id}`);
    setTimeout(() => {
      element?.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'start' });
      this.intersectionObserver();
    }, 200);
  }

  addEventListener() {
    this.host?.addEventListener('touchmove', this.touchmoveByHost, { passive: false });
    this.scroll?.addEventListener('touchmove', this.touchmoveByScroll);
  }

  removeEventListener() {
    this.host?.removeEventListener('touchmove', this.touchmoveByHost);
    this.scroll?.removeEventListener('touchmove', this.touchmoveByScroll);
  }

  touchmoveByHost(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  touchmoveByScroll(event: TouchEvent) {
    event.stopPropagation();
  }

  intersectionObserver() {
    const sections = [...Array.from(this.box.querySelectorAll('.titian-calendar-month'))];
    this.intersectionScroll = new IntersectionObserver(
      ([elements]) => {
        // console.log(elements.isIntersecting, title, elements.intersectionRatio);
        if (elements.intersectionRatio > 0.5) {
          if (elements.target instanceof HTMLElement) {
            const { title, id } = elements.target.dataset;
            if (!id) {
              return;
            }
            if (this.monthTitle === title) {
              return;
            }
            this.monthTitle = title || '';
            this.calendar.id = id;
          }
        }
      },
      {
        root: this.scroll,
        threshold: [0, 0.5, 1],
      },
    );
    sections.forEach(section => {
      this.intersectionScroll.observe(section);
    });
  }

  disconnectedCallback() {
    this.intersectionScroll?.disconnect();
    this.removeEventListener();
  }

  updateDataByProps() {
    const {
      minDate = defaultProps.minDate,
      maxDate = defaultProps.maxDate,
      mode = defaultProps.mode,
      maxRange = defaultProps.maxRange,
      maxSize = defaultProps.maxSize,
      start = defaultProps.start,
      allowSameDay,
      defaultValue = null,
      value = null,
      formatter,
    } = this;
    this.calendar.isControlled(value);
    this.calendar.changeProps({
      minDate,
      maxDate,
      mode,
      maxRange,
      allowSameDay,
      start,
      defaultValue,
      value,
      maxSize,
      formatter,
    });
    this.monthList = this.calendar.monthList;
    this.week = this.calendar.week;
  }

  onSelect = (event: Event) => {
    if (event.currentTarget instanceof HTMLDivElement) {
      const { monthIndex, dateIndex } = event.currentTarget.dataset;
      if (!monthIndex || !dateIndex) {
        return;
      }
      const date = this.monthList[Number(monthIndex)].dateList[Number(dateIndex)];
      if (date.status === DateStatusEnum.DISABLED) {
        const error: CalErrorProps = { type: 'disabled', message: '当前日期禁用' };
        // eslint-disable-next-line @titian/check-life-items
        this.errorEvent.emit({ error, date, currentDate: this.calendar.data });
        return;
      }
      if (this.calendar.controlled) {
        this.selectEvent.emit({ date, currentDate: this.calendar.currentDate });
        return;
      }
      const gen = this.calendar.calcUpdateData(date);
      let genNext = gen.next();
      while (!genNext.done) {
        const error = genNext.value as CalErrorProps;
        // eslint-disable-next-line @titian/check-life-items
        this.errorEvent.emit({ error, date, currentDate: this.calendar.data });
        genNext = gen.next();
      }

      const updateData = genNext.value;
      if (updateData) {
        Object.keys(updateData).forEach(key => {
          const array = key.match(/([a-zA-Z0-9]{1,})/g);
          if (array && array.length > 0) {
            const last = array[array.length - 1];
            array.length -= 1;
            const currentTarget = array.reduce((target: unknown, k) => {
              if (isPlainObject(target)) {
                if (k in target) {
                  return target[k];
                }
              }
              if (isPlainArray(target)) {
                return target[Number(k)];
              }
              throw new Error('内部错误');
            }, this.calendar) as { [key: string]: unknown };
            currentTarget[last] = updateData[key];
          }
        });
        this.monthList = [...this.calendar.monthList];
        this.selectEvent.emit({ date, currentDate: this.calendar.data });
      }
    }
  };

  onClose = () => {
    this.closeEvent.emit();
  };

  onConfirm = () => {
    this.confirmEvent.emit(this.calendar.data);
  };

  componentDidRender() {
    const styleList = this.host.shadowRoot.querySelector('slot')?.assignedNodes({ flatten: true });
    if (Array.isArray(styleList)) {
      styleList.forEach(style => {
        this.host.shadowRoot.appendChild(style);
      });
    }
  }

  renderCalendar() {
    const {
      week = [],
      title = defaultProps.title,
      color = defaultProps.color,
      confirmText = defaultProps.confirmText,
      monthList,
      round,
      monthTitle = '',
      extStyle,
      extClass = '',
    } = this;
    return (
      <>
        {title && (
          <ti-popup-titlebar
            title={title}
            variant="cancel-only"
            onClose={this.onClose}
            onCancel={this.onClose}
            onConfirm={this.onClose}
          />
        )}
        <div
          class={`${join('calendar')} ${extClass}`}
          part={extClass}
          style={stringToAttrStyle(extStyle)}
          ref={box => {
            if (box) {
              this.box = box;
            }
          }}
        >
          <div class={handle('calendar', ['header'])}>
            <div class={handle('calendar', ['weekdays'])}>
              {week.map(item => (
                <div class={handle('calendar', ['weekday'])} key={item.text}>
                  {item.text}
                </div>
              ))}
            </div>
            <div class={handle('calendar', ['title'])}>{monthTitle}</div>
          </div>
          <div
            class={handle('calendar', ['scroll'])}
            ref={scroll => {
              if (scroll) {
                this.scroll = scroll;
              }
            }}
          >
            {monthList.map((month, index) => (
              <div
                class={join('calendar-month')}
                data-title={month.title}
                data-id={`month${index}`}
                id={`month${index}`}
              >
                <div class={handle('calendar', ['title'])} data-title={month.title} data-id={`month${index}`}>
                  {month.title}
                </div>
                <div class={handle('calendar', ['box', month.isCover ? `box-cover${round ? '-round' : ''}` : ''])}>
                  {month.dateList.map((date, dateIndex) => (
                    <div
                      class={`${handle('calendar', ['date'])} ${handle(
                        'calendar',
                        getClass(date, round, month.curDate, month.isCompare),
                      )}`}
                      aria-hidden="true"
                      onClick={this.onSelect}
                      data-date={date.fullDateNum}
                      data-month-index={index}
                      data-date-index={dateIndex}
                      data-status={date.status}
                      style={{ color, ...stringToAttrStyle(mergeStyle(dateIndex, month.offset)) }}
                    >
                      {date.topInfo && <div class={handle('calendar', ['date-top-info'])}>{date.topInfo}</div>}
                      <div class={handle('calendar', ['date-content'])} />
                      <div class={handle('calendar', ['date-text'])}> {date.text}</div>
                      {date.bottomInfo && <div class={handle('calendar', ['date-bottom-info'])}>{date.bottomInfo}</div>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {confirmText && (
            <ti-button
              size="large"
              color={color}
              extClass={`${handle('calendar', ['submit'])}`}
              onClick={this.onConfirm}
            >
              {confirmText}
            </ti-button>
          )}
        </div>
        <slot />
      </>
    );
  }

  render() {
    const {
      position = defaultProps.position,
      closeOnMask = defaultProps.closeOnMask,
      visible,
      destroyOnClose,
      extPopupClass = '',
      extPopupContentClass = '',
      extPopupMaskClass = '',
      disableGlobalTouchMove,
      usePopup,
    } = this;
    if (usePopup) {
      return (
        <ti-popup
          visible={visible}
          position={position}
          closeOnMask={closeOnMask}
          destroyOnClose={destroyOnClose}
          onClose={this.onClose}
          ext-class={`${extPopupClass}`}
          ext-content-class={`${handle('calendar', ['popup-content'])} ${extPopupContentClass}`}
          ext-mask-class={extPopupMaskClass}
          ext-css={this.extCss}
          disableGlobalTouchMove={disableGlobalTouchMove}
          exportparts={`${extPopupClass}, ${extPopupContentClass}, ${extPopupMaskClass}`}
        >
          {this.renderCalendar()}
        </ti-popup>
      );
    }
    return this.renderCalendar();
  }
}
