<template>
  <div :style="style">
    <CustomPage :options="options" @change="change">
      <TiRadioGroup
        :defaultValue="defaultValue"
        :icon="attrs.iconName"
        :color="attrs.color"
        extClass="ti-radio-group"
        extCss="`.ti-radio-group{display: flex;align-items: center;}`"
        shape="none"
      >
        <TiRadio
          v-for="(item, index) in attrs.group"
          :disabled="attrs.disabled"
          :key="index"
          :label="item"
          :value="index"
        />
      </TiRadioGroup>
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiRadioGroup, TiRadio } from '@titian-design/mobile-vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';
import { addUnit } from '../../utils';

const options: IOptionType[] = [
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
      { label: '常规', value: 1 },
      { label: '禁用', value: 2, attr: { disabled: true } },
      { label: '自定义', value: 3, attr: { iconName: 'right-custom' } },
    ],
    value: 1,
    attr: {
      group: ['选项 A', '选项 B', '选项 C'],
      iconName: 'checkbox-hollow',
    },
  },
  { key: 'color', type: 'color', name: 'Color', desc: '颜色' },
  { key: 'radius', type: 'radius', name: 'Radius', desc: '圆角', value: 16, min: 1, max: 16 },
];

const defaultValue = 1;
interface Attrs {
  group?: string[];
  iconName?: string;
  color?: string;
  disabled?: boolean;
  radius?: string | number;
}

const attrs = ref<Attrs>({});

const change = (detail: Attrs) => {
  attrs.value = detail;
};
const style: any = {};
style['--radio-radius'] = addUnit(attrs.value.radius || 999);
</script>
<style></style>
