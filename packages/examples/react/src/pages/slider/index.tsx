import { useCallback, useState } from 'react';
import { TiSlider, TiSliderProps } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import { mergeOptionIntoAttrs } from '../../util/index';

import './index.less';

const options: OptionType[] = [
  {
    desc: '模式',
    key: 'state',
    type: 'radio',
    name: 'Mode',
    list: [
      { label: '基础', value: 1 },
      { label: '自定义', value: 2, attr: { extClass: 'slider-thumb-class' } },
    ],
    value: 1,
  },
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    desc: '交互',
    key: 'interaction',
    type: 'radio',
    name: 'Interaction',
    list: [
      { label: '默认', value: 1 },
      { label: '指定范围', value: 2, attr: { min: -100, max: 100 } },
      { label: '指定步长', value: 3, attr: { step: 20 } },
    ],
    value: 1,
  },
  {
    desc: '结果类型',
    key: 'orientation',
    type: 'radio',
    name: 'Type',
    list: [
      { label: '值', value: 0, attr: { orientation: 15 } },
      { label: '范围', value: 1, attr: { orientation: [15, 50] } },
    ],
    value: 0,
  },
];

interface Attrs extends Omit<TiSliderProps, 'value'> {
  extClass?: string;
  min?: number;
  max?: number;
  step?: number;
  orientation?: string;
  value?: number;
}

const TiSliderPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const [slider, setSlider] = useState<number>(15);

  const onChange = useCallback(
    (event: any) => {
      const attrs = event;
      let afterAttrs = mergeOptionIntoAttrs(options, attrs);
      if (JSON.stringify(slider) !== JSON.stringify(attrs.orientation)) {
        setSlider(attrs.orientation);
      }
      setAttrs(afterAttrs);
    },
    [attrs],
  );

  const onChange3 = (event: any) => {
    const { value } = event.detail;
    event.preventDefault();
    console.log('onChange3', value);
  };

  return (
    <Page options={options} change={onChange}>
      <div className="slider-wrap">
        <TiSlider {...attrs} value={slider} onChange={onChange3} />
      </div>
    </Page>
  );
};

export default TiSliderPage;
