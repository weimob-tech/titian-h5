import React, { useRef, useState } from 'react';
import Page, { OptionType } from '../../components/page';
import { TiButton, TiNoticeBarProps, TiNoticeBar } from '@titian-design/mobile-react';

const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'mode',
    name: 'Mode',
    value: 'default',
    list: [
      {
        value: 'default',
        label: '默认',
      },
      {
        value: 'custom',
        label: '自定义',
        hiddenItems: ['color', 'extStyle'],
        attr: {
          extStyle: { '--notice-bar-color': '#FFFFFF', '--notice-bar-background-color': 'rgba(33, 33, 33, 0.8)' },
          color: '#ffffff',
        },
      },
    ],
  },
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    name: 'Left',
    key: 'leftIcon',
    desc: '左侧',
    value: '',
    list: [
      {
        label: '空',
        value: '',
      },
      {
        label: '搭图标',
        value: 'speaker',
      },
    ],
  },
  {
    type: 'radio',
    name: 'Right',
    key: 'rightIcon',
    desc: '右侧',
    value: '',
    list: [
      {
        label: '空',
        value: '',
      },
      {
        label: '图标',
        value: 'arrow-right',
      },
      {
        label: '按钮',
        value: 'button',
        attr: {
          slotName: 'after',
          rightIcon: '',
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Play',
    key: 'play',
    desc: '播放',
    value: 'no',
    list: [
      {
        label: '否',
        value: 'no',
      },
      {
        label: '水平滚动',
        value: 'horizontal',
        attr: { scrollable: true, variant: 'horizontal' },
      },
      {
        label: '垂直翻动',
        value: 'vertical',
        attr: { scrollable: true, variant: 'vertical', content: ['1111111111', '2222222222'] },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Align',
    key: 'align',
    desc: '对齐',
    value: 'center',
    list: [
      {
        label: '居左',
        value: 'left',
      },
      {
        label: '居中',
        value: 'center',
      },
    ],
  },
];

interface Attrs extends TiNoticeBarProps {
  slotName?: string;
  mode?: string;
  align?: string;
}

const TiNoticeBarPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const ref = useRef<HTMLTiNoticeBarElement>(null);
  return (
    <Page options={options} change={setAttrs} center={false}>
      <TiNoticeBar
        ref={ref}
        content={'登录同步各渠道购物车中的商品'}
        color={attrs.color}
        scrollable={attrs.scrollable || false}
        variant={attrs.variant || 'horizontal'}
        leftIcon={attrs.leftIcon}
        rightIcon={attrs.rightIcon}
        extStyle={{ textAlign: attrs.align, ...((attrs.extStyle as Record<string, unknown>) || {}) }}
      >
        {attrs.slotName ? (
          <TiButton slot="after" size="tiny" variant="outlined" color={attrs.mode === 'custom' ? '#fff' : ''}>
            按钮
          </TiButton>
        ) : null}
      </TiNoticeBar>
    </Page>
  );
};

export default TiNoticeBarPage;
