---
title: 预览
sidebar_custom_props:
  suffix: Preview
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/preview"
---

# 预览 _Preview_
用来预览多张图片，支持左右滑动。

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tipreview-api" />

## 安装使用

```typescript jsx showLineNumbers
import { TiPreview } from '@titian-design/mobile-vue';
```

## 基本使用方式

```html showLineNumbers
<template>
  <TiButton @click="handlePreviewImage">预览</TiButton>
  <div ref="previewPreview">
    <TiPreview />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiPreview, TiButton } from '@titian-design/mobile-vue';

const previewPreview = ref<HTMLElement | null>(null);

const handlePreviewImage = async () => {
  await previewPreview.value?.querySelector('ti-preview')?.show([
    {
      fileType: "image",
      title: "图片标题",
      path: "https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png",
    },
  ]);
};
</script>
```

#### 隐藏标题和页码

```html showLineNumbers
<template>
  <TiButton @click="handlePreviewImage">预览</TiButton>
  <div ref="previewPreview">
    <TiPreview :display-number="false" :display-title="false" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiPreview, TiButton } from '@titian-design/mobile-vue';

const previewPreview = ref<HTMLElement | null>(null);

const handlePreviewImage = async () => {
  await previewPreview.value?.querySelector('ti-preview')?.show([
    {
      fileType: "image",
      title: "图片标题",
      path: "https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png",
    },
  ]);
};
</script>
```

## TiPreview API

### 属性 **Properties**

| 名称          | 类型      | 必填 | 默认值 | 说明               | 备注 |
| ------------- | --------- | ---- | ------ | ------------------ | ---- |
| display-number | `boolean` | 否   | `true` | 是否展示页码 | -    |
| display-title | `boolean` | 否   | `true` | 是否展示上方的标题 | -    |


### 事件 **Events**

| 名称      | 参数列表                                                    | 描述             | 备注 |
| --------- | ------------------------------------------------------------ | ---------------- | ---- |
| `change`  | `(e: CustomEvent<{ current: number, item: any }>) => void`  | 预览图片切换触发的事件 | -  |

### 方法 **Methods**
| 方法名        | 说明         | 参数列表                        | 返回值 | 备注 |
| ------------- | ------------ | --------------------------- | ------ |------ |
| show | 实例方法，展示预览图 | `(IPreviewItem, index) => void` | -      | index 为默认展示项的索引   |

### CSS 变量 **CSS Variables**

| 变量               | 默认值  |  说明               |备注 |
| ------------------ | ------------------ | ------- | ---- |
| `--preview-position` | `fixed` | 图片预览出现的位置 | -    |
| `--preview-z-index` | `10000` | - | - |
| `--preview-bg-color` | `#000000` | - | - |
| `--preview-content-box-z-index` | `10002` | - | - |
| `--preview-content-box-bottom` | `96px` | - | - |
| `--preview-content-box-left` | `50%`  | - | - |
| `--preview-content-box-transform` | `translateX(-50%)` | - | - |
| `--preview-content-box-text-align` | `center` | - | - |
| `--preview-text-color`  | `var(--neutral-color-9, #ffffff)` | - | - |
| `--preview-title-color` | `var(--preview-text-color, var(--neutral-color-9, #ffffff))` | - | - |
| `--preview-serial-number-color` | `var(--preview-text-color, var(--neutral-color-9, #ffffff))` | - | - |
| `--preview-title-radius` | `calc(var(--base-radius-size, 0px) + 8px)` | - | - |
| `--preview-title-padding` | `12px 24px` | - | - |
| `--preview-serial-number-padding` | `32px 0 0 0` | - | - |
| `--preview-title-bg-color`  | `var(--preview-bg-color, #4d4d4d)` | - | - |

## 数据结构 **Data Structure**

#### 预览入参 `IPreviewItem`

| 字段     | 类型     | 必填 | 默认值 | 说明   |
| -------- | -------- | ---- | ------ | ------ |
| file-type | `image` \| `video` | 否   | -   | 文件类型 |
| path     | `string` | 否   | -   | 文件链接 |
| title     | `string` | 否   | -   | 预览标题 |