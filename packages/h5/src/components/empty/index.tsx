import { Component, h, Fragment, Prop, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';

const DefaultFileUrl = 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/145/searchwithnoresult.png';

@Component({
  tag: 'ti-empty',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiEmpty {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() image?: string = DefaultFileUrl;

  @Prop() title = '';

  @Prop() subTitle?: string;

  @Prop() size?: string | number = 'medium';

  @Prop() useImageSlot?: boolean;

  @Prop() useTitleSlot?: boolean;

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { useImageSlot, image, extStyle, title = '', size, subTitle, useTitleSlot, extClass } = this;
    const className = `${namespace.join('empty')} ${namespace.handle('empty', [
      size === 'medium' ? 'medium' : 'big',
    ])} ${extClass}`;
    return (
      <div class={className} style={stringToAttrStyle(extStyle)} part={extClass}>
        {useImageSlot ? (
          <slot name="image" />
        ) : (
          <img class={namespace.handle('empty', ['image'])} src={image} alt={image} />
        )}
        {useTitleSlot ? (
          <slot name="title" />
        ) : (
          <>
            {title ? <div class={namespace.handle('empty', ['title'])}>{title}</div> : null}
            {subTitle ? <div class={namespace.handle('empty', ['sub-title'])}>{subTitle}</div> : null}
          </>
        )}
        <slot name="bottom" />
      </div>
    );
  }
}
