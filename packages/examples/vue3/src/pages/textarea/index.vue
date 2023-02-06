<template>
  <CustomPage :options="options" @change="change">
    <TiTextarea
      placeholder="请输入评论文字，限200字以内…"
      :maxlength="200"
      :ext-class="attrs.extClass"
      :show-count="attrs.showCount"
      :auto-height="attrs.autoHeight"
      @input="input"
      @focus="focus"
      @blur="blur"
    />
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiTextarea, TiTextareaProps } from '@titian-design/mobile-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
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
    desc: '字数统计',
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

const attrs = ref<TiTextareaProps>({});
const change = (detail: any) => {
  attrs.value = detail;
};
const input = (e: any) => {
  console.log('input', e);
};
const focus = (e: any) => {
  console.log('focus', e);
};
const blur = (e: any) => {
  console.log('blur', e);
};
</script>
<style>
ti-textarea::part(ext) {
  margin: 28px;
  border-radius: 12px;
  background: #f5f5f5;
}
</style>
