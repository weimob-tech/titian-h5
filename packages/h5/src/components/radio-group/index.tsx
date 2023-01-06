import { Component, h, Method, Prop, State, Watch, Element, Event, EventEmitter } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';

export interface RadioItem {
  value: string | number;
  label: string;
  disabled?: boolean;
  labelDisabled?: boolean;
}

@Component({
  tag: 'ti-radio-group',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiRadioGroup implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() value: string | number = null;

  @Prop() defaultValue: string | number = null;

  @Prop() labelDisabled = false;

  @Prop() disabled: boolean;

  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  @Prop() shape: 'square' | 'circle' | 'none' | number = 'circle';

  @Prop() icon: string;

  @Prop() color: string;

  @Prop() size: number;

  @Prop() options: RadioItem[] = [];

  @State() privateDefaultValue: string | number = null;

  @Event({ bubbles: true, composed: false }) change: EventEmitter<string | number>;

  @Method()
  async getInstance() {
    return this;
  }

  get children() {
    const buttonChildren =
      getChildren({
        tag: 'ti-radio-button',
        host: this.host,
        useSlot: !this.options?.length,
        relations: 'descendant',
      }) || [];
    const normalChildren = getChildren({
      tag: 'ti-radio',
      host: this.host,
      useSlot: !this.options?.length,
      relations: 'descendant',
    });
    return [...normalChildren, ...buttonChildren];
  }

  private update() {
    this.children.forEach(child => child.updateDataFromParent(this));
  }

  @Watch('privateDefaultValue')
  observeDefault(newVal, oldValue) {
    if (newVal !== oldValue) {
      this.update();
    }
  }

  @Watch('value')
  observeValue() {
    this.update();
  }

  componentWillLoad() {
    this.privateDefaultValue = this.defaultValue;
    this.update();

    addShadowRootStyle.call(this);
  }

  componentDidUpdate() {
    this.update();
  }

  private renderItems() {
    const { options, value, privateDefaultValue } = this;
    if (options.length !== 0) {
      return options.map(item => (
        <ti-radio
          key={item.value}
          checked={value ? value === item.value : null}
          defaultChecked={privateDefaultValue ? privateDefaultValue === item.value : null}
          value={item.value}
          label={item.label}
          disabled={item.disabled}
          labelDisabled={item.labelDisabled}
        />
      ));
    }
    return <slot />;
  }

  render() {
    const { direction } = this;

    return (
      <div part={this.extClass} class={`${namespace.join('radio-group', [direction])} ${this.extClass}`}>
        {this.renderItems()}
      </div>
    );
  }
}
