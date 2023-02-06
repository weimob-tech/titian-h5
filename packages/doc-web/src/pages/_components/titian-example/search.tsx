import { TiSearch } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

export default function SearchExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.search)}>
      <TiSearch />
    </div>
  );
}
