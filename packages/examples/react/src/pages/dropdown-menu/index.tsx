import React, { useState } from 'react';
import { TiDropdownItem, TiDropdownItemProps, TiDropdownMenu, TiDropdownMenuProps } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';

const options: OptionType[] = [
  { key: 'activeColor', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: 1, attr: { disabled: false } },
      { label: '禁用', value: 2, attr: { disabled: true } },
    ],
    value: 1,
  },
  {
    key: 'direction',
    type: 'radio',
    name: 'Direction',
    desc: '方向',
    list: [
      { label: '向下', value: 1, attr: { direction: 'down' } },
      { label: '向上', value: 2, attr: { direction: 'up' } },
    ],
    value: 1,
  },
  {
    key: 'selectMode',
    type: 'radio',
    name: 'Select Mode',
    desc: '选择模式',
    list: [
      { label: '单选', value: 1, attr: { mode: 'single' } },
      { label: '多选', value: 2, attr: { mode: 'multiple' } },
    ],
    value: 1,
  },
  {
    key: 'buttonType',
    type: 'radio',
    name: 'Button Type',
    desc: '交互',
    list: [
      { label: '复选框', value: 1, attr: { type: 'checkbox' } },
      { label: '开关', value: 2, attr: { type: 'switch' } },
    ],
    value: 1,
  },
];

export interface Attrs extends TiDropdownMenuProps {
  dropMenuOptions?: TiDropdownItemProps['options'];
}

const dropMenuOptions: TiDropdownItemProps['options'] = [
  {
    title: '选项1',
    value: '1',
  },
  {
    title: '选项2',
    value: '2',
  },
];

const DropdownMenuPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  return (
    <Page options={options} change={setAttrs} center={false}>
      <div
        style={{
          width: '100%',
          ...(attrs.direction === 'up' ? { paddingTop: 'calc(40vh - 60px)' } : {}),
        }}
      >
        <TiDropdownMenu
          disabled={attrs.disabled}
          direction={attrs.direction}
          activeColor={attrs.activeColor}
          mode={attrs.mode}
          type={attrs.type}
          icon={attrs.icon}
          closeOnMask={attrs.closeOnMask}
        >
          <TiDropdownItem title="标题1" data-idx="1" options={dropMenuOptions} />
          <TiDropdownItem title="标题2" data-idx="2" options={dropMenuOptions} />
          <TiDropdownItem title="标题3" data-idx="3" options={dropMenuOptions} />
        </TiDropdownMenu>
      </div>
    </Page>
  );
};

export default DropdownMenuPage;
