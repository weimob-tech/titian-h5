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

<TabsLink id="ti-tabbar-api" />

## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-tabbar": "titan-ui/tabbar/index",
    "ti-tabbar-item": "titan-ui/tabbar-item/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-tabbar": "platform://titian-mp/ti-tabbar",
    "ti-tabbar-item": "platform://titian-mp/ti-tabbar-item"
  }
}
```

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## 用法示例

#### 基础用法
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-tabbar options="{{ options }}" />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    options: [
      { icon: "home", title: "首页" },
      { icon: "arrange", title: "分类" }
    ]
  }
})
```
</TabItem>
</Tabs>

#### 当前选中项
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-tabbar value="second" options="{{ options }}" />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    options: [
      { icon: "home", title: "首页", value: "first" },
      { icon: "arrange", title: "分类", value: "second" },
    ]
  }
})
```
</TabItem>
</Tabs>

#### 颜色
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-tabbar value="second" options="{{ options }}" active-color="#FF2E2E" color="#2A6AE9" />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    options: [
      { icon: "home", title: "首页", value: "first" },
      { icon: "arrange", title: "分类", value: "second" },
    ]
  }
})
```
</TabItem>
</Tabs>

#### 组合使用
```html tsx showLineNumbers
<ti-tabbar value="{{ 1 }}">
  <ti-tabbar-item icon="home" title="首页" />
  <ti-tabbar-item icon="arrange" title="分类" />
  <ti-tabbar-item icon="cart" title="购物车" />
  <ti-tabbar-item icon="user-account-setting" title="我的" />
</ti-tabbar>
```
#### 图标设置
```html tsx showLineNumbers
<ti-tabbar value="{{ 1 }}">
  <ti-tabbar-item title="首页">
    <ti-icon slot="active-icon" name="tabbar-home-highlight" />
    <ti-icon slot="icon" name="home" />
  </ti-tabbar-item>
  <ti-tabbar-item icon="arrange" title="分类" />
  <ti-tabbar-item icon="cart" title="购物车" />
  <ti-tabbar-item icon="user-account-setting" title="我的" />
</ti-tabbar>
```
## ti-tabbar API
### 属性 **Properties**

| 名称             | 类型                       | 必填 | 默认值 | 说明                                                                          | 备注 |
| ---------------- | -------------------------- | ---- | ------ | ----------------------------------------------------------------------------- | ---- |
| value            | `string` \| `number`       | 否   | `null` | 选中值(匹配 tabbar-item 的 value,若 tabbar-item的value 没有值,则匹配对应下标) | -    |
| placeholder      | `boolean`                  | 否   | `true` | 是否占据高度                                                                  | -    |
| separation       | `border` \| `shadow` \| '' | 否   | -      | 分离内容区样式                                                                | -    |
| options          | `Array<Option>`            | 否   | -      | [Option类型](#tabbaritem-api)和 `TabbarItem` 组件 Properties 一致             | -    |
| safe-area        | `boolean`                  | 否   | true   | 全面屏是否设置安全距离                                                        | -    |
| active-color     | `string`                   | 否   | -      | 选中颜色                                                                      |      |
| color            | `string`                   | 否   | -      | 默认选中                                                                      |      |
| icon-size        | `number`                   | 否   | `0`    | 字体图标大小                                                                  |      |
| title-size       | `number`                   | 否   | `0`    | 文字大小                                                                      |
| ext-style        | `string`                   | 否   | -      | 容器样式                                                                      |
| ext-option-style | `string`                   | 否   | -      | 子项容器样式                                                                  |

### 事件 **Events**

| 名称        | 参数列表                                                       | 描述                                                                 | 备注 |
| ----------- | -------------------------------------------------------------- | -------------------------------------------------------------------- | ---- |
| bind:select | `(e: WechatMiniprogram.CustomEvent<string \| number>) => void` | tabbar选中项，返回值为TabbarItem中value的值，没有value字段，返回索引 | -    |

### 插槽 **Slots**

| 名称    | 说明             | 备注 |
| ------- | ---------------- | ---- |
| default | tabbar-item 组件 | -    |

### 外部样式类 **External Classes**

| 类名             | 说明                  | 备注 |
| ---------------- | --------------------- | ---- |
| ext-class        | 设置容器样式          | -    |
| ext-option-class | 设置 tabbar-item 样式 | -    |

### CSS 变量 **CSS Variable**

| 变量                         | 默认值                                                           | 说明                                                                     | 备注 |
| ---------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------ | ---- |
| --tabbar-padding-v           | `10rpx`                                                          | 内容区垂直方向的内边距                                                   | -    |
| --tabbar-padding-h           | `0rpx`                                                           | 内容区水平方向的内边距                                                   | -    |
| --tabbar-shadow-bg           | `linear-gradient(180deg, rgba(33, 33, 33, 0%) 0%, #212121 100%)` | 内容区投影区背景                                                         | -    |
| --tabbar-shadow-height       | `20rpx`                                                          | 内容区投影区高度                                                         | -    |
| --tabbar-border-top          | `1rpx solid #f2f2f2`                                             | 内容区边线上方边线样式                                                   | -    |
| --tabbar-title-margin-top    | `4rpx`                                                           | 文字距离顶部外边距，同 `tabbar-item` `--tabbar-item-title-margin-top`    | -    |
| --tabbar-title-margin-bottom | `12rpx`                                                          | 文字距离底部外边距，同 `tabbar-item` `--tabbar-item-title-margin-bottom` | -    |
| --tabbar-title-margin-h      | `12rpx`                                                          | 文字水平方向外边距，同 `tabbar-item` `--tabbar-item-title-margin-h`      | -    |

## TabbarItem API
### 属性 **Properties**
| 名称         | 类型     | 必填 | 默认值    | 说明                               | 备注 |
| ------------ | -------- | ---- | --------- | ---------------------------------- | ---- |
| value        | `string` | 否   | -         | 匹配父类 value，当做onSelect返回值 |      |
| icon         | `string` | 否   | -         | 字体图标                           |      |
| title        | `string` | 否   | -         | 标题文字                           |      |
| active-color | `string` | 否   | `#FF2E2E` | 选中颜色                           |      |
| color        | `string` | 否   | `#757575` | 默认颜色                           |      |
| icon-size    | `number` | 否   | `48`      | 字体图标大小                       |      |
| title-size   | `number` | 否   | `20`      | 文字大小                           |      |
| ext-style    | `string` | 否   | -         | 容器样式                           |      |

### 事件 **Events**

| 名称       | 参数列表             | 描述          | 备注 |
| ---------- | -------------------- | ------------- | ---- |
| bind:click | `(e: Event) => void` | tabbar 点击项 | -    |

### 插槽 **Slots**

| 名称         | 说明      | 备注 |
| ------------ | --------- | ---- |
| active-icon  | 选中 icon | -    |
| icon         | 默认 icon | -    |
| active-title | 选中标题  | -    |
| title        | 默认标题  | -    |

### 外部样式类 **External Classes**

| 类名      | 说明         | 备注 |
| --------- | ------------ | ---- |
| ext-class | 设置容器样式 | -    |

### CSS 变量 **CSS Variable**
| 变量                              | 默认值  | 说明               | 备注 |
| --------------------------------- | ------- | ------------------ | ---- |
| --tabbar-background               | `#fff`  | 背景颜色           | ---- |
| --tabbar-item-title-margin-top    | `4rpx`  | 文字距离顶部外边距 | -    |
| --tabbar-item-title-margin-bottom | `12rpx` | 文字距离底部外边距 | -    |
| --tabbar-item-title-margin-h      | `12rpx` | 文字水平方向外边距 | -    |
