---
title: 滑动单元格
sidebar_custom_props: 
    suffix: SwipeCell
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/swipe-cell'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 滑动单元格 _SwipeCell_

** 可以左右滑动来展示操作按钮的单元格组件。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-swipe-cell-api" />

## 用法示例

#### 基本使用

** 对于静态内容，组件内部会自动计算宽度 **
```html showLineNumbers
<ti-swipe-cell>
  <div>基本模式</div>
  <div slot="left">left</div>
  <div slot="right">right</div>
</ti-swipe-cell>
```

#### 自定义左右宽度

:::note
自定义宽度的单位为 `px`
:::

```html showLineNumbers
<ti-swipe-cell left-width="200">
  <div>自定义左侧宽度</div>
  <div slot="left">left</div>
</ti-swipe-cell>

<ti-swipe-cell right-width="200">
  <div>自定义右侧宽度</div>
  <div slot="right">right</div>
</ti-swipe-cell>
```

#### 自动展开
```html showLineNumbers
<ti-swipe-cell left-width="200" visible>
  <div>自动展开左侧</div>
  <div slot="left">left</div>
</ti-swipe-cell>
<ti-swipe-cell right-width="200" visible>
  <div>自动展开右侧</div>
  <div slot="right">right</div>
</ti-swipe-cell>
```

#### 禁用滑动
```html showLineNumbers
<ti-swipe-cell disabled>
  <div>禁用滑动</div>
  <div slot="left">left</div>
  <div slot="right">right</div>
</ti-swipe-cell>
```

#### 异步操作控制

<Tabs>
<TabItem value="html" label="index.html">

```html showLineNumbers
<ti-button id="btn">控制</ti-button>
<ti-swipe-cell id="swipe-cell" async-close>
  <div>异步控制滑动</div>
  <div slot="left">left</div>
</ti-swipe-cell>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const swipeCell = document.querySelector('#swipe-cell');
const btn = document.querySelector('#btn');
let visible = false;

btn.addEventListener('click', function () {
  swipeCell.visible = !visible;
  visible = !visible;
});
```

</TabItem>
</Tabs>

#### 监听事件

<Tabs>
<TabItem value="html" label="index.html">

```html showLineNumbers
<ti-swipe-cell id="swipe-cell">
  <div>基本模式</div>
  <div slot="left">left</div>
  <div slot="right">right</div>
</ti-swipe-cell>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const swipeCell = document.querySelector('#swipe-cell');

swipeCell.addEventListener('open', function (e) {
  console.log('展开', e.detail);
});

swipeCell.addEventListener('close', function (e) {
  console.log('展开', e.detail);
});

swipeCell.addEventListener('click', function (e) {
  console.log('展开', e.detail);
});
```

</TabItem>
</Tabs>

## ti-swipe-cell API

### 属性 **Properties**

| 名称       | 类型      | 必填 | 默认值 | 说明               | 备注                                     |
| ---------- | --------- | ---- | ------ | ------------------ | ---------------------------------------- |
| left-width  | `number`  | 否   | `0`      | 左边滑动区域宽度   | -                                        |
| right-width | `number`  | 否   | `0`      | 右边滑动区域宽度   | -                                        |
| visible    | `boolean` | 否   | `false`  | 设置可滑动区域划开 | 会先从左边到右开始查找是否有内容用于展示 |
| disabled   | `boolean` | 否   | `false`  | 禁止滑动           | -                                        |
| async-close | `boolean` | 否   | `false`  | 是否异步关闭       | -                                        |
| name       | `string`  | 否   | `-`      | 唯一标识           | -                                        |

### 事件 **Events**

| 事件名 | 参数 |  说明       | 备注                                                       |
| ------ | ---------- | -------------- | -------------------------------------------- |
| open   | `(e: CustomEvent) => void` | 打开时触发  | -      |
| close  | `(e: CustomEvent) => void` | 关闭时触发 | - |
| click  | `(e: CustomEvent) => void` | 点击时触发 | 关闭时的点击位置 (`left` `right` `cell` `outside`)         |

#### OpenParams
```typescript showLineNumbers
interface OpenParams {
  position: Position;
  name: string;
}
```

#### CloseParams
```typescript showLineNumbers
interface CloseParams {
  position: ClickPosition;
  name: string;
  instance: TiSwipeCell;
}
```
### 插槽 **Slots**
| 名称    | 说明       | 备注 |
| ------- | ---------- | ---- | 
| right | 右侧内容 | -   |
| left    | 左侧内容   | -    | 


### 可扩展样式名 **External Class**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |