import clsx from 'clsx';
import React from 'react';
import { TiSearch } from 'titian-h5-react';
import styles from './index.module.scss';

export default function SearchExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.search)}>
      <TiSearch />
    </div>
  );
}
