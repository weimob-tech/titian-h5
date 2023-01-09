---
title: 进度条
sidebar_custom_props:
  suffix: Progress
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/progress'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 进度条 _Progress_

** 表示当前任务的进度。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-progress-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-progress": "@titian-design/weapp/progress/index",
    "ti-circle-progress": "titan-weapp/circle-progress/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-progress": "platform://titian-weapp/ti-progress",
    "ti-circle-progress": "platform://titian-weapp/ti-circle-progress",
  }
}
```
## 用法示例

#### 基本使用

```html showLineNumbers
<ti-progress />
<ti-progress value="{{80}}" />
<ti-circle-progress value="{{80}}" />
```

#### 设置缓冲进度
```html showLineNumbers
<ti-progress value="{{60}}" buffer="{{80}}" />
<ti-circle-progress value="{{60}}" buffer="{{80}}" />
```

#### 设置进度条宽度
```html showLineNumbers
<ti-progress value="{{50}}" stroke-width="{{20}}" />
<ti-circle-progress value="{{80}}" stroke-width="{{20}}" />
```

#### 修改展示进度值、颜色等

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-progress value="{{80}}" show-progress />
<ti-circle-progress value="{{80}}" show-progress />

<ti-progress value="{{80}}" color="#2a6ae9" />
<ti-circle-progress value="{{80}}" color="#2a6ae9" />

<ti-progress value="{{80}}" gradient-color="{{gradientColor}}" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  data: {
    gradientColor: {
      from: '#108ee9',
      to: '#87d068',
    },
  },
});
```

</TabItem>
</Tabs>

## ti-progress API

### 属性 **Properties**

| 名称          | 类型      | 是否必填 | 默认值 | 说明                                    | 备注 |
| ------------- | --------- | -------- | ------ | --------------------------------------- | ---- |
| size         | `number`  | 否       | `72`      | 进度值大小                  | -    |
| value         | `number`  | 否       | 0      | 进度值，取值范围 0-100                  | -    |
| buffer        | `number`  | 否       | 0      | 缓冲值，取值范围 0-100                  | -    |
| show-progress  | `boolean` | 否       | false  | 是否展示进度值，默认不展示              | -    |
| color         | `string`  | 否       | -      | 进度条颜色，默认为主题色                | -    |
| stroke-width   | `number`  | 否       | 8      | 进度条宽度，默认为 8px                  | 此时单位为 `rpx`   |
| stroke-color   | `string`  | 否       | -      | 进度条轨道颜色，默认为进度条值的 10%    | -    |
| buffer-bg-color   | `string`  | 否       | -      | 进度条缓冲轨道颜色，默认为进度条值的 30%    | -    |
| gradient-color | `GradientColor`  | 否       | -      | 进度条颜色为渐变色，需要设置 `from` 和 `to` | -    |

#### GradientColor

```typescript showLineNumbers
interface GradientColor {
  from: string;
  to: string;
}
```

### 可扩展样式名 **External Class**

| 类名       | 说明                   | 备注 |
| ---------- | ---------------------- | ---- |
| ext-class  | 扩展样式类名           | -    |
| text-class | 进度条文字扩展样式类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                         | 默认值 | 说明           | 备注 |
| ---------------------------- | ------ | -------- | ---- |
| `--progress-margin-v`          | `8rpx` | 垂直方向外间距 | -    |
| `--progress-margin-h`          | `0` | 水平方向外间距 | -    |
| `--progress-height`            | `8rpx` | 进度条高度     | -    |
| `--progress-radius`            | `calc(var(--base-radius-size, 0px) + 12px)` | 圆角大小       | -    |
| `--progress-bar-color`         | `rgb(@theme-r, @theme-g, @theme-b)` | 轨道颜色       | -    |
| `--progress-bar-radius`        | `calc(var(--base-radius-size, 0px) + 12px)` | 轨道圆角大小   | -    |
| `--progress-pivot-margin-left` | `8rpx` | 左侧外间距     | -    |
| `--progress-pivot-color`       | `rgb(@theme-r, @theme-g, @theme-b)` | 进度条内容颜色 | -    |

## ti-circle-progress API

### 属性 **Properties**

| 名称          | 类型      | 是否必填 | 默认值 | 说明                                    | 备注 |
| ------------- | --------- | -------- | ------ | --------------------------------------- | ---- |
| size         | `number`  | 否       | `72`      | 进度值大小                  | -    |
| value         | `number`  | 否       | 0      | 进度值，取值范围 0-100                  | -    |
| buffer        | `number`  | 否       | 0      | 缓冲值，取值范围 0-100                  | -    |
| show-progress  | `boolean` | 否       | false  | 是否展示进度值，默认不展示              | -    |
| color         | `string`  | 否       | -      | 进度条颜色，默认为主题色                | -    |
| stroke-width   | `number`  | 否       | 8      | 进度条宽度，默认为 8px                  | -    |
| stroke-color   | `string`  | 否       | -      | 进度条轨道颜色，默认为进度条值的 10%    | -    |
| buffer-bg-color   | `string`  | 否       | -      | 进度条缓冲轨道颜色，默认为进度条值的 30%    | -    |
| font            | `string` | 否 | - | canvas `font 属性` | - |
