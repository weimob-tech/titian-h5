---
title: 输入框
sidebar_custom_props:
  suffix: Input
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/input"
---

# 输入框 _Input_
**输入框用于通过键盘输入内容，适用于单行文本**
## 安装使用

```typescript showLineNumbers
import { TiInput } from 'titian-h5-vue'
```
## 用法示例

#### 基本用法
```html showLineNumbers
<template>
  <TiInput label="左侧标题" placeholder="用户输入中文案" />
  <TiInput disabled label="禁用" />
  <TiInput readOnly label="只读" />
  <TiInput :maxlength="20" label="最大输入长度20" />
  <TiInput :divider="false" label="不显示底部分割线" />
  <TiInput required label="必填" />
  <TiInput :clearable="false" label="不显示清除按钮" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```

#### 输入类型
```html showLineNumbers
<template>
  <TiInput type="text" label="文本" />
  <TiInput type="number" label="数字" />
  <TiInput type="safe-password" label="密码安全输入键盘" />
  <TiInput type="digit" label="带小数点的数字键盘" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```
#### 键盘类型
**当只需要弹起特定类型键盘，无需对输入内容格式化的情况推荐使用。[详情见input原生inputmode](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/inputmode)**
```html showLineNumbers
<template>
  <TiInput inputmode="decimal" label="文本" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```
#### 输入对齐方式
```html showLineNumbers
<template>
  <TiInput text-align="left" label="标题" />
  <TiInput text-align="right" label="标题" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```

#### 左侧label文字缺省的行数
```html showLineNumbers
<template>
  <TiInput :ellipsis-line="0" label="左侧标题超过一行换行" />
  <TiInput :ellipsis-line="1" label="左侧标题超过一行显示..." />
  <TiInput :ellipsis-line="2" label="左侧标题超过两行显示..." />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```
#### label左侧搭配图标
```html showLineNumbers
<template>
  <TiInput prefix-icon="home" label="标题" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```

#### 输入框左右使用插槽
```html showLineNumbers
<template>
  <TiInput label="手机号">
    <div slot="prefix">+ 86</div>
  </TiInput>
  <TiInput label="验证码">
    <div slot="suffix">发验证码</div>
  </TiInput>
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```
#### 错误提示
```html showLineNumbers
<template>
  <TiInput error value="输错了" label="标题" />
  <TiInput error-message="手机号格式错误" value="123213" label="手机号" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```
#### 键盘确认按钮文字
```html showLineNumbers
<template>
  <TiInput confirm-type="done" label="完成" />
  <TiInput confirm-type="send" label="发送" />
  <TiInput confirm-type="search" label="搜索" />
  <TiInput confirm-type="next" label="下一项" />
  <TiInput confirm-type="go" label="前往" />
</template>

<script lang="ts" setup>
import { TiInput } from 'titian-h5-vue';
</script>
```
## TiInput API
### 属性 **Properties**

| 名称         | 类型      | 必填 | 默认值  | 说明                                                                                                                                                                 | 备注    |
| ------------ | --------- | ---- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| type         | `string`  | 否   | `text`  | input 的类型,可选值为 `text` `number` `digit` `safe-password` , 以及[iniput 原生 type](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/Input#input_types]) | -       |
| inputmode    | `string`  | 否   | `text`  | 键盘类型，[更多取值见input原生inputmode](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Global_attributes/inputmode)                                                  |
| value        | `string`  | 否   | -       | 当前输入的值                                                                                                                                                         | -       |
| password     | `boolean` | 否   | `false` | 是否是密码类型                                                                                                                                                       | -       |
| placeholder  | `string`  | 否   | -       | 输入框为空时占位符                                                                                                                                                   | -       |
| disabled     | `boolean` | 否   | `false` | 是否禁用                                                                                                                                                             | -       |
| maxlength    | `number`  | 否   | `140`   | 最大输入长度，设置为 `-1` 的时候不限制最大长度                                                                                                                       | -       |
| prefix-icon   | `string`  | 否   | -       | 左侧图标名称                                                                                                                                                         | -       |
| label        | `string`  | 否   | -       | 输入框左侧文本                                                                                                                                                       | -       |
| divider      | `boolean` | 否   | `true`  | 是否显示底部分割线                                                                                                                                                   | -       |
| required     | `boolean` | 否   | `false` | 是否显示必填星号                                                                                                                                                     | -       |
| clearable    | `boolean` | 否   | `true`  | 是否启用清除控件                                                                                                                                                     | -       |
| read-only     | `boolean` | 否   | `false` | 是否只读                                                                                                                                                             | -       |
| text-align    | `string`  | 否   | `left`  | 输入框内容对齐方式，可选值为 `left` `right`                                                                                                                          | -       |
| error        | `boolean` | 否   | `false` | 是否将输入内容标红                                                                                                                                                   | -       |
| error-message | `string`  | 否   | -       | 底部错误提示文案，为空时不展示                                                                                                                                       | -       |
| focus        | `boolean` | 否   | `false` | 获取焦点                                                                                                                                                             | -       |
| confirm-type  | `string`  | 否   | `done`  | 设置键盘右下角按钮的文字，仅在 type='text'时生效                                                                                                                     | -       |
| ext-style     | `string` \| `Record<string, string>`  | 否   | -       | 根节点样式                                                                                                                                                           | -       |
| ellipsis-line | `number`  | 否   | `0`     | 左侧文字缺省的行数                                                                                                                                                   | - |

### 事件 **Events**

| 名称      | 参数列表                                                                       | 描述                 | 备注 |
| --------- | ------------------------------------------------------------------------------ | -------------------- | ---- |
| input   | <code>(e: CustomEvent<{value: number \| string, keyCode: string}>) => void</code> | 键盘输入时触发       | -    |
| focus   | <code>(e: CustomEvent<{value: number \| string}>) => void</code>                  | 输入框聚焦时触发     | -    |
| blur    | <code>(e: CustomEvent<{value: number \| string}>) => void</code>                | 输入框失去焦点时触发 | -    |
| confirm | <code>(e: CustomEvent<{value: number \| string}>) => void</code>                  | 点击完成按钮时触发   | -    |
| clear   | `(e: CustomEvent) => void`                                                                              | 点击清除图标是触发   | -    |
| change  | <code>(e: CustomEvent<{value: number \| string}>) => void</code>                | 输入值改变时触发     | -    |

### 插槽 **Slots**

| 名称       | 说明             | 备注 |
| ---------- | ---------------- | ---- |
| prefix-icon | label 左侧图标   | -    |
| prefix     | 输入框左侧侧插槽 | -    |
| suffix     | 输入框右侧插槽   | -    |

### 外部样式类 **External Classes**

| 名称       | 说明                 | 备注 |
| ---------- | -------------------- | ---- |
| ext-class   | 根节点样式类         | -    |
| label-class | 输入框左侧文本样式类 | -    |
| input-class | input 样式类         | -    |

### CSS 变量 **CSS Variable**

| 变量                            | 默认值    | 说明                                     | 备注 |
| ------------------------------- | --------- | ---------------------------------------- | ---- |
| --input-line-height             | `42px`    | 文字行高                                 | -    |
| --input-padding-v               | `32px`    | 垂直方向内边距                           | -    |
| --input-padding-h               | `28px`    | 水平方向内边距                           | -    |
| --input-font-size               | `28px`    | 字体大小                                 | -    |
| --input-label-width             | `168px`   | 左侧 label，包括间隙。输入框距最左侧宽度 | -    |
| --input-title-max-width         | `140px`   | 左侧文字局域最大宽度                     | -    |
| --input-placeholder-color       | `#9e9e9e` | placeholder 颜色                         | -    |
| -input-font-color               | `#212121` | 输入文字颜色                             | -    |
| --input-placeholder-error-color | `#ff2e2e` | 错误提示下 placeholder 颜色              | -    |
