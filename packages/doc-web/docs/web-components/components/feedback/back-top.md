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

## 基本用法

#### 简单使用

```html showLineNumbers
<div style="height: 200vh" ></div>
<ti-back-top></ti-back-top>
```

#### 使用时展示回到顶部文字

```html showLineNumbers
<div style="height: 200vh"></div>
<ti-back-top text="顶部"></ti-back-top>
```

#### 设置滚动时长

```html showLineNumbers
<div style="height: 200vh"></div>
<ti-back-top duration="500"></div>
```

#### 绑定点击事件

<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<div style="height: 200vh"></div>
<ti-back-top id="ti-back-top"></ti-back-top>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```javascript showLineNumbers
window.onload = function(){
  var tiActionSheet = document.querySelector("#ti-back-top");
  tiBackTop.addEventListener('click', function (e) {
    console.log(e.detail);
  });
} 
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
| click | -    | 点击后的回调函数 | -    |

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

