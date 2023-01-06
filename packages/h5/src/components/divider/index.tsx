import { Component, h, Prop, Element, State } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, filterInvalidData, addShadowRootStyle, checkSlotIsUsed } from '../common/utils';
import { join } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';
import { EDividerOrientation, EDividerPosition } from './const';

function computedStyle(params) {
  const { color, borderColor, dashed } = params;
  let { borderWidth } = params;
  const style: { [key: string]: string | undefined } = {
    'color': color,
    '--divider-color': color,
  };

  if (dashed) {
    style['--divider-style'] = 'dashed';
  } else {
    style['--divider-background'] = borderColor;
  }
  if (borderColor) {
    style['--divider-color'] = borderColor;
  }
  if (borderWidth) {
    borderWidth = borderWidth > 2 ? borderWidth : 2;
    style['--divider-width'] = addUnit(borderWidth);
  }
  return filterInvalidData(style);
}

const defaultProps = {
  textAlign: EDividerPosition.CENTER,
  borderWidth: 2,
  orientation: EDividerOrientation.HORIZONTAL,
};
@Component({
  tag: 'ti-divider',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class Divider {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string;

  @Prop() extStyle?: JSXBase.HTMLAttributes<any>['style'] | string = '';

  @Prop() dashed = false;

  @Prop() hairline = false;

  @Prop() textAlign: `${EDividerPosition}` = defaultProps.textAlign;

  @Prop() color?: string;

  @Prop() borderColor?: string;

  @Prop() borderWidth = defaultProps.borderWidth;

  @Prop() orientation: `${EDividerOrientation}` = defaultProps.orientation;

  @State() slotIsUsed = false;

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  componentDidRender() {
    // this.host.shadowRoot?.querySelector('slot')?.assignedNodes({ flatten: true })在vue上面，对花括号会返回一个空的text
    this.slotIsUsed = checkSlotIsUsed(this.host);
  }

  render() {
    const {
      extStyle,
      extClass,
      hairline,
      textAlign,
      orientation,
      color,
      borderColor,
      borderWidth,
      dashed,
      slotIsUsed,
    } = this;
    const style = computedStyle({ color, borderColor, borderWidth, dashed });

    return (
      <div
        class={`${join('divider', [
          borderWidth > 2 || !hairline ? 'thick' : '',
          textAlign || '',
          orientation,
          orientation === 'horizontal' && !slotIsUsed ? 'empty' : '',
        ])} ${extClass}`}
        style={{ ...style, ...stringToAttrStyle(extStyle) }}
        part={extClass}
      >
        {orientation === 'horizontal' && <slot />}
      </div>
    );
  }
}
