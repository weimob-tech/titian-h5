---
title: 加载
sidebar_custom_props: 
    suffix: Loading
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/loading'
---

# 加载 _Loading_

** 加载中的过渡状态 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-loading-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-loading": "{{packageWeappName}}/loading/index"
  },

  // titan-cli搭建的项目
  "usingComponents": {
    "ti-loading": "platform://titian-mp/ti-loading"
  }
}
```
## 用法示例
#### 基本使用

```html showLineNumbers
<ti-loading />
```

#### 自定义展示模式

** `loading` 支持 `circular` 和 `spinner` 两种模式 **

```html showLineNumbers
<ti-loading mode="circular" />
<ti-loading mode="spinner" />
```

#### 自定义加载颜色, 尺寸
```html showLineNumbers
<ti-loading color="#ff0000" mode="circular" />
<ti-loading color="#ff0000" mode="spinner" />
<ti-loading mode="circular" size="{{108}}" />
<ti-loading mode="spinner" size="{{108}}" />
```

#### 添加文字

```html showLineNumbers
<ti-loading mode="circular" text="loading..." />
<ti-loading mode="spinner" text="loading..." />
<ti-loading color="#ff0000" mode="circular" text="loading..." />
<ti-loading color="#ff0000" mode="spinner" text="loading..." />
```

## ti-loading API

### 属性 **Properties**

| 名称      | 类型     | 必填 | 默认值     | 说明                                    | 备注 |
| --------- | -------- | ---- | ---------- | --------------------------------------- | ---- |
| text      | `string` | 否   | -          | loading 文字                            |  -    |
| size      | `string` | 否   | -          | loading 尺寸                            |   -   |
| mode      | `circular` \| `spinner` | 否   | `circular` | 展示模式  |     - |
| direction | `string` | 否   | -  | 文字和加载图标的排列方式 |     - |
| color     | `string` | 否   | `var(--neutral-color-3, #9e9e9e)` | 自定义颜色 | - |

### 可扩展样式名 **External Class**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                     | 默认值 | 说明                     | 备注 |
| ------------------------ | -------- | ---------------- | ---- |
| `--loading-duration`       | `800ms` | 动画时长                 | -    |
| `--loading-direction`      | `row` | 文字和加载图标的排列方式 | -    |
| `--loading-color`          | `var(--neutral-color-3, #9e9e9e)` | 主体颜色                 | -    |
| `--loading-width`          | `6rpx` | 加载框的宽度  | -    |
| `--loading-text-color`     | `var(--loading-color, @neutral-color-3)` | 文字颜色  | -    |
| `--loading-text-padding-v` | `--loading-text-padding-v`  | 文字垂直方向内间距       | -    |
| `--loading-text-padding-h` | `--loading-text-padding-h` | 文字水平方向内间距       | -    |
| `--loading-wrap-padding-v` | `6rpx` | - | - |
| `--loading-wrap-padding-h` | `6rpx` | - | - |
