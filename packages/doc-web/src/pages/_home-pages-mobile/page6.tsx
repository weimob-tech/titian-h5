import clsx from 'clsx';
import React from 'react';
import Notice from '../_components-mobile/notice';
import Swiper from '../_components-mobile/swiper';
import styles from './page6.module.scss';

function Page() {
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.main)}>
        <Swiper />
        <div className={clsx(styles.notice)}>
          <Notice
            title="平凡的我们，有无限潜能"
            desc="团队从创建之初，就秉承这协作、高效的原则。<br />每一个人都是独一无二、无可替代的。"
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(Page);
