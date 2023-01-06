import React from 'react';
import Page, { OptionType } from '../../components/page';
import { TiActionSheet, TiActionSheetProps, TiButton } from 'titian-h5-react';

const options: OptionType[] = [
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色',
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
    key: 'title',
    type: 'radio',
    name: 'Title',
    desc: '标题',
    list: [
      { label: '无', value: '' },
      { label: '有', value: '标题信息' },
    ],
    value: '',
  },
  {
    key: 'cancel',
    type: 'radio',
    name: 'Cancel',
    desc: '取消按钮',
    list: [
      { label: '无', value: false },
      { label: '有', value: true, attr: { cancelText: '取消' } },
    ],
    value: true,
  },
  {
    key: 'loading',
    type: 'radio',
    name: 'Loading',
    desc: '加载',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
];

export interface Attrs extends TiActionSheetProps {
  color?: string;
}

const ActionSheetPage: React.FC<Record<string, never>> = () => {
  const [actions, setActions] = React.useState<TiActionSheetProps['actions']>([
    { name: '选项1', disabled: true },
    { name: '选项2' },
    { name: '选项3', icon: 'delete' },
  ]);
  const [attrs, setAttrs] = React.useState<Attrs>({});
  const [visible, setVisible] = React.useState(false);

  return (
    <div
      style={{
        // @ts-ignore
        '--action-sheet-button-color': attrs.color,
        '--action-sheet-title-color': attrs.color,
        '--loading-color': attrs.color,
      }}
    >
      <Page
        options={options}
        change={params => {
          setAttrs(params);
          const newActions = (actions || []).map((item, idx) => {
            if (idx === 2) {
              return { ...item, loading: params.loading as boolean };
            }
            return { ...item };
          });
          setActions(newActions);
        }}
      >
        <TiButton onClick={() => setVisible(!visible)}>点击演示</TiButton>
      </Page>
      <TiActionSheet
        visible={visible}
        title={attrs.title}
        actions={actions}
        cancelText={attrs.cancelText}
        onClose={() => setVisible(!visible)}
        onSelect={item => {
          console.log(item.detail);
        }}
      />
    </div>
  );
};

export default ActionSheetPage;
