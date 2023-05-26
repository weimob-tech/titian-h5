import { TiRate } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React, { useState } from 'react';
import styles from './index.module.scss';

export default function RateExample(): JSX.Element {
  const [value, setValue] = useState(3);
  return (
    <div className={clsx(styles.section, styles.rate)}>
      <TiRate value={value} iconSize="24" onChange={e => setValue(e.detail.value)} />
    </div>
  );
}
