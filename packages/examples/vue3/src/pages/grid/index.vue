<template>
  <CustomPage :options="options" @change="change">
    <div className="container">
      <TiGrid :columns="attrs.columns" :direction="attrs.direction" :divider="attrs.divider">
        <TiGridItem
          v-for="(item, index) in attrs.group?.[attrs.number || 3]"
          :size="32"
          :key="index"
          :icon="item.icon"
          :text="item.text"
          :customContent="attrs.customContent"
        >
          <div v-if="attrs.customContent" slot="content">- 内容 -</div>
        </TiGridItem>
      </TiGrid>
    </div>
  </CustomPage>
</template>
<script setup lang="ts">
import { TiGridItemProps, TiGridProps, TiGridItem, TiGrid } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';

const options: IOptionType[] = [
  {
    key: 'direction',
    type: 'radio',
    name: 'Mode',
    desc: '模式 ',
    list: [
      {
        label: '纵排',
        value: 'column',
        attr: {
          group: {
            3: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
            ],
            4: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
            ],
            6: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
              { text: '待付款', icon: 'to-comment' },
              { text: '待付款', icon: 'mine-to-pay' },
            ],
          },
        },
      },
      {
        label: '横排',
        value: 'row',
        attr: {
          group: {
            3: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
            ],
            4: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
            ],
            6: [
              { text: '待付款', icon: 'mine-to-pay' },
              { text: '待收货', icon: 'to-deliver' },
              { text: '待发货', icon: 'to-receive' },
              { text: '待评价', icon: 'to-comment' },
              { text: '待付款', icon: 'to-comment' },
              { text: '待付款', icon: 'mine-to-pay' },
            ],
          },
        },
      },
      {
        label: '自定义',
        value: 'custom',
        attr: {
          group: {
            3: [1, 2, 3],
            4: [1, 2, 3, 4],
            6: [1, 2, 3, 4, 5, 6],
          },
          customContent: true,
        },
      },
    ],
    value: 'column',
  },
  {
    key: 'number',
    type: 'radio',
    name: 'Number',
    desc: '数量',
    list: [
      { label: '3个', value: 3, attr: { columns: 3 } },
      { label: '4个', value: 4, attr: { columns: 4 } },
      { label: '6个', value: 6, attr: { columns: 3 } },
    ],
    value: 3,
  },
  {
    key: 'divider',
    type: 'radio',
    name: 'Divide',
    desc: '分割线 ',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
];

interface Attrs extends TiGridProps {
  group?: Record<3 | 4 | 6, TiGridItemProps[]>;
  number?: 3 | 4 | 6;
  customContent?: boolean;
}

const attrs = ref<Attrs>({});
const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style></style>
