import SvgCount10 from '@site/src/asset/svg/10.svg';
import SvgCount60 from '@site/src/asset/svg/60.svg';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

function Count({ value, unit }: { value: number; unit: string }) {
  return (
    <div className={clsx(styles.count)}>
      {value === 10 && <SvgCount10 />}
      {value === 60 && <SvgCount60 />}
      <div className={clsx(styles.ext)}>
        <span className={clsx(styles.add, value === 10 && styles.hidden)}>+</span>
        <span className={clsx(styles.unit)}>{unit}</span>
      </div>
    </div>
  );
}

export default React.memo(Count);
