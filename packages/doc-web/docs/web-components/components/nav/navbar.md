---
title: 导航栏
sidebar_custom_props:
  suffix: Navbar
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/navbar"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 导航栏 _Navbar_
**为页面提供导航功能，用于页面顶部**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-navbar-api" />


## 用法示例
#### 基础用法
```html showLineNumbers
<ti-navbar title="标题" />
<ti-navbar title="标题" subtitle="副标题" />
```

#### 沉浸式
方式一：监听页面的onPageScroll
<Tabs>
<TabItem value="html" label="index.html">

```html showLineNumbers
<div id="scroll-view">
  <ti-navbar id="titian-navbar" title="标题" type="immersion" />
  滚动区域
</div>

```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
window.onload=function(){
  var box = document.getElementById("scroll-view");
  var navbar = document.getElementById("titian-navbar");
  box.addEventListener("scroll", (event) => {
    navbar.updateOpacity({ scrollTop: event.target.scrollTop })
  })
}
```
</TabItem>
</Tabs>

#### 毛玻璃效果
**在没有占位的情况下有效，沉浸式模式默认没有占位**
```html showLineNumbers
<ti-navbar title="标题" use-placeholder="false" frosted-glass />
<ti-navbar title="标题" type="immersion" frosted-glass />
```

#### 使用回到首页按钮
```html showLineNumbers
<ti-navbar title="标题" use-home-button />
```

#### 自定义返回按钮和回到首页按钮的事件

<Tabs>
<TabItem value="html" label="index.html">

```html showLineNumbers
<ti-navbar id="titian-navbar" title="标题" use-home-button />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
window.onload=function(){
  var navbar = document.getElementById("titian-navbar");
  navbar.addEventListener("back", () => {})
  navbar.addEventListener("home", () => {})
}
```
</TabItem>
</Tabs>

#### 自定义左侧icon
```html showLineNumbers
// 城市选择
<ti-navbar title="标题">
  <view slot="prefix">城市<ti-icon name="arrow-down" /></view>
</ti-navbar>

// 自定义返回
<ti-navbar title="标题">
  <view slot="prefix"><ti-icon name="arrow-back" />返回</view>
</ti-navbar>

// 自定义搜索
<ti-navbar title="标题">
  <view slot="prefix"><ti-icon name="search" />搜索 </view>
</ti-navbar>

// 自定义title
<ti-navbar>
  <view slot="title">
    <ti-tabs ext-style="width: 160px;--tabs-background-color: transparent" />
  </view>
</ti-navbar>
```

## ti-navbar API
### 属性 **Properties** 

| 名称                 | 类型                                 | 必填 | 默认值   | 说明                                                                                             | 备注       |
| -------------------- | ------------------------------------ | ---- | -------- | ------------------------------------------------------------------------------------------------ | ---------- |
| type                 | `string`                             | 否   | `normal` | 导航栏的风格，常规模式：`normal` 沉浸式：`immersion`                                             | -          |
| background           | `string`                             | 否   | -        | 导航栏的背景，可设置颜色，渐变色，图片，同css属性background用法                                  | -          |
| font-color           | `string`                             | 否   | -        | 导航条前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000                        | -          |
| title                | `string`                             | 否   | -        | 导航栏的标题                                                                                     | -          |
| subtitle             | `string`                             | 否   | -        | 导航栏的副标题                                                                                   | -          |
| left-icons           | `array`                              | 否   | -        | 导航栏左侧图标集合                                                                               | -          |
| right-icons          | `array`                              | 否   | -        | 导航栏右侧图标集合                                                                               | H5专属 |
| use-placeholder      | `boolean`                            | 否   | true     | 是否自动产生一个占位，可以避免导航栏遮盖下面的元素                                               | -          |
| use-back-button      | `boolean`                            | 否   | true     | 使用组件内部返回按钮                                                                             | -          |
| use-home-button      | `boolean`                            | 否   | false    | 使用组件内部回到首页按钮                                                                         | -          |
| transition-distance  | `number`                             | 否   | 100      | 沉浸式模式下，滑动指定距离，标题部分从透明至完全显示                                             | -          |
| transition-start-top | `number`                             | 否   | 50       | 沉浸式模式下，动画开始的起始距离                                                                 | -          |
| frosted-glass        | `boolean`                            | 否   | false    | 毛玻璃效果，在usePlaceholder为false 或者 沉浸式模式下有效                                        | -          |
| subtitle-height      | `number`                             | 否   | -        | 使用了subtitle的插槽的情况下，副标题内容高度，此时subtitleHeight为必传                           | -          |
| loading              | `boolean`                            | 否   | false    | 是否使用loading                                                                                  | -          |
| ext-style            | `string` \| `Record<string, string>` | 否   | -        | 根节点样式                                                                                       | -          |
### 事件 **Events**
| 名称            | 参数列表                                                         | 描述                       | 备注 |
| --------------- | ---------------------------------------------------------------- | -------------------------- | ---- |
| bind:click-icon | `(e: CustomEvent<{iconName: string}>) => void` | 点击左侧或者右侧icon时触发 | -    |
| bind:back       | `(e: CustomEvent<{iconName: string}>) => void` | 点击默认返回按钮时触发     | -    |
| bind:home       | `(e: CustomEvent<{iconName: string}>) => void` | 点击默认回到首页按钮时触发 | -    |

### 插槽 **Slots**

| 名称   | 说明                   | 备注   |
| ------ | ---------------------- | ------ |
| prefix | 导航栏左侧图标位置插槽 | -      |
| title  | 导航栏中间标题位置插槽 | -      |
| suffix | 导航栏右侧位置插槽     | H5专属 |

### 外部样式类 **External Classes**

| 名称               | 说明           | 备注 |
| ------------------ | -------------- | ---- |
| ext-title-class    | 标题样式类名   | -    |
| ext-subtitle-class | 副标题样式类名 | -    |
| ext-class          | 根节点样式类名 | -    |

### CSS 变量 **CSS Variable**
| 变量                        | 默认值     | 说明                                | 备注 |
| --------------------------- | ---------- | ----------------------------------- | ---- |
| --navbar-title-font-size    | 34rpx      | 标题字号                            | -    |
| --navbar-title-color        | #000000    | 标题颜色，仅支持 #ffffff 和 #000000 | -    |
| --navbar-title-max-width    | 346rpx     | 标题最大宽度                        | -    |
| --navbar-subtitle-font-size | 24rpx      | 副标题字号                          | -    |
| --navbar-subtitle-color     | #9e9e9e    | 副标题颜色                          | -    |
| --navbar-padding-h          | 16rpx      | 导航栏水平方向内边距                | -    |
| --navbar-background         | #ffffff    | 导航栏背景                          | ---- |
| --navbar-backdrop-filter    | blur(15px) | 毛玻璃效果的虚化程度                | -    |
| --navbar-menu-background    | -          | 左侧自定义的胶囊按钮的背景色        | -    |
| --navbar-menu-border-color  | -          | 左侧自定义的胶囊按钮的边框颜色      | -    |
