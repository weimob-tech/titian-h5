import { useCallback, useState } from 'react';
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
        <ti-collapse {...attrs} ext-option-class="collapse-opt" ext-option-content-class="collapse-opt-content">
          <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      </div>
    </Page>
  );
};

export default Collapse;
