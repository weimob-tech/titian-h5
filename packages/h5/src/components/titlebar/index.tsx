import { Component, Prop, h, Fragment, Element, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';

@Component({
  tag: 'ti-titlebar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTitlebar {
  @Prop() useContainer?: boolean = true;

  @Prop() useTitleSlot?: boolean;

  @Prop() useTitle?: boolean = true;

  @Prop() useLeftSlot?: boolean;

  @Prop() useLeft?: boolean = true;

  @Prop() useRightSlot?: boolean;

  @Prop() useRight?: boolean = true;

  @Prop() title: string;

  @Prop() subTitle?: string = '';

  @Prop() leftText?: string = '';

  @Prop() leftIcon?: string = '';

  @Prop() rightText?: string = '';

  @Prop() rightIcon?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extCss = '';

  @Prop() extClass = '';

  @Prop() extTitleClass?: string = '';

  @Prop() extMainTitleClass?: string = '';

  @Prop() extSubTitleClass?: string = '';

  @Prop() extLeftClass?: string = '';

  @Prop() extLeftIconClass?: string = '';

  @Prop() extRightClass?: string = '';

  @Prop() extRightIconClass?: string = '';

  @Element() host: HTMLElement;

  // @Event({ bubbles: false, composed: false }) click: EventEmitter<{
  //   position: 'left' | 'right' | 'title' | 'sub-title';
  // }>;

  @Event({ bubbles: false, composed: false }) tiClick: EventEmitter<{
    position: 'left' | 'right' | 'title' | 'sub-title';
  }>;

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  onClickLeft = () => {
    // this.click.emit({ position: 'left' });
    this.tiClick.emit({ position: 'left' });
  };

  onClickRight = () => {
    // this.click.emit({ position: 'right' });
    this.tiClick.emit({ position: 'right' });
  };

  onClickTitle = () => {
    // this.click.emit({ position: 'title' });
    this.tiClick.emit({ position: 'title' });
  };

  onClickSubTitle = () => {
    // this.click.emit({ position: 'sub-title' });
    this.tiClick.emit({ position: 'sub-title' });
  };

  renderLeft() {
    const { useLeft, useLeftSlot, leftText, leftIcon, extLeftClass, extLeftIconClass } = this;
    if (!useLeft) {
      return null;
    }
    if (useLeftSlot) {
      return <slot name="left-slot" />;
    }
    function render() {
      if (leftText) {
        return leftText;
      }
      if (leftIcon) {
        return <ti-icon name={leftIcon} ext-class={extLeftIconClass} exportparts={extLeftIconClass} />;
      }
      return null;
    }
    return (
      <div
        class={`${handle('titlebar', ['left'])}  ${extLeftClass}`}
        part={extLeftClass}
        onClick={this.onClickLeft}
        aria-hidden="true"
      >
        {render()}
      </div>
    );
  }

  renderRight() {
    const { useRight, useRightSlot, rightText, rightIcon, extRightClass, extRightIconClass } = this;
    if (!useRight) {
      return null;
    }
    if (useRightSlot) {
      return <slot name="right-slot" />;
    }
    function render() {
      if (rightText) {
        return rightText;
      }
      if (rightIcon) {
        return <ti-icon name={rightIcon} ext-class={extRightIconClass} exportparts={extRightIconClass} />;
      }
      return null;
    }
    return (
      <div
        class={`${handle('titlebar', ['right'])} ${extRightClass}`}
        part={extRightClass}
        onClick={this.onClickRight}
        aria-hidden="true"
      >
        {render()}
      </div>
    );
  }

  renderTitle() {
    const { useTitle, useTitleSlot, title, subTitle, extTitleClass, extMainTitleClass, extSubTitleClass } = this;
    if (!useTitle) {
      return null;
    }
    if (useTitleSlot) {
      return <slot name="title-slot" />;
    }
    return (
      <div class={`${handle('titlebar', ['title'])} ${extTitleClass}`} part={extTitleClass}>
        {title ? (
          <div
            class={`${handle('titlebar', ['main-title'])} ${extMainTitleClass}`}
            part={extMainTitleClass}
            onClick={this.onClickTitle}
            aria-hidden="true"
          >
            {title}
          </div>
        ) : null}
        {subTitle ? (
          <div
            class={`${handle('titlebar', ['sub-title'])} ${extSubTitleClass}`}
            part={extSubTitleClass}
            onClick={this.onClickSubTitle}
            aria-hidden="true"
          >
            {subTitle}
          </div>
        ) : null}
      </div>
    );
  }

  renderContent() {
    return (
      <>
        {this.renderLeft()}
        {this.renderTitle()}
        {this.renderRight()}
      </>
    );
  }

  render() {
    const { useContainer, extStyle, extClass } = this;
    if (useContainer) {
      return (
        <div class={`${join('titlebar')} ${extClass} `} part={extClass} style={stringToAttrStyle(extStyle)}>
          {this.renderContent()}
        </div>
      );
    }
    return this.renderContent();
  }
}
