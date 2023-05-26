---
title: 时间选择器
sidebar_custom_props:
  suffix: DateTimePicker
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/datetime-picker"
---

# 时间选择器 _DateTimePicker_
**用于选择时间，支持日期、时分等时间维度，通常与弹出层组件配合使用**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tidatetimepicker-api" />

## 安装使用
```typescript showLineNumbers
import { TiDatetimePicker } from '{{packageWeappVue}}'
```

## 用法示例

#### 基础用法
```html showLineNumbers
<template>
  <TiPopup :visible="visible" position="bottom">
    <TiDatetimePicker :value="value" :on-confirm="onConfirm" />
  </TiPopup>
</template>

<script lang="ts" setup>
import { TiDatetimePicker, TiPopup } from '{{packageWeappVue}}';
</script>
```

#### 不同时间类型
```html showLineNumbers
<template>
  <TiPopup :visible="visible" position="bottom">
    // 年月日
    <TiDatetimePicker type="date" />
    // 时分
    <TiDatetimePicker type="time" />
    // 年月日 - 时分
    <TiDatetimePicker type="datetime" />
    // 年月
    <TiDatetimePicker type="year-month" />
  </TiPopup>
</template>

<script lang="ts" setup>
import { TiDatetimePicker, TiPopup } from '{{packageWeappVue}}';
</script>
```

#### 选项格式化
```html showLineNumbers
<template>
  <TiPopup :visible="visible" position="bottom">
    <TiDatetimePicker :formatter="formatter" />
  </TiPopup>
</template>

<script lang="ts" setup>
import { TiDatetimePicker, TiPopup } from '{{packageWeappVue}}';
enum columnType { YEAR = "year", MONTH = "month", DAY = "day", HOUR = "hour", MINUTE = "minute" }
const formatter = (type: columnType, value: number) => {
  const pipe = {
    year: `${value}年`,
    month: `${value}月`,
    day: `${value}天`,
    hour: `${value}时`,
    minute: `${value}分`,
  }
  return pipe[type]
}
</script>
```

#### 选项过滤器
```html showLineNumbers
<template>
  <TiPopup :visible="visible" position="bottom">
    <TiDatetimePicker :filter="filter" />
  </TiPopup>
</template>

<script lang="ts" setup>
import { TiDatetimePicker, TiPopup } from '{{packageWeappVue}}';
enum columnType { YEAR = "year", MONTH = "month", DAY = "day", HOUR = "hour", MINUTE = "minute" }
const filter = (type: columnType, options: Array<{value: number}>) => {
  if (type === "year") {
    return options.filter((options) => options.value % 2 === (\s)([a-z]+)([A-Z])([a-z]+)(=)(\{)\s*(.*?)\s*(\})0);
  }
  return options;
}
</script>
```
#### 设置边界
```html showLineNumbers
<template>
  <TiPopup :visible="visible" position="bottom">
    <TiDatetimePicker :value="value" :min-date="minDate" :max-date="maxDate" />
  </TiPopup>
</template>

<script lang="ts" setup>
import { TiDatetimePicker, TiPopup } from '{{packageWeappVue}}';
</script>
```
#### 时间项排序
**sort项取值应该和type类型对应**
```html showLineNumbers
<template>
  <TiPopup :visible="visible" position="bottom">
    <TiDatetimePicker :sort="['month', 'year']" type="year-month" />
  </TiPopup>
</template>

<script lang="ts" setup>
import { TiDatetimePicker, TiPopup } from '{{packageWeappVue}}';
</script>
```

## TiDatetimePicker API
### 属性 **Properties**

| 名称             | 类型                    | 是否必填 | 默认值       | 说明                                                              | 备注 |
| ---------------- | ----------------------- | -------- | ------------ | ----------------------------------------------------------------- | ---- |
| value            | `string` | 否       | -            | -                                                                 | -    |
| type             | `string`                | 否       | `data`       | 年月日`date` 年月`year-month`  时分`time` 年月日 - 时分`datetime` | -    | - |
| min-date          | `number`                | 否       | 十年前毫秒数 | 最小边界                                                          | -    |
| max-date          | `number`                | 否       | 十年后毫秒数 | 最大边界                                                          | -    |
| sort             | `array`                 | 否       | -            | sort 需要与 type 匹配，[匹配关系](#sort排序的取值和type对应关系)                                             | -    |
| loading          | `boolean`               | 否       | `false`      | 加载动画                                                          | -    |
| formatter        | `function`              | 否       | -            | 格式化内容                                                        | -    |
| filter           | `function`              | 否       | -            | 过滤时间                                                          | -    |
| title            | `string`                | 否       | -            | 标题                                                              | -    |
| sub-title         | `string`                | 否       | -            | 副标题                                                            | -    |
| confirm-text      | `string`                | 否       | -            | 确认按钮文案                                                      | -    |
| cancel-text       | `string`                | 否       | -            | 取消按钮文案                                                      | -    |
| option-item-height | `number` \| `string`    | 否       | `108`        | 展示项高度                                                        | -    |
| visible-item-count | `number`                | 否       | `5`          | 可见展示项数                                                      | -    |
| ext-style         | `string`                | 否       | -            | 容器样式                                                          | -    |
| ext-option-style   | `string`                | 否       | -            | 子器样式                                                          | -    |

### sort排序的取值和type对应关系
| type       | sort                                       |
| ---------- | ------------------------------------------ |
| date       | ['year', 'month', 'day']                   |
| year-month | ['year', 'month']                          |
| time       | ['hour', 'minute']                         |
| datetime   | ['year', 'month', 'day', 'hour', 'minute'] |
### 事件 **Events**
| 名称      | 参数列表                                               | 描述               | 备注 |
| --------- | ------------------------------------------------------ | ------------------ | ---- |
| confirm | `(e: CustomEvent<{type: string, value: number}>) => void` | 点击确定按钮后触发 | ---- |
| change | `(e: CustomEvent<{type: string, value: number}) => void` | 列表变化是触发 | ---- |
| cancel | `(e: CustomEvent<{type: string, value: number}) => void` | 点击取消按钮后触发 | ---- |

### 外部样式类 **External Classes**

| 名称               | 说明                   | 备注 |
| ------------------ | ---------------------- | ---- |
| ext-hairline-class   | 时间选择器中间线样式   | ---- |
| ext-mask-class       | 时间选择器蒙层样式     | ---- |
| ext-option-class     | 时间选择器纵列容器样式 | ---- |
| ext-option-item-class | 时间选择器纵列单项样式 | ---- |
| ext-class           | 时间选择容器样式       | ---- |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --datetime-picker-mask-bg-image      | `#ffffff` | 同 `picker` 组件 `--picker-mask-bg-image`                    | --   |
| --datetime-picker-loading-bg-color   | `#ffffff` | 同 `picker` 组件 `--picker-loading-bg-color`                 | --   |
| --datetime-picker-row-color          | `#212121` | 同 `picker-column` 组件 `--picker-column-row-color`          | --   |
| --datetime-picker-row-selected-color | `#212121` | 同 `picker-column` 组件 `--picker-column-row-selected-color` | --   |
| --datetime-picker-row-disabled-color | `#212121` | 同 `picker-column` 组件 `--picker-column-row-disabled-color` | --   |
