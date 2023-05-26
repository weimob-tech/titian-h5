import { TiDivider, TiSwiper, TiSwiperItem } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React from 'react';
import styles from './page7.module.scss';

function Page() {
  const list = [
    {
      title: '有序',
      sub: 'Orderliness',
      desc: '即内外的有序。内在，拥有统一的标准、规则及模式。外在，有统一的设计语言让用户的体验有序、一致。',
    },
    {
      title: '多元',
      sub: 'Pluralism',
      desc: '丰富的选择性，体现品牌调性的多样化。贴合用户心智，维持品牌认知。在赋能品牌的同时，开发者能够探索出无限可能。',
    },
    {
      title: '普适',
      sub: 'Universality',
      desc: '沉淀于微盟核心的SaaS业务，对“交易场景”拥有良好的普适性。既能满足当下需求，也能有更广泛的应用。',
    },
  ];
  const now = new Date();
  const currentYear = now.getFullYear();
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.main)}>
        <div className={clsx(styles['qrcode-box'])}>
          <img
            className={clsx(styles.qrcode)}
            src="https://image-c.weimobwmc.com/sass-admin/6443ced485da4cacb223a1efca598524.png"
            alt=""
            loading="lazy"
          />
          <span className={clsx(styles['contact-tip'])}>扫码加入 Titian 组件库用户群</span>
        </div>
        <TiSwiper pagination="bullets" autoplay>
          {list.map(el => (
            <TiSwiperItem key={el.sub}>
              <div className={clsx(styles.grid)} key={el.sub}>
                <div className={clsx(styles.title)}>{el.title}</div>
                <div className={clsx(styles.sub)}>{el.sub}</div>
                <div className={clsx(styles.desc)}>{el.desc}</div>
              </div>
            </TiSwiperItem>
          ))}
        </TiSwiper>
        <div className={clsx(styles.footer)}>
          <TiDivider />
          <p className={clsx(styles.copyright)}>
            Copyright © 2013-{currentYear} www.weimob.com All Rights Reserved 上海微盟企业发展有限公司版权所有
            沪ICP备14044897号-9
          </p>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Page);
