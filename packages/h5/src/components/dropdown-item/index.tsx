import { Component, Element, h, Method, Prop, State, Watch, Event, EventEmitter } from '@stencil/core';
import type { Components } from '../../components';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { store } from '../common/basic/store';
import { Timeout } from '../common/basic/transition';
import type { IPosition } from '../common/interface';
import { addShadowRootStyle, parseStringToObject } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getParent } from '../common/utils/relation';

export interface TiDropdownItemOption {
  title?: string;
  label?: string;
  desc?: string;
  value: string | number;
}

const instanceCache: Set<TiDropdownItem> = new Set();

type DropdownMenuInstance = Components.TiDropdownMenu & {
  getChildrenData?: () => void;
  setMoving?: (isMoving) => void;
  getMenuRect?: () => DOMRect;
  handleItemToggle?: (visible: boolean, instance: TiDropdownItem) => void;
  open?: EventEmitter<never>;
  close?: EventEmitter<never>;
  onChildToggle?: (instance: TiDropdownItem) => void;
};

@Component({
  tag: 'ti-dropdown-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiDropdownItem implements BasicComponentAbstract {
  handleItemToggle: (visible: boolean, instance: TiDropdownItem) => void;

  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass = '';

  @Prop() visible = false;

  @Prop() title!: string;

  @Prop() mode: 'single' | 'multiple' = 'single';

  @Prop() icon = 'selected';

  @Prop() options: TiDropdownItemOption[] | string = [];

  @Prop() disabled = false;

  @Prop() value: string | number | Array<string | number> = '';

  @Prop() type: 'checkbox' | 'switch' = 'checkbox';

  @Prop() hasMask = true;

  @Prop() closeOnMask = true;

  @Prop() activeColor: string;

  @Prop() hasSubmit: boolean;

  @Prop() submitText = store.get('locale').dropdown.submitText;

  @Prop() direction: 'up' | 'down' = 'down';

  @State() maskStyle = {};

  @State() titleFromProp = '';

  @State() show = false;

  @State() timeout: number | Timeout = { appear: 300, exit: 200 };

  @Method()
  async getInstance() {
    return this;
  }

  @Method()
  async toggle() {
    const parent = await this.parent;
    parent?.onChildToggle(this);
  }

  @Event({ composed: false }) close: EventEmitter<never>;

  @Event({ composed: false }) open: EventEmitter<never>;

  @Event({ composed: false }) submit: EventEmitter<string | number | Array<string | number>>;

  @Event({ composed: false }) change: EventEmitter<string | number | Array<string | number>>;

  @Watch('visible')
  async visibleChange(visible: boolean, oldVisible?: boolean) {
    if (visible === oldVisible) return;
    const parent = await this.parent;
    const instance = parent || this;
    if (visible) {
      this.open.emit();
    } else {
      this.close.emit();
    }

    if (instance && instance.handleItemToggle) {
      instance.handleItemToggle(visible, this);
    }
  }

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-dropdown-menu',
      relations: 'parent',
    })?.[0]?.getInstance() as Promise<DropdownMenuInstance>;
  }

  connectedCallback() {
    instanceCache.add(this);
  }

  componentWillLoad(): Promise<void> | void {
    this.titleFromProp = this.title;

    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    if (this.visible) {
      this.getParentRect();
      this.visibleChange(this.visible);
    }
  }

  disconnectedCallback() {
    instanceCache.delete(this);
  }

  private onSubmit() {
    const { value, visible } = this;

    if (!visible) return;

    this.submit.emit(value);
    this.onClose();
  }

  private getActiveStatus(itemValue: string | number) {
    if (Array.isArray(this.value)) {
      return this.value.indexOf(itemValue) > -1;
    }
    return this.value === itemValue;
  }

  private renderCellIcon(option: TiDropdownItemOption) {
    const { type } = this;

    if (type === 'checkbox' && this.getActiveStatus(option.value)) {
      return <ti-icon size={32} slot="right-icon" name={this.icon} color={this.activeColor} />;
    }

    if (this.type === 'switch') {
      return (
        <ti-switch
          size={40}
          slot="right-icon"
          activeColor={this.activeColor}
          value={this.getActiveStatus(option.value)}
          loading={false}
        />
      );
    }
    return null;
  }

  private onCellTap(item) {
    const { value, mode, hasSubmit, titleFromProp } = this;

    if (mode === 'multiple') {
      let values;
      if (Array.isArray(value)) {
        values = [...value];
      } else {
        values = [value];
      }

      if (values.includes(item.value)) {
        values = values.filter(v => v !== item.value);
      } else {
        values.push(item.value);
      }

      this.title = titleFromProp;
      this.value = values;
    } else {
      const newData = { value: item.value, title: item.title };
      if (value === item.value) {
        newData.value = '';
        newData.title = this.titleFromProp;
      }
      this.value = newData.value;
      this.title = newData.title;
    }

    // 改变时触发
    this.change.emit(this.value);

    if (hasSubmit || mode === 'multiple') {
      return;
    }

    this.onClose();
  }

  private renderContent() {
    const $options = parseStringToObject(this.options);
    if ($options?.length > 0) {
      return $options.map(item => (
        <ti-cell
          key={`${item.value}`}
          {...item}
          data-item={item}
          onClick={() => {
            this.onCellTap(item);
          }}
        >
          {this.renderCellIcon(item)}
        </ti-cell>
      ));
    }

    return <slot />;
  }

  onClose() {
    this.visible = false;
    raf(() => {
      this.parent.then(parent => parent.getChildrenData());
    });
  }

  closeOtherItems(item: TiDropdownItem) {
    let isClosing = false;
    instanceCache.forEach(instance => {
      if (instance !== item) {
        if (instance.visible) {
          instance.onClose();
          isClosing = true;
        }
        if (instance.show) {
          isClosing = true;
        }
      }
    });
    return isClosing;
  }

  getParentRect() {
    this.parent.then(parent => {
      const rect = parent?.getMenuRect();
      const windowHeight = document.documentElement.offsetHeight;
      let maskStyle: IPosition = {};
      if (this.direction === 'up') {
        maskStyle.bottom = `${windowHeight - rect.top}px`;
      } else {
        maskStyle.top = `${rect.bottom || 0}px`;
      }
      if (typeof parent.getPosition === 'function') {
        const customStyle = parent.getPosition({ rect, direction: this.direction, position: maskStyle }) || {};
        maskStyle = {
          ...maskStyle,
          ...customStyle,
        };
      }
      this.maskStyle = maskStyle;
    });
  }

  private onEnter(e) {
    if (!e.defaultPrevented) {
      this.parent.then(parent => {
        parent?.setMoving(true);
        this.show = true;
      });
    }
  }

  onEntered(e) {
    if (!e.defaultPrevented) {
      this.parent.then(parent => parent.setMoving(false));
    }
  }

  onExit(e) {
    if (!e.defaultPrevented) {
      this.parent.then(parent => parent?.setMoving(true));
    }
  }

  onExited(e) {
    if (!e.defaultPrevented) {
      this.parent.then(parent => {
        parent?.setMoving(false);
        this.show = false;
      });
    }
  }

  render() {
    return (
      <div
        part={this.extClass}
        class={`${namespace.join('dropdown-item', { visible: this.show })} ${this.extClass}`}
        style={{ ...this.maskStyle, ...(this.activeColor ? { '--protected-icon-color': this.activeColor } : {}) }}
      >
        <ti-popup
          visible={this.visible}
          position={this.direction === 'down' ? 'top' : 'bottom'}
          onClose={this.onClose.bind(this)}
          closeOnMask={Boolean(this.closeOnMask || this.hasSubmit)}
          safeArea
          onEnter={this.onEnter.bind(this)}
          onEntered={this.onEntered.bind(this)}
          onExit={this.onExit.bind(this)}
          onExited={this.onExited.bind(this)}
          timeout={this.timeout}
          hasMask={this.hasMask}
          timingFunction="cubic-bezier(0.49, 0.04, 1, 1)"
        >
          {this.renderContent()}

          {this.hasSubmit ? (
            <ti-button color={this.activeColor} type="primary" onClick={this.onSubmit.bind(this)} block>
              {this.submitText}
            </ti-button>
          ) : null}
        </ti-popup>
      </div>
    );
  }
}
