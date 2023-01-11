import { Component, Element, h, Prop, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { addShadowRootStyle } from '../common/utils';
import { join } from '../common/utils/namespace';

export interface IGoodsCart {
  name: string;
  title: string;
  imageUrl: string;
  priceUnit: string;
  price: number;
  pricePrefix: string;
  pricePostfix: string;
  priceLabel: string;
  hasSubPrice: boolean;
  subPriceLabel: string;
  subPrice: number;
  stockText: string;
  specsText: string;
  hasSelectedSpecsText: boolean;
}

@Component({
  tag: 'ti-goods-card',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiGoodsCard {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() goodsData: IGoodsCart;

  @Event({ bubbles: false, composed: false }) clickImage: EventEmitter<never>;

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  clickImageHandler = () => {
    this.clickImage.emit();
  };

  render() {
    const { goodsData } = this;
    return (
      <div class={join('goods')}>
        <div class={join('goods-left')}>
          <ti-image
            onClick={this.clickImageHandler}
            width="180"
            height="180"
            radius="12"
            mode="aspectFill"
            use-global-style
            src={goodsData?.imageUrl}
          />
        </div>
        <div class={join('goods-right')}>
          <div class={join('goods-title')}>{goodsData?.title}</div>
          <div class={join('goods-price')}>
            <ti-price
              unit={goodsData.priceUnit}
              prefix={goodsData?.pricePrefix}
              suffix={goodsData?.pricePostfix}
              label={goodsData?.priceLabel}
              value={goodsData?.price}
            />
            <slot name="price-extra" />
          </div>
          {goodsData?.hasSubPrice && (
            <div class={join('goods-subprice')}>
              <ti-price
                unit={goodsData.priceUnit}
                prefix={goodsData?.pricePrefix}
                suffix={goodsData?.pricePostfix}
                label={goodsData?.subPriceLabel}
                value={goodsData?.subPrice}
              />
            </div>
          )}
          <div class={join('goods-stock')}>{goodsData?.stockText}</div>
          {goodsData.hasSelectedSpecsText && <div class={join('goods-selected')}>{goodsData?.specsText}</div>}
        </div>
      </div>
    );
  }
}
