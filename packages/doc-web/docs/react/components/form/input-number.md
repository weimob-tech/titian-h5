---
title: 步进器
sidebar_custom_props:
  suffix: InputNumber
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/input-number"
---

# 步进器 _InputNumber_
**步进器由增加按钮、减少按钮和输入框组成，用于输入范围内的数值**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiinputnumber-api" />

## 安装使用
```typescript showLineNumbers
import { TiInputNumber } from '@titian-design/mobile-react'
```
## 用法示例

#### 基本用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber value={value} onChange={onChange} />
    </>
  )
}
```
#### 步进器尺寸
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber size="medium" />
      <TiInputNumber size="big" />
    </>
  )
}
```
#### 步进器风格
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber variant="pure" />
      <TiInputNumber variant="block" />
      <TiInputNumber variant="bright" />
    </>
  )
}
```
#### 自适应宽度
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber autoWidth />
    </>
  )
}
```
#### 步进器步长
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber step={5} />
    </>
  )
}
```

#### 步进器禁用和只读
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber disabled />
      <TiInputNumber disabledInput />
      <TiInputNumber readOnly />
      <TiInputNumber readOnlyInput />
    </>
  )
}
```
#### 边框
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber variant="pure" border />
      <TiInputNumber variant="block" border />
    </>
  )
}
```
#### 收起状态
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiInputNumber thumbnail />
    </>
  )
}
```
## TiInputNumber API
### 属性 **Properties**
| 名称          | 类型          | 必填 | 默认值                    | 说明                                               | 备注                             |
| ------------- | ------------- | ---- | ------------------------- | -------------------------------------------------- | -------------------------------- |
| size          | `string`      | 否   | `medium`                  | 数字输入框的尺寸，可选值为 `medium` `big`          | -                                |
| border        | `boolean`     | 否   | `false`                   | 是否添加外边框                                     | `variant:bright`模式下border无效 |
| variant       | `string`      | 否   | `pure`                    | 数字输入框的风格，可选值为 `pure` `block` `bright` | -                                |
| round         | `boolean`     | 否   | `false`                   | 按钮为圆形                                         | -                                |
| inputWidth    | `number`      | 否   | -                         | 输入框宽度，默认单位为 px                          | -                                |
| autoWidth     | `boolean`     | 否   | `false`                   | 宽度自适应                                         | -                                |
| value         | `number` \| `string` | 否   | -                         | 输入值                                             | -                                |
| step          | `number`      | 否   | `1`                       | 步长                                               | -                                |
| min           | `number`      | 否   | `Number.MIN_SAFE_INTEGER` | 最小值                                             | -                                |
| max           | `number`      | 否   | `Number.MAX_SAFE_INTEGER` | 最大值                                             | -                                |
| disabledInput | `boolean`     | 否   | `false`                   | 是否禁用输入，只能通过按钮操作                     | -                                |
| asyncChange   | `boolean`     | 否   | `false`                   | 是否开启异步变更，开启后需要手动控制输入值         | -                                |
| thumbnail     | `boolean`     | 否   | `false`                   | 是否收起输入框                                     | -                                |
| disabled      | `boolean`     | 否   | `false`                   | 是否禁用，全部禁用，包括按钮                       | -                                |
| readOnly      | `boolean`     | 否   | `false`                   | 是否只读，全部只读，包括按钮                       | -                                |
| readOnlyInput | `boolean`     | 否   | `false`                   | 是否只读，只输入框只读，按钮仍然可以操作           | -                                |
| integer       | `boolean`     | 否   | `false`                   | 限制输入整数                                       | -                                |
| initOnlyPlus  | `boolean`     | 否   | `false`                   | 如果设置 true，value 值为 0，初始状态仅显示加号                                 | 仅在`variant:bright`模式下有效   |
| extStyle      | `string` \| `Record<string, string>`      | 否   | -                         | 根节点样式                                         | -                                |

### 事件 **Events**
| 名称        | 参数列表                                                      | 描述                     | 备注 |
| ----------- | ------------------------------------------------------------- | ------------------------ | ---- |
| onChange    | `(e: CustomEvent<number>) => void`                               | 当绑定值变化时触发的事件 | -    |
| onPlus      | `(e: CustomEvent<number>) => void`                               | 点击增加按钮时触发时触发 | -    |
| onMinus     | `(e: CustomEvent<number>) => void`                               | 点击减少按钮时触发时触发 | -    |
| onFocus     | `(e: CustomEvent<{value: number}>) => void`                               | 输入框聚焦时触发         | -    |
| onBlur      | `(e: CustomEvent<{value: number}>) => void`                               | 输入框失焦时触发         | -    |
| onOverlimit | <code>(e: CustomEvent<{type: 'plus' \| 'minus'}>) => void</code> | 超出最大值时点击触发     | -    |
| onClickInput  | `(e: CustomEvent) => void`                                          | 点击输入框时触发         | -    |

### 外部样式类 **External Classes**
| 名称          | 说明           | 备注 |
| ------------- | -------------- | ---- |
| extClass      | 根节点样式类   | -    |
| extMinusClass | 减号按钮样式类 | -    |
| extInputClass | 输入框样式类   | -    |
| extPlusClass  | 加号按钮样式类 | -    |
### CSS 变量 **CSS Variable**
| 变量                        | 默认值                                        | 说明                                             | 备注 |
| --------------------------- | --------------------------------------------- | ------------------------------------------------ | ---- |
| --input-number-size         | `48px`                                        | 按钮的宽高，默认相等                             | -    |
| --input-number-border-color | `#c4c4c4`                                     | 边框模式下，边框的颜色                           | -    |
| --input-number-radius       | `calc(var(--capsule-radius-size, 0px) + 8px)` | 按钮圆角                           | -    |
| --capsule-radius-size       | `0px`                                         | 全局圆角增量，控制图标风格。在项目根节点统一设置 | -    |