---
title: 过渡动画
sidebar_custom_props:
  suffix: Transition
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/transition"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 过度动画 _Transition_

通过使用 transition 给元素添加进入、离开的动画效果。

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titransition-api" />

## 安装使用

```typescript showLineNumbers
import { TiTransition } from '@titian-design/mobile-vue';
```

## 用法示例

```html showLineNumbers
<template>
  <TiTransition
    :show="show"
    :name="effectName"
    ext-class="demo-block"
  >
    <div >内容</div>
  </TiTransition>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiTransition } from '@titian-design/mobile-vue';

const show = ref(false);
const effectName = ref('fade');
</script>
<style>
  .demo-block {
    position: fixed;
    top: 100px;
    left: 0px;
    right: 0px;
    margin: auto;
    width: 100px;
    height: 100px;
    border: 1px solid red;
    line-height: 100px;
    text-align: center;
  }
</style>
```

## TiTransition API

### 属性 **Properties**

| 名称            | 类型                 | 是否必填 | 默认值 | 说明               | 备注 |
| --------------- | -------------------- | -------- | ------ | ------------------ | ---- |
| name            | `string`             | 是       | -      | 过渡动画类型       | -    |
| enter-name      | `string`             | 否       | -      | 入场动画类型       | -    |
| exit-name       | `string`             | 否       | -      | 出场动画类型       | -    |
| show            | `boolean`            | 否       | false  | 是否显示过渡动画   | -    |
| duration        | `number` \| `object` | 否       | -      | 过渡动画持续时间   | -    |
| destroy-on-exit | `boolean`            | 否       | false  | 出场后是否移除节点 | -    |
| timing-function | `string`             | 否       | -      | 动画加速度曲线     | -    |

#### 过渡动画类型

| 名称        | 说明         | 备注 |
| ----------- | ------------ | ---- |
| fade        | 淡入淡出     | -    |
| fade-down   | 从下淡入淡出 | -    |
| fade-up     | 从上淡入淡出 | -    |
| fade-left   | 从左淡入淡出 | -    |
| fade-right  | 从右淡入淡出 | -    |
| slide-down  | 从下滑入滑出 | -    |
| slide-up    | 从上滑入滑出 | -    |
| slide-left  | 从左滑入滑出 | -    |
| slide-right | 从右滑入滑出 | -    |


### 事件 **Events**

| 名称     | 参数列表 | 描述                 | 备注 |
| -------- | -------- | -------------------- | ---- |
| enter    | -        | 入场动画开始时触发   | -    |
| entering | -        | 入场动画进行中时触发 | -    |
| entered  | -        | 入场动画结束时触发   | -    |
| exit     | -        | 出场动画开始时触发   | -    |
| exiting  | -        | 出场动画进行中时触发 | -    |
| exited   | -        | 出场动画结束时触发   | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称         | 说明                                                                                                                                                    | 备注 |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| ext-class    | 根节点可扩展的类名                                                                                                                                      | -    |
| enter        | 定义开始入场时的过渡状态。存在于 transition 节点被插入或者被展示的前一帧，之后会被删掉                                                                  | -    |
| enter-active | 定义入场生效时的状态。在整个入场阶段中应用，在元素被插入之前生效，在过渡/动画完成之后会被移除。这个类可以被用来定义进入过渡的过程时间，延迟和曲线函数。 | -    |
| enter-done   | 定义入场的结束状态。在元素被插入之后下一帧生效 (与此同时 enter 会被移除)，并在过渡/动画完成之后移除。                                                   | -    |
| exit         | 定义出场开始状态。在触发出场状态时立刻生效，并在下一帧被移除。                                                                                          | -    |
| exit-active  | 定义出场生效时的状态。在整个出场过渡的阶段中应用，在触发出场时立刻生效，在出场完成之后移除。这个类可以被用来定义离开过渡的过程时间，延迟和曲线函数。    | -    |
| exit-done    | 定义出场的结束状态。在触发出场之后下一帧生效 (与此同时 exit 被删除)，并在出场完成之后移除。                                                             | -    |

