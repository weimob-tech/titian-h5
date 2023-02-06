/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Component, h, Prop, Method, Element, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import {
  isDisabled,
  isPlainObject,
  setStyle,
  stringToAttrStyle,
  nextAvailable,
  prevAvailable,
  addShadowRootStyle,
} from '../common/utils';
import Movement from '../common/utils/movement';
import { handle } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getParent } from '../common/utils/relation';

function handleText(value: unknown, key: string) {
  if (!value) {
    return '';
  }
  if (typeof value === 'string') {
    return value;
  }
  if (isPlainObject(value)) {
    return value[key];
  }
  return value;
}
function isAvailable(list, index) {
  return list[index] && !isDisabled(list[index]);
}

const defaultProps = {
  top: 108,
  label: 'label',
};
@Component({
  tag: 'ti-picker-column',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiPickerColumn {
  @Element() host!: HTMLTiPickerColumnElement;

  @Prop() extCss = '';

  @Prop() label?: string = defaultProps.label;

  @Prop() top?: number = defaultProps.top;

  @Prop() columns: unknown[] = [];

  @Prop() colAlias = '';

  @Prop() height?: number;

  @Prop() row?: number;

  @Prop() useRowIndex?: boolean;

  @Prop() rowAlias?: string | number = '';

  @Prop() sports?: boolean = false;

  @Prop() value: unknown;

  @Prop() useSelectSlot?: boolean = false;

  @Prop() extStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  @Prop() extOptionItemClass?: string = '';

  @Prop() extClass?: string = '';

  @Event({ bubbles: false, eventName: 'select', composed: false }) selectEvent!: EventEmitter<{
    rowIndex: number;
    colAlias: string | number;
  }>;

  @Event({ bubbles: false, eventName: 'reachTop', composed: false }) reachTopEvent!: EventEmitter<{
    rowIndex: number;
    colAlias: number | string;
  }>;

  @Event({ bubbles: false, eventName: 'reachBottom', composed: false }) reachBottomEvent!: EventEmitter<{
    rowIndex: number;
    colAlias: number | string;
  }>;

  temp: { [key: string]: unknown } = {};

  box!: HTMLElement;

  val!: unknown;

  innerColumns!: unknown[];

  movement: Movement;

  get parent() {
    return getParent({
      host: this.host,
      tag: 'ti-picker',
      relations: 'ancestor', // 'parent' ,'ancestor',
    });
  }

  @Method()
  async calcDistance({ columns, value }: { columns: unknown[]; value: unknown }) {
    const [parent, useSlot] = this.parent;
    if (!useSlot || !parent) {
      return;
    }
    const { top, height } = await parent.getImperativeHandle();
    const { rowAlias, colAlias, useRowIndex } = this;
    if (!colAlias) {
      throw new Error('colAlias is required');
    }
    let row = 0;
    if (rowAlias === null || typeof rowAlias === 'undefined') {
      if (useRowIndex) {
        row = columns.findIndex((item, idx) => idx === value && !isDisabled(item));
      } else {
        row = columns.findIndex(item => item === value && !isDisabled(item));
      }
    } else {
      row = columns.findIndex(item => (item as { [key: string]: unknown })[rowAlias] === value && !isDisabled(item));
    }
    if (row === -1) {
      row = columns.findIndex(item => !isDisabled(item));
    }
    let resetValue = value;
    if (rowAlias === null || typeof rowAlias === 'undefined') {
      if (useRowIndex) {
        resetValue = row;
      } else {
        resetValue = columns[row];
      }
    } else {
      resetValue = (columns[row] as { [key: string]: unknown })[rowAlias];
    }
    parent.updateColumn(colAlias, {
      value: resetValue,
      options: columns[row],
    });
    this.val = resetValue;
    // this.insideVal = resetValue;
    this.top = top;
    this.row = row;
    this.height = height;
  }

  onClick = (event: MouseEvent) => {
    event.stopPropagation();
    if (event.currentTarget instanceof HTMLDivElement) {
      const { dataset } = event.currentTarget;
      const { columns, row } = this;
      const index = Number(dataset.row);
      if (isDisabled(columns[index])) {
        return;
      }
      if (row === index) {
        return;
      }
      this.row = index;
      this.onSelect({ rowIndex: index, colAlias: this.colAlias });
    }
  };

  connectedCallback() {
    this.movement = new Movement({
      box: this.host,
      vertical: true,
      touchstart: this.touchstart,
      touchmove: this.touchmove,
      touchend: this.touchend,
      touchcancel: this.touchend,
    });
  }

  componentDidLoad() {
    this.temp.columns = this.columns;
    this.temp.value = this.value;
    this.calcDistance({ columns: this.columns, value: this.value });
  }

  componentDidUpdate() {
    const { value: outsidevalue, columns } = this;
    if (this.temp.columns === columns && this.temp.value === outsidevalue) {
      return;
    }
    this.temp.columns = this.columns;
    this.temp.value = this.value;
    if (this.val !== outsidevalue || this.innerColumns !== columns) {
      this.innerColumns = columns;
      this.val = outsidevalue;
      this.calcDistance({ value: this.val, columns: this.innerColumns });
    }
  }

  disconnectedCallback() {
    this.movement?.destroy();
  }

  touchstart = (event: TouchEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.temp.transformY = this.height * this.row * -1;
    setStyle(this.box, {
      'transition-duration': null,
    } as unknown as CSSStyleDeclaration);
  };

  touchmove = (event: TouchEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    setStyle(this.box, {
      transform: `translate3d(0, ${(this.temp.transformY as number) + this.movement.move.y}px, 0)`,
    });
  };

  touchend = (event: TouchEvent) => {
    event.stopImmediatePropagation();
    event.stopPropagation();
    const number = (this.temp.transformY as number) + this.movement.move.y;
    const { row, height = 0, columns, colAlias } = this;
    const size = columns.length;
    let total = 0;
    if (number > 0) {
      total = 0;
    } else if (Math.abs(number / height) > size - 1) {
      total = (size - 1) * height * -1;
    } else {
      total = Number(Math.round(number / height)) * height;
    }

    let curRow = Math.abs(total / height);

    let isTop = false;
    let isBottom = false;
    const first = columns.findIndex(item => !isDisabled(item));
    const last = Math.max.apply(
      null,
      columns.map((item, index) => (!isDisabled(item) ? index : -1)),
    );
    if (this.movement.isTop()) {
      isBottom = row === last;
    }
    if (this.movement.isBottom()) {
      isTop = row === first;
    }
    if (!isAvailable(columns, curRow)) {
      let available = -1;
      if (this.movement.isTop()) {
        // 是否到底
        available = nextAvailable({
          start: row,
          end: curRow,
          list: columns,
          fn: isAvailable,
        });
      }
      if (this.movement.isBottom()) {
        // 是否到顶
        available = prevAvailable({
          start: row,
          end: curRow,
          list: columns,
          fn: isAvailable,
        });
      }
      curRow = available === -1 ? row : available;
      total = curRow * height * -1;
    }
    setStyle(this.box, {
      'transform': `translate3d(0, ${total}px, 0)`,
      'transition-duration': '200ms',
    } as unknown as CSSStyleDeclaration);
    if (row !== curRow) {
      this.onSelect({ rowIndex: curRow || 0, colAlias });
    } else if (isTop || isBottom) {
      this.synchronous({
        isTop,
        isBottom,
        rowIndex: curRow || 0,
        colAlias,
      });
    }
    raf(() => {
      this.row = curRow;
    });
  };

  async onSelect({ rowIndex, colAlias }: { rowIndex: number; colAlias: string | number }) {
    const [parent, useSlot] = this.parent;
    if (!parent) {
      return;
    }
    if (!useSlot) {
      this.selectEvent.emit({ rowIndex, colAlias });
      return;
    }
    const { rowAlias, useRowIndex, columns } = this;
    if (rowAlias === null || typeof rowAlias === 'undefined') {
      if (useRowIndex) {
        this.val = rowIndex;
      } else {
        this.val = columns[rowIndex];
      }
    } else {
      this.val = (columns[rowIndex] as { [key: string]: unknown })[rowAlias];
    }
    // this.insideVal = this.val;
    this.row = rowIndex;
    const { children } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    parent.updateColumn(
      colAlias,
      { value: this.val, options: columns[rowIndex], colIndex: index, rowAlias, rowIndex },
      true,
    );
  }

  async synchronous({
    isTop,
    isBottom,
    rowIndex,
    colAlias,
  }: {
    isTop?: boolean;
    isBottom?: boolean;
    rowIndex: number;
    colAlias: string | number;
  }) {
    const [parent, useSlot] = this.parent;
    if (!parent) {
      return;
    }
    if (!useSlot) {
      if (isTop) {
        this.reachTopEvent.emit({ rowIndex, colAlias });
        return;
      }
      if (isBottom) {
        this.reachBottomEvent.emit({ rowIndex, colAlias });
        return;
      }
      return;
    }
    const { children } = await parent.getImperativeHandle();
    const index = children.indexOf(this.host);
    if (isTop) {
      parent.onReachTop({
        detail: { rowIndex, colAlias },
        target: { dataset: { colIndex: index } },
      } as unknown as CustomEvent<{ rowIndex: number; colAlias: number | string }>);
    }
    if (isBottom) {
      parent.onReachBottom({
        detail: { rowIndex, colAlias },
        target: { dataset: { colIndex: index } },
      } as unknown as CustomEvent<{ rowIndex: number; colAlias: number | string }>);
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const {
      columns,
      sports,
      row,
      top = defaultProps.top,
      height,
      label,
      extStyle,
      extClass,
      extOptionItemClass,
      useSelectSlot,
    } = this;
    return (
      <div
        class={`${handle('picker-column', ['item-box'])} ${extClass}`}
        part={`${extClass}`}
        style={{
          ...stringToAttrStyle(extStyle),
          top: `${top}px`,
          transform: `translate3d(0px, ${-1 * height * row}px, 0px)`,
          ...(sports ? { 'transition-duration': '200ms' } : {}),
        }}
        ref={box => {
          if (box) {
            this.box = box;
          }
        }}
      >
        {columns.map((item, index) => (
          <div
            class={`${handle('picker-column', ['item', isDisabled(item) ? 'item-disabled' : ''])} ${handle(
              'picker-column',
              [row === index ? 'item-selected' : ''],
            )} ${extOptionItemClass}`}
            part={`${extOptionItemClass}`}
            style={{ height: `${height}px` }}
            onClick={this.onClick}
            aria-hidden="true"
            data-row={index}
            key={`${item}`}
          >
            {row === index && useSelectSlot ? <slot name="select" /> : handleText(item, label)}
          </div>
        ))}
      </div>
    );
  }
}
