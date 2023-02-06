import { useState } from 'react';
import { TiButton, TiPopup, TiDatetimePicker, TiDatetimePickerProps } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.less';

function padZero(val: string | number, number = 2) {
  return `${val}`.padStart(number, '0');
}
interface DateTimePickerAttrsProps {
  formatter?: TiDatetimePickerProps['formatter'];
  sort?: TiDatetimePickerProps['sort'];
  type?: TiDatetimePickerProps['type'];
  title?: string;
}
const options: OptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    name: 'Mode',
    key: 'mode',
    list: [
      { value: 'default', label: '基础', hiddenItems: ['custom'] },
      { value: 'custom', label: '自定义', hiddenItems: ['type'] },
    ],
    value: 'default',
  },
  {
    type: 'radio',
    desc: '样式',
    name: 'Style',
    key: 'type',
    list: [
      { value: 'year-month', label: '年月', attr: { title: '选择年月' } },
      { value: 'date', label: '年月日', attr: { title: '选择年月日' } },
      { value: 'time', label: '时分秒', attr: { title: '选择时分秒' } },
      { value: 'datetime', label: '年月日时分', attr: { title: '选择年月日时分' } },
    ],
    value: 'year-month',
  },
  {
    type: 'radio',
    desc: '自定义',
    name: 'Customize',
    key: 'custom',
    list: [
      {
        value: 'editor',
        label: '文案',
        attr: {
          formatter: (type: string, value: string | number) => {
            if (type === 'year') {
              return `${padZero(value)}年`;
            }
            if (type === 'month') {
              return `${padZero(value)}月`;
            }
            if (type === 'day') {
              return `${padZero(value)}天`;
            }
            if (type === 'hour') {
              return `${padZero(value)}时`;
            }
            return `${padZero(value)}分`;
          },
        },
      },
      { value: 'sort', label: '纵裂顺序', attr: { sort: ['month', 'day', 'year'] } },
    ],
    value: 'editor',
  },
];
const DateTimePicker = () => {
  const [attrs, setAttrs] = useState<DateTimePickerAttrsProps>({});
  const [visible, setVisible] = useState(false);
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    console.log(attrs);
    setAttrs(attrs);
  };
  const onClick = () => {
    setVisible(!visible);
  };
  const formatter = (type: string, value: string | number) => {
    if (type === 'year') {
      return `${padZero(value)}年`;
    }
    if (type === 'month') {
      return `${padZero(value)}月`;
    }
    if (type === 'day') {
      return `${padZero(value)}天`;
    }
    if (type === 'hour') {
      return `${padZero(value)}时`;
    }
    return `${padZero(value)}分`;
  };
  const [value] = useState(new Date().getTime());

  const onCancel = (event: any) => {
    setVisible(false);
    console.log('onCancel', event);
  };

  const onConfirm = (event: any) => {
    setVisible(false);
    console.log('onConfrim', event);
  };

  return (
    <div className="datetime-picker-page">
      <Page options={options} change={change}>
        <TiButton onClick={onClick}>点击演示</TiButton>
      </Page>
      {Object.keys(attrs).length === 0 ? null : (
        <TiPopup visible={visible} position="bottom" onClose={onClick}>
          <TiDatetimePicker
            formatter={formatter}
            sort={attrs.sort}
            type={attrs.type || 'date'}
            title={attrs.title}
            onCancel={onCancel}
            onConfirm={onConfirm}
            ext-class="datetime-picker-ext"
            ext-hairline-class="datetime-picker-hairline"
            ext-option-item-class="datetime-picker-opt-item"
            ext-option-class="datetime-picker-opt"
            ext-mask-class="datetime-picker-mask"
            value={value}
          />
        </TiPopup>
      )}
    </div>
  );
};

export default DateTimePicker;
