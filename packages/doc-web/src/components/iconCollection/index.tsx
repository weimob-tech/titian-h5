import { TiIcon } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React from 'react';
import myJson from './iconfont.json';
import styles from './styles.module.scss';

const iconNames = myJson.glyphs.map(el => el.font_class);

export default function IconCollection() {
  return (
    <div className={clsx(styles['titian-icon'])}>
      {iconNames.map(key => (
        <div className={clsx(styles['titian-icon-wrapper'])} key={key}>
          <TiIcon name={key} style={{ fontSize: 28 }} />
          <div className={clsx(styles['titian-icon-name'])}>{key}</div>
          {/* <div className={clsx(styles['titian-icon-actions'])}>动作</div> */}
        </div>
      ))}
    </div>
  );
}
