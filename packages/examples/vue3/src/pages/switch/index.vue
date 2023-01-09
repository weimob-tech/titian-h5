<template>
  <CustomPage :options="options" @change="change">
    <TiSwitch
      ext-class="ext-switch-class"
      :loading="attrs.loading"
      :size="attrs.size"
      :active-color="attrs.color"
      :disabled="attrs.disabled"
      @change="switchChange"
    />
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiSwitch } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: '1' },
      { label: '禁用', value: '2', attr: { disabled: true } },
      { label: '加载', value: '3', attr: { loading: true } },
    ],
    value: '1',
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'size',
    type: 'radio',
    name: 'Size',
    desc: '规格',
    list: [
      { label: 'Medium', value: '40' },
      { label: 'Big', value: '56' },
    ],
    value: '40',
  },
];

interface SwitchAttrsProps {
  color: string | undefined;
  size: number;
  rotate?: string;
  loading: boolean;
  disabled: boolean;
}
const attrs = ref<SwitchAttrsProps>({ color: '', size: 40, loading: false, disabled: false });
const change = (detail: any) => {
  attrs.value = detail;
};
const switchChange = (e: any) => {
  console.log(e);
};
</script>
<style></style>
