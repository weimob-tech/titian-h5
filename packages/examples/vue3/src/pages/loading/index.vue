<template>
  <CustomPage :options="options" @change="change">
    <TiLoading :mode="attrs.mode" :color="attrs.color" :direction="attrs.direction" :text="attrs.text" />
  </CustomPage>
</template>
<script lang="ts" setup>
import { TiLoadingProps, TiLoading } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    list: [
      { label: '默认', value: 'circular' },
      { label: '自定义', value: 'spinner' },
    ],
    value: 'circular',
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'text',
    type: 'radio',
    name: 'Row',
    desc: '文案',
    list: [
      { label: '无', value: false, attr: { text: '' }, hiddenItems: ['direction'] },
      { label: '有', value: true, attr: { text: '加载中...' } },
    ],
    value: false,
  },
  {
    key: 'direction',
    type: 'radio',
    name: 'Direction',
    desc: '方向',
    list: [
      { label: '水平', value: 'row' },
      { label: '垂直', value: 'column' },
    ],
    value: 'row',
  },
];

type Attrs = TiLoadingProps;

const attrs = ref<Attrs>({});

const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style></style>
