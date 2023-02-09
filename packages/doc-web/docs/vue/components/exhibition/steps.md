---
title: 步骤条
sidebar_custom_props:
  suffix: Steps
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/steps"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 步骤条 _Steps_
**步骤条组件引导用户按照流程完成任务，让用户了解当前出于整个流程中的位置**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tisteps-api" />

## 安装使用
```typescript jsx showLineNumbers
import { TiSteps } from '@titian-design/mobile-vue';
```

## 用法示例

#### 基础用法
```html showLineNumbers
<template>
  <TiSteps :options="options" :current="1" />
</template>

<script lang="ts" setup>  
import { TiSteps } from '@titian-design/mobile-vue';
const options = [
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
  },
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
  }
]
</script>
```
#### 设置高亮项
**可以设置current属性，也可设置每项option里面的checked字**
```html showLineNumbers
<template>
  <TiSteps :options="options" :current="0" />
</template>

<script lang="ts" setup>  
import { TiSteps } from '@titian-design/mobile-vue';
const options = [
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
  },
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
    checked: true
  }
]
</script>
```

#### 设置副标题右对齐
```html showLineNumbers
<template>
  <TiSteps :options="options" subtitle-align="right" />
</template>

<script lang="ts" setup>  
import { TiSteps } from '@titian-design/mobile-vue';
const options = [
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
  },
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
    checked: true
  }
]
</script>
```
#### 自定义样式
**自定义每一项的样式，可以设置每项option里面的style字段，[查看可用css变量](#css-变量-css-variable)**
```html showLineNumbers
<template>
  <TiSteps :options="options" />
</template>

<script lang="ts" setup>  
import { TiSteps } from '@titian-design/mobile-vue';
const options = [
  {
    title: "标题文字",
    subtitle: "副标题",
    description: "详细内容文字，详细内容文字，详细内容文字",
    time: "2018.07.06 09:52:42",
    style: {
      '--steps-title-font-size': '12px',
      '--steps-desc-color': 'red',
    }
  }
]
</script>
```
## TiSteps API
### 属性 **Properties**
| 名称           | 类型                                  | 必填 | 默认值 | 说明                          | 备注 |
| -------------- | ------------------------------------- | ---- | ------ | ----------------------------- | ---- |
| options        | `Array<Option>`                       | 是   | -      | 数据项，[Option类型](#option) | -    |
| current        | `number`        \| `Array<number>`    | 否   | `0`    | 高亮项索引                    | -    |
| active-color   | `string`                              | 否   | -      | 高亮项颜色                    | -    |
| icon           | `string`                              | 否   | -      | 每项图标名                    | -    |
| subtitle-align | `left`          \| `right`            | 否   | `left` | 副标题的对齐方式              | -    |
| ext-style      | `string` \| `Record<string, string> ` | 否   | -      | 根节点样式                    | -    |

### Option
**API 属性中的 options 为一个数组或者二维数组，数组中的每一个对象有以下 key：**

| 名称        | 类型                                  | 必填 | 默认值 | 说明                                                      | 备注 |
| ----------- | ------------------------------------- | ---- | ------ | --------------------------------------------------------- | ---- |
| title       | `string`                              | 否   | -      | 标题文字                                                  | -    |
| subtitle    | `string`                              | 否   | -      | 标题右侧区域，副标题文字                                  | -    |
| description | `string`                              | 否   | -      | 主体，描述文字                                            | -    |
| time        | `string`                              | 否   | -      | 最下方区域，如时间                                        | -    |
| icon        | `string`                              | 否   | -      | 图标名称                                                  | -    |
| style       | `string` \| `Record<string, string> ` | 否   | -      | 每项自定义样式，[查看可用css变量](#css-变量-css-variable) | -    |

### 外部样式类 **External Classes**
| 名称      | 说明           | 备注 |
| --------- | -------------- | ---- |
| ext-class | 根节点样式类名 | -    |

### CSS 变量 **CSS Variable**
| 变量                          | 默认值    | 说明                                                                               | 备注 |
| ----------------------------- | --------- | ---------------------------------------------------------------------------------- | ---- |
| --steps-padding-h             | `28rpx`   | 步骤条整体水平方向，左右内边距                                                     | -    |
| --steps-padding-bottom        | `40rpx`   | 步骤条整体下方内边距                                                               | -    |
| --steps-text-vertical-gap     | `8rpx`    | 步骤条右侧内容部分，文字竖项的间距                                                 | -    |
| --steps-line-width            | `2rpx`    | 步骤条左侧图标下方的竖线的宽度，默认横向缩放50%                                    | -    |
| --steps-line-color            | `2rpx`    | 步骤条左侧图标下方的竖线的颜色                                                     | -    |
| --steps-icon-margin-right     | `36rpx`   | 步骤条左侧图标和右侧内容之间的间距                                                 | -    |
| --steps-icon-size             | `40rpx`   | 步骤条左侧自定义的图标尺寸                                                         | -    |
| --steps-dot-size              | `40rpx`   | 步骤条左侧圆点的尺寸                                                               | -    |
| --steps-dot-color             | `40rpx`   | 步骤条左侧圆点的颜色                                                               | -    |
| --steps-title-color           | `#9e9e9e` | 步骤条标题颜色                                                                     | -    |
| --steps-title-font-size       | `30rpx`   | 步骤条标题字号                                                                     | -    |
| --steps-title-font-weight     | `600`     | 步骤条标题字重                                                                     | -    |
| --steps-title-line-height     | `36rpx`   | 步骤条标题行高                                                                     | -    |
| --steps-subtitle-color        | `#9e9e9e` | 步骤条副标题颜色                                                                   | -    |
| --steps-subtitle-font-size    | `24rpx`   | 步骤条副标题字号                                                                   | -    |
| --steps-subtitle-font-weight  | `400`     | 步骤条副标题字重                                                                   | -    |
| --steps-subtitle-line-height  | `28rpx`   | 步骤条副标题行高                                                                   | -    |
| --steps-subtitle-margin-left  | `8rpx`    | 步骤条副标题左侧间距                                                               | -    |
| --steps-subtitle-text-align   | `left`    | 步骤条副标题对齐方式                                                               | -    |
| --steps-desc-color            | `#9e9e9e` | 步骤条描述内容颜色                                                                 | -    |
| --steps-desc-font-size        | `26rpx`   | 步骤条描述内容字号                                                                 | -    |
| --steps-desc-font-weight      | `400`     | 步骤条描述内容字重                                                                 | -    |
| --steps-desc-line-height      | `40rpx`   | 步骤条描述内容行高                                                                 | -    |
| --steps-desc-text-align       | `justify` | 步骤条描述内容文字对齐方式                                                         | -    |
| --steps-time-color            | `#9e9e9e` | 步骤条最下方内容颜色                                                               | -    |
| --steps-time-font-size        | `24rpx`   | 步骤条最下方内容字号                                                               | -    |
| --steps-time-font-weight      | `400`     | 步骤条最下方内容字重                                                               | -    |
| --steps-time-line-height      | `28rpx`   | 步骤条最下方内容行高                                                               | -    |
| --steps-time-text-align       | `left`    | 步骤条最下方内容文字对齐方式                                                       | -    |
| --steps-active-color          | -         | 步骤条高亮项颜色，此变量整体设置，不同内容部分高亮项不一样，可以用其他变量分开设置 | -    |
| --steps-line-active-color     | `#e0e0e0` | 步骤条竖线高亮项颜色，默认和不高亮颜色一致                                         | -    |
| --steps-icon-active-color     | `#fa2c19` | 步骤条图标高亮颜色，默认跟随主题色                                                 | -    |
| --steps-dot-active-color      | `#fa2c19` | 步骤条圆点图标高亮颜色，默认跟随主题色                                             | -    |
| --steps-title-active-color    | `#fa2c19` | 步骤条标题高亮颜色，默认跟随主题色                                                 | -    |
| --steps-subtitle-active-color | `#fa2c19` | 步骤条副标题高亮颜色，默认跟随主题色                                               | -    |
| --steps-desc-active-color     | `#212121` | 步骤条描述内容高亮颜色                                                             | -    |
| --steps-time-active-color     | `#212121` | 步骤条最下方内容高亮颜色                                                           | -    |