import { Component, h, Prop, Element, Method, Event, EventEmitter, Watch, State } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, parseStringToObject, stringToAttrStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';

export interface CheckboxItem {
  value: string | number;
  label: string;
  disabled?: boolean;
  labelDisabled?: boolean;
}

@Component({
  tag: 'ti-checkbox-group',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCheckboxGroup implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  /**
   * 用于指定当前选中的选项
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckboxGroup value={[1]} />
   * @since 0.1.0
   */
  @Prop() value: Array<string | number> | string = null;

  /**
   * 默认选中的值
   *
   * @type string
   * @default []
   * @example
   * <TiCheckboxGroup defaultValue={[1]} />
   * @since 0.1.0
   */
  @Prop() defaultValue: Array<string | number> = null;

  /**
   * 指定当前文字是否禁用点击
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckboxGroup labelDisabled />
   * @since 0.1.0
   */
  @Prop() labelDisabled = false;

  /**
   * 指定当前是否禁用
   *
   * @type boolean
   * @default false
   * @example
   * <TiCheckboxGroup disabled />
   * @since 0.1.0
   */
  @Prop() disabled;

  /**
   * 子组件排列方向
   *
   * @type string
   * @default 'horizontal'
   * @enum ['horizontal', 'vertical']
   * @example
   * <TiCheckboxGroup direction="vertical" />
   * @since 0.1.0
   */
  @Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

  /**
   * 单选框圆角度数
   *
   * @type string
   * @default circle
   * @enum circle, square
   * @example
   * <TiCheckboxGroup shape="square" />
   * @since 0.1.0
   */
  @Prop() shape: 'square' | 'circle' | 'none' | number = 'circle';

  /**
   * 自定义图标名称
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckboxGroup icon="checkbox" />
   * @since 0.1.0
   */
  @Prop() icon: string;

  /**
   * 单选框颜色配置
   *
   * @type string
   * @default ''
   * @example
   * <TiCheckboxGroup color="red" />
   * @since 0.1.0
   */
  @Prop() color: string;

  /**
   * 多选框尺寸
   *
   * @type number
   * @default ''
   * @example
   * <TiCheckboxGroup size={32} />
   * @since 0.1.0
   */
  @Prop() size: number;

  /**
   * 以配置形式设置子元素
   *
   * @type array
   * @default []
   * @example
   * <TiCheckboxGroup options={ [{value: 'name1', label: 'name1'},{value: 'name2', label: 'name2'},{value: 'name3', label: 'name3'}] }/>
   * @since 0.1.0
   */
  @Prop() options: CheckboxItem[] = [];

  /**
   * 设置当前最多选择的数量
   *
   * @type number
   * @default Infinity
   * @example
   * <TiCheckboxGroup max={2} />
   * @since 0.1.0
   */
  @Prop() max: number = Number.MAX_SAFE_INTEGER;

  @State() privateDefaultValue: Array<string | number> = null;

  @Event({ bubbles: true, composed: false }) change: EventEmitter<Array<string | number>>;

  @Event({ bubbles: true, composed: false }) handleMax: EventEmitter<never>;

  @Method()
  async getInstance() {
    return this;
  }

  @Watch('privateDefaultValue')
  observeDefault(newVal: Array<string | number>) {
    const { max } = this;

    if ((max || Infinity) < newVal.length) {
      this.handleMax.emit();
      return;
    }
    this.update();
  }

  @Watch('value')
  observeValue() {
    this.update();
  }

  get children() {
    const buttonChildren =
      getChildren({
        tag: 'ti-checkbox-button',
        host: this.host,
        useSlot: !this.options?.length,
        relations: 'descendant',
      }) || [];
    const normalChildren = getChildren({
      tag: 'ti-checkbox',
      host: this.host,
      useSlot: !this.options?.length,
      relations: 'descendant',
    });
    return [...normalChildren, ...buttonChildren];
  }

  private update() {
    this.children.forEach(child => child.updateDataFromParent(this));
  }

  componentWillLoad() {
    this.privateDefaultValue = parseStringToObject(this.defaultValue);
    addShadowRootStyle.call(this);
  }

  componentDidUpdate() {
    this.update();
  }

  private getClassName() {
    const { direction } = this;
    const classList = [namespace.join('checkbox-group', [direction])];

    return classList.join(' ');
  }

  private renderItems() {
    const { options, value, privateDefaultValue } = this;
    const $options = parseStringToObject(options);

    if (Array.isArray($options) && $options.length !== 0) {
      return $options.map(item => (
        <ti-checkbox
          key={item.value}
          checked={value?.includes(item.value)}
          defaultChecked={privateDefaultValue?.includes(item.value)}
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
    return (
      <div class={this.getClassName()} part={this.extClass} style={stringToAttrStyle(this.extStyle)}>
        {this.renderItems()}
      </div>
    );
  }
}
