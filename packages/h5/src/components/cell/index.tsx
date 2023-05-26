import { Component, Element, h, Prop } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { isString, stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

@Component({
  tag: 'ti-cell',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCell implements BasicComponentAbstract {
  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() titleWidth?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  /**
   * 标题
   *
   * @type string
   * @default ''
   * @example
   * <TiCell title="标题" />
   * @since 0.1.0
   * */
  @Prop() title: string | any;

  /**
   * 副标题，右侧描述信息
   *
   * @type string
   * @default ''
   * @example
   * <TiCell title="标题" desc="副标题" />
   * @since 0.1.0
   * */
  @Prop() desc?: string;

  /**
   * 标题下面的内容
   *
   * @type string
   * @default ''
   * @example
   * <TiCell title="标题" label="标题下面的内容" />
   * @since 0.1.0
   * */
  @Prop() label?: string;

  /**
   * 副标题下面的内容
   *
   * @type string
   * @default ''
   * @example
   * <TiCell subDesc="副标题下面的内容" />
   * @since 0.1.0
   * */
  @Prop() subDesc?: string;

  /**
   * 图标
   *
   * @type string
   * @default ''
   * @example
   * <TiCell title="标题" icon="home" />
   * @since 0.1.0
   * */
  @Prop() icon?: string;

  /**
   * 右侧图标的尺寸
   *
   * @type number
   * @default 36
   * @example
   * <TiCell iconSize={36} />
   * @since 0.1.0
   */
  @Prop() iconSize?: string | number = 36;

  /**
   * 右侧图标
   *
   * @type string
   * @default ''
   * @example
   * <TiCell title="标题" rightIcon="checked" />
   * @since 0.1.0
   * */
  @Prop() rightIcon?: string;

  /**
   * 右侧图标的尺寸
   *
   * @type number
   * @default 28
   * @example
   * <TiCell right-icon-size="{{ 28 }}" />
   * @since 0.1.0
   */
  @Prop() rightIconSize?: string | number = 28;

  /**
   * 图标颜色
   *
   * @type string
   * @default ''
   * @example
   * <TiCell color="red" />
   * @since 0.1.0
   *
   */
  @Prop() color?: string;

  /**
   * 是否显示右侧箭头
   *
   * @type boolean
   * @default true
   * @example
   * <TiCell arrow="{{false}}" />
   * @since 0.1.0
   * */
  @Prop() arrow?: boolean = false;

  /**
   * 是否禁用单元格
   *
   * @type boolean
   * @default false
   * @example
   * <TiCell title="标题" disabled />
   * @since 0.1.0
   * */
  @Prop() disabled?: boolean = false;

  /**
   * 是否必须选择
   *
   * @type boolean
   * @default false
   * @example
   * <TiCell required />
   * @since 0.1.0
   * */
  @Prop() required?: boolean = false;

  /**
   * 是否显示分割线
   *
   * @type boolean
   * @default true
   * @example
   * <TiCell divider={false} title="没有分割线" />
   * @since 0.1.0
   */
  @Prop() divider?: boolean = true;

  /**
   * 是否开启点击反馈
   *
   * @type boolean
   * @default true
   * @example
   * <TiCell clickable />
   * @since 0.1.0
   * */
  @Prop() clickable?: boolean = false;

  /**
   * 内容块的横向排列方式
   *
   * @type string
   * @default center
   * @example
   * <TiCell alignItems="center" />
   * @since 0.1.0
   * */
  @Prop() alignItems: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch' | 'start' | 'end';

  @Prop() titleClass?: string;

  @Prop() titleWrapClass?: string;

  @Prop() labelClass?: string;

  @Prop() descClass?: string;

  @Prop({ reflect: true }) useSubArrow?: boolean = false;

  /**
   * 点击单元格回调的方法
   *
   * @param event TouchEvent
   * @return
   *
   * @example
   * <TiCell onClick="onClick" />
   * @since 0.1.0
   * */
  // @Event({ bubbles: true, composed: true }) click: EventEmitter<Record<string, any>>;

  @Element() protected host: HTMLDivElement;

  completedStyles(extStyle = {}) {
    return { ...stringToAttrStyle(extStyle), alignItems: this.alignItems };
  }

  private getClassName(): string {
    const { disabled, divider, extClass, clickable } = this;
    const classList = [join('cell', { disabled, divider, clickable }), extClass];

    return classList.filter(Boolean).join(' ');
  }

  private completedArrow(): string {
    if (isString(this.rightIcon) && this.rightIcon) {
      return this.rightIcon;
    }
    return 'arrow-right';
  }

  private completedRightIcon() {
    const { desc, rightIcon, rightIconSize, arrow } = this;
    if (!desc) {
      return { 'display': 'flex', 'justify-content': 'flex-end' };
    }
    if (rightIcon || arrow) {
      return { paddingRight: addUnit(+rightIconSize + 4) };
    }
    return { 'display': 'flex', 'justify-content': 'flex-end' };
  }

  renderLeftIcon() {
    return (
      <div class={handle('cell', 'icon-box')}>
        {this.icon ? (
          <ti-icon name={this.icon} size={this.iconSize || 36} color={this.color} class={handle('cell', 'icon')} />
        ) : (
          <slot name="icon" />
        )}
      </div>
    );
  }

  renderArrowIcon() {
    if (this.useSubArrow) {
      return null;
    }
    if (this.rightIcon || this.arrow) {
      return (
        <ti-icon
          color={this.color}
          size={this.rightIconSize}
          name={this.completedArrow()}
          ext-class={handle('cell', 'right-icon')}
        />
      );
    }
    return <slot name="right-icon" />;
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    return (
      <div
        aria-hidden="true"
        part={this.extClass}
        class={this.getClassName()}
        style={this.completedStyles(this.extStyle)}
      >
        <div
          part={this.titleWrapClass}
          class={`${handle('cell', 'title-wrap')} ${this.titleWrapClass || ''}`}
          aria-hidden="true"
          style={this.completedStyles()}
        >
          {this.renderLeftIcon()}
          <div>
            <div style={{ ...this.completedStyles(), display: 'flex' }}>
              {this.title ? (
                <div
                  part={this.titleClass}
                  class={`${handle('cell', 'title')} ${this.titleClass}`}
                  style={this.titleWidth ? { width: this.titleWidth } : {}}
                >
                  {this.title ?? null}
                </div>
              ) : (
                <slot name="title" />
              )}
              {this.required ? (
                <div class={handle('cell', 'required-box')}>
                  <ti-icon name="required" size={24} ext-class={handle('cell', 'required')} />
                </div>
              ) : null}
            </div>

            {this.label ? (
              <div part={this.labelClass} class={`${handle('cell', 'label')} ${this.labelClass}`}>
                {this.label ?? null}
              </div>
            ) : (
              <slot name="label" />
            )}
          </div>
        </div>
        <div class={handle('cell', 'desc-wrap')} style={{ alignItems: this.alignItems }}>
          <div class={handle('cell', 'desc-content')} aria-hidden="true">
            {this.desc ? (
              <div part={this.descClass} class={`${handle('cell', 'desc')} ${this.descClass}`}>
                {this.desc ?? null}
              </div>
            ) : (
              <slot name="desc" />
            )}
            {this.renderArrowIcon()}
          </div>
          {this.subDesc ? (
            <div style={this.completedRightIcon()} class={handle('cell', 'sub-desc')}>
              {this.subDesc ?? null}
            </div>
          ) : (
            <slot name="sub-desc" />
          )}
        </div>
      </div>
    );
  }
}
