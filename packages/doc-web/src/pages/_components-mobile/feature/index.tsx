import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

function Feature({ position, background, img, title, desc }: any) {
  return (
    <div className={clsx(styles.container, styles[position])} style={{ background: background || '#fff' }}>
      <img className={clsx(styles.img)} src={img} alt="" loading="lazy" />
      <div className={clsx(styles.title)}>{title}</div>
      <div className={clsx(styles.desc)} dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  );
}

export default React.memo(Feature);
