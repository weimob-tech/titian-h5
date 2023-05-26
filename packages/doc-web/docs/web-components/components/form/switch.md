---
title: 开关
sidebar_custom_props:
  suffix: Switch
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/switch"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 开关 _Switch_
**开关选择器**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-switch-api" />

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-switch onchange="onChange"></ti-switch>
```
#### 默认值
```html showLineNumbers
<ti-switch default-value></ti-switch>
```
#### 尺寸
```html showLineNumbers
<ti-switch size="80"></ti-switch>
```
#### 颜色
```html showLineNumbers
<ti-switch active-color="#000" color="#fff"></ti-switch>
```
#### 禁用
```html showLineNumbers
<ti-switch disabled></ti-switch>
```
#### 加载
```html showLineNumbers
<ti-switch loading></ti-switch>
```
#### 受控模式
<Tabs>
  <TabItem value="index.html" label="index.html" >

```html showLineNumbers
<ti-switch id="ti-switch"></ti-switch>
```
  </TabItem>
  <TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiSwitch = document.getElementById("ti-switch");
  tiSwitch.value = true;
};
```
</TabItem>
</Tabs>

## ti-switch API
### 属性 **Properties**

| 名称         | 类型      | 是否必填 | 默认值 | 说明     | 备注 |
| ------------ | --------- | -------- | ------ | -------- | ---- |
| value        | `boolean` | 否       | -      | 展示     |      |
| default-value | `boolean` | 否       | true   | 提示类型 | -    |
| size         | `number`  | 否       | 40     | 大小     | -    |
| disabled     | `boolean` | 否       | false  | 点击禁用 | -    |
| active-color  | `string`  | 否       | -     | 选中颜色 | -    |
| color        | `string`  | 否       | -     | 未选颜色 | -    |
| loading      | `boolean` | 否       | false  | 加载中   | -    |
| ext-style     | `string`  | 否       | -     | 容器样式 | -    |

### 事件 **Events**

| 名称     | 参数列表 | 描述             | 备注 |
| -------- | -------- | ---------------- | ---- |
| change | `(e: CustomEvent) => void`   | 当前状态:打开/关闭 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --switch-bg-color        | #c4c4c4 |  组件未选中状态下背景色 | -    |
| --switch-active-bg-color | #fa2c19 | 组件选中状态下背景色，默认跟随主题色   | -    |
| --switch-ball-bg-color   | #ffffff | 球背景色               | -    |
| --switch-loading-color   | #fa2c19 | 加载图标颜色，默认跟随主题色              | -    |


