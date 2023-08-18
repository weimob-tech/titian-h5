/* eslint-disable prefer-const */
import { Component, h, Prop, Element, Event, EventEmitter, Watch, Fragment, State } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, isPlainObject, addShadowRootStyle, isString, getClientWidth } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getChildrenSelectorName } from '../common/utils/relation';
import addUnit from '../common/utils/suffix';

// const TABS_TARGET = '.titian-tabs-scroll';
// const TAB_TARGET = '.titian-tabs-nav-gap';
enum ETabsDivider {
  /** 细线分割 */
  LINE = 'line',

  /** 阴影分割 */
  SHADOW = 'shadow',

  /** 无分割 */
  DEFAULT = 'default',
}

enum ETabsVariant {
  /** 滑块风格 */
  BLOCK = 'block',

  /** 纯净型 */
  PURE = 'pure',

  /** 多行类型 */
  MULTI = 'multi',

  /** 日期类型 */
  DOUBLE = 'calendar',
}

export interface TiTabsOption {
  label?: string;
  description?: string;
  time?: string;
  tag?: string;
  date?: string;
}

function computedNavStyle(tabWidth: number, unit: string, gap: number) {
  unit = unit || 'rpx';
  const style = {
    '--tabs-tab-width': unit === 'rpx' ? addUnit(tabWidth) : tabWidth + unit,
    '--tabs-tab-gap': unit === 'rpx' ? addUnit(gap / 2) : gap / 2 + unit,
  };
  return style;
}

function computedMarkLeft(...param: [number, number, string, unknown[]]) {
  let [index, tabWidth, unit, translateList] = param;
  unit = unit || 'px';
  const left = `${(index + 1 / 2) * tabWidth}`;
  const style = {
    transform: unit === 'rpx' ? `translateX(${addUnit(left)})` : `translateX(${left}${unit})`,
  };
  // 在等间距模式下，不同tab间滑动距离不一样
  if (translateList.length > 0) {
    style.transform = ` translateX(${translateList[index]}px)`;
  }
  return style;
}

function computedIntoView(activeIndex: number, count: number) {
  let id = activeIndex - Number.parseInt(`${count / 2}`, 10);
  if (id < 0 || !count) {
    id = 0;
  }
  if (count === 2) {
    id = activeIndex;
  }
  return `item-${id}`;
}

function isCurrentDay(date: string) {
  const getDay = function (timestamp) {
    return Math.floor(timestamp / 86400000);
  };
  return getDay(new Date(date).getTime()) === getDay(Date.now());
}

const defaultProps = {
  count: 5,
  divider: ETabsDivider.DEFAULT,
  variant: ETabsVariant.PURE,
  activeTab: 0,
  tabWidth: 0,
  tabKey: 'label',
  focusUpdate: true,
  gap: -1,
  autoGap: true,
};
@Component({
  tag: 'ti-tabs',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTabs {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() tabClass = '';

  @Prop() tabTextActiveClass = '';

  @Prop() tabs: (string | TiTabsOption)[] = [];

  @Prop() disabledTabs: unknown[] = [];

  @Prop() count: number = defaultProps.count;

  @Prop() divider?: `${ETabsDivider}` = defaultProps.divider;

  @Prop() variant?: `${ETabsVariant}` = defaultProps.variant;

  @Prop() activeTab?: number | string = defaultProps.activeTab;

  @Prop() sticky?: boolean = false;

  @Prop() offsetTop = 0;

  @Prop() usePureCss?: boolean = false;

  @Prop() tabWidth?: number = defaultProps.tabWidth;

  @Prop() tabKey?: string = defaultProps.tabKey;

  @Prop() extClass?: string = '';

  @Prop() tabActiveClass?: string = '';

  @Prop() swiperClass?: string = '';

  @Prop() tabsClass?: string = '';

  @Prop() tabsMarkClass?: string = '';

  @Prop() tabTextClass?: string = '';

  @Prop() useSlot?: boolean = false;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() focusUpdate?: boolean = defaultProps.focusUpdate;

  @Prop() gap?: number = defaultProps.gap;

  @Prop() autoGap?: boolean = defaultProps.autoGap;

  @Prop() alias?: Record<string, string> = {};

  @Prop() asyncChange = false;

  @State() isReady = false;

  @State() translateList: unknown[] = [];

  @State() currentCount = 0;

  @State() tabsName: string[] = [];

  @State() tabsLength: number[] = [];

  @State() unit = '';

  @State() currentTabWidth = 0;

  @State() preTranslateX = 0;

  @State() activeIndex = 0;

  @Event({ eventName: 'change', composed: false }) changeEvent!: EventEmitter<{
    index: number;
    item: string | { label?: string };
  }>;

  @Event({ bubbles: false, composed: false }) tiClick!: EventEmitter<{
    index: number;
    item: string | { label?: string };
  }>;

  @Event({ bubbles: false, composed: false }) disabled!: EventEmitter<{
    index: number;
    item: string | { label?: string };
  }>;

  @Event({ bubbles: false, composed: false, eventName: 'fixed' }) fixedHandle: EventEmitter<{
    isFixed: boolean;
    top: number;
  }>;

  scrollBox!: HTMLElement;

  temp!: {
    count: number;
    tabs: unknown[];
  };

  @Watch('activeTab')
  upDateActiveIndex(activeTab) {
    const { tabs, tabKey, alias } = this;
    if (isString(activeTab)) {
      this.activeIndex = tabs.findIndex(el => activeTab === (isPlainObject(el) ? el[alias.label || tabKey] : el));
    } else {
      this.activeIndex = activeTab;
    }
  }

  @Watch('tabWidth')
  @Watch('gap')
  @Watch('tabs')
  updateTabWidth() {
    let { count } = this;
    if (this.tabs.length <= count && this.autoGap) {
      count = this.tabs.length;
    }
    this.setTabWidth(count);
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.upDateActiveIndex(this.activeTab);
  }

  componentDidLoad() {
    const { count = defaultProps.count, tabs } = this;
    this.temp = { count, tabs };
    this.update();
  }

  componentDidUpdate() {
    const { count = defaultProps.count, tabs } = this;
    if (this.temp.count !== count || this.temp.tabs !== tabs) {
      this.temp.count = count;
      this.temp.tabs = tabs;
      this.update();
    }
  }

  update() {
    const {
      tabs,
      tabKey = defaultProps.tabKey,
      autoGap = defaultProps.autoGap,
      focusUpdate = defaultProps.focusUpdate,
      alias,
    } = this;
    let { count = defaultProps.count, tabsLength = [] } = this;
    let tabsName = tabs;

    if (tabs.length > 0 && isPlainObject(tabs[0])) {
      tabsName = tabs.map((el: any) => el[alias.label || tabKey]);
    }

    if (focusUpdate || tabsLength.length !== tabsName.length) {
      tabsLength = tabsName.map((_: any, index: number) => index);
    }
    const nextFocusUpdate = tabsLength !== this.tabsLength;

    this.tabsName = tabsName as string[];
    if (nextFocusUpdate) {
      this.tabsLength = tabsLength;
    }
    if (tabs.length <= count && autoGap) {
      count = tabs.length;
    }
    raf(() =>
      raf(() => {
        this.setTabWidth(count);
      }),
    );
  }

  setTabWidth(count: number) {
    let currentCount = count;
    const windowWidth = getClientWidth();
    const dom = this.scrollBox.getBoundingClientRect();
    const scrollViewWidth = Math.min(dom.width, windowWidth) || windowWidth;
    let currentTabWidth = count > 0 ? scrollViewWidth / count : 0;
    const { gap = defaultProps.gap, tabWidth = defaultProps.tabWidth, autoGap = defaultProps.autoGap } = this;
    let unit = 'px';
    // 如果自定义了tab-width,则采用自定义宽度
    if (tabWidth > 0) {
      currentTabWidth = tabWidth;
      const widthPx = Math.floor((currentTabWidth * windowWidth) / 750);
      currentCount = Math.floor(scrollViewWidth / widthPx);
      currentCount = Math.max(currentCount, 3);
      unit = 'rpx';
      // 如果tab总宽度不够一屏，且采用autoGap，则采用平铺
      if (count && widthPx * count < scrollViewWidth && autoGap) {
        currentTabWidth = scrollViewWidth / count;
        currentCount = count;
        unit = 'px';
      }
    }
    if (gap < 0) {
      this.currentTabWidth = currentTabWidth;
      this.unit = unit;
      this.isReady = true;
      raf(() => (this.currentCount = currentCount));
      return;
    }
    const rect = getChildrenSelectorName({
      host: this.host,
      useSlot: false,
      selector: '.titian-tabs-nav-gap',
      relations: 'descendant', // 'parent' ,'ancestor',
    }).map(item => item.getBoundingClientRect());

    if (!rect || rect.length === 0) return;
    let translateList: number[] = [];
    currentCount = rect.length;
    let once = false;
    const tabTotalWidth = rect.reduce((p: number, c: { width: number }, index: number) => {
      const translate: number = p + c.width / 2;
      translateList.push(translate);
      const total = p + c.width;
      if (!once && total > scrollViewWidth) {
        currentCount = Math.max(index, 3);
        once = true;
      }
      return total;
    }, 0);
    // 如果tab总宽度不够一屏，且采用autoGap，则采用平铺
    let nextGap = gap;
    unit = 'rpx';
    if (autoGap && !once) {
      unit = 'px';
      currentCount = rect.length;
      const more = (scrollViewWidth - tabTotalWidth) / currentCount;
      // 微信内联样式rpx转px,进度丢失,3rpx -> 1px  1rpx -> 0.5px。所以用如下写法
      let gapPx = Math.floor(((gap / 2) * windowWidth) / 750) * 2;
      if (gap > 0) {
        gapPx = Math.max(1, gapPx);
      }
      nextGap = gapPx + more;
      translateList = translateList.map((el, index) => el + more * index + more / 2);
    }
    this.translateList = translateList;
    this.gap = nextGap;
    this.unit = unit;
    this.isReady = true;
    // 兼容当activeTab在屏幕外时，自动滑动到当前项
    raf(() => (this.currentCount = currentCount));
  }

  onClick = (event: MouseEvent) => {
    if (!(event.currentTarget instanceof HTMLDivElement)) {
      return;
    }
    const { index } = event.currentTarget.dataset as { index: string };
    const message = {
      index: Number(index),
      item: this.tabs[Number(index)],
    };
    this.tiClick.emit(message);
    if ((this.disabledTabs || []).includes(Number(index))) {
      this.disabled.emit(message);
      return;
    }
    if (Number(index) !== this.activeIndex && !this.asyncChange) {
      this.activeIndex = Number(index);
    }
    this.changeEvent.emit(message);
  };

  onChange = (event: CustomEvent<{ current: number }>) => {
    let { current } = event.detail;
    const { activeIndex = defaultProps.activeTab } = this;
    if (current === activeIndex) return;
    if ((this.disabledTabs || []).includes(current)) {
      // 跳过disabled的tab
      if (activeIndex < current) {
        current += 1;
        if (current > this.tabs.length - 1) {
          current = activeIndex;
        }
      } else if (activeIndex > current) {
        current -= 1;
        if (current < 0) {
          current = activeIndex;
        }
      }
    }
    this.activeIndex = current;
    this.changeEvent.emit({
      index: current,
      item: this.tabs[current],
    });
  };

  onFixed = event => {
    this.fixedHandle.emit(event.detail);
  };

  render() {
    const {
      extStyle,
      tabs,
      currentTabWidth,
      unit,
      useSlot,
      activeIndex,
      divider = defaultProps.divider,
      variant = defaultProps.variant,
      gap = defaultProps.gap,
      isReady,
      disabledTabs,
      extClass = '',
      tabActiveClass = '',
      swiperClass = '',
      tabsClass = '',
      tabsMarkClass = '',
      tabTextClass = '',
      translateList,
      tabsLength,
      currentCount,
      sticky,
      usePureCss,
      offsetTop,
      tabKey,
      alias,
      tabClass,
      tabTextActiveClass,
    } = this;
    return (
      <div class={`${join('tabs')} ${extClass}`} style={stringToAttrStyle(extStyle)} part={extClass}>
        <ti-sticky disabled={!sticky} usePureCss={usePureCss} offsetTop={offsetTop} onFixed={this.onFixed}>
          <div
            class={handle('tabs-scroll-container', [
              divider === ETabsDivider.SHADOW ? ETabsDivider.SHADOW : undefined,
              divider === ETabsDivider.LINE ? ETabsDivider.LINE : undefined,
            ])}
          >
            <ti-scroll-view
              extClass={`${tabsClass}`}
              extCss={this.extCss}
              scroll-x
              scroll-into-view={computedIntoView(activeIndex, currentCount)}
              exportparts={tabsClass}
              class={handle('tabs-scroll', [{ show: isReady }, variant])}
            >
              <div
                class={handle('tabs-navs', [{ show: isReady }, variant])}
                style={computedNavStyle(currentTabWidth, unit, gap)}
                ref={ref => {
                  if (ref) {
                    this.scrollBox = ref;
                  }
                }}
              >
                {tabs.map((tab, index) => (
                  <div
                    data-index={index}
                    onClick={this.onClick}
                    aria-hidden="true"
                    id={`item-${index}`}
                    class={`${join('tabs-nav', [
                      index,
                      variant,
                      { active: index === activeIndex },
                      { disabled: disabledTabs.includes(index) },
                      { gap: gap >= 0 },
                    ])}  ${index === activeIndex ? tabActiveClass : ''} ${tabClass}`}
                    part={`${index === activeIndex ? tabActiveClass : ''} ${tabClass}`}
                  >
                    <div
                      class={`${join('tabs-text-label')} ${tabTextClass} ${
                        index === activeIndex ? tabTextActiveClass : ''
                      }`}
                      part={`${tabTextClass} ${index === activeIndex ? tabTextActiveClass : ''}`}
                    >
                      {tab[alias.label || tabKey] || tab}
                    </div>
                    {typeof tab !== 'string' && (
                      <>
                        {tab[alias.description || 'description'] && (
                          <div class={`${join('tabs-text-description')}`}>
                            {tab[alias.description || 'description']}
                          </div>
                        )}
                        {tab[alias.date || 'date'] &&
                        index !== activeIndex &&
                        isCurrentDay(tab[alias.date || 'date']) ? (
                          <div class={`${join('tabs-text-tag', ['now'])}`}>当前</div>
                        ) : (
                          tab[alias.tag || 'tag'] &&
                          index !== activeIndex && (
                            <div class={`${join('tabs-text-tag')}`}>{tab[alias.tag || 'tag']}</div>
                          )
                        )}
                      </>
                    )}
                  </div>
                ))}
                <div
                  class={`${handle('tabs-mark', [variant])} ${tabsMarkClass}`}
                  part={tabsMarkClass}
                  style={computedMarkLeft(activeIndex, currentTabWidth, unit, translateList)}
                />
              </div>
            </ti-scroll-view>
          </div>
        </ti-sticky>

        {useSlot ? (
          <ti-swiper
            extClass={`${swiperClass}`}
            extCss={this.extCss}
            current={activeIndex}
            onChange={this.onChange}
            exportparts={swiperClass}
          >
            {tabsLength.map((_, index) => (
              <ti-swiper-item>
                {!disabledTabs.includes(index) ? <slot name={`tab-content-${index}`} /> : null}
              </ti-swiper-item>
            ))}
          </ti-swiper>
        ) : null}
      </div>
    );
  }
}
