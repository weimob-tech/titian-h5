import { Component, EventEmitter, h, Prop, Event, Element } from '@stencil/core';
import { JSXBase, State } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { pxToVW } from '../common/utils';

import EPopupTitleBarVariantType, { getLeftClass, getRightClass, getRightClassIcon, getTitleClass } from './const';

@Component({
  tag: 'ti-popup-titlebar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiPopupTitlebar implements BasicComponentAbstract {
  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass?: string;

  @Prop() extCss?: string = '';

  @Prop() title: string;

  @Prop() subTitle?: string;

  @Prop() variant?: string = EPopupTitleBarVariantType.WithConfirm;

  @Prop() confirmText?: string = '确定';

  @Prop() cancelText?: string = '取消';

  @Prop() extTitleClass?: string = '';

  @Prop() extLeftClass?: string = '';

  @Prop() extRightClass?: string = '';

  @Prop() extRightIconClass?: string = '';

  @Event({ bubbles: false, composed: false }) cancel: EventEmitter;

  @Event({ bubbles: false, composed: false }) confirm: EventEmitter;

  @Event({ bubbles: false, composed: false }) close: EventEmitter;

  @Event({ bubbles: false, composed: false }) back: EventEmitter;

  @State() leftText = '';

  @State() leftIcon = '';

  @State() rightText = '';

  @State() rightIcon = '';

  @State() useLeft = true;

  @State() useRight = true;

  @State() useContainer = true;

  @State() useTitle = true;

  @Element() host: HTMLElement;

  temp: { [key: string]: unknown } = {};

  private exTransCss = `
  .titian-popup-titlebar-cancel{
    color:var(--popup-title-bar-cancel-color, var(--neutral-color-2, #757575))
  }
  .titian-popup-titlebar-confirm{
    color:var(--popup-title-bar-confirm-color, rgb(var(--theme-r, 250), var(--theme-g,44), var(--theme-b, 25)));
  }
  .titian-popup-titlebar-back{
    --protected-icon-color: var(--popup-title-bar-back-color, var(--neutral-color-2, #757575)) 
  }
  .titian-popup-titlebar-close,.titian-popup-titlebar-mini-close{
    --protected-icon-color: var(--popup-title-cancel-back-color, var(--neutral-color-2, #757575)) 
  }
  .titian-popup-titlebar-mini-close{
    display: flex;
    position: absolute !important;
    right: 0;
    align-items: center;
    justify-content: left;
    width: ${pxToVW('72px')} !important;
    height: ${pxToVW('108px')} !important;
    padding: 0;

    text-align: left;
  }
  .titian-popup-titlebar-mini-close-icon {
    padding: ${pxToVW('8px')};
  }

  .titian-popup-titlebar-space-between {
    text-align: left !important;
  }
    ${this.extCss}
  `;

  onClick = (event: CustomEvent<{ position: 'left' | 'right' | 'title' | 'sub-title' }>) => {
    const { variant } = this;
    const { position } = event.detail;
    if (position === 'left') {
      if (variant === EPopupTitleBarVariantType.WithConfirm) {
        this.cancel.emit();
      } else if (variant === EPopupTitleBarVariantType.BackTitleClose) {
        this.back.emit();
      }
    } else if (position === 'right') {
      if (variant === EPopupTitleBarVariantType.WithConfirm) {
        this.confirm.emit();
      } else if (
        variant === EPopupTitleBarVariantType.MiniClose ||
        variant === EPopupTitleBarVariantType.CancelOnly ||
        variant === EPopupTitleBarVariantType.BackTitleClose
      ) {
        this.close.emit();
      }
    }
  };

  componentDidLoad() {
    const { variant, confirmText, cancelText } = this;
    this.temp.variant = variant;
    this.temp.confirmText = confirmText;
    this.temp.cancelText = cancelText;
    this.changeProps({ variant, confirmText, cancelText });
  }

  changeProps({ variant, confirmText, cancelText }) {
    let leftText = '';
    let leftIcon = '';
    let rightText = '';
    let rightIcon = '';
    let useContainer = true;
    let useLeft = true;
    let useTitle = true;
    switch (variant) {
      case EPopupTitleBarVariantType.WithConfirm:
        leftText = cancelText;
        rightText = confirmText;
        break;
      case EPopupTitleBarVariantType.CancelOnly:
        rightIcon = 'close';
        break;
      case EPopupTitleBarVariantType.BackTitleClose:
        rightIcon = 'close';
        leftIcon = 'nav-back';
        break;
      case EPopupTitleBarVariantType.MiniClose:
        rightIcon = 'close';
        useContainer = false;
        useLeft = false;
        useTitle = false;
        break;
      case EPopupTitleBarVariantType.LeftTitleClose:
        rightIcon = 'close';
        useLeft = false;
        break;
      default:
        break;
    }
    this.leftText = leftText;
    this.leftIcon = leftIcon;
    this.rightText = rightText;
    this.rightIcon = rightIcon;
    this.useContainer = useContainer;
    this.useLeft = useLeft;
    this.useTitle = useTitle;
  }

  componentDidUpdate() {
    const { variant, confirmText, cancelText } = this;
    if (this.temp.variant !== variant || this.temp.confirmText !== confirmText || this.temp.cancelText !== cancelText) {
      this.temp.variant = variant;
      this.temp.confirmText = confirmText;
      this.temp.cancelText = cancelText;
      this.changeProps({ variant, confirmText, cancelText });
    }
  }

  render() {
    const {
      variant,
      leftText,
      leftIcon,
      rightText,
      rightIcon,
      useLeft,
      useRight,
      useContainer,
      useTitle,
      title,
      subTitle,
      extClass,
      extTitleClass,
      extLeftClass,
      extRightClass,
      extRightIconClass,
    } = this;
    return (
      <ti-titlebar
        extCss={this.exTransCss}
        left-text={leftText}
        left-icon={leftIcon}
        right-text={rightText}
        right-icon={rightIcon}
        use-left={useLeft}
        use-right={useRight}
        use-container={useContainer}
        use-title={useTitle}
        title={title}
        sub-title={subTitle}
        ext-class={extClass}
        ext-title-class={`${getTitleClass(variant)} ${extTitleClass}`}
        ext-left-class={`${getLeftClass(variant)} ${extLeftClass}`}
        ext-right-class={`${getRightClass(variant)} ${extRightClass}`}
        ext-right-icon-class={`${getRightClassIcon(variant)} ${extRightIconClass}`}
        exportparts={`${extClass}, ${extTitleClass}, ${extLeftClass}, ${extRightClass}, ${extRightIconClass}`}
        onTiClick={this.onClick}
      />
    );
  }
}
