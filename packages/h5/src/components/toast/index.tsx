import { Component, Prop, State, h, Method, Element, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Timeout, TransitionName } from '../common/basic/transition';
import { stringToAttrStyle, isFunction, addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';

import { EToastType, IToastStaticOptions, IToastText } from './const';
import { $toastFilter } from './toast';

const staticOptions = {
  duration: 2000,
  color: '#fff',
  type: EToastType.Text,
};

@Component({
  tag: 'ti-toast',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiToast {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extTextClass = '';

  @Prop() zIndex = 30000;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @State() extPopupClass?: string = '';

  @State() extPopupContentClass?: string = '';

  @State() extPopupMaskClass?: string = '';

  @State() visible?: boolean = false;

  @Prop() timeout?: number | Timeout = { appear: 1000 * 0.2, exit: 1000 * 0.1 };

  @Prop() extContentStyle: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = {};

  @Prop() transition?: TransitionName = 'fade-up';

  @Event({ eventName: 'enter', bubbles: false, composed: false }) enterEvent: EventEmitter<void>;

  @Event({ eventName: 'entered', bubbles: false, composed: false }) enteredEvent: EventEmitter<void>;

  @Event({ eventName: 'exit', bubbles: false, composed: false }) exitEvent: EventEmitter<void>;

  @Event({ eventName: 'exited', bubbles: false, composed: false }) exitedEvent: EventEmitter<void>;

  @State() type?: EToastType = EToastType.Text;

  @State() text?: string = '';

  @State() iconName?: string = '';

  @State() color?: string = '';

  timeOut!: NodeJS.Timeout;

  options!: IToastStaticOptions;

  // eslint-disable-next-line class-methods-use-this
  getOptions(opts: IToastStaticOptions | IToastText): IToastStaticOptions {
    let opt: IToastStaticOptions = {};
    if (typeof opts === 'object') {
      opt = { ...staticOptions, ...opts };
    } else {
      opt = {
        ...staticOptions,
        text: opts,
      };
    }
    if (!('text' in opt) && 'message' in opt) {
      opt.text = opt.message;
    }
    if (!('text' in opt)) {
      opt.text = '';
    }
    return opt;
  }

  @Method()
  async show(opts: IToastStaticOptions | IToastText) {
    this.finish();
    const options = this.getOptions(opts);
    const filter = $toastFilter();
    options.text = filter(options.text.toString());
    this.options = options;
    Object.assign(this, options);

    this.visible = true;
    if (typeof this.options.duration === 'number' && this.options.duration > 0) {
      this.timeOut = setTimeout(() => {
        this.finish();
        // 倒计时关闭
        this.visible = false;
      }, this.options.duration);
    }
  }

  disconnectedCallback() {
    this.finish();
  }

  @Method()
  async info(opts: IToastStaticOptions | IToastText) {
    const { ...rest } = this.getOptions(opts);
    this.show({ ...rest, type: EToastType.Text, iconName: '' });
  }

  @Method()
  async loading(opts: IToastStaticOptions | IToastText) {
    const { ...rest } = this.getOptions(opts);
    this.show({ ...rest, type: EToastType.Loading, iconName: '' });
  }

  @Method()
  async warn(opts: IToastStaticOptions | IToastText) {
    const { iconName, ...rest } = this.getOptions(opts);
    this.show({ ...rest, type: EToastType.Warn, iconName: iconName || 'warning' });
  }

  @Method()
  async success(opts: IToastStaticOptions | IToastText) {
    const { iconName, ...rest } = this.getOptions(opts);
    this.show({ ...rest, type: EToastType.Success, iconName: iconName || 'right' });
  }

  @Method()
  async fail(opts: IToastStaticOptions | IToastText) {
    const { iconName, ...rest } = this.getOptions(opts);
    this.show({ ...rest, type: EToastType.Fail, iconName: iconName || 'error' });
  }

  /**
   * 用户关闭
   */
  @Method()
  async clear() {
    this.finish();
    this.visible = false;
  }

  finish() {
    if (this.timeOut) {
      clearTimeout(this.timeOut);
    }
    if (this.options && this.options.finishedCallback && isFunction(this.options.finishedCallback)) {
      this.options.finishedCallback();
      this.options.finishedCallback = undefined;
    }
  }

  // popup关闭
  onClose = () => {
    this.finish();
    this.visible = false;
  };

  renderChild() {
    const { type, extStyle, color, iconName, text, extTextClass } = this;
    if (type === EToastType.Text) {
      return (
        <div class={join('toast-content', ['with-text'])} style={stringToAttrStyle(extStyle)}>
          <div class={`${join('toast-text')} ${extTextClass}`} part={extTextClass}>
            {text}
          </div>
        </div>
      );
    }
    if (type === EToastType.Loading) {
      return (
        <div class={join('toast-content', ['with-icon'])} style={stringToAttrStyle(extStyle)}>
          <ti-loading size={48} />
          <ti-icon size={48} name={iconName} color={color} ext-class={join('toast-icon')} />
          <div class={`${join('toast-text')} ${extTextClass}`} part={extTextClass}>
            {text}
          </div>
        </div>
      );
    }
    return (
      <div class={join('toast-content', ['with-icon'])} style={stringToAttrStyle(extStyle)}>
        <ti-icon size={48} name={iconName} color={color} ext-class={join('toast-icon')} />
        <div class={`${join('toast-text')} ${extTextClass}`} part={extTextClass}>
          {text}
        </div>
      </div>
    );
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
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

  extPopupCss = `
    .titian-toast-popup-content {
      // opacity: 0.8;
      // background-color: var(--toast-bg-color);
    }
    ${this.extCss}
  `;

  render() {
    const { visible, extPopupClass, extPopupContentClass, extPopupMaskClass, timeout, transition, extContentStyle } =
      this;
    return (
      <ti-popup
        visible={visible}
        hasMask={false}
        class={join('toast', ['popup'])}
        ext-class={`${extPopupClass} ${handle('toast', ['popup-box'])}`}
        ext-content-class={`${extPopupContentClass}, ${handle('toast', ['popup-content'])}`}
        ext-mask-class={`${extPopupMaskClass}`}
        onEnter={this.onEnter}
        onEntered={this.onEntered}
        onExit={this.onExit}
        onExited={this.onExited}
        extContentStyle={stringToAttrStyle(extContentStyle)}
        position="center"
        preventScroll={false}
        contentZIndex={this.zIndex}
        onClose={this.onClose}
        ext-css={this.extPopupCss}
        timeout={timeout}
        transition={transition}
        exportparts={`
        ${extPopupClass},
        ${extPopupContentClass},
        ${extPopupMaskClass},
        ${handle('toast', ['popup-content'])}`}
      >
        {this.renderChild()}
      </ti-popup>
    );
  }
}
