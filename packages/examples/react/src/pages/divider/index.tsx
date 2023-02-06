import { useState } from 'react';
import { TiDivider, EDividerPosition, EDividerOrientation } from '@titian-design/mobile-react';

import Page, { OptionType } from '../../components/page';
import './index.less';

interface DividerProps {
  color: string;
  borderWidth: number;
  dashed?: boolean;
  orientation?: EDividerOrientation;
  textAlign: EDividerPosition;
  hairline: boolean;
  text: string;
}
const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'dashed',
    name: 'Mode',
    value: false,
    list: [
      {
        label: '实线',
        value: false,
        attr: {
          orientation: 'horizontal',
          // text: '实线',
        },
      },
      {
        label: '虚线',
        value: true,
        attr: { orientation: 'horizontal', text: '虚线' },
      },
      {
        label: '纵向',
        value: 'vertical',
        attr: { orientation: 'vertical', dashed: false },
        hiddenItems: ['textPlacement', 'textAlign'],
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
    desc: '粗细',
    key: 'borderWidth',
    name: 'Weight',
    value: 1,
    list: [
      {
        label: '发丝',
        value: 1,
        attr: { hairline: true },
      },
      {
        label: '1px',
        value: 2,
      },
      {
        label: '2px',
        value: 4,
      },
    ],
  },
  {
    type: 'radio',
    desc: '文字',
    key: 'textPlacement',
    name: 'Text',
    value: 'none',
    list: [
      {
        label: '无',
        value: 'none',
        hiddenItems: ['textAlign'],
      },
      {
        label: '有',
        value: '分割线',
        attr: { text: '分割线' },
      },
    ],
  },
  {
    type: 'radio',
    desc: '位置',
    key: 'textAlign',
    name: 'Position',
    value: 'center',
    list: [
      {
        label: '左',
        value: 'left',
      },
      {
        label: '中',
        value: 'center',
      },
      {
        label: '右',
        value: 'right',
      },
    ],
  },
];
const Divider = () => {
  const [attrs, setAttrs] = useState<DividerProps>({
    color: '',
    text: '',
    hairline: false,
    textAlign: EDividerPosition.CENTER,
    borderWidth: 2,
  });
  const change = (attrs: any) => {
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <div className="divider-page">
        {attrs.orientation === 'vertical' && <div className="divider-page-text">一级分类</div>}
        <TiDivider
          color={attrs.color}
          border-width={attrs.borderWidth}
          dashed={attrs.dashed}
          orientation={attrs.orientation}
          textAlign={attrs.textAlign}
          hairline={attrs.hairline}
        >
          {attrs.text}
        </TiDivider>
        {attrs.orientation === 'vertical' && <div className="divider-page-text">二级分类</div>}
      </div>
    </Page>
  );
};

export default Divider;
