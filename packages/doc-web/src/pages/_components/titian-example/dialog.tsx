import clsx from 'clsx';
import React from 'react';
import { TiDivider } from 'titian-h5-react';
import styles from './index.module.scss';

export default function DialogExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.dialog)}>
      <div className={clsx(styles['dialog-box'])}>
        <div className={clsx(styles.title)}>弹框标题</div>
        <div className={clsx(styles.desc)}>这里是弹窗的内容文字，过长超出支持换行</div>
      </div>
      <TiDivider hairline />
      <div className={clsx(styles.btns)}>
        <span className={clsx(styles.cancel, styles.btn)}>取消</span>
        <span className={clsx(styles.submit, styles.btn)}>确定</span>
      </div>
    </div>
  );
}
