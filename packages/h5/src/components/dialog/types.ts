export interface IDialogProps {
  hasCancelButton?: boolean;
  cancelBtnText?: string;
  confirmBtnText?: string;
  isTextButton?: boolean;
  extClass?: string;
}

export interface IDialogStaticOptions {
  title?: string;
  content?: string;
  extStyle?: string;
  extClass?: string;
  confirmBtnText?: string;
  cancelBtnText?: string;
  confirmButtonColor?: string;
  confirmButtonBgColor?: string;
  cancelButtonColor?: string;
  cancelButtonBgColor?: string;
  isTextButton?: boolean;
  hasCancelButton?: boolean;
  extPopupClass?: string;
  extPopupContentClass?: string;
  extPopupMaskClass?: string;
  extInnerClass?: string;
  extContentClass?: string;
  extActionsClass?: string;
  extActionCancelClass?: string;
  extActionConfirmClass?: string;
  onCancel?: (e: any) => void;
  onConfirm?: (e: any) => void;
  onClose?: (e: any) => void;
}
export enum DialogAPIEnum {
  Show = 'show',
  Alert = 'alert',
  confirm = 'confirm',
}
