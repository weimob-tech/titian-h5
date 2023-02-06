<template>
  <CustomPage :options="options" @change="onChange">
    <div className="divider-page">
      <div v-if="attrs.orientation === 'vertical'" className="divider-page-text">一级分类</div>
      <TiDivider
        :color="attrs.color"
        :border-width="attrs.borderWidth"
        :dashed="attrs.dashed"
        :orientation="attrs.orientation"
        :textAlign="attrs.textAlign"
        :hairline="attrs.hairline"
      >
        {{ attrs.text }}
      </TiDivider>
      <div v-if="attrs.orientation === 'vertical'" className="divider-page-text">二级分类</div>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiDivider, EDividerPosition, EDividerOrientation } from '@titian-design/mobile-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
interface DividerProps {
  color?: string;
  borderWidth?: number;
  dashed?: boolean;
  orientation?: EDividerOrientation;
  textAlign?: EDividerPosition;
  hairline?: boolean;
  text?: string;
}
const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'dashed',
    name: 'Mode',
    value: false,
    list: [
      {
        label: '实线',
        value: false,
        attr: {
          orientation: 'horizontal',
          // text: '实线',
        },
      },
      {
        label: '虚线',
        value: true,
        attr: { orientation: 'horizontal', text: '虚线' },
      },
      {
        label: '纵向',
        value: 'vertical',
        attr: { orientation: 'vertical', dashed: false },
        hiddenItems: ['textPlacement', 'textAlign'],
      },
    ],
  },
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    desc: '粗细',
    key: 'borderWidth',
    name: 'Weight',
    value: 1,
    list: [
      {
        label: '发丝',
        value: 1,
        attr: { hairline: true },
      },
      {
        label: '1px',
        value: 2,
      },
      {
        label: '2px',
        value: 4,
      },
    ],
  },
  {
    type: 'radio',
    desc: '文字',
    key: 'textPlacement',
    name: 'Text',
    value: 'none',
    list: [
      {
        label: '无',
        value: 'none',
        hiddenItems: ['textAlign'],
      },
      {
        label: '有',
        value: '分割线',
        attr: { text: '分割线' },
      },
    ],
  },
  {
    type: 'radio',
    desc: '位置',
    key: 'textAlign',
    name: 'Position',
    value: 'center',
    list: [
      {
        label: '左',
        value: 'left',
      },
      {
        label: '中',
        value: 'center',
      },
      {
        label: '右',
        value: 'right',
      },
    ],
  },
];
const attrs = ref<DividerProps>({
  color: '',
  text: '',
  hairline: false,
  textAlign: EDividerPosition.CENTER,
  borderWidth: 2,
});
const onChange = (detail: DividerProps) => {
  console.log(detail);

  attrs.value = detail;
};
</script>
<style class="scss">
.divider-page {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  background-color: transparent;

  &-text {
    color: #757575;
    font-size: 24px;
    line-height: 1.2;
  }
}
</style>
