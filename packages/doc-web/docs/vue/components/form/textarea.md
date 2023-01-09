---
title: 多行文本
sidebar_custom_props:
  suffix: Textarea
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "/#/textarea"
---

# 多行文本 _Textarea_
**输入框用于通过键盘输入内容，适用于多行文本**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titextarea-api" />

## 安装使用

```typescript showLineNumbers
import { TiTextarea } from '@titian-design/vue'
```
## 用法示例

#### 基本用法
```html showLineNumbers
<template>
  <TiTextarea placeholder="请输入评论文字，限200字以内…" />
</template>

<script lang="ts" setup>
import { TiTextarea } from '@titian-design/vue';
</script>
```
#### 高度自适应
```html showLineNumbers
<template>
  <TiTextarea placeholder="请输入评论文字，限200字以内…" auto-height />
</template>

<script lang="ts" setup>
import { TiTextarea } from '@titian-design/vue';
</script>
```
#### 字数统计
```html showLineNumbers
<template>
  <TiTextarea placeholder="请输入评论文字，限200字以内…" show-count />
</template>

<script lang="ts" setup>
import { TiTextarea } from '@titian-design/vue';
</script>
```
#### 键盘确认按钮文字
```html showLineNumbers
<template>
  <TiTextarea confirm-type="done" placeholder="完成" />
  <TiTextarea confirm-type="send" placeholder="发送" />
  <TiTextarea confirm-type="search" placeholder="搜索" />
  <TiTextarea confirm-type="next" placeholder="下一项" />
  <TiTextarea confirm-type="go" placeholder="前往" />
</template>

<script lang="ts" setup>
import { TiTextarea } from '@titian-design/vue';
</script>
```
## TiTextarea API
### 属性 **Properties**

| 名称             | 类型      | 必填 | 默认值 | 说明                                                   | 备注   |
| ---------------- | --------- | ---- | ------ | ------------------------------------------------------ | ------ |
| value            | `string`  | 否   | -      | 当前输入的值                                           | -      |
| placeholder      | `string`  | 否   | -      | 输入框为空时占位符                                     | -      |
| placeholder-style | `string`  | 否   | -      | 指定 placeholder 的样式                                | -      |
| disabled         | `boolean` | 否   | -      | 是否禁用                                               | false  |
| show-count        | `boolean` | 否   | -      | 是否显示统计字数                                       | false  |
| maxlength        | `number`  | 否   | -      | 最大输入长度，设置为 -1 的时候不限制最大长度           | 140    |
| auto-focus        | `boolean` | 否   | -      | 自动聚焦，拉起键盘                                     | false  |
| focus            | `boolean` | 否   | -      | 获取焦点                                               | false  |
| auto-height       | `boolean` | 否   | -      | 是否自动增高，设置 auto-height 时，style.height 不生效 | false  |
| confirm-type      | `string`  | 否   | -      | 设置键盘右下角按钮的文字，仅在 type='text'时生效       | `done` |
| ext-style         | `string` \| `Record<string, string>`  | 否   | -      | 根节点样式                                             | -      |

### 事件 **Events**

| 名称      | 参数列表                                 | 描述                 | 备注 |
| --------- | ---------------------------------------- | -------------------- | ---- |
| input   | `(e: CustomEvent<{value: string}>) => void` | 键盘输入时触发，     | -    |
| focus   | `(e: CustomEvent) => void`                     | 输入框聚焦时触发，   | -    |
| blur    | `(e: CustomEvent<{value: string}>) => void` | 输入框失去焦点时触发 | -    |
| confirm | `(e: CustomEvent<{value: string}>) => void` | 点击完成按钮时触发   | -    |

### 外部样式类 **External Classes**

| 名称          | 说明            | 备注 |
| ------------- | --------------- | ---- |
| ext-class      | 根节点样式类    | -    |
| textarea-class | textarea 样式类 | -    |

### CSS 变量 **CSS Variable**

| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --textarea-height | `220px` | 文本域高度 | - |
| --textarea-padding-v | `24px` | 文本域垂直方向内边距 | - |
| --textarea-padding-h | `28px` | 文本域水平方向内边距 | - |
| --textarea-min-height | `172px` | 文本域最新高度，自增模式下有效 | - |
| --textarea-font-size | `28px` | 文本域字号 | - |
| --textarea-line-height | `42px` | 文本域行高 | - |