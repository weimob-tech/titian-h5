---
title: 返回顶部
sidebar_custom_props:
  suffix: BackTop
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/back-top"
---

# 返回顶部 _BackTop_

**返回页面顶部的操作按钮，当页面过长用户需要返回页面顶部的时候使用；**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tibacktop-api" />

## 安装使用

```typescript tsx showLineNumbers
import { BackTop } from '@titian-design/vue';
```

## 基本用法

#### 简单使用

```html showLineNumbers
<template>
  <TiBackTop />
</template>

<script lang="ts" setup>
import { TiBackTop } from '@titian-design/vue';
</script>
```

#### 使用时展示回到顶部文字

```html showLineNumbers
<template>
  <TiBackTop text="顶部" />
</template>

<script lang="ts" setup>
import { TiBackTop } from '@titian-design/vue';
</script>
```

#### 设置滚动时长

```html showLineNumbers
<template>
  <TiBackTop :scroll-duration="500" />
</template>

<script lang="ts" setup>
import { TiBackTop } from '@titian-design/vue';
</script>
```

#### 绑定点击事件

```html showLineNumbers
<template>
  <TiBackTop @click="handleClick" />
</template>

<script lang="ts" setup>
import { TiBackTop } from '@titian-design/vue';

const handleClick = () => {
  console.log('回到顶部')
}
</script>
```

## TiBackTop API

### 属性 **Properties**

| 名称               | 类型      | 必填 | 默认值 | 说明                               | 备注 |
| ----------------  | --------- | ---- | ------ | ---------------------------------- | ---- |
| text              | `string`  | 否   | - | 展示文字                           | -    |
| visibility-height  | `number`  | 否   | `400` | 滚动高度达到此参数值才出现 `BackTop` | -    |
| scroll-duration          | `number`  | 否   | `300` | 回到顶部所需时间（ms）  | -    |
| ext-style          | `string` \| `Record<string, string>`  | 否 | - | 根节点额外扩展样式 | 属性值如果是带单位的话，要带上单位，如：`{margin: '10px'}` |
| target            | `() => HTMLElement` | 否 | - | 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数 | - |

### 事件 **Events**

| 名称  | 参数 | 说明               | 备注 |
| ----- | ---- | ------------------ | ---- |
| `click` | `(e: Event) => void`    | 点击后的回调函数 | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                | 默认值       | 说明 | 备注 |
| ------------------- | ---------- | ---- | ---- |
| `--back-top-z-index`  | `10`    | -    | -    |
| `--back-top-right`  | `28px`    | -    | -    |
| `--back-top-bottom`  | `200px`    | -    | -    |
| `--back-top-shadow`  | `0 6px 20px 0 rgba(0, 0, 0, 0.06)`    | -    | -    |
| `--back-top-bg-color`  | `var(--neutral-color-9, #ffffff)`    | -    | -    |
| `--back-top-width` | `96px` | - | -    |
| `--back-top-height` | `96px` | - | -    |
| `--back-top-border-radius` | `50%` | - | -    |
| `--back-top-text-font-size` | `20px` | - | -    |
