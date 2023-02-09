/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, h, Prop, Element, State, Watch, Event, EventEmitter } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';

@Component({
  tag: 'ti-sticky',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSticky implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() offsetTop = 0;

  @Prop() container: () => HTMLElement;

  @Prop() disabled = false;

  @Prop() zIndex = 99;

  @Prop() usePureCss = false;

  @State() height = 0;

  @State() width = 0;

  @State() left = 0;

  @State() fixed = false;

  @Event({ bubbles: false, composed: false, eventName: 'fixed' }) fixedHandle: EventEmitter<{
    isFixed: boolean;
    top: number;
  }>;

  private ref = null;

  private contentObserver = null;

  private containerObserver = null;

  @Watch('disabled')
  disabledChanged() {
    if (this.disabled) {
      this.destroyObserver();
      this.setPureCss();
    } else {
      this.initObserver();
    }
  }

  @Watch('offsetTop')
  offsetTopChanged() {
    if (this.disabled) return;

    this.initObserver();
  }

  @Watch('container')
  containerChanged() {
    if (typeof this.container !== 'function' || !this.height) return;
    this.creatContainerObserver();
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    if (this.disabled) return;
    this.initObserver();
  }

  disconnectedCallback() {
    this.destroyObserver();
  }

  initObserver() {
    this.destroyObserver();
    if (!this.ref) return;
    const contentRect = this.ref?.getBoundingClientRect();
    this.left = contentRect.left;
    this.width = contentRect.width;
    this.height = contentRect.height;
    if (this.height === 0) return;
    this.createObserver();
    this.creatContainerObserver();
  }

  createObserver() {
    let top = this.offsetTop;
    if (this.usePureCss) {
      top += 1;
    }
    this.destroyObserver('contentObserver');

    this.contentObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        this.setFixed(entry.boundingClientRect.top);
      },
      { threshold: [1], rootMargin: `-${top}px 1000px 10000px 1000px` },
    );

    this.contentObserver.observe(this.ref);
  }

  creatContainerObserver() {
    if (typeof this.container !== 'function') return;
    const elem = this.container();
    const rect = elem.getBoundingClientRect();
    const contentRect = this.ref.getBoundingClientRect();
    let top = rect.height - this.offsetTop - contentRect.height - (contentRect.top - rect.top);
    if (this.usePureCss) {
      top = 1 - this.offsetTop;
    }
    this.destroyObserver('containerObserver');
    this.containerObserver = new IntersectionObserver(
      entries => {
        const entry = entries[0];
        this.setFixed(entry.boundingClientRect.top, top - 1);
      },
      { threshold: [1], rootMargin: `${top}px 1000px 10000px 1000px` },
    );

    this.containerObserver.observe(this.ref);
  }

  destroyObserver(observerName?: 'contentObserver' | 'containerObserver') {
    if (observerName) {
      const observer = this[observerName];
      observer && observer.disconnect();
    } else {
      this.contentObserver && this.contentObserver.disconnect();
      this.containerObserver && this.containerObserver.disconnect();
    }
  }

  private setFixed(top: number, containerObserverTop?: number) {
    let fixed = false;
    if (this.usePureCss) {
      fixed = Math.abs(top - this.offsetTop) <= 1;
    } else if (containerObserverTop !== undefined) {
      if (Math.abs(top + containerObserverTop) < 1) {
        fixed = !this.fixed;
      } else {
        fixed = top >= -containerObserverTop && top < this.offsetTop;
      }
    } else if (Math.abs(top - this.offsetTop) < 1) {
      fixed = !this.fixed;
    } else {
      fixed = top < this.offsetTop;
    }

    this.fixedHandle.emit({ isFixed: fixed, top });
    if (this.usePureCss) return;
    this.fixed = fixed;
  }

  private outStyle(): Record<string, any> {
    const style = { '--sticky-z-index': this.zIndex };
    if (!this.fixed) {
      return style;
    }
    return { height: `${this.height}px`, width: `${this.width}px`, ...style };
  }

  private innerStyle(): Record<string, any> {
    if (!this.fixed) {
      return {};
    }
    return { top: `${this.offsetTop || 0}px` };
  }

  private setPureCss(): Record<string, any> {
    if (this.disabled) return {};
    return { 'position': 'sticky', 'top': `${this.offsetTop || 0}px`, '--sticky-z-index': this.zIndex };
  }

  render() {
    return this.usePureCss ? (
      <div ref={e => (this.ref = e)} class={`${this.extClass} ${join('sticky')}`} style={this.setPureCss()}>
        <slot />
      </div>
    ) : (
      <div ref={e => (this.ref = e)} class={`${this.extClass} ${join('sticky')}`} style={this.outStyle()}>
        <div class={handle('sticky', { fixed: this.fixed })} style={this.innerStyle()}>
          <slot />
        </div>
      </div>
    );
  }
}
