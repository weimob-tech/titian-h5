import clsx from 'clsx';
import React from 'react';
import { TiTag } from 'titian-h5-react';
import styles from './index.module.scss';

export default function TagExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.tag)}>
      <TiTag variant="contained" size="big">
        Titian
      </TiTag>
      <TiTag variant="filled" size="big">
        Titian
      </TiTag>
      <TiTag variant="outlined" size="big">
        Titian
      </TiTag>
      <TiTag variant="contained" extStyle={{ '--tag-color': '#E0E0E0' }} size="big">
        Titian
      </TiTag>
    </div>
  );
}
