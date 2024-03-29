/* eslint-disable @typescript-eslint/default-param-last */
import { Component, h, State, Element, Prop, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import { join } from '../common/utils/namespace';

@Component({
  tag: 'ti-price',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiPrice {
  @Element() host!: HTMLElement;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() extClass?: string = '';

  @Prop() extCss = '';

  @Prop() label: string;

  @Prop() value = 0;

  @Prop() prefix: string;

  @Prop() suffix: string;

  @Prop() unit: string;

  @Prop() radix = 2;

  @State() integerPart = '0';

  @State() fractionPart = '0';

  @Watch('value')
  valueChanged(value) {
    if (Number.isNaN(Math.floor(value))) return;
    const integerPart = Math.floor(value).toString();
    const fractionPart = this.addPaddingZero(value.toString().split('.')[1] || '');

    this.integerPart = integerPart;
    this.fractionPart = fractionPart;
  }

  addPaddingZero(fractionPart: string) {
    let { radix = 2 } = this;
    if (radix < 0) {
      radix = 0;
    }

    if (fractionPart.length < radix) {
      fractionPart += '0'.repeat(radix - fractionPart.length);
    } else if (fractionPart.length > radix) {
      fractionPart = fractionPart.slice(0, radix);
    }
    return fractionPart;
  }

  componentWillLoad() {
    this.valueChanged(this.value);
    addShadowRootStyle.call(this);
  }

  render() {
    const { extClass = '', extStyle, label, prefix, suffix, fractionPart, integerPart, unit, radix } = this;
    return (
      <div class={`${extClass} ${join('price')}`} style={stringToAttrStyle(extStyle)} part={extClass}>
        <span class={join('price', 'label')}>{label}</span>
        {prefix && <span class={join('price', 'prefix')}>{prefix}</span>}
        <span class={join('price', 'unit')}>{unit}</span>
        <span class={join('price', 'integer')}>{integerPart}</span>
        {radix > 0 && <span class={join('price', 'fraction')}>.{fractionPart}</span>}
        {suffix && <span class={join('price', 'suffix')}>{suffix}</span>}
      </div>
    );
  }
}
