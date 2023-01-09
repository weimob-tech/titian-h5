import { useState } from 'react';
import { TiSteps, TiStepsProps } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';

import './index.less';

const options1: TiStepsProps['options'] = [
  {
    title: '标题文字',
    description: '详细内容文字，详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
  },
  {
    title: '标题文字',
    description: '详细内容文字，详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
  },
  {
    title: '标题文字',
    description: '详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
  },
];
const options2: TiStepsProps['options'] = [
  {
    description: '详细内容文字，详细内容文字，详细内容文字',
    icon: 'addressreceiving',
  },
  {
    title: '标题文字',
    subtitle: '2018.07.06 09:52:42',
    description: '详细内容文字，详细内容文字，详细内容文字',
    icon: 'addressright',
    checked: true,
  },
  {
    title: '标题文字',
    subtitle: '2018.07.06 09:52:42',
    description: '详细内容文字，详细内容文字',
    icon: 'home',
  },
];

const options: OptionType[] = [
  {
    desc: '模式',
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    list: [
      { label: '默认', value: 'default', attr: { option: options1 } },
      { label: '自定义', value: 'custom', attr: { option: options2, subtitleAlign: 'right' } },
    ],
    value: 'custom',
  },
  { desc: '颜色', key: 'activeColor', type: 'color', name: 'Color' },
];
interface Attrs extends TiStepsProps {
  defaultColor?: string;
  option?: any;
}

const TiStepsPage: React.FC<Record<string, never>> = () => {
  const [attrs, setAttrs] = useState<Attrs>({});
  const styles = { '--steps-active-line-color': attrs.defaultColor } as React.CSSProperties;

  return (
    <Page
      options={options}
      center={false}
      change={(e: Attrs) => {
        const detail = { ...e };
        setAttrs(detail);
      }}
    >
      <div className="steps-container" style={styles}>
        <TiSteps
          options={attrs.option}
          activeColor={attrs.activeColor}
          icon={attrs.icon}
          subtitle-align={attrs.subtitleAlign}
        />
      </div>
    </Page>
  );
};

export default TiStepsPage;
