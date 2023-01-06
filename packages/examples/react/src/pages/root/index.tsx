import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../router';
import { TiBackTop, TiCell, TiCellGroup, TiSafeArea } from 'titian-h5-react';

import './index.less';

const Root: React.FC<{ pages: Pages[] }> = props => {
  const { pages = [] } = props;
  const nav = useNavigate();

  return (
    <>
      <div>
        <img
          className="root-bg"
          src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/titlepic.png"
          alt="root"
        />
      </div>
      <div className="group-content">
        {pages.map(group => {
          return (
            <div className="group-root" key={group.groupName}>
              <TiCellGroup
                title={group.groupName}
                mode="card"
                extClass="group"
                titleWrapClass="title-wrap"
                titleClass="group-title"
              >
                {group.children.map(({ path, title, subTitle, skipDisplay }, index) => {
                  return skipDisplay ? null : (
                    <TiCell
                      key={title + index}
                      title={title}
                      label={subTitle}
                      onClick={() => nav(path)}
                      divider={false}
                      rightIconSize={24}
                      extClass={`cell${index === group.children.length - 1 ? ' cell-last' : ''}`}
                      titleClass="cell-title"
                      labelClass="cell-label"
                    >
                      {title}
                    </TiCell>
                  );
                })}
              </TiCellGroup>
            </div>
          );
        })}
      </div>
      <TiSafeArea />
      <TiBackTop />
    </>
  );
};

export default Root;
