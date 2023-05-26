import { setupTitianReact, TiSwiper, TiSwiperItem } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React from 'react';
import CellExample from './cell';
import CollapseExample from './collapse';
import CountdownExample from './countdown';
import DialogExample from './dialog';
import styles from './index.module.scss';
import RateExample from './rate';
import SearchExample from './search';
import InputNumberExample from './stepper';
import TabbarExample from './tabbar';
import TagExample from './tag';

function Home() {
  setupTitianReact({ mode: 'h5' });
  return (
    <div className={clsx(styles.page)}>
      <TiSwiper pagination="bullets" autoplay>
        <TiSwiperItem>
          <div className={clsx(styles.main)}>
            <div className={clsx(styles.content)}>
              <SearchExample />
              <div className={clsx(styles.middle)}>
                <TagExample />
                <div className={clsx(styles.right)}>
                  <div className={clsx(styles['input-number-grid'])}>
                    <InputNumberExample />
                  </div>
                  <RateExample />
                </div>
              </div>
              <TabbarExample />
            </div>
          </div>
        </TiSwiperItem>
        <TiSwiperItem>
          <div className={clsx(styles.main)}>
            <div className={clsx(styles.content)}>
              <CellExample />
              <CountdownExample />
            </div>
          </div>
        </TiSwiperItem>
        <TiSwiperItem>
          <div className={clsx(styles.main)}>
            <div className={clsx(styles.content)}>
              <DialogExample />
              <CollapseExample />
            </div>
          </div>
        </TiSwiperItem>
      </TiSwiper>
    </div>
  );
}
export default React.memo(Home);
