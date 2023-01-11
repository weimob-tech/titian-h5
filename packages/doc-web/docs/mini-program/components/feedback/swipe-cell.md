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

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-swipe-cell": "@titian-design/weapp/swpie-cell/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-swipe-cell": "platform://titian-weapp/ti-swipe-cell"
  }
}
```

## 用法示例

#### 基本使用

** 对于静态内容，组件内部会自动计算宽度 **
```html showLineNumbers
<ti-swipe-cell>
  <view>基本模式</view>
  <view slot="left">left</view>
  <view slot="right">right</view>
</ti-swipe-cell>
```

#### 自定义左右宽度

:::note
自定义宽度的单位为 `rpx`
:::

```html showLineNumbers
<ti-swipe-cell left-width="{{200}}">
  <view>自定义左侧宽度</view>
  <view slot="left">left</view>
</ti-swipe-cell>

<ti-swipe-cell right-width="{{200}}">
  <view>自定义右侧宽度</view>
  <view slot="right">right</view>
</ti-swipe-cell>
```

#### 自动展开
```html showLineNumbers
<ti-swipe-cell left-width="{{200}}" visible>
  <view>自动展开左侧</view>
  <view slot="left">left</view>
</ti-swipe-cell>
<ti-swipe-cell right-width="{{200}}" visible>
  <view >自动展开右侧</view>
  <view slot="right">right</view>
</ti-swipe-cell>
```

#### 禁用滑动
```html showLineNumbers
<ti-swipe-cell disabled>
  <view>禁用滑动</view>
  <view slot="left">left</view>
  <view slot="right">right</view>
</ti-swipe-cell>
```

#### 异步操作控制

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-button bind:tap="handleClick">控制</ti-button>
<ti-swipe-cell visible="{{visible}}" async-close>
  <view>异步控制滑动</view>
  <view slot="left">left</view>
</ti-swipe-cell>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    visible: false,
  },
  handleClick() {
    this.setData({
      visible: !this.data.visible,
    });
  },
});
```

</TabItem>
</Tabs>

#### 监听事件

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-swipe-cell bind:open="handleOpen" bind:close="handleClose" bind:click="handleSwipeCellClick">
  <view>基本模式</view>
  <view slot="left">left</view>
  <view slot="right">right</view>
</ti-swipe-cell>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  handleOpen(e) {
    console.log('展开', e.detail);
  },
  handleClose(e) {
    console.log('收起', e.detail);
  },
  handleSwipeCellClick(e) {
    console.log('点击', e.detail);
  },
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
| `bind:open`   | `(e: WechatMiniprogram.CustomEvent<OpenParams>) => void` | 打开时触发  | -      |
| `bind:close`  | `(e: WechatMiniprogram.CustomEvent<CloseParams>) => void` | 关闭时触发 | - |
| `bind:click`  | <code>(e: WechatMiniprogram.CustomEvent<left &vert; right &vert; outside &vert; cell \>) => void</code> | 点击时触发 | 关闭时的点击位置 (`left` `right` `cell` `outside`)         |

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