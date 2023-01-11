export enum EToastType {
  Text = 'text',
  Success = 'success',
  Fail = 'fail',
  Warn = 'warn',
  Loading = 'loading',
  Icon = 'icon',
}

export default EToastType;

export type IToastText = string | number;
export type IToastStaticOptions = {
  type?: EToastType;
  text?: IToastText;
  message?: IToastText;
  duration?: number;
  color?: string;
  iconName?: string;
  extPopupClass?: string;
  extPopupContentClass?: string;
  extPopupMaskClass?: string;

  finishedCallback?: () => void;
};

export enum ToastAPIEnum {
  Info = 'info',
  Loading = 'loading',
  Warn = 'warn',
  Success = 'success',
  Fail = 'fail',
  Clear = 'clear',
}
