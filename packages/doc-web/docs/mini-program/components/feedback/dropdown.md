---
title: 下拉菜单
sidebar_custom_props: 
    suffix: DropdownMenu
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/dropdown'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 下拉菜单 _DropdownMenu_

** 下拉菜单是可切换的上下文叠加，用于显示链接列表等, 可以支持多种类型的下拉菜单。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-dropdown-menu-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-dropdown-item": "@titian-design/weapp/dropdown-item/index",
    "ti-dropdown-menu": "@titian-design/weapp/dropdown-menu/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-dropdown-item": "platform://titian-weapp/ti-dropdown-item",
    "ti-dropdown-menu": "platform://titian-weapp/ti-dropdown-menu"
  }
}
```

## 用法示例

### 基本使用

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item title="标题1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
</ti-dropdown-menu>

<ti-dropdown-menu direction="up">
  <ti-dropdown-item title="标题1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### 设置选中值

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item value="{{value}}" title="有选中值" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    value: '1,2',
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### 禁用点击

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item disabled title="禁用标题点击" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>

<ti-dropdown-menu disabled>
  <ti-dropdown-item title="禁用所有Item点击" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="禁用所有Item点击" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### 操作遮罩

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item has-mask="{{false}}" title="不显示遮罩" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>

<ti-dropdown-menu has-mask="{{false}}">
  <ti-dropdown-item title="不显示遮罩1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="不显示遮罩2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>

<ti-dropdown-menu>
  <ti-dropdown-item close-on-mask="{{false}}" title="关闭遮罩点击事件" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>

<ti-dropdown-menu close-on-mask="{{false}}">
  <ti-dropdown-item title="关闭遮罩点击事件" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### 修改选择后的整体色调

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item active-color="red" title="标题1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>

<ti-dropdown-menu active-color="red">
  <ti-dropdown-item title="标题1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### submit 模式

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item bind:submit="handleSubmit" has-submit submit-text="提交" title="标题1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### 自定义选择后的图标、选择类型、以及是否是多选类型

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item title="自定义图标" options="{{dropMenuOptions}}" icon="plus" />
  <ti-dropdown-item title="使用 switch" options="{{dropMenuOptions}}" type="switch" />
  <ti-dropdown-item mode="multiple" title="多选" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
   data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
});
```

</TabItem>
</Tabs>

#### 事件操作

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item bind:close="handleClose" bind:open="handleOpen" bind:change="handleChange" title="标题1" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题2" options="{{dropMenuOptions}}" />
  <ti-dropdown-item bind:submit="handleSubmit" has-submit submit-text="提交" title="标题2" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
  handleClose(e) {
    console.log('关闭: ', e);
  },
  handleOpen(e) {
    console.log('打开: ', e);
  },
  handleChange(e) {
    console.log('切换: ', e);
  },
  handleSubmit(e) {
    console.log('提交: ', e);
  },
});
```

</TabItem>
</Tabs>

#### 主动控制展示
#### 事件操作

<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-button bind:tap="handleBtnClick">主动控制</ti-button>
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item" bind:close="handleClose" bind:open="handleOpen"  title="标题" options="{{dropMenuOptions}}" />
  <ti-dropdown-item title="标题" options="{{dropMenuOptions}}" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    dropMenuOptions: [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ],
  },
  handleClose(e) {
    console.log('关闭: ', e);
  },
  handleOpen(e) {
    console.log('打开: ', e);
  },
  handleBtnClick(e) {
    this.selectComponent('#dropdown-item').toggle();
  },
});
```

</TabItem>
</Tabs>

## ti-dropdown-menu API

### 属性 **Properties**

| 名称        | 类型      | 必填 | 默认值   | 说明                                         | 备注 |
| ----------- | --------- | ---- | -------- | -------------------------------------------- | ---- |
| mode        | `string`  | 否   | -   | 列表选择的模式，可选项：single、multiple     | -    |
| has-mask     | `boolean` | 否   | `true`    | 是否显示遮罩                                 | -    |
| close-on-mask | `boolean` | 否   | `true`    | 是否允许点击遮罩关闭下拉菜单                    | -    |
| type        | `string`  | 否   | - | 激活选择的样式种类，可选项：checkbox，switch | -    |
| icon        | `string`  | 否   | - | 列表选择的图标                               | -    |
| active-color | `string`  | 否   | -   | 选中状态的颜色                               | -    |
| disabled    | `boolean` | 否   | false    | 是否禁用                                     | -    |
| direction   | `up` \| `down`  | 否   | `down`     | 展示方向                  | -    |

### 可扩展样式名 **External Class**

| 名称       | 说明                 | 备注 |
| ---------- | -------------------- | ---- |
| ext-class   | 根节点可扩展的类名   | -     |
| title-class | 标题可扩展的类名 | - |

### CSS 变量 **CSS Variables**

| 变量                          | 默认值 |说明               | 备注 |
| ----------------------------- | ------ | ------------ | ---- |
| `--dropdown-menu-title-wrap-bg-color` | `var(--neutral-color-9, #ffffff)` | - | -    |
| `--dropdown-menu-icon-margin-left`    | `4rpx`  | -           | -    |
| `--dropdown-title-font-weight`        | `400` | - | - |

## ti-dropdown-item API

### 属性 **Properties**

| 名称        | 类型      | 必填 | 默认值   | 说明                                     | 备注 |
| ----------- | --------- | ---- | -------- | ---------------------------------------- | ---- |
| title       | `string`  | 是   | -        | 标题                                     | -    |
| options     | `Array<TiDropdownItemOption>`   | 是   | -        | 选项列表                                 | -    |
| visible     | `boolean` | 否   | `false`    | 是否显示                                 | -    |
| mode        | `string`  | 否   | single   | 列表选择的模式，可选值：single、multiple | -    |
| icon        | `string`  | 否   | selected | 列表选择的图标                           | -    |
| disabled    | `boolean` | 否   | `false`    | 是否禁用                                 | -    |
| value       | <code>string &vert; number &vert; Array<string &vert; number></code>  | 否   | -        | 唯一标识                                 | -    |
| type        | `checkbox` \| `switch`  | 否   | `checkbox`        |  下拉列表选中时的选择样式                              | -    |
| has-mask     | `boolean` | 否   | `false`    | 是否显示遮罩                             | -    |
| close-on-mask | `boolean` | 否   | `false`    | 是否阻止遮罩点击关闭事件                 | -    |
| active-color | `string`  | 否   | -   | 选中状态的颜色                       | -    |
| has-submit   | `boolean`  | 否   | `false`     | 是否显示提交的按钮                       | -    |
| submit-text  | `string`  | 否   | -       | 提交按钮的文字                           | -    |
| direction   | `string`  | 否   | `down`     | 展示方向， 可选值为：down、up            | -    |

#### TiDropdownItemOption

```typescript showLineNumbers
interface TiDropdownItemOption {
  title?: string;
  label?: string;
  desc?: string;
  value: string | number;
}
```

### 事件 **Events**

| 名称   | 参数列表 | 描述             | 备注 |
| ------ | -------- | ---------------- | ---- |
| `bind:close`  | `(e: WechatMiniprogram.CustomEvent<never>) => void` | 关闭时触发的事件 | -    |
| `bind:open`   | `(e: WechatMiniprogram.CustomEvent<never>) => void` | 打开时触发的事件 | -    |
| `bind:change` | <code>(e: WechatMiniprogram.CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 切换时触发的事件 | -    |
| `bind:submit` | <code>(e: WechatMiniprogram.CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 提交时触发的事件 | -    |

#### 可扩展样式类名（class）

| 类名      | 说明         | 备注 |
| --------- | ------------ | ---- |
| ext-class | 扩展样式类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                          | 默认值 |说明               | 备注 |
| ----------------------------- | ------ | ------------ | ---- |
| `--dropdown-active-color` | `rgb(@theme-r, @theme-g, @theme-b)` | 激活状态的主体颜色 | -    |
| `--dropdown-label-active-color` | `var(--dropdown-active-color, rgb(@theme-r, @theme-g, @theme-b))` | - | - |
| `--dropdown-select-icon-color`  | `var(--dropdown-active-color, rgb(@theme-r, @theme-g, @theme-b))` | - | - |
