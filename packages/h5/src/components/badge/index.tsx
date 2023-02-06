/* eslint-disable no-nested-ternary */
import { Component, h, Prop, State, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { join } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

const EBadgeSpread = {
  // 两侧
  BOTH: 'bothSides',

  // 向右
  RIGHT: 'toRight',
};

type ValueOf<T> = T[keyof T];

@Component({
  tag: 'ti-badge',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiBadge implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  // 不展示数字，只有一个小红点
  @Prop() dot = false;

  // 展示的内容
  @Prop() content: string | number;

  // 内容的撑开方向
  @Prop() spread: ValueOf<typeof EBadgeSpread> = EBadgeSpread.BOTH;

  // 内容部分为图标时的图标名称
  @Prop() icon?: string;

  // 设置状态点的位置偏移,[number, number],默认单位rpx
  @Prop() offset = [];

  // 取消定位相关样式，用作普通展示
  @Prop() static = false;

  // 用在文字内容的右上角展示
  @Prop() atText: boolean;

  @Prop() useSlot = false;

  @State() relative = false;

  private badgeRef?: HTMLDivElement;

  componentDidRender() {
    const rect = this.badgeRef?.getBoundingClientRect();
    this.relative = !!rect?.width || !!rect?.height || this.useSlot;
  }

  private computedStyle() {
    const { offset, extStyle } = this;
    let style = {};
    if (offset?.length === 2) {
      style = {
        '--badge-top': addUnit(offset[0]),
        '--badge-right': addUnit(offset[1]),
      };
    }

    return { ...style, ...stringToAttrStyle(extStyle) };
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { relative, spread, offset, dot, atText, icon, content } = this;
    const visible = (content !== '' && content !== undefined) || dot || !!icon;
    let circle = false;

    if (content) {
      circle = content.toString().length === 1;
    }

    if (icon) {
      circle = true;
    }

    return (
      <div class={join('badge', [{ relative }])} ref={e => (this.badgeRef = e)} aria-hidden="true">
        <div
          part={this.extClass}
          style={this.computedStyle()}
          class={`${join('badge-container', [
            {
              left: spread === 'toRight',
              hidden: !visible,
              circle,
              offset: offset?.length,
              static: this.static,
              dot,
              atText,
            },
          ])} ${this.extClass}`}
        >
          {content && !dot ? content : icon ? <ti-icon name={icon} size={20} /> : null}
        </div>
        <slot />
      </div>
    );
  }
}
