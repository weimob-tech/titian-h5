<template>
  <div class="page">
    <CustomPage :options="options" @change="change">
      <TiButton @click="toggleVisible"> 点击演示 </TiButton>
    </CustomPage>
    <TiPopup v-if="Object.keys(attrs).length > 0" :visible="visible" position="bottom" @close="onClick">
      <TiDatetimePicker
        :formatter="formatter"
        :sort="attrs.sort"
        :type="attrs.type || 'date'"
        :title="attrs.title"
        @confirm="onConfirm"
        @cancel="onCancel"
        ext-class="datetime-picker-ext"
        ext-hairline-class="datetime-picker-hairline"
        ext-option-item-class="datetime-picker-opt-item"
        ext-option-class="datetime-picker-opt"
        ext-mask-class="datetime-picker-mask"
        :value="value"
      />
    </TiPopup>
  </div>
</template>

<script setup lang="ts">
import CustomPage from '../../components/page.vue';
import { TiButton, TiDatetimePicker, TiPopup, TiDatetimePickerProps } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    name: 'Mode',
    key: 'mode',
    list: [
      { value: 'default', label: '基础', hiddenItems: ['custom'] },
      { value: 'custom', label: '自定义', hiddenItems: ['type'] },
    ],
    value: 'default',
  },
  {
    type: 'radio',
    desc: '样式',
    name: 'Style',
    key: 'type',
    list: [
      { value: 'year-month', label: '年月', attr: { title: '选择年月' } },
      { value: 'date', label: '年月日', attr: { title: '选择年月日' } },
      { value: 'time', label: '时分秒', attr: { title: '选择时分秒' } },
      { value: 'datetime', label: '年月日时分', attr: { title: '选择年月日时分' } },
    ],
    value: 'year-month',
  },
  {
    type: 'radio',
    desc: '自定义',
    name: 'Customize',
    key: 'custom',
    list: [
      {
        value: 'editor',
        label: '文案',
        attr: {
          formatter: (type: string, value: string | number) => {
            if (type === 'year') {
              return `${padZero(value)}年`;
            }
            if (type === 'month') {
              return `${padZero(value)}月`;
            }
            if (type === 'day') {
              return `${padZero(value)}天`;
            }
            if (type === 'hour') {
              return `${padZero(value)}时`;
            }
            return `${padZero(value)}分`;
          },
        },
      },
      { value: 'sort', label: '纵裂顺序', attr: { sort: ['month', 'day', 'year'] } },
    ],
    value: 'editor',
  },
];
function padZero(val: string | number, number = 2) {
  return `${val}`.padStart(number, '0');
}
interface DateTimePickerAttrsProps {
  formatter?: TiDatetimePickerProps['formatter'];
  sort?: TiDatetimePickerProps['sort'];
  type?: TiDatetimePickerProps['type'];
  title?: string;
}

const attrs = ref<DateTimePickerAttrsProps>({});
const change = (detail: any) => {
  if (detail.mode === 'colors') {
    detail.color = [detail.color1, detail.color2];
  }
  attrs.value = { ...detail };
};

const visible = ref(false);
const value = ref<number>(new Date().getTime());

const formatter = (type: string, value: string | number) => {
  if (type === 'year') {
    return `${padZero(value)}年`;
  }
  if (type === 'month') {
    return `${padZero(value)}月`;
  }
  if (type === 'day') {
    return `${padZero(value)}天`;
  }
  if (type === 'hour') {
    return `${padZero(value)}时`;
  }
  return `${padZero(value)}分`;
};
const onClick = () => {
  visible.value = !visible.value;
};

const toggleVisible = () => {
  console.log('toggleVisible');
  visible.value = !visible.value;
};

const onConfirm = () => {
  console.log('onConfirm');
  visible.value = !visible.value;
};

const onCancel = () => {
  console.log('onCancel');
  visible.value = !visible.value;
};
</script>

<style lang="less">
.btn-box {
  background-color: rgb(40, 11, 76);
}
</style>
