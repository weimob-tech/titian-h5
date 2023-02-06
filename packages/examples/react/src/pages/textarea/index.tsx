import { TiTextarea, TiTextareaProps } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import { useState } from 'react';
import './index.css';
import extCss from './ext.css';

const options: OptionType[] = [
  {
    type: 'radio',
    key: 'mode',
    name: 'Mode',
    desc: '模式',
    list: [
      { value: 'base', label: '基础' },
      { value: 'custom', label: '输入框', attr: { extClass: 'ext' } },
    ],
    value: 'base',
  },
  {
    type: 'radio',
    key: 'showCount',
    name: 'Count',
    desc: '字数统计 ',
    list: [
      { value: false, label: '无' },
      { value: true, label: '有' },
    ],
    value: false,
  },
  {
    type: 'radio',
    key: 'autoHeight',
    name: 'Height',
    desc: '高度',
    list: [
      { value: false, label: '定高' },
      { value: true, label: '自适应' },
    ],
    value: false,
  },
];
interface TextareaAttrs extends TiTextareaProps {
  extClass?: string;
  showCount?: boolean;
}
const Textarea = () => {
  const [attrs, setAttrs] = useState<TextareaAttrs>({} as TextareaAttrs);
  const change = (detail: any) => {
    setAttrs({ ...detail });
  };
  return (
    <Page options={options} change={change}>
      <div className="container">
        <TiTextarea
          autoHeight={attrs.autoHeight}
          placeholder="请输入评论文字，限200字以内…"
          maxlength={200}
          ext-class={attrs.extClass}
          ext-css={extCss}
          show-count={attrs.showCount}
          onInput={e => {
            console.log('input', e);
          }}
          onFocus={e => {
            console.log('focus', e);
          }}
          onBlur={e => {
            console.log('blur', e);
          }}
        />
      </div>
    </Page>
  );
};
export default Textarea;
