import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

function Mark({ value }: { value: any }) {
  const current = `${value}`.padStart(2, '0');
  return (
    <div className={clsx(styles.mark)}>
      <div>
        <span className={clsx(styles.number)}>{current}</span>
        <span>PART</span>
      </div>
      <div className={clsx(styles.tip)}>
        <div className={clsx(styles.block)} />
        <div className={clsx(styles.block)} />
      </div>
    </div>
  );
}

export default React.memo(Mark);
