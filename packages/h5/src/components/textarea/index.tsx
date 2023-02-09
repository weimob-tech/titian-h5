import { Component, Host, h, Prop, Event, EventEmitter, State, Element, Watch, Listen } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';

@Component({
  tag: 'ti-textarea',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTextarea implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() textareaClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() autoHeight?: boolean;

  @Prop() value?: string;

  @Prop() placeholder?: string;

  @Prop() disabled?: boolean;

  @Prop() maxlength?: number = 140;

  @Prop() autofocus: boolean;

  @Prop() showCount?: boolean;

  @State() count = 0;

  @State() keyCode = null;

  @Event({ bubbles: false, composed: false }) input: EventEmitter<{ value: string }>;

  @Event({ bubbles: false, composed: false }) focus: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) blur: EventEmitter<{ value: string }>;

  @Event({ bubbles: false, composed: false }) confirm: EventEmitter<{ value: string }>;

  ref: HTMLElement;

  @Watch('value')
  updateCount(value) {
    let count = 0;
    if (value) {
      count = this.maxlength > 0 ? Math.min(value.length, this.maxlength) : value.length;
    }
    this.count = count;
  }

  private onInput(event) {
    const len = event.target.value.length;
    this.count = this.maxlength > 0 ? Math.min(len, this.maxlength) : len;
    this.input.emit({ value: event.target.value });
  }

  private onFocus() {
    this.focus.emit();
  }

  private onBlur(event) {
    this.blur.emit({ value: event.target.value });
  }

  private onKeyUp = event => {
    if (event.key === 'Enter') {
      this.confirm.emit({ value: event.target.value });
    }
  };

  @Listen('keyup')
  resizeHeight() {
    if (!this.autoHeight) return;
    this.ref.style.height = 'auto';
    this.ref.style.height = `${this.ref.scrollHeight}px`;
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.updateCount(this.value);
  }

  render() {
    const {
      extClass,
      extStyle,
      textareaClass,
      autoHeight,
      value,
      placeholder,
      disabled,
      maxlength,
      autofocus,
      showCount,
      count,
    } = this;
    return (
      <Host>
        <div
          part={extClass}
          class={`${namespace.join('textarea', [{ autoHeight }])} ${extClass}`}
          style={stringToAttrStyle(extStyle)}
        >
          <textarea
            ref={ref => (this.ref = ref)}
            class={`${namespace.handle('textarea', ['box'])} ${textareaClass}`}
            part={textareaClass}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            maxLength={maxlength}
            autoFocus={autofocus}
            onInput={this.onInput.bind(this)}
            onFocus={this.onFocus.bind(this)}
            onBlur={this.onBlur.bind(this)}
            onKeyUp={this.onKeyUp}
          />
          {showCount && (
            <div class={namespace.join('textarea-count')}>
              {count}/{maxlength}
            </div>
          )}
        </div>
      </Host>
    );
  }
}
