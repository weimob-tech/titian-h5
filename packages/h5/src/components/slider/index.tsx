/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Element, Event, EventEmitter, h, Prop, State, Watch } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import {
  clamp,
  isArrayEqual,
  percentToValue,
  roundByStep,
  valueToPercent,
  addShadowRootStyle,
} from '../common/utils/index';
import * as namespace from '../common/utils/namespace';

const DEFAULT_MAX = 100;
const DEFAULT_MIN = 1;
const DEFAULT_STEP = 1;

@Component({
  tag: 'ti-slider',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSlider implements BasicComponentAbstract {
  @Element() private host!: HTMLTiSliderElement;

  @Prop() extCss = '';

  @Prop() max = DEFAULT_MAX;

  @Prop() min = DEFAULT_MIN;

  @Prop() step = DEFAULT_STEP;

  @Prop() value!: number | number[];

  @Prop() trackClass?: string = '';

  @Prop() railClass?: string = '';

  @Prop() thumbClass?: string = '';

  @Event({ bubbles: false, composed: false }) change!: EventEmitter<{ value: number | number[] }>;

  _railSize: [number, number] = [0, 0];

  _railPosition: [number, number] = [0, 0];

  _stepPercent = 0;

  _originThumbValue1 = 0;

  _originThumbValue2 = 0;

  _thumbValue1 = 0;

  _thumbValue2 = 0;

  @State() isRangeValue = false;

  @State() trackLengthPercent = 0;

  @State() trackStartPercent = 0;

  @State() thumbPercent1 = 1;

  @State() thumbPercent2 = 0;

  @Watch('min')
  watchMinHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.min = DEFAULT_MIN;
    }
  }

  @Watch('max')
  watchMaxHandler(newVal: unknown) {
    if (newVal == null || newVal === undefined) {
      this.max = DEFAULT_MAX;
    }
  }

  private onTapSlider = (event: TouchEvent) => {
    const { _railPosition, _railSize, isRangeValue, thumbPercent1, thumbPercent2, _stepPercent } = this;
    const { pageX } = event.touches[0];
    const deltaX = pageX - _railPosition[0];

    let thumbPercent = Math.round((deltaX / _railSize[0]) * 10000) / 100;
    thumbPercent = roundByStep(thumbPercent, _stepPercent);

    thumbPercent = clamp(thumbPercent, 0, 100);
    if (isRangeValue) {
      const [diff1, diff2] = [thumbPercent1, thumbPercent2].map(p => Math.abs(p - thumbPercent));

      const thumbIndex = diff1 <= diff2 ? 1 : 2;
      this[`thumbPercent${thumbIndex}`] = thumbPercent;
      return;
    }
    this.thumbPercent1 = thumbPercent;
  };

  private onThumbTouchMove = (event: TouchEvent) => {
    if (!(event.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    const { thumb } = event.currentTarget.dataset as { thumb: '1' | '2' | undefined };
    if (!thumb) {
      return;
    }
    const { _railPosition, _railSize, _stepPercent } = this;

    const { pageX } = event.changedTouches[0];
    const deltaX = pageX - _railPosition[0];
    let thumbPercent = Math.round((deltaX / _railSize[0]) * 10000) / 100;
    thumbPercent = roundByStep(thumbPercent, _stepPercent);
    thumbPercent = clamp(thumbPercent, 0, 100);

    this[`thumbPercent${thumb}`] = thumbPercent;
  };

  @Watch('thumbPercent1')
  @Watch('thumbPercent2')
  watchThumbPercentChanged() {
    const { thumbPercent1, thumbPercent2, isRangeValue, value, _originThumbValue1, _originThumbValue2 } = this;
    const { min, max, step } = this;

    let { _thumbValue1, _thumbValue2 } = this;
    let trackStartPercent = 0;
    let trackLengthPercent = 0;

    if (isRangeValue) {
      [_thumbValue1, _thumbValue2] = [thumbPercent1, thumbPercent2].map(p => percentToValue(p, min, max));
      trackStartPercent = Math.min(thumbPercent1, thumbPercent2);
      trackLengthPercent = Math.abs(thumbPercent2 - thumbPercent1);
    } else {
      _thumbValue1 = percentToValue(thumbPercent1, min, max);

      trackStartPercent = 0;
      trackLengthPercent = thumbPercent1;
    }
    this._thumbValue1 = _thumbValue1;
    this._thumbValue2 = _thumbValue2;
    this.trackStartPercent = trackStartPercent;
    this.trackLengthPercent = trackLengthPercent;
    if (Array.isArray(value) && (_thumbValue1 !== _originThumbValue1 || _thumbValue2 !== _originThumbValue2)) {
      [_thumbValue1, _thumbValue2] = [_thumbValue1, _thumbValue2].map(v => roundByStep(v, step));

      this.change.emit({ value: [_thumbValue1, _thumbValue2] });
    } else if (_thumbValue1 !== _originThumbValue1) {
      this.change.emit({ value: _thumbValue1 });
    }
  }

  @Watch('step')
  watchStepChanged(newVal: number) {
    if (newVal == null || newVal === undefined) {
      this.step = DEFAULT_STEP;
    }
    const { step, min, max } = this;
    const _stepPercent = valueToPercent(step + min, min, max);
    this._stepPercent = _stepPercent;
  }

  @Watch('value')
  watchValueChanged(value: number | number[], oldValue?: number | number[]) {
    if ((Array.isArray(value) && Array.isArray(oldValue) && isArrayEqual(value, oldValue)) || value === oldValue) {
      return;
    }
    const { min, max } = this;

    let thumbPercent1 = 0;
    let thumbPercent2 = 0;
    let _originThumbValue1 = 0;
    let _originThumbValue2 = 0;
    const isRangeValue = Array.isArray(value);
    if (isRangeValue) {
      [_originThumbValue1, _originThumbValue2] = value;
      [thumbPercent1, thumbPercent2] = [_originThumbValue1, _originThumbValue2].map(v => valueToPercent(v, min, max));
    } else {
      _originThumbValue1 = value;
      thumbPercent1 = valueToPercent(value, min, max);
    }

    this.thumbPercent1 = thumbPercent1;
    this.thumbPercent2 = thumbPercent2;
    this.isRangeValue = isRangeValue;
    this._originThumbValue1 = _originThumbValue1;
    this._originThumbValue2 = _originThumbValue2;
  }

  componentDidLoad() {
    this.watchStepChanged(this.step);
    this.watchValueChanged(this.value);
    const { shadowRoot } = this.host;
    if (!shadowRoot) {
      return;
    }
    const rail = shadowRoot.querySelector('.titian-slider-rail');
    if (!rail) {
      return;
    }
    const { width, height, left, top } = rail.getBoundingClientRect();
    this._railSize = [width, height];
    this._railPosition = [left, top];
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { trackClass = '', railClass = '', thumbClass = '' } = this;
    return (
      <div class={namespace.join('slider')} onTouchStart={this.onTapSlider}>
        <div class={`${namespace.join('slider-rail')} ${railClass}`} part={railClass} />

        <div
          class={`${namespace.join('slider-track')} ${trackClass}`}
          part={trackClass}
          style={{
            left: `${this.trackStartPercent}%`,
            width: `${this.trackLengthPercent}%`,
          }}
        />
        <div
          class={`${namespace.join('slider-thumb')} ${thumbClass}`}
          part={thumbClass}
          style={{
            left: `${this.thumbPercent1}%`,
          }}
          onTouchMove={this.onThumbTouchMove}
          data-thumb="1"
        />
        {this.isRangeValue && (
          <div
            class={`${namespace.join('slider-thumb')} ${thumbClass}`}
            part={thumbClass}
            style={{
              left: `${this.thumbPercent2}%`,
            }}
            data-thumb="2"
            onTouchMove={this.onThumbTouchMove}
          />
        )}
      </div>
    );
  }
}
