<template>
  <div class="steps-container">
    <!-- <TiIcon name="addressreceiving" /> -->
    <CustomPage :options="options" @change="change">
      <TiSteps :variant="attrs.variant" :options="stepsOption" :activeColor="attrs.activeColor" :icon="attrs.icon" />
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiSteps, TiStepsProps, TiIcon } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    desc: '模式',
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    list: [
      { label: '默认', value: 'default', attr: { variant: 'normal' } },
      { label: '自定义', value: 'custom', attr: { icon: 'clock-alarm', variant: 'normal' } },
      { label: '样式一', value: 'compact', attr: { icon: 'clock-alarm', variant: 'compact' } },
    ],
    value: 'compact',
  },
  { desc: '颜色', key: 'activeColor', type: 'color', name: 'Color' },
];
const stepsOption: TiStepsProps['options'] = [
  {
    title: '标题文字',
    description: '详细内容文字，详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
    icon: 'vip',
  },
  {
    title: '标题文字',
    description: '详细内容文字，详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
    icon: 'addressreceiving',
    color: 'blue',
    warnColor: 'orange',
  },
  {
    title: '标题文字',
    description: '详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
    icon: 'delivery',
  },
];

interface Attrs extends TiStepsProps {
  defaultColor?: string;
  mode?: string;
}
const attrs = ref<Attrs>({});
const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style></style>
