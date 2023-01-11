import { useCallback, useState } from 'react';
import { TiCollapse } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface CollapseAttrsProps {
  value?: any[];
  repel?: boolean;
  options?: any[];
  mode?: string;
  divider?: boolean;
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
  {
    key: 'divider',
    type: 'radio',
    desc: '分割线',
    name: 'Divider',
    list: [
      { value: true, label: '有' },
      { value: false, label: '无' },
    ],
    value: true,
  },
];
export const Collapse = () => {
  const [attrs, setAttrs] = useState<CollapseAttrsProps>({
    divider: true,
    value: [1],
    repel: true,
    mode: 'accordion',
    options: [
      {
        title: '标题文字A',
        content: '- 标题A下的内容 -',
      },
      {
        title: '标题文字B',
        content: '- 标题B下的内容 -',
      },
    ],
  });

  const change = useCallback(
    (newAttrs: any) => {
      newAttrs.repel = newAttrs.mode === 'accordion';

      setAttrs({ ...attrs, ...newAttrs });
    },
    [attrs],
  );
  return (
    <Page options={options} change={change}>
      <div className="collapse-page">
        <TiCollapse {...attrs} extOptionClass="collapse-opt" extOptionContentClass="collapse-opt-content"></TiCollapse>
      </div>
    </Page>
  );
};

export default Collapse;
