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

<TabsLink id="ti-textarea-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-textarea": "titian-mp/textarea/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-textarea": "platform://titian-mp/ti-textarea"
  }
}
```
## 用法示例

#### 基本用法
```html showLineNumbers
<ti-textarea placeholder="请输入评论文字，限200字以内…" />
```
#### 高度自适应
```html showLineNumbers
<ti-textarea auto-height />
```
#### 字数统计
```html showLineNumbers
<ti-textarea show-count />
```
#### 键盘确认按钮文字
```html showLineNumbers
<ti-textarea confirm-type="done" placeholder="完成" />
<ti-textarea confirm-type="send" placeholder="发送" />
<ti-textarea confirm-type="search" placeholder="搜索" />
<ti-textarea confirm-type="next" placeholder="下一项" />
<ti-textarea confirm-type="go" placeholder="前往" />
```
## ti-textarea API
### 属性 **Properties**

| 名称             | 类型                                 | 必填 | 默认值 | 说明                                                   | 备注   |
| ---------------- | ------------------------------------ | ---- | ------ | ------------------------------------------------------ | ------ |
| value            | `string`                             | 否   | -      | 当前输入的值                                           | -      |
| placeholder      | `string`                             | 否   | -      | 输入框为空时占位符                                     | -      |
| placeholder-style | `string`                             | 否   | -      | 指定 placeholder 的样式                                | -      |
| disabled         | `boolean`                            | 否   | -      | 是否禁用                                               | false  |
| show-count        | `boolean`                            | 否   | -      | 是否显示统计字数                                       | false  |
| maxlength        | `number`                             | 否   | -      | 最大输入长度，设置为 -1 的时候不限制最大长度           | 140    |
| auto-focus        | `boolean`                            | 否   | -      | 自动聚焦，拉起键盘                                     | false  |
| focus            | `boolean`                            | 否   | -      | 获取焦点                                               | false  |
| auto-height       | `boolean`                            | 否   | -      | 是否自动增高，设置 auto-height 时，style.height 不生效 | false  |
| confirm-type      | `string`                             | 否   | -      | 设置键盘右下角按钮的文字，仅在 type='text'时生效       | `done` |
| ext-style         | `string` \| `Record<string, string>` | 否   | -      | 根节点样式                                             | -      |
| fixed | `boolean` | 否 | `false` | 如果 textarea 是在一个 position:fixed 的区域，需要显示指定属性 fixed 为 true | - |
| cursor-spacing | `number` | 否 | `0` | 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 | - |
| cursor | `number` | 否 | `-1` | 指定 focus 时的光标位置 | - |
| show-confirm-bar | `boolean` | 否 | `true` | 是否显示键盘上方带有”完成“按钮那一栏 | - |
| selection-start | `number` | 否 | `-1` | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用 | - |
| selection-end | `number` | 否 | `-1` | 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用 | - |
| adjust-position | `boolean` | 否 | `true` | 键盘弹起时，是否自动上推页面 | - |
| hold-keyboard | `boolean` | 否 | `false` | focus 时，点击页面的时候不收起键盘 | - |
| disable-default-padding	 | `boolean` | 否 | `false` | 是否去掉 iOS 下的默认内边距 | - |
| confirm-type	 | `string` | 否 | `done` | 设置键盘右下角按钮的文字，仅在 type='text'时生效,同微信原生组件 textarea 的 confirm-type,可选值为 send search next go done return | - |
| confirm-hold	 | `boolean` | 否 | `false` | 点击键盘右下角按钮时是否保持键盘不收起 | - |
### 事件 **Events**

| 名称      | 参数列表                                    | 描述                 | 备注 |
| --------- | ------------------------------------------- | -------------------- | ---- |
| bind:input   | `(e: WechatMiniprogram.CustomEvent<{value: string}>) => void` | 键盘输入时触发，     | -    |
| bind:focus   | `(e: WechatMiniprogram.CustomEvent) => void`                  | 输入框聚焦时触发，   | -    |
| bind:blur    | `(e: WechatMiniprogram.CustomEvent<{value: string}>) => void` | 输入框失去焦点时触发 | -    |
| bind:confirm | `(e: WechatMiniprogram.CustomEvent<{value: string}>) => void` | 点击完成按钮时触发   | -    |

### 外部样式类 **External Classes**

| 名称          | 说明            | 备注 |
| ------------- | --------------- | ---- |
| ext-class      | 根节点样式类    | -    |
| textarea-class | textarea 样式类 | -    |

### CSS 变量 **CSS Variable**

| 变量                   | 默认值  | 说明                           | 备注 |
| ---------------------- | ------- | ------------------------------ | ---- |
| --textarea-height      | `220rpx` | 文本域高度                     | -    |
| --textarea-padding-v   | `24rpx`  | 文本域垂直方向内边距           | -    |
| --textarea-padding-h   | `28rpx`  | 文本域水平方向内边距           | -    |
| --textarea-min-height  | `172rpx` | 文本域最新高度，自增模式下有效 | -    |
| --textarea-font-size   | `28rpx`  | 文本域字号                     | -    |
| --textarea-line-height | `42rpx`  | 文本域行高                     | -    |