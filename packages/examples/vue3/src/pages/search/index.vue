<template>
  <CustomPage :options="options" @change="change">
    <div
      :style="{
        'width': '100%',
        'margin': '0 28px',
        '--search-radius': attrs.radius + 'px',
      }"
    >
      <TiSearch
        v-if="attrs.style === 0"
        :ext-class="attrs.dashed === 1 ? 'diy search-box' : 'search-box'"
        :extCss="extCss"
        :search-inner-class="attrs.dashed === 1 ? 'search-inner-class' : ''"
        placeholder="请输入代填项引导文案"
        :center="attrs.align"
      ></TiSearch>
      <TiSearch
        v-else-if="attrs.style === 1"
        ext-class="search-box"
        :extCss="extCss"
        placeholder="请输入代填项引导文案"
        :center="attrs.align"
      >
        <div slot="prefix" class="prefix">
          <span>请选择</span>
          <TiIcon name="arrow-down" size="32" />
        </div>
        <TiIcon slot="icon" name="scan" size="32" />
      </TiSearch>
      <TiSearch
        v-else
        ext-class="search-box"
        :extCss="extCss"
        search-button-class="test"
        placeholder="请输入代填项引导文案"
        :center="attrs.align"
        :animation="false"
      >
        <div slot="prefix" class="prefix">
          <TiIcon name="category" size="42" />
        </div>
        <div slot="suffix" class="suffix">
          <TiIcon name="arrange" size="42" />
        </div>
      </TiSearch>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiSearch, TiSearchProps, TiIcon } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
interface SearchAttrsProps extends TiSearchProps {
  radius?: number;
  style?: number;
  align?: boolean;
  dashed?: number;
}
const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'dashed',
    name: 'Mode',
    value: 0,
    list: [
      {
        label: '默认',
        value: 0,
        attr: { style: 0 },
        hiddenItems: ['style'],
      },
      {
        label: '自定义',
        value: 1,
        attr: { style: 0 },
        hiddenItems: ['style'],
      },
      {
        label: '搭配组件',
        value: 2,
        attr: {},
      },
    ],
  },
  {
    type: 'radio',
    desc: '对齐',
    key: 'align',
    name: 'Align',
    value: 0,
    list: [
      {
        label: '居左',
        value: 0,
        attr: { align: false },
      },
      {
        label: '剧中',
        value: 1,
        attr: { style: 0, align: true },
        hiddenItems: ['style'],
      },
    ],
  },
  {
    type: 'radio',
    desc: '搭配',
    key: 'style',
    name: 'Style',
    value: 0,
    list: [
      {
        label: '搭配1',
        value: 0,
      },
      {
        label: '搭配2',
        value: 1,
      },
      {
        label: '搭配3',
        value: 2,
      },
    ],
  },
  {
    type: 'radius',
    name: 'Radius',
    key: 'radius',
    desc: '圆角',
    value: 8,
    max: 16,
  },
];

const extCss = `
  .titian-search.search-box {
    border-radius: 10px;
    --icon-color: #212121;
  }
  .titian-search.diy {
    background-color: #f3f3f3;
  }
  .search-inner-class {
    background-color: #fff !important;
  }
`;

const attrs = ref<SearchAttrsProps>({});
const change = (detail: SearchAttrsProps) => {
  attrs.value = detail;
};
</script>
<style>
.page {
  background: #f9f9f9;
}

.prefix,
.suffix {
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: #111;
  font-size: 28px;
  font-weight: 400;
}

.prefix {
  margin-right: 28px;
}

.suffix {
  margin-left: 28px;
}
</style>
