import { Component, h, Prop, Event, EventEmitter, State, Element, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { raf } from '../common/utils/raf';

export interface EventDetails {
  value: string | number;
  keyCode?: number;
}
@Component({
  tag: 'ti-input',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiInput implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() labelClass?: string = '';

  @Prop() inputClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() type?: 'text' | 'number' | 'safe-password' | 'digit';

  @Prop() value?: string;

  @Prop() placeholder?: string;

  @Prop() disabled?: boolean;

  @Prop() readOnly?: boolean;

  @Prop() divider?: boolean = true;

  @Prop() prefixIcon?: string;

  @Prop() label?: string;

  @Prop() required?: boolean;

  @Prop() clearable?: boolean = true;

  @Prop() textAlign?: 'left' | 'right';

  @Prop() error?: boolean;

  @Prop() errorMessage?: string;

  @Prop() autofocus: boolean;

  @Prop() showClearIcon?: boolean;

  @Prop() maxlength?: number = 140;

  @Prop() ellipsisLine = 0;

  @Prop() inputmode: 'text' | 'none' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';

  @Prop() confirmType: 'done' | 'send' | 'search' | 'next' | 'go';

  @Event({ bubbles: false, composed: false }) clear: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) input: EventEmitter<EventDetails>;

  @Event({ bubbles: false, composed: false }) change: EventEmitter<EventDetails>;

  @Event({ bubbles: false, composed: false }) confirm: EventEmitter<EventDetails>;

  @Event({ bubbles: false, eventName: 'focus', composed: false }) focusHandle: EventEmitter<EventDetails>;

  @Event({ bubbles: false, composed: false }) blur: EventEmitter<EventDetails>;

  @State() keyCode = null;

  @State() mode = 'text';

  private inputRef = null;

  @Watch('type')
  @Watch('inputmode')
  updateInputmode() {
    const inputmodeMap = { number: 'numeric', digit: 'decimal' };

    this.mode = this.inputmode ? this.inputmode : inputmodeMap[this.type] || 'text';
  }

  private onClear = () => {
    this.setData({
      value: '',
      showClearIcon: false,
    });
    // 点击清除图标是触发
    this.clear.emit();
    this.change.emit({ value: '' });
  };

  private setData(data: object) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
  }

  private formatValue = value => {
    if (!value && value !== 0) return '';
    if (['digit', 'number'].includes(this.type)) {
      const res = +value;
      // 0012 => 12
      // eslint-disable-next-line no-restricted-globals
      if (typeof res === 'number' && isFinite(res) && res.toString() === value) {
        return res;
      }
      return value;
    }
    return value;
  };

  private onInput = event => {
    const value = this.formatValue(event.target.value);
    this.setData({
      showClearIcon: value.toString().length > 0,
      value,
    });
    this.input.emit({ value, keyCode: this.keyCode });
    this.change.emit({ value });
  };

  private onFocus = event => {
    if (this.readOnly || this.disabled) return;
    const value = this.formatValue(event.target.value);
    if (value !== '') {
      this.setData({ showClearIcon: true });
    }
    this.focusHandle.emit({ value });
  };

  private onBlur = event => {
    const value = this.formatValue(event.target.value);
    this.setData({ showClearIcon: false });
    this.blur.emit({ value });
  };

  private onKeyUp = e => {
    if (e.key === 'Enter') {
      this.confirm.emit({ value: this.value });
    }
  };

  private onKeyDown = e => {
    this.keyCode = e.keyCode;
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.updateInputmode();
  }

  componentDidLoad() {
    // 使用autofocus 只会触发一次。
    raf(() => {
      if (this.autofocus) this.inputRef.focus();
    });
  }

  render() {
    const {
      extClass,
      extStyle,
      label,
      disabled,
      readOnly,
      divider,
      prefixIcon,
      labelClass,
      required,
      errorMessage,
      textAlign,
      clearable,
      showClearIcon,
      inputClass,
      error,
      maxlength,
      placeholder,
      value,
      autofocus,
      confirmType,
      ellipsisLine,
      mode,
    } = this;

    const typeMap = { 'safe-password': 'password', 'digit': 'text', 'number': 'text' };
    const type = typeMap[this.type] || this.type;
    const errorMessageClass = `${namespace.join('input-error-message')} input-text-align-${textAlign}`;
    const inputClassName = `${namespace.join('input-input', [{ error }])} input-text-align-${textAlign} ${inputClass}`;
    return (
      <div
        part={extClass}
        class={`${namespace.join('input', [{ disabled, readOnly, borderless: !divider }])} ${extClass}`}
        style={stringToAttrStyle(extStyle)}
      >
        {label && (
          <div class={namespace.join('input-label-container')}>
            {prefixIcon ? (
              <ti-icon name={prefixIcon} color="#9e9e9e" size="28" ext-class={namespace.join('input-left-icon')} />
            ) : (
              <slot name="prefix-icon" />
            )}
            <div class={namespace.join('input-title', [{ wrap: ellipsisLine > 1 }])}>
              <div
                part={labelClass}
                class={`${namespace.join('input-title-text', [
                  { ellipsis: ellipsisLine === 1, wrap: ellipsisLine > 1 },
                ])} ${labelClass}`}
                style={{ '--input-line-clamp': `${ellipsisLine}` }}
              >
                {label}
              </div>
            </div>
            {required && (
              <div class={namespace.join('input-required-icon')}>
                <ti-icon name="required" size="24" ext-class={namespace.join('input-icon')} />
              </div>
            )}
          </div>
        )}
        <div class={namespace.join('input-slot')}>
          <slot name="prefix" />
        </div>
        <div class={namespace.join('input-container')}>
          <input
            ref={el => (this.inputRef = el)}
            class={inputClassName}
            part={inputClass}
            type={type}
            inputMode={mode}
            value={value}
            // eslint-disable-next-line react/no-unknown-property
            autofocus={autofocus}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
            enterKeyHint={confirmType}
            // eslint-disable-next-line react/no-unknown-property
            maxlength={maxlength}
            onInput={this.onInput}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onKeyUp={this.onKeyUp}
            onKeyDown={this.onKeyDown}
          />
          {errorMessage && (
            <div class={errorMessageClass}>
              {errorMessage && <ti-icon name="warning" size="24" ext-class={namespace.join('input-warning-icon')} />}
              <text>{errorMessage}</text>
            </div>
          )}
        </div>

        {clearable && showClearIcon && (
          <div class={namespace.join('input-icon-box')} aria-hidden="true" onTouchStart={this.onClear}>
            <ti-icon name="clear" color="#9e9e9e" size="36" ext-class={namespace.join('input-icon')} />
          </div>
        )}

        <div class={namespace.join('input-slot')}>
          <slot name="suffix" />
        </div>
      </div>
    );
  }
}
