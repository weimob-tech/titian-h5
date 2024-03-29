---
title: 徽标
sidebar_custom_props:
  suffix: Badge
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/badge"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 徽标 _Badge_
**图标或者文字右上角的圆形徽标数字**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-badge-api" />

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-badge content="5">
  <div class="box"></div>
</ti-badge>
<ti-badge dot>
  <div class="box"></div>
</ti-badge>
<ti-badge icon="home">
  <div class="box"></div>
</ti-badge>
```
#### 置于元素内部
**置于目标元素内部, 外部元素如box需添加position: relative;**
```html showLineNumbers
<div class="box" style="position: relative">
  <ti-badge content="6"></div>
</div>
```
#### 普通展示，无定位
**例如在cell组件中使用**
```html showLineNumbers
<ti-cell>
  <ti-badge static slot="desc" content="6"></div>
</ti-cell>
```
#### 使用在文字右上角
```html showLineNumbers
<ti-badge content="6" at-text>
  <div>Title Text</div>
</ti-badge>
```
#### 自定义偏移
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-badge id="ti-badge" content="6">
  <div class="box"></div>
</ti-badge>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiBadge = document.getElementById("ti-badge");
  tiBadge.offset = [-6, -2];
};
```
</TabItem>
</Tabs>

#### 徽标内容撑开方向
```html showLineNumbers
<ti-badge content="6" spread="bothSides">
  <div class="box"></div>
</ti-badge>
<ti-badge content="6" spread="toRight">
  <div class="box"></div>
</ti-badge>
```
## ti-badge API
### 属性 **Properties**

| 名称     | 类型               | 必填 | 默认值    | 说明                                       | 备注 |
| -------- | ------------------ | ---- | --------- | ------------------------------------------ | ---- |
| dot      | `boolean`          | 否   | false     | 不展示数字，只有一个小红点                 | -    |
| content  | `string`           | 否   | -         | 展示的内容                                 | -    |
| spread   | `string`           | 否   | bothSides | 内容的撑开方向，可选值：`bothSides`、`toRight` | -    |
| icon     | `string`           | 否   | -         | 内容部分为图标时的图标名称                 | -    |
| offset   | `[number, number]` | 否   | -         | 设置状态点的位置偏移，默认单位 px          | -    |
| static   | `boolean`          | 否   | false     | 取消定位相关样式，用作普通展示             | -    |
| at-text   | `boolean`          | 否   | -         | 用在文字内容的右上角展示                   | -    |
| ext-style | `string`           | 否   | -         | 根节点样式                                 | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明           | 备注 |
| -------- | -------------- | ---- |
| ext-class | 根节点样式类名 | -    |
