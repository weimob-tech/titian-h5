import { Component, h, Prop, Watch, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { getStyle, addShadowRootStyle } from '../common/utils';
import { hexToRGB, RGBAToHex } from '../common/utils/color';
import * as namespace from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

export interface TiProgressGradientColor {
  from: string;
  to: string;
}

@Component({
  tag: 'ti-progress',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiProgress implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() color?: string = '';

  @Prop() gradientColor?: TiProgressGradientColor | string;

  @Prop() strokeColor?: string = '';

  @Prop() bufferBgColor?: string = '';

  @Prop() value?: number;

  @Prop() strokeWidth?: number;

  @Prop() showProgress?: boolean;

  @Prop() buffer = 0;

  @Watch('color')
  watchColor(newValue: string, oldValue?: string) {
    const { gradientColor, strokeColor } = this;
    if (strokeColor === '' || newValue !== oldValue) {
      const bar = this.host.shadowRoot?.querySelector(`.${namespace.handle('progress', 'bar')}`) as HTMLElement;
      let color = getStyle(bar, 'backgroundColor');
      const matchColors = /^rgba?\((.+)\)$/g;
      const match = matchColors.exec(`${color}`);
      if (!match) return;
      color = RGBAToHex(`${color}`);
      if (gradientColor && typeof gradientColor === 'object') {
        color = gradientColor.to || color;
      }
      this.strokeColor = hexToRGB(color, 0.1);
      this.bufferBgColor = hexToRGB(color, 0.3);
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidLoad(): void {
    this.watchColor(this.color);
  }

  private completedStyles(options: {
    value?: number;
    bgColor?: string;
    color?: string;
    gradientColor?: string | TiProgressGradientColor;
  }) {
    const { value, bgColor, color, gradientColor } = options;
    const { strokeWidth } = this;
    const styles: JSXBase.HTMLAttributes<HTMLDivElement>['style'] = {};

    if (value) {
      const targetValue = Math.max(0, 100 - value);
      styles.transform = `translateX(-${targetValue}%)`;
    }

    if (strokeWidth) {
      styles.height = addUnit(strokeWidth);
    }

    if (bgColor) {
      styles.backgroundColor = bgColor;
    }

    if (gradientColor) {
      if (typeof gradientColor === 'string') {
        styles.backgroundImage = gradientColor;
      } else {
        styles.backgroundImage = `linear-gradient(to right, ${gradientColor.from}, ${gradientColor.to})`;
        styles.color = gradientColor.to;
      }
    }

    if (color) {
      styles.color = color;
    }

    return styles;
  }

  render() {
    const { strokeColor, buffer, bufferBgColor, value, color, gradientColor } = this;

    return (
      <div part={this.extClass} class={`${namespace.join('progress')} ${this.extClass}`}>
        <div class={namespace.handle('progress', 'determinate')} style={this.completedStyles({ bgColor: strokeColor })}>
          {buffer ? (
            <div
              class={namespace.handle('progress', 'buffer-bar')}
              style={this.completedStyles({ value: buffer, bgColor: bufferBgColor })}
            />
          ) : null}
          <div
            class={namespace.join('progress-bar', [value === null || value === undefined ? 'linear' : ''])}
            style={this.completedStyles({ value, bgColor: color, gradientColor })}
          />
          {value === null || value === undefined ? (
            <div
              class={namespace.handle('progress', 'assist-bar')}
              style={this.completedStyles({ value, bgColor: color })}
            />
          ) : null}
        </div>
        {this.showProgress ? (
          <div class={namespace.handle('progress', 'pivot')} style={this.completedStyles({ color })}>
            {value}%
          </div>
        ) : (
          <slot name="info" />
        )}
      </div>
    );
  }
}
