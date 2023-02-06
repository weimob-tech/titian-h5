---
title: 标签栏
sidebar_custom_props:
  suffix: Tabbar
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "/#/tabbar"
---

# 标签栏 _Tabbar_
**底部导航栏**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titabbar-api" />

## 安装使用
```typescript showLineNumbers
import { TiTabbar } from '@titian-design/mobile-vue'
```

## 用法示例

#### 基础用法
```html showLineNumbers
<template>
  <TiTabbar :options="options" />
</template>

<script lang="ts" setup>
import { TiTabbar } from '@titian-design/mobile-vue';
const options = [
  { icon: "home", title: "首页", value: "first" },
  { icon: "arrange", title: "分类", value: "second" },
];
</script>
```
#### 当前选中项
```html showLineNumbers
<template>
  <TiTabbar :options="options" value="second" />
</template>

<script lang="ts" setup>
import { TiTabbar } from '@titian-design/mobile-vue';
const options = [
  { icon: "home", title: "首页", value: "first" },
  { icon: "arrange", title: "分类", value: "second" },
];
</script>
```
#### 颜色
```html showLineNumbers
<template>
  <TiTabbar :options="options" value="second" active-color="#FF2E2E" color="#2A6AE9" />
</template>

<script lang="ts" setup>
import { TiTabbar } from '@titian-design/mobile-vue';
const options = [
  { icon: "home", title: "首页", value: "first" },
  { icon: "arrange", title: "分类", value: "second" },
];
</script>
```
#### 组合使用
```html showLineNumbers
<template>
  <TiTabbar :value="1">
    <TiTabbarItem icon="home" title="首页" />
    <TiTabbarItem icon="arrange" title="分类" />
    <TiTabbarItem icon="cart" title="购物车" />
    <TiTabbarItem icon="user-account-setting" title="我的" />
  </TiTabbar>
</template>

<script lang="ts" setup>
import { TiTabbar } from '@titian-design/mobile-vue';
</script>
```
#### 图标设置
```html showLineNumbers
<template>
  <TiTabbar :value="1">
    <TiTabbarItem title="首页">
      <TiIcon slot="active-icon" name="tabbar-home-highlight" />
      <TiIcon slot="icon" name="home" />
    </TiTabbarItem>
    <TiTabbarItem icon="arrange" title="分类" />
    <TiTabbarItem icon="cart" title="购物车" />
    <TiTabbarItem icon="user-account-setting" title="我的" />
  </TiTabbar>
</template>

<script lang="ts" setup>
import { TiTabbar , TiIcon } from '@titian-design/mobile-vue';
</script>
```
## TiTabbar API
### 属性 **Properties**

| 名称           | 类型                       | 必填 | 默认值 | 说明                                                                          | 备注 |
| -------------- | -------------------------- | ---- | ------ | ----------------------------------------------------------------------------- | ---- |
| value          | `string` \| `number`       | 否   | `null` | 选中值(匹配 tabbar-item 的 value,若 tabbar-item的value 没有值,则匹配对应下标) | -    |
| placeholder    | `boolean`                  | 否   | `true` | 是否占据高度                                                                  | -    |
| separation     | `border` \| `shadow` \| "" | 否   | -      | 分离内容区样式                                                                | -    |
| options        | `Array<Option>`            | 否   | -      | [Option类型](#tabbaritem-api)和 `TabbarItem` 组件 Properties 一致             | -    |
| safe-area       | `boolean`                  | 否   | `true` | 全面屏是否设置安全距离                                                        | -    |
| active-color    | `string`                   | 否   | -      | 选中颜色                                                                      |      |
| color          | `string`                   | 否   | -      | 默认选中                                                                      |      |
| icon-size       | `number`                   | 否   | `0`    | 字体图标大小                                                                  |      |
| title-size      | `number`                   | 否   | `0`    | 文字大小                                                                      |
| ext-style       | `string`                   | 否   | -      | 容器样式                                                                      |
| ext-option-style | `string`                   | 否   | -      | 子项容器样式                                                                  |

### 事件 **Events**

| 名称     | 参数列表                                     | 描述                                                                 | 备注 |
| -------- | -------------------------------------------- | -------------------------------------------------------------------- | ---- |
| select | `(e: CustomEvent<string | number>) => void` | tabbar选中项，返回值为TabbarItem中value的值，没有value字段，返回索引 | -    |

### 插槽 **Slots**

| 名称    | 说明             | 备注 |
| ------- | ---------------- | ---- |
| default | tabbar-item 组件 | -    |

### 外部样式类 **External Classes**

| 类名           | 说明                  | 备注 |
| -------------- | --------------------- | ---- |
| ext-class       | 设置容器样式          | - |
| ext-option-class | 设置 tabbar-item 样式 | - |

### CSS 变量 **CSS Variable**
| 变量                         | 默认值                                                           | 说明                                                                     | 备注 |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ---- |
| --tabbar-padding-v           | `10px`                                                           | 内容区垂直方向的内边距                                                   | -    |
| --tabbar-padding-h           | `0px`                                                            | 内容区水平方向的内边距                                                   | -    |
| --tabbar-shadow-bg           | `linear-gradient(180deg, rgba(33, 33, 33, 0%) 0%, #212121 100%)` | 内容区投影区背景                                                         | -    |
| --tabbar-shadow-height       | `20px`                                                           | 内容区投影区高度                                                         | -    |
| --tabbar-border-top          | `1px solid #f2f2f2`                                              | 内容区边线上方边线样式                                                   | -    |
| --tabbar-title-margin-top    | `4px`                                                            | 文字距离顶部外边距，同 `tabbar-item` `--tabbar-item-title-margin-top`    | -    |
| --tabbar-title-margin-bottom | `12px`                                                           | 文字距离底部外边距，同 `tabbar-item` `--tabbar-item-title-margin-bottom` | -    |
| --tabbar-title-margin-h      | `12px`                                                           | 文字水平方向外边距，同 `tabbar-item` `--tabbar-item-title-margin-h`      | -    |

## TabbarItem API
### 属性 **Properties**
| 名称        | 类型     | 必填 | 默认值    | 说明                               | 备注 |
| ----------- | -------- | ---- | --------- | ---------------------------------- | ---- |
| value       | `string` | 否   | -         | 匹配父类 value，当做onSelect返回值 | -    |
| icon        | `string` | 否   | -         | 字体图标                           | -    |
| title       | `string` | 否   | -         | 标题文字                           | -    |
| activeColor | `string` | 否   | `#FF2E2E` | 选中颜色                           | -    |
| color       | `string` | 否   | `#757575` | 默认颜色                           | -    |
| iconSize    | `number` | 否   | `48`      | 字体图标大小                       | -    |
| titleSize   | `number` | 否   | `20`      | 文字大小                           | -    |
| extStyle    | `string` | 否   | -         | 容器样式                           | -    |

### 事件 **Events**

| 名称    | 参数列表             | 描述          | 备注 |
| ------- | -------------------- | ------------- | ---- |
| onClick | `(e: Event) => void` | tabbar 点击项 | -    |

### 插槽 **Slots**

| 名称        | 说明      | 备注 |
| ----------- | --------- | ---- |
| activeIcon  | 选中 icon | -    |
| icon        | 默认 icon | -    |
| activeTitle | 选中标题  | -    |
| title       | 默认标题  | -    |

### 外部样式类 **External Classes**

| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 设置容器样式 | -    |

### CSS 变量 **CSS Variable**
| 变量                              | 默认值 | 说明               | 备注 |
| --------------------------------- | ------ | ------------------ | ---- |
| --tabbar-background               | `#fff`  | 背景颜色           | ---- |
| --tabbar-item-title-margin-top    | `4px`  | 文字距离顶部外边距 | -    |
| --tabbar-item-title-margin-bottom | `12px` | 文字距离底部外边距 | -    |
| --tabbar-item-title-margin-h      | `12px` | 文字水平方向外边距 | -    |
