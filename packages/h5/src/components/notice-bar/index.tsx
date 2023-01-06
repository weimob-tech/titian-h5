import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { getStyle, addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { RGBToRGBA } from '../common/utils/color';
import { handle, join } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';

@Component({
  tag: 'ti-notice-bar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiNoticeBar implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() color: string;

  @Prop() leftIcon = '';

  @Prop() rightIcon = '';

  @Prop() content: string | string[] = '';

  @Prop() speed = 50;

  @Prop() variant: 'horizontal' | 'vertical' = 'horizontal';

  @Prop() scrollable: string | boolean = '';

  @Prop() textMode: 'auto' | 'wrap' | 'ellipsis' | 'clip' = 'auto';

  @State() show = true;

  @State() bgColor: string;

  @State() height: string;

  @State() animationData = {};

  @Method()
  async close() {
    this.show = false;
    this.clearRaf();
  }

  rafInstance: number;

  isAnimating = false;

  @Watch('scrollable')
  scrollableChange(newValue) {
    raf(() => {
      if (this.textMode === 'wrap' && newValue !== false) {
        newValue = false;
      }
      if (newValue === false) {
        this.clearRaf();
      } else if (this.isAnimating === false) {
        this.initAnimation();
      }
    });
  }

  @Watch('variant')
  variantChange(newValue, oldValue) {
    raf(() => {
      if (this.textMode === 'wrap' && this.scrollable !== false) {
        this.scrollable = false;
      }
      if (newValue !== oldValue) {
        this.clearRaf();
        this.initAnimation(newValue);
      }
    });
  }

  @Watch('textMode')
  textModeHanlder(textMode) {
    if (textMode === 'wrap') {
      this.scrollable = false;
    }
  }

  componentDidLoad() {
    const hasPopup = this.host.closest('ti-popup');
    if (hasPopup) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.getBgColorAndHeight();
            this.initAnimation();
            observer.unobserve(this.host);
          }
        });
      });
      observer.observe(this.host);
    }
    this.getBgColorAndHeight();
    this.initAnimation();
  }

  disconnectedCallback(): void {
    this.clearRaf();
  }

  @Watch('color')
  private getBgColorAndHeight() {
    raf(() => {
      const bar = this.host.shadowRoot?.querySelector<HTMLDivElement>(`.${join('notice-bar')}`);
      if (bar) {
        const color = getStyle(bar, 'color');
        this.bgColor = RGBToRGBA(`${color}`, 0.1);
        this.height = `${getStyle(bar, 'height')}`;
      }
    }, 3);
  }

  private initAnimation(variant: 'horizontal' | 'vertical' = this.variant) {
    if (this.scrollable === false) return;
    if (variant === 'horizontal') {
      this.initHorizontalAnimation();
    } else if (variant === 'vertical') {
      this.initVerticalAnimation();
    }
    this.isAnimating = true;
  }

  private clearRaf() {
    if (this.rafInstance) {
      raf.cancel(this.rafInstance);
      this.rafInstance = null;
      this.animationData = { transform: 'translate(0px, 0px)' };
    }
    this.isAnimating = false;
  }

  private onTransitionEnd() {
    this.initVerticalAnimation();
  }

  private count = 0;

  private initVerticalAnimation() {
    if (this.scrollable === false) return;
    const { content } = this;
    const barContainer = this.host.shadowRoot.querySelector<HTMLDivElement>(`.${handle('notice-bar', 'container')}`);
    const barContent = this.host.shadowRoot.querySelector<HTMLDivElement>(`.${handle('notice-bar', 'content')}`);

    if (barContainer && barContent) {
      const { height } = barContainer.getBoundingClientRect();
      let list = [];

      if (Array.isArray(content)) {
        list = [...content];
      } else {
        list = [content];
      }
      const realContentLength = list.length + 1;
      const duration = ((realContentLength * height) / this.speed) * 1000;
      if (this.rafInstance) {
        raf.cancel(this.rafInstance);
        this.rafInstance = null;
      }
      const circulation = () => {
        this.rafInstance = raf(() => {
          this.count += 1;

          if (this.count < realContentLength) {
            this.animationData = {
              transform: `translate(0px, -${this.count * height}px)`,
              transitionDuration: `${duration}ms`,
            };
          } else {
            this.animationData = {
              transform: `translate(0px, 0px)`,
              transitionDuration: `0ms`,
            };
            this.count = 0;
            circulation();
          }
        });
      };
      circulation();
    }
  }

  private initHorizontalAnimation() {
    const barContainer = this.host.shadowRoot.querySelector<HTMLDivElement>(`.${handle('notice-bar', 'container')}`);
    const barContent = this.host.shadowRoot.querySelector<HTMLDivElement>(`.${handle('notice-bar', 'content')}`);

    if (barContainer && barContent) {
      const {
        left: containerLeft,
        width: containerWidth,
        right: containerRight,
      } = barContainer.getBoundingClientRect();
      const { left: ContentLeft, width: contentWidth, right: contentRight } = barContent.getBoundingClientRect();
      const resolvedSpeed = (1000 / 60) * (this.speed / 1000); // 一帧运动距离

      const offsetLeft = ContentLeft - containerLeft;

      if (this.scrollable === '' && contentWidth <= containerWidth) return;

      const count = Math.ceil((contentWidth + containerWidth) / resolvedSpeed); // 共需多少帧;
      const firstCount = Math.ceil((contentWidth + offsetLeft) / resolvedSpeed); // 第一次需要多少帧;

      const endPosition = containerRight - contentRight + contentWidth; // 一轮结束位置;
      let curCount = firstCount;

      if (this.rafInstance) {
        raf.cancel(this.rafInstance);
        this.rafInstance = null;
      }

      const circulation = () => {
        this.rafInstance = raf(() => {
          if (curCount > 0) {
            curCount -= 1;
            this.animationData = { transform: `translate(${-(firstCount - curCount) * resolvedSpeed}px, 0px)` };
          } else {
            curCount = count;
            this.animationData = { transform: `translate(${endPosition}px, 0px)` };
          }
          circulation();
        });
      };
      circulation();
    }
  }

  handleClick() {
    if (this.rightIcon === 'close') {
      this.close();
    }
  }

  private computedStyle() {
    const { color, bgColor } = this;
    let { height } = this;
    const style = {};
    style['--notice-bar-color'] = color;
    style['--notice-bar-background-color'] = bgColor;

    if (this.textMode === 'wrap') {
      height = 'auto';
    }
    if (height) {
      style['--notice-bar-height'] = height;
    }
    return { ...style, ...stringToAttrStyle(this.extStyle) };
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { variant, content, textMode } = this;

    let text = '';
    let list = [];

    if (Array.isArray(content)) {
      text = content.join(' ');
      list = [...content];
    } else {
      text = content;
      list = [content];
    }

    if (variant === 'vertical' && this.scrollable) {
      list.push(list[0]);
    }
    return this.show ? (
      <div
        id="titian-notice-bar"
        part={this.extClass}
        style={this.computedStyle()}
        class={`${join('notice-bar', [textMode])} ${this.extClass}`}
      >
        {this.leftIcon ? (
          <ti-icon class={handle('notice-bar', 'left-icon')} name={this.leftIcon} size={36} />
        ) : (
          <slot name="before" />
        )}
        <div class={handle('notice-bar', ['container'])}>
          {this.variant === 'vertical' ? (
            <div
              style={this.animationData}
              class={handle('notice-bar', ['translate'])}
              onTransitionEnd={this.onTransitionEnd.bind(this)}
            >
              {list.map((item, idx) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`${idx}${item}`} class={handle('notice-bar', ['content', variant])}>
                  {item}
                </div>
              ))}
            </div>
          ) : (
            <div style={this.animationData} class={handle('notice-bar', ['content', variant])}>
              {text}
            </div>
          )}
        </div>
        {this.rightIcon ? (
          <ti-icon
            class={handle('notice-bar', ['right-icon'])}
            name={this.rightIcon}
            onClick={this.handleClick.bind(this)}
          />
        ) : (
          <slot name="after" />
        )}
      </div>
    ) : null;
  }
}
