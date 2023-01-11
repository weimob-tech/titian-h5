import { JSX, initialize, TimeGroup as TimeGroup$0 } from '@titian-design/h5';
import type { Locale } from '@titian-design/h5/locale/interface';
import { DefineComponent, h, ref, Teleport } from 'vue';
import * as components from './components';

export { $tiToast, $tiDialog, EDividerPosition, EDividerOrientation } from '@titian-design/h5';

export const setupTitianReact = (config: any = {}) => {
  initialize({
    ...config,
  });
};

// export * from './components';
export * from './plugin';

export const { TiCell } = components;
export const { TiCellGroup } = components;
export const { TiIcon } = components;
export const { TiCheckbox } = components;
export const { TiCheckboxButton } = components;
export const { TiCheckboxGroup } = components;
export const { TiRadio } = components;
export const { TiRadioButton } = components;
export const { TiRadioGroup } = components;
export const { TiCol } = components;
export const { TiRow } = components;
export const { TiCollapse } = components;
export const { TiCollapseItem } = components;
export const { TiDivider } = components;
export const { TiSlider } = components;
export const { TiSvgPathView } = components;
export const { TiTag } = components;
export const { TiBackTop } = components;
export const { TiEmpty } = components;
export const { TiTabbar } = components;
export const { TiTabbarItem } = components;
export const { TiTransition } = components;
export const { TiSwitch } = components;
export const { TiImage } = components;
export const { TiRate } = components;
export const { TiPopupTitlebar } = components;
export const { TiButton } = components;
export const { TiGrid } = components;
export const { TiGridItem } = components;
export const { TiInput } = components;
export const { TiProgress } = components;
export const { TiTextarea } = components;
export const { TiCircleProgress } = components;
export const { TiPicker } = components;
export const { TiPickerColumn } = components;
export const { TiDatetimePicker } = components;
export const { TiUploader } = components;
export const { TiSwipeCell } = components;
export const { TiTooltip } = components;
export const { TiDropdownMenu } = components;
export const { TiDropdownItem } = components;
export const { TiLoading } = components;
export const { TiCountdown } = components;
export const { TiBadge } = components;
export const { TiNoticeBar } = components;

export const { TiInputNumber } = components;
export const { TiSteps } = components;
export const { TiSafeArea } = components;
export const { TiSticky } = components;

export const { TiTreeSelect } = components;
export const { TiSwiper } = components;
export const { TiSwiperItem } = components;
export const { TiPreview } = components;
export const { TiSidebar } = components;
export const { TiSidebarItem } = components;
export const { TiTabs } = components;
export const { TiSearch } = components;

export const { TiPrice } = components;

export const { TiSku } = components;

export const { TiScrollView } = components;
export const { TiPortal } = components;

export const { TiCascade } = components;
export const { TiConfigProvider } = components;

export interface InjectPortalProps {
  teleport?: string | HTMLElement;
}

const raf = (cb: () => void) =>
  typeof requestAnimationFrame === 'function' ? requestAnimationFrame(cb) : () => setTimeout(cb, 1000 % 60);

export function useLocale(locale: Locale) {
  const $locale = ref();

  raf(() => {
    $locale.value = locale;
  });
  return $locale;
}

function injectPortal<P>(WrappedComponent: DefineComponent<Pick<P, Exclude<keyof P, 'teleport'>>>) {
  type Props = P & InjectPortalProps;
  return function HoC(props: Props, context) {
    const { attrs, slots } = context;
    const { teleport = 'body', ...otherAtts } = attrs;

    if (teleport && (typeof teleport === 'string' || teleport instanceof HTMLElement)) {
      return h(Teleport, { to: teleport }, h(WrappedComponent, { ...otherAtts, ...props }, slots));
    }

    return h(WrappedComponent, { ...attrs }, slots);
  };
}

export const TiPopupOriginal = components.TiPopup;
export type TiPopupOriginalProps = JSX.TiPopup;

export const TiPopup = injectPortal(TiPopupOriginal);
export type TiPopupProps = JSX.TiPopup;

export const TiDialogOriginal = components.TiDialog;
export type TiTiDialogOriginalProps = JSX.TiDialog;

export const TiDialog = injectPortal(TiDialogOriginal);
export type TiDialogProps = JSX.TiDialog;

export const TiToastOriginal = components.TiToast;
export type TiToastOriginalProps = JSX.TiToast;

export const TiToast = injectPortal(TiToastOriginal);
export type TiToastProps = JSX.TiToast;

export const TiCalendarOriginal = components.TiCalendar;
export type TiCalendarOriginalProps = JSX.TiCalendar;

export const TiCalendar = injectPortal(TiCalendarOriginal);
export type TiCalendarProps = JSX.TiCalendar;

export const TiActionSheetOriginal = components.TiActionSheet;
export type TiActionSheetOriginalProps = JSX.TiActionSheet;

export const TiActionSheet = injectPortal(TiActionSheetOriginal);
export type TiActionSheetProps = JSX.TiActionSheet; // export const TiShareSheetOriginal = components.TiShareSheet;

export const TiShareSheetOriginal = components.TiShareSheet;
export type TiShareSheetOriginalProps = JSX.TiShareSheet;

export const TiShareSheet = injectPortal(TiShareSheetOriginal);
export type TiShareSheetProps = JSX.TiShareSheet; // export const TiShareSheetOriginal = components.TiShareSheet;

export type TiCellProps = JSX.TiCell;
export type TiCellGroupProps = JSX.TiCellGroup;
export type TiIconProps = JSX.TiIcon;
export type TiCheckboxProps = JSX.TiCheckbox;
export type TiCheckboxGroupProps = JSX.TiCheckboxGroup;
export type TiRadioProps = JSX.TiRadio;
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
