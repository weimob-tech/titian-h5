---
title: 按钮
sidebar_custom_props:
  suffix: Button
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '/#/button'
---

# 按钮 _Button_

**按钮用于触发一个操作，如路由跳转、打开弹框、提交表单等**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tibutton-api" />

## 安装使用

```typescript showLineNumbers
import { TiButton } from '@titian-design/mobile-react'
```

## 用法示例

#### 按钮类型

```typescript tsx showLineNumbers link="https://codesandbox.io/s/ti-cell-8yv5md?resolutionWidth=320&resolutionHeight=675&file=/src/example/cell.tsx"
const App: React.FC = () => {
  return (
    <>
      <TiButton type="primary">默认</TiButton>
      <TiButton type="warning">警告</TiButton>
      <TiButton type="success">成功</TiButton>
      <TiButton type="error">错误</TiButton>
      <TiButton type="info">信息</TiButton>
    </>
  )
}
```

#### 按钮风格

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton variant="contained">面性强调</TiButton>
      <TiButton variant="filled">面性次要</TiButton>
      <TiButton variant="outlined">线框按钮</TiButton>
      <TiButton variant="text">文字按钮</TiButton>
    </>
  )
}
```

#### 按钮尺寸

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton size="tiny">高度48px</TiButton>
      <TiButton size="small">高度56px</TiButton>
      <TiButton size="medium">高度64px</TiButton>
      <TiButton size="big">高度80px</TiButton>
      <TiButton size="large">高度96px</TiButton>
    </>
  )
}
```

#### 按钮颜色

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton color="#7232dd">确定</TiButton>
      <TiButton color="blue">确定</TiButton>
      <TiButton color="rgb(7, 193, 96)">确定</TiButton>
      <TiButton color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变按钮</TiButton>
    </>
  )
}
```

#### 按钮圆角
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton shape="capsule">胶囊按钮</TiButton>
      <TiButton shape="round">默认圆角按钮</TiButton>
      <TiButton shape="rect">直角按钮</TiButton>
    </>
  )
}
```

#### 按钮边框
**发丝线，仅适用 variant="outlined"风格**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton variant="outlined" hairline>一像素边框</TiButton>
    </>
  )
}
```

#### 禁用按钮

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton disabled>确定</TiButton>
    </>
  )
}
```

#### 块级按钮

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton block>块级</TiButton>
      <TiButton extStyle={{ width: '200px' }}>定宽</TiButton>
      <TiButton>自适应宽度</TiButton>
    </>
  )
}
```

#### 搭配图标

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton prefixIcon="home">左图标</TiButton>
      <TiButton suffixIcon="arrow-right">有图标</TiButton>
    </>
  )
}
```

#### 加载状态

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiButton loading />
      <TiButton loading loadingSize={46}>提交</TiButton>
      <TiButton loadingType="spinner" loading />
      <TiButton loadingText="加载中" loading />
    </>
  )
}
```

## TiButton API

### 属性 **Properties**

| 名称        | 类型      | 必填 | 默认值      | 说明                                                            | 备注                    |
| ----------- | --------- | ---- | ----------- | --------------------------------------------------------------- | ----------------------- |
| type        | `string`  | 否   | `primary`   | 按钮类型，可选值为 `primary` `info` `error` `warning` `success` `simple` | `simple`仅在`variant: outlined` 模式下可用，灰色调                       |
| size        | `string`  | 否   | `big`       | 按钮尺寸，可选值为 `tiny` `small` `medium` `big` `large`分别对应高度`48px` `56px` `64px` `80px` `96px`        | -                       |
| variant     | `string`  | 否   | `contained` | 按钮风格，可选值为 `contained` `filled` `outlined` `text`       | -                       |
| color       | `string`  | 否   | -           | 按钮颜色，十六进制色值 `#ffffff` `linear-gradient`渐变色   |  渐变色仅在`variant：contained`模式下可用，color的权重高于type|
| shape       | `string`  | 否   | `round`     | 按钮圆角风格，可选值为 `capsule` `round` `rect`                 | -                       |
| hairline    | `boolean` | 否   | `false`     | 当 size 为 `tiny` `small` `medium`，是否使用发丝 1px 边框       | -                       |
| disabled    | `boolean` | 否   | `false`     | 是否禁用按钮                                                    | -                       |
| loading     | `boolean` | 否   | `false`     | 是否显示为加载状态                                              | -                       |
| block       | `boolean` | 否   | `false`     | 将按钮宽度调整为其父宽度的选项                                  | -                       |
| prefixIcon  | `string`  | 否   | -           | 按钮文字左侧图标                                                | -                       |
| suffixIcon  | `string`  | 否   | -           | 按钮文字右侧图标                                                | -                       |
| loadingSize | `number`  | 否   | `30`        | 加载图标大小，单位 px                                           | -                       |
| loadingType | `string`  | 否   | `circular`  | 加载图标类型，可选择`circular` `spinner`                        | -                       |
| loadingText | `string`  | 否   | -           | 加载图标文字                                                    | -                       |
| extStyle    | `string` \| `Record<string, string>`  | 否   | -           | 根节点样式                                                      | -                       |

### 事件 **Events**

| 名称    | 参数列表 | 描述                                     | 备注 |
| ------- | -------- | ---------------------------------------- | ---- |
| onClick | `(e: Event) => void`        | 点击按钮，且按钮状态不为加载或禁用时触发 | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称            | 说明           | 备注 |
| --------------- | -------------- | ---- |
| extClass        | 根节点样式类   | -    |
| loadingClass    | 加载图标样式类 | -    |
| prefixIconClass | 左侧图标样式类 | -    |
| suffixIconClass | 右侧图标样式类 | -    |

### CSS 变量 **CSS Variable**

| 变量 <img width={200} /> | 默认值                                                                                                          | 说明                                             | 备注 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---- |
| --button-height          | 不同`size`，默认高度不同。`tiny` `small` `medium` `big` `large`分别对应`48px` `56px` `64px` `80px` `96px`       | 高度                                             | -    |
| --button-padding-v       | `0`                                                                                                             | 垂直方向内边距                                   | -    |
| --button-padding-h       | 不同`size`，默认左右内边距不同。`tiny` `small` `medium` `big` `large`分别对应`12px` `20px` `24px` `28px` `36px` | 水平方向内边距                                   | -    |
| --button-font-size       | 不同`size`，默认字号不同。`tiny` `small` `medium` `big` `large`分别对应`24px` `26px` `26px` `28px` `32px`       | 字号                                             | -    |
| --button-radius          | calc(var(--capsule-radius-size, 0px) + 8px)                                                                     | 圆角，修改后不在跟随全局风格                     | -    |
| --capsule-radius-size    | `0px`                                                                                                           | 全局圆角增量，控制图标风格。在项目根节点统一设置 | -    |
| --button-margin    | `0`                                                                                                           | 整体外边距 | -    |
