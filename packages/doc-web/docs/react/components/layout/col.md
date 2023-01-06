---
title: 布局
sidebar_custom_props:
  suffix: Layout
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/layout"
---

# 布局 _Layout_

** Layout 提供了 `TiRow` 和 `TiCol` 两个组件来进行行列布局。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tirow-api" />

## 安装使用

```typescript showLineNumbers
import { TiRow, TiCol } from 'titian-h5-react'
```

## 用法示例

#### 栅格配置

** 栅格占位格数，为 0 时相当于 `display: none` **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRow>
        <TiCol span={24}>span-24</TiCol>
      </TiRow>
      
      <TiRow>
        <TiCol span={12}>span-12</TiCol>
        <TiCol span={12}>span-12</TiCol>
      </TiRow>

      <TiRow>
        <TiCol span={8}>span-8</TiCol>
        <TiCol span={8}>span-8</TiCol>
        <TiCol span={8}>span-8</TiCol>
      </TiRow>
      
      <TiRow>
        <TiCol span={6}>span-6</TiCol>
        <TiCol span={6}>span-6</TiCol>
        <TiCol span={6}>span-6</TiCol>
        <TiCol span={6}>span-6</TiCol>
      </TiRow>
    </>
  )
}
```

#### 偏移量设置
** 栅格左侧的偏移格数 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRow>
        <TiCol offset={12} span={12}>offset-12 span-12</TiCol>
      </TiRow>

      <TiRow>
        <TiCol span={8}>span-8</TiCol>
        <TiCol offset={8} span={8}>offset-8 span-8</TiCol>
      </TiRow>
      
      <TiRow>
        <TiCol offset={6} span={6}>offset-6 span-6</TiCol>
        <TiCol offset={6} span={6}>offset-6 span-6</TiCol>
      </TiRow>
    </>
  )
}
```

#### 配置栅格间隔

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRow gutter={16}>
        <TiCol span={12}>gutter-16 span-12</TiCol>
        <TiCol span={12}>gutter-16 span-12</TiCol>
      </TiRow>
      
      <TiRow gutter={12}>
        <TiCol span={12}>gutter-12 span-12</TiCol>
        <TiCol span={12}>gutter-12 span-12</TiCol>
      </TiRow>
    </>
  )
}
```

#### 使用浮动布局

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRow flex={false}>
        <TiCol span={12}>span-12</TiCol>
        <TiCol span={12}>span-12</TiCol>
      </TiRow>
    </>
  )
}
```

## TiRow API

### 属性 **Properties**

| 名称   | 类型    | 是否必填 | 默认值 | 说明               | 备注 |
| ------ | ------- | -------- | ------ | ------------------ | ---- |
| flex   | `boolean` | 否       | `true`   | 是否启用 `flex` 布局, 当值为`false`时，使用浮动布局 | -    |
| gutter | `number`  | 否       | `0`      | 列元素之间的距离   | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| extClass | 根节点可扩展的类名 | -    |

## TiCol API 

### 属性 **Properties**

| 名称   | 类型     | 是否必填 | 默认值 | 说明                                      | 备注 |
| ------ | -------- | -------- | ------ | ----------------------------------------- | ---- |
| span   | `number` | 是       | -      | 栅格占位格数，为 0 时相当于 `display: none` | -    |
| offset | `number` | 否       | -      | 栅格左侧的偏移格数                        | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| extClass | 根节点可扩展的类名 | -    |
