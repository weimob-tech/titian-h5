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
          desc="多端适配，同时支持微信、支付宝、小红书、快手小程序等多个主流渠道，同时保持API与功能统一。Titian 基于微盟自研的多渠道转码技术，支持业界主流的 MiniProgram（即将开放），以及基于 Web Components 支持 React、Vue 3 开发技术栈，采用 MIT 许可协议，秉承开放、开源原则，期待共建生态。"
        />
      </AnimationBox>
      <AnimationBox position="bottom" leaving={leaving} className={clsx(styles.bottom)}>
        <Tabs />
        <img
          className={clsx(styles.img)}
          src="https://image-c.weimobwmc.com/sass-admin/8c0a72f81a6845aa8e821f68ad02bc48.png"
          alt=""
        />
      </AnimationBox>
    </div>
  );
}
export default React.memo(Page);
