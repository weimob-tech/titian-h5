---
title: 搜索
sidebar_custom_props:
  suffix: Search
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/search"
---

# 搜索 _Search_
**适用于搜索场景**
## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-search": "@titian-design/weapp/search/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-search": "platform://titian-weapp/ti-search"
  }
}
```

## 用法示例
#### 基础用法
```html showLineNumbers
<ti-search value="{{value}}" bind:search="onSearch" />
```
#### 居中模式
```html showLineNumbers
<ti-search center />
```
#### 搜索按钮状态
:::info 属性含义：
1. `animation` 设置关闭搜索按钮动画。
2. `always-show-search` 设置一直显示搜索按钮。
3. `use-search-button` 设置不使用组件自带的搜索按钮。
:::
```html showLineNumbers
<ti-search animation={false} />
<ti-search always-show-search />
<ti-search use-search-button={false} />
```
#### 使用插槽
**包括4个插槽，整体组件前后位置插槽，以及输入框左右插槽**
```html showLineNumbers
<ti-search>
  <div slot="prefix">
    <span>请选择</span>
    <TiIcon name="arrow-down" size="{{32}}" />
  </div>
  <TiIcon slot="right-icon" name="scan" size="{{32}}" />
<ti-search />
<ti-search>
  <div slot="prefix">
    <TiIcon name="category" size="{{42}}" />
  </div>
  <div slot="suffix">
    <TiIcon name="arrange" size="{{42}}" />
  </div>
<ti-search />
```
#### 键盘确认按钮文字
```html showLineNumbers
<ti-search confirm-type="done" value="完成" />
<ti-search confirm-type="send" value="发送" />
<ti-search confirm-type="search" value="搜索" />
<ti-search confirm-type="next" value="下一项" />
<ti-search confirm-type="go" value="前往" />
```

## ti-search API
### 属性 **Properties**
| 名称             | 类型      | 必填 | 默认值   | 说明                                             | 备注 |
| ---------------- | --------- | ---- | -------- | ------------------------------------------------ | ---- |
| value            | `string`  | 否   | -        | 当前输入的值                                     | -    |
| center           | `boolean` | 否   | `false`    | 输入框内容对齐方式，采用居中模式                 | -    |
| placeholder      | `string`  | 否   | -        | 输入框为空时占位符                               | -    |
| focus            | `boolean` | 否   | `false`    | 获取焦点                                         | -    |
| disabled         | `boolean` | 否   | `false`    | 输入框禁用                                       | -    |
| read-only         | `boolean` | 否   | `false`    | 输入框只读                                       | -    |
| confirm-type      | `string`  | 否   | `search` | 设置键盘右下角按钮的文字，仅在`type='text'`时生效 | -    |
| clearable        | `boolean` | 否   | `true`     | 是否启用清除控件                                 | -    |
| left-icon         | `string`  | 否   | `search` | 左侧搜索图标，不启用传`none`                     | -    |
| ext-style         | `string` \| `Record<string, string>`  | 否   | -        | 根节点样式                                       | -    |
| animation        | `boolean` | 否   | `true`    | 是否启用搜索按钮动画                             | -    |
| always-show-search | `boolean` | 否   | `false`    | 是否常显搜索按钮，默认在聚焦状态下隐藏                               | -    |
| always-show-prefix | `boolean` | 否   | `false`    | 是否常显前置插槽，默认在聚焦状态下隐藏                                  | -    |
| always-show-suffix | `boolean` | 否   | `false`    | 是否常显后置插槽，默认在聚焦状态下隐藏                                  | -    |
| always-show-right-icon | `boolean` | 否   | `false`    | 是否常显右侧图标插槽，默认在聚焦状态下隐藏                | -    |
| use-search-button  | `boolean` | 否   | `true`     | 是否启用组件搜索按钮                             | -    |

### 事件 **Events**
| 名称     | 参数列表     | 描述             | 备注 |
| -------- | ------------ | ---------------- | ---- |
| bind:focus  | `(e: WechatMiniprogram.CustomEvent) => void`            | 输入框聚焦时触发 | -    |
| bind:blur   | `(e: WechatMiniprogram.CustomEvent) => void`            | 输入框失焦时触发 | -    |
| bind:search | `(e: WechatMiniprogram.CustomEvent<{value: string}>) => void`         | 确定搜索时触发   | -    |
| bind:change | `(e: WechatMiniprogram.CustomEvent<{value: string}>) => void`| 输入值变化时触发 | -    |
| bind:clear  | `(e: WechatMiniprogram.CustomEvent) => void`            | 清除时触发       | -    |
| bind:click-input  | `(e: WechatMiniprogram.CustomEvent) => void`       | 点击输入框是触发 | -    |

### 插槽 **Slots**
| 名称      | 说明               | 备注 |
| --------- | ------------------ | ---- |
| prefix    | 输入框外部左侧插槽 | -    |
| left-icon  | 输入框内部左侧插槽 | -    |
| right-icon | 输入框内部右侧插槽 | -    |
| suffix    | 输入框外部右侧插槽 | -    |

### 外部样式类 **External Classes**
| 名称              | 说明           | 备注                                             |
| ----------------- | -------------- | ------------------------------------------------ |
| ext-class          | 根节点样式类   | -                                                |
| search-button-class | 搜索按钮样式类 | 如果不需要按钮动画，可使用 transition: none;覆盖 |
| search-inner-class | 搜索框容器样式类 | |
| input-class        | input 样式类   | -                                                |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --search-font-size | `28rpx` | 搜索文字字号 | - |
| --search-out-height | `108rpx` | 搜索框整体高度 | - |
| --search-out-background | `108rpx` | 搜索框整体背景色 | - |
| --search-out-padding-v | `0rpx` | 搜索框整体垂直方向内边距 | - |
| --search-out-padding-h | `28rpx` | 搜索框整体水平方向内边距 | - |
| --search-inner-height | `72rpx` | 搜索框内部输入区域高度 | - |
| --search-inner-background | `#f5f5f5` | 搜索框内部输入区域背景色 | - |
| --search-inner-padding-v | `0rpx` | 搜索框内部输入区域垂直方向内边距 | - |
| --search-inner-padding-h | `28rpx` | 搜索框内部输入区域水平方向内边距 | - |
| --search-radius | `calc(var(--capsule-radius-size, 0rpx) + 12rpx)` | 搜索框容器圆角 | - |
| --capsule-radius-size | `0rpx` | 全局圆角增量，控制图标风格。在项目根节点统一设置 | - |
| --search-icon-color | `#212121` | 搜索图标颜色 | - |