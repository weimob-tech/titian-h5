import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pages } from '../../router';

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
              <ti-cell-group
                title={group.groupName}
                mode="card"
                extClass="group"
                title-wrap-class="title-wrap"
                title-class="group-title"
              >
                {group.children.map(({ path, title, subTitle, skipDisplay }, index) => {
                  return skipDisplay ? null : (
                    <ti-cell
                      key={title + index}
                      title={title}
                      label={subTitle}
                      onClick={() => nav(path)}
                      divider={false}
                      right-icon-size={24}
                      ext-class={`cell${index === group.children.length - 1 ? ' cell-last' : ''}`}
                      title-class="cell-title"
                      label-class="cell-label"
                    >
                      {title}
                    </ti-cell>
                  );
                })}
              </ti-cell-group>
            </div>
          );
        })}
      </div>
      <ti-safe-area />
      <ti-back-top />
    </>
  );
};

export default Root;
