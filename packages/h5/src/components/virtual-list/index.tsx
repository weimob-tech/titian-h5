import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { JSXBase, Method, State } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { handle, join } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getScroll } from '../common/utils/scroll';

@Component({
  tag: 'ti-virtual-list',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiVirtualList implements BasicComponentAbstract {
  @Prop() extClass = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() itemHeight = 50;

  @Prop() containerHeight = document.documentElement.clientHeight || document.body.clientHeight || 667;

  @State() listData = [];

  @State() visibleData: any[] = [];

  @State() renderItem: (item: any, index: number) => Element | string = () => null;

  @State() startOffset = 0;

  @Event() load!: EventEmitter<never>;

  @Method()
  async setRenderItem(renderItem: (item: any) => Element | string) {
    this.renderItem = renderItem;
  }

  @Method()
  setListData(listData: any[]) {
    this.listData = listData;
    const scrollTop = getScroll(this.containerRef, true);
    this.updateVisibleData(scrollTop);
  }

  prevStart = 0;

  prevEnd = 0;

  private containerRef: HTMLElement = null;

  updateVisibleData(scrollTop = 0) {
    const start = Math.floor(scrollTop / this.itemHeight);
    const visibleItemCnt = Math.ceil(this.containerHeight / this.itemHeight);
    const end = Math.min(start + visibleItemCnt, this.listData.length) + 1;

    if (this.prevStart !== start || this.prevEnd !== end) {
      this.visibleData = this.listData.slice(start, end);
      this.prevStart = start;
      this.prevEnd = end;
      this.startOffset = start * this.itemHeight;
    }

    if (start + visibleItemCnt >= this.listData.length) {
      this.load.emit();
    }
  }

  handleScroll(e) {
    const scrollTop = getScroll(e.target, true);
    this.updateVisibleData(scrollTop);
  }

  componentDidLoad(): void {
    this.handleScroll(this.containerRef);
  }

  disconnectedCallback(): void {
    // @ts-ignore
    this.handleScroll?.cancel();
  }

  renderList() {
    const list = this.visibleData.map((item, index) => this.renderItem(item, index));
    if (this.containerRef) {
      raf(() => {
        this.containerRef.innerHTML = list.join('\n');
      });
    }
  }

  render() {
    return (
      <div
        class={join('virtual-list')}
        style={{ height: `${this.containerHeight}px` }}
        onScroll={this.handleScroll.bind(this)}
      >
        <div style={{ height: `${this.listData.length * this.itemHeight}px` }} />
        <div
          class={handle('virtual-list', 'container')}
          ref={e => (this.containerRef = e)}
          style={{ transform: `translate3d(0, ${this.startOffset}px, 0)` }}
        >
          {this.renderList()}
        </div>
      </div>
    );
  }
}
