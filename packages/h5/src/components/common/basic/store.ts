import { createStore } from '@stencil/store';
import { Locale } from '../../../global/locale/interface';
import zhCN from '../../../global/locale/zh_CN';

export interface IStore {
  locale: Locale;
  iconClassPrefix?: string;
  enableTitianIcon: boolean;
}

export const store = createStore<IStore>({
  locale: zhCN,
  enableTitianIcon: true,
});
