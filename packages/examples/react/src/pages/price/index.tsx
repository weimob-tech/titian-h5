import { useCallback, useState } from 'react';
import { TiPrice } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';

const options: OptionType[] = [
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'prefix',
    type: 'radio',
    name: 'State',
    desc: '前缀',
    list: [
      { label: '无', value: 1, attr: { prefix: '' } },
      { label: '文案', value: 2, attr: { prefix: '最低' } },
    ],
    value: 1,
  },
  {
    key: 'suffix',
    type: 'radio',
    name: 'State',
    desc: '后缀',
    list: [
      { label: '无', value: 1, attr: { suffix: '' } },
      { label: '文案', value: 2, attr: { suffix: '起' } },
    ],
    value: 1,
  },
];

interface Attrs {
  color?: string;
  suffix?: string;
  prefix?: string;
}

const PricePage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const change = useCallback((e: Attrs) => {
    setAttrs(e);
  }, []);

  const style: any = {};
  style['--theme-price'] = attrs.color;

  return (
    <div style={style}>
      <Page options={options} change={change}>
        <TiPrice label={'销售价'} unit={'$'} prefix={attrs.prefix} value={29.99} suffix={attrs.suffix} />
      </Page>
    </div>
  );
};

export default PricePage;
