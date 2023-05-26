/* eslint-disable class-methods-use-this */
import { Component, Element, Event, EventEmitter, h, Method, Watch, Prop } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Components } from '../../components';
import { OmitType } from '../common/interface';
import { addShadowRootStyle } from '../common/utils';
import { getChildren } from '../common/utils/relation';

@Component({
  tag: 'ti-collapse',
  shadow: true,
})
export class TiCollapse {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extOptionClass?: string = '';

  @Prop() extOptionContentClass?: string = '';

  @Prop() extOptionStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() value?: string | number | Array<string | number>;

  @Prop() options: (OmitType<Components.TiCollapseItem, (...args: any) => any> & { content: string })[] | string = [];

  @Prop() icon?: string;

  @Prop() rightIcon?: string;

  @Prop() disabled?: boolean;

  @Prop() divider?: boolean;

  @Prop() clickable?: boolean;

  @Prop() repel?: boolean;

  @Event({ bubbles: false, composed: false }) change!: EventEmitter<unknown>;

  @Event({ bubbles: false, composed: false }) open!: EventEmitter<unknown>;

  @Event({ bubbles: false, composed: false }) close!: EventEmitter<unknown>;

  temp: {
    [key: string]: unknown;
  };

  get children() {
    return getChildren({
      host: this.host,
      useSlot: this.options.length === 0,
      tag: 'ti-collapse-item',
      relations: 'descendant', // 'parent' ,'ancestor',
    });
  }

  selectValue!: (string | number) | (string | number)[];

  @Watch('value')
  @Watch('repel')
  observeValue() {
    this.updateSelectValue();
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidUpdate() {
    const { icon, rightIcon, disabled, clickable, divider } = this;

    if (
      icon !== this.temp.icon ||
      rightIcon !== this.temp.rightIcon ||
      disabled !== this.temp.disabled ||
      clickable !== this.temp.clickable ||
      divider !== this.temp.divider
    ) {
      this.temp = {
        icon,
        rightIcon,
        disabled,
        clickable,
        divider,
      };
      this.updateChildren();
    }
  }

  componentDidLoad(): void | Promise<void> {
    const { icon, rightIcon, disabled, clickable, divider } = this;
    this.temp = {
      icon,
      rightIcon,
      disabled,
      clickable,
      divider,
    };
    this.updateSelectValue();
  }

  updateSelectValue() {
    const { repel, value } = this;

    let select: (string | number) | (string | number)[];

    if (repel) {
      select = Array.isArray(value) ? value[0] : value;
    } else {
      select = Array.isArray(value) ? value : [value];
    }

    if (select !== undefined && select !== null) {
      this.selectValue = select;
    }
    this.updateChildren();
  }

  updateChildren() {
    this.children.forEach(child => {
      child.updateDataFromParent();
    });
  }

  @Method()
  switch(name: string | number, status: boolean) {
    const { repel } = this;
    const actionItem = name;
    let value: (string | number) | (string | number)[] = '';
    if (repel) {
      value = status ? name : '';
    } else if (status) {
      value = [...((this.selectValue || []) as []), name];
    } else {
      value = ((this.selectValue || []) as []).filter((activeName: string | number) => activeName !== name);
    }

    value = Array.isArray(value) ? value.filter(i => i !== undefined && i !== null) : value;
    this.selectValue = value;
    this.updateChildren();
    if (status) {
      this.open.emit(actionItem);
    } else {
      this.close.emit(actionItem);
    }
    this.change.emit(value);
  }

  @Method()
  async getImperativeHandle() {
    const { children, selectValue } = this;
    return { children, selectValue };
  }

  render() {
    const { options, extOptionContentClass, extOptionClass, extOptionStyle } = this;
    if (Array.isArray(options) && options.length > 0) {
      return options.map(({ content, ...opt }) => {
        const props: OmitType<Components.TiCollapseItem, (...args: any) => any> = opt;
        return (
          <ti-collapse-item
            {...props}
            ext-style={extOptionStyle}
            extClass={extOptionClass}
            extContentClass={extOptionContentClass}
            exportparts={`${extOptionClass}, ${extOptionContentClass}`}
            ext-css={this.extCss}
          >
            {content}
          </ti-collapse-item>
        );
      });
    }
    return <slot />;
  }
}
