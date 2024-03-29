import { useState } from 'react';
import { TiButton, TiPopup, TiPicker } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import city from './city';
import './index.less';
interface PickerAttrsProps {
  rowAlias: string | number;
  label: string;
  value: any;
  options: unknown[];
  loading: boolean;
}
const options: OptionType[] = [
  {
    desc: '模式',
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    value: 'single',
    list: [
      { label: '单列', value: 'single', attr: { options: ['选项一', '选项二', '选项三', '选项四', '选项五'] } },
      {
        label: '双列',
        value: 'double',
        attr: {
          options: [
            ['选项一', '选项二', '选项三', '选项四', '选项五'],
            ['选项一', '选项二', '选项三', '选项四', '选项五'],
          ],
        },
      },
      {
        label: '级联',
        value: 'cascade',
        attr: { options: city, label: 'name', rowAlias: 'code' },
      },
    ],
  },
  {
    desc: '选中项',
    key: 'selected',
    type: 'radio',
    name: 'Selected',
    list: [
      { label: '无', value: false },
      { label: '默认选中', value: true },
    ],
    value: false,
  },
  {
    desc: '加载中',
    key: 'loading',
    type: 'radio',
    name: 'Loading',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
];
const Picker = () => {
  const [attrs, setAttrs] = useState<PickerAttrsProps>({
    rowAlias: '',
    label: '',
    options: [],
    value: '',
    loading: false,
  });
  const [visible, setVisible] = useState(false);
  const toggleVisible = () => {
    setVisible(prev => !prev);
  };
  const onChange = (detail: any) => {
    if (detail.selected) {
      switch (detail.mode) {
        case 'single':
          detail.value = ['选项三'];
          break;
        case 'double':
          detail.value = ['选项三', '选项四'];
          break;
        case 'cascade':
          detail.options = city;
          detail.value = ['330000', '330600', '330681'];
          break;
        default:
          break;
      }
    }
    setAttrs({ ...detail });
    // this.setData({ attrs: { ...detail } });
  };
  return (
    <div className="picker-page">
      <Page options={options} change={onChange}>
        <TiButton onClick={toggleVisible}>点击演示</TiButton>
        <TiPopup visible={visible} position="bottom" onClose={toggleVisible} preventScroll={true}>
          <TiPicker
            rowAlias={attrs.rowAlias}
            label={attrs.label}
            value={attrs.value}
            options={attrs.options}
            loading={attrs.loading}
            visibleItemCount={5}
            onCancel={toggleVisible}
            onConfirm={toggleVisible}
            extClass="picker-ext-class"
            extMaskClass="picker-ext-mask-class"
            extHairlineClass="picker-ext-hairline-class"
            extOptionClass="picker-ext-opt-class"
            extOptionItemClass="picker-ext-opt-item-class"
          />
        </TiPopup>
      </Page>
    </div>
  );
};

export default Picker;
