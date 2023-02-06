export interface IUnknownOptions<T = unknown> {
  [key: string]: T;
}

export interface IOptionProps {
  key: string;
  desc: string;
  name: string;
  show?: boolean;
  attr?: IUnknownOptions;
}

export interface IColorListItem extends IUnknownOptions {
  label: string;
  value: string;
}

export interface IColorType extends IOptionProps {
  type: 'color';
  value?: string;
  list?: IColorListItem[];
}

export interface IRadiusType extends IOptionProps {
  type: 'radius';
  value: number;
  min?: number;
  max?: number;
}

export interface IRadioItem extends IUnknownOptions {
  label: string;
  value: string | number | boolean;
  hiddenItems?: string[];
  attr?: IUnknownOptions;
}

export interface RadioType extends IOptionProps {
  type: 'radio';
  value: unknown;
  list: IRadioItem[];
  currentIndex?: number;
}

export type IOptionType = IColorType | IRadiusType | RadioType;

interface IPageChangeProp {
  (params: IUnknownOptions): void;
}

export interface IPageProps {
  options: IOptionType[];
  center?: boolean;
  change?: IPageChangeProp;
}
