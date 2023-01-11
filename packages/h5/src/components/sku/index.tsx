import { Component, Event, Host, EventEmitter, Element, h, Prop, State } from '@stencil/core';
import { JSXBase, Watch } from '@stencil/core/internal';
import { addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';
import { $tiToast } from '../toast/toast';

@Component({
  tag: 'ti-sku',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSku {
  @Element() host: HTMLElement;

  previewRef!: HTMLTiPreviewElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() skus = [];

  @Prop() specs = [];

  @Prop() value = '';

  @Prop() defaultDispayInfo = {};

  @Prop() priceUnit = '';

  @Prop() hasSelectedSpecsText = true;

  @Prop() hasQuantityEditor = true;

  // state

  @State() skuCountMap = new Map() as Map<string, number>;

  @State() selectedOptionIds = [] as string[];

  @State() selectedOptions = [] as object[];

  @State() displaySkuViewModel = {} as any;

  @State() selectedSku = null as any;

  @State() innerCount = 0;

  @State() maxCount = 0;

  @State() specImgEnable = false;

  @State() specImgEnabledOptions = [];

  @State() previewImagesData = [];

  @State() selectedSkuId: string | undefined = this.value;

  @State() selectedOptionId: string | undefined = undefined;

  @State() currentPreviewIndex = 0;

  // event
  @Event({ bubbles: false, composed: false }) tiChange: EventEmitter;

  componentWillLoad() {
    addShadowRootStyle.call(this);
    const { skus } = this;
    this.generateSpecImgEnable(this.specs);
    this.generateSkuCountMap(skus);
    this.generateDisplaySkuViewModel();
  }

  @Watch('specs')
  generateSpecImgEnable(specs: any[]) {
    this.specImgEnable = specs.some(e => e.specImgEnable);
    for (let i = 0; i < specs.length; i += 1) {
      if (specs[i].specImgEnable) {
        this.specImgEnable = true;
        this.specImgEnabledOptions = specs[i].options;
        return;
      }
    }
  }

  generatePreviewData() {
    if (this.specImgEnable) {
      // from specs
      this.previewImagesData = this.specImgEnabledOptions.map(s => ({
        path: s.imageUrl,
        fileType: 'image',
      }));
    } else {
      this.previewImagesData = this.skus.map(s => ({
        path: s.imageUrl,
        fileType: 'image',
      }));
    }
  }

  @Watch('skus')
  generateSkuCountMap(skus: any[]) {
    // 建立 map，用 specs optionId 的组合来反查 skuId
    const skuCountMap = new Map();
    skus.forEach((s: any) => {
      skuCountMap.set(s.skuId, s.initCount);
    });

    this.skuCountMap = skuCountMap;
  }

  @Watch('selectedSku')
  @Watch('selectedOptions')
  generateDisplaySkuViewModel() {
    const { selectedSku, selectedOptions } = this;

    let displayVM = this.defaultDispayInfo as any;
    const { specs } = this;
    let { stock, maxLimitBuy } = this.defaultDispayInfo as any;

    if (selectedSku === null) {
      displayVM = this.defaultDispayInfo;
    } else {
      displayVM = selectedSku;
      stock = displayVM?.stock;
      maxLimitBuy = displayVM?.maxLimitBuy;
    }

    const vm = {
      ...displayVM,
      stockText: '',
      specsText: '',
      priceUnit: this.priceUnit,
      hasSelectedSpecsText: this.hasSelectedSpecsText,
    };
    vm.stockText = `库存：${displayVM?.stock}件`;

    if (specs.length > 0) {
      if (selectedSku !== null) {
        vm.specsText = `已选：${displayVM?.specOptionDesc.join('/')}`;
      } else if (selectedOptions.length > 0) {
        const text = selectedOptions.map((i: any) => i.label).join('/');
        vm.specsText = `已选：${text}`;
      } else if (selectedOptions.length === 0) {
        const text = specs.map((s: any) => s.label).join('/');
        vm.specsText = `请选择：${text}`;
      }
    }

    const innerCount = selectedSku ? this.skuCountMap.get(selectedSku.skuId) : 1;

    this.innerCount = innerCount;
    this.maxCount = maxLimitBuy || stock;
    this.displaySkuViewModel = vm;
  }

  private getToastText() {
    const { specs, selectedOptionIds } = this;
    const unselected = specs.filter(s => !s.options.find((x: any) => selectedOptionIds.includes(x.optionId)));
    if (unselected.length) {
      const text = unselected.map((i: any) => i.label).join('/');
      return text;
    }
    return '';
  }

  private onCountChange = event => {
    let value = event.detail;

    const { selectedSku, defaultDispayInfo } = this;
    let { stock } = defaultDispayInfo as any;
    if (selectedSku !== null) {
      stock = selectedSku.stock;
    } else {
      const text = this.getToastText();
      $tiToast.info(`请选择 ${text}`);
      return;
    }

    if (value > stock) {
      value = stock;
    }
    if (value < 1) {
      value = 1;
    }

    if (selectedSku !== null) {
      this.skuCountMap.set(selectedSku.skuId, value);
    }

    this.innerCount = value;
  };

  onTiChange = event => {
    const { value } = event.detail;
    this.selectedSku = value;
    this.selectedSkuId = value?.skuId;
  };

  onTiOptionChange = event => {
    const { options, optionIds } = event.detail;
    this.selectedOptions = options;
    this.selectedOptionIds = optionIds;
  };

  onClickGoodCardImage = () => {
    console.log('onClickGoodCardImage', this.previewImagesData);
    this.generatePreviewData();
    this.previewRef.show(this.previewImagesData, 0);
  };

  onPreviewChanged = event => {
    const { current } = event.detail;
    this.currentPreviewIndex = current;
    console.log('onPreviewChanged', event);
  };

  render() {
    const { displaySkuViewModel, innerCount, maxCount, hasQuantityEditor } = this;

    return (
      <Host>
        <div class={join('sku')}>
          <ti-goods-card onClickImage={this.onClickGoodCardImage} goodsData={displaySkuViewModel} />

          <ti-scroll-view class={handle('sku', 'scroll-view')} scroll-y>
            <div class={handle('sku', 'container')}>
              <ti-sku-selector
                skus={this.skus}
                specs={this.specs}
                value={this.selectedOptionId}
                onTiChange={this.onTiChange}
                onTiOptionChange={this.onTiOptionChange}
              />

              {hasQuantityEditor && (
                <div class={handle('sku', 'quantity')}>
                  <div class={handle('sku', 'quantity-label')}>数量</div>
                  <ti-input-number
                    value={innerCount}
                    max={maxCount}
                    min={1}
                    size="big"
                    async-change
                    onChange={this.onCountChange}
                    ext-class={handle('sku', 'quantity-number')}
                  />
                </div>
              )}
            </div>
            <slot />
          </ti-scroll-view>
        </div>

        <ti-preview
          onChange={this.onPreviewChanged}
          ref={preview => {
            if (preview) {
              this.previewRef = preview;
            }
          }}
        />
      </Host>
    );
  }
}
