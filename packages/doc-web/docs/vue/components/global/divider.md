---
title: 分割线
sidebar_custom_props:
  suffix: Divider
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/divider'
---

# 分割线 _Divider_

**用于将内容分隔为多个区域**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tidivider-api" />

## 安装使用

```typescript showLineNumbers
import { TiDivider } from '@titian-design/mobile-vue'
```

## 用法示例

#### 基础用法

```html showLineNumbers
<template>
  <TiDivider />
</template>

<script lang="ts" setup>
import { TiDivider } from '@titian-design/mobile-vue';
</script>
```

#### 分割线风格

```html showLineNumbers
<template>
  <TiDivider>实线</TiDivider>
  <TiDivider dashed>虚线</TiDivider>
</template>

<script lang="ts" setup>
import { TiDivider } from '@titian-design/mobile-vue';
</script>
```

#### 文字对齐方式

```html showLineNumbers
<template>
  <TiDivider text-align="left">居左</TiDivider>
  <TiDivider text-align="center">居中</TiDivider>
  <TiDivider text-align="right">居右</TiDivider>
</template>

<script lang="ts" setup>
import { TiDivider } from '@titian-design/mobile-vue';
</script>
```

#### 分割线颜色

```html showLineNumbers
<template>
  <TiDivider color="red">整体红色</TiDivider>
  <TiDivider border-color="blue">分割线蓝色</TiDivider>
  <TiDivider color="red" border-color="blue">
    文字红色、分割线蓝色
  </TiDivider>
  <TiDivider border-color="linear-gradient(to right, #fff 0%, #FFBE70 100%)" :border-width="6">
    线性渐变（默认对称）
  </TiDivider>
</template>

<script lang="ts" setup>
import { TiDivider } from '@titian-design/mobile-vue';
</script>
```

#### 分割线厚度

```html showLineNumbers
<template>
  <TiDivider :border-width="6">分割线厚度</TiDivider>
</template>

<script lang="ts" setup>
import { TiDivider } from '@titian-design/mobile-vue';
</script>
```

#### 分割线方向

```html showLineNumbers
<template>
  <TiDivider orientation="horizontal">横向</TiDivider>
  <TiDivider orientation="vertical">纵向</TiDivider>
</template>

<script lang="ts" setup>
import { TiDivider } from '@titian-design/mobile-vue';
</script>
```
## TiDivider API
### 属性 **Properties**
| 名称        | 类型      | 必填 | 默认值     | 说明                                      | 备注 |
| ----------- | --------- | ---- | ---------- | ----------------------------------------- | ---- |
| dashed      | `boolean` | 否   | false      | 虚线                                      | -    |
| hairline    | `boolean` | 否   | false      | 发丝线                                    | -    |
| text-align   | `string`  | 否   | center     | 文本位置，可选值 `left` `center` `right ` | -    |
| color       | `string`  | 否   | -          | 颜色，包括分割线和文字                    | -    |
| border-color | `string`  | 否   | -          | 分割线颜色                                | -    |
| border-width | `number`  | 否   | 2          | 分割线厚度                                | -    |
| orientation | `string`  | 否   | horizontal | 分割线方向，可选值`horizontal` `vertical` | -    |
| ext-style    | `string` \| `Record<string, string>`  | 否   | -          | 根节点样式                                | -    |

### 插槽 **Slots**
| 名称    | 说明     | 备注                             |
| ------- | -------- | -------------------------------- |
| default | 默认插槽 | orientation 为 `horizontal` 可用 |

### 外部样式类 **External Classes**
| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 根节点样式类 | -    |

### CSS 变量 **CSS Variable**
| 变量            | 默认值                                                                         | 说明             | 备注 |
| --------------- | ------------------------------------------------------------------------------ | ---------------- | ---- |
| --divider-gap   | 不同`orientation`，默认间隔不同；`horizontal` `vertical` 分别对应`24px` `20px` | 分割线和文字间距 | -    |
| --divider-width | `2px`                                                                          | 分割线厚度       | -    |
| --divider-color | var(--neutral-color-6, #f2f2f2)                                                | 分割线颜色       | -    |
| --divider-style | `solid`                                                                        | 分割线类型       | -    |
