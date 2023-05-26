<template>
  <CustomPage :options="options" @change="change">
    <TiRate
      @change="onRageChanged"
      :value="attrs.value"
      :count="attrs.count"
      :allow-half="attrs.allowHalf"
      :icon="attrs.icon"
      :read-only="attrs.readOnly"
      :disabled="attrs.disabled"
    ></TiRate>
  </CustomPage>
</template>

<script lang="ts" setup>
import { TiRate } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    desc: '模式',
    key: 'state',
    type: 'radio',
    name: 'State',
    list: [
      { label: '基础', value: 1 },
      { label: '只读禁用', value: 2, attr: { readOnly: true, disabled: true } },
      { label: '自定义', value: 3, attr: { icon: 'tabbar-vip-highlight' } },
    ],
    value: 1,
  },
  { desc: '颜色', key: 'color', type: 'color', name: 'Color' },
  {
    desc: '数量',
    key: 'count',
    type: 'radio',
    name: 'Number',
    list: [
      { label: '五星', value: 5 },
      { label: '六星', value: 6 },
      { label: '七星', value: 7 },
    ],
    value: 5,
  },

  {
    desc: '半星',
    key: 'allowHalf',
    type: 'radio',
    name: 'Half',
    list: [
      { label: '否', value: false },
      { label: '是', value: true },
    ],
    value: false,
  },
];

interface RateAttrs {
  value?: number;
  allowHalf?: boolean;
  count?: number;
  icon?: string;
  emptyIcon?: string;
  readOnly?: boolean;
  disabled?: boolean;
}

const attrs = ref<RateAttrs>({});

const change = (detail: Attrs) => {
  console.log('change', detail);
  attrs.value = detail;
};

const onRageChanged = (event: CustomEvent) => {
  const { value } = event.detail;
  attrs.value = { ...attrs.value, value };
};
</script>
<style></style>
