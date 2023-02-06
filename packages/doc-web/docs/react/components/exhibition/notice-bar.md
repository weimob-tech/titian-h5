---
title: 通告栏
sidebar_custom_props:
  suffix: NoticeBar
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/notice-bar"
---

# 通告栏 _NoticeBar_
**用于循环播放展示一组消息通知，可设置横向滚动和纵向滚动**

## 安装使用
```typescript showLineNumbers
import { TiNoticeBar } from '@titian-design/mobile-react'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiNoticeBar content="内容文字" />
    </>
  )
}
```
#### 纵向滚动
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiNoticeBar content="['内容1', '内容2']" variant="vertical" />
    </>
  )
}
```
#### 滚动速度
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiNoticeBar content="内容文字" speed={100} />
    </>
  )
}
```
#### 内容超出后显示方式
:::info 属性含义：
1. `auto` 内容超出一行，variant为horizontal时，默认滚动播放；variant为vertical时截断。一般用于横向滚动。
2. `wrap` 内容超出后换行，不可滚动。此模式为纯静态展示。
3. `ellipsis` 内容超出一行缺省，一般用于纵向滚动。
4. `clip` 内容超出一行截断，一般用于纵向滚动。
:::

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiNoticeBar content="内容文字" textMode="auto" />
      <TiNoticeBar content="内容文字" textMode="wrap" />
      <TiNoticeBar content="内容文字" textMode="ellipsis" />
      <TiNoticeBar content="内容文字" textMode="clip" />
    </>
  )
}
```
## TiNoticeBar API
### 属性 **Properties**

| 名称       | 类型                         | 必填 | 默认值       | 说明                                                | 备注                          |
| ---------- | ---------------------------- | ---- | ------------ | --------------------------------------------------- | ----------------------------- |
| content    | `string` \| `array` | 是   | `否`         | 展示内容，纵向滚动时传入`array`                       | -                  |
| color      | `string`                     | 否   | `#fa2c19`    | 文字颜色，背景色默认为文字颜色加 10%透明度          | -                             |
| speed      | `number`                     | 否   | `50`         | 滚动速率 (px/s)                                     | -                             |
| variant    | `string`                     | 否   | `horizontal` | 滚动方式，可选值`horizontal` `vertical`             | -                             |
| scrollable | `boolean`                    | 否   | `false`      | 是否开启滚动播放，内容长度溢出时默认开启            | -                             |
| leftIcon   | `string`                     | 否   | -            | 左侧图标                                            | -                             |
| rightIcon  | `string`                     | 否   | -            | 右侧图标                                            | -                             |
| textMode   | `string`                     | 否   | `auto`       | 文本溢出样式，可选值`auto` `wrap` `ellipsis` `clip` | wrap 即文本溢出换行，此状态为禁止状态，不可滚动播放 |
| extStyle   | `string`                     | 否   | -            | 根节点样式                                          | -                             |

### 事件 **Events**

| 名称    | 参数列表             | 描述             | 备注 |
| ------- | -------------------- | ---------------- | ---- |
| onClick | `(e: Event) => void` | 点击通知栏时触发 | -    |

### 插槽 **Slots**

| 名称   | 说明           | 备注 |
| ------ | -------------- | ---- |
| before | 内容左面的插槽 | -    |
| after  | 内容右侧的插槽 | -    |
### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 根节点样式类 | -    |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --notice-bar-height | `72px` | 通告栏高度 | - |
| --notice-bar-color | `rgba(250,44,25,1)` | 通告栏文字颜色，默认跟随主题色| - |
| --notice-bar-background-color | `rgba(250,44,25,0.1)` | 通告栏背景色，默认跟随主题色加10%透明度 | - |
| --notice-bar-padding-v | `16px` | 通告栏垂直方向内边距 | `textMode`为`wrap`模式下有效 |
| --notice-bar-padding-h | `28px` | 通告栏水平方向内边距 | `textMode`为`wrap`模式下有效 |
| --notice-bar-line-height | `40px` | 通告栏文字行高 | `textMode`为`wrap`模式下有效 |