---
title: 徽标
sidebar_custom_props:
  suffix: Badge
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/badge"
---

# 徽标 _Badge_
**图标或者文字右上角的圆形徽标数字**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tibadge-api" />

## 安装使用
```typescript showLineNumbers
import { TiBadge } from '{{packageWeappReact}}'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiBadge content="5">
        <div class="box" /> 
      </TiBadge>
      <TiBadge dot>
        <div class="box" />
      </TiBadge>
      <TiBadge icon="home">
        <div class="box" />
      </TiBadge>
    </>
  )
}
```
#### 置于元素内部
**置于目标元素内部, 外部元素如box需添加position: relative;**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <div class="box" style={{position: relative}}>
        <TiBadge content="6" />
      </div>
    </>
  )
}
```
#### 普通展示，无定位
**例如在cell组件中使用**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiCell>
        <TiBadge static slot="desc" content="6" />
      </TiCell>
    </>
  )
}
```
#### 使用在文字右上角
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiBadge content="6" atText>
        <div>Title Text</div>
      </TiBadge>
    </>
  )
}
```
#### 自定义偏移
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiBadge content="6" offset={[-6, -2]}>
        <div class="box" />
      </TiBadge>
    </>
  )
}
```
#### 徽标内容撑开方向
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiBadge content="6" spread="bothSides">
        <div class="box" />
      </TiBadge>
      <TiBadge content="6" spread="toRight">
        <div class="box" />
      </TiBadge>
    </>
  )
}
```
## TiBadge API
### 属性 **Properties**

| 名称     | 类型               | 必填 | 默认值    | 说明                                       | 备注 |
| -------- | ------------------ | ---- | --------- | ------------------------------------------ | ---- |
| dot      | `boolean`          | 否   | `false`     | 不展示数字，只有一个小红点                 | -    |
| content  | `string`           | 否   | -         | 展示的内容                                 | -    |
| spread   | `string`           | 否   | `bothSides` | 内容的撑开方向，可选值：`bothSides` `toRight` | -    |
| icon     | `string`           | 否   | -         | 内容部分为图标时的图标名称                 | -    |
| offset   | `[number, number]` | 否   | -         | 设置状态点的位置偏移，默认单位 px          | -    |
| static   | `boolean`          | 否   | `false`     | 取消定位相关样式，用作普通展示             | -    |
| atText   | `boolean`          | 否   | -         | 用在文字内容的右上角展示                   | -    |
| extStyle | `string`           | 否   | -         | 根节点样式                                 | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明           | 备注 |
| -------- | -------------- | ---- |
| extClass | 根节点样式类名 | -    |
