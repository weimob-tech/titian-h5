---
title: 日历
sidebar_custom_props: 
    suffix: Calendar
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/calendar"
---

# 日历 *Calendar*

**用于选择日期，或日期区间。**

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-calendar-api" />

## 用法示例

#### 基础用法
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
};
```
</TabItem>
</Tabs>

#### 设置边界
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" min-date="2022-02-10" max-date="2023-02-10"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
};
```
</TabItem>
</Tabs>

#### 设置默认值
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" default-value="2022-04-10"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
};
```
</TabItem>
</Tabs>

#### 受控模式
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" value="2022-04-10"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
};
```
</TabItem>
</Tabs>

#### 多选
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" mode="multiple"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
};
```
</TabItem>
</Tabs>

#### 多选 - 最多个数
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" mode="multiple"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
  tiCalendar.maxSize = 2;
};
```
</TabItem>
</Tabs>

#### 范围
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" mode="range"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
};
```
</TabItem>
</Tabs>

#### 范围 - 最大范围
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" mode="range"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
  tiCalendar.maxRange = 2;
};
```
</TabItem>
</Tabs>

#### 范围 - 允许起止同天
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-calendar id="ti-calendar" mode="range"></ti-calendar>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiCalendar = document.getElementById("ti-calendar");
  tiCalendar.visible = true;
  tiCalendar.allowSameDay = true;
};
```
</TabItem>
</Tabs>

## ti-calendar API

### 属性 **Properties**

| 名称             | 类型                                               | 必填 | 默认值          | 说明                                                                                | 备注                                          |
| ---------------- | -------------------------------------------------- | ---- | --------------- | ----------------------------------------------------------------------------------- | --------------------------------------------- |
| start            | `WeekDayEnum`                                      | 否   | 'Sunday'        | 从周几开始；                                                                        | 参数类型 [WeekDayEnum](#星期枚举-weekdayenum) |
| mode             | `single` \| `multiple`     \| `range`              | 否   | 'single'        | 单选/多选/范围                                                                      | -                                             |
| default-value    | `array` \| `string` \| `number`                    | 否   | null            | 默认值，传值则组件设置为非受控模式                                                  | -                                             |
| value            | `array` \| `string` \| `number`                    | 否   | null            | 值，则组件设置为受控模式                                                            | -                                             |
| min-date         | `string` \| `number`                               | 否   | 当天            | 最小日期范围，可转 Date 即可                                                        | -                                             |
| max-date         | `string` \| `number`                               | 否   | 从当天起 6 个月 | 最大日期范围，可转 Date 即可                                                        | -                                             |
| position         | `top` \| `bottom` \| `left` \| `right`             | 否   | bottom          | 展示位置，透传给 popup.position                                                     | -                                             |
| close-on-mask    | `boolean`                                          | 否   | true            | 点击遮罩关闭，透传给 popup.close-on-mask                                            | -                                             |
| use-popup        | `boolean`                                          | 否   | true            | 是否使用弹窗                                                                        | -                                             |
| destroy-on-close | `boolean`                                          | 否   | false           | 关闭后销毁组件，透传给 popup.destroyOnClose                                         | -                                             |
| confirm-text     | `string`                                           | 否   | 确认            | 确认文案；传空字符串''则不展示按钮                                                  | -                                             |
| visible          | `boolean`                                          | 否   | false           | 是否展示，透传给 popup.visible                                                      | -                                             |
| allow-same-day   | `boolean`                                          | 否   | false           | 起止日期是否可用是同一天;range 模式下生效                                           | -                                             |
| max-range        | `number`                                           | 否   | 0               | 起止日期最大跨度天数; range 模式且大于 0 下生效                                     | -                                             |
| max-size         | `number`                                           | 否   | 0               | 最多可选天数 ; multiple 模式且大于 0 下生效                                         | -                                             |
| color            | `string`                                           | 否   | #2580FF         | 选中颜色值                                                                          | -                                             |
| round            | `boolean`                                          | 否   | false           | 圆角模式                                                                            | -                                             |
| title            | `string`                                           | 否   | '选择日期'      | 标题                                                                                | -                                             |
| formatter        | `(date: CalRenderDateProps) => CalRenderDateProps` | 否   | null            | 格式化日历函数，参数类型 [CalRenderDateProps](#日期渲染数据结构-calrenderdateprops) | -                                             |
| ext-style        | `string`                                           | 否   | ''              | 容器样式                                                                            | -                                             |
| mask-z-index           | `number`  | 否   | 10000    | 遮罩 z-index 层级                                                                                    | -    |
| content-z-index        | `number`  | 否   | 10001    | 内容 z-index 层级                                                                                    | -    |


### 事件 **Events**

| 名称         | 参数列表                                                                                                                      | 描述             | 备注                                                                                                                                                                             |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| select  | `(e: CustomEvent<{date: CalDateProps; currentDate: CalRenderDateProps[];}>) => void`                        | 日历面板选择事件 | 参数类型见 [CalDateProps](#日期数据结构-caldateprops)， [CalRenderDateProps](#日期渲染数据结构-calrenderdateprops)                                                               |
| confirm | `(e: CustomEvent<CalRenderDateProps[]>) => void`                                                            | 日历面板确认事件 | 参数见 [CalRenderDateProps](#日期渲染数据结构-calrenderdateprops)                                                                                                                |
| close   | `(e: CustomEvent) => void`                                                                                  | 日历面板关闭事件 | -                                                                                                                                                                                |
| error        | `(e: CustomEvent<{error: CalErrorProps; date: CalDateProps; currentDate: CalRenderDateProps[]; }>) => void` | 日历面板错误事件 | 参数类型见 [CalErrorProps](#报错数据结构-calerrorprops)， [CalRenderDateProps](#日期渲染数据结构-calrenderdateprops)，[CalRenderDateProps](#日期渲染数据结构-calrenderdateprops) |

### 外部样式类 **External Classes**

| 类名                    | 说明                                           | 备注 |
| ----------------------- | ---------------------------------------------- | ---- |
| ext-popup-class         | popup 容器样式，透传给 popup/ext-class         | -    |
| ext-popup-mask-class    | popup 遮罩样式，透传给 popup/ext-mask-class    | -    |
| ext-popup-content-class | popup 内容样式，透传给 popup/ext-content-class | -    |
| ext-class               | 日历组件容器样式                               | -    |
| ext-scroll-class        | 日历组件滚动容器样式                           | -    |

### CSS 变量 **CSS Variables**

| 变量                           | 默认值                                        | 说明                                    | 备注 |
| ------------------------------ | --------------------------------------------- | --------------------------------------- |
| --calendar-popup-mask-bg-color | 默认值                                        | 同 `Popup` 组件 `--popup-mask-bg-color` | -    |
| --calendar-popup-radius        | 默认值                                        | 同 `Popup` 组件 `--popup-popup-radius`  | -    |
| --calendar-popup-box-bg-color  | 默认值                                        | 同 `Popup` 组件 `--popup-box-bg-color`  | -    |
| --calendar-scroll-height       | 500rpx                                        | 日历滚动区域高度                        | -    |
| --calendar-week-height         | 60rpx                                         | 日历星期区域高度                        | -    |
| --calendar-week-item-color     | var(--neutral-color-2, #757575)               | 日历星期区域字体颜色                    | -    |
| --calendar-title-height        | 80rpx                                         | 日历标题区域高度                        | -    |
| --calendar-title-color         | var(--neutral-color-4, #c4c4c4)               | 日历标题区域字体颜色                    | -    |
| --calendar-date-text-color     | var(--neutral-color-1, #212121)               | 日历时间区域日期字体颜色                | -    |
| --calendar-date-info-color     | var(--neutral-color-3, #9e9e9e)               | 日历时间区域描述字体颜色                | -    |
| --calendar-date-select-color   | var(--neutral-color-9, #ffffff)               | 日历时间区域选中字体颜色                | -    |
| --calendar-date-select-radius  | calc(var(--capsule-radius-size, 0rpx) + 8rpx) | 日历时间区域选中圆角                    | -    |
| --calendar-date-disabled-color | var(--neutral-color-4, #c4c4c4)               | 日历时间区域禁用颜色                    | -    |
| --calendar-date-margin-v       | 10rpx                                         | 日历时间区域垂直方向距离                | -    |
| --calendar-date-margin-h       | 0rpx                                          | 日历时间区域水平方向距离                | -    |

## 数据结构 **Data Structure**

#### 星期枚举 `WeekDayEnum`
| 值        | 含义 | 备注 |
| --------- | ---- | ---- |
| Sunday    | 周日 | -    |
| Monday    | 周一 | -    |
| Tuesday   | 周二 | -    |
| Wednesday | 周三 | -    |
| Thursday  | 周四 | -    |
| Friday    | 周五 | -    |
| Saturday  | 周六 | -    |

#### 日期数据结构 `CalDateProps`

| 键名          | 说明                 | 类型                                           |
| ------------- | -------------------- | ---------------------------------------------- |
| date          | 日期                 | `Date`                                         |
| time          | 毫秒数               | `number`                                       |
| year          | 年                   | `number`                                       |
| month         | 月                   | `month`                                        |
| day           | 日                   | `number`                                       |
| week          | 星期                 | `number`                                       |
| full-date-num | 年月日，如`20211231` | `number`                                       |
| text          | 文本                 | `string` \| `number`                           |
| status        | 状态                 | [DateStatusEnum](#日期状态枚举-datestatusenum) |
| top-info      | 顶部文案             | `string`                                       |
| bottom-info   | 底部文案             | `string`                                       |


#### 日期渲染数据结构 `CalRenderDateProps`
```ts showLineNumbers
interface CalRenderDateProps extends CalDateProps {
  parentIndex: number;
}
```

#### 报错数据结构 `CalErrorProps`
```ts showLineNumbers
interface CalErrorProps {
  message: string;
  type: 'maxSize' | 'maxRange' | 'disabled';
}
```
#### 日期状态枚举 `DateStatusEnum`

| 枚举值           | 说明                                 |
| --------------- | ------------------------------------ |
| null            | 无状态                               |
| disabled        | 禁用                                 |
| single          | 单选选中状态                         |
| range_start     | 范围选择：起始状态                   |
| range_full      | 范围选择：起始时间与结束时间为同一天 |
| range_end       | 范围选择：结束状态                   |
| multiple        | 孤立多选（无连接）                   |
| multiple_start  | 多选（有连接） 起始状态              |
| multiple_middle | 多选（有连接） 中间状态              |
| mulitiple_end   | 多选（有连接） 结束状态              |

