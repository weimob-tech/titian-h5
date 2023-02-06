---
title: 粘性布局
sidebar_custom_props:
  suffix: Sticky
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/sticky"
---

# 粘性布局 _Sticky_
**Sticky 组件与 CSS 中position: sticky属性实现的效果一致。可切换css模式和js模式，纯css模式不适用的情况可以采用js模式，js模式采用IntersectionObserver Api**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tisticky-api" />

## 安装使用

```typescript showLineNumbers
import { TiSticky } from '@titian-design/mobile-vue'
```

## 用法示例

#### 基础用法
```html showLineNumbers
<template>
  <TiSticky>
    <div>吸顶元素</div>
  </TiSticky>
</template>

<script lang="ts" setup>
import { TiSticky } from '@titian-design/mobile-vue';
</script>
```
#### 使用css模式
:::note 使用条件：
1. 父元素不能overflow:hidden或者overflow:auto属性。
2. 父元素的高度需大于sticky元素的高度。
3. sticky元素仅在其父元素内生效
:::
```html showLineNumbers
<template>
  <TiSticky use-pure-css>
    <div>吸顶元素</div>
  </TiSticky>
</template>

<script lang="ts" setup>
import { TiSticky } from '@titian-design/mobile-vue';
</script>
```

#### 吸顶距离
```html showLineNumbers
<template>
  <TiSticky :offset-top="100">
    <div>吸顶元素</div>
  </TiSticky>
</template>

<script lang="ts" setup>
import { TiSticky } from '@titian-design/mobile-vue';
</script>
```

#### 指定容器
:::note
use-pure-css模式下无需指定container，默认在父元素内生效
:::
```html showLineNumbers
<template>
  <div ref="box">
    <TiSticky :offset-top="100" :container="container">
      <div>吸顶元素</div>
    </TiSticky>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiSticky } from '@titian-design/mobile-vue';
const box = ref(null);
const container = () => box.value;
</script>
```
## TiSticky API
### 属性 **Properties**

| 名称       | 类型       | 必填 | 默认值 | 说明                                   | 备注 |
| ---------- | ---------- | ---- | ------ | -------------------------------------- | ---- |
| offset-top  | `number`   | 否   | 0      | 吸顶时与顶部的距离，单位 px            | -    |
| container  | `function` | 否   | -      | 一个函数，返回容器对应的 NodesRef 节点 | -    |
| disabled   | `boolean`  | 否   | false  | 是否禁止吸顶                           | -    |
| z-index     | `number`   | 否   | 99     | z-index                                | -    |
| use-pure-css | `boolean`  | 否   | false  | 使用css的position: sticky实现          | -    |

### 事件 **Events**

| 名称    | 参数列表               | 描述                 | 备注 |
| ------- | ---------------------- | -------------------- | ---- |
| fixed |  `(e: CustomEvent<{isFixed: boolean}>) => void ` | 在吸顶状态改变是触发 | -    |
### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |
