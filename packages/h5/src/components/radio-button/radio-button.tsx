import { Component, Host, h, Prop, Method, EventEmitter, Element, State, Event, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Components } from '../../components';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
import * as namespace from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';

type ParentAttrs = Components.TiRadioGroup & {
  privateDefaultValue?: string | number;
  change?: EventEmitter<string | number>;
};

@Component({
  tag: 'ti-radio-button',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiRadioButton implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extClass = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() label?: string;

  @Prop() value?: string | number = null;

  @Prop() disabled?: boolean | null = null;

  @Prop() checked?: boolean = null;

  @Prop() defaultChecked?: boolean = null;

  @Prop() color?: string;

  @Prop() icon = '';

  @State() privateChecked = false;

  @Event({ bubbles: true, composed: false }) change: EventEmitter<boolean>;

  @State() toggleClass = '';

  @Method()
  async updateDataFromParent(parent: ParentAttrs) {
    if (parent) {
      const parentInstance = await parent?.getInstance();
      const { disabled, value: parentValue, privateDefaultValue, icon, color } = parentInstance || parent;
      const { value } = this;

      let privateChecked = false;
      let checked = null;
      let defaultChecked = null;

      if (parentValue !== null) {
        checked = parentValue === value;
      }

      if (privateDefaultValue !== null) {
        defaultChecked = privateDefaultValue === value;
      }

      if (defaultChecked !== null) {
        privateChecked = defaultChecked;
      }

      if (checked !== null) {
        privateChecked = checked;
      }

      this.checked = checked;
      this.icon = icon ?? this.icon;
      this.color = color ?? this.color;
      this.defaultChecked = defaultChecked;
      this.privateChecked = privateChecked;
      this.disabled = disabled ?? this.disabled;
    }
  }

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-radio-group',
      relations: 'ancestor',
    })?.[0];
  }

  @Watch('checked')
  watchChecked(value: boolean, oldValue: boolean) {
    if (value !== oldValue && !this.parent) {
      if (value !== undefined && this.privateChecked !== value) {
        this.privateChecked = value;
      }
    }
  }

  componentWillLoad(): void | Promise<void> {
    let checked = false;
    if (this.defaultChecked !== null) {
      checked = this.defaultChecked;
    }

    if (this.checked !== null) {
      checked = this.checked;
    }
    this.privateChecked = checked;

    addShadowRootStyle.call(this);

    this.updateDataFromParent(this.parent);
  }

  private handleChange() {
    const { privateChecked, checked, value, parent: parentEl } = this;
    if (parentEl) {
      parentEl.getInstance().then((parent: ParentAttrs) => {
        parent.change.emit(value);
        parent.privateDefaultValue = value;
      });
      return;
    }
    const nextChecked = !privateChecked;
    this.change.emit(nextChecked);
    if (checked === null) {
      this.privateChecked = nextChecked;
    }
  }

  private handleTagClick() {
    const { disabled } = this;
    if (disabled) return;
    this.handleChange();
  }

  private getClassNames() {
    const { disabled, privateChecked, extClass } = this;
    const classList = [namespace.join('radio-button', [{ disabled, checked: privateChecked }]), extClass];

    return classList.join(' ');
  }

  private formatColor(colorStr, opacity = 1) {
    if (!colorStr) return '';
    let rgba = '';
    if (colorStr.includes('#')) {
      rgba = hexToRGB(colorStr, opacity);
    }
    if (colorStr.includes('rgba')) {
      const reg = /^rgba?\((.+)\)$/g;
      const a = colorStr.replace(reg, (_s, $1) => $1);
      const [r, g, b] = a.split(',');
      rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (colorStr.includes('rgb')) {
      rgba = RGBToRGBA(colorStr, opacity);
    }

    return rgba;
  }

  render() {
    const { label, icon, color } = this;
    const styles: Record<string, string> = color
      ? {
          '--radio-button-disabled-border-color': this.formatColor(this.color, 0.2),
          '--radio-button-disabled-text-color': this.formatColor(this.color, 0.4),
          '--radio-button-checked-bg-color': this.formatColor(this.color, 0.1),
          '--radio-button-checked-text-color': this.formatColor(this.color, 1),
          '--radio-button-checked-border-color': this.formatColor(this.color, 0.4),
        }
      : {};
    return (
      <Host>
        <div
          part={this.extClass}
          class={this.getClassNames()}
          style={{ ...styles, ...stringToAttrStyle(this.extStyle) }}
        >
          <ti-tag onClick={this.handleTagClick.bind(this)} rightIcon={icon}>
            <slot name="prefix" slot="prefix" />
            {label || <slot />}
            <slot name="suffix" slot="suffix" />
          </ti-tag>
        </div>
      </Host>
    );
  }
}
