import { Component, h, Prop, State, Element, Listen, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

enum ArrowPathEnum {
  DownLeft = `M 0 0  0 12 L 8 4 C 10.5 2 15.5 0 18 0`,

  DownRight = `M 0 0 C 2.5 0 7.5 2 10 4 L 18 12 18 0`,
  DownCenter = `M 0 0  C 2.5 0  7.5  2 10 4 L 18 12 26 4 C 28.5 2  33.5 0  36 0`,

  UpLeft = `M 0 12 0 0 L 8 8 C 10.5 10 15.5 12 18 12`,

  UpRight = `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  18 12`,
  UpCenter = `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  26 8 C 28.5 10 33.5 12 36 12`,
}
const defaultProps = {
  direction: 'bottom',
};
@Component({
  tag: 'ti-tooltip',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTooltip {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() visible = false;

  @Prop() content = '';

  @Prop() direction = defaultProps.direction;

  @Prop() closeOnClick = false;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extClass?: string = '';

  @Prop() extContentClass?: string = '';

  @Prop() extInnerClass?: string = '';

  @State() top = 0;

  @State() left = 0;

  @State() arrayLeft = 0;

  @State() down = true;

  @State() vis = false;

  // TODO: css clipPath 后期clipPath兼容性好转，可以将ti-svg-path-view 切换成 clip-path 实现
  @State() clipPath = '';

  @State() isLeft = false;

  @State() isRight = false;

  contentEl!: HTMLElement;

  arrowEl!: HTMLElement;

  temp = false;

  sysWidth = 0;

  @Watch('visible')
  observerVisable(vis: boolean) {
    if (this.temp === vis) {
      return;
    }
    this.temp = vis;
    this.calculate(() => {
      this.vis = vis;
    });
  }

  @Listen('click')
  open() {
    if (this.closeOnClick) {
      this.visible = true;
    }
  }

  close = (event: Event) => {
    event.stopPropagation();

    if (this.closeOnClick) {
      this.visible = false;
    }
  };

  // eslint-disable-next-line class-methods-use-this
  getLocation(hostRect, arrowRect, contentRect, sysWidth) {
    const direction = hostRect.left < Math.abs(sysWidth - hostRect.right);
    const isLeft = Number((hostRect.left + hostRect.width / 2 - arrowRect.width / 2).toFixed(0)) <= 0;
    const isRight = Number(sysWidth - (hostRect.left + hostRect.width / 2 + arrowRect.width / 2).toFixed(0)) <= 0;
    // 贴左
    if (isLeft) {
      return {
        isLeft,
        isRight,
        left: hostRect.left + hostRect.width / 2,
      };
    }
    // 贴右
    if (isRight) {
      return {
        isLeft,
        isRight,
        left: hostRect.left + hostRect.width / 2 - contentRect.width,
      };
    }
    // 偏左
    if (direction) {
      if (hostRect.left + hostRect.width / 2 > contentRect.width / 2) {
        return { isLeft, isRight, left: hostRect.left + hostRect.width / 2 - contentRect.width / 2 };
      }
      return { isLeft, isRight, left: hostRect.left };
    }
    // 偏右
    if (sysWidth - hostRect.right + hostRect.width / 2 > contentRect.width / 2) {
      return { isLeft, isRight, left: hostRect.left + hostRect.width / 2 - contentRect.width / 2 };
    }
    return {
      isLeft,
      isRight,
      left: hostRect.right - contentRect.width,
    };
  }

  calculate(cb?: () => void) {
    const { direction = defaultProps.direction, sysWidth } = this;
    const { clientHeight: sysHeight } = document.documentElement;
    const hostRect = this.host.getBoundingClientRect();
    const contentRect = this.contentEl.getBoundingClientRect();
    const arrowRect = this.arrowEl?.getBoundingClientRect();
    const { isLeft, isRight, left } = this.getLocation(hostRect, arrowRect, contentRect, sysWidth);
    let clipPath;
    let arrayLeft = 0;

    if (isLeft || isRight) {
      if (isLeft) {
        arrayLeft = (arrowRect.width / 2) * -1;
      } else {
        arrayLeft = contentRect.width - arrowRect.width / 2;
      }
    } else {
      arrayLeft = hostRect.left + hostRect.width / 2 - left - arrowRect.width / 2;
    }
    let top = 0;
    let down = direction === 'top';
    if (direction === 'top') {
      if (contentRect.height + arrowRect.height > hostRect.top) {
        top = hostRect.height + arrowRect.height;
        down = false;
      } else {
        top = 0 - contentRect.height - arrowRect.height;
      }
    } else if (sysHeight - hostRect.bottom < contentRect.height + arrowRect.height) {
      top = 0 - contentRect.height - arrowRect.height;
      down = true;
    } else {
      top = hostRect.height + arrowRect.height;
    }
    if (down) {
      if (isLeft) {
        clipPath = ArrowPathEnum.DownLeft; // `M 18 0  18 12 L 26 4 C 28.5 2 33.5 0 36 0`;
      } else if (isRight) {
        clipPath = ArrowPathEnum.DownRight; // `M 0 0 C 2.5 0 7.5 2 10 4 L 18 12 18 0`;
      } else {
        clipPath = ArrowPathEnum.DownCenter; // `M 0 0  C 2.5 0  7.5  2 10 4 L 18 12 26 4 C 28.5 2  33.5 0  36 0`;
      }
    } else if (isLeft) {
      clipPath = ArrowPathEnum.UpLeft; // `M 18 12 18 0 L 26 8 C 28.5 10 33.5 12 36 12`;
    } else if (isRight) {
      clipPath = ArrowPathEnum.UpRight; // `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  18 12`;
    } else {
      clipPath = ArrowPathEnum.UpCenter; // `M 0 12 C 2.5 12 7.5 10 10 8 L 18 0  26 8 C 28.5 10 33.5 12 36 12`;
    }
    this.down = down;
    this.top = top;
    this.left = 0 - arrayLeft;
    this.isLeft = isLeft;
    this.isRight = isRight;
    this.clipPath = clipPath;
    this.arrayLeft = arrayLeft;
    if (typeof cb === 'function') {
      cb();
    }
  }

  componentDidLoad() {
    const { clientWidth } = document.documentElement;
    this.sysWidth = clientWidth;
    this.calculate();
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const {
      extClass = '',
      extContentClass = '',
      extInnerClass = '',
      closeOnClick,
      content,
      down,
      extStyle,
      top,
      left,
      vis,
      arrayLeft,
      clipPath,
      isLeft,
      isRight,
    } = this;
    const innerStyle = { top: `${top}px`, left: `${left}px` };
    const arrowStyle: any = {
      ...(down ? { bottom: addUnit(1) } : { top: addUnit(1) }),
    };

    if (isLeft || isRight) {
      const key = `border-${down ? 'bottom' : 'top'}-${isLeft ? 'left' : 'right'}-radius`;
      innerStyle[key] = '0';
      if (isLeft) {
        arrowStyle.left = 0;
      } else {
        arrowStyle.right = 0;
      }
    } else {
      arrowStyle.left = `${arrayLeft}px`;
    }

    return (
      <div class={`${join('tooltip')} ${extClass}`} style={stringToAttrStyle(extStyle)} part={extClass}>
        <slot />
        <div
          class={`${handle('tooltip', ['content', vis ? 'content-visible' : ''])} ${extContentClass}`}
          part={extContentClass}
          style={innerStyle}
          ref={box => {
            if (box) {
              this.contentEl = box;
            }
          }}
        >
          <ti-svg-path-view
            class={handle('tooltip', ['arrow', down ? 'arrow-down' : 'arrow-up', isLeft || isRight ? 'half' : 'all'])}
            style={arrowStyle}
            viewBox={isLeft || isRight ? '0 0 18 12' : '0 0 36 12'}
            paths={[
              {
                d: clipPath,
              },
            ]}
            use-mask
            fills={undefined}
            ref={box => {
              if (box) {
                this.arrowEl = box;
              }
            }}
          />
          {closeOnClick && <div class={handle('tooltip', ['mask'])} onClick={this.close} aria-hidden="true" />}
          <div class={`${handle('tooltip', ['inner'])} ${extInnerClass}`} part={extInnerClass}>
            {content || <slot name="content" />}
          </div>
        </div>
      </div>
    );
  }
}
