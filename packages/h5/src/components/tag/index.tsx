import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { hexToRGBA, RGBToRGBA } from '../common/utils/color';
import { handle, join } from '../common/utils/namespace';
import { ETagShape, ETagSize, ETagVariant } from './const';

// const hexRegx = /#[0-9a-fA-F]{6}/;
// const rgbRegx = /rgb\(\s*(?:(\d{1,3})\s*,?){3}\)/;
// const rgbaRegx = /^rgba\((\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d{1,3}%?),\s*(\d*(?:\.\d+)?)\)$/;

const defaultProps = {
  variant: ETagVariant.CONTAINED,
  size: ETagSize.MEDIUM,
  shape: ETagShape.Normal,
};
@Component({
  tag: 'ti-tag',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class Tag {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() variant?: `${ETagVariant}` = defaultProps.variant;

  @Prop() color?: string;

  @Prop() size?: `${ETagSize}` = defaultProps.size;

  @Prop() shape?: `${ETagShape}` = defaultProps.shape;

  @Prop() leftIcon?: string = '';

  @Prop() rightIcon?: string = '';

  @State() cssVariable?: { [key: string]: string } = {};

  @Watch('color')
  watchColor(colorStr?: string) {
    if (typeof colorStr !== 'string') {
      return;
    }
    colorStr = colorStr.trim();
    if (!colorStr) return;
    let rgbaColor = '';
    if (colorStr.includes('#')) {
      rgbaColor = hexToRGBA(colorStr);
    } else if (colorStr.includes('rgba')) {
      rgbaColor = colorStr;
    } else if (colorStr.includes('rgb')) {
      rgbaColor = RGBToRGBA(colorStr);
    }

    if (rgbaColor) {
      this.cssVariable = {
        '--tag-color': rgbaColor,
        '--tag-color-10': RGBToRGBA(rgbaColor, 0.1),
      };
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.watchColor(this.color);
  }

  render() {
    const {
      size = defaultProps.size,
      variant = defaultProps.variant,
      shape = defaultProps.shape,
      extStyle,
      extClass = '',
      leftIcon,
      rightIcon,
    } = this;
    const className = `${join('tag')} ${handle('tag-variant', [variant])} ${handle('tag-size', [size])}  ${handle(
      'tag-shape',
      [shape],
    )} ${extClass}`;

    return (
      <div class={className} style={{ ...this.cssVariable, ...stringToAttrStyle(extStyle) }} part={extClass}>
        {leftIcon && <ti-icon name={leftIcon} />}
        <slot name="prefix" />
        <div class={join('tag-text', { left: leftIcon, right: rightIcon })}>
          <slot />
        </div>
        <slot name="suffix" />
        {rightIcon && <ti-icon name={rightIcon} />}
      </div>
    );
  }
}
