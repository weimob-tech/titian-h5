---
title: 开关
sidebar_custom_props:
  suffix: Switch
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/switch"
---

# 开关 _Switch_
**开关选择器**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiswitch-api" />

## 安装使用
```typescript showLineNumbers
import { TiSwitch } from '@titian-design/mobile-react'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch />
    </>
  )
}
```
#### 默认值
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch defaultValue />
    </>
  )
}
```
#### 尺寸
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch size={80} />
    </>
  )
}
```
#### 颜色
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch activeColor="#000" color="#fff" />
    </>
  )
}
```
#### 禁用
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch disabled />
    </>
  )
}
```
#### 加载中
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch loading />
    </>
  )
}
```

#### 受控模式
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSwitch value={true} />
    </>
  )
}
```
## TiSwitch API
### 属性 **Properties**

| 名称         | 类型      | 是否必填 | 默认值 | 说明     | 备注 |
| ------------ | --------- | -------- | ------ | -------- | ---- |
| value        | `boolean` | 否       | -      | 展示     |      |
| defaultValue | `boolean` | 否       | `true`   | 提示类型 | -    |
| size         | `number`  | 否       | `40`     | 大小     | -    |
| disabled     | `boolean` | 否       | `false`  | 点击禁用 | -    |
| activeColor  | `string`  | 否       | -     | 选中颜色 | -    |
| color        | `string`  | 否       | -     | 未选颜色 | -    |
| loading      | `boolean` | 否       | `false`  | 加载中   | -    |
| extStyle     | `string`  | 否       | -     | 容器样式 | -    |

### 事件 **Events**

| 名称     | 参数列表 | 描述             | 备注 |
| -------- | -------- | ---------------- | ---- |
| onChange | `(e: CustomEvent<boolean>) => void`   | 当前状态:打开/关闭 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| extClass | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variable**

| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --switch-bg-color        | `#c4c4c4` |  组件未选中状态下背景色 | -    |
| --switch-active-bg-color | `#fa2c19` | 组件选中状态下背景色，默认跟随主题色   | -    |
| --switch-ball-bg-color   | `#ffffff` | 球背景色               | -    |
| --switch-loading-color   | `#fa2c19` | 加载图标颜色，默认跟随主题色              | -    |


