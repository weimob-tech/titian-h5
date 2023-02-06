/* eslint-disable no-nested-ternary */
import { Component, Element, h, Method, Prop, State, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';

import { stringToAttrStyle, addShadowRootStyle, isString, isBoolean, getBoundingClientRect } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getParent } from '../common/utils/relation';

enum CollapseItemStateEnum {
  /** 折叠 */
  'FOLD' = 'fold',

  /** 展开 */
  'UN_FOLD' = 'un_fold',
}
function completedStatus(status: `${CollapseItemStateEnum}`) {
  return status === CollapseItemStateEnum.UN_FOLD;
}

@Component({
  tag: 'ti-collapse-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCollapseItem {
  @Prop() extCss?: string = '';

  @Prop() extClass?: string = '';

  @Prop() extContentClass?: string = '';

  @Prop() value?: string | number;

  @Prop() title = '';

  @Prop() label?: string;

  @Prop() desc?: string;

  @Prop() icon?: string;

  @Prop() rightIcon?: string;

  @Prop() disabled?: boolean;

  @Prop() useRightIconSlot?: boolean;

  @Prop() divider?: boolean;

  @Prop() clickable?: boolean = true;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @State() status: `${CollapseItemStateEnum}` = CollapseItemStateEnum.FOLD;

  @State() isReady = false;

  @State() height = '0';

  @Element() private host!: HTMLTiCollapseItemElement;

  @State() innerIcon: string;

  @State() innerRightIcon: string;

  @State() innerDisabled: boolean;

  @State() innerClickable: boolean;

  @State() innerDivider: boolean;

  @Watch('icon')
  observerIcon(value) {
    this.innerIcon = value;
  }

  @Watch('rightIcon')
  observerRightIcon(value) {
    this.innerRightIcon = value;
  }

  @Watch('disabled')
  observerDisabled(value) {
    this.innerDisabled = value;
  }

  @Watch('clickable')
  observerClickable(value) {
    this.innerClickable = value;
  }

  @Watch('divider')
  observerDivider(value) {
    this.innerDivider = value;
  }

  private getClassName(): string {
    const { status, extClass } = this;
    const classList = [join('collapse-item', { dilation: completedStatus(status) }), extClass];
    return classList.filter(Boolean).join(' ');
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    const { icon, rightIcon, disabled, clickable, divider } = this;
    if (isString(icon)) {
      this.innerIcon = icon;
    }
    if (isString(rightIcon)) {
      this.innerRightIcon = rightIcon;
    }
    if (isBoolean(disabled)) {
      this.innerDisabled = disabled;
    }
    if (isBoolean(clickable)) {
      this.innerClickable = clickable;
    }
    if (isBoolean(divider)) {
      this.innerDivider = divider;
    }
  }

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-collapse',
      relations: 'ancestor',
    })[0];
  }

  // getValue(parent,current,key){
  //   if(parent[key] === )
  // }
  @Method()
  async updateDataFromParent() {
    const { parent } = this;
    if (!parent) {
      return;
    }

    const { children, selectValue } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    const status = this.getStatus(children, selectValue);
    const innerIcon = isString(this.icon) ? this.icon : isString(parent.icon) ? parent.icon : this.innerIcon;
    const innerRightIcon = isString(this.rightIcon)
      ? this.rightIcon
      : isString(parent.rightIcon)
      ? parent.rightIcon
      : this.innerRightIcon;
    const innerDisabled = isBoolean(this.disabled)
      ? this.disabled
      : isBoolean(parent.disabled)
      ? parent.disabled
      : this.innerDisabled;
    const innerClickable = isBoolean(this.clickable)
      ? this.clickable
      : isBoolean(parent.clickable)
      ? parent.clickable
      : this.innerClickable;
    const innerDivider = isBoolean(this.divider)
      ? this.divider
      : isBoolean(parent.divider)
      ? parent.divider
      : this.innerDivider;

    const state = { innerIcon, innerRightIcon, innerDisabled, innerClickable, innerDivider };

    if (status !== this.status) {
      const box = this.host.shadowRoot?.querySelector('.titian-collapse-item-box');
      const height = `${getBoundingClientRect(box).height}px`;
      const update = { ...state, height, index, status, isReady: true };
      Object.assign(this, update);
      if (status === CollapseItemStateEnum.FOLD) {
        raf(() => {
          this.height = '0';
        });
      }
    } else {
      const update = { ...state, index, status, isReady: true };
      Object.assign(this, update);
    }
  }

  getStatus(children: HTMLTiCollapseItemElement[], selectValue: (string | number) | (string | number)[]) {
    const { value, parent } = this; // 当前名称
    if (!parent) {
      return CollapseItemStateEnum.FOLD;
    }
    const { repel } = parent;
    const index = children.indexOf(this.host);
    const currentName = value == null ? index : value; // 若有名称使用名称，没有名称，使用索引
    if (repel) {
      return selectValue === currentName ? CollapseItemStateEnum.UN_FOLD : CollapseItemStateEnum.FOLD;
    }
    return ((selectValue as (string | number)[]) || []).some(val => val === currentName)
      ? CollapseItemStateEnum.UN_FOLD
      : CollapseItemStateEnum.FOLD;
  }

  onClick = async () => {
    const { value, status, disabled, parent } = this;
    if (disabled || !parent) {
      return;
    }
    const { children } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    const currentName: string | number = value == null ? index : value;
    parent.switch(currentName, status === CollapseItemStateEnum.FOLD);
  };

  onTransitionend = () => {
    const { height } = this;
    if (height !== '0' && height !== 'auto') {
      this.height = 'auto';
    }
  };

  render() {
    const {
      innerIcon,
      innerRightIcon,
      innerDisabled,
      innerClickable,
      innerDivider,
      label,
      desc,
      isReady,
      height,
      status,
      title,
      extStyle,
      extClass,
      extContentClass,
      useRightIconSlot,
    } = this;
    return (
      <div class={this.getClassName()} style={stringToAttrStyle(extStyle)} part={extClass}>
        <ti-cell
          title={title}
          label={label}
          desc={desc}
          icon={innerIcon}
          arrow={false}
          clickable={innerClickable}
          disabled={innerDisabled}
          onClick={this.onClick}
          divider={innerDivider}
          class={handle('collapse-item', ['cell'])}
        >
          <slot name="title" slot="title" />
          <slot name="icon" slot="icon" />
          <slot name="desc" slot="desc" />
          <slot name="label" slot="label" />

          {useRightIconSlot ? (
            <slot slot="right-icon" name="right-icon" />
          ) : (
            <ti-icon
              slot="right-icon"
              name={innerRightIcon || 'arrow-up'}
              rotate={!completedStatus(status) ? '180deg' : ''}
              ext-class={handle('collapse-item', ['icon', isReady ? 'icon-transition' : ''])}
            />
          )}
          <slot name="sub-desc" slot="sub-desc" />
        </ti-cell>
        <div
          class={handle('collapse-item', ['wrap', isReady ? 'wrap-transition' : ''])}
          onTransitionEnd={this.onTransitionend}
          style={{
            height: `${height}`,
          }}
        >
          <div class={`${handle('collapse-item', ['box'])} ${extContentClass}`} part={extContentClass}>
            <slot />
          </div>
        </div>
      </div>
    );
  }
}
