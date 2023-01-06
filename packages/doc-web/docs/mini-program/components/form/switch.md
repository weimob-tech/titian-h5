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

<TabsLink id="ti-switch-api" />

## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-switch": "titan-ui/switch/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-switch": "platform://titian-mp/ti-switch"
  }
}
```

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-switch bind:change="onChange" />
```
#### 默认值
```html showLineNumbers
<ti-switch default-value />
```
#### 尺寸
```html showLineNumbers
<ti-switch size="{{ 80 }}" />
```
#### 颜色
```html showLineNumbers
<ti-switch active-color="#000" color="#fff" />
```
#### 禁用
```html showLineNumbers
<ti-switch disabled />
```
#### 加载
```html showLineNumbers
<ti-switch loading />
```
#### 受控模式
```html showLineNumbers
<ti-switch value="{{ true }}" />
```
## ti-switch API
### 属性 **Properties**

| 名称         | 类型      | 是否必填 | 默认值 | 说明     | 备注 |
| ------------ | --------- | -------- | ------ | -------- | ---- |
| value        | `boolean` | 否       | -      | 展示     |      |
| default-value | `boolean` | 否       | `true`   | 提示类型 | -    |
| size         | `number`  | 否       | `40`     | 大小     | -    |
| disabled     | `boolean` | 否       | `false`  | 点击禁用 | -    |
| active-color  | `string`  | 否       | -     | 选中颜色 | -    |
| color        | `string`  | 否       | -     | 未选颜色 | -    |
| loading      | `boolean` | 否       | `false`  | 加载中   | -    |
| ext-style     | `string`  | 否       | -     | 容器样式 | -    |

### 事件 **Events**

| 名称     | 参数列表 | 描述             | 备注 |
| -------- | -------- | ---------------- | ---- |
| bind:change | `(e: WechatMiniprogram.CustomEvent<boolean>) => void`   | 当前状态:打开/关闭 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --switch-bg-color        | `#c4c4c4` |  组件未选中状态下背景色 | -    |
| --switch-active-bg-color | `#fa2c19` | 组件选中状态下背景色，默认跟随主题色   | -    |
| --switch-ball-bg-color   | `#ffffff` | 球背景色               | -    |
| --switch-loading-color   | `#fa2c19` | 加载图标颜色，默认跟随主题色              | -    |


