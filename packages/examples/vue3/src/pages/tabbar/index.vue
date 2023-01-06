<template>
  <CustomPage :options="options" @change="change">
    <TiTabbar :value="value" :separation="attrs.separation" ext-class="tab-bar ext-tab-bar" @select="select">
      <TiTabbarItem
        v-for="(item, index) in attrs.group"
        :key="`${item.icon}-${index}`"
        :active-color="attrs.color"
        :icon="item.icon"
        :title="item.title"
        ext-class="tab-bar-option"
      />
    </TiTabbar>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiTabbar, TiTabbarItem } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    key: 'count',
    type: 'radio',
    name: 'Number',
    desc: '数量',
    list: [
      {
        label: '4个',
        value: '4',
        attr: {
          group: [
            { icon: 'home', title: '首页' },
            { icon: 'arrange', title: '分类' },
            { icon: 'cart', title: '购物车' },
            { icon: 'user-account-setting', title: '我的' },
          ],
        },
      },
      {
        label: '5个',
        value: '5',
        attr: {
          group: [
            { icon: 'home', title: '首页' },
            { icon: 'arrange', title: '分类' },
            { icon: 'cart', title: '购物车' },
            { icon: 'user-account-setting', title: '我的' },
            { icon: 'home', title: '首页' },
          ],
        },
      },
    ],
    value: '5',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    key: 'separation',
    type: 'radio',
    name: 'Divide',
    desc: '上滑分割',
    list: [
      { label: '无', value: '' },
      { label: '线分割', value: 'border' },
      { label: '投影分割', value: 'shadow' },
    ],
    value: '',
  },
];

interface TabbarAttrsProps {
  separation: 'border' | 'shadow' | '';
  color: string;
  group: {
    icon: string;
    title: string;
  }[];
}
const attrs = ref<TabbarAttrsProps>({ separation: '', color: '', group: [] });
const change = (detail: any) => {
  attrs.value = detail;
};

const value = ref(0);
const select = (e: any) => {
  value.value = e.detail;
};
</script>
<style></style>
