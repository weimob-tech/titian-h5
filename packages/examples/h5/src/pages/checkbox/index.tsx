import { useState } from 'react';
import Page, { OptionType } from '../../components/page';
import './index.less';

interface CheckboxProps {
  color: string;
  limit: number;
  radius: number;
  group: string[];
  iconName: string;
  size: number;
  disabled: boolean;
}
const options: OptionType[] = [
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: 1, attr: { size: '32' } },
      { label: '禁用', value: 2, attr: { disabled: true, size: '32' } },
      { label: '自定义', value: 3, hiddenItems: ['radius'], attr: { iconName: 'tabbar-vip', size: '36' } },
    ],
    value: 1,
    attr: {
      group: ['选项 A', '选项 B', '选项 C'],
      iconName: '',
    },
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色', value: '#fa2c19' },
  { key: 'radius', type: 'radius', name: 'Radius', desc: '圆角', value: 16, max: 16 },
  {
    key: 'limit',
    type: 'radio',
    name: 'Limit',
    desc: '限制',
    list: [
      { label: '无', value: 100 },
      { label: '限制数量', value: 2 },
    ],
    value: 100,
  },
];
const Checkbox = () => {
  const [attrs, setAttrs] = useState<CheckboxProps>({} as CheckboxProps);
  const change = (attr: any) => {
    setAttrs(attr);
  };
  return (
    <Page options={options} change={change}>
      <ti-checkbox-group
        max={attrs.limit}
        default-value="0"
        style={{
          '--checkbox-padding-h': 12 + 'px',
          '--checkbox-radius': attrs.radius + 'px',
          '--checkbox-icon-color': attrs.color,
        }}
      >
        {attrs.group &&
          attrs.group.map((item, index) => {
            return (
              <ti-checkbox
                key={index}
                icon={attrs.iconName}
                label={item}
                value={index + ''}
                size={attrs.size}
                disabled={attrs.disabled}
              ></ti-checkbox>
            );
          })}
      </ti-checkbox-group>
    </Page>
  );
};

export default Checkbox;
