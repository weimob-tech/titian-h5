<template>
  <CustomPage :options="options" @change="change">
    <div class="tabs-page" :style="{ '--tabs-active-line-color': attrs.color }">
      <TiTabs
        v-if="refresh"
        :tabs="attrs.tabs"
        :divider="attrs.divider"
        :variant="attrs.variant || 'pure'"
        :count="attrs.count"
        :tab-width="attrs.tabWidth"
        :gap="attrs.gap"
        use-slot
        tab-active-class="tab-active-class"
        swiper-class="swiper-class"
        @change="onChangeSelected"
      >
        <div v-for="(item, index) in attrs.tabs" class="tabs-page-tab-item" :slot="`tab-content-${index}`" :key="index">
          - {{ item }} -
        </div>
      </TiTabs>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref, nextTick } from 'vue';
import { TiTabs, TiTabsProps } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    type: 'radio',
    key: 'mode',
    desc: '模式',
    name: 'Mode',
    list: [
      {
        label: '默认',
        value: 'default',
        hiddenItems: ['style2'],
      },
      {
        label: '滑块',
        value: 'block',
        hiddenItems: ['style1', 'color', 'divider'],
        attr: {
          variant: 'block',
          tabs: ['选中项', '未选中'],
          count: 2,
          gap: -1,
        },
      },
    ],
    value: 'default',
  },
  {
    type: 'radio',
    key: 'style1',
    desc: '类型',
    name: 'Style',
    list: [
      {
        label: '等分',
        value: 'same',
        attr: {
          tabs: ['全部', '热销', '上衣'],
          count: 5,
          gap: -1,
        },
      },
      {
        label: '滑动',
        value: 'block',
        attr: {
          tabs: ['全部', '热销', '上衣', '连衣裙', '裤子', '帽子', '鞋子'],
          tabWidth: 168,
          gap: -1,
        },
      },
      {
        label: '等间距',
        value: 'gap',
        attr: {
          tabs: ['全部商品', '热销', '连衣裙', '上衣', '加大的裤子', '帽子', '鞋子'],
          gap: 50,
        },
      },
    ],
    value: 'same',
  },
  {
    type: 'radio',
    key: 'style2',
    desc: '样式',
    name: 'Style',
    list: [
      {
        label: '通栏',
        value: 'full',
        attr: {
          count: 2,
        },
      },
      {
        label: '居中',
        value: 'center',
        attr: {
          count: 0,
          tabWidth: 160,
        },
      },
    ],
    value: 'full',
  },
  {
    desc: '颜色',
    key: 'color',
    type: 'color',
    name: 'Color',
  },
  {
    type: 'radio',
    key: 'divider',
    desc: '上滑分割',
    name: 'Divide',
    list: [
      {
        label: '无',
        value: 'default',
      },
      {
        label: '线分割',
        value: 'line',
      },
      {
        label: '投影分割',
        value: 'shadow',
      },
    ],
    value: 'default',
  },
];

interface Attrs extends TiTabsProps {
  style1?: string;
  style2?: string;
  mode?: string;
  color?: string;
}
const refresh = ref<boolean>(false);
const attrs = ref<Attrs>({});
const change = (detail: any) => {
  refresh.value = false;
  attrs.value = detail;
  nextTick(() => {
    refresh.value = true;
  });
};

const onChangeSelected = (e: CustomEvent) => {
  const { detail } = e;
  console.log('onChangeSelected ', detail);
};
</script>
<style>
.tabs-page {
  width: 100vw;
  background-color: #fff;
}

ti-tabs::part(swiper-class) {
  height: 320px;
  background: #fff;
}

ti-tabs::part(tabs-class) {
  text-align: center;
}

ti-tabs::part(center) {
  margin: 0 auto;
}

.tabs-page-tab-item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  color: #9e9e9e;
  font-size: 24px;
}
</style>
