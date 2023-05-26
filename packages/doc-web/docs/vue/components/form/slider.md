---
title: 滑块
sidebar_custom_props:
  suffix: Slider
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/slider"
---

# 滑块 _Slider_

**滑块输入，提供默认值、可选范围等能力。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tislider-api" />


## 安装使用
```typescript showLineNumbers
import { TiSlider } from '{{packageWeappVue}}'
```

## 用法示例

#### 单滑块

```html showLineNumbers
<template>
  <TiSlider 
    :value="value" 
    @change="onChangeHandler"
    :min="0"
    :max="100"
    :step="10"
   />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiSlider } from '{{packageWeappVue}}';

const value = ref<number>(10);
  
const onChangeHandler = (event) => {
  value.value = event.detail.value;
}
</script>
```

#### 双滑块


```html showLineNumbers
<template>
  <TiSlider 
    :value="value" 
    @change="onChangeHandler"
    :min="0"
    :max="100"
    :step="10"
   />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiSlider } from '{{packageWeappVue}}';

const value = ref<number[]>([10, 20]);
  
const onChangeHandler = (event) => {
  value.value = event.detail.value;
}
</script>
```

## TiSlider API

### 属性 **Properties**

| 属性       | 类型                   | 必填 | 默认值 | 说明           | 备注 |
| ---------- | ---------------------- | ---- | ------ | -------------- | ---- |
| value      | `number` \| `number[]` | 是   | `100`  | 最大值         | -    |
| max        | `number`               | 否   | `100`  | 最大值         | -    |
| min        | `number`               | 否   | `100`  | 最小值         | -    |
| step       | `number`               | 否   | `1`    | 步长           | -    |
| track-class | `string`               | 否   | -      | 滑过轨迹样式类 | -    |
| rail-class  | `string`               | 否   | -      | 整体轨道样式类 | -    |
| thumb-class | `string`               | 否   | -      | 滑块样式类     | -    |


### 事件 **Events**


| 名称     | 参数列表                                                         | 描述                 | 备注 |
| -------- | ---------------------------------------------------------------- | -------------------- | ---- |
| change | <code>(e: CustomEvent<value: number \| number[]>) => void</code> | 滑动时触发的回调事件 | -    |


### 外部样式类 **External Classes**

| 名称          | 说明             | 备注 |
| ------------- | ---------------- | ---- |
| `track-class` | 轨道颜色类       | -    |
| `rail-class`  | 已滑动轨迹颜色类 | -    |
| `thumb-class` | 滑块颜色类       | -    |

### CSS 变量 **CSS Variables**

| CSS 变量                  | 默认值                       | 说明           | 备注 |
| ------------------------- | ---------------------------- | -------------- | ---- |
| `--slider-rail-bg-color`  | `--brand-color` 主题色的 10% | 轨道颜色       | -    |
| `--slider-track-bg-color` | `--brand-color` 主题色       | 已滑动轨迹颜色 | -    |
| `--slider-thumb-bg-color` | `#fff` 白色                  | 滑块颜色       | -    |

