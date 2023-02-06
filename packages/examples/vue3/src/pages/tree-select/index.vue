<template>
  <CustomPage :options="options" @change="change" :center="false">
    <div
      class="tree-select-page"
      :style="{
        '--sidebar-active-text-color': attrs.color,
        '--tree-select-active-color': attrs.color2,
        '--sidebar-radius': addUnit(attrs.radius || 999),
      }"
    >
      <TiTreeSelect :options="treeOption" @changeNav="onChangeNav">
        <div v-if="attrs.mode === 'custom'" class="tree-select-text">- {{ text }} -</div>
      </TiTreeSelect>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiTreeSelect, TiTreeSelectProps } from '@titian-design/mobile-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
import { addUnit } from '../../utils';

const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式 ',
    value: 'basic',
    list: [
      { value: 'basic', label: '基础' },
      { value: 'custom', label: '自定义' },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '左侧颜色',
    value: '#fa2c19',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color2',
    desc: '右侧颜色',
    value: '#fa2c19',
  },
  {
    type: 'radius',
    name: 'shape',
    key: 'radius',
    desc: '圆角',
    value: 16,
  },
];

const getTreeOption = () => {
  return [
    {
      label: '侧边导航',
      value: 'a1',
      children: [
        {
          label: '标题文字',
          value: 'a1-1',
        },
        {
          label: '标题文字',
          value: 'a1-2',
        },
        {
          label: '标题文字',
          value: 'a1-3',
        },
        {
          label: '标题文字',
          value: 'a1-4',
        },
        {
          label: '标题文字',
          value: 'a1-5',
        },
        {
          label: '标题文字',
          value: 'a1-6',
        },
        {
          label: '标题文字',
          value: 'a1-7',
        },
      ],
    },
    {
      label: 'IP联名款',
      value: 'a2',
      children: [
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-1',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-2',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-3',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-4',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-5',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-6',
        },
        {
          label: 'IP联名款 - 标题文字',
          value: 'a2-7',
        },
      ],
    },
    {
      label: '精选系列',
      value: 'a3',
      children: [
        {
          label: '精选系列 - 标题文字',
          value: 'a3-1',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-2',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-3',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-4',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-5',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-6',
        },
        {
          label: '精选系列 - 标题文字',
          value: 'a3-7',
        },
      ],
    },
    {
      label: '明星同款',
      value: 'a4',
      children: [
        {
          label: '明星同款 - 标题文字',
          value: 'a4-1',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-2',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-3',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-4',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-5',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-6',
        },
        {
          label: '明星同款 - 标题文字',
          value: 'a4-7',
        },
      ],
    },
    {
      label: '羽绒服',
      value: 'a5',
      children: [
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-1',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-2',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-3',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-4',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-5',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-6',
        },
        {
          label: '羽绒服 - 标题文字',
          value: 'a5-7',
        },
      ],
    },
  ];
};

interface Attrs extends TiTreeSelectProps {
  mode?: string;
  color?: string;
  color2?: string;
  radius?: string | number;
}
const attrs = ref<Attrs>({});
const text = ref<string>('侧边导航');
const treeOption = ref<any>({});

const change = (detail: any) => {
  let _treeOption = getTreeOption();
  if (detail.mode === 'custom') {
    _treeOption = _treeOption.map(({ children: _, ...other }: any) => other);
  }
  attrs.value = detail;
  treeOption.value = [..._treeOption];
};
const onChangeNav = (event: CustomEvent<{ item: { label: string } }>) => {
  const { item } = event.detail;
  text.value = item.label;
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
