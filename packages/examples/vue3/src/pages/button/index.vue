<template>
  <CustomPage :options="options" @change="change">
    <div class="container button">
      <TiButton
        :type="attrs.type || 'primary'"
        :variant="attrs.variant"
        :color="attrs.type === 'simple' ? '' : attrs.color"
        :disabled="attrs.disabled"
        :suffix-icon="attrs.suffixIcon"
        :prefix-icon="attrs.prefixIcon"
        :loading-class="attrs.LoadingClass"
        :loading="attrs.loading"
        :size="attrs.size"
        :ext-style="attrs.extStyle"
        :block="attrs.block"
        hairline
      >
        {{ attrs.text }}
      </TiButton>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiButton } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

interface ButtonAttrs {
  variant?: string;
  color?: string;
  disabled?: boolean;
  suffixIcon?: string;
  prefixIcon?: string;
  loading?: boolean;
  size?: string;
  extStyle?: string;
  block?: boolean;
  text?: string;
  LoadingClass?: string;
  type?: string;
}
const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'variant',
    desc: '模式 ',
    list: [
      { value: 'contained', label: '面性强调', attr: { text: '面性强调', type: 'primary' } },
      { value: 'filled', label: '面性次要', attr: { text: '面性次要', type: 'primary' } },
      { value: 'outlined', label: '线性按钮', attr: { text: '线性强调', type: 'primary' } },
      {
        value: 'outlined1',
        label: '线性次要',
        attr: { text: '线性次要', type: 'simple', variant: 'outlined', color: '' },
        hiddenItems: ['color'],
      },
      {
        value: 'outline',
        label: '渐变按钮',
        attr: {
          variant: 'contained',
          color: 'linear-gradient(270deg, rgba(239, 71, 31, 0.75) 0%, #FFBE70 100%)',
          text: '渐变按钮',
          type: 'primary',
        },
        hiddenItems: ['color'],
      },
      { value: 'text', label: '文字按钮', attr: { text: '文字按钮', type: 'primary' } },
    ],
    value: 'contained',
  },
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radius',
    name: 'Shape',
    key: 'shape',
    desc: '圆角',
    value: 8,
    max: 50,
  },
  {
    type: 'radio',
    name: 'Disabled',
    key: 'disabled',
    list: [
      { value: false, label: '正常' },
      { value: true, label: '禁用' },
    ],
    desc: '禁用',
    value: false,
  },
  {
    type: 'radio',
    name: 'Icon',
    key: 'icon',
    list: [
      { value: '', label: '无' },
      {
        value: 'suffixIcon',
        label: '左图标',
        attr: { prefixIcon: 'home' },
        hiddenItems: ['loading'],
      },
      {
        value: 'prefixIcon',
        label: '右图标',
        attr: { suffixIcon: 'arrow-right' },
        hiddenItems: ['loading'],
      },
    ],
    desc: '图标',
    value: '',
  },
  {
    type: 'radio',
    name: 'Loading',
    key: 'loading',
    list: [
      { value: '无', label: '无', attr: { loading: false } },
      { value: '文字加载', label: '文字加载', attr: { loading: true } },
      { value: '纯加载', label: '纯加载', attr: { loading: true, text: '', LoadingClass: 'loading-class' } },
    ],
    desc: '加载',
    value: '无',
  },
  {
    type: 'radio',
    name: 'Width',
    key: 'width',
    value: 'auto',
    desc: '宽度',
    list: [
      { value: 'extStyle', label: '定宽', attr: { extStyle: 'width: 200px;' } },
      { value: 'auto', label: '自适应' },
      { value: 'full', label: '通栏', attr: { block: true } },
    ],
  },
  {
    type: 'radio',
    name: 'Size',
    key: 'size',
    list: [
      { value: 'tiny', label: 'Tiny' },
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'big', label: 'Big' },
      { value: 'large', label: 'Large' },
    ],
    desc: '规格',
    value: 'medium',
  },
];
const attrs = ref<ButtonAttrs>({});
const change = (detail: any) => {
  if (detail.shape !== undefined) {
    let value = detail.shape;

    detail.extStyle = `${detail.extStyle || ''}--button-radius:${value}px;`;
  }
  attrs.value = { ...attrs, text: '按钮', ...detail };
};
</script>
<style>
.container.button {
  overflow: visible;

  border-radius: 0;

  background-color: transparent;

  text-align: center;
}
</style>
