---
title: 轻提示
sidebar_custom_props:
  suffix: Toast
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/toast"
---

# 轻提示 _Toast_

**用于交互提示、加载结果等场景。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titoast-api" />

## 安装使用
```typescript showLineNumbers
import { $tiToast } from 'titian-h5-vue'
```

## 用法示例


```html showLineNumbers
<template>
</template>

<script setup lang="ts">
  import { $tiToast } from 'titian-h5-vue';

  $tiToast.info("这是一条轻提示！");

  $tiToast.warn({
    text: "这是一条警告提示！",
    duration: 2000,
  });

  $tiToast.success({
    text: "这是一条成功提示！",
    duration: 2000,
  });

  $tiToast.fail({
    text: "这是一条失败提示！",
    duration: 2000,
  });

  $tiToast.loading({
    text: "这是一条加载提示！",
    duration: 2000,
  });

  $tiToast.loading({
    text: "这是一条加载提示！",
    duration: 2000,
    extPopupClass: "ext-toast-popup",
    extPopupContentClass: "ext-toast-content-popup",
    extPopupMaskClass: "ext-toast-mask-popup",
  });
</script>
```

## TiToast API

### 方法 **Methods**
| 方法名           | 说明         | 参数                       | 返回值 |
| ---------------- | ------------ | -------------------------- | ------ |
| $tiToast.success | 展示成功提示 | `ToastOptions` \| `string` |        |
| $tiToast.warn    | 展示警告提示 | `ToastOptions` \| `string` |        |
| $tiToast.fail    | 展示失败提示 | `ToastOptions` \| `string` |        |
| $tiToast.loading | 展示加载提示 | `ToastOptions` \| `string` |        |
| $tiToast.info    | 展示文本     | `ToastOptions` \| `string` |        |
| $tiToast.clear   | 清除提示     | -                          |        |


#### ToastOptions 数据结构
| 名称             | 类型       | 必填 | 默认值  | 说明        | 备注 |
| ---------------- | ---------- | ---- | ------- | ----------- | ---- |
| text             | `number`   | 否   | `100`   | 文本        |      |
| z-index           | `number`   | 否   | `30000` | z-index 层级 |      |
| duration         | `number`   | 否   | `2000`  | 展示时长    | -    |
| color            | `string`   | 否   | `#fff`  | 颜色        | -    |
| icon             | `string`   | 否   | -       | 轻提示 icon | -    |
| finished-callback | `Function` | 否   | `0`     | 回调        | -    |

### CSS 变量 **CSS Variables**

| CSS 变量                      | 默认值                                  | 说明 |
| ----------------------------- | --------------------------------------- | ---- |
| `--toast-popup-mask-bg-color` | 同 `Popup` 组件 `--popup-mask-bg-color` | --   |
| `--toast-popup-radius`        | 同 `Popup` 组件 `--popup-popup-radius`  | --   |
| `--toast-popup-box-bg-color`  | 同 `Popup` 组件 `--popup-box-bg-color`  | --   |
| `--toast-bg-color`            | 容器背景色                              | --   |
| `--toast-status-width`        | icon 模式下宽度                         | --   |
| `--toast-status-height`       | icon 模式下高度                         | --   |
| `--toast-status-gap`          | icon 与文本之间间距                     | --   |
| `--toast-text-color`          | 文本区颜色                              | --   |