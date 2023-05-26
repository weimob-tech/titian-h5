import { Component, h, Host, Method, Prop, State, Element } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { isString, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';
import addUnit from '../common/utils/suffix';
import { TiGrid } from '../grid';

@Component({
  tag: 'ti-grid-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiGridItem implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() contentClass?: string;

  @Prop() iconClass?: string;

  @Prop() textClass?: string;

  /**
   * 图标
   *
   * @type string
   * @default ''
   * @example
   * <TiGridItem icon="home" text="Grid" />
   * @since 0.1.0
   */
  @Prop() icon?: string;

  /**
   * 文字内容
   *
   * @type string
   * @default ''
   * @example
   * <TiGridItem icon="home" text="Grid" />
   * @since 0.1.0
   */
  @Prop() text?: string;

  /**
   * 文字颜色
   *
   * @type string
   * @default ''
   * @example
   * <TiGridItem icon="home" text="Grid" color="red" />
   * @since 0.1.0
   */
  @Prop() color?: string;

  /**
   * 图标尺寸
   *
   * @type number
   * @default ''
   * @example
   * <TiGridItem icon="home" text="Grid" size={{32}} />
   * @since 0.1.0
   */
  @Prop() size?: number;

  /**
   * 是否自定义内容
   *
   * @type boolean
   * @default false
   * @example
   * <TiGridItem customContent />
   * @since 0.1.0
   */
  @Prop() customContent?: boolean = false;

  @State() direction: 'row' | 'column' = 'column';

  @State() square = false;

  @State() divider = true;

  @State() columns = 4;

  @State() gutter = 0;

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-grid',
      relations: 'parent',
    })?.[0];
  }

  async componentWillLoad(): Promise<void> {
    addShadowRootStyle.call(this);

    await this.updateDataFromParent();
  }

  @Method()
  async updateDataFromParent(parent?: HTMLTiGridElement | TiGrid) {
    if (!parent) {
      parent = this.parent;
    }
    this.gutter = parent.gutter;
    this.square = parent.square;
    this.divider = parent.divider;
    this.columns = parent.columns;
    this.direction = parent.direction;
  }

  private getClassName() {
    const { extClass, square } = this;
    const classList = [namespace.join('grid-item', { square })];
    if (extClass) {
      classList.push(extClass);
    }
    return classList.join(' ');
  }

  private renderIcon() {
    const { icon, size, color } = this;

    if (isString(icon) && icon) {
      return (
        <div part={this.iconClass} class={`${namespace.join('grid-item-icon')} ${this.iconClass}`}>
          {<ti-icon name={icon as string} size={size} color={color} /> || null}
        </div>
      );
    }

    return <slot name="icon" />;
  }

  private renderText() {
    const { text } = this;

    if (isString(text) && text) {
      return (
        <div part={this.textClass} class={`${namespace.handle('grid-item', 'text')} ${this.textClass}`}>
          {text || null}
        </div>
      );
    }

    return <slot name="text" />;
  }

  private renderContent() {
    const { customContent } = this;
    if (customContent) {
      return <slot name="content" />;
    }

    return [this.renderIcon(), this.renderText()];
  }

  private completedStyles() {
    const { columns, square, gutter } = this;
    const width = `${100 / columns}%`;

    const styles = {
      width,
    };

    if (square) {
      styles['padding-top'] = width;
    }

    if (gutter) {
      const gutterWidth = addUnit(gutter / 2);
      styles['margin-top'] = gutterWidth;
      styles['padding-right'] = gutterWidth;
    }

    return styles;
  }

  render() {
    const { square, divider, gutter, direction } = this;

    return (
      <Host style={{ display: 'contents' }}>
        <div part={this.extClass} class={this.getClassName()} style={this.completedStyles()}>
          <div
            part={this.contentClass}
            class={`${namespace.join('grid-item-content', { square, borderless: !divider, gutter: gutter > 0 })} ${
              this.contentClass
            }`}
            style={direction ? { flexDirection: direction } : {}}
          >
            {this.renderContent()}
          </div>
        </div>
      </Host>
    );
  }
}
