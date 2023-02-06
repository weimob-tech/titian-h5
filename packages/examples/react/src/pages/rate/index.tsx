import { useCallback, useState } from 'react';
import { TiRate } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';

const options: OptionType[] = [
  {
    desc: '模式',
    key: 'state',
    type: 'radio',
    name: 'State',
    list: [
      { label: '基础', value: 1 },
      { label: '只读禁用', value: 2, attr: { readOnly: true, disabled: true } },
      { label: '自定义', value: 3, attr: { icon: 'tabbar-vip-highlight' } },
    ],
    value: 1,
  },
  { desc: '颜色', key: 'color', type: 'color', name: 'Color' },
  {
    desc: '数量',
    key: 'count',
    type: 'radio',
    name: 'Number',
    list: [
      { label: '五星', value: 5 },
      { label: '六星', value: 6 },
      { label: '七星', value: 7 },
    ],
    value: 5,
  },

  {
    desc: '半星',
    key: 'allowHalf',
    type: 'radio',
    name: 'Half',
    list: [
      { label: '否', value: false },
      { label: '是', value: true },
    ],
    value: false,
  },
];

interface RateAttrs {
  value?: number;
  allowHalf?: boolean;
  count?: number;
  icon?: string;
  emptyIcon?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const Rate: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<RateAttrs>({});

  const change = useCallback((e: RateAttrs) => {
    setAttrs(e);
  }, []);

  const onRageChanged = useCallback(
    (event: { detail: { value: any } }) => {
      const { value } = event.detail;
      setAttrs({ ...attrs, value });
    },
    [attrs],
  );

  return (
    <div>
      <Page options={options} change={change}>
        <TiRate onChange={event => onRageChanged(event)} {...attrs}></TiRate>
      </Page>
    </div>
  );
};

export default Rate;
