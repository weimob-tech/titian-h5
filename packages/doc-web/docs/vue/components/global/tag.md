---
title: 标签
sidebar_custom_props:
  suffix: Tag
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/tag"
---

# 标签 _Tag_

**用于标记和选择。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titag-api" />

## 安装使用
```typescript showLineNumbers
import { TiTag } from '@titian-design/vue'
```

## 用法示例

#### 类型

```html showLineNumbers
<template>
  <TiTag variant="contained">面性 = 实心标签</TiTag>
  <TiTag variant="filled">面性次要 = 辅助色实心标签</TiTag>
  <TiTag variant="outlined">线性 = 描边标签</TiTag>
</template>

<script lang="ts" setup>
import { TiTag } from '@titian-design/vue';
</script>
```

#### 尺寸
```html showLineNumbers
<template>
  <TiTag size="small">小尺寸</TiTag>
  <TiTag size="medium">中尺寸</TiTag>
  <TiTag size="big">大尺寸</TiTag>
</template>

<script lang="ts" setup>
import { TiTag } from '@titian-design/vue';
</script>
```


#### 图标 icon
```html showLineNumbers
<template>
  <TiTag left-icon="home" right-icon="arrow-right">左右图标</TiTag>
</template>

<script lang="ts" setup>
import { TiTag } from '@titian-design/vue';
</script>
```

#### 优惠券模式
```html showLineNumbers
<template>
  <TiTag shape="coupon" variant="contained">面性 = 实心标签</TiTag>
  <TiTag shape="coupon" variant="filled">面性次要 = 辅助色实心标签</TiTag>
  <TiTag shape="coupon" variant="outlined">线性 = 描边标签</TiTag>
</template>

<script lang="ts" setup>
import { TiTag } from '@titian-design/vue';
</script>
```

## TiTag API

### 属性 **Properties**

| 名称      | 类型     | 必填 | 默认值    | 说明                                        | 备注 |
| --------- | -------- | ---- | --------- | ------------------------------------------- | ---- |
| variant   | `string` | 否   | contained | 类型，可选值`contained` `filled` `outlined` | -    |
| size      | `string` | 否   | medium    | 大小，可选值`small` `medium` `big`          | -    |
| shape     | `string` | 否   | round     | 形状，可选值`normal` \| `coupon`            | -    |
| left-icon  | `string` | 否   | ''        | 左侧图标名称                                | -    |
| right-icon | `string` | 否   | ''        | 右侧图标名称                                | -    |
| ext-style  | `string` | 否   | -         | 根节点样式                                  | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |
| prefix  | 前缀     | -    |
| suffix  | 后缀     | -    |

### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 根节点样式类 | -    |

### CSS 变量 **CSS Variables**

| 变量                     | 默认值                                  | 说明                | 备注 |
| ------------------------ | --------------------------------------- | ------------------- | ---- |
| `--theme-tr`             | var(--theme-r, 250)                     | 标签主题色，r 色值  | -    |
| `--theme-tg`             | var(--theme-g, 44)                      | 标签主题色， g 色值 | -    |
| `--theme-tb`             | var(--theme-b, 25)                      | 标签主题色， b 色值 | -    |
| `--tag-theme`            | rgb(--theme-tr, --theme-tg, --theme-tb) | 标签主题色          | -    |
| `--tag-height`           | `32px`                                  | 高度                | -    |
| `--tag-padding`          | `0 8px`                                 | padding 间距        | -    |
| `--tag-border-width`     | `1px`                                   | 边宽度              | -    |
| `--tag-border-style`     | `solid`                                 | 边风格              | -    |
| `--tag-border-color`     | -                                       | 边颜色,跟随主题色   | -    |
| `--tag-background-color` | -                                       | 背景色,跟随主题色   | -    |
| `--tag-text-color`       | `#fff`                                  | 文字颜色            | -    |
| `--tag-font-size`        | `20px`                                  | 字号                | -    |
| `--tag-font-weight`      | `400`                                   | 字重                | -    |
