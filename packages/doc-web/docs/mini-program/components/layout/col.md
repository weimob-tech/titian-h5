---
title: 布局
sidebar_custom_props: 
    suffix: Layout
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/layout'
---

# 布局 _Layout_

** Layout 提供了 `ti-tow` 和 `ti-col` 两个组件来进行行列布局。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-row-api" />

## 安装使用


```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-row": "{{packageWeappName}}/row/index",
    "ti-col": "{{packageWeappName}}/col/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-row": "platform://titian-mp/ti-row",
    "ti-col": "platform://titian-mp/ti-col"
  }
}
```
## 用法示例

#### 栅格配置

** 栅格占位格数，为 0 时相当于 `display: none` **

```html showLineNumbers
<ti-row>
  <ti-col span="{{24}}">span-24</ti-col>
</ti-row>

 <ti-row>
  <ti-col span="{{12}}">span-12</ti-col>
  <ti-col span="{{12}}">span-12</ti-col>
</ti-row>

<ti-row>
  <ti-col span="{{8}}">span-8</ti-col>
  <ti-col span="{{8}}">span-8</ti-col>
  <ti-col span="{{8}}">span-8</ti-col>
</ti-row>

<ti-row>
  <ti-col span="{{6}}">span-6</ti-col>
  <ti-col span="{{6}}">span-6</ti-col>
  <ti-col span="{{6}}">span-6</ti-col>
  <ti-col span="{{6}}">span-6</ti-col>
</ti-row>
```

#### 偏移量设置
** 栅格左侧的偏移格数 **

```html showLineNumbers
<ti-row>
  <ti-col span="{{12}}" offset="{{12}}">span-12</ti-col>
</ti-row>

<ti-row>
  <ti-col offset="{{8}}" span="{{8}}">offset-8 span-8</ti-col>
  <ti-col span="{{8}}">span-8</ti-col>
</ti-row>

<ti-row>
  <ti-col offset="{{6}}" span="{{6}}">span-6</ti-col>
  <ti-col offset="{{6}}" span="{{6}}">span-6</ti-col>
</ti-row>
```

#### 配置栅格间隔
```html showLineNumbers
<ti-row gutter="{{12}}">
  <ti-col span="{{12}}">gutter-12 span-12</ti-col>
  <ti-col span="{{12}}">gutter-12 span-12</ti-col>
</ti-row>

<ti-row gutter="{{4}}">
  <ti-col span="{{8}}">gutter-4 span-8</ti-col>
  <ti-col span="{{8}}">gutter-4 span-8</ti-col>
  <ti-col span="{{8}}">gutter-4 span-8</ti-col>
</ti-row>
```
#### 使用浮动布局

```html showLineNumbers
<ti-row flex="{{false}}">
  <ti-col span="{{12}}">span-12</ti-col>
  <ti-col span="{{12}}">span-12</ti-col>
</ti-row>
```

## ti-row API

### 属性 **Properties**

| 名称   | 类型    | 是否必填 | 默认值 | 说明               | 备注 |
| ------ | ------- | -------- | ------ | ------------------ | ---- |
| flex   | `boolean` | 否       | `true`   | 是否启用 `flex` 布局, 当值为`false`时，使用浮动布局 | -    |
| gutter | `number`  | 否       | `0`      | 列元素之间的距离   | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |


## ti-col API 

### 属性 **Properties**

| 名称   | 类型     | 是否必填 | 默认值 | 说明                                      | 备注 |
| ------ | -------- | -------- | ------ | ----------------------------------------- | ---- |
| span   | `number` | 是       | -      | 栅格占位格数，为 0 时相当于 `display: none` | -    |
| offset | `number` | 否       | -      | 栅格左侧的偏移格数                        | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |