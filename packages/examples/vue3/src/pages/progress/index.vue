<template>
  <CustomPage :options="options" @change="change">
    <div :style="{ width: '267px' }" v-if="attrs.mode === 'line'">
      <TiProgress
        :value="attrs.value || 0"
        :color="attrs.color"
        :showProgress="attrs.showProgress"
        :strokeWidth="attrs.strokeWidth"
      />
    </div>
    <div className="circle" v-if="attrs.mode === 'circle'">
      <TiCircleProgress
        :value="attrs.value || 0"
        :color="attrs.color"
        :showProgress="attrs.showProgress"
        :strokeWidth="attrs.strokeWidth"
        :buffer="(attrs.value || 0) + 10"
      />
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import CustomPage from '../../components/page.vue';
import { TiProgressProps, TiProgress, TiCircleProgress } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    list: [
      { label: '直线', value: 'line' },
      { label: '环形', value: 'circle' },
    ],
    value: 'line',
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },

  {
    key: 'strokeWidth',
    type: 'radio',
    name: 'Size',
    desc: '规格',
    list: [
      { label: 'Medium', value: '8' },
      { label: 'Big', value: '16' },
    ],
    value: '8',
  },
  {
    key: 'information',
    type: 'radio',
    name: 'Information',
    desc: '信息',
    list: [
      { label: '无', value: 0, attr: { showProgress: false } },
      { label: '进度', value: 1, attr: { showProgress: true } },
    ],
    value: 0,
  },
  { key: 'value', type: 'radius', name: 'Progress', desc: '进度', value: 75, max: 100 },
];
interface Attrs extends Partial<TiProgressProps> {
  mode?: 'line' | 'circle';
}

const attrs = ref<Attrs>({});

const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style>
.circle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 267px;
}
</style>
