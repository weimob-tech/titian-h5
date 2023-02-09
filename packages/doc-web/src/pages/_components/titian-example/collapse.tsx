import { UserContext } from '@site/src/pages/index';
import clsx from 'clsx';
import React, { useContext } from 'react';
import { TiCollapse, TiCollapseItem, TiTextarea } from '@titian-design/mobile-react';
import styles from './index.module.scss';

export default function CollapseExample(): JSX.Element {
  const context = useContext(UserContext);
  return (
    <div className={clsx(styles.section, styles.collapse)}>
      <TiCollapse value={context?.currentPage === 3 ? 0 : ''}>
        <TiCollapseItem title="折叠面板">
          <TiTextarea placeholder="请输入文字，限200字以内…" extClass="textarea" showCount maxlength={200} />
        </TiCollapseItem>
      </TiCollapse>
    </div>
  );
}
