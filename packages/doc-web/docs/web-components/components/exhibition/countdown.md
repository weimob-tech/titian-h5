---
title: 倒计时
sidebar_custom_props:
  suffix: Countdown
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/countdown"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 倒计时 _Countdown_
**倒计时组件用于实时展示倒计时数值，精度支持毫秒**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-countdown-api" />

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-countdown autoplay></ti-countdown>
```
#### 格式化时间
```html showLineNumbers
<ti-countdown format="HH:mm:ss SSS"></ti-countdown>
<ti-countdown format="DD天HH时mm分ss SSS"></ti-countdown>
<ti-countdown format="D天H时m分s SSS"></ti-countdown>
```

#### 风格
```html showLineNumbers
<ti-countdown variant="pure" format="DD天HH:mm:ss SSS"></ti-countdown>
<ti-countdown variant="block" format="DD天HH时mm分ss SSS"></ti-countdown>
<ti-countdown variant="mixture" format="D天H时m分s SSS"></ti-countdown>
```

#### 尺寸
**在variant设为`block`或者`mixture`下生效，对应块状尺寸分别为`32px` `40px` `44px` `48px`**
```html showLineNumbers
<ti-countdown variant="block" size="small"></ti-countdown>
<ti-countdown variant="block" size="medium"></ti-countdown>
<ti-countdown variant="block" size="big"></ti-countdown>
<ti-countdown variant="block" size="large"></ti-countdown>
```

#### 启动、暂停、重置
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-countdown id="ti-countdown"></ti-countdown>
```
</TabItem>
<TabItem value="index.js" label="index.js" default>

```js showLineNumbers
function onStart() {
  const countDown = document.getElementById('ti-countdown');
  countDown.start();
};
function onPause() {
  const countDown = document.getElementById('ti-countdown');
  countDown.pause();
};
function onReset() {
  const countDown = document.getElementById('ti-countdown');
  countDown.reset();
};
```
</TabItem>
</Tabs>

#### 自定义内容
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-countdown time="118888666" use-slot onchange="onChange(event)">
  <div id="day">0</div>
  <div class="tag">天</div>
  <div id="hour">0</div>
  <div class="tag"><ti-icon size="24" name="colon"></ti-icon></div>
  <div id="minute">0</div>
  <div class="tag"><ti-icon size="24" name="colon"></ti-icon></div>
  <div id="second">0</div>
</ti-countdown>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
function onChange(event) {
  var day = document.getElementById("day");
  day.innerhtml = time.day;
  var hour = document.getElementById("hour");
  hour.innerhtml = time.hour;
  var minute = document.getElementById("minute");
  minute.innerhtml = time.minute;
  var second = document.getElementById("second");
  second.innerhtml = time.second;
};
```
</TabItem>
</Tabs>

## ti-countdown API
### 属性 **Properties**

| 名称     | 类型      | 必填 | 默认值     | 说明                                           | 备注 |
| -------- | --------- | ---- | ---------- | ---------------------------------------------- | ---- |
| variant  | `string`  | 否   | `pure`     | 倒计时的风格，可选值：`pure` `block` `mixture`          | -    |
| size     | `string`  | 否   | `medium`   | 倒计时的尺寸，在variant设为`block`或者`mixture`下生效，可选值：`small` `medium` `big` `large`，对应块状尺寸分别为`32px` `40px` `44px` `48px` | -    |
| time     | `number`  | 否   | `1200`     | 倒计时时长，单位毫秒                           | -    |
| format   | `string`  | 否   | `HH:mm:ss` | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒 | -    |
| autoplay | `boolean` | 否   | `false`    | 是否自动开始倒计时                             | -    |
| use-slot  | `boolean` | 否   | `false`    | 是否使用自定义样式插槽                         | -    |
| ext-style | `string`  | 否   | -          | 根节点样式                                     | -    |


### 事件 **Events**

| 名称     | 参数列表                                                                                               | 描述             | 备注 |
| -------- | ------------------------------------------------------------------------------------------------------ | ---------------- | ---- |
| finish | `(e: CustomEvent) => void`                                                                                   | 倒计时结束时触发 | -    |
| change | `(e: CustomEvent<{day: number, hour: number, minute: number, second: number, millisecond: number}>) => void` | 时间变化时触发   | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 根节点样式类 | -    |


### CSS 变量 **CSS Variable**
| 变量                          | 默认值    | 说明                       | 备注 |
| ----------------------------- | --------- | -------------------------- | ---- |
| --countdown-color             | `#757575` | 倒计时文字颜色，块状风格下默认值为`#ff2e2e` | -    |
| --countdown-font-size         | `28px`    | 倒计时文字字号             | -    |
| --countdown-line-height       | `34px`    | 倒计时文字行高             | -    |
| --countdown-border-radius     | `8px`     | 块状风格下，圆角           | -    |
| --countdown-background        | `#fff2f2` | 块状风格下，背景色         | -    |
| --countdown-font-family       | `wemo`    | 块状风格下，文字字体       | -    |
| --countdown-font-weight       | `600`     | 块状风格下，文字字重       | -    |
| --countdown-day-color         | `600`     | 块状风格下，天数文字颜色   | -    |
| --countdown-day-font-size     | `24px`    | 块状风格下，天数文字大小   | -    |
| --countdown-day-margin        | -         | 块状风格下，天数区域的间距 | -    |
| --countdown-dot-color         | `#212121` | 块状风格下，图标冒号颜色   | -    |
| --countdown-dot-size          | `20`      | 块状风格下，图标冒号大小   | -    |
| --countdown-size              | -         | 块状风格下，方块的大小     | -    |
| --countdown-millisecond-width | `52px`    | 块状风格下，毫秒区域的宽度 | -    |