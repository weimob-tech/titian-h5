import { useState } from 'react';
import { TiTreeSelect } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import './index.less';

function getTreeOption() {
  return [
    {
      label: '侧边导航',
      value: 'a1',
      children: [
        {
          label: '标题文字',
          value: 'a1-1',
        },
        {
          label: '标题文字',
          value: 'a1-2',
        },
        {
          label: '标题文字',
          value: 'a1-3',
        },
        {
          label: '标题文字',
          value: 'a1-4',
        },
        {
          label: '标题文字',
          value: 'a1-5',
        },
        {
          label: '标题文字',
          value: 'a1-6',
        },
        {
          label: '标题文字',
          value: 'a1-7',
        },
      ],
    },
    {
      label: 'IP联名款',
      value: 'a2',
      children: [
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-1',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-2',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-3',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-4',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-5',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-6',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-7',
        },
      ],
    },
    {
      label: '精选系列',
      value: 'a3',
      children: [
        {
          label: '精选系列 - 标题文字',
          value: 'a3-1',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-2',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-3',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-4',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-5',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-6',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-7',
        },
      ],
    },
    {
      label: '明星同款',
      value: 'a4',
      children: [
        {
          label: '明星同款 - 标题文字',
          value: 'a4-1',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-2',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-3',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-4',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-5',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-6',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-7',
        },
      ],
    },
    {
      label: '羽绒服',
      value: 'a5',
      children: [
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-1',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-2',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-3',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-4',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-5',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-6',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-7',
        },
      ],
    },
  ];
}
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式 ',
    value: 'basic',
    list: [
      { value: 'basic', label: '基础' },
      { value: 'custom', label: '自定义' },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
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
  const [text, setText] = useState('侧边导航');
  const [attrs, setAttrs] = useState<any>({
    justifyContent: '',
    direction: '',
    text: '',
    order: 2,
    marginLeft: 0,
  });
  const [treeOption, setTree] = useState<any>(getTreeOption());
  const change = (detail: any) => {
    let _treeOption = getTreeOption();

    if (detail.mode === 'custom') {
      _treeOption = treeOption.map(({ children: _, ...other }: any) => other);
    }
    if (detail.shape !== undefined) {
      const value = detail.shape;
      detail.extStyle = `${detail.extStyle || ''};--sidebar-radius: ${value}rpx;`;
    }
    setAttrs({ ...detail });
    setTree([..._treeOption]);

    // this.setData({ attrs: { ...detail }, treeOption: _treeOption });
  };
  const onChangeNav = (event: CustomEvent<{ item: { label: string } }>) => {
    const { item } = event.detail;
    setText(item.label);
  };

  const style: React.CSSProperties =
    attrs.mode === 'custom'
      ? ({
          '--sidebar-active-color': attrs.color,
          '--tree-select-active-color': attrs.color,
          '--sidebar-radius': `${attrs.radius}px`,
        } as React.CSSProperties)
      : ({
          '--tree-select-active-color': attrs.color,
          '--sidebar-radius': `${attrs.radius}px`,
        } as React.CSSProperties);

  return (
    <Page options={options} change={change} center={false}>
      <div className="tree-select-page" style={style}>
        <TiTreeSelect options={treeOption} onChangeNav={onChangeNav}>
          {attrs.mode === 'custom' ? <div className="tree-select-text">- {text} -</div> : null}
        </TiTreeSelect>
      </div>
    </Page>
  );
};

export default TreeSelect;
