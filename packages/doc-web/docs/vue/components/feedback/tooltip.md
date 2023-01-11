---
title: 提示
sidebar_custom_props:
  suffix: Tooltip
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/tooltip"
---

# 提示 _Tooltip_

**显示简短信息性消息。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titooltip-api" />

## 安装使用

```typescript showLineNumbers
import { TiTooltip } from '@titian-design/vue';
```

## 用法示例

:::note
提示操作区不宜过小，需大于三角形边长
:::

```html showLineNumbers
<template>
  <TiTooltip
    :close-on-click="true"
    content="每行文字限制十二个中文字每行文字限制十二个中文字每行文字限制十二个中文字"
  >
    <TiIcon name="info" :size="36" />
  </TiTooltip>
</template>

<script lang="ts" setup>
import { TiTooltip, TiIcon } from '@titian-design/vue';
</script>
```

## TiTooltip API

### 属性 **Properties**

| 名称         | 类型              | 是否必填 | 默认值 | 说明                        | 备注 |
| ------------ | ----------------- | -------- | ------ | --------------------------- | ---- |
| visible      | `boolean`         | 否       | false  | 展示                        |      |
| content      | `string`          | 否       | -      | 提示文案                    | -    |
| direction    | `bottom` \| `top` | 否       | bottom | 提示方向                    | -    |
| size         | `number`          | 否       | 24     | 直角三角形底边长度，单位 px | -    |
| close-on-click | `boolean`         | 否       | false  | 点击关闭                    | -    |
| ext-style     | `string`          | 否       | -      | 容器样式                    | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注   |
| ------- | -------- | ------ |
| default | 默认插槽 | 点击区 |
| content | 自定内容插槽 | 当内容为空时，选用此插槽 |

### 外部样式类 **External Classes**

| 名称            | 说明               | 备注 |
| --------------- | ------------------ | ---- |
| ext-class        | 根节点可扩展的类名 | -    |
| ext-content-class | 提示区域容器 class | -    |
| ext-inner-class   | 提示区域 class     | -    |

### CSS 变量 **CSS Variables**

| 变量                             | 默认值                                      | 说明                       | 备注 |
| -------------------------------- | ------------------------------------------- | -------------------------- |
| --tooltip-content-max-width      | 384px                                       | 提示区最大宽度             | -    |
| --tooltip-content-z-index        | 1                                           | 内容区最大层级             | -    |
| --tooltip-content-bg-color       | var(--neutral-color-1, #212121)             | 内容区背景颜色             | -    |
| --tooltip-content-color          | var(--neutral-color-9, #ffffff)             | 内容区字体颜色             | -    |
| --tooltip-content-radius         | calc(var(--capsule-radius-size, 0px) + 8px) | 内容区圆角                 | -    |
| --tooltip-arrow-content-bg-color | var(--neutral-color-1, #212121)             | 箭头区背景颜色             | -    |
| --tooltip-inner-color            | var(--neutral-color-9, #ffffff)             | 提示内容区字体颜色         | -    |
| --tooltip-inner-padding-v        | 24px                                        | 提示区内容区垂直方向内边距 | -    |
| --tooltip-inner-padding-h        | 36px                                        | 提示区内容区水平方向内边距 | -    |
| --tooltip-inner-min-width        | 30px                                        | 提示区内容区最大宽度       | -    |
| --tooltip-inner-font-size        | 26px                                        | 内容字体尺寸               | -    |
| --tooltip-inner-line-height      | 1.4615                                      | 内容字体行高               | -    |
| --tooltip-box-shadow             | 0px 8px 40px rgba(0, 0, 0, 0.06)            | - | - |
