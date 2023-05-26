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

## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-navbar": "{{packageWeappName}}/navbar/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-navbar": "platform://titian-mp/ti-navbar"
  }
}
```

## 用法示例
#### 基础用法
```html showLineNumbers
<ti-navbar title="标题" />
<ti-navbar title="标题" subtitle="副标题" />
```

#### 沉浸式
方式一：监听页面的onPageScroll
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-navbar id="titian-navbar" title="标题" type="immersion" />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  onReady() {
    this._navbar = this.selectComponent('#titian-navbar');
  },
  onPageScroll(e) {
    this._navbar.updateOpacity({ scrollTop: e.scrollTop });
  }
})
```
</TabItem>
</Tabs>

方式二：配合scroll-view，使用微信小程序[滚动驱动动画](https://developers.weixin.qq.com/miniprogram/dev/framework/view/animation.html#%E6%BB%9A%E5%8A%A8%E9%A9%B1%E5%8A%A8%E7%9A%84%E5%8A%A8%E7%94%BB)，避免了onPageScroll监听，此方式性能更好。
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers

<ti-navbar id="titian-navbar" title="标题" type="immersion" />
<scroll-view id="scroller" scroll-x="false" scroll-y style="height: 100vh">
  页面内容
</scroll-view>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  onReady() {
    this._navbar = this.selectComponent('#titian-navbar');
    this._navbar.scrollAnimate(this, '#titian-navbar', '#scroller');
  }
})
```
</TabItem>
</Tabs>


#### 毛玻璃效果
**在没有占位的情况下有效，沉浸式模式默认没有占位**
```html showLineNumbers
<ti-navbar title="标题" use-placeholder="{{false}}" frosted-glass />
<ti-navbar title="标题" type="immersion" frosted-glass />
```

#### 使用回到首页按钮
```html showLineNumbers
<ti-navbar title="标题" use-home-button home-path="YOUR_HOME_PATH"  bind:back="back" />
```

#### 自定义返回按钮和回到首页按钮的事件

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-navbar title="标题" back-delta="{{0}}" use-home-button bind:back="back" bind:home="home" />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  back() { wx.navigateBack();},
  home() { wx.reLaunch() }
})
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
    <ti-tabs tabs="{{ ['全部', '热销'] }}" ext-style="width: 160px;--tabs-background-color: transparent" />
  </view>
</ti-navbar>
```

#### 针对软键盘弹起时，自定义导航栏被推出页面，提供两种解决方案
:::info 注意：
1. 优先使用方案一。
2. 同时存在input和textarea的情况下，bind:keyboardheightchange事件会互相影响（微信的bug），可以将所有的bind:keyboardheightchange更换为bind:focus。
3. 在只有input或者textarea的情况下，建议用bind:keyboardheightchange，在ios上触发时机更早，页面上滑效果和软件盘弹起更同步一些。
:::

方案一：将input的adjust-position设置false，不上推页面，动态修改滚动页面的scrollTop。

:::info 注意：
1. 采用此方案时，如果页面的滚动高度不够，需要添加一个占位元素，如下面示例的：
```<view style="height: {{ placeholderHeight }}px" />```
:::

1.滚动容器为普通页面
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-navbar title="标题" />
<view>
  滚动区域
  <ti-input id="titian-input" adjust-position="{{ false }}" bind:keyboardheightchange="bindkeyboardheightchange" bind:blur="bindblur" />
  <view style="height: {{ placeholderHeight }}px" />
</view>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    placeholderHeight: 0
  },
  onReady() {
    this._navbar = this.selectComponent('#titian-navbar');
  },
  onPageScroll(e) {
    this._currentScrollTop = e.scrollTop;
  }
  bindkeyboardheightchange(e) {
    const detail = {
      selector: `#${e.target.id}`,
      height: e.detail.height,
      currentScrollTop: this._currentScrollTop
    }
    // 如果input不是titian组件，需添加detail.isTitian = false
    // 如果修改了input的cursorSpacing，需添加detail.cursorSpacing = xxx
    this.updateScrollTop(detail);
  },
  bindblur() {
    this.updateScrollTop({ height: 0 });
  },
  updateScrollTop(detail) {
    this._navbar.getScrollTop(detail).then(({ scrollTop, placeholderHeight }) => {
      // 如果页面的滚动高度足够，没有添加占位元素。这里不需要设置placeholderHeight，可以直接wx.pageScrollTo({ scrollTop })
      this.setData({ height: placeholderHeight }, () => {
        wx.pageScrollTo({ scrollTop });
      });
    });
  }
})
```
</TabItem>
</Tabs>

2.滚动容器为scroll-view
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-navbar title="标题" />
<scroll-view scroll-top="{{ scrollTop }}" bind:scroll="bindscroll">
  滚动区域
  <ti-input id="titian-input" adjust-position="{{ false }}" bind:keyboardheightchange="bindkeyboardheightchange" bind:blur="bindblur" />
  <view style="height: {{ placeholderHeight }}px" />
</scroll-view>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    placeholderHeight: 0,
    scrollTop: 0
  },
  onReady() {
    this._navbar = this.selectComponent('#titian-navbar');
  },
  bindscroll(e) {
    this._currentScrollTop = e.detail.scrollTop;
  }
  bindkeyboardheightchange(e) {
    const detail = {
      selector: `#${e.target.id}`,
      height: e.detail.height,
      currentScrollTop: this._currentScrollTop
    }
    // 如果输入控件不是titian组件，需添加detail.isTitian = false
    // 如果修改了input的cursorSpacing，需添加detail.cursorSpacing = xxx
    this.updateScrollTop(detail);
  },
  bindblur() {
    this.updateScrollTop({ height: 0 });
  },
  updateScrollTop(detail) {
    this._navbar.getScrollTop(detail).then(({ scrollTop, placeholderHeight }) => {
      // 如果页面的滚动高度足够，没有添加占位元素。这里不需要设置placeholderHeight，可以直接wx.pageScrollTo({ scrollTop })
      this.setData({ height: placeholderHeight }, () => {
        this.setData({ scrollTop });
      });
    });
  }
})
```
</TabItem>
</Tabs>

方案二：默认上推页面，将navbar动态定位。（备用）

:::info 注意：
1. 此方案不适用于输入控件为textarea的情况，原因是多行输入框，当光标聚焦在任意一行时，页面上推的高度无法计算出来。
:::

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-navbar id="titian-navbar" title="标题" />
<view>
  滚动区域
  <ti-input id="titian-input" bind:keyboardheightchange="bindkeyboardheightchange" bind:blur="bindblur" />
</view>
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  onReady() {
    this._navbar = this.selectComponent('#titian-navbar');
  },
  bindkeyboardheightchange(e) {
    const detail = {
      selector: `#${e.target.id}`,
      height: e.detail.height,
    }
    // 如果input不是titian组件，需添加detail.isTitian = false
    // 如果修改了input的cursorSpacing，需添加detail.cursorSpacing = xxx
    this._navbar.updateFixedTop(detail);
  },
  bindblur() {
    this._navbar.updateFixedTop({height: 0});
  }
})
```
</TabItem>
</Tabs>

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
| use-placeholder      | `boolean`                            | 否   | true     | 是否自动产生一个占位，可以避免导航栏遮盖下面的元素                                               | -          |
| use-back-button      | `boolean`                            | 否   | true     | 使用组件内部返回按钮                                                                             | -          |
| back-delta           | `number`                             | 否   | 1        | 返回的页面数，在use-back-button为true时有效；设置为0时，可以监听bind:back，自定义返回功能       | 小程序专属 |
| use-home-button      | `boolean`                            | 否   | false    | 使用组件内部回到首页按钮                                                                         | -          |
| home-path            | `string`                             | 否   | -        | 首页地址，在use-home-button为true时有效；不设置home-path，可以监听bind:home，自定义回到首页功能 | 小程序专属 |
| transition-distance  | `number`                             | 否   | 100      | 沉浸式模式下，滑动指定距离，标题部分从透明至完全显示                                             | -          |
| transition-start-top | `number`                             | 否   | 50       | 沉浸式模式下，动画开始的起始距离                                                                 | -          |
| frosted-glass        | `boolean`                            | 否   | false    | 毛玻璃效果，在usePlaceholder为false 或者 沉浸式模式下有效                                        | -          |
| subtitle-height      | `number`                             | 否   | -        | 使用了subtitle的插槽的情况下，副标题内容高度，此时subtitleHeight为必传                           | -          |
| loading              | `boolean`                            | 否   | false    | 是否使用loading                                                                                  | -          |
| ext-style            | `string` \| `Record<string, string>` | 否   | -        | 根节点样式                                                                                       | -          |
### 事件 **Events**
| 名称            | 参数列表                                                         | 描述                       | 备注 |
| --------------- | ---------------------------------------------------------------- | -------------------------- | ---- |
| bind:click-icon | `(e: WechatMiniprogram.CustomEvent<{iconName: string}>) => void` | 点击左侧或者右侧icon时触发 | -    |
| bind:back       | `(e: WechatMiniprogram.CustomEvent<{iconName: string}>) => void` | 点击默认返回按钮时触发     | -    |
| bind:home       | `(e: WechatMiniprogram.CustomEvent<{iconName: string}>) => void` | 点击默认回到首页按钮时触发 | -    |

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
