import { Component, Method, Element, h, Prop, State } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';
import { getParent } from '../common/utils/relation';

@Component({
  tag: 'ti-sidebar-item',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSidebarItem {
  @Element() host!: HTMLTiSidebarItemElement;

  @Prop() extCss = '';

  @Prop() label = '';

  @Prop() disabled = false;

  @Prop() badge = '';

  @Prop() dot = false;

  @Prop() extClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @State() active = false;

  @State() refresh = false;

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-sidebar',
      relations: 'ancestor', // 'parent' ,'ancestor',
    })[0];
  }

  componentDidLoad() {
    this.updateDataFromParent();
    this.refresh = true;
  }

  @Method()
  async updateDataFromParent() {
    const { parent } = this;
    if (!parent) {
      return;
    }
    const { children, activeIndex } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    this.active = index === activeIndex;
  }

  onClick = async () => {
    if (this.disabled) return;
    const { parent } = this;
    if (!parent) {
      return;
    }
    const { children } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    parent.setActive(index);
  };

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { active, extClass, extStyle, label, disabled, dot, badge } = this;
    return (
      <div
        class={`${join('sidebar-item', [{ active, disabled }])} ${extClass}`}
        part={extClass}
        style={stringToAttrStyle(extStyle)}
        onClick={this.onClick}
        aria-hidden="true"
      >
        <ti-badge content={badge} dot={dot} atText>
          <div class={handle('sidebar-item', ['text', this.refresh && 'refresh'])}>{label}</div>
        </ti-badge>
      </div>
    );
  }
}
