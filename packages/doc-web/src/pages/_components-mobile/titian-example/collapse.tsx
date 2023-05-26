import { TiCollapse, TiCollapseItem, TiTextarea } from '@titian-design/mobile-react';
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

export default function CollapseExample(): JSX.Element {
  return (
    <div className={clsx(styles.section, styles.collapse)}>
      <TiCollapse value={0}>
        <TiCollapseItem title="折叠面板">
          <TiTextarea placeholder="请输入文字，限200字以内…" extClass="textarea" showCount maxlength={200} />
          <div style={{ height: '10px' }} />
        </TiCollapseItem>
      </TiCollapse>
    </div>
  );
}
