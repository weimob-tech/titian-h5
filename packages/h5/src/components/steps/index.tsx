import { Component, h, Prop, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';

export interface TiStepOption {
  title?: string;
  subtitle?: string;
  description?: string;
  time?: string;
  icon?: string;
  checked?: boolean;
  style?: string | Record<string, string>;
  [propName: string]: any;
}

@Component({
  tag: 'ti-steps',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSteps implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extClass?: string;

  @Prop() options: TiStepOption[] = [];

  @Prop() current: number | number[] = 0;

  @Prop() activeColor: string;

  @Prop() icon: string;

  @Prop() subtitleAlign: 'left' | 'right';

  @Prop() alias?: Record<string, string> = {};

  private computedStyle() {
    const { activeColor, extStyle } = this;
    const style = { ...stringToAttrStyle(extStyle) };

    if (activeColor) {
      style['--steps-icon-active-color'] = activeColor;
      style['--steps-dot-active-color'] = activeColor;
      style['--steps-title-active-color'] = activeColor;
      style['--steps-subtitle-active-color'] = activeColor;
    }

    return style;
  }

  private checkCurrent(current, index) {
    if (Array.isArray(current)) {
      return current.indexOf(index) > -1;
    }
    return current === index;
  }

  private renderItem(item: TiStepOption, index: number) {
    const { current, icon, subtitleAlign, options, checkCurrent, alias } = this;
    return (
      <div
        class={join('steps-item', [{ active: item.checked || checkCurrent(current, index) }])}
        style={{ ...stringToAttrStyle(item.style) }}
      >
        <div class={handle('steps-item', ['left'])}>
          <div class={handle('steps-item', ['icon-box'])}>
            {item[alias.icon || 'icon'] || icon ? (
              <ti-icon name={item[alias.icon || 'icon'] || icon} />
            ) : (
              <div class={handle('steps-item', ['dot'])} />
            )}
          </div>
          {index !== options.length - 1 && <div class={handle('steps-item', ['line'])} />}
        </div>
        <div class={handle('steps-item', ['content'])}>
          {(item[alias.title || 'title'] || item[alias.subtitle || 'subtitle']) && (
            <div class={handle('steps-item', ['title-box'])}>
              <div class={handle('steps-item', ['title'])}>{item[alias.title || 'title']}</div>
              <div class={join('steps-item-subtitle', [{ right: subtitleAlign === 'right' }])}>
                {item[alias.subtitle || 'subtitle']}
              </div>
            </div>
          )}
          {item[alias.description || 'description'] && (
            <div class={handle('steps-item', ['desc'])}>{item[alias.description || 'description']}</div>
          )}
          {item[alias.time || 'time'] && <div class={handle('steps-item', ['time'])}>{item[alias.time || 'time']}</div>}
        </div>
      </div>
    );
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    return (
      <div part={this.extClass} class={`${join('steps')} ${this.extClass}`} style={this.computedStyle()}>
        {this.options.map((item, index) => this.renderItem(item, index))}
      </div>
    );
  }
}
