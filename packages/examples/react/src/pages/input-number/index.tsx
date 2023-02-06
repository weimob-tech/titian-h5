import { TiInputNumber, TiInputNumberProps } from '@titian-design/mobile-react';
import { useState } from 'react';
import Page, { OptionType } from '../../components/page';
import './index.css';
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    key: 'mode',
    value: 'bright',
    list: [
      {
        label: '默认',
        value: 'default',
        attr: { variant: 'pure' },
      },
      {
        label: '明亮',
        value: 'bright',
        attr: { variant: 'bright' },
      },
      {
        label: '填充1',
        value: 'input1',
        attr: { variant: 'block' },
      },
      {
        label: '填充2',
        value: 'input2',
        attr: { variant: 'block', extInputClass: 'ext-input-class' },
      },
      {
        label: '线框',
        value: 'line',
        attr: {
          border: true,
        },
      },
    ],
  },
  {
    type: 'radius',
    name: 'Radius',
    desc: '圆角',
    key: 'shape',
    value: 4,
    max: 14,
    min: 0,
  },
  {
    type: 'radio',
    name: 'Size',
    desc: '规格',
    key: 'size',
    value: 'medium',
    list: [
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Big',
        value: 'big',
      },
    ],
  },
  {
    type: 'radio',
    name: 'Interaction',
    desc: '交互',
    key: 'interaction',
    value: 'default',
    list: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '自适应宽度',
        value: 'auto',
        attr: {
          autoWidth: true,
        },
      },
      {
        label: '指定步长 +10',
        value: 'specify',
        attr: {
          step: 10,
        },
      },
      {
        label: '限制范围',
        value: 'restrictedRange',
        attr: {
          min: 0,
          max: 20,
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Unfold',
    desc: '收起',
    key: 'thumbnail',
    value: false,
    list: [
      {
        label: '否',
        value: false,
      },
      {
        label: '是',
        value: true,
      },
    ],
  },
];

const extCss = `
  .ext-input-class { --input-number-background: #fff; }
  .ext-minus-class, .ext-plus-class { --base-radius-size: var(--input-number-radius-size, 0); }
`;
interface InputNumberAttrs extends TiInputNumberProps {
  group?: Array<TiInputNumberProps & { title: string; readonly: boolean; titleClass: string }>;
}

const InputNumber = () => {
  const [attrs, setAttrs] = useState<InputNumberAttrs>({});
  const [value, setValue] = useState(0);
  const change = (detail: any) => {
    if (detail.shape !== undefined) {
      const value = detail.shape;
      detail.extStyle = `${detail.extStyle || ''};--input-number-radius: ${value}px;`;
    }
    setAttrs({
      step: 1,
      min: Number.MIN_SAFE_INTEGER,
      max: Number.MAX_SAFE_INTEGER,
      extPlusClass: 'ext-plus-class',
      extMinusClass: 'ext-minus-class',
      ...detail,
    });
  };
  return (
    <Page options={options} change={change}>
      <div className="box">
        <TiInputNumber
          value={value}
          size={attrs.size}
          variant={attrs.variant}
          border={attrs.border}
          ext-style={attrs.extStyle}
          thumbnail={attrs.thumbnail}
          auto-width={attrs.autoWidth}
          max={attrs.max}
          min={attrs.min}
          step={attrs.step}
          ext-plus-class={attrs.extPlusClass}
          ext-minus-class={attrs.extMinusClass}
          ext-input-class={attrs.extInputClass}
          ext-css={extCss}
          onChange={e => {
            console.log('onChange', e);
          }}
          onFocus={e => {
            console.log('onFocus', e);
          }}
          onBlur={e => {
            console.log('onBlur', e);
          }}
          onPlus={e => {
            console.log('onPlus', e);
          }}
          onMinus={e => {
            console.log('onBlur', e);
          }}
        ></TiInputNumber>
      </div>
    </Page>
  );
};

export default InputNumber;
