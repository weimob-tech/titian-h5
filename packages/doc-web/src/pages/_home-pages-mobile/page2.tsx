import clsx from 'clsx';
import React from 'react';
import Notice from '../_components-mobile/notice';
import Tabs from '../_components-mobile/tabs';
import styles from './page2.module.scss';

function Page() {
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.main)}>
        <div className={clsx(styles.notice)}>
          <Notice
            title="多渠道一体化"
            desc="多端适配，同时支持微信、支付宝、小红书、快手小程序等多个主流渠道，同时保持API与功能统一。Titian 基于微盟自研的多渠道转码技术，支持业界主流的 MiniProgram（即将开放），以及基于 Web Components 支持 React、Vue 3 开发技术栈，采用 MIT 许可协议，秉承开放、开源原则，期待共建生态。"
          />
        </div>
        <div className={clsx(styles.tabs)}>
          <Tabs />
        </div>
        <img
          alt=""
          className={clsx(styles.img)}
          loading="lazy"
          src="
        https://image-c.weimobwmc.com/sass-admin/41533d9f5b1445a195122610404b6b00.png"
        />
      </div>
    </div>
  );
}

export default React.memo(Page);
