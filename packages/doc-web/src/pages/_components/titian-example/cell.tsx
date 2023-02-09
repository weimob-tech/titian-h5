import clsx from 'clsx';
import React from 'react';
import { TiButton, TiCell, TiSwitch, TiImage, TiIcon } from '@titian-design/mobile-react';

import styles from './index.module.scss';

export default function CellExample(): JSX.Element {
  const ImageList = [
    {
      id: 1,
      path: 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png',
      fileType: 'image',
    },
    { id: 2, path: 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg', fileType: 'image' },
    {
      id: 3,
      path: 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png',
      fileType: 'image',
    },
  ];
  return (
    <div className={clsx(styles.section, styles.cell)}>
      <TiCell title="标题文字" desc="请选择内容" arrow required />
      <TiCell title="标题文字">
        <TiSwitch slot="desc" />
      </TiCell>
      <TiCell title="标题文字" divider={false}>
        <div className={clsx(styles['cell-images'])} slot="desc">
          {ImageList.map(image => (
            <div key={image.id}>
              <TiImage width={36} height={36} radius={3} src={image.path}>
                <TiIcon title="预览" extClass={clsx(styles['image-icon'])} size="10" name="search" color="#fff" />
              </TiImage>
            </div>
          ))}
        </div>
      </TiCell>
      <div className={clsx(styles['cell-button'])}>
        <TiButton extStyle={{ width: '117px' }} variant="filled" size="medium">
          取消
        </TiButton>
        <TiButton extStyle={{ width: '117px' }} size="medium">
          确定
        </TiButton>
      </div>
    </div>
  );
}
