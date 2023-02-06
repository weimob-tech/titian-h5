import { useState } from 'react';
import { TiCalendar, TiButton } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface IAttrsProps {
  color: string;
  mode: 'single' | 'multiple' | 'range';
  size: number;
  maxSize: number;
  maxRange: number;
}
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'txtMode',
    value: 'basic',
    desc: '文字',
    list: [
      { value: 'basic', label: '基础' },
      { value: 'description', label: '搭描述' },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    name: 'Method',
    key: 'mode',
    value: 'single',
    desc: '选择方式',
    list: [
      { value: 'single', label: '单选', hiddenItems: ['interaction', 'interaction2'] },
      { value: 'multiple', label: '多选', hiddenItems: ['interaction2'] },
      { value: 'range', label: '区间', hiddenItems: ['interaction'] },
    ],
  },
  {
    type: 'radio',
    name: 'Quick',
    key: 'state',
    value: false,
    desc: '快捷选择',
    list: [
      { value: false, label: '否' },
      { value: true, label: '是' },
    ],
  },
  {
    type: 'radio',
    name: 'Interaction',
    key: 'interaction',
    value: 'default',
    desc: '交互',
    list: [
      { value: 'default', label: '默认' },
      { value: 'max', label: '最大天数', attr: { maxSize: 3 } },
    ],
  },
  {
    type: 'radio',
    name: 'Interaction',
    key: 'interaction2',
    value: 'default',
    desc: '交互',
    list: [
      { value: 'default', label: '默认' },
      { value: 'range', label: '限选范围', attr: { maxRange: 3 } },
    ],
  },
];
const Calendar = () => {
  const [attrs, setAttrs] = useState<IAttrsProps>({ mode: 'single', color: '', size: 10, maxSize: 0, maxRange: 0 });

  const [visible, set] = useState(false);
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    console.log(attrs);
    setAttrs(attrs);
  };
  const toggleVisible = () => {
    set(!visible);
  };
  return (
    <div className="page">
      <Page options={options} change={change}>
        <TiButton onClick={toggleVisible}>点击演示</TiButton>
      </Page>

      <TiCalendar
        mode={attrs.mode}
        min-date={new Date('2021-10-01').getTime()}
        max-size={attrs.maxSize}
        max-range={attrs.maxRange}
        defaultValue={new Date().getTime()}
        visible={visible}
        onClose={toggleVisible}
        onConfirm={toggleVisible}
        extPopupClass="ext-popup-class"
        extPopupMaskClass="ext-popup-mask-class"
        extPopupContentClass="ext-popup-content-class"
      />
    </div>
  );
};

export default Calendar;
