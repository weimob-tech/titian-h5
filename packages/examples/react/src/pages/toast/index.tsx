import { $tiToast } from '@titian-design/react';
import Page, { OptionType } from '../../components/page';
import { useState, useId, useCallback, memo, useEffect, useRef } from 'react';
import './index.less';
import { mergeOptionIntoAttrs } from '../../util/index';

const options: OptionType[] = [
  {
    desc: '模式',
    key: 'state',
    type: 'radio',
    name: 'Mode',
    list: [
      { label: '文字', value: 1, hiddenItems: ['iconWord'], attr: {} },
      { label: '图文', value: 2, hiddenItems: ['word'], attr: {} },
    ],
    value: 1,
  },
  {
    desc: '文字',
    key: 'word',
    type: 'radio',
    name: 'Word',
    list: [
      {
        label: '单行',
        value: 1,
        attr: { action: 'info', text: '只有一行' },
        hiddenItems: ['style'],
      },
      {
        label: '多行',
        value: 2,
        attr: { action: 'info', text: '我有很多行我有很多行我有很多行' },
        hiddenItems: ['style'],
      },
    ],
    value: 1,
  },
  {
    desc: '文字',
    key: 'iconWord',
    type: 'radio',
    name: 'Word',
    list: [
      { label: '加载', value: 1, attr: { text: '加载中', action: 'loading' } },
      { label: '成功', value: 2, hiddenItems: ['style'], attr: { text: '成功信息', action: 'success' } },
      {
        label: '失败',
        value: 3,
        hiddenItems: ['style'],
        attr: { text: '失败信息', action: 'fail' },
      },
      {
        label: '提示',
        value: 4,
        hiddenItems: ['style'],
        attr: { text: '提示信息', action: 'warn', iconName: 'question' },
      },
    ],
    value: 1,
  },
  {
    desc: '样式',
    key: 'style',
    type: 'radio',
    name: 'Style',
    list: [
      { label: '图标1', value: 1, attr: { iconName: 'clock-alarm' } },
      { label: '图标2', value: 2, attr: { iconName: 'rate-star-highlight' } },
      { label: '图标3', value: 3, attr: { iconName: 'go-to-top' } },
    ],
    value: 1,
  },
  {
    desc: '回调',
    key: 'finishedCallback',
    type: 'radio',
    name: 'Callback',
    list: [
      {
        label: '回调1',
        value: 1,
        property: {
          finishedCallback: () => {
            console.log('执行了 Callback 1!');
          },
        },
      },
      {
        label: '回调2',
        value: 2,
        property: {
          finishedCallback: () => {
            console.log('执行了 Callback 2!');
          },
        },
      },
    ],
    value: 1,
  },
];

const Toast = () => {
  const change = useCallback((detail: any) => {
    const attr = detail;

    const afterAttr = mergeOptionIntoAttrs(options, attr);
    const { action, ...other } = afterAttr;
    $tiToast[action as 'loading']({
      ...other,
      extPopupClass: 'ext-toast-popup',
      extPopupContentClass: 'ext-toast-content-popup',
      extPopupMaskClass: 'ext-toast-mask-popup',
    });
  }, []);

  return <Page options={options} change={change}></Page>;
};
export default Toast;
