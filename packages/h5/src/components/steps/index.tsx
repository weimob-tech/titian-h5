import { Component, h, Prop, Element, Method, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle, isPlainArray } from '../common/utils';
import { join } from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';

export interface TiStepOption {
  title?: string;
  subtitle?: string;
  description?: string;
  time?: string;
  icon?: string;
  checked?: boolean;
  style?: string | Record<string, string>;
  [propName: string]: any;
}

@Component({
  tag: 'ti-steps',
  shadow: true,
})
export class TiSteps implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass?: string;

  @Prop() options: TiStepOption[] = [];

  @Prop() current: number | number[] = 0;

  @Prop() activeColor: string;

  @Prop() icon: string;

  @Prop() subtitleAlign: 'left' | 'right';

  @Prop() alias?: Record<string, string> = {};

  get children() {
    return getChildren({
      host: this.host,
      useSlot: this.options.length === 0,
      tag: 'ti-step-item',
      relations: 'descendant', // 'parent' ,'ancestor',
    });
  }

  @Watch('current')
  updateChildren(value, oldValue) {
    if (this.isCurrentSame(value, oldValue)) return;
    this.children.forEach(child => {
      child.updateDataFromParent();
    });
  }

  private isCurrentSame(a: number | number[], b: number | number[]) {
    if (isPlainArray(a) && isPlainArray(b)) {
      return a.length === b.length && a.sort().toString() === b.sort().toString();
    }
    return a === b;
  }

  @Method()
  async getImperativeHandle() {
    const { children } = this;
    return { children };
  }

  private computedStyle() {
    const { activeColor, extStyle } = this;
    const style = { ...stringToAttrStyle(extStyle) };

    if (activeColor) {
      style['--steps-icon-active-color'] = activeColor;
      style['--steps-dot-active-color'] = activeColor;
      style['--steps-title-active-color'] = activeColor;
      style['--steps-subtitle-active-color'] = activeColor;
    }

    return style;
  }

  private checkCurrent(current, index) {
    if (Array.isArray(current)) {
      return current.indexOf(index) > -1;
    }
    return current === index;
  }

  private renderItem(item: TiStepOption, index: number) {
    const { current, icon, subtitleAlign, options, checkCurrent, alias } = this;
    return (
      <ti-step-item
        title={item[alias.title || 'title']}
        subtitle={item[alias.subtitle || 'subtitle']}
        description={item[alias.description || 'description']}
        time={item[alias.time || 'time']}
        checked={item[alias.checked || 'checked'] ?? checkCurrent(current, index)}
        icon={item[alias.icon || 'icon'] || icon}
        extStyle={item[alias.style || 'style']}
        hasLine={index !== options.length - 1}
        subtitleAlign={item[alias.subtitleAlign || 'subtitleAlign'] || subtitleAlign}
      />
    );
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    return (
      <div part={this.extClass} class={`${join('steps')} ${this.extClass}`} style={this.computedStyle()}>
        {this.options.length > 0 ? this.options.map((item, index) => this.renderItem(item, index)) : <slot />}
      </div>
    );
  }
}
