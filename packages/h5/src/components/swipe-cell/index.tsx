/* eslint-disable no-underscore-dangle */
import { Component, h, Prop, Element, State, Event, Watch, Listen, EventEmitter } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, getBoundingClientRect, getResponsivePixel } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { raf } from '../common/utils/raf';

const THRESHOLD = 2;

const instances: Set<TiSwipeCell> = new Set();

type Position = 'left' | 'right';
type ClickPosition = 'left' | 'right' | 'cell' | 'outside';

export interface OpenParams {
  position: Position;
  name: string;
}

export interface CloseParams {
  position: ClickPosition;
  name: string;
  instance: TiSwipeCell;
}

@Component({
  tag: 'ti-swipe-cell',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
  scoped: false,
})
export class TiSwipeCell implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass: string;

  @Prop() name?: string;

  @Prop() asyncClose = false;

  @Prop() disabled = false;

  @Prop() visible = false;

  @Prop() leftWidth = 0;

  @Prop() rightWidth = 0;

  @State() _rightWidth = 0;

  @State() _leftWidth = 0;

  @State() wrapStyle = {};

  @Event({ bubbles: false, composed: false }) open: EventEmitter<OpenParams>;

  @Event({ bubbles: false, composed: false }) close: EventEmitter<CloseParams>;

  // @Event({ bubbles: false, composed: false }) click: EventEmitter<ClickPosition>;

  @Event({ bubbles: false, composed: false }) tiClick: EventEmitter<any>;

  touchStartTime = 0;

  startX: number;

  isDragging: boolean;

  offset = 0;

  position: 'left' | 'right' | '';

  leftRef: HTMLDivElement;

  rightRef: HTMLDivElement;

  @Listen('click', { target: 'document' })
  clickHandler(e) {
    if (e.target.contains(this.host) && e.target !== this.host) {
      this.onClick('outside');
    }
  }

  @Watch('rightWidth')
  rightWidthChange(value: number, oldValue?: number) {
    this.widthChange(value, oldValue);
  }

  @Watch('leftWidth')
  leftWidthChange(value: number, oldValue?: number) {
    this.widthChange(value, oldValue);
  }

  @Watch('visible')
  visibleChange(value, oldValue?: boolean) {
    const { rightWidth } = this;
    if (value !== oldValue) {
      this.getElementRect();

      if (value) {
        this.openHandler(rightWidth === 0 ? 'left' : 'right');
      } else {
        this.closeHandler();
      }
    }
  }

  widthChange(value: number, oldValue?: number) {
    if (value !== oldValue) {
      const val = getResponsivePixel(value);
      if (this.position === 'left') {
        this.swipeMove(val);
      } else if (this.position === 'right') {
        this.swipeMove(-val);
      }

      if (val === 0) {
        this.resetMoveStatus();
      }
      this.offset = val;
    }
  }

  private openHandler(type: 'left' | 'right') {
    const { disabled } = this;

    if (disabled) return;
    this.closeOthers();
    this.swipeMove(type === 'right' ? -this._rightWidth : this._leftWidth);
  }

  connectedCallback(): void {
    this.offset = 0;
    instances.add(this);
  }

  componentDidLoad(): void {
    this.getElementRect();
    raf(() => {
      this.visibleChange(this.visible);
    }, 5);
    this.addEventListener();
  }

  disconnectedCallback(): void {
    instances.delete(this);
    this.removeEventListener();
  }

  private getElementRect() {
    const right = this.host.shadowRoot?.querySelector(`.${namespace.handle('swipe-cell', 'right')}`);
    const left = this.host.shadowRoot?.querySelector(`.${namespace.handle('swipe-cell', 'left')}`);
    if (!left || !right) {
      return;
    }
    const rightRect = getBoundingClientRect(right);
    const leftRect = getBoundingClientRect(left);

    const transformLeftWidth = getResponsivePixel(this.leftWidth);
    const transformRightWidth = getResponsivePixel(this.rightWidth);

    this._rightWidth = rightRect.width > transformRightWidth ? rightRect.width : transformRightWidth;
    this._leftWidth = leftRect.width > transformLeftWidth ? leftRect.width : transformLeftWidth;
  }

  private closeOthers() {
    instances.forEach(instance => {
      if (instance !== this) {
        instance.closeHandler();
      }
    });
  }

  swipeMove = (offset = 0) => {
    const transform = `translate3d(${offset}px, 0, 0)`;
    const transition = this.isDragging ? 'none' : 'transform .6s cubic-bezier(0.18, 0.89, 0.32, 1)';

    this.wrapStyle = {
      ' -webkit-transform': transform,
      transform,
      '-webkit-transition': transition,
      transition,
    };
  };

  private onTouchStart = (e: TouchEvent) => {
    if (this.disabled) return;

    this.getElementRect();
    this.touchStartTime = e.timeStamp;
    const { clientX } = e.touches[0];
    this.startX = clientX;
  };

  private onTouchMove = (e: TouchEvent) => {
    const { disabled, startX, offset } = this;
    if (disabled) return;

    this.isDragging = true;
    this.touchStartTime = 0;
    const { clientX } = e.touches[0];
    let offsetX = clientX - startX + offset;

    if (offsetX > 0) {
      offsetX = Math.min(offsetX, this._leftWidth);
    } else if (offsetX < 0) {
      offsetX = Math.max(offsetX, -this._rightWidth);
    }

    this.closeOthers();
    this.swipeMove(offsetX);
  };

  private onTouchEnd = (e: TouchEvent) => {
    const { disabled } = this;
    if (disabled) return;

    this.isDragging = false;
    this.offset = e.changedTouches[0].clientX - this.startX + this.offset;

    if (this.offset > 0) {
      this.offset = Math.min(this.offset, this._leftWidth);
    } else if (this.offset < 0) {
      this.offset = Math.max(this.offset, -this._rightWidth);
    }

    if (e.timeStamp - this.touchStartTime < 200) {
      return;
    }
    const offsetX = this.offset;
    if (offsetX > this._leftWidth / THRESHOLD) {
      this.swipeMove(this._leftWidth);
      this.offset = this._leftWidth;
      if (this.position !== 'left') {
        this.position = 'left';
        this.open.emit({ position: 'left', name: this.name });
      }
    } else if (offsetX < -this._rightWidth / THRESHOLD) {
      this.swipeMove(-this._rightWidth);
      this.offset = -this._rightWidth;
      if (this.position !== 'right') {
        this.position = 'right';
        this.open.emit({ position: 'right', name: this.name });
      }
    } else {
      this.closeHandler();
    }
  };

  private closeHandler() {
    this.swipeMove();
    if (this.position) {
      this.close.emit({ position: this.position, name: this.name, instance: this });
    }
    this.resetMoveStatus();
  }

  private resetMoveStatus() {
    this.startX = 0;
    this.offset = 0;
    this.position = '';
  }

  private onClick(position: 'left' | 'right' | 'outside' | 'cell') {
    // this.click.emit(position);

    this.tiClick.emit(position);
    if (!this.offset) {
      return;
    }
    if (this.asyncClose) {
      this.close.emit({ position, name: this.name, instance: this });
    } else {
      this.closeHandler();
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  swipeCell: HTMLElement;

  addEventListener() {
    this.swipeCell?.addEventListener('touchstart', this.onTouchStart);
    this.swipeCell?.addEventListener('touchmove', this.onTouchMove);
    this.swipeCell?.addEventListener('touchend', this.onTouchEnd);
    this.swipeCell?.addEventListener('touchcancel', this.onTouchEnd);
  }

  removeEventListener() {
    this.swipeCell?.removeEventListener('touchstart', this.onTouchStart);
    this.swipeCell?.removeEventListener('touchmove', this.onTouchMove);
    this.swipeCell?.removeEventListener('touchend', this.onTouchEnd);
    this.swipeCell?.removeEventListener('touchcancel', this.onTouchEnd);
  }

  render() {
    return (
      <div
        part={this.extClass}
        ref={e => (this.swipeCell = e)}
        class={`${namespace.join('swipe-cell')}${this.extClass ? ` ${this.extClass}` : ''}`}
      >
        <div class={namespace.handle('swipe-cell', 'wrap')} style={this.wrapStyle}>
          <div
            ref={el => (this.leftRef = el)}
            class={namespace.handle('swipe-cell', 'left')}
            aria-hidden="true"
            onClick={() => this.onClick('left')}
          >
            <slot name="left" />
          </div>
          <div
            class={namespace.handle('swipe-cell', 'content')}
            aria-hidden="true"
            onClick={() => this.onClick('cell')}
          >
            <slot />
          </div>
          <div
            ref={e => (this.rightRef = e)}
            aria-hidden="true"
            onClick={() => this.onClick('right')}
            class={namespace.handle('swipe-cell', 'right')}
          >
            <slot name="right" />
          </div>
        </div>
      </div>
    );
  }
}
