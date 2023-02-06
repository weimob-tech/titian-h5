---
title: 滑动单元格
sidebar_custom_props:
  suffix: SwipeCell
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/swipe-cell"
---

# 滑动单元格 _SwipeCell_

** 可以左右滑动来展示操作按钮的单元格组件。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiswipecell-api" />

## 安装使用

```typescript showLineNumbers
import { TiSwipeCell } from '@titian-design/mobile-vue';
```

## 用法示例

#### 基本使用
```html showLineNumbers
<template>
  <TiSwipeCell>
    <div slot="left" class="left">left</div>
    <div class="center">center</div>
    <div slot="right" class="right">right</div>
  </TiSwipeCell>
</template>

<script lang="ts" setup>
import { TiSwipeCell } from '@titian-design/mobile-vue';
</script>

<style>
  .left,
  .right {
    height: 100px;
    width: 100px;
  }
  .center {
    height: 100px;
    width: 100%;
  }
</style>
```

#### 自定义左右宽度

```html showLineNumbers
<template>
  <TiSwipeCell :left-width="200">
    <div slot="left" class="left">left</div>
    <div class="center">center</div>
  </TiSwipeCell>
  
  <TiSwipeCell :right-width="200">
    <div class="center">center</div>
    <div slot="right" class="right">right</div>
  </TiSwipeCell>
</template>

<script lang="ts" setup>
import { TiSwipeCell } from '@titian-design/mobile-vue';
</script>

<style>
  .left,
  .right {
    height: 100px;
  }

  .center {
    height: 100px;
    width: 100%;
  }
</style>
```

#### 禁用滑动
```html showLineNumbers
<template>
  <TiSwipeCell disabled>
    <div slot="left" class="left">left</div>
    <div class="center">center</div>
    <div slot="right" class="right">right</div>
  </TiSwipeCell>
</template>

<script lang="ts" setup>
import { TiSwipeCell } from '@titian-design/mobile-vue';
</script>

<style>
  .left,
  .right {
    height: 100px;
    width: 100px;
  }
  .center {
    height: 100px;
    width: 100%;
  }
</style>
```

#### 异步操作控制
```html showLineNumbers
<template>
  <TiButton @click="handleClick">控制</TiButton>
  <TiSwipeCell :visible="visible">
    <div slot="left" class="left">left</div>
    <div class="center">center</div>
  </TiSwipeCell>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiSwipeCell, TiButton } from '@titian-design/mobile-vue';

const visible = ref<boolean>(false)

const handleClick = () => {
  visible.value = !visible.value
}
</script>

<style>
  .left {
    height: 100px;
    width: 100px;
  }
  .center {
    height: 100px;
    width: 100%;
  }
</style>
```

#### 监听事件

```html showLineNumbers
<template>
  <TiSwipeCell 
    @open="handleOpen"
    @close="handleClose"
    @ti-click="handleTiClick"
  >
    <div slot="left"  class="left">left</div>
    <div class="center">center</div>
  </TiSwipeCell>
</template>

<script lang="ts" setup>
import { TiSwipeCell } from '@titian-design/mobile-vue';

const handleOpen = (e: CustomEvent<OpenParams>) => {
  console.log("打开", e);
};

const handleClose = (e: CustomEvent<CloseParams>) => {
  console.log("关闭", e);
};

const handleTiClick = (e: CustomEvent<left | right | outside | cell>) => {
  console.log("点击事件触发了", e);
};
</script>

<style>
  .left {
    height: 100px;
    width: 100px;
  }
  .center {
    height: 100px;
    width: 100%;
  }
</style>
```

## TiSwipeCell API

### 属性 **Properties**

| 名称       | 类型      | 必填 | 默认值 | 说明               | 备注                                     |
| ---------- | --------- | ---- | ------ | ------------------ | ---------------------------------------- |
| left-width  | `number`  | 否   | `0`      | 左边滑动区域宽度   | -                                        |
| right-width | `number`  | 否   | `0`      | 右边滑动区域宽度   | -                                        |
| visible    | `boolean` | 否   | `false`  | 设置可滑动区域划开 | 会先从左边到右开始查找是否有内容用于展示 |
| disabled   | `boolean` | 否   | `false`  | 禁止滑动           | -                                        |
| async-close | `boolean` | 否   | `false`  | 是否异步关闭       | -                                        |
| name       | `string`  | 否   | `-`      | 唯一标识           | -                                        |

### 事件 **Events**

| 事件名 | 参数 |  说明       | 备注                                                       |
| ------ | ---------- | -------------- | -------------------------------------------- |
| `open`   | `(e: CustomEvent<OpenParams>) => void` | 打开时触发  | -      |
| `close`  | `(e: CustomEvent<CloseParams>) => void` | 关闭时触发 | - |
| `ti-click`  | <code>(e: CustomEvent<left &vert; right &vert; outside &vert; cell \>) => void</code> | 点击时触发 | 关闭时的点击位置 (`left` `right` `cell` `outside`)         |

#### OpenParams
```typescript showLineNumbers
interface OpenParams {
  position: Position;
  name: string;
}
```

#### CloseParams
```typescript showLineNumbers
interface CloseParams {
  position: ClickPosition;
  name: string;
  instance: TiSwipeCell;
}
```

### 插槽 **Slots**
| 名称    | 说明       | 备注 |
| ------- | ---------- | ---- | 
| right | 右侧内容 | -   |
| left    | 左侧内容   | -    | 

### 可扩展样式名 **External Class**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

