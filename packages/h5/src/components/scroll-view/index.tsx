/* eslint-disable no-nested-ternary */
import { Component, Prop, Element, Watch, h, Event, EventEmitter, Host } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import Movement from '../common/utils/movement';
import { handle, join } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';

import addUnit from '../common/utils/suffix';

const defaultProps = {
  upperThreshold: '2px',
  lowerThreshold: '2px',
};
// TODO: 下期实现refresher功能
@Component({
  tag: 'ti-scroll-view',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiScrollView {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() scrollX = false;

  @Prop() scrollY = false;

  @Prop() extClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extVirtualStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() upperThreshold: number | string = defaultProps.upperThreshold;

  @Prop() lowerThreshold: number | string = defaultProps.lowerThreshold;

  @Prop({ attribute: 'scroll-top' }) curScrollTop?: number | string;

  @Prop({ attribute: 'scroll-left' }) curScrollLeft?: number | string;

  @Prop({ attribute: 'scroll-into-view' }) curScrollIntoView?: string;

  @Event({ bubbles: false, composed: false }) tiScroll!: EventEmitter;

  @Event({ eventName: 'scrolltoupper', bubbles: false, composed: false }) scrollToUpperEvent!: EventEmitter<{
    direction: 'top';
  }>;

  @Event({ eventName: 'scrolltolower', bubbles: false, composed: false }) scrollToLowerEvent!: EventEmitter<{
    direction: 'bottom';
  }>;

  @Prop({ attribute: 'refresher-enabled' }) refresherEnabled?: boolean = false;

  @Prop() scrollWithAnimation = false;

  thresholdIo!: IntersectionObserver;

  locationIo!: IntersectionObserver;

  isReady = false;

  @Watch('curScrollIntoView')
  observerScrollIntoView(newVal: string) {
    if (typeof newVal === 'string' && newVal) {
      raf(() => {
        const position = this.host.querySelector(`#${newVal}`);
        if (position) {
          this.host.scrollTo({
            left: (position as HTMLElement).offsetLeft,
            top: (position as HTMLElement).offsetTop,
            behavior: 'smooth',
          });
        }
      });
    }
  }

  scrollLeft = 0;

  scrollTop = 0;

  threshold = '';

  location = '';

  movement: Movement;

  isPreventDefault = false;

  @Watch('curScrollLeft')
  observerScrollLeft(newVal: string | number) {
    const scrollLeft = Number(newVal);
    if (this.scrollX && !Number.isNaN(scrollLeft) && scrollLeft !== this.scrollLeft) {
      this.host.scrollLeft = scrollLeft;
      this.scrollLeft = scrollLeft;
    }
  }

  @Watch('curScrollTop')
  observerScrollTop(newVal: string | number) {
    const scrollTop = Number(newVal);
    if (this.scrollY && !Number.isNaN(scrollTop) && scrollTop !== this.scrollTop) {
      this.host.scrollTop = scrollTop;
      this.scrollTop = scrollTop;
    }
  }

  componentDidLoad() {
    this.thresholdIo = new IntersectionObserver(
      ([{ isIntersecting, target }]) => {
        this.threshold = '';

        if (!this.isReady) {
          return;
        }
        if (isIntersecting) {
          const { threshold } = (target as HTMLElement).dataset;
          if (threshold === 'upperThreshold') {
            this.threshold = 'upperThreshold';
            this.scrollToUpperEvent.emit({ direction: 'top' });
            return;
          }
          if (threshold === 'lowerThreshold') {
            this.threshold = 'lowerThreshold';
            this.scrollToLowerEvent.emit({ direction: 'bottom' });
          }
        }
      },
      {
        rootMargin: '0px 0px',
        root: this.host,
      },
    );
    this.host.shadowRoot?.querySelectorAll('[data-threshold]').forEach(dom => {
      this.thresholdIo.observe(dom);
    });

    this.locationIo = new IntersectionObserver(
      ([{ isIntersecting, target }]) => {
        this.location = '';
        if (!this.isReady) {
          return;
        }
        if (isIntersecting) {
          const { location } = (target as HTMLElement).dataset;
          // 到达顶部
          if (location === 'start') {
            this.location = 'start';
            return;
          }
          if (location === 'end') {
            this.location = 'end';
          }
        }
      },
      { rootMargin: '0px 0px', root: this.host },
    );
    this.host.shadowRoot?.querySelectorAll('[data-location]').forEach(dom => {
      this.locationIo.observe(dom);
    });

    raf(() => {
      this.isReady = true;
    });
    if (this.curScrollLeft) {
      this.observerScrollLeft(this.curScrollLeft);
    }
    if (this.curScrollTop) {
      this.observerScrollTop(this.curScrollTop);
    }
    this.movement = new Movement({
      box: this.host,
      vertical: this.scrollY,
      touchmove: this.touchmove.bind(this),
      touchstart: this.touchstart.bind(this),
      options: {
        passive: false,
      },
    });
  }

  touchstart() {
    const { scrollWidth, scrollHeight, offsetWidth, offsetHeight } = this.host;
    if (this.scrollX && scrollWidth === offsetWidth) {
      this.isPreventDefault = true;
      return;
    }
    if (this.scrollY && Math.abs(scrollHeight - offsetHeight) <= 1) {
      this.isPreventDefault = true;
      return;
    }
    this.isPreventDefault = false;
  }

  touchmove(event: TouchEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (this.isPreventDefault) {
      if (event.cancelable) {
        event.preventDefault();
      }
      return;
    }
    if (this.location === 'start') {
      if (this.scrollX && this.movement.isRight()) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      if (this.scrollY && this.movement.isBottom()) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
    }

    if (this.location === 'end') {
      if (this.scrollX && this.movement.isLeft()) {
        if (event.cancelable) {
          event.preventDefault();
        }
        return;
      }
      if (this.scrollY && this.movement.isTop()) {
        if (event.cancelable) {
          event.preventDefault();
        }
      }
    }
  }

  disconnectedCallback(): void {
    this.thresholdIo?.disconnect();
    this.locationIo?.disconnect();
    this.movement?.destroy();
  }

  onScroll = () => {
    this.tiScroll.emit();
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const {
      scrollX,
      scrollY,
      upperThreshold = defaultProps.upperThreshold,
      lowerThreshold = defaultProps.lowerThreshold,
      extVirtualStyle,
      extStyle,
      extClass,
    } = this;
    return (
      <Host
        class={`${join('scroll-view')} ${handle('scroll-view', [scrollY ? 'y' : '', scrollX ? 'x' : ''])} ${extClass}`}
        style={stringToAttrStyle(extStyle)}
        onScroll={this.onScroll}
        part={extClass}
      >
        <div class={handle('scroll-view', ['refresher'])} />
        <div
          class={`${handle('scroll-view', ['virtual', scrollY ? 'y' : '', scrollX ? 'x' : ''])} `}
          style={stringToAttrStyle(extVirtualStyle)}
        >
          <div class={handle('scroll-view', ['virtual-start'])} data-location="start" />
          <div
            class={handle('scroll-view', ['virtual-start'])}
            data-threshold="upperThreshold"
            style={
              scrollY
                ? {
                    top: addUnit(upperThreshold),
                  }
                : scrollX
                ? {
                    left: addUnit(upperThreshold),
                  }
                : {}
            }
          />
          <slot />
          <div
            class={handle('scroll-view', ['virtual-end'])}
            data-threshold="lowerThreshold"
            style={
              scrollY
                ? {
                    bottom: addUnit(lowerThreshold),
                  }
                : scrollX
                ? {
                    right: addUnit(lowerThreshold),
                  }
                : {}
            }
          />
          <div class={handle('scroll-view', ['virtual-end'])} data-location="end" />
        </div>
      </Host>
    );
  }
}
