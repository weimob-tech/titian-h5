import { useState } from 'react';
import { TiSidebar, TiSidebarItem } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import './index.less';

const options: OptionType[] = [
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#212121',
    list: [
      { label: 'red', value: '#fa2c19' },
      { label: 'orange', value: '#ffa300' },
      { label: 'green', value: '#07c160' },
      { label: 'blue', value: '#2a6ae9' },
      { label: 'black', value: '#212121' },
    ],
  },
  {
    type: 'radius',
    name: 'shape',
    key: 'radius',
    desc: '圆角',
    value: 16,
  },
];
const TreeSelect = () => {
  const [attrs, setAttrs] = useState<any>({});
  const change = (detail: any) => {
    setAttrs(detail);
  };
  const onChangeSelected = (e: CustomEvent) => {
    const { detail } = e;
    console.log('onChangeSelected ', detail);
  };
  const style: React.CSSProperties = {
    '--sidebar-active-text-color': attrs.color,
    '--sidebar-radius': `${attrs.radius}px`,
  } as React.CSSProperties;

  return (
    <Page options={options} change={change} center={false}>
      <div className="tree-select-page" style={style}>
        <TiSidebar
          active-index="1"
          onChange={onChangeSelected}

          // style="--sidebar-active-text-color: {{ attrs.color }};--sidebar-radius:{{ attrs.radius }}rpx"
        >
          <TiSidebarItem label="侧边导航" badge="1" />
          <TiSidebarItem label="IP联名款" />
          <TiSidebarItem label="精选系列" />
          <TiSidebarItem label="明星同款" />
          <TiSidebarItem label="羽绒服" />
        </TiSidebar>
      </div>
    </Page>
  );
};

export default TreeSelect;
