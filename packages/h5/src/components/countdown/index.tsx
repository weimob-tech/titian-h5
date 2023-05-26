import { Component, EventEmitter, h, Prop, Event, State, Watch, Method, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import { formatDate, formatDuration, isDifferentTime } from './utils';

enum CountdownStatus {
  pause,
  finish,
  play,
}

export interface TimeGroup {
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
}

@Component({
  tag: 'ti-countdown',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCountdown implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass?: string;

  @Prop() time = 1200;

  @Prop() format: string;

  @Prop() autoplay = false;

  @Prop() useSlot = false;

  @Prop() variant: 'pure' | 'block' | 'mixture' = 'pure';

  @Prop() size: 'small' | 'medium' | 'big' | 'large' = 'medium';

  @Event({ bubbles: false, composed: false }) change!: EventEmitter<TimeGroup>;

  @Event({ bubbles: false, composed: false }) finish!: EventEmitter<never>;

  @State() formattedTime = '';

  @State() timeData: TimeGroup = {};

  formatStr = 'HH:mm:ss';

  status: CountdownStatus = CountdownStatus.pause;

  endTime = 0;

  remainTime: any;

  timeId!: NodeJS.Timeout;

  lock!: boolean;

  @Watch('useSlot')
  watchUseSlot() {
    this.watchTime(this.time);
  }

  @Watch('format')
  watchFormat(newValue: string, oldValue?: string) {
    if (newValue !== oldValue) {
      this.formatStr = newValue;
      this.watchTime(this.time);
    }
  }

  @Watch('time')
  watchTime(newValue: number) {
    if (newValue !== undefined) {
      this.reset();
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidLoad(): void {
    this.formatStr = 'HH:mm:ss';
    if (this.format) this.formatStr = this.format;
    if (this.time !== undefined) {
      this.reset();
    }

    if (this.status === CountdownStatus.pause && this.autoplay) {
      this.ticker();
    }
  }

  disconnectedCallback(): void {
    this.pause();
  }

  private ticker() {
    clearTimeout(this.timeId);
    this.timeId = setTimeout(() => {
      const remainTime = Math.max(this.endTime - Date.now(), 0);
      if (remainTime > 0) {
        if (isDifferentTime(remainTime, this.remainTime, this.formatStr)) {
          this.setClock(remainTime);
          this.remainTime = remainTime;
        }

        this.ticker();
      } else {
        this.setClock(remainTime);
        this.remainTime = remainTime;
        this.pause();
        this.status = CountdownStatus.finish;
        this.finish.emit();
      }
    }, 30);
  }

  private setClock(remainTime: number) {
    const timeGroup = formatDuration(remainTime);
    this.change.emit(timeGroup);
    if (['block', 'mixture'].includes(this.variant)) {
      this.timeData = formatDate(timeGroup, this.formatStr, 'group') as TimeGroup;
    }
    if (!this.useSlot) {
      this.formattedTime = formatDate(timeGroup, this.formatStr) as string;
    }
  }

  private show(format: string, tag: string, mark?: string) {
    if (!format) return true;
    const res = format.indexOf(tag) > -1;
    if (!mark) return res;
    if (tag === 'H') {
      const more = format.indexOf('m') > -1 || format.indexOf('s') > -1 || format.indexOf('S') > -1;
      return res && more;
    }
    if (tag === 'm') {
      const more = format.indexOf('s') > -1 || format.indexOf('S') > -1;
      return res && more;
    }
    if (tag === 's') {
      const more = format.indexOf('S') > -1;
      return res && more;
    }
    return res;
  }

  @Method()
  async start() {
    if (this.lock) return;
    this.endTime = Date.now() + this.remainTime;
    this.lock = true;
    this.status = CountdownStatus.play;
    this.setClock(this.remainTime);
    this.ticker();
  }

  @Method()
  async pause() {
    clearTimeout(this.timeId);
    this.lock = false;
    this.status = CountdownStatus.pause;
  }

  @Method()
  async reset() {
    this.pause();
    this.remainTime = +this.time;
    this.setClock(this.remainTime);
    if (this.autoplay) {
      await this.start();
    }
  }

  private renderClock() {
    const { useSlot, variant, size, show, format, timeData } = this;

    if (useSlot) {
      return <slot />;
    }
    if (['block', 'mixture'].includes(variant)) {
      return (
        <div class={`${join('countdown-box', [size])}`}>
          {show(format, 'D') && <div class={`${handle('countdown', [variant])}`}>{timeData.day}</div>}
          {show(format, 'D') && <div class={`${join('countdown-day', [variant])}`}>天</div>}
          {show(format, 'H') && <div class={`${join('countdown-block')}`}>{timeData.hour}</div>}
          {show(format, 'H', 'dot') && (
            <div class={`${join('countdown-dot')}`}>
              <ti-icon name="colon" />
            </div>
          )}
          {show(format, 'm') && <div class={`${join('countdown-block')}`}>{timeData.minute}</div>}
          {show(format, 'm', 'dot') && (
            <div class={`${join('countdown-dot')}`}>
              <ti-icon name="colon" />
            </div>
          )}
          {show(format, 's') && <div class={`${join('countdown-block')}`}>{timeData.second}</div>}
          {show(format, 's', 'dot') && (
            <div class={`${join('countdown-dot')}`}>
              <ti-icon name="colon" />
            </div>
          )}
          {show(format, 'S') && (
            <div class={`${join('countdown-block', [format.indexOf('SSS') > -1 ? 'millisecond' : ''])}`}>
              {timeData.millisecond}
            </div>
          )}
        </div>
      );
    }

    return this.formattedTime;
  }

  render() {
    return (
      <div
        part={this.extClass}
        class={`${join('countdown')} ${this.extClass}`}
        style={stringToAttrStyle(this.extStyle)}
      >
        {this.renderClock()}
      </div>
    );
  }
}
