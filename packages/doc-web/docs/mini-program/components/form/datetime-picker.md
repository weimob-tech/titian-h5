---
title: 时间选择器
sidebar_custom_props:
  suffix: DateTimePicker
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/datetime-picker"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 时间选择器 _DateTimePicker_
**用于选择时间，支持日期、时分等时间维度，通常与弹出层组件配合使用**

## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-datetime-picker": "titan-ui/datetime-picker/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-datetime-picker": "platform://titian-weapp/ti-datetime-picker"
  }
}
```

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-popup visible="{{visible}}" position="bottom">
  <ti-datetime-picker value="{{value}}" bind:confirm="onConfirm" />
</ti-popup>
```

#### 不同时间类型
```html showLineNumbers
<ti-popup visible="{{visible}}" position="bottom">
  // 年月日
  <ti-datetime-picker type="date" />
  // 时分
  <ti-datetime-picker type="time" />
  // 年月日 - 时分
  <ti-datetime-picker type="datetime" />
  // 年月
  <ti-datetime-picker type="year-month" />
</ti-popup>
```

#### 选项格式化
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-popup visible="{{visible}}" position="bottom">
  <ti-datetime-picker formatter="{{formatter}}" />
</ti-popup>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  formatter (type: columnType, value: number) {
    const pipe = {
      year: `${value}年`,
      month: `${value}月`,
      day: `${value}天`,
      hour: `${value}时`,
      minute: `${value}分`,
    }
    return pipe[type]
  }
});
```
</TabItem>
</Tabs>

#### 选项过滤器
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-popup visible="{{visible}}" position="bottom">
  <ti-datetime-picker filter="{{filter}}" />
</ti-popup>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  filter (type: columnType, value: number) {
    if (type === "year") {
      return options.filter((options) => options.value % 2 === 0);
    }
    return options;
  }
});
```
</TabItem>
</Tabs>

#### 设置边界
```html showLineNumbers
<ti-popup visible="{{visible}}" position="bottom">
  <ti-datetime-picker value="{{value}}" min-date="{{min-date}}" max-date="{{max-date}}" />
</ti-popup>
```
#### 时间项排序
**sort项取值应该和type类型对应**，[对应关系](#sort排序的取值和type对应关系)
```html showLineNumbers
<ti-popup visible="{{visible}}" position="bottom">
  <ti-datetime-picker sort="{{['month', 'year']}}" type="year-month" />
</ti-popup>
```

## ti-datetime-picker API
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
| --------- | ------------------------------------------------------ | ------------------ | - |
| bind:confirm | `(e: WechatMiniprogram.CustomEvent<{type: string, value: number}>) => void` | 点击确定按钮后触发 | - |
| bind:change | `(e: WechatMiniprogram.CustomEvent<{type: string, value: number}) => void` | 列表变化是触发 | - |
| bind:cancel | `(e: WechatMiniprogram.CustomEvent<{type: string, value: number}) => void` | 点击取消按钮后触发 | - |

### 外部样式类 **External Classes**

| 名称               | 说明                   | 备注 |
| ------------------ | ---------------------- | ---- |
| ext-hairline-class   | 时间选择器中间线样式   | - |
| ext-mask-class       | 时间选择器蒙层样式     | - |
| ext-option-class     | 时间选择器纵列容器样式 | - |
| ext-option-item-class | 时间选择器纵列单项样式 | - |
| eext-class           | 时间选择容器样式       | - |

### CSS 变量 **CSS Variable**
| 变量 | 默认值 | 说明 | 备注 |
| ---- | ------ | ---- | ---- |
| --datetime-picker-mask-bg-image      | `#ffffff` | 同 `picker` 组件 `--picker-mask-bg-image`                    | -   |
| --datetime-picker-loading-bg-color   | `#ffffff` | 同 `picker` 组件 `--picker-loading-bg-color`                 | -   |
| --datetime-picker-row-color          | `#212121` | 同 `picker-column` 组件 `--picker-column-row-color`          | -   |
| --datetime-picker-row-selected-color | `#212121` | 同 `picker-column` 组件 `--picker-column-row-selected-color` | -   |
| --datetime-picker-row-disabled-color | `#212121` | 同 `picker-column` 组件 `--picker-column-row-disabled-color` | -   |
