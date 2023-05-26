---
title: 加载
sidebar_custom_props:
  suffix: Loading
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/loading"
---

# 加载 _Loading_

** 加载中的过渡状态 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiloading-api" />

## 安装使用

```typescript showLineNumbers
import { TiLoading } from '{{packageWeappReact}}'
```

## 用法示例
#### 基本使用

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return <TiLoading />
}
```

#### 自定义展示模式

** `loading` 支持 `circular` 和 `spinner` 两种模式 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiLoading mode="circular" />
      <TiLoading mode="spinner" />
    </>
  )
}
```

#### 自定义加载颜色, 尺寸

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiLoading color="#ff0000" mode="circular" />
      <TiLoading color="#ff0000" mode="spinner" />
      <TiLoading mode="circular" size={108} />
      <TiLoading mode="spinner" size={108} />
    </>
  )
}
```

#### 添加文字

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiLoading mode="circular" text="loading...." />
      <TiLoading mode="spinner" text="loading...." />

      <TiLoading color="#ff0000" mode="circular" text="loading...." />
      <TiLoading color="#ff0000" mode="spinner" text="loading...." />
    </>
  )
}
```

## TiLoading API

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
| extClass | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                     | 默认值 | 说明                     | 备注 |
| ------------------------ | -------- | ---------------- | ---- |
| `--loading-duration`       | `800ms` | 动画时长                 | -    |
| `--loading-direction`      | `row` | 文字和加载图标的排列方式 | -    |
| `--loading-color`          | `var(--neutral-color-3, #9e9e9e)` | 主体颜色                 | -    |
| `--loading-width`          | `6px` | 加载框的宽度  | -    |
| `--loading-text-color`     | `var(--loading-color, var(--neutral-color-3, #9e9e9e))` | 文字颜色  | -    |
| `--loading-text-padding-v` | `0`  | 文字垂直方向内间距       | -    |
| `--loading-text-padding-h` | `0` | 文字水平方向内间距       | -    |
| `--loading-wrap-padding-v` | `6px` | - | - |
| `--loading-wrap-padding-h` | `6px` | - | - |
| `--loading-margin` | `0` | - | - |
