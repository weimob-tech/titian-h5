import { Component, Host, h, Method, EventEmitter, Prop, State, Event, Watch, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Components } from '../../components';
import { addShadowRootStyle, parseStringToObject, stringToAttrStyle } from '../common/utils';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
import * as namespace from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';

type ParentAttrs = Components.TiCheckboxGroup & {
  privateDefaultValue?: Array<string | number>;
  handleMax?: EventEmitter<never>;
  change?: EventEmitter<Array<string | number>>;
};

@Component({
  tag: 'ti-checkbox-button',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCheckboxButton {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass?: string;

  /**
   * 根据 value 进行比较，判断是否选中
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckboxButton value="1" />
   * @since 0.1.0
   */
  @Prop() value: number | string = null;

  /**
   * 文字内容
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckboxButton label="文字" />
   * @since 0.1.0
   */
  @Prop() label: string;

  /**
   * 指定当前是否禁用
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckboxButton disabled />
   * @since 0.1.0
   */
  @Prop() disabled: boolean | null = null;

  /**
   * 指定当前是否选中, 此模式下为控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckboxButton checked />
   * @since 0.1.0
   */
  @Prop() checked: boolean | null = null;

  /**
   * 初始是否选中, 此模式下为非控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckboxButton defaultChecked />
   * @since 0.1.0
   */
  @Prop() defaultChecked: boolean | null = null;

  /**
   * 单选框颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckboxButton color="red" />
   * @since 0.1.0
   */
  @Prop() color: string;

  /**
   * 自定义图标名称
   *
   * @type string
   * @default 'checkbox-hollow'
   * @example
   * <TiCheckboxButton icon="checkbox" />
   * @since 0.1.0
   */
  @Prop() icon = '';

  @Prop() leftIcon = '';

  @State() privateChecked = false;

  @Event({ bubbles: true, composed: false }) change: EventEmitter<boolean>;

  @Method()
  async updateDataFromParent(parent: ParentAttrs) {
    if (parent) {
      const { disabled, value: parentValue, privateDefaultValue, icon, color } = parent;
      const { value } = this;
      let privateChecked = false;
      let checked = null;
      let defaultChecked = null;
      if (parentValue !== null && parentValue !== undefined) {
        checked = parseStringToObject(parentValue)?.includes(value);
      }
      if (privateDefaultValue !== null && privateDefaultValue !== undefined) {
        defaultChecked = parseStringToObject(privateDefaultValue)?.includes(value);
      }
      if (defaultChecked !== null) {
        privateChecked = defaultChecked;
      }
      if (checked !== null) {
        privateChecked = checked;
      }

      this.disabled = disabled ?? this.disabled;
      this.checked = checked;
      this.defaultChecked = defaultChecked;
      this.privateChecked = privateChecked;
      this.color = color ?? this.color;
      this.icon = icon ?? this.icon;
    }
  }

  @Watch('checked')
  updateChecked(value: boolean | null, oldValue: boolean | null) {
    if (value !== oldValue) {
      this.privateChecked = value;
    }
  }

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-checkbox-group',
      relations: 'ancestor',
    })[0];
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
        const { max } = parent;
        let defaultValue = parent.privateDefaultValue;
        const pValue = parseStringToObject(parent.value);

        defaultValue = defaultValue || pValue || [];

        const newValue = privateChecked ? defaultValue?.filter(item => item !== this.value) : [...defaultValue, value];
        if (newValue.length > max && checked === null) {
          parent.handleMax.emit();
          return;
        }
        parent.change.emit(Array.from(new Set(newValue)));
        if (pValue === null) {
          parent.privateDefaultValue = newValue;
        }
      });
    } else {
      const nextChecked = !privateChecked;
      this.change.emit(nextChecked);
      if (checked === null) {
        this.privateChecked = nextChecked;
      }
    }
  }

  private getClassNames() {
    const { disabled, privateChecked, extClass } = this;
    const classList = [namespace.join('checkbox-button', [{ disabled, checked: privateChecked }]), extClass];
    return classList.join(' ');
  }

  private handleTagClick() {
    const { disabled } = this;
    if (disabled) return;

    this.handleChange();
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
    const { label, icon, color, leftIcon } = this;

    const styles: Record<string, string> = color
      ? {
          '--checkbox-button-disabled-border-color': this.formatColor(this.color, 0.2),
          '--checkbox-button-disabled-text-color': this.formatColor(this.color, 0.4),
          '--checkbox-button-checked-bg-color': this.formatColor(this.color, 0.1),
          '--checkbox-button-checked-text-color': this.formatColor(this.color, 1),
          '--checkbox-button-checked-border-color': this.formatColor(this.color, 0.4),
        }
      : {};
    return (
      <Host>
        <div
          part={this.extClass}
          class={this.getClassNames()}
          aria-hidden="true"
          style={{ ...styles, ...stringToAttrStyle(this.extStyle) }}
          onClick={this.handleTagClick.bind(this)}
        >
          <ti-tag leftIcon={leftIcon} rightIcon={icon}>
            <slot name="prefix" slot="prefix" />
            {label || <slot />}
            <slot name="suffix" slot="suffix" />
          </ti-tag>{' '}
        </div>
      </Host>
    );
  }
}
