<template>
  <div class="page">
    <CustomPage :options="options" @change="onChange">
      <TiButton @click="toggleVisible">点击演示</TiButton>
      <TiPopup :visible="visible" position="bottom" @close="toggleVisible" :preventScroll="true">
        <TiPicker
          :rowAlias="attrs.rowAlias"
          :label="attrs.label"
          :value="attrs.value"
          :options="attrs.options"
          :loading="attrs.loading"
          :visibleItemCount="5"
          @cancel="toggleVisible"
          @confirm="toggleVisible"
          @reachBottom="onReachBottom"
          extClass="picker-ext-class"
          extMaskClass="picker-ext-mask-class"
          extHairlineClass="picker-ext-hairline-class"
          extOptionClass="picker-ext-opt-class"
          extOptionItemClass="picker-ext-opt-item-class"
        />
      </TiPopup>
    </CustomPage>
  </div>
</template>

<script setup lang="ts">
import CustomPage from '../../components/page.vue';
import { TiButton, TiPopup, TiPicker } from 'titian-h5-vue';
import { ref } from 'vue';
import { OptionType } from '../../components/page.interface';
import city from './city';

const options: OptionType[] = [
  {
    desc: '模式',
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    value: 'single',
    list: [
      { label: '单列', value: 'single', attr: { options: ['选项一', '选项二', '选项三', '选项四', '选项五'] } },
      {
        label: '双列',
        value: 'double',
        attr: {
          options: [
            ['选项一', '选项二', '选项三', '选项四', '选项五'],
            ['选项一', '选项二', '选项三', '选项四', '选项五'],
          ],
        },
      },
      {
        label: '级联',
        value: 'cascade',
        attr: { options: city, label: 'name', rowAlias: 'code' },
      },
    ],
  },
  {
    desc: '选中项',
    key: 'selected',
    type: 'radio',
    name: 'Selected',
    list: [
      { label: '无', value: false },
      { label: '默认选中', value: true },
    ],
    value: false,
  },
  {
    desc: '加载中',
    key: 'loading',
    type: 'radio',
    name: 'Loading',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
];

interface PickerAttrsProps {
  rowAlias: string | number;
  label: string;
  value: any;
  options: unknown[];
  loading: boolean;
}

const visible = ref(false);

const toggleVisible = () => {
  console.log('toggle visible');
  visible.value = !visible.value;
};

const onReachBottom = () => {
  console.log('onReachBottom');
};

const attrs = ref<PickerAttrsProps>({ rowAlias: '', label: '', options: [], value: '', loading: false });

const onChange = (detail: any) => {
  if (detail.selected) {
    switch (detail.mode) {
      case 'single':
        detail.value = ['选项三'];
        break;
      case 'double':
        detail.value = ['选项三', '选项四'];
        break;
      case 'cascade':
        detail.options = city;
        detail.value = ['330000', '330600', '330681'];
        break;
      default:
        break;
    }
  }
  attrs.value = detail;
};
</script>

<style lang="less"></style>
