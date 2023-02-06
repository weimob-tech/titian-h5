<template>
  <div :style="{ '--sidebar-active-text-color': attrs.color, '--sidebar-radius': addUnit(attrs.radius || 999) }">
    <CustomPage :options="options" @change="change" :center="false">
      <TiSidebar :active-index="1" @change="onChangeSelected">
        <TiSidebarItem label="侧边导航" badge="1" />
        <TiSidebarItem label="IP联名款" />
        <TiSidebarItem label="精选系列" />
        <TiSidebarItem label="明星同款" />
        <TiSidebarItem label="羽绒服" />
      </TiSidebar>
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiSidebar, TiSidebarItem, TiSidebarProps } from '@titian-design/mobile-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
import { addUnit } from '../../utils';

const options: IOptionType[] = [
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
    list: [
      { label: 'red', value: '#fa2c19' },
      { label: 'orange', value: '#ffa300' },
      { label: 'green', value: '#07c160' },
      { label: 'blue', value: '#2a6ae9' },
      { label: 'black', value: '#212121' },
    ],
  },
  {
    type: 'radius',
    name: 'shape',
    key: 'radius',
    desc: '圆角',
    value: 16,
  },
];

interface Attrs extends TiSidebarProps {
  color?: string;
  radius?: string | number;
}

const attrs = ref<Attrs>({});
const change = (detail: Attrs) => {
  attrs.value = detail;
};
const onChangeSelected = (e: CustomEvent) => {
  const { detail } = e;
  console.log('onChangeSelected ', detail);
};
</script>
<style>
.tree-select-page {
  width: 100%;
  height: 100%;
  margin: 0;
}

.tree-select-text {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: #fff;
  color: #9e9e9e;
  font-size: 24px;
  line-height: 28px;
}
</style>
