import { Component, Element, h, Prop, Watch } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle } from '../common/utils';
import { join } from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';

@Component({
  tag: 'ti-row',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiRow implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop()
  public extStyle = {};

  @Prop() public extClass: string;

  /**
   * 列元素之间的间距
   *
   * @type number
   * @default 0
   * @example
   * <ti-row gutter="{{ 16 }}">
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   * </ti-row>
   * @since 0.1.0
   */
  @Prop() public gutter = 0;

  /**
   * 是否是 flex 布局
   *
   * @type boolean
   * @default true
   * @example
   * <ti-row flex>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   *  <ti-col span="6">col 6</ti-col>
   * </ti-row>
   * @since 0.1.0
   */
  @Prop() public flex = true;

  get getChildren() {
    return getChildren({
      host: this.host,
      tag: 'ti-col',
      relations: 'descendant',
      useSlot: true,
    });
  }

  private completedStyle() {
    const number = this.gutter / 2;
    return {
      marginLeft: `-${number}px`,
      marginRight: `-${number}px`,
      ...this.extStyle,
    };
  }

  @Watch('gutter')
  setGutter(value, oldValue?) {
    if (value !== oldValue) {
      const children = this.getChildren;

      children?.forEach(child => {
        if (child.updateDataFromParent) {
          child.updateDataFromParent(this).then();
        }
      });
    }
  }

  componentWillLoad() {
    this.setGutter(this.gutter);

    addShadowRootStyle.call(this);
  }

  render() {
    const completedStyle = this.completedStyle();
    return (
      <div part={this.extClass} class={`${join('row', { flex: this.flex })} ${this.extClass}`} style={completedStyle}>
        <slot />
      </div>
    );
  }
}
