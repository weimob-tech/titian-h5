import { useState, useRef, useEffect, useCallback } from 'react';
import { TiTag } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.less';
interface TagAttrsProps {
  variant: 'contained' | 'filled' | 'outlined';
  color: string;
  size: 'small' | 'medium' | 'big';
  shape: 'normal' | 'coupon';
  leftIcon: string;
  rightIcon: string;
  text: string;
  cssVariable: object;
}
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Style',
    key: 'styleType',
    desc: '风格',
    value: 0,
    list: [
      {
        value: 0,
        label: '潮流',
        attr: {
          cssVariable: { '--base-radius-size': '-999vw', '--capsule-radius-size': '-999vw' },
        },
      },
      {
        value: 1,
        label: '通用',
        attr: {
          cssVariable: { '--base-radius-size': '0vw', '--capsule-radius-size': '0vw' },
        },
      },
      {
        value: 2,
        label: '可爱',
        attr: {
          cssVariable: { '--base-radius-size': '1.06667vw', '--capsule-radius-size': '999vw' },
        },
      },
    ],
  },
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
    type: 'radio',
    name: 'TagShape',
    key: 'shape',
    desc: '形状 ',
    list: [
      { value: 'normal', label: '常规' },
      { value: 'coupon', label: '优惠券' },
    ],
    value: 'normal',
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
    name: 'icon',
    key: 'icon',
    desc: '图标',
    value: 'none',
    list: [
      { value: 'none', label: '无', attr: { leftIcon: '', rightIcon: '' } },
      {
        value: 'leftIcon',
        label: '左图标',
        attr: { leftIcon: 'home', rightIcon: '' },
      },
      {
        value: 'rightIcon',
        label: '右图标',
        attr: { leftIcon: '', rightIcon: 'arrow-right' },
      },
      {
        value: 'leftRightIcon',
        label: '左右图标',
        attr: { leftIcon: 'home', rightIcon: 'arrow-right' },
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
const Tag = () => {
  const [attrs, setAttrs] = useState<TagAttrsProps>({
    variant: 'contained',
    color: '',
    size: 'small',
    shape: 'normal',
    leftIcon: '',
    rightIcon: '',
    text: '按钮',
    cssVariable: {},
  });
  const change = useCallback(
    (newAttrs: any) => {
      setAttrs({ ...attrs, ...newAttrs });
    },
    [attrs],
  );

  return (
    <div style={attrs.cssVariable}>
      <Page options={options} change={change}>
        <div className="tag-page">
          <TiTag
            variant={attrs.variant}
            color={attrs.color}
            size={attrs.size}
            leftIcon={attrs.leftIcon}
            shape={attrs.shape}
            rightIcon={attrs.rightIcon}
          >
            {attrs.text}
          </TiTag>
        </div>
      </Page>
    </div>
  );
};

export default Tag;
