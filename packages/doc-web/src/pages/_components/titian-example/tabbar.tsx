import { TiTabbar, TiTabbarItem } from '@titian-design/react';
import clsx from 'clsx';
import React from 'react';

import styles from './index.module.scss';

export default function TabbarExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.tabbar)}>
      <TiTabbar
        value={1}
        extStyle={{ position: 'initial', zoom: '0.8' }}
        className={clsx(styles['ti-tabbar'])}
        activeColor="rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))"
      >
        <TiTabbarItem icon="home" title="首页" />
        <TiTabbarItem icon="arrange" title="分类" />
        <TiTabbarItem icon="cart" title="购物车" />
        <TiTabbarItem icon="user-account-setting" title="我的" />
      </TiTabbar>
    </div>
  );
}
