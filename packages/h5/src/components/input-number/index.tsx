import { Component, Host, h, Prop, Watch, State, Event, EventEmitter, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

@Component({
  tag: 'ti-input-number',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiInputNumber implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extMinusClass = '';

  @Prop() extPlusClass = '';

  @Prop() extInputClass = '';

  @Prop() size: 'medium' | 'big';

  @Prop() border: boolean;

  @Prop() variant: 'pure' | 'block' | 'bright';

  @Prop() round: boolean;

  @Prop() inputWidth: number;

  @Prop() autoWidth: boolean;

  @Prop() value: number | string = 0;

  @Prop() step = 1;

  @Prop() min: number = Number.MIN_SAFE_INTEGER;

  @Prop() max: number = Number.MAX_SAFE_INTEGER;

  @Prop() disabledInput: boolean;

  @Prop() asyncChange: boolean;

  @Prop() thumbnail: boolean;

  @Prop() disabled: boolean;

  @Prop() readOnly: boolean;

  @Prop() readOnlyInput: boolean;

  @Prop() initOnlyPlus: boolean;

  @Prop() integer: boolean;

  @State() iconSize = 24;

  @State() preValue: number | string = -1;

  @Event({ bubbles: false, composed: false }) change: EventEmitter<number>;

  @Event({ bubbles: false, composed: false }) plus: EventEmitter<number>;

  @Event({ bubbles: false, composed: false }) minus: EventEmitter<number>;

  @Event({ bubbles: false, composed: false }) focus: EventEmitter<{ value: number }>;

  @Event({ bubbles: false, composed: false }) blur: EventEmitter<{ value: number }>;

  @Event({ bubbles: false, composed: false }) overlimit: EventEmitter<{ type: string }>;

  @Event({ bubbles: false, composed: false }) clickInput: EventEmitter<never>;

  private inputRef: HTMLInputElement;

  @Watch('size')
  @Watch('variant')
  updateIconSize() {
    let iconSize;
    let { min } = this;
    iconSize = this.size === 'big' ? 28 : 24;
    if (this.variant === 'bright') {
      iconSize = 38;
      min = Math.max(0, min);
    }

    this.iconSize = iconSize;
    this.min = min;
  }

  @Watch('value')
  updatePreValue() {
    this.preValue = this.value;
  }

  private computedSize(size, extStyle) {
    let style = {};
    if (size === 'big') {
      style = {
        '--input-number-size': addUnit(56),
      };
    }

    return { ...style, ...stringToAttrStyle(extStyle) };
  }

  private computedInputWidth(size, inputWidth, autoWidth, variant) {
    let curInputWidth = 60;
    if (size === 'big') {
      curInputWidth = 64;
    }
    if (variant === 'bright') {
      curInputWidth = 36;
    }
    if (inputWidth) {
      curInputWidth = inputWidth;
    }
    if (autoWidth) {
      return { width: '100%', minWidth: addUnit(curInputWidth) };
    }
    return { width: addUnit(curInputWidth) };
  }

  private onClickThumbnail() {
    if (this.disabled || this.readOnly) return;
    this.thumbnail = false;
  }

  private onChange(value: number, type?: string) {
    if (this.disabled || this.readOnly) return;
    const newValue = Math.max(Math.min(this.max, value), this.min);
    if (value > this.max || value < this.min) {
      let currentType = type;
      if (!type) {
        currentType = value > this.max ? 'plus' : 'minus';
      }
      this.overlimit.emit({ type: currentType });
    } else if (type) {
      this[type].emit(value);
    }
    if (newValue !== this.preValue) {
      this.change.emit(newValue);
    }
    if (!this.asyncChange || !type) {
      this.value = newValue;
      this.preValue = newValue;
      this.inputRef.value = newValue.toString();
    } else {
      this.preValue = newValue;
    }
  }

  private onInput() {
    const { value } = this.inputRef;
    if (+value <= this.max && +value >= this.min) {
      this.change.emit(+value);
    }
    if (!this.asyncChange) {
      this.value = +value;
      if (this.integer && value && value.indexOf('.') === value.length - 1) {
        this.inputRef.value = parseInt(value, 10).toString();
      }
    }
  }

  private onFocus(event) {
    // 输入框聚焦时触发
    const value = +event.target.value;
    this.focus.emit({ value });
  }

  private onBlur(event) {
    const value = +event.target.value;
    this.onChange(value);
    this.blur.emit({ value });
  }

  private onClickInput = () => {
    this.clickInput.emit();
  };

  private count = type => {
    let newValue = +this.value;
    newValue = type === 'plus' ? +this.value + this.step : +this.value - this.step;
    this.onChange(newValue, type);
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.updateIconSize();
  }

  render() {
    const {
      thumbnail,
      value,
      disabled,
      border,
      size,
      extStyle,
      variant,
      round,
      extClass,
      min,
      max,
      extMinusClass,
      extPlusClass,
      iconSize,
      extInputClass,
      autoWidth,
      inputWidth,
      disabledInput,
      initOnlyPlus,
      readOnly,
      readOnlyInput,
    } = this;
    const thumbnailClass = `${namespace.join('input-number-thumbnail', [{ disabled, border }])}`;
    const mainClass = `${namespace.join('input-number', [{ border, round }, variant])} ${extClass}`;
    return (
      <Host>
        {thumbnail && (value === 0 || !!value) ? (
          <div
            class={thumbnailClass}
            style={this.computedSize(size, extStyle)}
            onClick={this.onClickThumbnail.bind(this)}
            onKeyPress={this.onClickThumbnail.bind(this)}
            aria-hidden="true"
          >
            ×{value}
          </div>
        ) : (
          <div part={extClass} class={mainClass} style={this.computedSize(size, extStyle)}>
            <div
              class={`${namespace.join('input-number-minus', [
                { disabled: disabled || value <= min },
                { hidden: initOnlyPlus && value === 0 },
              ])} ${extMinusClass}`}
              part={extMinusClass}
              onClick={() => this.count('minus')}
              aria-hidden="true"
            >
              <ti-icon name="stepper-minus" size={iconSize} ext-class="input-number-icon" />
            </div>
            <div
              class={`${namespace.join('input-number-box', [
                { hidden: initOnlyPlus && value === 0 },
              ])} ${extInputClass}`}
              part={extInputClass}
            >
              {autoWidth && (
                <div
                  class={namespace.join('input-number-field-virtual')}
                  style={this.computedInputWidth(size, inputWidth, autoWidth, variant)}
                >
                  {value}
                </div>
              )}

              <input
                value={value}
                class={namespace.join('input-number-field', [{ disabled: disabled || disabledInput, autoWidth }])}
                style={this.computedInputWidth(size, inputWidth, autoWidth, variant)}
                type="text"
                inputMode="decimal"
                disabled={disabled || disabledInput}
                readOnly={readOnly || readOnlyInput}
                onInput={this.onInput.bind(this)}
                onFocus={this.onFocus.bind(this)}
                onClick={this.onClickInput}
                onBlur={this.onBlur.bind(this)}
                ref={e => (this.inputRef = e)}
              />
            </div>
            <div
              class={`${namespace.join('input-number-plus', [{ disabled: disabled || value >= max }])} ${extPlusClass}`}
              part={extPlusClass}
              onClick={() => this.count('plus')}
              aria-hidden="true"
            >
              <ti-icon name="stepper-plus" size={iconSize} ext-class="input-number-icon" />
            </div>
          </div>
        )}
      </Host>
    );
  }
}
