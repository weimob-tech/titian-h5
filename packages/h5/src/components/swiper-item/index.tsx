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

  componentDidLoad() {
    setTimeout(async () => {
      const parentInstance = await this.parent.getInstance();
      this.updateDataFromParent(parentInstance);
    }, 100);
  }

  @Method()
  async updateDataFromParent(parent) {
    const { vertical } = parent;
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
  }

  render() {
    const { styles } = this;

    return (
      <Host class={`${join('swiper-item')}`} style={styles}>
        <slot />
      </Host>
    );
  }
}
