import clsx from 'clsx';
import React from 'react';
import AnimationBox from '../_components/animation-box';
import Notice from '../_components/notice';
import styles from './page5.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  const figmaUrl =
    'https://www.figma.com/file/w2RUoYgz82b4CarMNqAgrO/Titian%E7%BB%84%E4%BB%B6%E8%AE%BE%E8%AE%A1%E8%B5%84%E6%BA%90?node-id=2701%3A8313&t=5L4ymiX2g2SmKsQx-1';
  const githubUrl = '';
  const link = url => {
    if (!url) return;
    window.open(url);
  };
  return (
    <div className={clsx(styles.page)} style={{ display }}>
      <AnimationBox position="left" leaving={leaving} className={clsx(styles.left)}>
        <img
          className={clsx(styles.img)}
          onClick={() => link(figmaUrl)}
          src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/figmaruanjian.png"
          alt=""
          onKeyDown={() => {}}
          role="presentation"
        />
      </AnimationBox>
      <AnimationBox position="center" leaving={leaving} className={clsx(styles.center)}>
        <Notice sub="Designer  or  Developer" title="更多内容，体验了解" desc="为设计师与工程师提供了相应的资源" />
      </AnimationBox>

      <AnimationBox position="right" leaving={leaving} className={clsx(styles.right)}>
        <img
          onClick={() => link(githubUrl)}
          className={clsx(styles.img, styles['right-img'])}
          src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/daimaruanjian.png"
          alt=""
          onKeyDown={() => {}}
          role="presentation"
        />
      </AnimationBox>
    </div>
  );
}

export default React.memo(Page);
