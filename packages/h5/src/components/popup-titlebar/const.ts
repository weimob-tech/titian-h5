import { handle } from '../common/utils/namespace';

enum EPopupTitleBarVariantType {
  WithConfirm = 'with-confirm', // TODO: 主版本迭代 name change ConfirmTitleClose
  CancelOnly = 'cancel-only', // TODO: 主版本迭代 name change TitleClose
  BackTitleClose = 'back-title-cancel',
  MiniClose = 'mini-close', // TODO: 主版本迭代 name change Close
  LeftTitleClose = 'left-title-close',
}
export default EPopupTitleBarVariantType;

export function getLeftClass(type) {
  if (type === EPopupTitleBarVariantType.WithConfirm) {
    return handle('popup-titlebar', ['cancel']);
  }
  if (type === EPopupTitleBarVariantType.BackTitleClose) {
    return handle('popup-titlebar', ['back']);
  }
  return '';
}
export function getRightClass(type) {
  if (type === EPopupTitleBarVariantType.WithConfirm) {
    return handle('popup-titlebar', ['confirm']);
  }
  if (
    type === EPopupTitleBarVariantType.CancelOnly ||
    type === EPopupTitleBarVariantType.BackTitleClose ||
    type === EPopupTitleBarVariantType.LeftTitleClose
  ) {
    return handle('popup-titlebar', ['close']);
  }
  if (type === EPopupTitleBarVariantType.MiniClose) {
    return `${handle('popup-titlebar', ['mini-close'])} ext-class`;
  }
  return '';
}
export function getRightClassIcon(type) {
  if (type === EPopupTitleBarVariantType.MiniClose) {
    return handle('popup-titlebar', ['mini-close-icon']);
  }
  return '';
}
export function getTitleClass(type) {
  if (type === EPopupTitleBarVariantType.LeftTitleClose) {
    return handle('popup-titlebar', ['space-between']);
  }
  return '';
}
