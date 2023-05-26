---
title: 折叠面板
sidebar_custom_props:
  suffix: Collapse
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/collapse"
---

# 折叠面板 _Collapse_

** 可以折叠/展开的内容区域。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ticollapse-api" />

## 安装使用
```typescript showLineNumbers
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';
```

## 用法示例

#### 基本使用
```html showLineNumbers
<template>
  <TiCollapse>
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
  
  <!-- 设置手风琴模式 -->
  <TiCollapse repel>
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
</template>

<script lang="ts" setup>
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';
</script>
```

#### 设置默认展开
```html showLineNumbers
<template>
  <TiCollapse :value="[0]">
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
</template>

<script lang="ts" setup>
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';
</script>
```

#### 图标设置
** 支持左右两侧分别设置图标 **

```html showLineNumbers
<template>
  <TiCollapse icon="share-wechat-moments">
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
  
  <!-- 整体设置右侧icon -->
  <TiCollapse right-icon="share-wechat-moments">
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
  
  <!-- 单个设置左侧icon -->
  <TiCollapse>
    <TiCollapseItem icon="share-wechat-moments" title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
  
  <!-- 单体设置右侧icon -->
  <TiCollapse>
    <TiCollapseItem right-icon="share-wechat-moments" title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
</template>

<script lang="ts" setup>
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';
</script>
```

#### 禁用面板
```html showLineNumbers
<template>
  <TiCollapse disabled>
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>

  <TiCollapse>
    <TiCollapseItem disabled title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
</template>

<script lang="ts" setup>
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';
</script>
```

#### 使用 `options` 属性创建面板
```html showLineNumbers
<template>
  <TiCollapse :options="options" />
</template>

<script lang="ts" setup>
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';

const options = [
  { title: "标题文字A", content: "- 标题A下的内容 -" },
  { title: "标题文字B", content: "- 标题B下的内容 -" }
];
</script>
```

#### 监听展开、关闭、切换事件

```html showLineNumbers
<template>
  <TiCollapse 
    @close="handleClose"
    @open="handleOpen"
    @change="handleChange"
  >
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
  
  <TiCollapse
    @close="handleClose"
    @open="handleOpen"
    @change="handleChange"
    repel
  >
    <TiCollapseItem title="标题文字A">- 标题A下的内容 -</TiCollapseItem>
    <TiCollapseItem title="标题文字B">- 标题B下的内容 -</TiCollapseItem>
  </TiCollapse>
</template>

<script lang="ts" setup>
import { TiCollapse, TiCollapseItem } from '{{packageWeappVue}}';
const handleChange = (e: CustomEvent<string | number | Array<string | number>>) => {
  console.log("切换", e.detail);
};

const handleOpen = (e: CustomEvent<string | number>) => {
  console.log("打开", e.detail);
};

const handleClose = (e: CustomEvent<string | number>) => {
  console.log("关闭", e.detail);
};
</script>
```

## TiCollapse API

### 属性 **Properties**

| 名称           | 类型                            | 必填 | 默认值 | 说明              | 备注 |
| -------------- | ------------------------------- | ---- | ------ | ----------------- | ---- |
| value          | <code>Array<string &vert; number\></code> \| `string` \| `number` | 否   | null   | 选中值            | -    |
| options        | `Options`           | 否   | []     |                   | -    |
| icon           | `string`                        | 否   | -   | 全局设置左侧 icon | -    |
| right-icon      | `string`                        | 否   | -   | 全局设置右侧 icon | -    |
| disabled       | `boolean`                       | 否   | -  | 全局设置是否禁用  | -    |
| repel          | `boolean`                       | 否   | -  | 是否手风琴模式    | -    |
| divider          | `boolean`                       | 否   | -  | 是否展示分割线    | -    |
| clickable          | `boolean`                       | 否   | -  | 开启点击反馈    | -    |
| ext-option-style | `string`                        | 否   | -     | 子项容器样式      |      |

#### Options
详情可参考 [ti-cell 属性](/docs/vue/components/global/cell#%E5%B1%9E%E6%80%A7-properties)

```typescript showLineNumbers
interface Options {
  "clickable"?: boolean;
  "desc"?: string;
  "disabled"?: boolean;
  "divider"?: boolean;
  "icon"?: string;
  "label"?: string;
  "right-icon"?: string;
  "title": string;
  "content": string;
  "value"?: string | number;
}
```
### 事件 **Events**

| 名称     | 参数 | 描述             | 备注 |
| -------- | -------- | ---------------- | ---- |
| `change` | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code>      | 折叠面板选中值   | 当为手风琴模式时返回值为 <code>string &vert; number</code>，否则为 <code>Array<string &vert; number\></code>   |
| `open`   | <code>(e: CustomEvent<string &vert; number\>) => void</code>        | 折叠面板展开事件 | -    |
| `close` | <code>(e: CustomEvent<string &vert; number\>) => void</code>         | 折叠面板关闭事件 | -    |

### 可扩展样式名 **External Class**

| 类名                  | 说明               | 备注 |
| --------------------- | ------------------ | ---- |
| ext-option-class        | 子项容器样式       |
| ext-option-content-class | 子项容器折叠区样式 |

## TiCollapseItem API

### 属性 **Properties**

| 名称             | 类型      | 必填 | 默认值 | 说明                   | 备注 |
| ---------------- | --------- | ---- | ------ | ---------------------- | ---- |
| value            | `string`  | 否   | null   | 用来匹配父类 value，判断当前面板是否需要被展开，如果不传入，默认使用下标(**index**)         | -    |
| title            | `string`  | 否   | []     | 标题文字               | -    |
| desc             | `string`  | 否   | null   | 内容文字               | -    |
| icon             | `string`  | 否   | false  | 左侧 icon              | -    |
| right-icon        | `string`  | 否   | null   | 右侧 icon              | -    |
| disabled         | `boolean` | 否   | false  | 是否禁用               | -    |
| use-right-icon-slot | `boolean` | 否   | false  | 是否使用右侧 icon 插槽 | -    |
| ext-style         | `string`  | 否   | ''     | 容器样式               | -    |
| divider          | `boolean`                       | 否   | -  | 是否展示分割线    | -    |
| clickable          | `boolean`                       | 否   | -  | 开启点击反馈    | -    |

### 插槽 **Slots**

| 名称      | 说明           | 备注 |
| --------- | -------------- | ---- |
| title     | 文档           | -    |
| icon      | 左侧 icon      | -    |
| right-icon | 右侧 icon      | -    |
| desc      | 内容           | -    |
| default   | 内容区默认插槽 | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明     | 备注 |
| -------- | -------- | ---- |
| ext-class | 容器样式 |

### CSS 变量 **CSS Variables**

| 变量                                     | 默认值 | 说明                                        | 备注 |
| ---------------------------------------- | -------------- | ------------------------------------------- | ---- |
| --collapse-item-padding-v                | - | 折叠区垂直方向的内边距                      | -    |
| --collapse-item-padding-h                | - | 折叠区水平方向的内边距                      | -    |
| --collapse-item-text-color               | - | 折叠区文本颜色                              | -    |
| --collapse-item-icon-color               | - | 右侧 icon 颜色                              | -    |
| --collapse-item-cubic-bezier             | - | 动画执行速度                                | -    |
| --collapse-item-cell-padding-v           | - | 同 `Cell` 组件 `--cell-padding-v`           | -    |
| --collapse-item-cell-padding-h           | - | 同 `Cell` 组件 `--cell-padding-h`           | -    |
| --collapse-item-cell-text-color          | - | 同 `Cell` 组件 `--cell-text-color`          | -    |
| --collapse-item-cell-title-text-color    | - | 同 `Cell` 组件 `--cell-title-text-color`    | -    |
| --collapse-item-cell-label-text-color    | - | 同 `Cell` 组件 `--cell-label-text-color`    | -    |
| --collapse-item-cell-desc-text-color     | - | 同 `Cell` 组件 `--cell-desc-text-color`     | -    |
| --collapse-item-cell-bg-color            | - | 同 `Cell` 组件 `--cell-bg-color`            | -    |
| --collapse-item-cell-value-text-color    | - | 同 `Cell` 组件 `--cell-right-icon-color`    | -    |
| --collapse-item-cell-text-disabled-color | - | 同 `Cell` 组件 `--cell-text-disabled-color` | -    |
| --collapse-item-cell-hover-bg-color      | - | 同 `Cell` 组件 `--cell-hover-bg-color`      | -    |
| --collapse-item-line-height | `1.2` | - | - |
| --collapse-item-font-weight | `400` | - | - |
| --collapse-item-font-size | `24` | - | - |
