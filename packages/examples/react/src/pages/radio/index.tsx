import React, { FC, useCallback, useState } from 'react';
import { TiImage, TiRadio, TiRadioButton, TiRadioGroup } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';
import { addUnit } from '../../util';

import './index.less';

const options: OptionType[] = [
  {
    key: 'type',
    type: 'radio',
    name: 'Type',
    value: 'TiRadio',
    desc: '模式',
    list: [
      { label: '标准', value: 'TiRadio', hiddenItems: ['ext'] },
      { label: '按钮', value: 'TiRadioButton' },
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
  { key: 'radius', type: 'radius', name: 'Radius', desc: '圆角', value: 16, min: 1, max: 16 },
];

interface Attrs {
  group?: string[];
  iconName?: string;
  color?: string;
  disabled?: boolean;
  radius?: string | number;
  type?: 'TiRadio' | 'TiRadioButton';
  ext?: 'normal' | 'icon' | 'image';
}

const RadioPage: FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});

  const change = useCallback((e: Attrs) => {
    setAttrs(e);
  }, []);

  const style: any = {};
  style['--radio-radius'] = addUnit(attrs.radius || 999);
  const Comp = attrs.type === 'TiRadioButton' ? TiRadioButton : TiRadio;
  return (
    <div style={style}>
      <Page pageClass="radio-button-page" options={options} change={change}>
        <TiRadioGroup
          defaultValue={1}
          icon={attrs.iconName}
          onChange={e => {
            console.log(e.detail);
          }}
          color={attrs.color}
          extClass="ti-radio-group"
          extCss={`.ti-radio-group{display: flex;align-items: center;}`}
          shape="none"
        >
          {attrs.group?.map((item, index) => (
            <Comp disabled={attrs.disabled} key={index} label={item} value={index}>
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
        </TiRadioGroup>
      </Page>
    </div>
  );
};

export default RadioPage;
