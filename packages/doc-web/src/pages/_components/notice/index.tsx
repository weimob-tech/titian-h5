import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

function Notice({ sub, title, desc }: any) {
  return (
    <>
      <div className={clsx(styles.tip)}>{sub || 'Titian Design'}</div>
      <div className={clsx(styles.title)}>{title}</div>
      <div className={clsx(styles.desc)} dangerouslySetInnerHTML={{ __html: desc }} />
    </>
  );
}

export default React.memo(Notice);
