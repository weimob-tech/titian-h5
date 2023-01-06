<template>
  <div class="page">
    <CustomPage :options="options" @change="change">
      <TiButton @click="toggleVisible"> 点击演示 </TiButton>
    </CustomPage>
    <TiCalendar
      :mode="attrs.mode"
      :min-date="new Date('2021-10-01').getTime()"
      :max-size="attrs.maxSize"
      :max-range="attrs.maxRange"
      :visible="visible"
      :default-value="new Date().getTime()"
      @close="toggleVisible"
      @confirm="onConfirm"
      extPopupClass="ext-popup-class"
      extPopupMaskClass="ext-popup-mask-class"
      extPopupContentClass="ext-popup-content-class"
    />
  </div>
</template>

<script setup lang="ts">
import CustomPage from '../../components/page.vue';
import { TiCalendar, TiButton } from 'titian-h5-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'txtMode',
    value: 'basic',
    desc: '文字',
    list: [
      { value: 'basic', label: '基础' },
      { value: 'description', label: '搭描述' },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    name: 'Method',
    key: 'mode',
    value: 'single',
    desc: '选择方式',
    list: [
      { value: 'single', label: '单选', hiddenItems: ['interaction', 'interaction2'] },
      { value: 'multiple', label: '多选', hiddenItems: ['interaction2'] },
      { value: 'range', label: '区间', hiddenItems: ['interaction'] },
    ],
  },
  {
    type: 'radio',
    name: 'Quick',
    key: 'state',
    value: false,
    desc: '快捷选择',
    list: [
      { value: false, label: '否' },
      { value: true, label: '是' },
    ],
  },
  {
    type: 'radio',
    name: 'Interaction',
    key: 'interaction',
    value: 'default',
    desc: '交互',
    list: [
      { value: 'default', label: '默认' },
      { value: 'max', label: '最大天数', attr: { maxSize: 3 } },
    ],
  },
  {
    type: 'radio',
    name: 'Interaction',
    key: 'interaction2',
    value: 'default',
    desc: '交互',
    list: [
      { value: 'default', label: '默认' },
      { value: 'range', label: '限选范围', attr: { maxRange: 3 } },
    ],
  },
];

interface IAttrsProps {
  color: string;
  mode: 'single' | 'multiple' | 'range';
  size: number;
  maxSize: number;
  maxRange: number;
}

const value = ref(new Date().getTime());

const attrs = ref<IAttrsProps>({ mode: 'single', color: '', size: 10, maxSize: 0, maxRange: 0 });
const change = (detail: IAttrsProps) => {
  if (detail.mode === 'colors') {
    detail.color = [detail.color1, detail.color2];
  }
  attrs.value = { ...detail };
};

const onCalendarChange = (event: any) => {
  console.log('onCalendarChange', event);
};

const visible = ref(false);
const onConfirm = () => {
  console.log('onConfirm');
  visible.value = !visible.value;
};
const onCancel = () => {
  console.log('onConfirm');
  visible.value = !visible.value;
};
const toggleVisible = () => {
  visible.value = !visible.value;
};
</script>

<style lang="less">
.btn-box {
  background-color: rgb(40, 11, 76);
}
</style>
