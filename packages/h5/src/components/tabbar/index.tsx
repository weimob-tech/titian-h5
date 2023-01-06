/* eslint-disable class-methods-use-this */
import { Component, Element, Event, EventEmitter, Fragment, State, Prop, Method, h, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Components } from '../../components';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';

enum SeparationEnum {
  BORDER = 'border',
  SHADOW = 'shadow',
  EMPTY = '',
}
function isBorder(status: `${SeparationEnum}`) {
  return status === SeparationEnum.BORDER;
}
function isShadow(status: `${SeparationEnum}`) {
  return status === SeparationEnum.SHADOW;
}

const defaultProps = {
  separation: SeparationEnum.EMPTY,
  safeArea: true,
};
@Component({
  tag: 'ti-tabbar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },

  shadow: true,
})
export class TiTabbar {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() value: unknown;

  @Prop() placeholder = true;

  @Prop() separation: `${SeparationEnum}` = defaultProps.separation;

  @Prop() options?: Omit<Components.TiTabbarItem, 'updateDataFromParent'>[] = [];

  @Prop() safeArea?: boolean = defaultProps.safeArea;

  @Prop() activeColor?: string;

  @Prop() color?: string;

  @Prop() iconSize?: number;

  @Prop() titleSize?: number;

  @Prop() extOptionStyle?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extOptionClass?: string = '';

  @Prop() extClass?: string = '';

  @State() innerOptions: Omit<Components.TiTabbarItem, 'updateDataFromParent'>[] = [];

  selectValue: unknown;

  @State() height = 0;

  @Event({ bubbles: false, eventName: 'select', composed: false }) selectEvent!: EventEmitter<unknown>;

  get children() {
    return getChildren({
      host: this.host,
      useSlot: (this.options || []).length === 0,
      tag: 'ti-tabbar-item',
      relations: 'descendant', // 'parent' ,'ancestor',
    });
  }

  @Method()
  async getImperativeHandle() {
    const { selectValue } = this;
    const { children } = this;
    return { children, selectValue };
  }

  @Watch('placeholder')
  heightObserver() {
    const box = this.host.shadowRoot?.querySelector(`.${join('tab-bar')}`);
    if (!box) {
      return;
    }
    const { height } = box.getBoundingClientRect();
    this.height = height;
    this.selectValue = this.selectValue || this.value;
    this.updateChildren();
  }

  componentDidLoad() {
    this.heightObserver();
  }

  @Watch('value')
  observer(next: unknown) {
    this.selectValue = next;
  }

  @Method()
  async switch(active: unknown) {
    this.selectValue = active;
    this.selectEvent.emit(active);
    this.updateChildren();
  }

  updateChildren() {
    this.children.forEach(child => {
      child.updateDataFromParent.apply(child);
    });
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const {
      safeArea = defaultProps.safeArea,
      separation = defaultProps.separation,
      extClass = '',
      extStyle,
      extOptionStyle,
      extOptionClass = '',
      height,
      placeholder,
      options = [],
    } = this;
    return (
      <>
        <div
          class={`${join('tab-bar')} 
          ${handle('tab-bar', [isBorder(separation) ? 'border' : ''])} ${extClass}`}
          part={extClass}
          style={stringToAttrStyle(extStyle)}
        >
          <div class={handle('tab-bar', ['box'])}>
            {isShadow(separation) && <div class={handle('tab-bar', ['shadow'])} />}
            {options.map(item => (
              <ti-tabbar-item
                title={item.title}
                key={`${item.title}-${item.icon}`}
                icon={item.icon}
                value={item.value || undefined}
                active-color={item.activeColor || '#FF2E2E'}
                color={item.color || '#757575'}
                icon-size={item.iconSize || 54}
                title-size={item.titleSize || 20}
                class={handle('tab-bar', ['item'])}
                ext-class={extOptionClass}
                ext-css={this.extCss}
                exportparts={extOptionClass}
                ext-style={extOptionStyle}
              />
            ))}
            <slot />
          </div>
          {safeArea && <ti-safe-area position="bottom" />}
        </div>
        {placeholder && <div style={{ height: `${height}px` }} />}
      </>
    );
  }
}
