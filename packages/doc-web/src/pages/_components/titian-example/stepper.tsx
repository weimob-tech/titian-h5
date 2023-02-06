import { TiInputNumber } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

export default function InputNumberExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles['input-number'])}>
      <div className={clsx(styles['input-number-box'])}>
        <TiInputNumber value={3} extInputClass="ext-input" variant="block" />
        <TiInputNumber value={3} thumbnail disabled />
        <TiInputNumber value={3} />
        <TiInputNumber value={3} thumbnail disabled />
      </div>
    </div>
  );
}
