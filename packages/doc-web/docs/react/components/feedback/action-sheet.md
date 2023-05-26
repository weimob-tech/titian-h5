---
title: 动作面板
sidebar_custom_props:
  suffix: ActionSheet
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/action-sheet"
---

# 动作面板 _ActionSheet_
**从底部弹出的动作菜单面板**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiactionsheet-api" />

## 安装使用
```typescript showLineNumbers
import { TiActionSheet } from '{{packageWeappReact}}'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const actions = [
    { name: '选项1', description: '描述1' },
    { name: '选项1', description: '描述1', icon: 'home' },
    { name: '选项1', description: '描述1', disabled: true }
  ]
  return (
    <>
      <TiActionSheet title="标题" actions={actions} onSelect={onSelect} onCancel={onCancel} />
    </>
  )
}
```
## TiActionSheet API
### 属性 **Properties**

| 名称       | 类型                     | 必填 | 默认值   | 说明                                                                                                       | 备注 |
| ---------- | ------------------------ | ---- | -------- | ---------------------------------------------------------------------------------------------------------- | ---- |
| visible    | `boolean`                | 否   | -        | 是否显示动作面板                                                                                           | -    |
| title      | `string`                 | 否   | -        | 标题                                                                                                       | -    |
| actions    | `Array<Option>`          | 是   | -        | 菜单选项，[Option类型](#option)                                                                            | -    |
| cancelText | `string`                 | 否   | -        | 按钮                                                                                                       | -    |
| hoverClass | `string`                 | 否   | 'active' | 指定按钮按下去的样式类                                                                                     | -    |
| alias      | `Record<string, string>` | 否   | -        | 数据项默认字段名`name` `description` `icon` `loading` `disabled`的别名，用于自定义数据，可替代`tabKey`属性 | -    |
| teleport        | `Element` | 否   | document.body     | DOM 挂载节点                                            | -    |


### Option

API 中的 actions 为一个对象数组，数组中的每一个对象有以下 key：

| 名称        | 类型      | 必填 | 默认值 | 说明           | 备注 |
| ----------- | --------- | ---- | ------ | -------------- | ---- |
| name        | `string`  | 否   | -      | 标题           | -    |
| description | `string`  | 否   | -      | 描述文字       | -    |
| icon        | `string`  | 否   | -      | 标题左侧图标   | -    |
| loading     | `string`  | 否   | -      | 是否为加载状态 | -    |
| disabled    | `boolean` | 否   | -      | 是否为禁用状态 | -    |

### 事件 **Events**

| 名称     | 参数列表                           | 描述                                                            | 备注 |
| -------- | ---------------------------------- | --------------------------------------------------------------- | ---- |
| onSelect | `(e: CustomEvent<Option>) => void` | 选中选项时触发，禁用或加载状态下不会触发，[Option类型](#option) | -    |
| onCancel | `(e: CustomEvent) => void`         | 取消按钮点击时触发                                              | -    |
| onClose  | `(e: CustomEvent) => void`         | 点击遮罩时触发                                                  | -    |

### CSS 变量 **CSS Variable**
| 变量                                   | 默认值            | 说明                         | 备注 |
| -------------------------------------- | ----------------- | ---------------------------- | ---- |
| --action-sheet-bg-color                | `#f5f5f5`         | 整体弹层，底部内容区域背景色 | -    |
| --action-sheet-line-height             | `36px`            | 菜单项文字行高               | -    |
| --action-sheet-title-color             | `#9e9e9e`         | 标题文字颜色                 | -    |
| --action-sheet-title-font-size         | `30px`            | 标题文字字号                 | -    |
| --action-sheet-description-color       | `#9e9e9e`         | 描述文字颜色                 | -    |
| --action-sheet-description-font-size   | `24px`            | 描述文字字号                 | -    |
| --action-sheet-description-line-height | `28px`            | 描述文字行高                 | -    |
| --action-sheet-description-margin-top  | `12px`            | 描述文字上方间距             | -    |
| --action-sheet-padding-v               | `36px`            | 菜单项垂直方向内边距         | -    |
| --action-sheet-padding-h               | `0px`             | 菜单项水平方向内边距         | -    |
| --action-sheet-button-bg-color         | `#fff`            | 菜单项背景色                 | -    |
| --action-sheet-button-color            | `#212121`         | 菜单项文字颜色               | -    |
| --action-sheet-button-font-size        | `28px`            | 菜单项文字字号               | -    |
| --action-sheet-button-active-color     | `rgba(0,0,0,0.1)` | active状态下菜单项背景色     | -    |
| --action-sheet-button-disabled-color   | `#e0e0e0`         | 禁用状态下侧单项文字颜色     | -    |
| --action-sheet-icon-margin-right       | `8px`             | 菜单项内部图标右边距         | -    |
| --action-sheet-cancel-btn-gap          | `20px`            | 取消按钮上方间距             | -    |
