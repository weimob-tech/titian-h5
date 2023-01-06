<template>
  <CustomPage :options="options" @change="change" />

  <TiCellGroup>
    <TiCell v-for="(item, index) in arr" :key="index" title="向下滑动页面" />
  </TiCellGroup>
  <TiBackTop :text="attrs.text" extClass="back-top" />
</template>
<script lang="ts" setup>
import { TiBackTopProps, TiCellGroup, TiCell, TiBackTop } from 'titian-h5-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';

const arr = ref(Array(100).fill(1));
const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'mode',
    name: 'Mode',
    value: true,
    list: [
      {
        label: '图标',
        value: true,
      },
      {
        label: '图文',
        value: false,
        attr: { text: '顶部' },
      },
    ],
  },
];
interface Attrs extends TiBackTopProps {}

const attrs = ref<Attrs>({});

const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style>
body {
  overflow: auto !important;
}

.page {
  min-height: auto !important;
}
</style>
