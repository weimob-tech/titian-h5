import clsx from 'clsx';
import React from 'react';
import AnimationBox from '../_components/animation-box';
import Notice from '../_components/notice';
import Tabs from '../_components/tabs';
import styles from './page2.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  return (
    <div className={clsx(styles.page)} style={{ display }}>
      <AnimationBox position="top" leaving={leaving} className={clsx(styles.top)}>
        <Notice
          title="多渠道一体化"
          desc="支持业界主流的 MiniProgram、React、Vue 3开发技术栈；采用 MIT 许可协议，秉承开放、开源原则，期待共建生态，<br />
          多端适配，支持微信、支付宝、小红书、百度小程序等8个渠道，同时保持API与功能统一。"
        />
      </AnimationBox>
      <AnimationBox position="bottom" leaving={leaving} className={clsx(styles.bottom)}>
        <Tabs />
        <img
          className={clsx(styles.img)}
          src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/qudaologo.png"
          alt=""
        />
      </AnimationBox>
    </div>
  );
}
export default React.memo(Page);
