---
title: 空态
sidebar_custom_props:
  suffix: Empty
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/empty"
---

# 空态 _Empty_
**空态占位图，常用于加载失败、加载数据为空等场景。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiempty-api" />

## 安装使用

```ts showLineNumbers
import { TiEmpty } from 'titian-h5-react';
```

## 用法示例

#### 基本用法

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty />
    </>
  )
}
```

#### 设置标题

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty title="空态页说明文案" />
    </>
  )
}
```

#### 设置标题、副标题

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty title="空态页说明文案" subTitle="补充说明文案请尽量简短" />
    </>
  )
}
```


#### 设置 ext-style 样式

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty title="空态页说明文案" extStyle="margin:20px 0 " />
    </>
  )
}
```

#### 设置 ext-class

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty title="空态页说明文案" extClass="ext-class" />
    </>
  )
}
```


#### 设置 size

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty title="空态页说明文案" size="big" />
    </>
  )
}
```

#### 设置 image

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiEmpty title="空态页说明文案" image="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png" />
    </>
  )
}
```



## TiEmpty API

### 属性 **Properties**

| 名称         | 类型              | 必填 | 默认值                                                                                         | 说明                | 备注 |
| ------------ | ----------------- | ---- | ---------------------------------------------------------------------------------------------- | ------------------- | ---- |
| image        | `string`          | 否   | `https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/145/searchwithnoresult.png` | 图片网址            |      |
| size         | `medium` \| `big` | 否   | medium                                                                                         | 尺寸                |      |
| title        | `string`          | 否   | -                                                                                              | 标题                | -    |
| subTitle     | `string`          | 否   | -                                                                                              | 副标题              | -    |
| useImageSlot | `boolean`         | 否   | false                                                                                          | 是否启用 image 插槽 | -    |
| useTitleSlot | `boolean`         | 否   | false                                                                                          | 是否启用 title 插槽 | -    |
| extStyle     | `string`          | 否   | -                                                                                              | 容器样式            | -    |

### 插槽 **Slots**

| 名称   | 说明             | 备注 |
| ------ | ---------------- | ---- |
| image  | 自定义图片展示   | -    |
| title  | 自定义标题块展示 | -    |
| bottom | 自定义底部块展示 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| extClass | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                            | 默认值           | 说明                             | 备注 |
| ------------------------------- | ---------------- | -------------------------------- | ---- |
| --empty-medium-size             | 200px            | 中间尺寸下图片大小               | -    |
| --empty-medium-title-margin-top | @gap-28          | 中间尺寸下标题距离图片的上外边距 | -    |
| --empty-big-size                | 240px            | 大尺寸下图片大小                 | -    |
| --empty-big-title-margin-top    | @gap-32          | 大尺寸下标题距离图片的上外边距   | -    |
| --empty-title-color             | var(--neutral-color-2, #757575) | 标题区文字颜色                   | -    |
| --empty-sub-title-color         | var(--neutral-color-4, #c4c4c4) | 副标题区文字颜色                 | -    |
| --empty-min-width               | 100%             | empty 最小宽度                   | -    |
| --empty-min-height              | 485px            | empty 最小高度                   | -    |
| --empty-width                   | 100%             | empty 宽度                       | -    |
| --empty-height                  | 100%             | empty 高度                       | -    |
