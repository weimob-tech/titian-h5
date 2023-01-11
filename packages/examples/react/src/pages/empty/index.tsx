import { useState } from 'react';
import { TiEmpty, TiButton } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import png from './example-empty.png';
import extCss from './index.less';

interface EmptyAttrsProps {
  subtitle?: string;
  size?: string;
  button?: boolean;
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
    console.log(attrs);
    setAttrs(attrs);
  };
  console.log(attrs.size);
  return (
    <div className="empty-page">
      <Page options={options} change={change}>
        <TiEmpty sub-title={attrs.subtitle} size={attrs.size} title="空态页说明文案" extClass="empty-ext">
          {attrs.button ? (
            <TiButton
              slot="bottom"
              size="small"
              ext-css={extCss}
              extClass={attrs.size === 'big' ? `empty-page-button-big` : `empty-page-button`}
            >
              立即前往
            </TiButton>
          ) : null}
        </TiEmpty>
      </Page>
    </div>
  );
};

export default Empty;
