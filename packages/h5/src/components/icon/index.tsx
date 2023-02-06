import { Component, h, Host, Prop } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { store } from '../common/basic/store';
import { stringToAttrStyle } from '../common/utils';
import { join, handle, PREFIX } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

function completedStyles(data) {
  const style = [];
  if (data.extStyle) {
    if (typeof data.extStyle === 'string') {
      style.push(data.extStyle);
    } else {
      Object.keys(data.extStyle).forEach(key => {
        style.push(`${key}:${data.extStyle[key]}`);
      });
    }
  }
  if (data.rotate) {
    const REGEXP = /^-?[0-9]+(.[0-9]+)?$/;
    if (REGEXP.test(`${data.rotate}`)) {
      data.rotate += 'deg';
    }
    style.push(`transform:rotate(${data.rotate})`);
  }
  if (data.size) {
    style.push(`font-size:${addUnit(data.size)}`);
  }
  if (data.iconStyle && ['lovely', 'popular'].indexOf(data.iconStyle) !== -1) {
    style.push(`--icon-family:${handle('icon', [data.iconStyle])},${join('icon')}`);
  }
  if (data.color) {
    style.push(`color:${data.color}`);
  }
  if (data.prefix) {
    style.push(`--protected-icon-family: ${data.prefix}`);
  }
  return style.join(';');
}
function completedClasses(data) {
  let className: string | string[] = '';
  const root = join('icon-base');
  let fontFamily = '';

  className = [root, join('icon')];
  if (data.prefix) {
    fontFamily = data.prefix;
  } else {
    fontFamily = join('icon');
  }
  className.push(fontFamily);

  if (data.name) {
    className.push(fontFamily + data.hyphen + data.name);
  }

  if (data.spin) {
    className.push(`${root}-spin`);
  }
  return className.join(' ');
}

const defaultIconsUrl = `
@font-face {
  font-family: ${join('icon')}; /* Project id 2512151 */
  src: url('//at.alicdn.com/t/c/font_2512151_v1crhlxl0k.woff2?t=1670393250377') format('woff2'),
    url('//at.alicdn.com/t/c/font_2512151_v1crhlxl0k.woff?t=1670393250377') format('woff'),
    url('//at.alicdn.com/t/c/font_2512151_v1crhlxl0k.ttf?t=1670393250377') format('truetype');
}

@font-face {
  font-family: ${join('icon-lovely')}; /* Project id 2914379 */
  src: url('//at.alicdn.com/t/c/font_2914379_abca1akhv1o.woff2?t=1661930836565') format('woff2'),
    url('//at.alicdn.com/t/c/font_2914379_abca1akhv1o.woff?t=1661930836565') format('woff'),
    url('//at.alicdn.com/t/c/font_2914379_abca1akhv1o.ttf?t=1661930836565') format('truetype');
}

@font-face {
  font-family:${join('icon-popular')}; /* Project id 2914381 */
  src: url('//at.alicdn.com/t/c/font_2914381_3wmammyd5bl.woff2?t=1661930832349') format('woff2'),
    url('//at.alicdn.com/t/c/font_2914381_3wmammyd5bl.woff?t=1661930832349') format('woff'),
    url('//at.alicdn.com/t/c/font_2914381_3wmammyd5bl.ttf?t=1661930832349') format('truetype');
}
`;
@Component({
  tag: 'ti-icon',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
})
export class TiIcon {
  @Prop() extClass?: string;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() name?: string;

  @Prop() color?: string;

  @Prop() size?: string | number;

  @Prop() spin?: boolean;

  @Prop() rotate?: string | number;

  @Prop() prefix: string;

  @Prop() hyphen?: string = '-';

  @Prop() iconStyle?: string;

  setIconStyle(prefix: string, fontFace: string) {
    if (!document.getElementById(prefix)) {
      const head = document.head || document.getElementsByTagName('head')[0];
      const style = document.createElement('style');
      style.id = prefix;
      style.innerText = fontFace;
      head.appendChild(style);
    }
  }

  componentWillLoad() {
    if (store.get('enableTitianIcon')) {
      const prefix = this.prefix || store.get('iconClassPrefix') || PREFIX;
      this.setIconStyle(prefix, defaultIconsUrl);
    }
  }

  render() {
    const { prefix, name, spin, hyphen, extStyle, rotate, size, color, iconStyle, extClass } = this;
    const className = `${completedClasses({ prefix, name, spin, hyphen })} ${extClass || ''}` || '';
    const style = completedStyles({ extStyle, rotate, size, color, iconStyle, prefix });
    return <Host class={className} style={stringToAttrStyle(style)} />;
  }
}
