import React, { useRef, useState } from 'react';
import Page, { OptionType } from '../../components/page';
import { TiNavbar, TiNavbarProps, TiTabs } from '@titian-design/mobile-react';
import './index.css';

const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'type',
    list: [
      { value: 'normal', label: '正常' },
      { value: 'immersion', label: '沉浸式', hiddenItems: ['usePlaceholder'] },
    ],
    desc: '模式',
    value: 'normal',
  },
  {
    type: 'radio',
    name: 'Subtitle',
    key: 'subtitle',
    list: [
      { value: '', label: '无' },
      { value: '副标题', label: '有' },
    ],
    desc: '副标题',
    value: '',
  },
  {
    type: 'radio',
    name: 'Placeholder',
    key: 'usePlaceholder',
    list: [
      { value: false, label: '关闭' },
      { value: true, label: '开启', hiddenItems: ['frostedGlass'] },
    ],
    desc: '占位',
    value: true,
  },
  {
    type: 'radio',
    name: 'FrostedGlass',
    key: 'frostedGlass',
    list: [
      { value: false, label: '关闭' },
      { value: true, label: '开启', hiddenItems: ['background'] },
    ],
    desc: '背景模糊',
    value: true,
  },
  {
    type: 'color',
    name: 'Color',
    key: 'background',
    desc: '背景颜色 ',
    value: '#ffffff',
    list: [
      { label: 'white', value: '#ffffff' },
      { label: 'red', value: '#fa2c19' },
      { label: 'orange', value: '#ffa300' },
      { label: 'green', value: '#07c160' },
      { label: 'blue', value: '#2a6ae9' },
    ],
  },
  {
    type: 'radio',
    name: 'iconsIcon',
    key: 'icons',
    list: [
      { value: 0, label: '返回' },
      { value: 1, label: '回到首页' },
      { value: 2, label: '组合1' },
      { value: 3, label: '组合2' },
    ],
    desc: '图标',
    value: 0,
  },
  {
    type: 'radio',
    name: 'Loading',
    key: 'loading',
    list: [
      { value: false, label: '关闭' },
      { value: true, label: '开启' },
    ],
    desc: '加载中',
    value: false,
  },
  {
    type: 'radio',
    name: 'Slot',
    key: 'slotName',
    list: [
      { value: 0, label: '不使用' },
      { value: 1, label: '样式一' },
      { value: 2, label: '样式二' },
    ],
    desc: '插槽',
    value: 0,
  },
];

interface Attrs extends TiNavbarProps {
  fontColor?: string;
  icons?: number;
  slotName?: number;
}

const Navbar: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const ref = useRef<HTMLTiNavbarElement>(null);

  const onScroll = (e: any) => {
    ref.current?.updateOpacity({ scrollTop: e.target.scrollTop });
  };

  const onChange = (detail: Attrs) => {
    detail.title = '标题';
    detail.background = detail.background || attrs.background;
    detail.fontColor = detail.background !== '#ffffff' ? '#ffffff' : '#000000';
    detail.useBackButton = detail.icons !== 1;
    detail.useHomeButton = detail.icons !== 0;
    if (detail.icons === 3) {
      detail.rightIcons = ['category'];
    } else {
      detail.rightIcons = [];
    }
    if (detail.slotName === 1) {
      detail.title = '';
      detail.subtitle = '';
    }

    if (detail.slotName === 2) {
      detail.title = '标题';
      detail.useBackButton = false;
      detail.useHomeButton = false;
    }
    setAttrs(detail);
  };
  return (
    <Page options={options} change={e => onChange(e)} center={false}>
      <TiNavbar ref={ref} {...attrs} onClickIcon={e => console.log(e.detail)}>
        {attrs.slotName === 1 && (
          <div slot="title">
            <TiTabs tabs={['全部', '热销']} extStyle="width: 160px;--tabs-background-color: transparent" />
          </div>
        )}
        {attrs.slotName === 2 && (
          <div slot="prefix">
            城市
            <ti-icon name="arrow-down" />
          </div>
        )}
      </TiNavbar>
      <div className="scroll-view" onScroll={onScroll}>
        <img
          style={{ width: '100%', height: '760rpx' }}
          src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
        />
        <div style={{ height: '200vh' }} />
      </div>
    </Page>
  );
};

export default Navbar;
