---
title: 虚拟列表
sidebar_custom_props:
  suffix: VirtualList
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/virtual-list"
---

# 虚拟列表 _Virtual List_

** 虚拟列表，常用于渲染数据量非常大的列表，通过渲染当前的可视区域，区域外的内容在用户滚动到可视区域内之后再渲染，以保障页面的流畅。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tivirtuallist-api" />

## 安装使用

```ts showLineNumbers
import { TiVirtualList } from '{{packageWeappVue}}';
```

## 用法示例
#### 基本用法

```html showLineNumbers
<template>
  <TiVirtualList ref="virtualListRef" @load="load"></TiVirtualList>
</template>
<script lang="ts" setup>
import { ref, onMounted, ComponentPublicInstance, watchEffect } from 'vue';
import { TiVirtualList } from '@titian-design/mobile-vue';

const virtualListRef = ref<ComponentPublicInstance<HTMLTiVirtualListElement> | null>(null);
const data = ref<number[]>([]);

const load = () => {
  data.value = data.value.concat(
    Array(10)
      .fill(0)
      .map((_, idx) => (data.value[data.value.length - 1] || 0) + idx + 1),
  );
};

watchEffect(() => {
  virtualListRef.value?.$el.setListData(data.value);
});

onMounted(() => {
  virtualListRef.value?.$el.setRenderItem(
    (item: number) => `<div style="height: 50px; width: 100%;">${item}</div>`,
  );
});
</script>
```

## TiVirtualList API

### 属性 **Properties**

| 名称     | 类型     | 必填 | 默认值 | 说明       | 备注 |
| -------- | -------- | ---- | ------ | ---------- | ---- |
| container-height    | `number` | 否   | 当前 document 高度      | 容器高度       | -    |
| item-height    | `number` | 否   | 50     | 节点高度       | -    |
| extStyle | `string` | 否   | -      | 根节点样式 | -    |


### 事件 **Events**

| 名称             | 参数列表                                                 | 描述                    | 备注 |
| ---------------- | -------------------------------------------------------- | ----------------------- | ---- |
| load       | `(e: CustomEvent<never>) => void`                 | 滚动到底部时触发 | -    |

### CSS 变量 **CSS Variables**

| 变量 | 默认值 | 说明 | 备注 |
| -------- | -------- | ---- | ------ | 
| --virtual-list-width | 100% | 虚拟列表宽度 | - |
| --virtual-list-background-color | #fff | 虚拟列表背景色 | - |