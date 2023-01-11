<template>
  <CustomPage :options="options" @change="onChange">
    <div className="box">
      <TiInputNumber
        :size="attrs.size"
        :variant="attrs.variant"
        :border="attrs.border"
        :ext-style="attrs.extStyle"
        :thumbnail="attrs.thumbnail"
        :auto-width="attrs.autoWidth"
        :max="attrs.max"
        :min="attrs.min"
        :step="attrs.step"
        :ext-plus-class="attrs.extPlusClass"
        :ext-minus-class="attrs.extMinusClass"
        :ext-input-class="attrs.extInputClass"
        :ext-css="extCss"
      ></TiInputNumber>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiInputNumber, TiInputNumberProps } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    desc: '模式',
    key: 'mode',
    value: 'bright',
    list: [
      {
        label: '默认',
        value: 'default',
        attr: { variant: 'pure' },
      },
      {
        label: '明亮',
        value: 'bright',
        attr: { variant: 'bright' },
      },
      {
        label: '填充1',
        value: 'input1',
        attr: { variant: 'block' },
      },
      {
        label: '填充2',
        value: 'input2',
        attr: { variant: 'block', extInputClass: 'ext-input-class' },
      },
      {
        label: '线框',
        value: 'line',
        attr: {
          border: true,
        },
      },
    ],
  },
  {
    type: 'radius',
    name: 'Radius',
    desc: '圆角',
    key: 'shape',
    value: 4,
    max: 14,
    min: 0,
  },
  {
    type: 'radio',
    name: 'Size',
    desc: '规格',
    key: 'size',
    value: 'medium',
    list: [
      {
        label: 'Medium',
        value: 'medium',
      },
      {
        label: 'Big',
        value: 'big',
      },
    ],
  },
  {
    type: 'radio',
    name: 'Interaction',
    desc: '交互',
    key: 'interaction',
    value: 'default',
    list: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '自适应宽度',
        value: 'auto',
        attr: {
          autoWidth: true,
        },
      },
      {
        label: '指定步长 +10',
        value: 'specify',
        attr: {
          step: 10,
        },
      },
      {
        label: '限制范围',
        value: 'restrictedRange',
        attr: {
          min: 0,
          max: 20,
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Unfold',
    desc: '收起',
    key: 'thumbnail',
    value: false,
    list: [
      {
        label: '否',
        value: false,
      },
      {
        label: '是',
        value: true,
      },
    ],
  },
];

const extCss = `
  .ext-input-class { --input-number-background: #fff; }
  .ext-minus-class, .ext-plus-class { --base-radius-size: var(--input-number-radius-size, 0); }
`;
interface InputNumberAttrs extends TiInputNumberProps {
  group?: Array<TiInputNumberProps & { title: string; readonly: boolean; titleClass: string }>;
  shape?: String;
}
const attrs = ref<InputNumberAttrs>({});
const onChange = (detail: InputNumberAttrs) => {
  if (detail.shape !== undefined) {
    const value = detail.shape;
    detail.extStyle = `${detail.extStyle || ''};--input-number-radius: ${value}px;`;
  }
  attrs.value = {
    step: 1,
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    extPlusClass: 'ext-plus-class',
    extMinusClass: 'ext-minus-class',
    ...detail,
  };
};
</script>
