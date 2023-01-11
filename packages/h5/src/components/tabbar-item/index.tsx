/* eslint-disable no-nested-ternary */
import { Prop, State, Component, Method, Element, h } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';
import addUnit from '../common/utils/suffix';

enum TabBarItemStateEnum {
  'SELECT' = 'select',
  'NO_SELECT' = 'no_select',
}
function completedStyle(data: {
  status?: `${TabBarItemStateEnum}`;
  activeColor?: string;
  color?: string;
  size?: string | number;
}): string {
  const { status, activeColor, color, size } = data;
  let style = '';
  if (status === 'select') {
    if (typeof activeColor === 'string' && activeColor) {
      style += `color:${activeColor}`;
    }
  } else if (typeof color === 'string' && color) {
    style += `color:${color}`;
  }
  if (size) {
    style += `;font-size:${addUnit(size)}`;
  }
  return style;
}

function completedStatus(status?: `${TabBarItemStateEnum}`) {
  return status === TabBarItemStateEnum.SELECT;
}

const defaultProps = {
  activeColor: '#FF2E2E',
  color: '#757575',
  iconSize: 48,
  titleSize: 20,
  status: TabBarItemStateEnum.NO_SELECT,
};

@Component({
  tag: 'ti-tabbar-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTabbarItem {
  @Element() private host!: HTMLTiTabbarItemElement;

  @Prop() extCss? = '';

  @Prop() value?: unknown;

  @Prop() activeColor? = defaultProps.activeColor;

  @Prop() color? = defaultProps.color;

  @Prop() icon? = '';

  @Prop() title = '';

  @Prop() iconSize? = defaultProps.iconSize;

  @Prop() titleSize? = defaultProps.titleSize;

  @Prop() extClass? = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @State() status?: `${TabBarItemStateEnum}` = defaultProps.status;

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-tabbar',
      relations: 'ancestor', // 'parent' ,'ancestor',
    })[0];
  }

  componentDidLoad() {
    this.updateDataFromParent();
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  @Method()
  async updateDataFromParent() {
    const { parent } = this;
    if (!parent) {
      return;
    }
    const state = {
      activeColor: parent.activeColor || this.activeColor,
      color: parent.color || this.color,
      iconSize: parent.iconSize || this.iconSize,
      titleSize: parent.titleSize || this.titleSize,
      status: TabBarItemStateEnum.SELECT,
    };

    const { children, selectValue } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    const active = this.value || index;
    if (selectValue === active) {
      this.activeColor = state.activeColor;
      this.color = state.color;
      this.iconSize = state.iconSize;
      this.titleSize = state.titleSize;
      this.status = state.status;
      return;
    }
    state.status = TabBarItemStateEnum.NO_SELECT;
    this.activeColor = state.activeColor;
    this.color = state.color;
    this.iconSize = state.iconSize;
    this.titleSize = state.titleSize;
    this.status = state.status;
  }

  click = async () => {
    const { parent } = this;
    if (!parent) {
      return;
    }
    const { children } = await parent.getImperativeHandle();

    const index = children.indexOf(this.host);
    const active = this.value || index;
    parent.switch(active);
  };

  renderIcon = () => {
    const {
      icon,
      iconSize = defaultProps.iconSize,
      status = defaultProps.status,
      activeColor = defaultProps.activeColor,
      color = defaultProps.color,
    } = this;
    if (icon) {
      return <ti-icon name={icon} size={iconSize} color={completedStatus(status) ? activeColor : color} />;
    }
    if (completedStatus(status)) {
      return <slot key="active-icon" name="active-icon" />;
    }
    return <slot key="icon" name="icon" />;
  };

  renderTitle = () => {
    const {
      title,
      status = defaultProps.status,
      activeColor = defaultProps.activeColor,
      titleSize = defaultProps.titleSize,
      color = defaultProps.color,
    } = this;
    if (title) {
      return (
        <div
          style={stringToAttrStyle(completedStyle({ status, activeColor, color, size: titleSize }))}
          class={handle('tab-bar-item', ['title'])}
        >
          {title}
        </div>
      );
    }
    if (completedStatus(status)) {
      return <slot key="active-title" name="active-title" />;
    }
    return <slot key="title" name="title" />;
  };

  render() {
    const { extStyle, extClass = '' } = this;
    return (
      <div
        style={stringToAttrStyle(extStyle)}
        aria-hidden="true"
        class={`${join('tab-bar-item')} ${extClass}`}
        part={extClass}
        onClick={this.click}
      >
        {this.renderIcon()}
        {this.renderTitle()}
      </div>
    );
  }
}
