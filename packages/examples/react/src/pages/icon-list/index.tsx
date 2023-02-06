import { TiGrid, TiGridItem, TiIcon, TiDivider } from '@titian-design/mobile-react';
import list from './iconfont.json';

import './index.less';

export const IconListPage = () => {
  return (
    <div>
      <TiGrid>
        {list.glyphs.map(el => (
          <TiGridItem key={el.icon_id}>
            <div slot="icon" className="icon-wrap">
              <TiIcon prefix="weimob-icon" size={30} name={el.font_class} />
              <TiDivider orientation="vertical" />
              <TiIcon size={30} name={el.font_class} />
            </div>
          </TiGridItem>
        ))}
      </TiGrid>
    </div>
  );
};
