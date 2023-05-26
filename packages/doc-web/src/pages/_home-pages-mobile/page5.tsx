import clsx from 'clsx';
import React from 'react';
import Notice from '../_components-mobile/notice';
import styles from './page5.module.scss';

function Page() {
  const figmaUrl = 'https://www.figma.com/community/file/1194917512409387064';
  const githubUrl = 'https://github.com/weimob-tech/titian-design';
  const link = url => {
    if (!url) return;
    window.open(url);
  };
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.main)}>
        <img
          aria-hidden="true"
          className={clsx(styles.img)}
          onClick={() => link(figmaUrl)}
          src="
        https://image-c.weimobwmc.com/sass-admin/633ea1506bef45cb9dd2b689c1b238e7.png"
          alt="设计仓库"
          loading="lazy"
        />
        <div className={clsx(styles.notice)}>
          <Notice sub="Designer  or  Developer" title="更多内容，体验了解" desc="为设计师与工程师提供了相应的资源" />
        </div>

        <img
          aria-hidden="true"
          className={clsx(styles.img)}
          onClick={() => link(githubUrl)}
          src="
        https://image-c.weimobwmc.com/sass-admin/c4b6129ca4624b0d8a1ea8bc7497c3c4.png"
          alt="代码仓库"
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default React.memo(Page);
