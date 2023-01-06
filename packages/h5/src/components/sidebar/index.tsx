import { Component, h, Prop, Element, Method, Event, EventEmitter, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join } from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';

@Component({
  tag: 'ti-sidebar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSidebar {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() activeIndex?: number = 0;

  @Prop() extClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Event({ eventName: 'change', composed: false }) changeEvent!: EventEmitter<number>;

  @Event({ bubbles: false, composed: false }) scrolltoupper!: EventEmitter<{ direction: 'top' }>;

  @Event({ bubbles: false, composed: false }) scrolltolower!: EventEmitter<{ direction: 'bottom' }>;

  @Event({ bubbles: false, composed: false }) tiScroll!: EventEmitter;

  get children() {
    return getChildren({
      host: this.host,
      useSlot: true,
      tag: 'ti-sidebar-item',
      relations: 'descendant', // 'parent' ,'ancestor',
    });
  }

  updateChildren() {
    this.children.forEach(child => {
      child.updateDataFromParent.apply(child);
    });
  }

  @Watch('activeIndex')
  updateEvent(activeIndex) {
    this.updateChildren();
    this.changeEvent.emit(activeIndex);
  }

  @Method()
  async getImperativeHandle() {
    const { children, activeIndex } = this;
    return { children, activeIndex };
  }

  @Method()
  async setActive(index: number) {
    this.activeIndex = index;
  }

  // eslint-disable-next-line class-methods-use-this
  onChange = (event: Event) => {
    event.stopPropagation();
  };

  onScrolltoupper = e => {
    this.scrolltoupper.emit(e.detail);
  };

  onScrolltolower = e => {
    this.scrolltolower.emit(e.detail);
  };

  onScroll = () => {
    this.tiScroll.emit();
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { extClass, extStyle } = this;
    return (
      <ti-scroll-view
        scrollY
        class={`${join('sidebar')} ${extClass}`}
        part={extClass}
        style={stringToAttrStyle(extStyle)}
        onChange={this.onChange}
        onScrolltoupper={this.onScrolltoupper}
        onScrolltolower={this.onScrolltolower}
        onTiScroll={this.onScroll}
      >
        <slot />
      </ti-scroll-view>
    );
  }
}
