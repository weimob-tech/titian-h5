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

<TabsLink id="tisidebar-api" />

## 安装使用
```typescript showLineNumbers
import { TiSidebar, TiSidebarItem } from 'titian-h5-react'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSidebar activeIndex={1}>
        <TiSidebarItem label="侧边导航" badge="1" />
        <TiSidebarItem label="IP联名款" />
        <TiSidebarItem label="精选系列" disabled />
      </TiSidebar>
    </>
  )
}
```
## TiSidebar API
### 属性 **Properties**

| 名称        | 类型     | 必填 | 默认值 | 说明         | 备注 |
| ----------- | -------- | ---- | ------ | ------------ | ---- |
| activeIndex | `number` | 否   | `0`      | 选中项的索引 | -    |
| extStyle    | `string` \| `Record<string, string>` | 否   | -      | 根节点样式   | -    |

### 事件 **Events**

| 名称     | 参数列表 | 描述           | 备注 |
| -------- | -------- | -------------- | ---- |
| onChange | `(e: CustomEvent<number>) => void`    | 切换菜单时触发, 返回激活项索引| -    |
| onScrolltoupper | `(e: WechatMiniprogram.CustomEvent<{ direction: 'top' }>) => void`    | 滚动到顶部时触发| -    |
| onScrolltolower | `(e: WechatMiniprogram.CustomEvent<{ direction: 'bottom' }>) => void`    | 滚动到底部时触发| -    |
| onTiScroll | `(e: WechatMiniprogram.CustomEvent) => void`    | 滚动时触发| -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | TiSidebar节点样式类 | -    |
### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --sidebar-bg-color | `#f5f5f5` | 侧边栏背景色 | - |

## TiSidebarItem API
### 属性 **Properties**

| 名称     | 类型      | 必填 | 默认值 | 说明     | 备注 |
| -------- | --------- | ---- | ------ | -------- | ---- |
| label    | `string`  | 否   | -      | 每项内容 | -    |
| disabled | `boolean` | 否   | `false`  | 是否禁用 | -    |
| badge    | `string`  | 否   | -      | 徽标内容 | -    |
| dot      | `boolean` | 否   | -      | 圆点徽标 | -    |
| extStyle      | `string` \| `Record<string, string>` | 否   | -      | 根节点样式 | -    |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --sidebar-text-color | `#757575` | 侧边栏每项文字颜色 | - |
| --sidebar-line-height | `38px` | 侧边栏每项文字行高 | - |
| --sidebar-font-size | `26px` | 侧边栏每项文字字号 | - |
| --sidebar-active-bg-color | `#fff` | 侧边栏激活项背景颜色 | - |
| --sidebar-active-text-color | `#fa2c19` | 侧边栏激活项文字颜色，默认跟随主题色 |  |
| --sidebar-disabled-text-color | `#c4c4c4` | 侧边栏禁用项文字颜色 | - |
| --sidebar-padding | `34px 20px 34px 28px` | 侧边栏内边距 | - |