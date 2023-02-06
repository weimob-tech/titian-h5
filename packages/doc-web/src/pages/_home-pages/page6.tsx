import clsx from 'clsx';
import React from 'react';
import AnimationBox from '../_components/animation-box';
import Count from '../_components/count';
import Notice from '../_components/notice';
import Swiper from '../_components/swiper';
import styles from './page6.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  return (
    <div className={clsx(styles.page)} style={{ display }}>
      <AnimationBox position="top" leaving={leaving} className={clsx(styles.top)}>
        {display === 'flex' && <Swiper />}
      </AnimationBox>
      <AnimationBox position="bottom" leaving={leaving} className={clsx(styles.bottom)}>
        <div>
          <Notice
            title="平凡的我们，有无限潜能"
            desc="团队从创建之初，就秉承这协作、高效的原则。<br />每一个人都是独一无二、无可替代的。"
          />
        </div>

        <Count value={10} unit="成员" />
      </AnimationBox>
    </div>
  );
}

export default React.memo(Page);
