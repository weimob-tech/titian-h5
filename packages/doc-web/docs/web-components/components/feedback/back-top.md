---
title: 返回顶部
sidebar_custom_props: 
    suffix: BackTop
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/back-top'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 返回顶部 _BackTop_

**返回页面顶部的操作按钮，当页面过长用户需要返回页面顶部的时候使用；**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-back-top-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-back-top": "@titian-design/weapp/back-top/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-back-top": "platform://titian-weapp/ti-back-top"
  }
}
```

## 基本用法

#### 简单使用

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<view style="height: 200vh" />
<ti-back-top />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  onPageScroll() {},
});
```

</TabItem>
</Tabs>

#### 使用时展示回到顶部文字

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<view style="height: 200vh" />
<ti-back-top text="顶部" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  onPageScroll() {},
});
```

</TabItem>
</Tabs>

#### 设置滚动时长

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<view style="height: 200vh" />
<ti-back-top duration="{{500}}" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  onPageScroll() {},
});
```

</TabItem>
</Tabs>

#### 绑定点击事件

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<view style="height: 200vh" />
<ti-back-top bind:tap="handleClick" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  onPageScroll() {},
  handleClick() {
    console.log('点击效果')
  },
});
```

</TabItem>
</Tabs>


## ti-back-top API

### 属性 **Properties**

| 名称               | 类型      | 必填 | 默认值 | 说明                               | 备注 |
| ----------------  | --------- | ---- | ------ | ---------------------------------- | ---- |
| text              | `string`  | 否   | - | 展示文字                           | -    |
| visibility-height  | `number`  | 否   | - | 滚动高度达到此参数值才出现 `back-top` | -    |
| duration          | `number`  | 否   | `300` | 回到顶部所需时间（ms）  | -    |
| use-slot           | `boolean` | 否   | - | 是否自定义内容，不会影响 text 的内容 | 

### 事件 **Events**

| 名称  | 参数 | 说明               | 备注 |
| ----- | ---- | ------------------ | ---- |
| `bind:tap` | -    | 点击后的回调函数 | -    |

### 可扩展样式名 **External Class**

| 类名      | 说明               | 备注 |
| --------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                | 默认值       | 说明 | 备注 |
| ------------------- | ---------- | ---- | ---- |
| `--back-top-z-index`  | `10`    | -    | -    |
| `--back-top-right`  | `28rpx`    | -    | -    |
| `--back-top-bottom`  | `200rpx`    | -    | -    |
| `--back-top-shadow`  | `0 6px 20px 0 rgba(0, 0, 0, 0.06)`    | -    | -    |
| `--back-top-bg-color`  | `var(--neutral-color-9, #ffffff)`    | -    | -    |
| `--back-top-width` | `96rpx` | - | -    |
| `--back-top-height` | `96rpx` | - | -    |
| `--back-top-border-radius` | `50%` | - | -    |
| `--back-top-text-font-size` | `20rpx` | - | -    |

