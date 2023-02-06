import { Component, h, Prop, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';

@Component({
  tag: 'ti-cell-group',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCellGroup implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  /**
   * 单元格组副标题
   *
   * @type string
   * @default ''
   * @example
   * <TiCellGroup title="单元格组标题" />
   * @since 0.1.0
   * @memberOf CellGroupProps
   * */
  @Prop() title: string;

  /**
   * 单元格组副标题
   *
   * @type string
   * @default ''
   * @example
   * <TiCellGroup sub-title="单元格组副标题" />
   * @since 0.1.0
   * @memberOf CellGroupProps
   * */
  @Prop() subTitle: string;

  /**
   * 单元格组模式
   *
   * @type string
   * @default default
   * @enum default, card
   * @example
   * <TiCellGroup mode="card" />
   * @since 0.1.0
   * @memberOf CellGroupProps
   * */
  @Prop() mode: 'default' | 'card' = 'default';

  /**
   * 自定义 title wrap 的 part 属性
   */
  @Prop() titleWrapClass: string;

  /**
   * 自定义 group title 的 part 属性
   */
  @Prop() titleClass: string;

  /**
   * 自定义 group sub title 的 part 属性
   */
  @Prop() subTitleClass: string;

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  private renderTitle() {
    const { title, subTitle } = this;
    if (title) {
      return (
        <div class={`${namespace.join('cell-group', 'title-wrap')} ${this.titleWrapClass}`} part={this.titleWrapClass}>
          <text class={`${namespace.join('cell-group', 'title')} ${this.titleClass}`} part={this.titleClass}>
            {title}
          </text>
          {subTitle ? (
            <text
              class={`${namespace.join('cell-group', 'sub-title')} ${this.subTitleClass}`}
              part={this.subTitleClass}
            >
              {subTitle}
            </text>
          ) : null}
        </div>
      );
    }

    return <slot name="title" />;
  }

  render() {
    const { mode } = this;
    return (
      <div
        part={this.extClass}
        class={`${namespace.join('cell-group')} ${this.extClass}`}
        style={stringToAttrStyle(this.extStyle)}
      >
        {this.renderTitle()}
        <div class={namespace.handle('cell-group', ['body', mode === 'default' ? '' : mode])}>
          <slot />
        </div>
      </div>
    );
  }
}
