import { Component, Event, Host, EventEmitter, Element, h, Prop, State } from '@stencil/core';
import { JSXBase, Watch } from '@stencil/core/internal';
import { addShadowRootStyle } from '../common/utils';
import { handle, join } from '../common/utils/namespace';
import Graph from './graph';

@Component({
  tag: 'ti-sku-selector',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSkuSelector {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() skus = [];

  @Prop() specs = [];

  @Prop() value = '';

  @Prop() optionIds = [];

  // state

  @State() graph = new Graph([], []) as Graph;

  @State() allOptions = [];

  @State() disabledOptions = new Set<string>([]);

  @State() selectedOptions = new Set<string>([]);

  @State() soldoutOptions = new Set<string>([]);

  @State() specsViewModel = [] as any[];

  @State() displaySkuViewModel = {} as any;

  @State() selectedSkuId = this.value;

  @State() optionIdsToSpecIdMap = new Map() as Map<string, string>;

  // event

  @Event({ bubbles: false, composed: false }) tiChange: EventEmitter<{ value: Record<string, unknown> }>;

  @Event({ bubbles: false, composed: false }) tiOptionChange: EventEmitter;

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.makeOptionIdsToSpecIdMap(this.skus);
    this.makeGraph();
    this.makeSelectedOptionsByValue();
    this.makeSelectedOptionsByOptionIds();
    this.makeAllOptions();
  }

  @Watch('skus')
  makeOptionIdsToSpecIdMap(skus: any[]) {
    // 建立 map，用 specs optionId 的组合来反查 skuId
    const map = new Map();
    skus.forEach((s: any) => {
      map.set(s.specOptionIds.sort().join(','), s.skuId);
    });

    this.optionIdsToSpecIdMap = map;
  }

  @Watch('skus')
  @Watch('specs')
  makeGraph() {
    const { skus, specs } = this;
    const g = new Graph(specs, skus);
    this.graph = g;
  }

  @Watch('specs')
  makeAllOptions() {
    const { specs } = this;
    const allOptions = specs
      .map(s => s.options.map(opt => ({ ...opt, specId: s.specId })))
      .reduce((x, y) => [...x, ...y], []);
    this.allOptions = allOptions;
  }

  @Watch('value')
  makeSelectedOptionsByValue() {
    const { skus, value } = this;
    const defaultSku = skus.find(i => i.skuId === value);
    const selectedOptions = defaultSku?.specOptionIds || [];
    this.selectedOptions = new Set(selectedOptions);
  }

  @Watch('optionIds')
  makeSelectedOptionsByOptionIds() {
    const { optionIds, value } = this;
    if (!value) {
      if (Object.prototype.toString.call(optionIds) === '[object Array]' && optionIds.length > 0) {
        this.selectedOptions = new Set(optionIds);
      }
    }
  }

  @Watch('selectedOptions')
  makeOthersOptions() {
    const { selectedOptions } = this;
    let disabledOptions = new Set<string>();
    if (selectedOptions.size !== 0) {
      disabledOptions = new Set(
        [...selectedOptions]
          .map(i => [...(this.graph.nonConnectableEdges.get(i) || [])])
          .reduce((a, b) => [...a, ...b], []),
      );
    }

    const soldoutOptions = new Set(
      [...selectedOptions]
        .map((i: any) => [...(this.graph.soldoutEdges.get(i) || [])])
        .reduce((a, b) => [...a, ...b], []),
    );

    this.disabledOptions = disabledOptions;
    this.soldoutOptions = soldoutOptions;
    this.generateSpecsViewModel(selectedOptions, disabledOptions, soldoutOptions);

    this.triggerChange();
  }

  generateSpecsViewModel(selectedOptions, disabledOptions, soldoutOptions) {
    const { specs } = this;
    // 生成 specsViewModel
    if (specs.length === 0) {
      this.specsViewModel = [];
      return;
    }
    const viewModel = specs.map((s: any) => ({
      ...s,
      options: s.options.map((o: any) => ({
        ...o,
        isSelected: selectedOptions.has(o.optionId),
        isDisabled: disabledOptions.has(o.optionId),
        isSoldout: soldoutOptions.has(o.optionId),
      })),
    }));

    this.specsViewModel = viewModel;
  }

  triggerChange() {
    const { selectedOptions, specs } = this;
    let selectedSku = null;

    if (selectedOptions.size === specs.length) {
      const key = [...selectedOptions].sort().join(',');
      const selectedSkuId = this.optionIdsToSpecIdMap.get(key) || this.value;

      selectedSku = this.skus.find(x => x.skuId === selectedSkuId);
    }

    if (this.value !== selectedSku) {
      this.tiChange.emit({
        value: selectedSku,
      });
    }

    const options = this.allOptions.filter(x => selectedOptions.has(x.optionId));

    this.tiOptionChange.emit({
      optionIds: [...selectedOptions],
      options,
    });
  }

  getSelectedSiblingOptionId(optionId: string) {
    return [...this.graph.siblingsEdges.get(optionId)].find(x => this.selectedOptions.has(x) && x !== optionId);
  }

  onTapOptionHandler = event => {
    const { optionId } = event.target.dataset;
    if (this.disabledOptions.has(optionId)) return;
    // 仅多规格会触发该事件

    const toBeReplacedOptionId = this.getSelectedSiblingOptionId(optionId);
    let selectedOptions = [] as string[];

    if (toBeReplacedOptionId) {
      // replace 替换
      selectedOptions = [...[...this.selectedOptions].filter(x => x !== toBeReplacedOptionId), optionId];
    } else if (this.selectedOptions.has(optionId)) {
      // deselect 反选
      selectedOptions = [...this.selectedOptions].filter(x => x !== optionId);
    } else {
      // select 选择
      selectedOptions = [...this.selectedOptions, optionId];
    }

    this.selectedOptions = new Set(selectedOptions);
  };

  render() {
    const { specsViewModel } = this;

    return (
      <Host>
        <div class={join('sku-selector')}>
          <div class={handle('sku', 'spec')}>
            {specsViewModel.map(specItem => (
              <div class={handle('sku', 'spec-container')} key={specItem.specId}>
                <div class={handle('sku', 'spec-label')}>{specItem.label}</div>
                <div class={handle('sku', 'spec-option-list')}>
                  {specItem.options.map(specOption => (
                    <ti-tag
                      key={specOption.optionId}
                      variant="contained"
                      class={join('sku-spec-option', {
                        disabled: specOption.isDisabled,
                        selected: specOption.isSelected,
                      })}
                      onClick={this.onTapOptionHandler}
                      data-option-id={specOption.optionId}
                    >
                      {specOption.label}
                    </ti-tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Host>
    );
  }
}
