<template>
  <CustomPage :options="options" @change="change"> </CustomPage>
</template>

<script lang="ts" setup>
import { $tiToast } from 'titian-h5-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { OptionType } from '../../components/page.interface';
import { mergeOptionIntoAttrs } from '../../utils/index';

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

const change = (detail: any) => {
  const afterAttr = mergeOptionIntoAttrs(options, detail);
  const { action, ...other } = afterAttr;
  $tiToast[action as 'loading']({
    ...other,
    extPopupClass: 'ext-toast-popup',
    extPopupContentClass: 'ext-toast-content-popup',
    extPopupMaskClass: 'ext-toast-mask-popup',
  });
};
</script>
<style lang="less"></style>
