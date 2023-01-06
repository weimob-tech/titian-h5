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
## 安装使用
```typescript showLineNumbers
import { TiInputNumber } from 'titian-h5-vue'
```
## 用法示例

#### 基本用法
```html showLineNumbers
<template>
  <TiInputNumber :value="value" @change="onChange" />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```
#### 步进器尺寸
```html showLineNumbers
<template>
  <TiInputNumber size="medium" />
  <TiInputNumber size="big" />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```
#### 步进器风格
```html showLineNumbers
<template>
  <TiInputNumber variant="pure" />
  <TiInputNumber variant="block" />
  <TiInputNumber variant="bright" />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```

#### 自适应宽度
```html showLineNumbers
<template>
  <TiInputNumber auto-width />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```
#### 步进器步长
```html showLineNumbers
<template>
  <TiInputNumber :step="5" />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```

#### 步进器禁用和只读
```html showLineNumbers
<template>
  <TiInputNumber disabled />
  <TiInputNumber disabled-input />
  <TiInputNumber read-only />
  <TiInputNumber read-only-input />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```
#### 边框
```html showLineNumbers
<template>
  <TiInputNumber variant="pure" border />
  <TiInputNumber variant="block" border />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```
#### 收起状态
```html showLineNumbers
<template>
  <TiInputNumber thumbnail />
</template>

<script lang="ts" setup>
import { TiInputNumber } from 'titian-h5-vue';
</script>
```
## TiInputNumber API
### 属性 **Properties**
| 名称          | 类型          | 必填 | 默认值                    | 说明                                               | 备注                             |
| ------------- | ------------- | ---- | ------------------------- | -------------------------------------------------- | -------------------------------- |
| size          | `string`      | 否   | `medium`                  | 数字输入框的尺寸，可选值为 `medium` `big`          | -                                |
| border        | `boolean`     | 否   | `false`                   | 是否添加外边框                                     | `variant:bright`模式下border无效 |
| variant       | `string`      | 否   | `pure`                    | 数字输入框的风格，可选值为 `pure` `block` `bright` | -                                |
| round         | `boolean`     | 否   | `false`                   | 按钮为圆形                                         | -                                |
| input-width    | `number`      | 否   | -                         | 输入框宽度，默认单位为 px                          | -                                |
| auto-width     | `boolean`     | 否   | `false`                   | 宽度自适应                                         | -                                |
| value         | `number` \| `string` | 否   | -                         | 输入值                                             | -                                |
| step          | `number`      | 否   | `1`                       | 步长                                               | -                                |
| min           | `number`      | 否   | `Number.MIN_SAFE_INTEGER` | 最小值                                             | -                                |
| max           | `number`      | 否   | `Number.MAX_SAFE_INTEGER` | 最大值                                             | -                                |
| disabled-input | `boolean`     | 否   | `false`                   | 是否禁用输入，只能通过按钮操作                     | -                                |
| async-change   | `boolean`     | 否   | `false`                   | 是否开启异步变更，开启后需要手动控制输入值         | -                                |
| thumbnail     | `boolean`     | 否   | `false`                   | 是否收起输入框                                     | -                                |
| disabled      | `boolean`     | 否   | `false`                   | 是否禁用，全部禁用，包括按钮                       | -                                |
| read-only      | `boolean`     | 否   | `false`                   | 是否只读，全部只读，包括按钮                       | -                                |
| read-only-input | `boolean`     | 否   | `false`                   | 是否只读，只输入框只读，按钮仍然可以操作           | -                                |
| integer       | `boolean`     | 否   | `false`                   | 限制输入整数                                       | -                                |
| init-only-plus  | `boolean`     | 否   | `false`                   | 如果设置 true，value 值为 0，初始状态仅显示加号                                 | 仅在`variant:bright`模式下有效   |
| ext-style      | `string` \| `Record<string, string>`      | 否   | -                         | 根节点样式                                         | -                                |

### 事件 **Events**
| 名称        | 参数列表                                                      | 描述                     | 备注 |
| ----------- | ------------------------------------------------------------- | ------------------------ | ---- |
| change    | `(e: CustomEvent<number>) => void`                               | 当绑定值变化时触发的事件 | -    |
| plus      | `(e: CustomEvent<number>) => void`                               | 点击增加按钮时触发时触发 | -    |
| minus     | `(e: CustomEvent<number>) => void`                               | 点击减少按钮时触发时触发 | -    |
| focus     | `(e: CustomEvent<{value: number}>) => void`                               | 输入框聚焦时触发         | -    |
| blur      | `(e: CustomEvent<{value: number}>) => void`                               | 输入框失焦时触发         | -    |
| overlimit | <code>(e: CustomEvent<{type: 'plus' \| 'minus'}>) => void</code> | 超出最大值时点击触发     | -    |
| click-input  | `(e: CustomEvent) => void`                                          | 点击输入框时触发         | -    |

### 外部样式类 **External Classes**
| 名称          | 说明           | 备注 |
| ------------- | -------------- | ---- |
| ext-class      | 根节点样式类   | -    |
| ext-minus-class | 减号按钮样式类 | -    |
| ext-input-class | 输入框样式类   | -    |
| ext-plus-class  | 加号按钮样式类 | -    |
### CSS 变量 **CSS Variable**
| 变量                        | 默认值                                        | 说明                                             | 备注 |
| --------------------------- | --------------------------------------------- | ------------------------------------------------ | ---- |
| --input-number-size         | `48px`                                        | 按钮的宽高，默认相等                             | -    |
| --input-number-border-color | `#c4c4c4`                                     | 边框模式下，边框的颜色                           | -    |
| --input-number-radius       | `calc(var(--capsule-radius-size, 0px) + 8px)` | 按钮圆角                           | -    |
| --capsule-radius-size       | `0px`                                         | 全局圆角增量，控制图标风格。在项目根节点统一设置 | -    |