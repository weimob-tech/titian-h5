---
title: 轻提示
sidebar_custom_props:
  suffix: Toast
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/toast"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 轻提示 _Toast_

**用于交互提示、加载结果等场景。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-toast-api" />

## 安装使用

:::note
小程序在机制上不允许动态插入 DOM。

因此，需要在外层先引入 `<ti-toast id="titian-toast" />` 组件，再使用 js 方法展示该组件。
:::

<Tabs>
  <TabItem value="json" label="index.json" >

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-toast": "@titian-design/weapp/toast/index"
  },
  // titan-cli 搭建的项目
  "usingComponents": {
    "ti-toast": "platform://titian-weapp/ti-toast"
  }
}
```

  </TabItem>
  <TabItem value="js" label="index.js">

```typescript tsx showLineNumbers
// 原生小程序
import { $tiToast } from "@titian-design/weapp/index";

// titan-cli 搭建的项目
const { $tiToast } = requirePlatform("@titian-design/weapp").main;
```

 </TabItem>
 <TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-toast id="titian-toast" />
```

 </TabItem>
</Tabs>


## 用法示例

#### 基本用法
```typescript tsc showLineNumbers
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
```

#### 使用 `Selector`

:::note
`selector`: 用作 `selectComponent` API 的参数；指定 `<ti-toast>` 元素的 id，默认为 `titian-toast`。

`ctx`: 指定 `selector` 选择器的上下文范围。
:::

```typescript tsc showLineNumbers
$tiToast.loading({
  selector: "#titian-toast",
  text: "这是一条加载提示！",
  duration: 2000
  
});

$tiToast.loading({
  ctx: this,
  selector: "#titian-toast",
  text: "这是一条加载提示！",
  duration: 2000
});
```
## ti-toast API

### 方法 **Methods**
| 方法名           | 说明         | 参数                       | 返回值 |
| ---------------- | ------------ | -------------------------- | ------ |
| $tiToast.success | 展示成功提示 | `ToastOptions` \| `string` |   -     |
| $tiToast.warn    | 展示警告提示 | `ToastOptions` \| `string` |   -     |
| $tiToast.fail    | 展示失败提示 | `ToastOptions` \| `string` |    -    |
| $tiToast.loading | 展示加载提示 | `ToastOptions` \| `string` |   -     |
| $tiToast.info    | 展示文本     | `ToastOptions` \| `string` |   -     |
| $tiToast.clear   | 清除提示     | -                          |   -     |


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
