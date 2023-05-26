<template>
  <div :style="style">
    <CustomPage :options="options" @change="change">
      <TiPrice label="销售价" unit="$" :prefix="attrs.prefix" :value="29.99" :suffix="attrs.suffix" />
    </CustomPage>
  </div>
</template>

<script lang="ts" setup>
import { TiPrice } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  {
    key: 'prefix',
    type: 'radio',
    name: 'State',
    desc: '前缀',
    list: [
      { label: '无', value: 1, attr: { prefix: '' } },
      { label: '文案', value: 2, attr: { prefix: '最低' } },
    ],
    value: 1,
  },
  {
    key: 'suffix',
    type: 'radio',
    name: 'State',
    desc: '后缀',
    list: [
      { label: '无', value: 1, attr: { suffix: '' } },
      { label: '文案', value: 2, attr: { suffix: '起' } },
    ],
    value: 1,
  },
];

interface Attrs {
  color?: string;
  suffix?: string;
  prefix?: string;
}

const attrs = ref<Attrs>({});
const style: any = ref<any>({});

const change = (detail: Attrs) => {
  console.log('change', detail);
  attrs.value = detail;
  style.value = {
    '--theme-price': detail.color,
  };
};
</script>
<style>
.popup-center {
  width: 240px;
  height: 240px;
}

.popup-left {
  width: 150px;
}

.popup-right {
  width: 150px;
}

.popup-bottom {
  height: 648px;
}

.popup-right,
.popup-left {
  height: 100vh;
}
</style>
