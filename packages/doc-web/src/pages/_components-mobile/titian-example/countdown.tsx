import { TiCountdown, TiIcon } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './index.module.scss';

export default function CountdownExample(): JSX.Element {
  const [timeGroup, setTimeGroup] = useState({ day: '', hour: '', minute: '', second: '', millisecond: '' });
  const changeTime = e => {
    setTimeGroup(e.detail);
  };
  return (
    <div className={clsx(styles.section, styles.countdown)}>
      <TiCountdown autoplay useSlot time={199990000} onChange={changeTime}>
        <div className={clsx(styles['countdown-box'])}>
          <div className={clsx(styles.time)}>{timeGroup.day}</div>
          <div className={clsx(styles.d, styles.day)}>天</div>
          <div className={clsx(styles.time)}>{timeGroup.hour}</div>
          <div className={clsx(styles.d)}>
            <TiIcon size="24" name="colon" />
          </div>
          <div className={clsx(styles.time)}>{timeGroup.minute}</div>
          <div className={clsx(styles.d)}>
            <TiIcon size="24" name="colon" />
          </div>
          <div className={clsx(styles.time)}>{timeGroup.second}</div>
          <div className={clsx(styles.d)}>
            <TiIcon size="24" name="colon" />
          </div>
          <div className={clsx(styles.time, styles.millisecond)}>{timeGroup.millisecond}</div>
        </div>
      </TiCountdown>
    </div>
  );
}
