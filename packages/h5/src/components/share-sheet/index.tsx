/* eslint-disable react/no-array-index-key */
import { Component, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { Components } from '../../components';
import { stringToAttrStyle } from '../common/utils';
import { handle } from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

interface ShareSheetSvgProps {
  isSvgPath: true;
  color: Components.TiSvgPathView['fills'];
  icon: Components.TiSvgPathView['name'];
  paths: Components.TiSvgPathView['paths'];
  size?: Components.TiSvgPathView['size'];
  bgc?: string;
  name?: string;
  extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];
}
interface ShareSheetIconProps {
  isSvgPath: false;
  color: Components.TiIcon['color'];
  icon: Components.TiIcon['name'];
  size?: Components.TiIcon['size'];
  bgc?: string;
  name?: string;
  extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];
}
type ShareSheetProps = ShareSheetSvgProps | ShareSheetIconProps;

function isShareSheetSvg(item: ShareSheetSvgProps | ShareSheetIconProps): item is ShareSheetSvgProps {
  return item.isSvgPath;
}
function completedStyles(length: number): JSXBase.HTMLAttributes['style'] {
  if (length > 4 || length === 0) {
    return {};
  }
  const width = 100 / length;
  return { width: `${width}%` };
}
function completedData<T>(options: (T[] | T)[]): T[][] {
  return options.map(item => {
    if (Array.isArray(item)) {
      return item;
    }
    return [item];
  });
}
function completedBgColor(color: unknown) {
  if (typeof color === 'string' && color) {
    return { backgroundColor: color };
  }
  return {};
}

function isImg(icon?: string) {
  return icon && icon.indexOf('http') > -1;
}
const defaultProps = {
  cancelText: '取消',
};
@Component({
  tag: 'ti-share-sheet',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiShareSheet {
  @Prop() visible = false;

  @Prop() cancelText = defaultProps.cancelText;

  @Prop() title = '';

  @Prop() subTitle = '';

  @Prop() closeOnMask = true;

  @Prop() extClass?: string = '';

  @Prop() extPopupMaskClass?: string = '';

  @Prop() extTitleClass?: string = '';

  @Prop() extPopupContentClass = '';

  @Prop() extPopupClass?: string = '';

  @Prop() options: ShareSheetProps[] | ShareSheetProps[][] = [];

  @Prop() extStyle?: string | JSXBase.HTMLAttributes['style'] = '';

  @Event({ eventName: 'close', composed: false }) closeEvent!: EventEmitter<boolean>;

  @Event({ eventName: 'cancel', composed: false }) cancelEvent!: EventEmitter<boolean>;

  @Event({ eventName: 'confirm', composed: false }) confirmEvent!: EventEmitter<boolean>;

  @Event({ eventName: 'select', composed: false }) selectEvent!: EventEmitter<ShareSheetProps>;

  @Element() host!: HTMLTiShareSheetElement;

  onClose = () => {
    this.visible = false;
    this.closeEvent.emit();
  };

  onCancel = () => {
    this.visible = false;
    this.cancelEvent.emit();
  };

  onConfirm = () => {
    this.visible = false;
    this.confirmEvent.emit();
  };

  onSelect = item => {
    this.selectEvent.emit(item);
  };

  // eslint-disable-next-line class-methods-use-this
  renderItem = (item: ShareSheetSvgProps | ShareSheetIconProps) => {
    if (isShareSheetSvg(item)) {
      return (
        <ti-svg-path-view
          name={item.icon}
          fills={item.color}
          paths={item.paths}
          size={item.size || 48}
          ext-style={item.extStyle}
        />
      );
    }
    if (isImg(item.icon)) {
      return (
        <img
          style={{
            ...completedBgColor(item.extStyle),
            width: addUnit(item.size || 48),
            height: addUnit(item.size || 48),
          }}
          src={item.icon}
          alt={item.name}
        />
      );
    }
    return <ti-icon name={item.icon} color={item.color} size={item.size || 48} ext-style={item.extStyle} />;
  };

  render() {
    const {
      visible,
      options,
      title,
      extStyle,
      subTitle,
      extClass = '',
      extPopupMaskClass = '',
      extPopupContentClass = '',
      extPopupClass = '',
      closeOnMask,
      cancelText = defaultProps.cancelText,
      extTitleClass = '',
    } = this;
    return (
      <ti-popup
        class={handle('share-sheet', ['popup'])}
        ext-class={extPopupClass}
        ext-content-class={extPopupContentClass}
        ext-mask-class={extPopupMaskClass}
        visible={visible}
        position="bottom"
        close-on-mask={closeOnMask}
        onClose={this.onClose}
        preventScroll
        exportparts={`${extPopupClass}, ${extPopupContentClass}, ${extPopupMaskClass}`}
      >
        {(title || subTitle) && (
          <ti-popup-titlebar
            title={title}
            sub-title={subTitle}
            variant="with-confirm"
            onCancel={this.onCancel}
            onConfirm={this.onConfirm}
          />
        )}

        <div class={`${handle('share-sheet', ['content'])} `} part={extClass} style={stringToAttrStyle(extStyle)}>
          {completedData(options).map((opt, row) => (
            <div class={handle('share-sheet', ['row'])} key={row}>
              {opt.map((item, col) => (
                <button
                  class={handle('share-sheet', ['col', 'btn'])}
                  style={completedStyles(opt.length)}
                  data-row={row}
                  data-col={col}
                  key={item.name}
                  type="button"
                  onClick={() => this.onSelect(item)}
                >
                  <div class={handle('share-sheet', ['icon'])} style={completedBgColor(item.bgc)}>
                    {this.renderItem(item)}
                  </div>
                  <text class={handle('share-sheet', ['text'])} part={extTitleClass}>
                    {item.name}
                  </text>
                </button>
              ))}
            </div>
          ))}
        </div>
        <div class={handle('share-sheet', ['cancel-box'])}>
          <div class={handle('share-sheet', ['placeholder'])} />
          <button class={handle('share-sheet', ['cancel'])} type="button" onClick={this.onCancel}>
            {cancelText}
          </button>
        </div>
      </ti-popup>
    );
  }
}
