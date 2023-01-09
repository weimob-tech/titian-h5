import { TiIcon } from '@titian-design/react';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

function requireSvgs() {
  const ctx = require.context('../../asset/icons', true, /\.svg$/);
  return ctx.keys().map(key => key.replace(/\.\/|\.svg/g, ''));
}

export default function IconCollection() {
  const svgs = requireSvgs();

  return (
    <div className={clsx(styles['titian-icon'])}>
      {svgs.map(key => (
        <div className={clsx(styles['titian-icon-wrapper'])}>
          <TiIcon name={key} style={{ fontSize: 28 }} />
          <div className={clsx(styles['titian-icon-name'])}>{key}</div>
          {/* <div className={clsx(styles['titian-icon-actions'])}>动作</div> */}
        </div>
      ))}
    </div>
  );
}
