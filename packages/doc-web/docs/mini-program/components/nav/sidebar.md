---
title: 侧边栏
sidebar_custom_props:
  suffix: Sidebar
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/sidebar"
---

# 侧边栏 _Sidebar_
**垂直展示的导航栏，用于在不同的内容区域之间进行切换**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-sidebar-api" />

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-sidebar": "titian-mp/sidebar/index",
    "ti-sidebar-item": "titian-mp/sidebar-item/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-sidebar": "platform://titian-mp/ti-sidebar",
    "ti-sidebar-item": "platform://titian-mp/ti-sidebar-item"
  }
}
```

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-sidebar active-index="{{ 1 }}">
  <ti-sidebar-item label="侧边导航" badge="1" />
  <ti-sidebar-item label="IP联名款" />
  <ti-sidebar-item label="精选系列" disabled />
</ti-sidebar>
```
## ti-sidebar API
### 属性 **Properties**

| 名称        | 类型     | 必填 | 默认值 | 说明         | 备注 |
| ----------- | -------- | ---- | ------ | ------------ | ---- |
| active-index | `number` | 否   | `0`      | 选中项的索引 | -    |
| ext-style    | `string` \| `Record<string, string>` | 否   | -      | 根节点样式   | -    |

### 事件 **Events**

| 名称     | 参数列表 | 描述           | 备注 |
| -------- | -------- | -------------- | ---- |
| bind:change | `(e: WechatMiniprogram.CustomEvent<number>) => void`    | 切换菜单时触发, 返回激活项索引| -    |
| bind:scrolltoupper | `(e: WechatMiniprogram.CustomEvent<{ direction: 'top' }>) => void`    | 滚动到顶部时触发| -    |
| bind:scrolltolower | `(e: WechatMiniprogram.CustomEvent<{ direction: 'bottom' }>) => void`    | 滚动到底部时触发| -    |
| bind:scroll | `(e: WechatMiniprogram.CustomEvent) => void`    | 滚动时触发| -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | ti-sidebar节点样式类 | -    |
### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --sidebar-bg-color | `#f5f5f5` | 侧边栏背景色 | - |

## ti-sidebar-item API
### 属性 **Properties**

| 名称     | 类型      | 必填 | 默认值 | 说明     | 备注 |
| -------- | --------- | ---- | ------ | -------- | ---- |
| label    | `string`  | 否   | -      | 每项内容 | -    |
| disabled | `boolean` | 否   | `false`  | 是否禁用 | -    |
| badge    | `string`  | 否   | -      | 徽标内容 | -    |
| dot      | `boolean` | 否   | -      | 圆点徽标 | -    |
| ext-style      | `string` \| `Record<string, string>` | 否   | -      | 根节点样式 | -    |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --sidebar-text-color | `#757575` | 侧边栏每项文字颜色 | - |
| --sidebar-line-height | `38rpx` | 侧边栏每项文字行高 | - |
| --sidebar-font-size | `26rpx` | 侧边栏每项文字字号 | - |
| --sidebar-active-bg-color | `#fff` | 侧边栏激活项背景颜色 | - |
| --sidebar-active-text-color | `#fa2c19` | 侧边栏激活项文字颜色，默认跟随主题色 |  |
| --sidebar-disabled-text-color | `#c4c4c4` | 侧边栏禁用项文字颜色 | - |
| --sidebar-padding | `34rpx 20rpx 34rpx 28rpx` | 侧边栏内边距 | - |
