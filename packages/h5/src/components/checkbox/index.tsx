import {
  Component,
  h,
  Prop,
  State,
  Method,
  Element,
  Watch,
  Event,
  EventEmitter,
  forceUpdate,
  Host,
} from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Components } from '../../components';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { isString, addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';
import addUnit from '../common/utils/suffix';

type ParentAttrs = Components.TiCheckboxGroup & {
  privateDefaultValue?: Array<string | number>;
  handleMax?: EventEmitter<never>;
  change?: EventEmitter<Array<string | number>>;
};

@Component({
  tag: 'ti-checkbox',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCheckbox implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass?: string;

  @Prop() iconClass?: string;

  /**
   * 根据 value 进行比较，判断是否选中
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckbox value="1" />
   * @since 0.1.0
   */
  @Prop() value: number | string = null;

  /**
   * 文字内容
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckbox cancelable />
   * @since 0.1.0
   */
  @Prop() label: string;

  /**
   * 自定义图标名称
   *
   * @type string
   * @default 'checkbox-hollow'
   * @example
   * <TiCheckbox icon="checkbox" />
   * @since 0.1.0
   */
  @Prop() icon: string | boolean = 'checkbox-hollow';

  /**
   * 指定当前是否禁用
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckbox disabled />
   * @since 0.1.0
   */
  @Prop() disabled: boolean | null = null;

  /**
   * 指定当前是否选中, 此模式下为控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckbox checked />
   * @since 0.1.0
   */
  @Prop() checked: boolean | null = null;

  /**
   * 初始是否选中, 此模式下为非控制型组件
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckbox defaultChecked />
   * @since 0.1.0
   */
  @Prop() defaultChecked: boolean | null = null;

  /**
   * 指定当前文字是否禁用点击
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckbox labelDisabled />
   * @since 0.1.0
   */
  @Prop() labelDisabled: boolean | null = null;

  /**
   * 单选框圆角度数
   *
   * @type string
   * @default circle
   * @enum circle, square
   * @example
   * <TiCheckbox shape="square" />
   * @since 0.1.0
   */
  @Prop() shape: 'square' | 'circle' | 'none' | number = 'circle';

  /**
   * 单选框颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckbox color="red" />
   * @since 0.1.0
   */
  @Prop() color: string;

  /**
   * 自定义图标尺寸
   *
   * @type number
   * @default 32
   * @example
   * <TiCheckbox icon="checkbox" size={32} />
   * @since 0.1.0
   */
  @Prop() size = 32;

  @State() privateChecked = false;

  @State() direction: 'horizontal' | 'vertical' = 'horizontal';

  @State() toggleClass = '';

  @Event({ bubbles: true, composed: false }) change: EventEmitter<boolean>;

  @Method()
  async updateDataFromParent(parent: ParentAttrs) {
    if (parent) {
      const {
        disabled,
        value: parentValue,
        privateDefaultValue,
        shape,
        icon,
        labelDisabled,
        direction,
        size,
        color,
      } = parent;
      const { value } = this;
      let privateChecked = false;
      let checked = null;
      let defaultChecked = null;
      if (parentValue !== null && parentValue !== undefined) {
        checked = parentValue.includes(value);
      }
      if (privateDefaultValue !== null && privateDefaultValue !== undefined) {
        defaultChecked = privateDefaultValue.includes(value);
      }
      if (defaultChecked !== null) {
        privateChecked = defaultChecked;
      }
      if (checked !== null) {
        privateChecked = checked;
      }
      this.handleToggleClass(privateChecked);

      this.labelDisabled = labelDisabled ?? this.labelDisabled;
      this.disabled = disabled ?? this.disabled;
      this.checked = checked;
      this.defaultChecked = defaultChecked;
      this.privateChecked = privateChecked;
      this.color = color ?? this.color;
      this.shape = shape ?? this.shape;
      this.icon = icon ?? this.icon;
      this.size = size ?? this.size;
      this.direction = direction ?? this.direction;
    }
  }

  @Watch('checked')
  updateChecked(value: boolean | null, oldValue: boolean | null) {
    if (value !== oldValue) {
      this.privateChecked = value;
      this.handleToggleClass(value);
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
    this.handleToggleClass(checked);
    this.privateChecked = checked;

    addShadowRootStyle.call(this);
    this.updateDataFromParent(this.parent);
  }

  private handleToggleClass(checked: boolean) {
    this.toggleClass = checked ? 'zoom-in' : 'zoom-out';
  }

  private getClassName() {
    const { disabled, privateChecked, direction, extClass } = this;
    const classList = [namespace.join('checkbox', [{ disabled, checked: privateChecked }, direction]), extClass];
    return classList.join(' ');
  }

  private handleChange() {
    const { privateChecked, checked, value, parent: parentEl } = this;
    if (parentEl) {
      parentEl.getInstance().then((parent: ParentAttrs) => {
        const { max } = parent;
        let defaultValue = parent.privateDefaultValue;
        const pValue = parent.value;

        defaultValue = defaultValue || pValue || [];

        const newValue = privateChecked ? defaultValue.filter(item => item !== this.value) : [...defaultValue, value];
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
        this.handleToggleClass(nextChecked);
      }
    }
  }

  private iconClick() {
    const { disabled } = this;
    if (disabled) {
      return;
    }
    this.handleChange();
  }

  private labelClick() {
    const { disabled, labelDisabled } = this;
    if (disabled || labelDisabled) {
      return;
    }
    this.handleChange();
  }

  private completedStyles() {
    const { shape, color, extStyle } = this;
    const styles = { ...stringToAttrStyle(extStyle) };
    if (color) {
      styles['--checkbox-icon-color'] = color;
    }

    if (shape === 'circle') {
      styles['--base-radius-size'] = '999px';
    } else if (shape === 'square') {
      styles['--base-radius-size'] = '-999px';
    } else {
      styles['--base-radius-size'] = addUnit(parseInt(`${shape}`, 10));
    }
    return styles;
  }

  private renderIcon() {
    const { icon = 'checkbox-hollow', privateChecked, disabled, toggleClass, size } = this;

    if (icon === false) {
      return <slot name="icon" />;
    }

    if (isString(icon) && icon) {
      const iconClass = `${namespace.join('checkbox-icon', [
        disabled ? '' : toggleClass,
        { checked: privateChecked },
      ])}`;

      return (
        <ti-icon
          size={size}
          ext-class={iconClass}
          name={icon || 'checkbox-hollow'}
          style={{
            width: addUnit(size),
            height: addUnit(size),
          }}
        />
      );
    }

    return <slot name="icon" />;
  }

  private renderLabel() {
    const { label } = this;
    const length =
      (Array.from(this.host.shadowRoot?.querySelectorAll('slot')) || [])
        .filter(item => item.name === '')
        .map(slotNode => slotNode.assignedNodes({ flatten: true }).length || 0)[0] || 0;
    return (
      <div
        aria-hidden="true"
        class={namespace.join('checkbox-label', {
          empty: length === 0 && !label ? 'empty' : '',
        })}
        onClick={this.labelClick.bind(this)}
        onKeyDown={this.labelClick.bind(this)}
      >
        {label || <slot onSlotchange={() => forceUpdate(this.root)} />}
      </div>
    );
  }

  root: any;

  render() {
    return (
      <Host ref={e => (this.root = e)}>
        <div part={this.extClass} class={this.getClassName()}>
          <div
            class={namespace.join('checkbox-icon-content')}
            part={this.iconClass}
            aria-hidden="true"
            style={this.completedStyles()}
            onClick={this.iconClick.bind(this)}
            onKeyDown={this.iconClick.bind(this)}
          >
            <div
              class={`${namespace.join('checkbox-icon-wrap', { checked: this.privateChecked })} ${
                this.iconClass || ''
              }`}
            >
              {this.renderIcon()}
            </div>
          </div>

          {this.renderLabel()}
        </div>
      </Host>
    );
  }
}
