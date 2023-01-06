/* eslint-disable class-methods-use-this */
import { Component, EventEmitter, h, Prop, Event, Watch, Element, Host } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { Timout, TransitionName } from '../common/basic/transition';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';

import { join, handle } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';
import zIndexTool from '../common/utils/zIndexTool';

import { EPosition, ETransitionClass } from './const';

const DEFAULT_TIMING_FUNCTION = 'cubic-bezier(0.5, 1, 0.89, 1)';

@Component({
  tag: 'ti-popup',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiPopup implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() extMaskClass?: string;

  @Prop() extContentClass?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() maskZIndex?: number = zIndexTool.getZIndex();

  @Prop() contentZIndex?: number = zIndexTool.getZIndex();

  @Prop() hasMask?: boolean = true;

  @Prop() safeArea?: boolean = true;

  @Prop() visible?: boolean = false;

  @Prop() preventScroll?: boolean = true;

  @Prop() disableGlobalTouchMove?: boolean = false;

  @Prop() closeOnMask?: boolean = true;

  @Prop() position?: `${EPosition}` = 'center';

  @Prop() radius?: string | number = '';

  @Prop() timeout?: number | Timout;

  @Prop() timingFunction? = '';

  @Prop() extMaskStyle = {};

  @Prop() extContentStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() transition?: TransitionName;

  @Prop() destroyOnClose?: boolean = false;

  @Event({ eventName: 'show', bubbles: false, composed: false }) showEvent: EventEmitter<void>;

  @Event({ eventName: 'close', bubbles: false, composed: false }) closeEvent: EventEmitter<void>;

  @Event({ eventName: 'enter', bubbles: false, composed: false }) enterEvent: EventEmitter<void>;

  @Event({ eventName: 'entered', bubbles: false, composed: false }) enteredEvent: EventEmitter<void>;

  @Event({ eventName: 'exit', bubbles: false, composed: false }) exitEvent: EventEmitter<void>;

  @Event({ eventName: 'exited', bubbles: false, composed: false }) exitedEvent: EventEmitter<void>;

  @Watch('visible')
  visibleChanged(newVal, oldVal) {
    if (oldVal === newVal) return;
    if (newVal) {
      this.onShow();
      if (this.preventScroll) {
        document.body.style.overflow = 'hidden';
      }
      if (this.disableGlobalTouchMove) {
        this.addEventListener();
      }
    } else {
      this.onClose();
      if (this.preventScroll) {
        document.body.style.overflow = 'auto';
      }
      if (this.disableGlobalTouchMove) {
        this.removeEventListener();
      }
    }
  }

  @Watch('disableGlobalTouchMove')
  disableGlobalTouchMoveChanged(newVal, oldVal) {
    if (oldVal === newVal) return;
    if (this.visible) {
      if (newVal) {
        this.addEventListener();
      } else {
        this.removeEventListener();
      }
    } else {
      this.removeEventListener();
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    if (this.visible) {
      if (this.preventScroll) {
        document.body.style.overflow = 'hidden';
      }
      if (this.disableGlobalTouchMove) {
        this.addEventListener();
      }
    }
  }

  disconnectedCallback() {
    this.visible = false;
    if (this.preventScroll) {
      document.body.style.overflow = 'auto';
    }
    if (this.disableGlobalTouchMove) {
      this.removeEventListener();
    }
  }

  private onShow() {
    // 弹出层打开时触发
    if (this.visible) {
      this.showEvent.emit();
    }
  }

  private onClose() {
    // 弹出层关闭时触发
    if (this.visible) {
      this.closeEvent.emit();
      this.visible = false;
    }
  }

  onTapMask = () => {
    const { closeOnMask } = this;
    if (closeOnMask) {
      this.onClose();
    }
  };

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

  onTapContent = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const root = target.getRootNode();
    if (root === this.host.shadowRoot) {
      event.stopPropagation();
    }
  };

  onTouchMove(event: TouchEvent) {
    event.stopPropagation();
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  onTouchMoveByWindow(event: TouchEvent) {
    if (event.cancelable) {
      event.preventDefault();
    }
  }

  addEventListener() {
    window.addEventListener('touchmove', this.onTouchMoveByWindow, { passive: false });
  }

  removeEventListener() {
    window.removeEventListener('touchmove', this.onTouchMoveByWindow);
  }

  render() {
    const { position, contentZIndex, radius, extContentStyle } = this;
    let { timeout } = this;
    let transitionClass: string = this.transition;
    if (!transitionClass) {
      transitionClass = ETransitionClass[position];
    }
    if (position === EPosition.CENTER && transitionClass !== 'fade') {
      transitionClass = `${transitionClass}-center`;
    }
    const className = join('popup', [position === 'center' && transitionClass !== 'fade' ? 'center' : position]);
    const contentStyle = {};
    if (timeout) {
      if (typeof timeout === 'number') {
        contentStyle['--private-start-duration'] = `${timeout}ms`;
        contentStyle['--private-end-duration'] = `${timeout}ms`;
      } else if (typeof timeout === 'object' && timeout.appear && timeout.exit) {
        contentStyle['--private-start-duration'] = `${timeout.appear}ms`;
        contentStyle['--private-end-duration'] = `${timeout.exit}ms`;
      }
    } else {
      timeout = {
        appear: 300,
        exit: 200,
      };
    }
    const style = {
      'z-index': contentZIndex,
      '--popup-radius': addUnit(radius),
      ...contentStyle,
      ...stringToAttrStyle(extContentStyle),
    };
    return (
      <Host>
        <ti-transition
          extStyle={{ 'z-index': this.maskZIndex || '', ...this.extMaskStyle }}
          extClass={`${join('popup-mask')} ${this.extMaskClass || ''}`}
          show={this.hasMask && this.visible}
          enterDoneClass={join('popup-enter-done')}
          exitClass={join('popup-enter-done')}
          destroyOnExit={this.destroyOnClose}
          onClick={this.onTapMask}
          timeout={timeout}
          timing-function={DEFAULT_TIMING_FUNCTION}
          name="fade"
          onTouchMove={this.onTouchMove}
        />
        <ti-transition
          show={this.visible}
          name={'' as TransitionName}
          destroyOnExit={this.destroyOnClose}
          extStyle={style}
          extClass={`${this.extContentClass || ''}  ${className}`}
          timeout={timeout}
          timingFunction={this.timingFunction}
          onClick={this.onTapContent}
          enterClass={handle('popup', [`${transitionClass}-start`])}
          enterDoneClass={handle('popup', [`${transitionClass}-middle`])}
          enterActiveClass={handle('popup', [`${transitionClass}-start-active`])}
          exitClass={handle('popup', [`${transitionClass}-middle`])}
          exitDoneClass={handle('popup', [`${transitionClass}-end`])}
          exitActiveClass={handle('popup', [`${transitionClass}-end-active`])}
          onEnter={this.onEnter}
          onEntered={this.onEntered}
          onExit={this.onExit}
          onExited={this.onExited}
        >
          <div
            part={`${this.extClass}`}
            class={` ${join('popup-box', [this.position])} ${this.extClass}`}
            style={stringToAttrStyle(this.extStyle)}
          >
            {this.position === EPosition.TOP && this.safeArea && <ti-safe-area class="noscroll" position="top" />}
            <slot />
            {this.position === EPosition.BOTTOM && this.safeArea && <ti-safe-area class="noscroll" position="bottom" />}
          </div>
        </ti-transition>
      </Host>
    );
  }
}
