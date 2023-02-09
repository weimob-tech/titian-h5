---
title: 弹窗
sidebar_custom_props:
  suffix: Dialog
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/dialog"
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 弹窗 _Dialog_
**弹出对话窗，常用于确认、提示等场景。支持 API 式调用和 DOM 式调用。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-dialog-api" />

## 安装使用

:::note
小程序在机制上不允许动态插入 DOM。

当 API 调用时，需要在外层先引入 `<ti-dialog id="titian-dialog" />` 组件，再使用 js 获取该组件实例、并设置该组件。

当使用声明式 DOM 调用时，跟常规组件一样，在 `json` 和 `wxml` 中引入即可。
:::

<Tabs>
  <TabItem value="json" label="index.json" >

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-dialog": "@titian-design/weapp/dialog/index"
  },
  // titan-cli 搭建的项目
  "usingComponents": {
    "ti-dialog": "platform://titian-weapp/ti-dialog"
  }
}
```

  </TabItem>
  <TabItem value="js" label="index.js">

```typescript tsx showLineNumbers
// 原生小程序
import { $tiDialog } from "@titian-design/weapp/index";

// titan-cli 搭建的项目
const { $tiDialog } = requirePlatform("@titian-design/weapp").main;
```

 </TabItem>
 <TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dialog id="titian-dialog" />
```

 </TabItem>
</Tabs>


## 用法示例

#### 常规 API 式调用


```typescript tsx showLineNumbers
$tiDialog.show({
  title: "Confirm标题",
  content: "内容",
  cancelBtnText: "取消",
  isTextButton: false,
  hasCancelButton: true,
  confirmBtnText: "确定",
  onCancel() {},
  onConfirm() {},
  onClose() {}
});

$tiDialog.close();
```


#### 使用 `selector` 
:::note
`selector`:  用作 `selectComponent` API 的参数；指定 `<ti-dialog>` 元素的 id，默认为 `titian-dialog`。

`ctx`: 指定 `selector` 选择器的上下文范围。
:::

```typescript tsx showLineNumbers
$tiDialog.show({
  selector: "#titian-dialog",
  title: "",
  content: "",
  cancelBtnText: "取消",
  isTextButton: false,
  hasCancelButton: true,
  confirmBtnText: "确定",
  onCancel() {},
  onConfirm() {},
  onClose() {}
});

$tiDialog.show({
  ctx: this
  selector: "#titian-dialog",
  title: "",
  content: "",
  cancelBtnText: "取消",
  isTextButton: false,
  hasCancelButton: true,
  confirmBtnText: "确定",
  onCancel() {},
  onConfirm() {},
  onClose() {}
});
```


#### 使用 DOM 和插槽


<Tabs>
<TabItem value="wxml" label="index.wxml" >

```html showLineNumbers
<ti-dialog title="标题" visible="{{visible}}" bind:cancel="onCancel" bind:confirm="onConfirm" bind:close="onClose">
  <view>默认插槽</view>
</ti-dialog>
```

  </TabItem>
  <TabItem value="js" label="index.js">

```typescript tsx showLineNumbers
Page({
  data: {
    visible: false,
  },

  showPopup() {
    this.setData({ visible: true });
  },

  onCancel() {
    this.setData({ visible: false });
  },
  onConfirm() {
    this.setData({ visible: false });
  },
  onClose(){
    this.setData({ visible: false });
  }
})
```

</TabItem>
</Tabs>


## ti-dialog API

### 属性 **Properties**

| 名称                 | 类型      | 必填 | 默认值 | 说明                     | 备注 |
| -------------------- | --------- | ---- | ------ | ------------------------ | ---- |
| title                | `string`  | 否   | -      | 标题                     | -    |
| content              | `string`  | 否   | -      | 内容                     | -    |
| z-index               | `number`  | 否   | 12000  | z-index                   | -    |
| has-cancel-button      | `boolean` | 否   | false  | 是否展示确认按钮         | -    |
| close-on-mask           | `boolean` | 否   | true   | 点击遮罩是否关闭对话框                 | -    |
| close-on-actions        | `boolean` | 否   | true   | 点击`确认`和`取消`按钮，是否关闭对话框 | -    |
| is-text-button         | `boolean` | 否   | false  | 是否为文字按钮           | -    |
| cancel-btn-text        | `string`  | 否   | 取消   | 取消按钮的文案           | -    |
| confirm-btn-text       | `string`  | 否   | 确定   | 确定按钮的文案           | -    |
| confirm-button-color   | `string`  | 否   | -      | 确认按钮的颜色           | -    |
| confirm-button-bg-color | `string`  | 否   | -      | 确认按钮的背景颜色       | -    |
| cancel-button-color    | `string`  | 否   | -      | 取消按钮的颜色           | -    |
| cancel-button-bg-color  | `string`  | 否   | -      | 取消按钮的背景颜色     - |
| use-content-slot       | `string`  | 否   | -      | 使用自定义内容的 slot    | -    |
| use-actions-slot       | `string`  | 否   | -      | 使用自定义按钮的 slot    | -    |

### 事件 **Events**

| 名称      | 参数列表 | 描述                               | 备注 |
| --------- | -------- | ---------------------------------- | ---- |
| bind:cancel  | -        | 点击取消按钮时触发                 | -    |
| bind:confirm | -        | 点击确认按钮时触发                 | -    |
| bind:close   | -        | 当关闭时触发 | -    |

### 插槽 **Slots**

| 名称    | 说明           | 备注                                   |
| ------- | -------------- | -------------------------------------- |
| default | 内容           | -                                      |
| actions | 自定义按钮插槽 | 当 `use-actions-slot` 为 `true` 时可用 |

### 外部样式类 **External Classes**

| 名称                   | 说明                    | 备注 |
| ---------------------- | ----------------------- | ---- |
| ext-class               | 根节点样式类            | -    |
| ext-popup-class          | popup/ext-class         | -    |
| ext-popup-mask-class      | popup/ext-mask-class    | -    |
| ext-popup-content-class   | popup/ext-content-class | -    |
| ext-inner-class          | 内部样式                | -    |
| ext-title-class          | 标题样式                | -    |
| ext-content-class        | 内容样式                | -    |
| ext-actions-class        | 行为区样式              | -    |
| ext-actions-confirm-class | 确认样式                | -    |
| ext-actions-cancel-class  | 取消样式                | -    |

### CSS 变量 **CSS Variables**

| 变量                                | 默认值               | 说明                 | 备注 |
| ----------------------------------- | -------------------- | -------------------- | ---- |
| `--dialog-popup-mask-bg-color`      | @popup-mask-bg-color | 遮罩背景色           | -    |
| `--dialog-popup-radius`             | @popup-radius        | 弹窗圆角             | -    |
| `--dialog-popup-box-bg-color`       | @popup-box-bg-color  | 弹窗背景色           | -    |
| `--dialog-width`                    | 560rpx               | 组件宽度             | -    |
| `--dialog-min-height`               | 300rpx               | 组件最小高度         | -    |
| `--dialog-inner-padding-v`          | 64rpx                | 内容区垂直方向内边距 | -    |
| `--dialog-inner-padding-h`          | 48rpx                | 内容区水平方向内边距 | -    |
| `--dialog-inner-title-color`        | var(--neutral-color-1, #212121)     | 内容区标题颜色       | -    |
| `--dialog-inner-content-color`      | var(--neutral-color-1, #212121)     | 内容区颜色           | -    |
| `--dialog-actions-height`           | 88rpx                | 按钮区高度           | -    |
| `--dialog-actions-gap`              | 32rpx                | 按钮区按钮间距       | -    |
| `--dialog-actions-border-top-color` | var(--neutral-color-6, #f2f2f2)     | 按钮区上边线颜色     | -    |
| `--dialog-actions-spac`             | 56rpx                | 按钮区按钮内边距     | -    |
| `--dialog-actions-cancel-color`     | rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))         | 按钮区取消按钮颜色   | -    |
