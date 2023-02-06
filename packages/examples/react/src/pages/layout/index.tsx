import { useCallback, useState } from 'react';
import { TiCol, TiRow, TiRowProps, TiColProps } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';

import './index.css';

const options: OptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式 ',
    list: [
      { label: '等分', value: 'equate', hiddenItems: ['custom'] },
      { label: '自定义', value: 'custom', hiddenItems: ['divide'] },
    ],
    value: 'equate',
  },
  {
    key: 'divide',
    type: 'radio',
    name: 'Divide',
    desc: '等分',
    list: [
      { label: '一等分', value: 1, attr: { group: [{ label: 'Span:24  100%', span: 24 }] } },
      {
        label: '二等分',
        value: 2,
        attr: {
          group: [
            { label: 'Span:12  50%', span: 12 },
            { label: 'Span:12  50%', span: 12 },
          ],
        },
      },
      {
        label: '三等分',
        value: 3,
        attr: {
          group: [
            { label: 'Span:8  33%', span: 8 },
            { label: 'Span:8  33%', span: 8 },
            { label: 'Span:8  33%', span: 8 },
          ],
        },
      },
    ],
    value: 1,
  },
  {
    key: 'custom',
    type: 'radio',
    name: 'Custom',
    desc: '自定义',
    list: [
      {
        label: '定义长度',
        value: 'width',
        attr: {
          group: [
            { label: 'span: 6', span: 6 },
            { label: 'span: 12', span: 12 },
            { label: 'span: 6', span: 6 },
          ],
        },
      },
      {
        label: '定义偏移',
        value: 'offset',
        hiddenItems: ['gutter'],
        attr: {
          group: [{ label: 'offset: 12，span: 12', span: 12, offset: 12 }],
        },
      },
    ],
    value: 'width',
  },
  {
    key: 'gutter',
    type: 'radio',
    name: 'Gutter',
    desc: '间距',
    list: [
      { label: '无', value: 0 },
      { label: '有', value: 10 },
    ],
    value: 0,
  },
];

interface LayoutAttrs {
  gutter?: TiRowProps['gutter'];
  group?: Array<TiColProps & { label: string }>;
}

const Layout: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<LayoutAttrs>({});
  const change = useCallback((e: LayoutAttrs) => {
    setAttrs(e);
  }, []);
  return (
    <Page options={options} change={change}>
      <div className="layout-container">
        <TiRow gutter={attrs.gutter}>
          {attrs.group?.map((item, index) => (
            <TiCol key={index} span={item.span} offset={item.offset}>
              <div className={`item item-${item.span} index-${index}`}>{item.label}</div>
            </TiCol>
          ))}
        </TiRow>
      </div>
    </Page>
  );
};

export default Layout;
