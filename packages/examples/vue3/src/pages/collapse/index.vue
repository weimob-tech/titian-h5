<template>
  <CustomPage :options="options" @change="change">
    <div className="collapse-page">
      <TiCollapse :="attrs" extOptionClass="collapse-opt" extOptionContentClass="collapse-opt-content"></TiCollapse>
    </div>
  </CustomPage>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TiCollapse } from 'titian-h5-vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';

interface CollapseAttrsProps {
  value?: any[];
  repel?: boolean;
  options?: any[];
  mode?: string;
  divider?: boolean;
}
const options: IOptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    desc: '模式',
    name: 'Mode',
    list: [
      { value: 'base', label: '基础' },
      { value: 'accordion', label: '手风琴' },
    ],
    value: 'base',
  },
  {
    key: 'divider',
    type: 'radio',
    desc: '分割线',
    name: 'Divider',
    list: [
      { value: true, label: '有' },
      { value: false, label: '无' },
    ],
    value: true,
  },
];

let obj = {
  divider: true,
  value: [1],
  repel: true,
  mode: 'accordion',
  options: [
    {
      title: '标题文字A',
      content: '- 标题A下的内容 -',
    },
    {
      title: '标题文字B',
      content: '- 标题B下的内容 -',
    },
  ],
};

const attrs = ref<CollapseAttrsProps>(obj);

const change = (detail: CollapseAttrsProps) => {
  attrs.value = detail;

  detail.repel = detail.mode === 'accordion';

  obj = { ...obj, ...detail };

  attrs.value = obj;
};
</script>
<style>
body {
  overflow: auto !important;
}

.page {
  min-height: auto !important;
}
.collapse-page {
  width: calc(100% - 56px);
  margin: 0 28px;
  overflow: hidden;

  border-radius: 10px;

  background: #fff;
}
</style>
