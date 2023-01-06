import { TiCheckbox } from '@titian-design/react';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

export default function CheckboxExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.box)}>
      <TiCheckbox defaultChecked label="选项01" />
      <TiCheckbox label="选项02" />
      <TiCheckbox label="选项03" />
      <TiCheckbox label="选项04" />
    </div>
  );
}
