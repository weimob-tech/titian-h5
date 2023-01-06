import { Component, Element, Prop, h, Method, State, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { stringToAttrStyle, getResponsivePixel, addShadowRootStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';
import { getChildren } from '../common/utils/relation';
import { PickerColumn } from './const';
import Picker from './picker';

const VISIBLEITEMCOUNT = 3;

const defaultProps = {
  label: 'label',
  optionItemHeight: 108,
  titlebar: true,
  title: '标题',
  confirmText: '确定',
  cancelText: '取消',
  cascade: 'children',
};
@Component({
  tag: 'ti-picker',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiPicker<T extends string = 'children'> {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() useRowIndex = false;

  @Prop() options = [];

  @Prop() value = [];

  @Prop() rowAlias?: string | number;

  @Prop() label?: string = defaultProps.label;

  @Prop() visibleItemCount?: number;

  @Prop() loading = false;

  @Prop() optionItemHeight: string | number = defaultProps.optionItemHeight;

  @Prop() titlebar?: boolean = defaultProps.titlebar;

  @Prop() title = defaultProps.title;

  @Prop() subTitle = '';

  @Prop() sports = false;

  @Prop() cascade: T = defaultProps.cascade as T;

  @Prop() confirmText?: string = defaultProps.confirmText;

  @Prop() cancelText?: string = defaultProps.cancelText;

  @Prop() extStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  @Prop() extOptionStyle?: JSXBase.HTMLAttributes<Record<string, unknown>>['style'] | string;

  @Prop() extHairlineClass?: string = '';

  @Prop() extMaskClass?: string = '';

  @Prop() extOptionClass?: string = '';

  @Prop() extOptionItemClass?: string = '';

  @Prop() extClass?: string = '';

  @State() curLoading = false;

  @State() list: PickerColumn[] = [];

  @State() height!: number;

  @State() top!: number;

  @State() colsIndex: number[] = [];

  @Event({ bubbles: false, eventName: 'change', composed: false }) changeEvent!: EventEmitter<unknown>;

  @Event({ bubbles: false, eventName: 'reachTop', composed: false }) reachTopEvent!: EventEmitter<unknown>;

  @Event({ bubbles: false, eventName: 'reachBottom', composed: false }) reachBottomEvent!: EventEmitter<unknown>;

  @Event({ bubbles: false, eventName: 'confirm', composed: false }) confirmEvent!: EventEmitter<unknown>;

  @Event({ bubbles: false, eventName: 'cancel', composed: false }) cancelEvent!: EventEmitter<unknown>;

  get children() {
    return getChildren({
      host: this.host,
      useSlot: this.options.length === 0,
      tag: 'ti-picker-column',
      relations: 'descendant',
    });
  }

  helper!: Picker;

  content!: HTMLElement;

  temp: { [key: string]: unknown } = {};

  componentWillLoad() {
    this.helper = new Picker<T>();

    addShadowRootStyle.call(this);
  }

  attached() {
    const { optionItemHeight = defaultProps.optionItemHeight, visibleItemCount } = this;
    let height = 0;
    if (typeof optionItemHeight === 'string') {
      if (optionItemHeight.indexOf('rpx') !== -1) {
        height = Math.round(getResponsivePixel(Number.parseInt(optionItemHeight, 10)));
      } else if (optionItemHeight.indexOf('px') !== -1) {
        height = Number.parseInt(optionItemHeight, 10);
      } else {
        height = 54;
      }
    } else if (typeof optionItemHeight === 'number') {
      height = getResponsivePixel(Math.round(optionItemHeight));
    } else {
      height = 54;
    }
    if (typeof visibleItemCount === 'number' && visibleItemCount !== 0) {
      this.height = Number.parseInt(height as unknown as string, 10);
      this.top = Math.round((height * visibleItemCount - height) / 2);
    } else {
      const rect = this.content.getBoundingClientRect();

      if (rect.height === 0) {
        this.height = Number.parseInt(height as unknown as string, 10);
        this.top = Math.round((height * VISIBLEITEMCOUNT - height) / 2);
        this.visibleItemCount = VISIBLEITEMCOUNT;
      } else {
        this.height = Number.parseInt(height as unknown as string, 10);
        this.top = Math.round((rect.height - height) / 2);
      }
    }
  }

  componentDidLoad() {
    const { value, options, cascade = defaultProps.cascade, rowAlias = null, useRowIndex } = this;
    if (options && options.length > 0) {
      this.helper.value = value;
      const update = this.helper.changeProps({ options, value, rowAlias, useRowIndex, cascade });
      this.colsIndex = update.colsIndex;
      this.list = update.list;
    }
    this.attached();

    this.temp.options = this.options;
    this.temp.value = this.value;
    this.temp.cascade = this.cascade;
  }

  componentDidUpdate() {
    const { value, options, cascade = defaultProps.cascade, rowAlias = null, useRowIndex } = this;
    if (this.temp.options === this.options && this.temp.value === this.value && this.temp.cascade === this.cascade) {
      return;
    }
    this.temp.options = this.options;
    this.temp.value = this.value;
    this.temp.cascade = cascade;
    if (!options || options.length === 0) {
      return;
    }
    this.helper.value = value;
    const update = this.helper.changeProps({ options, value, rowAlias, useRowIndex, cascade });
    this.colsIndex = update.colsIndex;
    this.list = update.list;
  }

  @Method()
  onSelect(e: CustomEvent<{ rowIndex: number; colAlias: string | number }>) {
    const { colIndex } = (e.target as HTMLElement).dataset as { colIndex: string };
    const { rowIndex, colAlias } = e.detail;
    const { list, rowAlias } = this;
    const update = this.helper.update(rowIndex, list[Number(colIndex)]);

    Object.assign(this, update);

    this.changeEvent.emit({ ...this.helper.data, colIndex, colAlias, rowIndex, rowAlias });
  }

  @Method()
  async getImperativeHandle() {
    const { children, top, height } = this;
    return { children, top, height };
  }

  @Method()
  updateColumn(
    colAlias: string | number,
    value: { value: unknown; options: unknown; rowIndex?: unknown; colIndex?: number; rowAlias?: unknown },
    inSelect = false,
  ) {
    this.helper.isCustomColAlias = true;
    [...this.helper.columnMap.keys()].forEach(key => {
      if (!this.children.some(pickerColumnElement => pickerColumnElement.colAlias === key)) {
        this.helper.columnMap.delete(key);
      }
    });
    this.helper.columnMap.set(colAlias, { value: value.value, options: value.options });
    this.changeEvent.emit(
      inSelect
        ? {
            ...this.helper.data,
            rowIndex: value.rowIndex,
            colAlias,
            colIndex: value.colIndex,
            rowAlias: value.rowAlias,
          }
        : this.helper.data,
    );
  }

  @Method()
  onReachTop(e: CustomEvent<{ rowIndex: number; colAlias: number | string }>) {
    const { rowIndex, colAlias } = e.detail;
    const { colIndex } = (e.target as HTMLElement).dataset;
    this.reachTopEvent.emit({ rowIndex, colIndex, colAlias });
  }

  @Method()
  onReachBottom(e: CustomEvent<{ rowIndex: number; colAlias: number | string }>) {
    const { rowIndex, colAlias } = e.detail;
    const { colIndex } = (e.target as HTMLElement).dataset;
    this.reachBottomEvent.emit({ rowIndex, colIndex, colAlias });
  }

  handleSlotChange = () => {
    if (this.children?.length > 0) {
      this.helper.isCustomColAlias = true;
    }
  };

  onCalendarConfirm = (event: CustomEvent) => {
    event.stopPropagation();
    this.confirmEvent.emit(this.helper.data);
  };

  onCalendarCancel = (event: CustomEvent) => {
    event.stopPropagation();
    this.cancelEvent.emit(this.helper.data);
  };

  render() {
    const {
      title = defaultProps.title,
      subTitle,
      sports,
      titlebar = defaultProps.titlebar,
      confirmText = defaultProps.confirmText,
      cancelText = defaultProps.cancelText,
      height,
      top,
      colsIndex,
      label = defaultProps.label,
      loading,
      curLoading,
      visibleItemCount,
      list,
      extStyle,
      extOptionStyle,
      extHairlineClass,
      extMaskClass,
      extOptionClass,
      extOptionItemClass,
      extClass,
    } = this;

    return (
      <div class={join('picker')}>
        {titlebar && (
          <ti-popup-titlebar
            title={title}
            sub-title={subTitle}
            confirm-text={confirmText}
            cancel-text={cancelText}
            onCancel={this.onCalendarCancel}
            onClose={this.onCalendarCancel}
            onConfirm={this.onCalendarConfirm}
          />
        )}
        <div
          class={`${handle('picker', ['content'])} ${extClass}`}
          part={`${extClass}`}
          ref={content => {
            if (content) {
              this.content = content;
            }
          }}
          style={
            visibleItemCount === 0 || !visibleItemCount
              ? stringToAttrStyle(extStyle)
              : { ...stringToAttrStyle(extStyle), height: `${visibleItemCount * height}px` }
          }
        >
          {(loading || curLoading) && (
            <div class={handle('picker', ['loading'])}>
              <ti-loading />
            </div>
          )}
          <div class={`${handle('picker', ['mask'])} ${extMaskClass}`} part={extMaskClass} />
          <div
            class={`${handle('picker', ['hairline'])} ${extHairlineClass}`}
            style={{ height: `${height}px`, top: `${top}px` }}
            part={extHairlineClass}
          />
          <div class={handle('picker', ['column-box'])}>
            {list.length > 0 ? (
              list.map((pickerColumn, index) => (
                <ti-picker-column
                  label={label}
                  top={top}
                  columns={pickerColumn.column}
                  col-alias={pickerColumn.colAlias}
                  height={height}
                  key={`${pickerColumn.colAlias as string}`}
                  row={colsIndex[index]}
                  data-col-index={index}
                  sports={sports}
                  extStyle={extOptionStyle}
                  extClass={extOptionClass}
                  extOptionItemClass={extOptionItemClass}
                  ext-css={this.extCss}
                  exportparts={`${extOptionItemClass}:${extOptionItemClass},${extOptionClass}:${extOptionClass}`}
                  onSelect={this.onSelect.bind(this)}
                  onReachTop={this.onReachTop.bind(this)}
                  onReachBottom={this.onReachBottom.bind(this)}
                  use-select-slot={pickerColumn.useSelectSlot}
                >
                  <slot name={`select-${pickerColumn.colAlias as string}`} slot="select" />
                </ti-picker-column>
              ))
            ) : (
              <slot onSlotchange={this.handleSlotChange} />
            )}
          </div>
        </div>
      </div>
    );
  }
}
