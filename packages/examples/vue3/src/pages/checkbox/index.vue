<template>
  <div :style="style">
    <CustomPage :options="options" @change="change" pageClass="checkbox-button-page">
      <TiCheckboxGroup :max="attrs.limit" :defaultValue="defaultValue" :color="attrs.color" :icon="attrs.iconName">
        <div v-show="attrs.type === 'TiCheckboxButton'">
          <TiCheckboxButton
            v-for="(item, index) in attrs.group"
            :label="item"
            :disabled="attrs.disabled"
            :value="index"
            :key="`TiCheckboxButton${index}`"
          >
            <TiImage
              v-if="attrs.ext === 'image'"
              :extStyle="extStyle"
              slot="prefix"
              :width="40"
              :radius="4"
              :height="40"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
            />
          </TiCheckboxButton>
        </div>
        <div v-show="attrs.type !== 'TiCheckboxButton'">
          <TiCheckbox
            v-for="(item, index) in attrs.group"
            :label="item"
            :disabled="attrs.disabled"
            :value="index"
            :key="index"
          />
        </div>
      </TiCheckboxGroup>
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { TiCheckboxGroupProps, TiCheckboxGroup, TiCheckbox, TiCheckboxButton } from '@titian-design/vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';
import { addUnit } from '../../utils';

interface Attrs {
  limit?: TiCheckboxGroupProps['max'];
  group?: string[];
  iconName?: string;
  size?: number;
  radius?: number | string;
  color?: string;
  disabled?: boolean;
  type?: 'TiCheckbox' | 'TiCheckboxButton';
  ext?: 'normal' | 'icon' | 'image';
}
const defaultValue = [0];
const attrs = ref<Attrs>({});
const options: IOptionType[] = [
  {
    key: 'type',
    type: 'radio',
    name: 'Type',
    value: 'TiCheckbox',
    desc: '模式',
    list: [
      { label: '标准', value: 'TiCheckbox', hiddenItems: ['ext'] },
      { label: '按钮', value: 'TiCheckboxButton' },
    ],
  },
  {
    key: 'ext',
    type: 'radio',
    name: '',
    value: 'normal',
    desc: '搭配',
    list: [
      { label: '常规', value: 'normal', attr: { iconName: '' } },
      { label: '搭图标', value: 'icon', attr: { iconName: 'right-custom' } },
      { label: '搭图片', value: 'image', attr: { iconName: '' } },
    ],
  },
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: 1 },
      { label: '禁用', value: 2, attr: { disabled: true } },
    ],
    value: 1,
    attr: {
      group: ['选项 A', '选项 B', '选项 C'],
    },
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  { key: 'radius', type: 'radius', name: 'Radius', desc: '圆角', value: 8, max: 8, min: 1 },
  {
    key: 'limit',
    type: 'radio',
    name: 'Limit',
    desc: '限制',
    list: [
      { label: '无', value: 100 },
      { label: '限制数量', value: 2 },
    ],
    value: 100,
  },
];
const extStyle = `margin-right: ${addUnit(12)}`;
const style = ref({});
const change = (detail: Attrs) => {
  attrs.value = detail;
  style.value = {
    ...(detail.radius ? { '--checkbox-radius': `${detail.radius}px` } : {}),
    '--checkbox-padding-h': '6px',
    '--checkbox-label-padding-h': '6px',
  };
};
</script>
<style lang="less">
.checkbox-button-page.page {
  background-color: #fff;

  --checkbox-button-padding-h: 12px;
}
</style>
