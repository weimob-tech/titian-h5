/* eslint-disable class-methods-use-this */
import { Component, Listen, Element, Prop, Event, EventEmitter, h, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, setStyle, hasClass, addClass, removeClass, addShadowRootStyle } from '../common/utils';
import Movement from '../common/utils/movement';
import { join, handle } from '../common/utils/namespace';
import { handleBall, handleBox } from './switch';

const defaultProps = {
  size: 40,
  defaultValue: true,
};
@Component({
  tag: 'ti-switch',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSwitch {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() loading?: boolean = false;

  @Prop() value?: unknown;

  @Prop() defaultValue? = defaultProps.defaultValue;

  @Prop() size?: number = defaultProps.size;

  @Prop() disabled?: boolean;

  @Prop() activeColor?: string;

  @Prop() color?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extClass? = '';

  curValue!: boolean;

  box!: HTMLElement;

  ball!: HTMLElement;

  controlled = false;

  resizeObserver!: ResizeObserver;

  temp: {
    padding: number;
    deformation: number;
    right: number;
    ballHeight: number;
  };

  movement: Movement;

  middle: boolean;

  @Event({ eventName: 'change', composed: false }) changeEvent!: EventEmitter<boolean>;

  @Watch('value')
  observerValue(next: boolean) {
    if (typeof next === 'boolean') {
      this.curValue = next;
      this.middle = next;
      this.changeStatus(this.middle);
    }
  }

  get rect() {
    const boxDomRect = this.box.getBoundingClientRect();
    const ballDomRect = this.ball.getBoundingClientRect();
    const padding = (boxDomRect.height - ballDomRect.height) / 2;
    return {
      ballHeight: ballDomRect.height,
      padding,
      deformation: ballDomRect.height / 3,
      right: boxDomRect.width - padding * 2 - ballDomRect.height,
    };
  }

  @Listen('click')
  onClick() {
    const { disabled, curValue, loading, controlled } = this;
    if (disabled || loading) {
      return;
    }
    if (controlled) {
      this.changeEvent.emit(!curValue);
      return;
    }
    this.curValue = !curValue;
    this.middle = !curValue;
    this.changeStatus(this.middle);
    this.changeEvent.emit(this.curValue);
  }

  touchstart = () => {
    this.temp = this.rect;
  };

  touchmove = () => {
    const { disabled, curValue, loading, controlled } = this;
    if (disabled || loading || controlled) {
      return;
    }

    if (typeof this.middle === 'undefined') {
      this.middle = curValue;
    }
    const absoluteValue = Math.abs(this.movement.move.x);

    if (this.middle) {
      if (!this.movement.isLeft()) {
        return;
      }
      // 向左形变
      if (absoluteValue < this.temp.deformation) {
        setStyle(this.ball, {
          width: `${this.temp.ballHeight + absoluteValue}px`,
          transform: `translate3d(${this.temp.right - absoluteValue}px, 0, 0)`,
          transition: 'none',
        });
        return;
      }
      // 向左位移
      if (absoluteValue / this.temp.right > 0.5) {
        this.middle = false;
        this.movement.touch = false;
        if (this.middle !== this.curValue) {
          this.curValue = this.middle;
          this.changeEvent.emit(this.curValue);
        }
        this.changeStatus(this.middle);
      }
    }
    if (!this.movement.isRight()) {
      return;
    }
    // 向右形变
    if (absoluteValue < this.temp.deformation) {
      setStyle(this.ball, {
        width: `${this.temp.ballHeight + absoluteValue}px`,
        transition: 'none',
      });
    }
    // 向右位移
    if (absoluteValue / this.temp.right > 0.5) {
      this.middle = true;
      this.movement.touch = false;
      if (this.middle !== this.curValue) {
        this.curValue = this.middle;
        this.changeEvent.emit(this.curValue);
      }
      this.changeStatus(this.middle);
    }
  };

  touchend = () => {
    const { disabled, loading, controlled } = this;
    if (disabled || loading || controlled) {
      return;
    }
    this.changeStatus(this.middle);
  };

  changeStatus(status: boolean) {
    const { color, temp, ball, box } = this;
    if (status) {
      if (!hasClass(box, 'titian-switch-active')) {
        addClass(box, 'titian-switch-active');
      }
      setStyle(ball, {
        transform: `translate3d(${temp.right}px, 0, 0)`,
        width: `${temp.ballHeight}px`,
      });
      return;
    }
    removeClass(box, 'titian-switch-active');
    if (!color) {
      setStyle(box, {
        backgroundColor: null,
      });
    }
    setStyle(ball, { transform: null, width: `${temp.ballHeight}px` });
  }

  componentWillLoad() {
    const { value, defaultValue = defaultProps.defaultValue } = this;
    let val = false;
    if (typeof value === 'boolean') {
      val = value;
      this.controlled = true;
    } else {
      val = Boolean(defaultValue);
    }
    this.curValue = val;

    addShadowRootStyle.call(this);
  }

  connectedCallback() {
    this.movement = new Movement({
      box: this.host,
      vertical: false,
      touchstart: this.touchstart,
      touchmove: this.touchmove,
      touchend: this.touchend,
    });
    this.resizeBailObserver();
  }

  resizeBailObserver() {
    if (this.ball) {
      this.resizeObserver = new ResizeObserver(([entrie]) => {
        if (!entrie) {
          return;
        }
        if (!this.temp || this.temp.ballHeight !== entrie.contentRect.height) {
          this.middle = this.curValue;
          this.temp = this.rect;
          this.changeStatus(this.middle);
        }
      });
      this.resizeObserver.observe(this.ball);
    }
  }

  componentDidLoad() {
    this.resizeBailObserver();
  }

  disconnectedCallback() {
    this.movement?.destroy();
    this.resizeObserver?.disconnect();
  }

  render() {
    const { extClass = '', size = defaultProps.size, disabled, loading, extStyle = '', color, activeColor } = this;
    const style = { ...stringToAttrStyle(extStyle), ...stringToAttrStyle(handleBox(size, color, activeColor)) };
    const ballStyle = stringToAttrStyle(handleBall(size));
    return (
      <div
        class={`${join('switch')} ${handle('switch', [disabled ? 'disabled' : ''])} ${extClass}`}
        part={extClass}
        style={style}
        ref={dom => {
          if (dom) {
            this.box = dom;
          }
        }}
      >
        <div
          class={handle('switch', ['ball'])}
          style={ballStyle}
          ref={dom => {
            if (dom) {
              this.ball = dom;
            }
          }}
        >
          {loading ? <ti-loading size={(size / 10) * 5} color={activeColor} /> : null}
        </div>
      </div>
    );
  }
}
