---
title: 滑块
sidebar_custom_props: 
    suffix: Slider
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/slider'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 滑块 _Slider_

**滑块输入，提供默认值、可选范围等能力。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-slider-api" />

## 用法示例

#### 单滑块
<Tabs>
  <TabItem value="index.html" label="index.html" >

```html showLineNumbers
<ti-slider id="ti-slider" onchange="onChange(event)"></ti-slider>
```
  </TabItem>
  <TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiSlider = document.getElementById("ti-slider");
  tiSlider.min = 0;
  tiSlider.max = 100;
  tiSlider.step = 10;
  tiSlider.value = 0
  function onChange(event){
    tiSlider.value = event.detail.value
  }
};
```
</TabItem>
</Tabs>

#### 双滑块
<Tabs>
  <TabItem value="index.html" label="index.html" >

```html showLineNumbers
<ti-slider id="ti-slider" onchange="onChange(event)"></ti-slider>
```
  </TabItem>
  <TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiSlider = document.getElementById("ti-slider");
  tiSlider.min = 0;
  tiSlider.max = 100;
  tiSlider.step = 10;
  tiSlider.value = [10,20]
  function onChange(event){
    tiSlider.value = event.detail.value
  }
};
```
</TabItem>
</Tabs>

## ti-slider API

### 属性 **Properties**

| 属性       | 类型                   | 必填 | 默认值 | 说明           | 备注 |
| ---------- | ---------------------- | ---- | ------ | -------------- | ---- |
| value      | `number` \| `number[]` | 是   | 100  | 最大值         | -    |
| max        | `number`               | 否   | 100  | 最大值         | -    |
| min        | `number`               | 否   | 100  | 最小值         | -    |
| step       | `number`               | 否   | 1    | 步长           | -    |
| track-class | `string`               | 否   | -      | 滑过轨迹样式类 | -    |
| rail-class  | `string`               | 否   | -      | 整体轨道样式类 | -    |
| thumb-class | `string`               | 否   | -      | 滑块样式类     | -    |


### 事件 **Events**


| 名称     | 参数列表                                                         | 描述                 | 备注 |
| -------- | ---------------------------------------------------------------- | -------------------- | ---- |
| change | `(e: CustomEvent) => void` | 滑动时触发的回调事件 | -    |


### 外部样式类 **External Classes**

| 名称          | 说明             | 备注 |
| ------------- | ---------------- | ---- |
| track-class | 轨道颜色类       | -    |
| rail-class  | 已滑动轨迹颜色类 | -    |
| thumb-class | 滑块颜色类       | -    |

### CSS 变量 **CSS Variables**

| CSS 变量                  | 默认值                       | 说明           | 备注 |
| ------------------------- | ---------------------------- | -------------- | ---- |
| --slider-rail-bg-color  | `--brand-color` 主题色的 10% | 轨道颜色       | -    |
| --slider-track-bg-color | `--brand-color` 主题色       | 已滑动轨迹颜色 | -    |
| --slider-thumb-bg-color | `#fff` 白色                  | 滑块颜色       | -    |

