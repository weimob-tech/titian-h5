---
title: 多行文本
sidebar_custom_props:
  suffix: Textarea
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "/#/textarea"
---

# 多行文本 _Textarea_
**输入框用于通过键盘输入内容，适用于多行文本**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titextarea-api" />

## 安装使用

```typescript showLineNumbers
import { TiTextarea } from '@titian-design/mobile-react'
```
## 用法示例

#### 基本用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiTextarea placeholder="请输入评论文字，限200字以内…" />
    </>
  )
}
```
#### 高度自适应
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiTextarea autoHeight />
    </>
  )
}
```
#### 字数统计
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiTextarea showCount />
    </>
  )
}
```
#### 键盘确认按钮文字
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiTextarea confirmType="done" placeholder="完成" />
      <TiTextarea confirmType="send" placeholder="发送" />
      <TiTextarea confirmType="search" placeholder="搜索" />
      <TiTextarea confirmType="next" placeholder="下一项" />
      <TiTextarea confirmType="go" placeholder="前往" />
    </>
  )
}
```
## TiTextarea API
### 属性 **Properties**

| 名称             | 类型      | 必填 | 默认值 | 说明                                                   | 备注   |
| ---------------- | --------- | ---- | ------ | ------------------------------------------------------ | ------ |
| value            | `string`  | 否   | -      | 当前输入的值                                           | -      |
| placeholder      | `string`  | 否   | -      | 输入框为空时占位符                                     | -      |
| placeholderStyle | `string`  | 否   | -      | 指定 placeholder 的样式                                | -      |
| disabled         | `boolean` | 否   | -      | 是否禁用                                               | false  |
| showCount        | `boolean` | 否   | -      | 是否显示统计字数                                       | false  |
| maxlength        | `number`  | 否   | -      | 最大输入长度，设置为 -1 的时候不限制最大长度           | 140    |
| autoFocus        | `boolean` | 否   | -      | 自动聚焦，拉起键盘                                     | false  |
| focus            | `boolean` | 否   | -      | 获取焦点                                               | false  |
| autoHeight       | `boolean` | 否   | -      | 是否自动增高，设置 auto-height 时，style.height 不生效 | false  |
| confirmType      | `string`  | 否   | -      | 设置键盘右下角按钮的文字，仅在 type='text'时生效       | `done` |
| extStyle         | `string` \| `Record<string, string>`  | 否   | -      | 根节点样式                                             | -      |

### 事件 **Events**

| 名称      | 参数列表                                 | 描述                 | 备注 |
| --------- | ---------------------------------------- | -------------------- | ---- |
| onInput   | `(e: CustomEvent<{value: string}>) => void` | 键盘输入时触发，     | -    |
| onFocus   | `(e: CustomEvent) => void`                     | 输入框聚焦时触发，   | -    |
| onBlur    | `(e: CustomEvent<{value: string}>) => void` | 输入框失去焦点时触发 | -    |
| onConfirm | `(e: CustomEvent<{value: string}>) => void` | 点击完成按钮时触发   | -    |

### 外部样式类 **External Classes**

| 名称          | 说明            | 备注 |
| ------------- | --------------- | ---- |
| extClass      | 根节点样式类    | -    |
| textareaClass | textarea 样式类 | -    |

### CSS 变量 **CSS Variable**

| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --textarea-height | `220px` | 文本域高度 | - |
| --textarea-padding-v | `24px` | 文本域垂直方向内边距 | - |
| --textarea-padding-h | `28px` | 文本域水平方向内边距 | - |
| --textarea-min-height | `172px` | 文本域最新高度，自增模式下有效 | - |
| --textarea-font-size | `28px` | 文本域字号 | - |
| --textarea-line-height | `42px` | 文本域行高 | - |