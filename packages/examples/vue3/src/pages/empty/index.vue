<template>
  <div class="page">
    <CustomPage :options="options" @change="change">
      <TiEmpty :subTitle="attrs.subtitle" :size="attrs.size" title="空态页说明文案" extClass="empty-ext">
        <TiButton
          v-if="attrs.button"
          slot="bottom"
          size="small"
          ext-css="extCss"
          :extClass="attrs.size === 'big' ? `empty-page-button-big` : `empty-page-button`"
        >
          立即前往
        </TiButton>
      </TiEmpty>
    </CustomPage>
  </div>
</template>

<script setup lang="ts">
import CustomPage from '../../components/page.vue';
import { TiEmpty } from '@titian-design/vue';
import { ref } from 'vue';
import { OptionType } from '../../components/page.interface';

const options: OptionType[] = [
  {
    key: 'button',
    type: 'radio',
    name: 'Mode',
    desc: '按钮 ',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
  {
    key: 'subtitle',
    type: 'radio',
    name: 'Subtitle',
    desc: '副标题 ',
    list: [
      { label: '无', value: '' },
      { label: '有', value: '补充说明文案请尽量简短' },
    ],
    value: '',
  },
  {
    key: 'size',
    type: 'radio',
    name: 'Size',
    desc: '规格 ',
    list: [
      { label: 'Medium', value: 'medium' },
      { label: 'Big', value: 'big' },
    ],
    value: 'big',
  },
];

interface EmptyAttrsProps {
  subtitle?: string;
  size?: string;
  button?: boolean;
}

const attrs = ref<EmptyAttrsProps>({ subtitle: '', size: '' });
const change = (detail: EmptyAttrsProps) => {
  attrs.value = { ...detail };
};
</script>

<style lang="less">
button.empty-page-button {
  margin-top: 36px;
}

button.empty-page-button-big {
  margin-top: 48px;
}
</style>
