import { Component, h, Prop, State, Watch, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { stringToAttrStyle, addShadowRootStyle, checkSlotIsUsed } from '../common/utils';
import { hexToRGB, RGBToRGBA } from '../common/utils/color';
import * as namespace from '../common/utils/namespace';
import { EButtonVariant, EButtonSize, EButtonShape, EButtonType } from './const';

interface CSSStyle {
  [key: string]: string;
}

@Component({
  tag: 'ti-button',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiButton implements BasicComponentAbstract {
  @Prop() extClass = '';

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() prefixIconClass = '';

  @Prop() suffixIconClass = '';

  @Prop() loadingClass = '';

  @Prop() buttonInnerClass = '';

  @Prop() size?: string = EButtonSize.BIG;

  @Prop() type?: string = EButtonType.PRIMARY;

  @Prop() variant?: string = EButtonVariant.CONTAINED;

  @Prop() shape?: string = EButtonShape.ROUND;

  @Prop() color?: string;

  @Prop() hairline?: boolean = true;

  @Prop() disabled?: boolean;

  @Prop() loading?: boolean;

  @Prop() block?: boolean;

  @Prop() prefixIcon?: string;

  @Prop() suffixIcon?: string;

  @Prop() loadingSize?: number = 30;

  @Prop() loadingType?: 'circular' | 'spinner';

  @Prop() loadingText?: string;

  @State() gradient: boolean;

  @State() currentColor: string;

  @State() subBgColor: string;

  @State() bgColorActive: string;

  @State() slotIsUsed = false;

  @Element() host: HTMLElement;

  @Watch('color')
  @Watch('variant')
  @Watch('type')
  updateColor() {
    this.setSubColor();
  }

  @Watch('extCss')
  updateShadowRootStyle() {
    addShadowRootStyle.call(this);
  }

  private getColor(type: string, opacity = 1) {
    const buttonTypes: { [key: string]: string } = {
      primary: `rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), ${opacity})`,
      warning: `rgba(var(--warning-r, 255), var(--warning-g, 163), var(--warning-b, 0), ${opacity})`,
      error: `rgba(var(--error-r, 255), var(--error-g, 46), var(--error-b, 46), ${opacity})`,
      success: `rgba(var(--success-r, 7), var(--success-g, 193), var(--success-b, 96), ${opacity})`,
      info: `rgba(var(--link-r, 42), var(--link-g, 106), var(--link-b, 233), ${opacity})`,
      simple: `rgba(117, 117, 117, ${opacity})`,
    };
    return buttonTypes[type];
  }

  private formatColor(colorStr, opacity) {
    let rgba = '';
    if (colorStr.includes('#')) {
      rgba = hexToRGB(colorStr, opacity);
    }
    if (colorStr.includes('rgba')) {
      const reg = /^rgba?\((.+)\)$/g;
      const a = colorStr.replace(reg, (_s, $1) => $1);
      const [r, g, b] = a.split(',');
      rgba = `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    if (colorStr.includes('rgb')) {
      rgba = RGBToRGBA(colorStr, opacity);
    }
    return rgba;
  }

  private setSubColor(color?: string, variant?: string, type?: string) {
    color = color || this.color;
    variant = variant || this.variant;
    type = type || this.type;
    const currentColor = color || this.getColor(type);
    const newData = {
      currentColor,
      gradient: false,
      subBgColor: '',
      bgColorActive: '',
    };
    if (variant === 'filled') {
      newData.subBgColor = color ? this.formatColor(currentColor, 0.1) : this.getColor(type, 0.1);
      newData.bgColorActive = color ? this.formatColor(currentColor, 0.2) : this.getColor(type, 0.2);
    } else if (variant === 'outlined') {
      newData.bgColorActive = color ? this.formatColor(currentColor, 0.1) : this.getColor(type, 0.1);
    } else if (variant === 'contained') {
      newData.bgColorActive = currentColor;
      newData.gradient = true;
    }
    this.setData(newData);
  }

  private setData(data: object) {
    Object.keys(data).forEach(key => {
      this[key] = data[key];
    });
  }

  private computedStyle(type, color, variant, subBgColor, bgColorActive, shape, extStyle): CSSStyle {
    const style = {
      '--text-color': `var(--button-text-color,${color})`,
      '--loading-color': 'var(--button-loading-color, --text-color)',
      '--background-color': `var(--button-background-color,${color})`,
      '--active-color': `var(--button-active-color,${bgColorActive})`,
    };
    if (variant === 'contained') {
      style['--text-color'] = 'var(--button-text-color, #fff)';
    } else if (variant === 'filled') {
      style['--background-color'] = `var(--button-background-color,${subBgColor})`;
    } else if (variant === 'outlined') {
      style['--background-color'] = 'transparent';
      style['--button-border-color'] = style['--text-color'];
      if (type === 'simple') {
        style['--button-border-color'] = '#c4c4c4';
      }
    } else if (variant === 'text') {
      style['--background-color'] = 'transparent';
      style['--active-color'] = 'transparent';
    }
    if (shape === 'capsule') {
      style['--button-radius'] = '999px';
    } else if (shape === 'rect') {
      style['--button-radius'] = '0px';
    }

    return { ...style, ...stringToAttrStyle(extStyle) };
  }

  onClick = e => {
    if (window.Titian?.bubbles === true) return;
    if (this.disabled || this.loading) {
      e.stopPropagation();
    }
  };

  componentWillLoad() {
    const { color, variant, type } = this;
    this.setSubColor(color, variant, type);
    addShadowRootStyle.call(this);
  }

  componentDidRender() {
    this.slotIsUsed = checkSlotIsUsed(this.host);
  }

  render() {
    const {
      extClass,
      disabled,
      loading,
      gradient,
      block,
      hairline,
      variant,
      type,
      size,
      currentColor,
      subBgColor,
      bgColorActive,
      shape,
      extStyle,
      prefixIcon,
      suffixIcon,
      loadingType,
      loadingSize,
      loadingText,
      computedStyle,
      prefixIconClass,
      suffixIconClass,
      loadingClass,
      buttonInnerClass,
      slotIsUsed,
    } = this;
    const id = namespace.join('button');
    const mainClass = `${namespace.join('button', {
      disabled,
      loading,
      gradient,
      block,
      hairline,
    })} titian-button-${variant} titian-button-type-${type} titian-button-size-${size} ${extClass}`;
    const buttonStyle = computedStyle(type, currentColor, variant, subBgColor, bgColorActive, shape, extStyle);
    const containerClass = `${namespace.join('button-content', [
      'prefix',
      { 'no-gap': !slotIsUsed },
    ])} ${buttonInnerClass}`;
    return (
      <button id={id} type="button" part={extClass} class={mainClass} style={buttonStyle} onClick={this.onClick}>
        <div class={containerClass} part={buttonInnerClass}>
          {loading ? (
            <ti-loading
              mode={loadingType}
              size={loadingSize}
              text={loadingText}
              ext-class={`${loadingClass} ${namespace.join('button-icon')}`}
              ext-css={this.extCss}
              exportparts={loadingClass}
            />
          ) : (
            prefixIcon && (
              <ti-icon
                name={prefixIcon}
                ext-class={namespace.join('button-icon', ['prefix', { 'no-gap': !slotIsUsed }])}
                part={prefixIconClass}
              />
            )
          )}
          <slot />
          {suffixIcon && (
            <ti-icon
              name={suffixIcon}
              ext-class={namespace.join('button-icon', ['suffix', { 'no-gap': !slotIsUsed }])}
              part={suffixIconClass}
            />
          )}
        </div>
      </button>
    );
  }
}
