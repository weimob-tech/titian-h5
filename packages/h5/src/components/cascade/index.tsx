import { Component, h, Fragment, Prop, State, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle } from '../common/utils';
import { handle } from '../common/utils/namespace';
import Cascade, { CascadeFn, CascadeOption } from './cascade';

@Component({
  tag: 'ti-cascade',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiCascade {
  @Prop() title = '选择地址';

  @Prop() titlebar?: boolean = true;

  @Prop() options: { [key: string | number]: unknown }[] = [];

  @Prop() tabs: string[] = [];

  @Prop() active = 0;

  @Prop() cascade = 'children';

  @Prop() code = 'code';

  @Prop() label = 'label';

  @Prop() value: unknown[] = [];

  @Prop() extHeaderStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extTabStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() extOptionItemStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() getOptions?: CascadeFn;

  @State() columnList = [];

  @State() columnValueList = [];

  @State() last = 0;

  @Event({ bubbles: false, eventName: 'close', composed: false }) closeEvent!: EventEmitter<void>;

  @Event({ bubbles: false, eventName: 'change', composed: false }) changeEvent!: EventEmitter<{
    value: unknown[];
    options: CascadeOption[];
    active: number;
  }>;

  @Event({ bubbles: false, eventName: 'changeSwiper', composed: false }) changeSwiperEvent!: EventEmitter<{
    current: number;
    source: 'touch' | '';
  }>;

  cascadeHelper: Cascade;

  componentDidLoad() {
    this.createCascade();
  }

  async createCascade() {
    const { options, getOptions, cascade, active, code, value, tabs } = this;
    this.cascadeHelper = new Cascade({ options, getOptions, cascade, tabs });
    const data = await this.cascadeHelper.getData(active, code, value);
    Object.assign(this, data);
  }

  onSelect = async (event: MouseEvent) => {
    const { dataset } = event.currentTarget as HTMLElement;
    const index = Number(dataset.index);
    const { id } = dataset;
    const { columnList, code, columnValueList } = this;

    const data = await this.cascadeHelper.getNextData({
      columnList,
      columnValueList,
      index,
      code,
      id,
    });
    if (data) {
      Object.assign(this, data);
      const active = typeof data.active === 'number' ? data.active : this.active;
      const { value, options } = this.cascadeHelper.getResult({ columnValueList: data.columnValueList, code });
      this.changeEvent.emit({ value, options, active });
    }
  };

  onSelectTab = (event: MouseEvent) => {
    const { dataset } = event.currentTarget as HTMLElement;
    const active = Number(dataset.index);
    if (active + 1 > this.columnList.length) {
      return;
    }
    if (this.active === active) {
      return;
    }
    this.active = active;
    this.changeSwiperEvent.emit({ source: '', current: active });
  };

  onChangeSwiper = (event: CustomEvent<{ current: number; currentItemId: string; source: 'touch' | '' }>) => {
    const { source, current } = event.detail;
    if (source === 'touch') {
      this.active = current;
      this.changeSwiperEvent.emit({ source, current });
    }
  };

  onClose = () => {
    this.closeEvent.emit();
  };

  render() {
    const {
      title,
      titlebar,
      tabs,
      label,
      active,
      code,
      columnValueList,
      columnList,
      last,
      extTabStyle,
      extHeaderStyle,
      extOptionItemStyle,
    } = this;
    return (
      <>
        {titlebar ? <ti-popup-titlebar title={title} variant="cancel-only" onClose={this.onClose} /> : null}
        <ti-scroll-view
          scroll-x
          class={handle('cascade', ['header'])}
          scroll-into-view={`tab_${active}`}
          extVirtualStyle={{ 'align-items': 'center' }}
          style={stringToAttrStyle(extHeaderStyle)}
        >
          {tabs.map((item, index) => (
            <div
              aria-hidden="true"
              class={handle('cascade', [
                'tab',
                (columnValueList[index] || {})[label] ? 'selected' : '',
                active === index ? 'active' : '',
              ])}
              onClick={this.onSelectTab}
              data-index={index}
              id={`tab_${index}`}
              style={stringToAttrStyle(extTabStyle)}
            >
              {(columnValueList[index] || {})[label] || item}
            </div>
          ))}
        </ti-scroll-view>
        <ti-swiper current={active} sports onChange={this.onChangeSwiper}>
          {tabs.map((_, index) => {
            if (index > last) {
              return null;
            }
            return (
              <ti-swiper-item>
                <ti-scroll-view
                  scrollY
                  scroll-into-view={`opt_${index}_${(columnValueList[index] || {})[code]}`}
                  class={handle('cascade', ['content'])}
                >
                  {columnList[index]?.map(opt => (
                    <div
                      aria-hidden="true"
                      onClick={this.onSelect}
                      data-id={opt[code]}
                      id={`opt_${index}_${opt[code]}`}
                      data-index={index}
                      class={handle('cascade', ['item'])}
                      style={stringToAttrStyle(extOptionItemStyle)}
                    >
                      <div>{opt[label]}</div>
                      {(columnValueList[index] || {})[code] === opt[code] ? <ti-checkbox checked /> : null}
                    </div>
                  ))}
                </ti-scroll-view>
              </ti-swiper-item>
            );
          })}
        </ti-swiper>
      </>
    );
  }
}
