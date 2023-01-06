import { useState } from 'react';
import { TiGrid, TiGridProps, TiGridItemProps, TiGridItem } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';

const options: OptionType[] = [
  {
    key: 'direction',
    type: 'radio',
    name: 'Mode',
    desc: '模式 ',
    list: [
      {
        label: '纵排',
        value: 'column',
        attr: {
          group: {
            3: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
            ],
            4: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
            ],
            6: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
              { text: '待付款', icon: 'to-comment' },
              { text: '待付款', icon: 'mine-to-pay' },
            ],
          },
        },
      },
      {
        label: '横排',
        value: 'row',
        attr: {
          group: {
            3: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
            ],
            4: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
            ],
            6: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
              { text: '待付款', icon: 'to-comment' },
              { text: '待付款', icon: 'mine-to-pay' },
            ],
          },
        },
      },
      {
        label: '自定义',
        value: 'custom',
        attr: {
          group: {
            3: [1, 2, 3],
            4: [1, 2, 3, 4],
            6: [1, 2, 3, 4, 5, 6],
          },
          customContent: true,
        },
      },
    ],
    value: 'column',
  },
  {
    key: 'number',
    type: 'radio',
    name: 'Number',
    desc: '数量',
    list: [
      { label: '3个', value: 3, attr: { columns: 3 } },
      { label: '4个', value: 4, attr: { columns: 4 } },
      { label: '6个', value: 6, attr: { columns: 3 } },
    ],
    value: 3,
  },
  {
    key: 'divider',
    type: 'radio',
    name: 'Divide',
    desc: '分割线 ',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
];

interface Attrs extends TiGridProps {
  group?: Record<3 | 4 | 6, TiGridItemProps[]>;
  number?: 3 | 4 | 6;
  customContent?: boolean;
}

const GridPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  return (
    <div>
      <Page options={options} change={setAttrs}>
        <div className="container">
          <TiGrid columns={attrs.columns} direction={attrs.direction} divider={attrs.divider}>
            {attrs.group?.[attrs.number || 3].map((item, index) => {
              return (
                <TiGridItem size={32} key={index} icon={item.icon} text={item.text} customContent={attrs.customContent}>
                  {attrs.customContent ? <div slot="content"> - 内容 - </div> : null}
                </TiGridItem>
              );
            })}
          </TiGrid>
        </div>
      </Page>
    </div>
  );
};

export default GridPage;
