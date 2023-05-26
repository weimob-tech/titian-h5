---
title: 分类选择
sidebar_custom_props:
  suffix: TreeSelect
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/tree-select"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 分类选择 _TreeSelect_
**多组数据选择，内置侧边栏组件**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-tree-select-api" />

## 用法示例

#### 基础用法
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-tree-select id="ti-tree-select"></ti-tree-select>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload=function(){
  var tree = document.getElementById("ti-tree-select");
  tree.options = [
    {
      label: "侧边导航",
      value: "a1",
      children: [
        { label: "标题文字", value: "a1-1" },
        { label: "标题文字", value: "a1-2" }
      ]
    }
  ];
};
```
</TabItem>
</Tabs>

#### 自定义数据项别名
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-tree-select id="ti-tree-select"></ti-tree-select>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload=function(){
  var tree = document.getElementById("ti-tree-select");
  tree.alias = { label: 'name', value: 'id', children: 'list' };
  tree.options = [
    {
      label: "侧边导航",
      value: "a1",
      children: [
        { label: "标题文字", value: "a1-1" },
        { label: "标题文字", value: "a1-2" }
      ]
    }
  ];
};
```
</TabItem>
</Tabs>

#### 自定义右侧内容部分
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-tree-select id="ti-tree-select">
  <div id="ti-tree-content"></div>
</ti-tree-select>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload=function(){
  var tree = document.getElementById("ti-tree-select");
  tree.options = [
    {
      label: "侧边导航1",
      value: "a1"
    },
    {
      label: "侧边导航2",
      value: "a2"
    }
  ];
  function onChangeNav(e){
    var content = document.getElementById("ti-tree-content");
    content.innerHtml = e.target.label
  };
  tree.addEventListener('onchangenav', onChangeNav, false);
};
```
</TabItem>
</Tabs>

## ti-tree-select API
### 属性 **Properties**

| 名称          | 类型                                 | 必填 | 默认值 | 说明                                                                   | 备注 |
| ------------- | ------------------------------------ | ---- | ------ | ---------------------------------------------------------------------- | ---- |
| options       | `Array<Option>`                      | 是   | -      | 选项数据，[Option类型](#option)，普通模式需包含 children 字段，自定义模式不需要 children 字段 | -    |
| default-index  | `number`                             | 否   | `0`    | 左侧选中项的索引                                                       | -    |
| active-value   | `array`                              | 否   | -      | 右侧选中项的 value，对应option 子项 value 值                           | -    |
| disabled-value | `array`                              | 否   | -      | 禁用项，option 子项 value 值                                           | -    |
| height        | `number` \| `string`                 | 否   | `100%` | 高度                                                                   | -    |
| max-count      | `number`                             | 否   | -      | 最多可选项数                                                           | -    |
| icon          | `string`                             | 否   | -      | 选项右侧 icon                                                          | -    |
| alias         | `Record<string, string>`             | 否   | -      | 数据项默认字段名`label` `value` `children`的别名，用于自定义数据                                    | -    |
| ext-style      | `string` \| `Record<string, string>` | 否   | -      | 根节点样式                                                             | -    |

### Option
**API 属性中的 options 为一个数组或者二维数组，数组中的每一个对象有以下 key：**

| 名称     | 类型                                    | 必填 | 默认值 | 说明                                                                    | 备注 |
| -------- | --------------------------------------- | ---- | ------ | ----------------------------------------------------------------------- | ---- |
| label    | `string`                                | 是   | -      | 展示文字                                                                | -    |
| value    | `string`                                | 是   | -      | 唯一id                                                                  | -    |
| children | `Array<{label: string, value: string}>` | 否   | -      | 右侧内容区域列表数据项，其中value值对应active-value和disabled-value中的值 | -    |

### 事件 **Events**

| 名称         | 参数列表                                                                                               | 描述             | 备注 |
| ------------ | ------------------------------------------------------------------------------------------------------ | ---------------- | ---- |
| change-nav  | `(e: CustomEvent) => void`                                    | 父选项改变是触发 | -    |
| change-item | `(e: CustomEvent) => void` | 子选项改变是触发 | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称                | 说明                  | 备注 |
| ------------------- | --------------------- | ---- |
| ext-class            | 根节点样式类名        | -    |
| tree-select-sidebar   | 左侧 sidebar 样式类名 | -    |
| tree-select-container | 右侧容器样式类名      | -    |

### CSS 变量 **CSS Variable**

| 变量                         | 默认值  | 说明                       | 备注 |
| ---------------------------- | ------- | -------------------------- | ---- |
| --tree-select-cell-h         | `108rpx` | 右侧默认选项内容的每项高度 | - |
| --tree-select-active-color   | `#fa2c19` | 右侧默认选项内容选中颜色   | - |
| --tree-select-disabled-color | `#c4c4c4` | 右侧默认选项内容禁用颜色   | - |