import React, { useState } from 'react';
import Page, { OptionType } from '../../components/page';
import { TiLoading, TiLoadingProps } from '@titian-design/react';

const options: OptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    list: [
      { label: '默认', value: 'circular' },
      { label: '自定义', value: 'spinner' },
    ],
    value: 'circular',
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'text',
    type: 'radio',
    name: 'Row',
    desc: '文案',
    list: [
      { label: '无', value: false, attr: { text: '' }, hiddenItems: ['direction'] },
      { label: '有', value: true, attr: { text: '加载中...' } },
    ],
    value: false,
  },
  {
    key: 'direction',
    type: 'radio',
    name: 'Direction',
    desc: '方向',
    list: [
      { label: '水平', value: 'row' },
      { label: '垂直', value: 'column' },
    ],
    value: 'row',
  },
];

type Attrs = TiLoadingProps;

const LoadingPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  return (
    <Page options={options} change={setAttrs}>
      <TiLoading mode={attrs.mode} color={attrs.color} direction={attrs.direction} text={attrs.text} />
    </Page>
  );
};

export default LoadingPage;
