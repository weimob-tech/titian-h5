import {
  Component,
  EventEmitter,
  h,
  Prop,
  State,
  Event,
  Method,
  Element,
  Watch,
  forceUpdate,
  Host,
} from '@stencil/core';
import { Components } from '../../components';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { isString, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';
import addUnit from '../common/utils/suffix';

type ParentAttrs = Components.TiRadioGroup & {
  privateDefaultValue?: string | number;
  change?: EventEmitter<string | number>;
};

@Component({
  tag: 'ti-radio',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiRadio implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() iconClass?: string;

  @Prop() label?: string;

  @Prop() value?: string | number = null;

  @Prop() disabled?: boolean | null = null;

  @Prop() labelDisabled?: boolean | null = null;

  @Prop() checked?: boolean = null;

  @Prop() defaultChecked?: boolean = null;

  @Prop() icon?: boolean | string = 'checkbox-hollow';

  @Prop() color?: string;

  @Prop() size?: number = 32;

  @Prop() shape: 'square' | 'circle' | 'none' | number = 'circle';

  @State() toggleClass = '';

  @State() direction = 'horizontal';

  @State() privateChecked = false;

  @Event({ bubbles: true, composed: false }) change: EventEmitter<boolean>;

  @Method()
  async updateDataFromParent(parent: ParentAttrs) {
    if (parent) {
      const parentInstance = await parent?.getInstance();
      const {
        disabled,
        value: parentValue,
        privateDefaultValue,
        shape,
        icon,
        labelDisabled,
        color,
        size,
        direction,
      } = parentInstance || parent;
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

      this.handleToggleClass(privateChecked);
      this.checked = checked;
      this.defaultChecked = defaultChecked;
      this.privateChecked = privateChecked;
      this.labelDisabled = labelDisabled ?? this.labelDisabled;
      this.disabled = disabled ?? this.disabled;
      this.shape = shape ?? this.shape;
      this.icon = icon ?? this.icon;
      this.size = size ?? this.size;
      this.color = color ?? this.color;
      this.direction = direction ?? this.direction;
    }
  }

  @Watch('checked')
  watchChecked(value: boolean, oldValue: boolean) {
    if (value !== oldValue && !this.parent) {
      if (value !== undefined && this.privateChecked !== value) {
        this.privateChecked = value;
        this.handleToggleClass(value);
      }
    }
  }

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-radio-group',
      relations: 'ancestor',
    })?.[0];
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

  private getClassNames() {
    const { disabled, privateChecked, extClass, direction } = this;
    const classList = [namespace.join('radio', [{ disabled, checked: privateChecked }, direction]), extClass];

    return classList.join(' ');
  }

  private handleToggleClass(checked: boolean) {
    this.toggleClass = checked ? 'zoom-in' : 'zoom-out';
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
      this.handleToggleClass(nextChecked);
    }
  }

  private handleIconClick() {
    const { disabled } = this;
    if (disabled) {
      return;
    }
    this.handleChange();
  }

  private handleLabelClick() {
    const { disabled, labelDisabled } = this;
    if (disabled || labelDisabled) {
      return;
    }
    this.handleChange();
  }

  private completedStyles() {
    const { shape, color } = this;
    const styles = {};
    if (color) {
      styles['--radio-icon-color'] = color;
    }
    if (shape === 'circle') {
      styles['--base-radius-size'] = addUnit(999);
    } else if (shape === 'square') {
      styles['--base-radius-size'] = addUnit(-999);
    } else {
      styles['--base-radius-size'] = addUnit(parseInt(`${shape}`, 10));
    }

    return styles;
  }

  private renderIcon() {
    const { icon, size, privateChecked, disabled, toggleClass } = this;

    if (icon === false) {
      return <slot name="icon" />;
    }
    if (isString(icon) && icon) {
      const iconClass = namespace.join('radio-icon', [disabled ? '' : toggleClass, { checked: privateChecked }]);
      return (
        <ti-icon
          ext-class={iconClass}
          name={icon || 'checkbox-hollow'}
          size={size}
          extStyle={{
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
        onClick={this.handleLabelClick.bind(this)}
        onKeyDown={this.handleLabelClick.bind(this)}
        class={namespace.handle('radio', ['label', length === 0 && !label ? 'empty' : ''])}
      >
        {/**/}
        {label || <slot onSlotchange={() => forceUpdate(this.root)} />}
      </div>
    );
  }

  root: any;

  render() {
    return (
      <Host ref={e => (this.root = e)}>
        <div part={this.extClass} class={this.getClassNames()}>
          <div
            class={namespace.join('checkbox-icon-content')}
            part={this.iconClass}
            onClick={this.handleIconClick.bind(this)}
            onKeyDown={this.handleIconClick.bind(this)}
            aria-hidden="true"
            style={this.completedStyles()}
          >
            <div
              class={`${namespace.join('radio-icon-wrap', { checked: this.privateChecked })} ${this.iconClass || ''}`}
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
