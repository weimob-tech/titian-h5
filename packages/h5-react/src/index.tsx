import { JSX, TimeGroup as TimeGroup$0, initialize } from '@titian-design/h5';
import React, { CSSProperties } from 'react';
import { createPortal } from 'react-dom';

import * as components from './components';

// eslint-disable-next-line no-restricted-globals
const $window = typeof globalThis !== 'undefined' ? globalThis : global || self;

export { $tiToast, $tiDialog, EDividerPosition, EDividerOrientation } from '@titian-design/h5';

export const setupTitianReact = (config: any = {}) => {
  initialize({
    ...config,
  });
};

type ComponentWrapProps<T, F> = React.PropsWithChildren<
  // eslint-disable-next-line
  T & {
    // eslint-disable-next-line react/require-default-props
    slot?: string;
    // eslint-disable-next-line react/require-default-props
    ref?: React.ForwardedRef<F>;
    // eslint-disable-next-line react/require-default-props
    style?: CSSProperties;
    // eslint-disable-next-line react/require-default-props
    onClick?: React.MouseEventHandler;
  }
>;

function ComponentWrap<T extends { [key: string]: any }, F = any>(Comp: React.ComponentType<T>) {
  const Component = React.forwardRef((props: ComponentWrapProps<T, F>, ref) => {
    const rest = {};

    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in props) {
      if (
        Object.prototype.hasOwnProperty.call(props, key) &&
        key.length > 2 &&
        key.startsWith('on') &&
        key !== 'onClick'
      ) {
        rest[key] = (e: CustomEvent) => {
          // https://developer.mozilla.org/zh-CN/docs/Web/API/Event/isTrusted
          if (!e.isTrusted) {
            const { [key]: event } = props;
            event(e);
          }
        };
      }
    }

    return <Comp {...props} {...rest} ref={ref} />;
  });
  return React.memo(Component as React.FC<React.PropsWithChildren<ComponentWrapProps<T, F>>>);
}

export const TiCell = ComponentWrap<JSX.TiCell, HTMLTiCellElement>(components.TiCell);
export const TiCellGroup = ComponentWrap<JSX.TiCellGroup, HTMLTiCellGroupElement>(components.TiCellGroup);
export const TiIcon = ComponentWrap<JSX.TiIcon, HTMLTiIconElement>(components.TiIcon);
export const TiCheckbox = ComponentWrap<JSX.TiCheckbox, HTMLTiCheckboxElement>(components.TiCheckbox);
export const TiCheckboxButton = ComponentWrap<JSX.TiCheckboxButton, HTMLTiCheckboxButtonElement>(
  components.TiCheckboxButton,
);
export const TiCheckboxGroup = ComponentWrap<JSX.TiCheckboxGroup, HTMLTiCheckboxGroupElement>(
  components.TiCheckboxGroup,
);
export const TiRadio = ComponentWrap<JSX.TiRadio, HTMLTiRadioElement>(components.TiRadio);
export const TiRadioButton = ComponentWrap<JSX.TiRadioButton, HTMLTiRadioButtonElement>(components.TiRadioButton);
export const TiRadioGroup = ComponentWrap<JSX.TiRadioGroup, HTMLTiRadioGroupElement>(components.TiRadioGroup);
export const TiCol = ComponentWrap<JSX.TiCol, HTMLTiColElement>(components.TiCol);
export const TiRow = ComponentWrap<JSX.TiRow, HTMLTiRowElement>(components.TiRow);
export const TiCollapse = ComponentWrap<JSX.TiCollapse, HTMLTiCollapseElement>(components.TiCollapse);
export const TiCollapseItem = ComponentWrap<JSX.TiCollapseItem, HTMLTiCollapseItemElement>(components.TiCollapseItem);
export const TiDivider = ComponentWrap<JSX.TiDivider, HTMLTiDividerElement>(components.TiDivider);
export const TiSlider = ComponentWrap<JSX.TiSlider, HTMLTiSliderElement>(components.TiSlider);
export const TiSvgPathView = ComponentWrap<JSX.TiSvgPathView, HTMLTiSvgPathViewElement>(components.TiSvgPathView);
export const TiTag = ComponentWrap<JSX.TiTag, HTMLTiTagElement>(components.TiTag);
export const TiBackTop = ComponentWrap<JSX.TiBackTop, HTMLTiBackTopElement>(components.TiBackTop);
export const TiEmpty = ComponentWrap<JSX.TiEmpty, HTMLTiEmptyElement>(components.TiEmpty);
export const TiTabbar = ComponentWrap<JSX.TiTabbar, HTMLTiTabbarElement>(components.TiTabbar);
export const TiTabbarItem = ComponentWrap<JSX.TiTabbarItem, HTMLTiTabbarItemElement>(components.TiTabbarItem);
export const TiTransition = ComponentWrap<JSX.TiTransition, HTMLTiTransitionElement>(components.TiTransition);
export const TiSwitch = ComponentWrap<JSX.TiSwitch, HTMLTiSwitchElement>(components.TiSwitch);
export const TiImage = ComponentWrap<JSX.TiImage, HTMLTiImageElement>(components.TiImage);
export const TiRate = ComponentWrap<JSX.TiRate, HTMLTiRateElement>(components.TiRate);
export const TiPopupTitlebar = ComponentWrap<JSX.TiPopupTitlebar, HTMLTiPopupTitlebarElement>(
  components.TiPopupTitlebar,
);
export const TiButton = ComponentWrap<JSX.TiButton, HTMLTiButtonElement>(components.TiButton);
export const TiGrid = ComponentWrap<JSX.TiGrid, HTMLTiGridElement>(components.TiGrid);
export const TiGridItem = ComponentWrap<JSX.TiGridItem, HTMLTiGridItemElement>(components.TiGridItem);
export const TiInput = ComponentWrap<JSX.TiInput, HTMLTiInputElement>(components.TiInput);
export const TiProgress = ComponentWrap<JSX.TiProgress, HTMLTiProgressElement>(components.TiProgress);
export const TiTextarea = ComponentWrap<JSX.TiTextarea, HTMLTiTextareaElement>(components.TiTextarea);
export const TiCircleProgress = ComponentWrap<JSX.TiCircleProgress, HTMLTiCircleProgressElement>(
  components.TiCircleProgress,
);
export const TiPicker = ComponentWrap<JSX.TiPicker, HTMLTiPickerElement>(components.TiPicker);
export const TiPickerColumn = ComponentWrap<JSX.TiPickerColumn, HTMLTiPickerColumnElement>(components.TiPickerColumn);
export const TiDatetimePicker = ComponentWrap<JSX.TiDatetimePicker, HTMLTiDatetimePickerElement>(
  components.TiDatetimePicker,
);
export const TiUploader = ComponentWrap<JSX.TiUploader, HTMLTiUploaderElement>(components.TiUploader);
export const TiSwipeCell = ComponentWrap<JSX.TiSwipeCell, HTMLTiSwipeCellElement>(components.TiSwipeCell);
export const TiTooltip = ComponentWrap<JSX.TiTooltip, HTMLTiTooltipElement>(components.TiTooltip);
export const TiDropdownMenu = ComponentWrap<JSX.TiDropdownMenu, HTMLTiDropdownMenuElement>(components.TiDropdownMenu);
export const TiDropdownItem = ComponentWrap<JSX.TiDropdownItem, HTMLTiDropdownItemElement>(components.TiDropdownItem);
export const TiLoading = ComponentWrap<JSX.TiLoading, HTMLTiLoadingElement>(components.TiLoading);
export const TiCountdown = ComponentWrap<JSX.TiCountdown, HTMLTiCountdownElement>(components.TiCountdown);
export const TiBadge = ComponentWrap<JSX.TiBadge, HTMLTiBadgeElement>(components.TiBadge);
export const TiNoticeBar = ComponentWrap<JSX.TiNoticeBar, HTMLTiNoticeBarElement>(
  components.TiNoticeBar as unknown as React.ComponentType,
);

export const TiInputNumber = ComponentWrap<JSX.TiInputNumber, HTMLTiInputNumberElement>(components.TiInputNumber);
export const TiSteps = ComponentWrap<JSX.TiSteps, HTMLTiStepsElement>(components.TiSteps);
export const TiSafeArea = ComponentWrap<JSX.TiSafeArea, HTMLTiSafeAreaElement>(components.TiSafeArea);
export const TiSticky = ComponentWrap<JSX.TiSticky, HTMLTiStickyElement>(components.TiSticky);

export const TiTreeSelect = ComponentWrap<JSX.TiTreeSelect>(components.TiTreeSelect);
export const TiSwiper = ComponentWrap<JSX.TiSwiper>(components.TiSwiper);
export const TiSwiperItem = ComponentWrap<JSX.TiSwiperItem>(components.TiSwiperItem);
export const TiPreview = ComponentWrap<JSX.TiPreview>(components.TiPreview);
export const TiSidebar = ComponentWrap<JSX.TiSidebar>(components.TiSidebar);
export const TiSidebarItem = ComponentWrap<JSX.TiSidebarItem>(components.TiSidebarItem);
export const TiTabs = ComponentWrap<JSX.TiTabs>(components.TiTabs);
export const TiSearch = ComponentWrap<JSX.TiSearch, HTMLTiSearchElement>(components.TiSearch);

export const TiPrice = ComponentWrap<JSX.TiPrice, HTMLTiPriceElement>(components.TiPrice);

export const TiSku = ComponentWrap<JSX.TiSku, HTMLTiSkuElement>(components.TiSku);
export const TiSkuSelector = ComponentWrap<JSX.TiSkuSelector, HTMLTiSkuSelectorElement>(components.TiSkuSelector);
export const TiGoodsCard = ComponentWrap<JSX.TiGoodsCard, HTMLTiGoodsCardElement>(components.TiGoodsCard);

export const TiScrollView = ComponentWrap<JSX.TiScrollView, HTMLTiScrollViewElement>(components.TiScrollView);
// export const TiPortal = ComponentWrap<JSX.TiPortal>(components.TiPortal);

export const TiCascade = ComponentWrap<JSX.TiCascade>(components.TiCascade);
export const TiConfigProvider = ComponentWrap<JSX.TiConfigProvider, HTMLTiConfigProviderElement>(
  components.TiConfigProvider,
);
export const TiVirtualList = ComponentWrap<JSX.TiVirtualList>(components.TiVirtualList);
export const TiNavbar = ComponentWrap<JSX.TiNavbar>(components.TiNavbar);

export type TiCellProps = JSX.TiCell;
export type TiCellGroupProps = JSX.TiCellGroup;
export type TiIconProps = JSX.TiIcon;
export type TiCheckboxProps = JSX.TiCheckbox;
export type TiCheckboxButtonProps = JSX.TiCheckboxButton;
export type TiCheckboxGroupProps = JSX.TiCheckboxGroup;
export type TiRadioProps = JSX.TiRadio;
export type TiRadioButtonProps = JSX.TiRadioButton;
export type TiRadioGroupProps = JSX.TiRadioGroup;
export type TiColProps = JSX.TiCol;
export type TiRowProps = JSX.TiRow;
export type TiCollapseProps = JSX.TiCollapse;
export type TiCollapseItemProps = JSX.TiCollapseItem;
export type TiDividerProps = JSX.TiDivider;
export type TiSliderProps = JSX.TiSlider;
export type TiSvgPathViewProps = JSX.TiSvgPathView;
export type TiTagProps = JSX.TiTag;
export type TiBackTopProps = JSX.TiBackTop;
export type TiEmptyProps = JSX.TiEmpty;
export type TiTabbarProps = JSX.TiTabbar;
export type TiTabbarItemProps = JSX.TiTabbarItem;
export type TiTransitionProps = JSX.TiTransition;
export type TiImageProps = JSX.TiImage;
export type TiRateProps = JSX.TiRate;
export type TiPopupTitlebarProps = JSX.TiPopupTitlebar;
export type TiButtonProps = JSX.TiButton;
export type TiGridProps = JSX.TiGrid;
export type TiGridItemProps = JSX.TiGridItem;
export type TiInputProps = JSX.TiInput;
export type TiProgressProps = JSX.TiProgress;
export type TiTextareaProps = JSX.TiTextarea;
export type TiCircleProgressProps = JSX.TiCircleProgress;

export type TiPickerProps = JSX.TiPicker;
export type TiPickerColumnProps = JSX.TiPickerColumn;
export type TiDatetimePickerProps = JSX.TiDatetimePicker;
export type TiUploaderProps = JSX.TiUploader;
export type TiSwipeCellProps = JSX.TiSwipeCell;
export type TiTooltipProps = JSX.TiTooltip;
export type TiDropdownMenuProps = JSX.TiDropdownMenu;
export type TiDropdownItemProps = JSX.TiDropdownItem;
export type TiLoadingProps = JSX.TiLoading;
export type TiCountdownProps = JSX.TiCountdown;
export type TiInputNumberProps = JSX.TiInputNumber;
export type TiBadgeProps = JSX.TiBadge;
export type TiNoticeBarProps = JSX.TiNoticeBar;
export type TiStepsProps = JSX.TiSteps;
export type TiStickyProps = JSX.TiSticky;
export type TiSearchProps = JSX.TiSearch;

export type TimeGroup = TimeGroup$0;

export type TiTreeSelectProps = JSX.TiTreeSelect;
export type TiSwiperProps = JSX.TiSwiper;
export type TiSwiperItemProps = JSX.TiSwiperItem;
export type TiPreviewProps = JSX.TiPreview;
export type TiSidebarProps = JSX.TiSidebar;
export type TiSidebarItemProps = JSX.TiSidebarItem;
export type TiTabsProps = JSX.TiTabs;
export type TiScrollViewProps = JSX.TiScrollView;
export type TiPortalProps = JSX.TiPortal;
export type TiCascadeProps = JSX.TiCascade;
export type TiConfigProviderProps = JSX.TiConfigProvider;
export type TiVirtualListProps = JSX.TiVirtualList;
export type TiNavbarProps = JSX.TiNavbar;

export interface InjectPortalProps<T> {
  teleport?: Element;
  forwardedRef?: React.LegacyRef<T>;
}
export function injectPortal<P>(Comm: React.ComponentType<Pick<P, Exclude<keyof P, 'teleport' | 'forwardedRef'>>>) {
  Comm.displayName = `${Comm.displayName || Comm.name}(injectPortal)`;
  type Props = P & InjectPortalProps<P>;
  function App({ teleport = $window?.document?.body, forwardedRef, ...props }: Props) {
    if (teleport && typeof teleport === 'object' && teleport.nodeType === 1 && typeof teleport.nodeName === 'string') {
      return createPortal(<Comm {...props} ref={forwardedRef} />, teleport);
    }
    return <Comm {...props} ref={forwardedRef} />;
  }
  return React.forwardRef<P, Props>((props, ref) => <App {...props} forwardedRef={ref} />);
}

export const TiPopupOriginal = ComponentWrap<JSX.TiPopup, HTMLTiPopupElement>(components.TiPopup);
export type TiPopupOriginalProps = JSX.TiPopup;

export const TiPopup =
  injectPortal<React.PropsWithChildren<ComponentWrapProps<JSX.TiPopup, HTMLTiPopupElement>>>(TiPopupOriginal);

export type TiPopupProps = JSX.TiPopup &
  InjectPortalProps<React.PropsWithChildren<ComponentWrapProps<JSX.TiPopup, HTMLTiPopupElement>>>;

export const TiDialogOriginal = ComponentWrap<JSX.TiDialog, HTMLTiDialogElement>(components.TiDialog);
export type TiTiDialogOriginalProps = JSX.TiDialog;

export const TiDialog =
  injectPortal<React.PropsWithChildren<ComponentWrapProps<JSX.TiDialog, HTMLTiDialogElement>>>(TiDialogOriginal);

export type TiDialogProps = JSX.TiDialog &
  InjectPortalProps<React.PropsWithChildren<ComponentWrapProps<JSX.TiDialog, HTMLTiDialogElement>>>;

export const TiToastOriginal = ComponentWrap<JSX.TiToast, HTMLTiToastElement>(components.TiToast);
export type TiToastOriginalProps = JSX.TiToast;

export const TiToast =
  injectPortal<React.PropsWithChildren<ComponentWrapProps<JSX.TiToast, HTMLTiToastElement>>>(TiToastOriginal);

export type TiToastProps = JSX.TiToast &
  InjectPortalProps<React.PropsWithChildren<ComponentWrapProps<JSX.TiToast, HTMLTiToastElement>>>;

export const TiCalendarOriginal = ComponentWrap<JSX.TiCalendar, HTMLTiCalendarElement>(components.TiCalendar);
export type TiCalendarOriginalProps = JSX.TiCalendar;

export const TiCalendar =
  injectPortal<React.PropsWithChildren<ComponentWrapProps<JSX.TiCalendar, HTMLTiCalendarElement>>>(TiCalendarOriginal);
export type TiCalendarProps = JSX.TiCalendar &
  InjectPortalProps<React.PropsWithChildren<ComponentWrapProps<JSX.TiCalendar, HTMLTiCalendarElement>>>;

export const TiActionSheetOriginal = ComponentWrap<JSX.TiActionSheet, HTMLTiActionSheetElement>(
  components.TiActionSheet,
);
export type TiActionSheetOriginalProps = JSX.TiActionSheet;

export const TiActionSheet =
  injectPortal<React.PropsWithChildren<ComponentWrapProps<JSX.TiActionSheet, HTMLTiActionSheetElement>>>(
    TiActionSheetOriginal,
  );
export type TiActionSheetProps = JSX.TiActionSheet &
  InjectPortalProps<React.PropsWithChildren<ComponentWrapProps<JSX.TiActionSheet, HTMLTiActionSheetElement>>>;

export const TiShareSheetOriginal = ComponentWrap<JSX.TiShareSheet, HTMLTiShareSheetElement>(components.TiShareSheet);

export type TiShareSheetOriginalProps = JSX.TiShareSheet;

export const TiShareSheet =
  injectPortal<React.PropsWithChildren<ComponentWrapProps<JSX.TiShareSheet, HTMLTiShareSheetElement>>>(
    TiShareSheetOriginal,
  );
export type TiShareSheetProps = JSX.TiActionSheet &
  InjectPortalProps<React.PropsWithChildren<ComponentWrapProps<JSX.TiShareSheet, HTMLTiShareSheetElement>>>;
