<template>
  <CustomPage :options="options" @change="change">
    <div class="slider-wrap">
      <TiSlider
        :value="slider"
        :extClass="attrs.extClass"
        :min="attrs.min"
        :max="attrs.max"
        :step="attrs.step"
        @change="onChange3"
      />
    </div>
  </CustomPage>
</template>

<script lang="ts" setup>
import { TiSliderProps, TiSlider } from 'titian-h5-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { OptionType } from '../../components/page.interface';
import { mergeOptionIntoAttrs } from '../../utils/index';

const options: OptionType[] = [
  {
    desc: '模式',
    key: 'state',
    type: 'radio',
    name: 'Mode',
    list: [
      { label: '基础', value: 1 },
      { label: '自定义', value: 2, attr: { extClass: 'slider-thumb-class' } },
    ],
    value: 1,
  },
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    desc: '交互',
    key: 'interaction',
    type: 'radio',
    name: 'Interaction',
    list: [
      { label: '默认', value: 1 },
      { label: '指定范围', value: 2, attr: { min: -100, max: 100 } },
      { label: '指定步长', value: 3, attr: { step: 20 } },
    ],
    value: 1,
  },
  {
    desc: '结果类型',
    key: 'orientation',
    type: 'radio',
    name: 'Type',
    list: [
      { label: '值', value: 0, attr: { orientation: 15 } },
      { label: '范围', value: 1, attr: { orientation: [15, 50] } },
    ],
    value: 0,
  },
];

interface Attrs extends Omit<TiSliderProps, 'value'> {
  extClass?: string;
  min?: number;
  max?: number;
  step?: number;
  orientation?: string;
  value?: number;
}

const attrs = ref<Attrs>({});

const slider = ref(15);

const change = (detail: Attrs) => {
  let afterAttrs = mergeOptionIntoAttrs(options, detail);
  if (JSON.stringify(slider) !== JSON.stringify(detail.orientation)) {
    slider.value = detail.orientation;
  }
  attrs.value = afterAttrs;
};

const onChange3 = (event: any) => {
  const { value } = event.detail;
  event.preventDefault();
  console.log('onChange3', value);
};
</script>
<style>
.slider-wrap {
  width: 80%;
  margin-bottom: 30px;
}

.slider-thumb-class::before {
  content: '';

  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;

  transform: translate(-50%, -50%);

  border-radius: 50%;

  background-color: #fa2c19;
}
</style>
