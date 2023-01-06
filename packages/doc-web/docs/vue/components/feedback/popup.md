---
title: 弹出层
sidebar_custom_props:
  suffix: Popup
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/popup"
---

# 弹出层 _Popup_

**弹出层容器，用于展示弹窗等信息。提供 popup 与 popoup-titlebar 2个组件，可以单独配置。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tipopup-api" />

## 安装使用

```ts showLineNumbers
import { TiPopup, TiPopupTitlebar } from 'titian-h5-vue';
```

## 用法示例

#### 基本用法

```html showLineNumbers
<template>
  <TiPopup 
    :visible="visible" 
    :close-on-mask="true"
    @close="onClose"
    position="bottom"
  >
    <div>内容演示</div>
  </TiPopup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiPopup } from 'titian-h5-vue';

const visible = useRef(true);
const onClose = () => {
  visible.value = false;
}
</script>
```

#### 使用 `TiPopupTitlebar`

```html showLineNumbers
<template>
  <TiPopup 
    :visible="visible" 
    :close-on-mask="true" 
    @close="onClose" 
    position="bottom"
  >
    <TiPopupTitlebar
      title="标题"
      sub-title="副标题"
      confirm-text="确认"
      cancel-text="取消"
      variant="with-confirm"
      @cancel="onClose"
      @confirm="onClose"
    />
    <div>内容演示</div>
  </TiPopup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiPopup, TiPopupTitlebar } from 'titian-h5-vue';

const visible = useRef(true);
const onClose = () => {
  visible.value = false;
}
</script>
```


#### 阻止滚动穿透 - 方式 1

:::note
通过配置 `preventScroll` 属性，在打开弹窗时，设置 `document.body.style.overflow = 'hidden'`，从而实现阻止滚动穿透；

对于需要滚动的区域，使用 CSS 属性 `overflow-y: auto` 实现。
:::

```html showLineNumbers
<template>
  <TiPopup 
    :visible="visible" 
    :close-on-mask="true"
    @close="onClose" 
    position="bottom"
    :prevent-scroll="true"
    disable-global-touch-move="false"
  >
    <div>阻止滚动区域</div>
        
    <div :style="{ height: '100px', overflowY: 'auto'}">
      <div id="demo1" :style="{ height: '200px'}">
          可滚动区域，不会穿透
      </div>
    </div>
  </TiPopup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiPopup, TiScrollView } from 'titian-h5-vue';

const visible = useRef(true);
const onClose = () => {
  visible.value = false;
}
</script>
```

#### 阻止滚动穿透 - 方式 2

:::note
通过配置 `disableGlobalTouchMove` 属性为 true，在打开弹窗时，禁用全局 `touch` 事件，从而实现阻止滚动穿透；

对于需要滚动的区域，使用 `<TiScrollView/>` 组件实现。
:::

```html showLineNumbers
<template>
  <TiPopup 
    :visible="visible" 
    :close-on-mask="true"
    @close="onClose" 
    position="bottom"
    :prevent-scroll="false"
    :disable-global-touch-move="true"
  >
    <div>阻止滚动区域</div>
        
    <TiScrollView scroll-y ext-style="--scroll-view-height: 100px;">
      <div id="demo1" :style="{ height: '200px'}">
          可滚动区域，不会穿透
      </div>
    </TiScrollView>
  </TiPopup>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiPopup, TiScrollView } from 'titian-h5-vue';

const visible = useRef(true);
const onClose = () => {
  visible.value = false;
}
</script>
```


## TiPopup API

### 属性 **Properties**

| 名称                   | 类型      | 必填 | 默认值   | 说明                                                                                                 | 备注 |
| ---------------------- | --------- | ---- | -------- | ---------------------------------------------------------------------------------------------------- | ---- |
| mask-z-index           | `number`  | 否   | 10000    | 遮罩 z-index 层级                                                                                    | -    |
| content-z-index        | `number`  | 否   | 10001    | 内容 z-index 层级                                                                                    | -    |
| has-mask               | `boolean` | 否   | true     | 是否显示遮罩                                                                                         | -    |
| visible                | `boolean` | 否   | false    | 是否显示弹出层                                                                                       | -    |
| preventScroll          | `boolean` | 否   | true     | 是否锁定背景滚动。实现上采用 document.body.style.overflow = 'hidden' 方式，内部可以滚动。            | -    |
| disableGlobalTouchMove | `boolean` | 否   | false    | 是否锁定背景滚动。实现上禁用了全局 touch 事件方式；内部需要配合 `<TiScrollView/>` 组件实现滚动能力。 | -    |
| close-on-mask          | `boolean` | 否   | true     | 是否在点击遮罩层后关闭                                                                               | -    |
| timeout                | `number`  | 否   | 300      | 动画时间，默认单位为 ms                                                                              | -    |
| timing-function        | `string`  | 否   | `linear` | 动画效果，即 CSS 的属性                                                                              | -    |
| position               | `string`  | 否   | `center` | 弹出位置，可选值为 `top` `bottom` `right` `left` `center`                                            | -    |
| ext-mask-style         | `string`  | 否   | -        | 自定义遮罩层样式                                                                                     | -    |
| ext-content-style      | `string`  | 否   | -        | 自定义弹出层样式                                                                                     | -    |
| transition             | `string`  | 否   | -        | 过渡动画类型                                                                                         | -    |
| destroy-on-close       | `boolean` | 否   | false    | 关闭后是否销毁-                                                                                      | -    |
| safe-area              | `boolean` | 否   | true     | 使用底部安全栏                                                                                       | -    |
| teleport        | `Element` | 否   | document.body     | DOM 挂载节点                                            | -    |


### 事件 **Events**

| 事件名  | 返回值 | 描述               | 备注 |
| ------- | ------ | ------------------ |
| show    | -      | 弹窗展示时触发     | -    |
| close   | -      | 点击遮罩关闭时触发 | -    |
| enter   | -      | 入场动画开始时触发 | -    |
| entered | -      | 入场动画结束时触发 | -    |
| exit    | -      | 出场动画开始时触发 | -    |
| exited  | -      | 出场动画结束时触发 | -    |


### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称              | 说明             | 备注 |
| ----------------- | ---------------- | ---- |
| ext-class         | 内容区容器样式类 | -    |
| ext-content-class | 内容区样式类     | -    |
| ext-mask-class    | 蒙层样式类       | -    |

### CSS 变量 **CSS Variables**

| 变量                  | 默认值                          | 说明             | 备注 |
| --------------------- | ------------------------------- | ---------------- | ---- |
| --popup-mask-bg-color | var(--neutral-color-1, #212121) | 蒙层背景色       | -    |
| --popup-mask-opacity  | 0.8                             | 蒙层背景色透明度 | -    |
| --popup-radius        | @radius-16                      | 内容区圆角       | -    |
| --popup-vertical-width  | 100% | 内容区宽度；position 为 `up`\|`bottom` 时生效     | -    |
| --popup-vertical-min-height  | 200px | 内容区最小高度；position 为 `up`\|`bottom` 时生效     | -    |
| --popup-vertical-max-height  | calc(100% - 200px) | 内容区最大高度；position 为 `up`\|`bottom` 时生效     | -    |
| --popup-horizontal-height  | 100vh     | 内容区高度；position 为 `left`\|`right` 时生效     | -    |
| --popup-horizontal-min-width  | 50px | 内容区最小宽度；position 为 `left`\|`right` 时生效      | -    |
| --popup-horizontal-max-width  | 100% | 内容区最大宽度；position 为 `left`\|`right` 时生效      | -    |



## TiPopupTitlebar API

### 属性 **Properties**

| 名称         | 类型     | 必填 | 默认值       | 说明                             | 备注          |
| ------------ | -------- | ---- | ------------ | -------------------------------- | ------------- |
| title        | `string` | 否   | -            | 标题                             | -             |
| sub-title    | `string` | 否   | -            | 副标题                           | -             |
| variant      | `string` | 否   | with-confirm | 标题栏类型，可选值`with-confirm` | `cancel-only` | `mini-close`，见下表 | - |
| confirm-text | `string` | 否   | '确定'       | 确认按钮的文案                   | -             |
| cancel-text  | `string` | 否   | '取消'       | 取消按钮的文案                   | -             |
| ext-style    | `string` | 否   | -            | 根节点样式                       | -             |

#### `variant` 枚举含义：

| 值             | 含义           |
| -------------- | -------------- |
| `with-confirm` | 标题+确定+取消 |
| `cancel-only`  | 标题+关闭      |
| `mini-close`   | 仅关闭         |

### 事件 **Events**

| 事件名  | 返回值 | 描述               | 备注 |
| ------- | ------ | ------------------ |
| cancel  | -      | 点击关闭按钮时触发 | -    |
| confirm | -      | 点击确认按钮时触发 | -    |
| close   | -      | 点击关闭按钮时触发 | -    |


### CSS 变量 **CSS Variables**

| 变量                                 | 默认值                                                           | 说明              | 备注 |
| ------------------------------------ | ---------------------------------------------------------------- | ----------------- | ---- |
| --popup-title-bar-confirm-color      | rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25)) | 确认按钮颜色      | -    |
| --popup-title-bar-cancel-color       | var(--neutral-color-2, #757575)                                  | 取消按钮颜色      | -    |
| --popup-title-bar-back-color         | var(--neutral-color-2, #757575)                                  | 返回按钮颜色      | -    |
| --popup-title-bar-mini-close-padding | 36px 36px 36px 0                                                 | 关闭按钮的padding | -    |