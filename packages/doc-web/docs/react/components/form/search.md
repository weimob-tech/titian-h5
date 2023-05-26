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

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tisearch-api" />

## 安装使用
```typescript showLineNumbers
import { TiSearch } from '{{packageWeappReact}}'
```

## 用法示例
#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSearch value={ value } onSearch={onSearch} />
    </>
  )
}
```

#### 居中模式
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSearch center />
    </>
  )
}
```

#### 搜索按钮状态
:::info 属性含义：
1. `animation` 设置关闭搜索按钮动画。
2. `alwaysShowSearch` 设置一直显示搜索按钮。
3. `useSearchButton` 设置不使用组件自带的搜索按钮。
:::
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSearch animation={false} />
      <TiSearch alwaysShowSearch />
      <TiSearch useSearchButton={false} />
    </>
  )
}
```
#### 使用插槽
**包括4个插槽，整体组件前后位置插槽，以及输入框左右插槽**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSearch>
        <div slot="prefix">
          <span>请选择</span>
          <TiIcon name="arrow-down" size="32" />
        </div>
        <TiIcon slot="right-icon" name="scan" size="32" />
      <TiSearch />
      <TiSearch>
        <div slot="prefix">
          <TiIcon name="category" size="42" />
        </div>
        <div slot="suffix">
          <TiIcon name="arrange" size="42" />
        </div>
      <TiSearch />
    </>
  )
}
```
#### 键盘确认按钮文字
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiSearch confirmType="done" value="完成" />
      <TiSearch confirmType="send" value="发送" />
      <TiSearch confirmType="search" value="搜索" />
      <TiSearch confirmType="next" value="下一项" />
      <TiSearch confirmType="go" value="前往" />
    </>
  )
}
```

## TiSearch API
### 属性 **Properties**
| 名称                | 类型                                 | 必填 | 默认值   | 说明                                              | 备注 |
| ------------------- | ------------------------------------ | ---- | -------- | ------------------------------------------------- | ---- |
| value               | `string`                             | 否   | -        | 当前输入的值                                      | -    |
| center              | `boolean`                            | 否   | `false`  | 输入框内容对齐方式，采用居中模式                  | -    |
| placeholder         | `string`                             | 否   | -        | 输入框为空时占位符                                | -    |
| autofocus           | `boolean`                            | 否   | `false`  | 获取焦点                                          | -    |
| disabled            | `boolean`                            | 否   | `false`  | 输入框禁用                                        | -    |
| readOnly            | `boolean`                            | 否   | `false`  | 输入框只读                                        | -    |
| confirmType         | `string`                             | 否   | `search` | 设置键盘右下角按钮的文字，仅在`type='text'`时生效 | -    |
| clearable           | `boolean`                            | 否   | `true`   | 是否启用清除控件                                  | -    |
| leftIcon            | `string`                             | 否   | `search` | 左侧搜索图标，不启用传`none`                      | -    |
| extStyle            | `string` \| `Record<string, string>` | 否   | -        | 根节点样式                                        | -    |
| animation           | `boolean`                            | 否   | `true`   | 是否启用搜索按钮动画                              | -    |
| alwaysShowSearch    | `boolean`                            | 否   | `false`  | 是否常显搜索按钮，默认在聚焦状态下隐藏            | -    |
| alwaysShowPrefix    | `boolean`                            | 否   | `false`  | 是否常显前置插槽，默认在聚焦状态下隐藏            | -    |
| alwaysShowSuffix    | `boolean`                            | 否   | `false`  | 是否常显后置插槽，默认在聚焦状态下隐藏            | -    |
| alwaysShowRightIcon | `boolean`                            | 否   | `false`  | 是否常显右侧图标插槽，默认在聚焦状态下隐藏        | -    |
| useSearchButton     | `boolean`                            | 否   | `true`   | 是否启用组件搜索按钮                              | -    |

### 事件 **Events**
| 名称         | 参数列表                                    | 描述             | 备注 |
| ------------ | ------------------------------------------- | ---------------- | ---- |
| onFocus      | `(e: CustomEvent) => void`                  | 输入框聚焦时触发 | -    |
| onBlur       | `(e: CustomEvent) => void`                  | 输入框失焦时触发 | -    |
| onSearch     | `(e: CustomEvent<{value: string}>) => void` | 确定搜索时触发   | -    |
| onChange     | `(e: CustomEvent<{value: string}>) => void` | 输入值变化时触发 | -    |
| onClear      | `(e: CustomEvent) => void`                  | 清除时触发       | -    |
| onClickInput | `(e: CustomEvent) => void`                  | 点击输入框是触发 | -    |

### 插槽 **Slots**
| 名称      | 说明               | 备注 |
| --------- | ------------------ | ---- |
| prefix    | 输入框外部左侧插槽 | -    |
| leftIcon  | 输入框内部左侧插槽 | -    |
| rightIcon | 输入框内部右侧插槽 | -    |
| suffix    | 输入框外部右侧插槽 | -    |

### 外部样式类 **External Classes**
| 名称              | 说明             | 备注                                             |
| ----------------- | ---------------- | ------------------------------------------------ |
| extClass          | 根节点样式类     | -                                                |
| searchButtonClass | 搜索按钮样式类   | 如果不需要按钮动画，可使用 transition: none;覆盖 |
| searchInnerClass  | 搜索框容器样式类 |                                                  |
| inputClass        | input 样式类     | -                                                |

### CSS 变量 **CSS Variable**
| 变量                      | 默认值                                         | 说明                                             | 备注 |
| ------------------------- | ---------------------------------------------- | ------------------------------------------------ | ---- |
| --search-font-size        | `28px`                                         | 搜索文字字号                                     | -    |
| --search-out-height       | `108px`                                        | 搜索框整体高度                                   | -    |
| --search-out-background   | `#fff`                                        | 搜索框整体背景色                                 | -    |
| --search-out-padding-v    | `0px`                                          | 搜索框整体垂直方向内边距                         | -    |
| --search-out-padding-h    | `28px`                                         | 搜索框整体水平方向内边距                         | -    |
| --search-inner-height     | `72px`                                         | 搜索框内部输入区域高度                           | -    |
| --search-inner-background | `#f5f5f5`                                      | 搜索框内部输入区域背景色                         | -    |
| --search-inner-padding-v  | `0px`                                          | 搜索框内部输入区域垂直方向内边距                 | -    |
| --search-inner-padding-h  | `28px`                                         | 搜索框内部输入区域水平方向内边距                 | -    |
| --search-radius           | `calc(var(--capsule-radius-size, 0px) + 12px)` | 搜索框容器圆角                                   | -    |
| --capsule-radius-size     | `0px`                                          | 全局圆角增量，控制图标风格。在项目根节点统一设置 | -    |
| --search-icon-color       | `#212121`                                      | 搜索图标颜色                                     | -    |