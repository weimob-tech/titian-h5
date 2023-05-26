import clsx from 'clsx';
import React from 'react';
import Notice from '../_components-mobile/notice';
import Example from '../_components-mobile/titian-example';
import styles from './page3.module.scss';

function Page() {
  return (
    <div className={clsx(styles.page)}>
      <div className={clsx(styles.main)}>
        <div className={clsx(styles.notice)}>
          <Notice
            title="千变万化，随心搭配"
            desc="借助Titian组件，能更便捷地搭建应用。你想得到的、想不到的样式变量，我们都能提供。"
          />
        </div>
        <Example />
      </div>
    </div>
  );
}

export default React.memo(Page);
