import { useState } from 'react';
import { TiSwitch } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface SwitchAttrsProps {
  color: string | string[];
  size: number;
  rotate?: string;
  loading: boolean;
  disabled: boolean;
}
const options: OptionType[] = [
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: 1 },
      { label: '禁用', value: 2, attr: { disabled: true } },
      { label: '加载', value: 3, attr: { loading: true } },
    ],
    value: 1,
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'size',
    type: 'radio',
    name: 'Size',
    desc: '规格',
    list: [
      { label: 'Medium', value: 40 },
      { label: 'Big', value: 56 },
    ],
    value: 40,
  },
];
const Switch = () => {
  const [attrs, setAttrs] = useState<SwitchAttrsProps>({ color: '', size: 0, loading: false, disabled: false });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    console.log(attrs);
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <div className="switch-page">
        <TiSwitch
          extClass="ext-switch-class"
          loading={attrs.loading}
          size={attrs.size}
          active-color={attrs.color}
          disabled={attrs.disabled}
          onChange={flag => {
            console.log(flag);
          }}
        ></TiSwitch>
      </div>
    </Page>
  );
};

export default Switch;
