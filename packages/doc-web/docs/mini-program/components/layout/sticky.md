---
title: 粘性布局
sidebar_custom_props:
  suffix: Sticky
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/sticky"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 粘性布局 _Sticky_
**Sticky 组件与 CSS 中 position: sticky 属性实现的效果一致。可切换 css 模式和 js 模式，纯 css 模式不适用的情况可以采用 js 模式， js 模式采用 IntersectionObserver Api。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-sticky-api" />

## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-sticky": "titian-mp/sticky/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-sticky": "platform://titian-mp/ti-sticky"
  }
}
```

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-sticky>
  <div>吸顶元素</div>
</ti-sticky>
```
#### 使用css模式
:::info 使用条件：
1. 父元素不能overflow:hidden或者overflow:auto属性；
2. 父元素的高度需大于sticky元素的高度；
3. sticky元素仅在其父元素内生效。
:::
```html showLineNumbers
<ti-sticky use-pure-css>
  <div>吸顶元素</div>
</ti-sticky>
```

#### 吸顶距离
```html showLineNumbers
<ti-sticky offset-top="{{ 100 }}">
  <div>吸顶元素</div>
</ti-sticky>
```

#### 指定容器
**use-pure-css模式下无需指定container，默认在父元素内生效。**

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<view id="custom-container" style="height: 250rpx;">
  <ti-sticky container="{{ container }}">
    <ti-button>指定容器</ti-button>
  </ti-sticky>
</view>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    container: null,
  },
  onReady() {
    this.setData({
      container: () => wx.createSelectorQuery().select("#container"),
    });
  },
});
```
</TabItem>
</Tabs>

## ti-sticky API
### 属性 **Properties**

| 名称       | 类型       | 必填 | 默认值 | 说明                                   | 备注 |
| ---------- | ---------- | ---- | ------ | -------------------------------------- | ---- |
| offset-top  | `number`   | 否   | 0      | 吸顶时与顶部的距离，单位 px            | -    |
| container  | `function` | 否   | -      | 一个函数，返回容器对应的 NodesRef 节点 | -    |
| disabled   | `boolean`  | 否   | false  | 是否禁止吸顶                           | -    |
| z-index     | `number`   | 否   | 99     | z-index                                | -    |
| use-pure-css | `boolean`  | 否   | false  | 使用css的position: sticky实现          | -    |

### 事件 **Events**

| 名称    | 参数列表               | 描述                 | 备注 |
| ------- | ---------------------- | -------------------- | ---- |
| bind:fixed |  `(e: WechatMiniprogram.CustomEvent<{isFixed: boolean}>) => void ` | 在吸顶状态改变是触发 | -    |
### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |
