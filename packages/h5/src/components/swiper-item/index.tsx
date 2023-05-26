import { Component, h, Element, Prop, Method, State, Host } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { join } from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';

@Component({
  tag: 'ti-swiper-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSwiperItem implements BasicComponentAbstract {
  @Element() host: HTMLTiSwiperElement;

  @Prop() skipHiddenItemLayout = false;

  @Prop() itemId?: string;

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-swiper',
      relations: 'ancestor',
    })?.[0];
  }

  @State() styles = {};

  @State() selected = false;

  @State() next = false;

  @State() prev = false;

  async componentDidLoad() {
    const parentInstance = await this.parent.getInstance();
    this.updateDataFromParent(parentInstance);
  }

  @Method()
  async updateDataFromParent(parent, curIndex?) {
    setTimeout(async () => {
      const { vertical, index } = parent;
      if (curIndex !== undefined) {
        this.selected = index === curIndex;
        // cur 1 => next 2, cur 5 => next 0
        this.next = index + 1 === curIndex || (parent.children.length === index + 1 && curIndex === 0);
        // cur 5 => prev 4, cur 0 => prev 5
        this.prev = index - 1 === curIndex || (index === 0 && curIndex === parent.children.length - 1);
      }
      const { width, height } = parent.getSwiperItemRect();
      this.styles = {
        'width': `${width}px`,
        'height': `${height}px`,
        'margin-right': `${this.parent.spaceBetween || 0}px`,
      };
      if (vertical) {
        this.styles['margin-bottom'] = `${this.parent.spaceBetween || 0}px`;
        delete this.styles['margin-right'];
      }
    }, 100);
  }

  render() {
    const { styles } = this;

    return (
      <Host
        class={`${join('swiper-item', { current: this.selected, prev: this.prev, next: this.next })}`}
        style={styles}
      >
        <slot />
      </Host>
    );
  }
}
