import { Component, h, Prop, Element } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { isString, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';
import addUnit from '../common/utils/suffix';

@Component({
  tag: 'ti-grid',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiGrid implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  /**
   * 宫格标题
   *
   * @type string
   * @default ''
   * @example
   * <TiGrid title="自定义图标，文字内容">
   *  <TiGridItem icon="home" text="Grid" />
   *  <TiGridItem icon="cart" text="购物车" />
   *  <TiGridItem icon="phone" text="电话" />
   * </TiGrid>
   * @since 0.1.0
   */
  @Prop() title: string;

  /**
   * 宫格之间的间隙宽度
   *
   * @type number
   * @default 0
   * @example
   * <TiGrid gutter="16" />
   * @since 0.1.0
   */
  @Prop() gutter = 0;

  /**
   * 是否以自适应正方形展示
   *
   * @type boolean
   * @default false
   * @example
   * <TiGrid square />
   * @since 0.1.0
   */
  @Prop() square: boolean;

  /**
   * 排列方向
   *
   * @type string
   * @default 'column'
   * @enum ['column', 'row']
   * @example
   * <TiGrid direction="row" />
   * @since 0.1.0
   */
  @Prop() direction: 'row' | 'column' = 'column';

  /**
   * 宫格的每行展示的个数， 默认为 `4` 个
   *
   * @type number
   * @default 4
   * @example
   * <TiGrid col="3" />
   * @since 0.1.0
   */
  @Prop() columns = 4;

  /**
   * 是否使用外边框
   *
   * @deprecated 请使用 `divider` 替代
   * @type boolean
   * @default true
   * @example
   * <TiGrid border />
   * @since 0.1.0
   */
  @Prop() border = true;

  /**
   * 是否使用外边框
   *
   * @type boolean
   * @default true
   * @example
   * <TiGrid border />
   * @since 0.1.0
   */
  @Prop() divider = true;

  @Prop() extClass?: string;

  componentWillLoad(): void | Promise<void> {
    this.update();

    addShadowRootStyle.call(this);
  }

  componentDidUpdate(): void {
    this.update();
  }

  get children() {
    return getChildren({
      tag: 'ti-grid-item',
      useSlot: true,
      relations: 'children',
      host: this.host,
    });
  }

  private update() {
    this.children.forEach(child => child.updateDataFromParent(this));
  }

  private renderTitle() {
    const { title } = this;
    if (isString(title)) {
      return <div class={namespace.join('grid', 'title')}>{title ?? null}</div>;
    }

    return <slot name="title" />;
  }

  private getClassName() {
    const { gutter, divider, border, extClass } = this;
    const classList = [namespace.join('grid', { gutter: gutter !== 0, divider: divider && border }), extClass];

    return classList.join(' ');
  }

  private completedStyle() {
    const { gutter } = this;
    if (gutter) {
      return {
        'padding-left': addUnit(gutter / 2),
      };
    }
    return {};
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        <div part={this.extClass} class={this.getClassName()} style={this.completedStyle()}>
          <slot />
        </div>
      </div>
    );
  }
}
