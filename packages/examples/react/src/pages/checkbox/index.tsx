import React, { useCallback, useState } from 'react';
import { TiCheckboxButton, TiCheckbox, TiCheckboxGroup, TiCheckboxGroupProps, TiImage } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';

import './index.less';
import { addUnit } from '../../util';

const options: OptionType[] = [
  {
    key: 'type',
    type: 'radio',
    name: 'Type',
    value: 'TiCheckbox',
    desc: '模式',
    list: [
      { label: '标准', value: 'TiCheckbox', hiddenItems: ['ext'] },
      { label: '按钮', value: 'TiCheckboxButton' },
    ],
  },
  {
    key: 'ext',
    type: 'radio',
    name: '',
    value: 'normal',
    desc: '搭配',
    list: [
      { label: '常规', value: 'normal', attr: { iconName: '' } },
      { label: '搭图标', value: 'icon', attr: { iconName: 'right-custom' } },
      { label: '搭图片', value: 'image', attr: { iconName: '' } },
    ],
  },
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: 1 },
      { label: '禁用', value: 2, attr: { disabled: true } },
    ],
    value: 1,
    attr: {
      group: ['选项 A', '选项 B', '选项 C'],
    },
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  { key: 'radius', type: 'radius', name: 'Radius', desc: '圆角', value: 8, max: 8 },
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

interface Attrs {
  limit?: TiCheckboxGroupProps['max'];
  group?: string[];
  iconName?: string;
  size?: number;
  radius?: number | string;
  color?: string;
  disabled?: boolean;
  type?: 'TiCheckbox' | 'TiCheckboxButton';
  ext?: 'normal' | 'icon' | 'image';
}

const Checkbox: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const change = useCallback((attrs: Attrs) => {
    setAttrs(attrs);
  }, []);
  const style: any = {
    ...(attrs.radius ? { '--checkbox-radius': `${attrs.radius}px` } : {}),
    '--checkbox-padding-h': '6px',
    '--checkbox-label-padding-h': '6px',
  };
  const Comp = attrs.type === 'TiCheckboxButton' ? TiCheckboxButton : TiCheckbox;

  return (
    <div style={style}>
      <Page pageClass="checkbox-button-page" options={options} change={change}>
        <TiCheckboxGroup max={attrs.limit} defaultValue={[0]} color={attrs.color} icon={attrs.iconName}>
          {attrs.group?.map((item, index) => (
            <Comp label={item} disabled={attrs.disabled} value={index} key={index}>
              {attrs.ext === 'image' && (
                <TiImage
                  extStyle={{ marginRight: addUnit(12) }}
                  slot="prefix"
                  width={40}
                  radius={4}
                  height={40}
                  src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
                />
              )}
            </Comp>
          ))}
        </TiCheckboxGroup>
      </Page>
    </div>
  );
};

export default Checkbox;
