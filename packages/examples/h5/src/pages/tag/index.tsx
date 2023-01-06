import { useState } from 'react';
import Page, { OptionType } from '../../components/page';

enum ETagVariant {
  /** 实心 */
  CONTAINED = 'contained',

  /** 填充 */
  FILLED = 'filled',

  /** 描边 */
  OUTLINED = 'outlined',
}

enum ETagSize {
  /** 小 */
  SMALL = 'small',

  /** 中 */
  MEDIUM = 'medium',

  /** 大 */
  BIG = 'big',
}

enum ETagShape {
  /** 圆角胶囊 */
  CAPSULE = 'capsule',

  /** 圆角 */
  ROUND = 'round',

  /** 矩形 */
  RECT = 'rect',

  /** 树叶形 */
  LEAF = 'leaf',
}
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'variant',
    desc: '模式 ',
    list: [
      { value: 'contained', label: '面性强调', attr: { text: '面性强调' } },
      { value: 'filled', label: '面性次要', attr: { text: '面性次要' } },
      { value: 'outlined', label: '线性按钮', attr: { text: '线性强调' } },
    ],
    value: 'contained',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radius',
    name: 'shape',
    key: 'shape',
    desc: '圆角',
    value: 16,
  },

  {
    type: 'radio',
    name: 'icon',
    key: 'icon',
    desc: '图标',
    value: 'none',
    list: [
      { value: 'none', label: '无' },
      {
        value: 'leftIcon',
        label: '左图标',
        attr: { leftIcon: 'rate-star' },
      },
      {
        value: 'rightIcon',
        label: '右图标',
        attr: { rightIcon: 'rate-star' },
      },
    ],
  },
  {
    type: 'radio',
    name: 'size',
    key: 'size',
    list: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'big', label: 'Big' },
    ],
    desc: '规格',
    value: 'medium',
  },
];
const Icon = () => {
  // type t1 = HTMLElementTagNameMap['ti-tag']['size']['SMALL'];
  const [attrs, setAttrs] = useState<{
    text?: string;
    variant?: ETagVariant;
    color?: string;
    size?: ETagSize;
    shape?: ETagShape;
    leftIcon?: string;
    rightIcon?: string;
  }>({
    color: '',
    size: ETagSize.MEDIUM,
  });
  const change = (attrs: any) => {
    if (attrs.mode === 'colors') {
      attrs.color = [attrs.color1, attrs.color2];
    }
    console.log(attrs);
    setAttrs(attrs);
  };
  return (
    <Page options={options} change={change}>
      <ti-tag
        variant={attrs.variant}
        color={attrs.color}
        size={attrs.size}
        left-icon={attrs.leftIcon}
        right-icon={attrs.rightIcon}
        ext-class="ext-class"
      >
        {attrs.text}
      </ti-tag>
    </Page>
  );
};

export default Icon;
