import clsx from 'clsx';
import React from 'react';
import { TiTabbar, TiTabbarItem, TiIcon } from '@titian-design/mobile-react';

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
        <TiTabbarItem title="首页">
          <TiIcon
            size="48"
            slot="active-icon"
            color="rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))"
            name="tabbar-home-highlight"
          />
          <TiIcon size="48" slot="icon" color="#757575" name="tabbar-home" />
        </TiTabbarItem>
        <TiTabbarItem title="分类">
          <TiIcon
            size="48"
            slot="active-icon"
            color="rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))"
            name="tabbar-category-highlight"
          />
          <TiIcon size="48" slot="icon" color="#757575" name="tabbar-category" />
        </TiTabbarItem>
        <TiTabbarItem title="购物车">
          <TiIcon
            size="48"
            slot="active-icon"
            color="rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))"
            name="tabbar-cart-highlight"
          />
          <TiIcon size="48" slot="icon" color="#757575" name="tabbar-cart" />
        </TiTabbarItem>
        <TiTabbarItem title="我的">
          <TiIcon
            size="48"
            slot="active-icon"
            color="rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))"
            name="tabbar-mine-highlight"
          />
          <TiIcon size="48" slot="icon" color="#757575" name="tabbar-mine" />
        </TiTabbarItem>
      </TiTabbar>
    </div>
  );
}
