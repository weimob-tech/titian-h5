import { Component, Element, Prop, State, h, Method } from '@stencil/core';
import { Components } from '../../components';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import type { IPosition } from '../common/interface';
import { addShadowRootStyle, getBoundingClientRect } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getChildren } from '../common/utils/relation';

type TiDropdownItem = Components.TiDropdownItem;

type TiDropdownItemInstance = TiDropdownItem & {
  closeOtherItems?: (item: any) => boolean;
  getParentRect?: () => void;
};

@Component({
  tag: 'ti-dropdown-menu',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiDropdownMenu implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass = '';

  @Prop() titleClass = '';

  @Prop() hasMask = true;

  @Prop() closeOnMask = true;

  @Prop() disabled: boolean = null;

  @Prop() icon: string;

  @Prop() type: null;

  @Prop() mode: 'single' | 'multiple';

  @Prop() activeColor: string;

  @Prop() direction: 'up' | 'down';

  @Prop() getPosition?: (rect: { rect: DOMRect; direction: 'up' | 'down'; position: IPosition }) => IPosition;

  @State() childrenData: {
    visible: boolean;
    activeColor: string;
    disabled: boolean;
    title: string;
    direction: 'up' | 'down';
    hasChoose: boolean;
  }[] = [];

  @State() hasChoose = false;

  @State() isMoving = false;

  @Method()
  async getInstance() {
    return this;
  }

  connectedCallback() {
    this.updateChildrenData();
  }

  componentDidUpdate(): Promise<void> | void {
    this.updateChildrenData();
  }

  componentWillLoad(): Promise<void> | void {
    this.getChildrenData();

    addShadowRootStyle.call(this);
  }

  componentDidLoad() {
    this.getMenuRect();
  }

  get children() {
    return getChildren({
      tag: 'ti-dropdown-item',
      host: this.host,
      relations: 'children',
      useSlot: true,
    });
  }

  onChildToggle(child: HTMLTiDropdownItemElement) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const index = (this.children || []).findIndex(i => i === (child.host || child));
    this.onTitleToggle(undefined, index);
  }

  private updateChildrenData() {
    const { type, icon, disabled, mode, activeColor, direction, hasMask, closeOnMask, children } = this;

    children.forEach(child => {
      if (icon) {
        child.icon = icon;
      }

      child.type = type || child.type;
      child.disabled = disabled !== null ? disabled : child.disabled;

      if (mode) {
        child.mode = mode;
      }

      if (direction) {
        child.direction = direction;
      }

      if (activeColor) {
        child.activeColor = activeColor;
      }

      if (!hasMask) {
        child.hasMask = hasMask;
      }

      if (!closeOnMask) {
        child.closeOnMask = closeOnMask;
      }
    });
  }

  private getChildrenData(children?: TiDropdownItem[]) {
    if (!children?.length) {
      children = this.children;
    }
    this.childrenData = (children || []).map(child => ({
      title: child.title,
      visible: child.visible,
      direction: child.direction,
      hasChoose: Boolean(child.value),
      disabled: child.disabled,
      activeColor: child.activeColor,
    }));
  }

  getMenuRect() {
    const titleWrap = this.host.shadowRoot.querySelector(`.${namespace.handle('dropdown-menu', 'title-wrap')}`);
    return getBoundingClientRect(titleWrap);
  }

  private onTitleToggle(event: CustomEvent<null> | undefined, index?: number) {
    const { children } = this;
    index = Number.parseInt(`${(event?.target as HTMLElement)?.dataset?.index || index}`, 10);
    const childEl = (children || [])[index];
    if (!childEl) return;
    childEl.getInstance().then((child: TiDropdownItemInstance) => {
      if (child && child.closeOtherItems) {
        if (this.isMoving) {
          raf(() => {
            this.onTitleToggle(event, index);
          });
        } else {
          this.isMoving = false;

          raf(() => {
            const isClosing = child.closeOtherItems(child);
            if (isClosing) {
              this.onTitleToggle(event, index);
              return;
            }
            const { visible } = child;
            child.getParentRect();
            child.visible = !visible;
            this.getChildrenData(children);
          });
        }
      }
    });
  }

  private completedStyle() {
    const styles = {};

    if (this.activeColor) {
      styles['--dropdown-active-color'] = this.activeColor;
    }

    if (this.mode === 'multiple') {
      styles['--dropdown-label-active-color'] = 'black';
    } else {
      styles['--dropdown-label-active-color'] = this.activeColor;
    }

    return styles;
  }

  handleItemToggle(visible: boolean, instance: HTMLTiDropdownItemElement & { host: HTMLTiDropdownItemElement }) {
    const index = this.children?.indexOf(instance.host);
    if (!visible) {
      const newChildrenData = JSON.parse(JSON.stringify(this.childrenData));
      newChildrenData[index].hasChoose = instance.value !== '';
      this.childrenData = newChildrenData;
    }
    let rotateStart = visible ? 0 : 180;
    const rotateEnd = visible ? 180 : 360;
    const fn = () => {
      raf(() => {
        const selector = this.host.shadowRoot.querySelector<HTMLDivElement>(
          `.titian-dropdown-menu-title-${index} .titian-dropdown-menu-icon`,
        );
        if (selector && selector.style) {
          selector.style.transform = `rotate(${rotateStart}deg)`;
        }
        rotateStart += 10;
        if (rotateStart <= rotateEnd) {
          fn();
        }
      });
    };
    fn();
  }

  setMoving(isMoving: boolean) {
    this.isMoving = isMoving;
  }

  private renderTitle() {
    return this.childrenData.map((item, index) => (
      <div
        class={`${namespace.handle('dropdown-menu', ['title', `title-${index}`, { visible: item.visible }])} ${
          this.titleClass || ''
        }`}
        part={this.titleClass}
      >
        <ti-button
          disabled={item.disabled}
          variant="text"
          color={item.visible || item.hasChoose ? item.activeColor || this.activeColor || 'primary' : '#000'}
          data-index={index}
          block
          onClick={this.onTitleToggle.bind(this)}
        >
          {item.title}
          <div class={namespace.handle('dropdown-menu', 'icon')}>
            <ti-icon name={`arrow-${item.direction || 'down'}`} />
          </div>
        </ti-button>
      </div>
    ));
  }

  render() {
    return (
      <div
        part={this.extClass}
        class={`${namespace.join('dropdown-menu')} ${this.extClass}`}
        style={this.completedStyle()}
      >
        <div class={namespace.handle('dropdown-menu', 'title-wrap')}>{this.renderTitle()}</div>
        <slot />
      </div>
    );
  }
}
