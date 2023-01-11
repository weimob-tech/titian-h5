import { Component, Prop, h, Event, EventEmitter, Method, State, Element } from '@stencil/core';
import { JSXBase, Watch } from '@stencil/core/internal';
import { Timeout, TransitionName } from '../common/basic/transition';
import { isFunction, stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join } from '../common/utils/namespace';
import { IDialogStaticOptions } from './types';

const staticOptions: IDialogStaticOptions = {
  cancelBtnText: '取消',
  isTextButton: false,
  hasCancelButton: true,
  confirmBtnText: '确定',
};

const defaultProps = {
  hasCancelButton: true,
  cancelBtnText: '取消',
  confirmBtnText: '确定',
};
@Component({
  tag: 'ti-dialog',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiDialog {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() visible?: boolean = false;

  @Prop() title = '';

  @Prop() content = '';

  @Prop() zIndex = 12000;

  @Prop() hasCancelButton?: boolean = true;

  @Prop() cancelBtnText?: string = '取消';

  @Prop() confirmBtnText?: string = '确定';

  @Prop() isTextButton?: boolean = false;

  @Prop() useActionsSlot?: boolean = false;

  @Prop() useContentSlot?: boolean = false;

  @Prop() timeout?: number | Timeout = { appear: 1000 * 0.3, exit: 1000 * 0.2 };

  @Prop() transition?: TransitionName = 'fade-up';

  @Prop() extClass?: string = '';

  @Prop() extPopupClass?: string = '';

  @Prop() extPopupContentClass?: string = '';

  @Prop() extPopupMaskClass?: string = '';

  @Prop() extInnerClass?: string = '';

  @Prop() extContentClass?: string = '';

  @Prop() extTitleClass?: string = '';

  @Prop() extActionsClass?: string = '';

  @Prop() extActionCancelClass?: string = '';

  @Prop() extActionConfirmClass?: string = '';

  @Prop() extStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  @Prop() confirmButtonColor?: string;

  @Prop() cancelButtonColor?: string;

  @Prop() confirmButtonBgColor?: string;

  @Prop() cancelButtonBgColor?: string;

  @State() innerVisible?: boolean;

  @Prop() closeOnActions?: boolean = true;

  @Prop() closeOnMask?: boolean = true;

  @Event({ eventName: 'cancel', bubbles: false, composed: false }) cancelEvent!: EventEmitter<void>;

  @Event({ eventName: 'confirm', bubbles: false, composed: false }) confirmEvent!: EventEmitter<void>;

  @Event({ eventName: 'close', bubbles: false, composed: false }) closeEvent!: EventEmitter<void>;

  @Event({ eventName: 'enter', bubbles: false, composed: false }) enterEvent: EventEmitter<void>;

  @Event({ eventName: 'entered', bubbles: false, composed: false }) enteredEvent: EventEmitter<void>;

  @Event({ eventName: 'exit', bubbles: false, composed: false }) exitEvent: EventEmitter<void>;

  @Event({ eventName: 'exited', bubbles: false, composed: false }) exitedEvent: EventEmitter<void>;

  // eslint-disable-next-line class-methods-use-this
  onCancelCallback() {}

  // eslint-disable-next-line class-methods-use-this
  onConfirmCallback() {}

  // eslint-disable-next-line class-methods-use-this
  onCloseCallback() {}

  onCancel = () => {
    this.cancelEvent.emit();
    if (isFunction(this.onCancelCallback)) {
      this.onCancelCallback();
      this.onCancelCallback = () => {};
    }
    if (this.closeOnActions) {
      this.close();
    }
  };

  onConfirm = () => {
    this.confirmEvent.emit();

    if (isFunction(this.onConfirmCallback)) {
      this.onConfirmCallback();
      this.onConfirmCallback = () => {};
    }
    if (this.closeOnActions) {
      this.close();
    }
  };

  onClose = () => {
    if (isFunction(this.onCloseCallback)) {
      this.onCloseCallback();
      this.onCloseCallback = () => {};
    }
    // this.close();
  };

  @Watch('visible')
  watchVisible() {
    const { visible, innerVisible } = this;
    if (visible !== innerVisible) {
      this.innerVisible = visible;
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.watchVisible();
    this.updateShadowRootStyle();
  }

  @Watch('extCss')
  updateShadowRootStyle() {
    addShadowRootStyle.call(this);
  }

  @Method()
  close() {
    if (this.innerVisible) {
      this.closeEvent.emit();
      this.innerVisible = false;
    }
  }

  success(opts: IDialogStaticOptions) {
    this.show(opts);
  }

  @Method()
  async show(opts: IDialogStaticOptions) {
    const { onCancel, onConfirm, onClose, ...otherOpts } = opts;

    const params = { ...staticOptions, ...otherOpts };

    Object.assign(this, params);
    this.innerVisible = true;

    if (isFunction(onCancel)) {
      this.close.bind(this);
      this.onCancelCallback = onCancel.bind(this, this.close.bind(this));
    }
    if (isFunction(onConfirm)) {
      this.close.bind(this);
      this.onConfirmCallback = onConfirm.bind(this, this.close.bind(this));
    }
    if (isFunction(onClose)) {
      this.close.bind(this);
      this.onCloseCallback = onClose.bind(this, this.close.bind(this));
    }
  }

  onEnter = () => {
    this.enterEvent.emit();
  };

  onEntered = () => {
    this.enteredEvent.emit();
  };

  onExit = () => {
    this.exitEvent.emit();
  };

  onExited = () => {
    this.exitedEvent.emit();
  };

  render() {
    const {
      hasCancelButton = defaultProps.hasCancelButton,
      cancelBtnText = defaultProps.cancelBtnText,
      confirmBtnText = defaultProps.confirmBtnText,

      innerVisible,
      useContentSlot,
      content,
      title,
      useActionsSlot,
      isTextButton,
      transition,
      timeout,
      cancelButtonColor,
      confirmButtonColor,
      extClass = '',
      extPopupClass = '',
      extPopupContentClass = '',
      extPopupMaskClass = '',
      extInnerClass = '',
      extTitleClass = '',
      extContentClass = '',
      extActionsClass = '',
      extActionCancelClass = '',
      extActionConfirmClass = '',
      extStyle = '',
    } = this;

    return (
      <ti-popup
        visible={innerVisible}
        position="center"
        has-mask
        class={join('dialog-popup')}
        contentZIndex={this.zIndex}
        closeOnMask={this.closeOnMask}
        maskZIndex={this.zIndex - 1}
        ext-class={extPopupClass}
        ext-css={this.extCss}
        ext-content-class={extPopupContentClass}
        ext-mask-class={extPopupMaskClass}
        on-close={this.onClose}
        exportparts={`${extPopupClass}, ${extPopupContentClass}, ${extPopupMaskClass}`}
        transition={transition}
        timeout={timeout}
        onEnter={this.onEnter}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExited={this.onExited}
      >
        <div class={`${join('dialog')} ${extClass}`} part={extClass} style={stringToAttrStyle(extStyle)}>
          <div class={`${join('dialog-inner')} ${extInnerClass}`} part={extInnerClass}>
            {title ? (
              <div class={`${join('dialog-title')} ${extTitleClass}`}>
                <span>{title}</span>
              </div>
            ) : null}
            {useContentSlot ? (
              <slot />
            ) : (
              <div class={`${join('dialog-content')} ${extContentClass}`} part={extContentClass}>
                <span>{content}</span>
              </div>
            )}
          </div>
          {useActionsSlot ? (
            <slot name="actions" />
          ) : (
            <div
              class={`${join('dialog-actions', [isTextButton ? 'text' : 'contained'])} ${extActionsClass}`}
              part={extActionsClass}
            >
              {hasCancelButton ? (
                <div class={`${join('dialog-actions-cancel')}`}>
                  <ti-button
                    size="medium"
                    variant={isTextButton ? 'text' : 'filled'}
                    extClass={`${extActionCancelClass}`}
                    extStyle={{
                      color: cancelButtonColor || undefined,
                      backgroundColor: this.cancelButtonBgColor || undefined,
                    }}
                    onClick={this.onCancel}
                    exportparts={extActionCancelClass}
                    extCss={this.extCss}
                    block
                  >
                    {cancelBtnText}
                  </ti-button>
                </div>
              ) : null}
              <div class={`${join('dialog-actions-confirm')}`}>
                <ti-button
                  size="medium"
                  block
                  variant={isTextButton ? 'text' : 'contained'}
                  extClass={`${extActionConfirmClass}`}
                  onClick={this.onConfirm}
                  extStyle={{
                    color: confirmButtonColor || undefined,
                    backgroundColor: this.confirmButtonBgColor || undefined,
                  }}
                  exportparts={extActionConfirmClass}
                  extCss={this.extCss}
                >
                  {confirmBtnText}
                </ti-button>
              </div>
            </div>
          )}
        </div>
      </ti-popup>
    );
  }
}
