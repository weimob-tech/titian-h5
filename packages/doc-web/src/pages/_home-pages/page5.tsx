import clsx from 'clsx';
import React from 'react';
import AnimationBox from '../_components/animation-box';
import Notice from '../_components/notice';
import styles from './page5.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  const figmaUrl = 'https://www.figma.com/community/file/1194917512409387064';
  const githubUrl = 'https://github.com/weimob-tech/titian-design';
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
          src="https://image-c.weimobwmc.com/sass-admin/b5bc41db413b470f917fc0fe9d053083.png"
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
          src="https://image-c.weimobwmc.com/sass-admin/08d30299bc214ddaa611a350e63df996.png"
          alt=""
          onKeyDown={() => {}}
          role="presentation"
        />
      </AnimationBox>
    </div>
  );
}

export default React.memo(Page);
