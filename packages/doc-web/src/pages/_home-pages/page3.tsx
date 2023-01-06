import clsx from 'clsx';
import React from 'react';
import AnimationBox from '../_components/animation-box';
import Count from '../_components/count';
import Notice from '../_components/notice';
import TiExample from '../_components/titian-example';
import styles from './page3.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  return (
    <div className={clsx(styles.page)} style={{ display }}>
      <AnimationBox position="left" leaving={leaving} className={clsx(styles.left)}>
        <Notice
          title="千变万化，随心搭配"
          desc="借助Titian组件，能更便捷地搭建应用。你想得到的、想不到的样式变量，我们都能提供。"
        />
        <Count value={60} unit="组件" />
      </AnimationBox>
      <AnimationBox position="right" leaving={leaving} className={clsx(styles.right)}>
        <TiExample />
      </AnimationBox>
    </div>
  );
}

export default React.memo(Page);
