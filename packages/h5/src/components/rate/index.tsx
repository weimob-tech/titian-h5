import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { clamp, roundByStep, addShadowRootStyle, stringToAttrStyle } from '../common/utils/index';
import * as namespace from '../common/utils/namespace';

const defaultValueMap = {
  value: 0,
  count: 5,
  allowHalf: false,
  iconSize: '36',
  icon: 'rate-star-highlight',
  emptyIcon: 'rate-star-highlight',
  readOnly: false,
  clearable: false,
  disabled: false,
};

@Component({
  tag: 'ti-rate',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiRate implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() value = 0;

  @Prop() allowHalf = false;

  @Prop() count = 5;

  @Prop() icon = 'rate-star-highlight';

  @Prop() iconSize = '36';

  @Prop() emptyIcon = 'rate-star-highlight';

  @Prop() readOnly = false;

  @Prop() clearable = false;

  @Prop() disabled = false;

  @Event({ bubbles: false, composed: false }) change: EventEmitter<{ value: number }>;

  _containerPosition = [];

  _containerSize = [];

  _starSize = [0, 0];

  _MIN_SCORE = 0;

  _MAX_SCORE = 5;

  @State() inputScore = 0;

  @State() scoreList = [];

  @Watch('value')
  valueChanged(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.value = defaultValueMap.value;
    }

    let score = this.value;
    const { _MIN_SCORE, _MAX_SCORE } = this;

    score = clamp(score, _MIN_SCORE, _MAX_SCORE);

    this.inputScore = score;
  }

  @Watch('count')
  countChanged(newVal: unknown, oldVal) {
    if (newVal == null || newVal === undefined) {
      this.count = defaultValueMap.count;
    }
    this.init(newVal, oldVal);
  }

  @Watch('allowHalf')
  watchAllowHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.allowHalf = defaultValueMap.allowHalf;
    }
  }

  @Watch('iconSize')
  watchIconSizeHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.iconSize = defaultValueMap.iconSize;
    }
  }

  @Watch('icon')
  watchIconHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.icon = defaultValueMap.icon;
    }
  }

  @Watch('emptyIcon')
  watchemptyIconHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.emptyIcon = defaultValueMap.emptyIcon;
    }
  }

  @Watch('readOnly')
  watchreadOnlyHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.readOnly = defaultValueMap.readOnly;
    }
  }

  @Watch('clearable')
  watchclearableHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.clearable = defaultValueMap.clearable;
    }
  }

  @Watch('disabled')
  watchdisabledHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.disabled = defaultValueMap.disabled;
    }
  }

  private init(newVal, oldVal) {
    if (newVal === oldVal) {
      return;
    }
    this.scoreList = Array.from({ length: newVal }, (_v, i) => i + 1);
    this.setMaxMinScore();
  }

  private setMaxMinScore() {
    const { count, clearable, allowHalf } = this;
    let MIN_SCORE = 0;
    const MAX_SCORE = count;
    if (!clearable) {
      if (!allowHalf) {
        MIN_SCORE = 1;
      } else {
        MIN_SCORE = 0.5;
      }
    }

    this._MIN_SCORE = MIN_SCORE;
    this._MAX_SCORE = MAX_SCORE;
  }

  private getClass(condition: boolean) {
    if (condition) {
      return 'filled';
    }
    return 'empty';
  }

  private queryRateSize() {
    const { width, height, left, top } = this.host.shadowRoot.querySelector('.titian-rate').getBoundingClientRect();
    this._containerSize = [width, height];
    this._starSize = [width / this.count, height];
    this._containerPosition = [left, top];
  }

  componentDidLoad() {
    this.init(this.count, 0);
    setTimeout(() => {
      this.queryRateSize();
    }, 200);

    this.countChanged(this.count, 0);
    this.valueChanged(this.value);
  }

  private onTouchMove(event: TouchEvent) {
    const { _starSize, _containerPosition, allowHalf, readOnly, _MIN_SCORE, _MAX_SCORE } = this;
    if (readOnly) return;
    const { pageX } = event.touches[0];

    const deltaX = pageX - _containerPosition[0];
    const fingerPositionX = deltaX / _starSize[0];
    let score = 0;

    if (!allowHalf) {
      score = Math.ceil(fingerPositionX);
    } else {
      score = roundByStep(fingerPositionX, 0.5);
    }

    score = clamp(score, _MIN_SCORE, _MAX_SCORE);

    if (score !== this.value) {
      this.change.emit({ value: score });
    }
  }

  private onTapItem(event) {
    const { readOnly, _MIN_SCORE, _MAX_SCORE } = this;
    if (readOnly) {
      return;
    }
    let { score } = event.currentTarget.dataset;
    score = clamp(score, _MIN_SCORE, _MAX_SCORE);
    this.change.emit({ value: score });
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    return (
      <div
        class={`${namespace.join('rate')} ${this.extClass || ''}`}
        onTouchMove={this.onTouchMove.bind(this)}
        style={stringToAttrStyle(this.extStyle)}
      >
        {this.scoreList.map(scoreValue => (
          <div class={namespace.join('rate-item')}>
            <ti-icon
              name={scoreValue <= this.inputScore ? this.icon : this.emptyIcon || this.icon}
              extClass={`${namespace.join('rate-star')}  ${namespace.handle('rate', [
                this.getClass(scoreValue <= this.inputScore),
              ])}`}
              onClick={this.onTapItem.bind(this)}
              size={this.iconSize}
              data-score={scoreValue}
            />
            {this.allowHalf && (
              <ti-icon
                name={scoreValue <= this.inputScore + 0.5 ? this.icon : this.emptyIcon || this.icon}
                extClass={`${namespace.join('rate-star-half')}  ${namespace.handle('rate', [
                  this.getClass(scoreValue <= this.inputScore + 0.5),
                ])}`}
                data-score={scoreValue - 0.5}
                size={this.iconSize}
                onClick={this.onTapItem.bind(this)}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}
