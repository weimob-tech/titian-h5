import { Component, h, Method, Prop, State, Element } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle } from '../common/utils';
import { join } from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';
import { TiRow } from '../row';

@Component({
  tag: 'ti-col',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCol implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() public extClass: string;

  /**
   * 栅格占位格数，为 0 时相当于 `display: none`
   *
   * @type number
   * @default 0
   * @example
   * <TiCol span={2} />
   * @since 0.1.0
   * @memberOf ColProps
   * */
  @Prop() public span = 0;

  /**
   * 栅格左侧的偏移格数
   *
   * @type number
   * @default 0
   * @example
   * <TiCol span={2} offset={1} />
   * @since 0.1.0
   * @memberOf ColProps
   * */
  @Prop() public offset = 0;

  /**
   * 栅格间隔
   *
   * @type number
   * @default 0
   * @example
   * <TiCol span={2} gutter={16} />
   * @since 0.1.0
   * @memberOf ColProps
   * */
  @State() public gutter = 0;

  get parent() {
    return getParent({
      tag: 'ti-row',
      host: this.host,
      relations: 'parent',
    })?.[0];
  }

  private completedStyles() {
    const num = this.gutter / 2;

    return {
      'padding-left': `${num}px`,
      'padding-right': `${num}px`,
    };
  }

  async componentWillLoad(): Promise<void> {
    addShadowRootStyle.call(this);

    await this.updateDataFromParent();
  }

  @Method()
  async updateDataFromParent(parent$0?: HTMLTiRowElement | TiRow) {
    let parent = parent$0;

    if (!parent) {
      parent = this.parent;
    }

    if (!parent) return;
    if (this.gutter !== parent.gutter) {
      this.gutter = parent.gutter;
    }
  }

  render() {
    return (
      <div
        class={`${join('col', [`${this.span}`, `flex-${this.span}`, `offset-${this.offset}`])} ${this.extClass}`}
        part={this.extClass}
        style={this.completedStyles()}
      >
        <slot />
      </div>
    );
  }
}
