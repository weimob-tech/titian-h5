<template>
  <CustomPage :options="options" @change="change">
    <div className="layout-container">
      <TiRow :gutter="attrs.gutter">
        <TiCol v-for="(item, index) in attrs.group" :key="index" :span="item.span" :offset="item.offset">
          <div :className="`item item-${item.span} index-${index}`">{{ item.label }}</div>
        </TiCol>
      </TiRow>
    </div>
  </CustomPage>
</template>
<script setup lang="ts">
import { TiColProps, TiRowProps, TiCol, TiRow } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';

interface Attrs {
  gutter?: TiRowProps['gutter'];
  group?: Array<TiColProps & { label: string }>;
}

const attrs = ref<Attrs>({});

const options: IOptionType[] = [
  {
    key: 'mode',
    type: 'radio',
    name: 'Mode',
    desc: '模式 ',
    list: [
      { label: '等分', value: 'equate', hiddenItems: ['custom'] },
      { label: '自定义', value: 'custom', hiddenItems: ['divide'] },
    ],
    value: 'equate',
  },
  {
    key: 'divide',
    type: 'radio',
    name: 'Divide',
    desc: '等分',
    list: [
      { label: '一等分', value: 1, attr: { group: [{ label: 'Span:24  100%', span: 24 }] } },
      {
        label: '二等分',
        value: 2,
        attr: {
          group: [
            { label: 'Span:12  50%', span: 12 },
            { label: 'Span:12  50%', span: 12 },
          ],
        },
      },
      {
        label: '三等分',
        value: 3,
        attr: {
          group: [
            { label: 'Span:8  33%', span: 8 },
            { label: 'Span:8  33%', span: 8 },
            { label: 'Span:8  33%', span: 8 },
          ],
        },
      },
    ],
    value: 1,
  },
  {
    key: 'custom',
    type: 'radio',
    name: 'Custom',
    desc: '自定义',
    list: [
      {
        label: '定义长度',
        value: 'width',
        attr: {
          group: [
            { label: 'span: 6', span: 6 },
            { label: 'span: 12', span: 12 },
            { label: 'span: 6', span: 6 },
          ],
        },
      },
      {
        label: '定义偏移',
        value: 'offset',
        hiddenItems: ['gutter'],
        attr: {
          group: [{ label: 'offset: 12，span: 12', span: 12, offset: 12 }],
        },
      },
    ],
    value: 'width',
  },
  {
    key: 'gutter',
    type: 'radio',
    name: 'Gutter',
    desc: '间距',
    list: [
      { label: '无', value: 0 },
      { label: '有', value: 10 },
    ],
    value: 0,
  },
];

const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style>
.layout-container {
  box-sizing: border-box;
  width: calc(100% - 56px);
  margin: 0 28px;
  overflow: hidden;

  border-radius: 12px !important;
}

.item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 72px;

  background: #fa2c19;

  color: #fff;
  font-size: 28px;
  font-weight: 400;
  line-height: 40px;
}

.item-3 {
  opacity: 0.7;
}

.item-12 {
  opacity: 0.49;
}

.item12.index-1 {
  opacity: 0.7;
}

.item-8.index-1 {
  opacity: 0.49;
}
</style>
