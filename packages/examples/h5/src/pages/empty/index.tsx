import { useState } from 'react';
import Page, { OptionType } from '../../components/page';

interface EmptyAttrsProps {
  subtitle?: string;
  size?: string;
}
const options: OptionType[] = [
  {
    key: 'button',
    type: 'radio',
    name: 'Mode',
    desc: '按钮 ',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
  {
    key: 'subtitle',
    type: 'radio',
    name: 'Subtitle',
    desc: '副标题 ',
    list: [
      { label: '无', value: '' },
      { label: '有', value: '补充说明文案请尽量简短' },
    ],
    value: '',
  },
  {
    key: 'size',
    type: 'radio',
    name: 'Size',
    desc: '规格 ',
    list: [
      { label: 'Medium', value: 'medium' },
      { label: 'Big', value: 'big' },
    ],
    value: 'big',
  },
];
const Empty = () => {
  const [attrs, setAttrs] = useState<EmptyAttrsProps>({ subtitle: '', size: '' });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <ti-empty sub-title={attrs.subtitle} size={attrs.size} id="空态页说明文案" extClass="12">
        <button style={{ borderColor: '#C4C4C4' }} slot="bottom">
          立即前往
        </button>
      </ti-empty>
    </Page>
  );
};

export default Empty;
