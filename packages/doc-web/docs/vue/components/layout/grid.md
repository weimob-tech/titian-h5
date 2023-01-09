---
title: 宫格
sidebar_custom_props:
  suffix: Grid
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/grid"
---

# 宫格 _Grid_

** 基础宫格布局，宫格共包含 2 个组件： `TiGrid`、 `TiGridItem`，这两个组件必须配合使用。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tigrid-api" />

## 安装使用

```typescript showLineNumbers
import { TiGrid, TiGridItem } from '@titian-design/vue'
```

## 用法示例

#### 基本使用

** 展示图标和文字 **

```html showLineNumbers
<template>
  <TiGrid>
    <TiGridItem icon="home" text="首页" />
    <TiGridItem icon="mine-to-pay" text="待付款" />
    <TiGridItem icon="to-deliver" text="待收货" />
    <TiGridItem icon="to-receive" text="待发货" />
  </TiGrid>
</template>

<script lang="ts" setup>
import { TiGrid, TiGridItem } from '@titian-design/vue';
</script>
```

#### 自定义每行个数

** 宫格默认是每行4个，使用时可自定义每行个数。 **

```html showLineNumbers
<template>
  <TiGrid :columns="3">
    <TiGridItem icon="home" text="首页" />
    <TiGridItem icon="mine-to-pay" text="待付款" />
    <TiGridItem icon="to-deliver" text="待收货" />
    <TiGridItem icon="to-receive" text="待发货" />
  </TiGrid>
</template>

<script lang="ts" setup>
import { TiGrid, TiGridItem } from '@titian-design/vue';
</script>
```

#### 设置宫格间距离

```html showLineNumbers
<template>
  <TiGrid :gutter="16">
    <TiGridItem icon="home" text="首页" />
    <TiGridItem icon="mine-to-pay" text="待付款" />
    <TiGridItem icon="to-deliver" text="待收货" />
    <TiGridItem icon="to-receive" text="待发货" />
  </TiGrid>
</template>

<script lang="ts" setup>
import { TiGrid, TiGridItem } from '@titian-design/vue';
</script>
```

#### 自适应展示正方型

```html showLineNumbers
<template>
  <TiGrid square>
    <TiGridItem icon="home" text="首页" />
    <TiGridItem icon="mine-to-pay" text="待付款" />
    <TiGridItem icon="to-deliver" text="待收货" />
    <TiGridItem icon="to-receive" text="待发货" />
  </TiGrid>
</template>

<script lang="ts" setup>
import { TiGrid, TiGridItem } from '@titian-design/vue';
</script>
```

#### 自定义宫格内容

```html showLineNumbers
<template>
  <TiGrid title="自定义图标尺寸，颜色">
    <TiGridItem icon="mine-to-pay" :size="60" text="图标尺寸" />
    <TiGridItem icon="to-deliver" color="red" text="定义颜色" />
    <TiGridItem icon="to-receive" text="待发货" />
    <TiGridItem icon="to-comment" text="待评价" />
    <TiGridItem icon="to-refund" text="退货" />
  </TiGrid>
  
  <TiGrid title="使用 slot 定义内容">
    <TiGridItem custom-content>
      <div slot="content">待付款</div>
    </TiGridItem>
    <TiGridItem custom-content>
      <div slot="content">待收货</div>
    </TiGridItem>
    <TiGridItem custom-content>
      <div slot="content">待发货</div>
    </TiGridItem>
    <TiGridItem custom-content>
      <div slot="content">待评价</div>
    </TiGridItem>
  </TiGrid>
</template>

<script lang="ts" setup>
import { TiGrid, TiGridItem } from '@titian-design/vue';
</script>
```

## TiGrid API

### 属性 **Properties**

| 名称      | 类型              | 是否必填 | 默认值 | 说明                 | 备注 |
| --------- | ----------------- | -------- | ------ | -------------------- | ---- |
| title     | `string`          | 否       | -      | 宫格标题                 | -    |
| columns   | `number`          | 否       | `4`      | 宫格的每行展示的个数 | -    |
| border    | `boolean`         | 否       | `true`   | 是否使用外边框       | -    |
| gutter    | `number`          | 否       | `0`      | 宫格之间的距离       | -    |
| square    | `boolean`         | 否       | `false`  | 是否自适应展示正方型 | -    |
| direction | `column` \| `row` | 否       | `column` | 排列方向             | -    |

### 插槽 **Slots**

| 名称  | 说明           | 备注 |
| ----- | -------------- | ---- |
| title | 自定义标题插槽 | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 扩展样式类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                   | 默认值 | 说明                 | 备注 |
| ---------------------- | --------- | -------------------- | ---- |
| `--grid-title-padding-v` | `24px` | 标题的垂直方向内边距 | -    |
| `--grid-title-padding-h` | `24px` | 标题的水平方向内边距 | -    |
| `--grid-bg-color`        | `var(--neutral-color-9, #ffffff)` | - | - | 

## TiGridItem API

### 属性 **Properties**

| 名称          | 类型      | 是否必填 | 默认值 | 说明           | 备注 |
| ------------- | --------- | -------- | ------ | -------------- | ---- |
| icon          | `string`  | 否       | -      | 图标           | -    |
| size          | `number`  | 否       | -      | 图标尺寸       | -    |
| color         | `string`  | 否       | -      | 图标颜色       | -    |
| text          | `string`  | 是       | -      | 文本           | -    |
| custom-content | `boolean` | 否       | `false`  | 是否自定义内容 | -    |

### 插槽 **Slots**

| 名称    | 说明             | 备注 |
| ------- | ---------------- | ---- |
| content | 自定义内容块插槽 |  需要使用自定义内容时，需要同时设置 `customContent` 才能生效。   |
| icon    | 自定义图标插槽   | 当传入 `icon` 属性时，优先取属性值    |
| text    | 自定义文字插槽   | 当传入 `text` 属性时，优先取属性值    |

### 可扩展样式名 **External Class**

| 类名      | 说明                 | 备注 |
| --------- | -------------------- | ---- |
| ext-class  | 根节点可扩展的类名   | -    |
| text-class | 文本节点可扩展的类名 | -    |
| icon-class | 图标节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                  | 默认值 | 说明               | 备注 |
| --------------------- | ------ | ------------ | ---- |
| `--grid-item-padding-v` | `16px` | 垂直方向内边距     | -    |
| `--grid-item-padding-h` | `8px` | 水平方向边距       | -    |
| `--grid-text-padding-v` | `0` | 文字垂直方向内边距 | -    |
| `--grid-text-padding-h` | `12px` | 文字水平方向内边距 | -    |
| `--grid-item-bg-color`  | `var(--neutral-color-9, #ffffff)` |  宫格内容块的背景色 | -    |
| `--grid-item-text-color` | `var(--neutral-color-1, #212121)` | 文字颜色 | - |
| `--grid-item-text-font-szie` | `28px` | - | - |
| `--grid-item-text-line-height` | `28px` | - | - |