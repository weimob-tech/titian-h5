import { useState } from 'react';
import Page, { OptionType } from '../../components/page';

interface CollapseAttrsProps {
  color: string | string[];
  size: string;
  spin?: boolean;
  rotate?: string;
  iconGroup: string[];
  mode: string;
}
const options: OptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    desc: '模式',
    name: 'Mode',
    list: [
      { value: 'base', label: '基础' },
      { value: 'accordion', label: '手风琴' },
    ],
    value: 'base',
  },
];
export const Collapse = () => {
  const [attrs, setAttrs] = useState<CollapseAttrsProps>({
    color: '',
    mode: '',
    size: '',
    iconGroup: [],
  });
  const [active] = useState([1]);
  const [list] = useState([
    {
      title: '标题文字A',
      content: '- 标题A下的内容 -',
    },
    {
      title: '标题文字B',
      content: '- 标题B下的内容 -',
    },
  ]);

  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <div className="container">
        <ti-collapse value={active} repel={attrs.mode === 'accordion'} options={list}></ti-collapse>
      </div>
    </Page>
  );
};

export default Collapse;
