import { Component, Prop, h, State, Event, EventEmitter, Watch, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';

@Component({
  tag: 'ti-search',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSearch implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass = '';

  @Prop() inputClass = '';

  @Prop() searchButtonClass = '';

  @Prop() searchInnerClass = '';

  @Prop() value: string;

  @Prop() center: boolean;

  @Prop() placeholder: string;

  @Prop() autofocus: boolean;

  @Prop() confirmType = 'search';

  @Prop() clearable = true;

  @Prop() useSearchButton = true;

  @Prop() readOnly: boolean;

  @Prop() disabled: boolean;

  @Prop() leftIcon = 'search';

  @Prop() animation = true;

  @Prop() alwaysShowSearch = false;

  @Prop() alwaysShowPrefix = false;

  @Prop() alwaysShowSuffix = false;

  @Prop() alwaysShowRightIcon = false;

  @State() showSearch = false;

  @State() showVirtualPlaceholder = false;

  @Event({ bubbles: false, composed: false }) clear: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) input: EventEmitter<InputEvent>;

  @Event({ bubbles: false, eventName: 'focus', composed: false }) focusHandle: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) blur: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) tiClickInput: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) clickInput: EventEmitter<never>;

  @Event({ bubbles: false, composed: false }) change: EventEmitter<{ value: string | number }>;

  @Event({ bubbles: false, composed: false }) search: EventEmitter<{ value: string | number }>;

  @Watch('center')
  changeMode(value) {
    this.showVirtualPlaceholder = value;
  }

  private inputRef = null;

  private lockClear = false;

  onClickVirtualInput = () => {
    this.showVirtualPlaceholder = false;
    this.onClick();
    setTimeout(() => {
      this.inputRef.shadowRoot?.querySelector('.titian-input-input').focus();
    }, 10);
  };

  private currentValue = null;

  onBlur = event => {
    if (event.isTrusted) return;
    this.showSearch = false;
    if (this.center) {
      this.showVirtualPlaceholder = true;
    }
    this.blur.emit();
  };

  onClear = () => {
    this.clear.emit();
    this.lockClear = true;
  };

  onFocus = event => {
    if (event.isTrusted) return;
    this.focusHandle.emit();
  };

  onInput = event => {
    if (event.isTrusted) return;
    this.input.emit();
  };

  onChange = event => {
    this.currentValue = event.detail;
    this.value = event.detail.value;
    this.change.emit(this.currentValue);
  };

  onSearch = () => {
    this.inputRef.shadowRoot?.querySelector('.titian-input-input').blur();
    const result = this.currentValue || {};
    if (result.value !== this.value) {
      result.value = this.value;
      result.keyCode = '';
    }
    this.search.emit(result);
  };

  onClick = () => {
    // 需要在focus之前执行动画
    this.showSearch = true;
    if (this.lockClear) return;
    this.tiClickInput.emit();
    this.clickInput.emit();
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.changeMode(this.center);
  }

  componentDidRender() {
    this.lockClear = false;
  }

  render() {
    const {
      extClass,
      extStyle,
      showSearch,
      showVirtualPlaceholder,
      value,
      placeholder,
      leftIcon,
      autofocus,
      clearable,
      confirmType,
      readOnly,
      disabled,
      useSearchButton,
      animation,
      inputClass,
      searchButtonClass,
      searchInnerClass,
      alwaysShowSearch,
      alwaysShowPrefix,
      alwaysShowSuffix,
      alwaysShowRightIcon,
    } = this;
    return (
      <div class={`${namespace.join('search')} ${extClass}`} part={extClass} style={stringToAttrStyle(extStyle)}>
        {(!showSearch || alwaysShowPrefix) && <slot name="prefix" />}
        <div class={`${namespace.handle('search', ['input-container'])} ${searchInnerClass}`} part={searchInnerClass}>
          {showVirtualPlaceholder ? (
            <div
              aria-hidden="true"
              class={namespace.handle('search', ['virtual-placeholder'])}
              onClick={this.onClickVirtualInput}
              onKeyPress={this.onClickVirtualInput}
            >
              <ti-icon name="search" size="32" ext-class="search-icon" />
              <div
                class={namespace.handle('search', [
                  'placeholder-text',
                  { virtualtext: ![undefined, ''].includes(value) },
                ])}
              >
                {[undefined, ''].includes(value) ? placeholder : value}
              </div>
            </div>
          ) : (
            <div style={{ display: 'contents' }}>
              {leftIcon !== 'none' ? (
                <ti-icon name={leftIcon} size="32" ext-class="search-icon" />
              ) : (
                <slot name="left-icon" />
              )}
              <ti-input
                ref={el => el && (this.inputRef = el)}
                class={namespace.join('search-input-host')}
                ext-css={this.extCss}
                ext-class="search-input"
                input-class={inputClass}
                exportparts={inputClass}
                placeholder={placeholder}
                value={value}
                autofocus={autofocus}
                clearable={clearable}
                confirm-type={confirmType}
                read-only={readOnly}
                disabled={disabled}
                divider={false}
                onClear={this.onClear}
                onInput={this.onInput}
                onBlur={this.onBlur}
                onFocus={this.onFocus}
                onChange={this.onChange}
                onTouchStart={this.onClick}
                onConfirm={this.onSearch}
              />
              {(!showSearch || alwaysShowRightIcon) && (
                <div class={namespace.join('search-suffix-icon')}>
                  <slot name="right-icon" />
                </div>
              )}
            </div>
          )}
        </div>
        {useSearchButton && (
          <div
            part={searchButtonClass}
            class={`${namespace.join('search-button-box', [
              { focus: (useSearchButton && showSearch) || alwaysShowSearch, pure: !animation },
            ])} ${searchButtonClass}`}
            onClick={this.onSearch}
            aria-hidden="true"
          >
            <ti-button variant="text">搜索</ti-button>
          </div>
        )}
        {(!useSearchButton || !showSearch || alwaysShowSuffix) && <slot name="suffix" />}
      </div>
    );
  }
}
