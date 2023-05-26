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

## 用法示例

### 基本使用

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" title="标题1" />
  <ti-dropdown-item id="dropdown-item2" title="标题2"/>
  <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownItem1 = document.querySelector('#dropdown-item1')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
```

</TabItem>
</Tabs>

#### 设置选中值

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" title="有选中值" />
  <ti-dropdown-item id="dropdown-item2" title="标题" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownItem1 = document.querySelector('#dropdown-item1')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownItem1.value = [1,2]
```

</TabItem>
</Tabs>

#### 禁用点击

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" title="禁用标题点击" />
  <ti-dropdown-item id="dropdown-item2" title="标题" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownItem1 = document.querySelector('#dropdown-item1')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownItem1.disabled = true
```

</TabItem>
</Tabs>

#### 操作遮罩

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu id="dropdown-menu">
  <ti-dropdown-item id="dropdown-item1" title="不显示遮罩1" />
  <ti-dropdown-item id="dropdown-item2" title="不显示遮罩2" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownMenu = document.querySelector('#dropdown-menu')
const dropdownItem1 = document.querySelector('#dropdown-item1')
const dropdownItem2 = document.querySelector('#dropdown-item2')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownMenu['has-mask'] = false
dropdownMenu['close-on-mask'] = false

```

</TabItem>
</Tabs>

#### 修改选择后的整体色调

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu id="dropdown-menu">
  <ti-dropdown-item id="dropdown-item1" title="标题1" />
  <ti-dropdown-item id="dropdown-item2" title="标题2" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownMenu = document.querySelector('#dropdown-menu')
const dropdownItem1 = document.querySelector('#dropdown-item1')
const dropdownItem2 = document.querySelector('#dropdown-item2')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownMenu['active-color'] = 'red'
```

</TabItem>
</Tabs>

#### submit 模式

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" submit-text="提交" title="标题1" />
  <ti-dropdown-item id="dropdown-item2" title="标题2" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownMenu = document.querySelector('#dropdown-menu')
const dropdownItem1 = document.querySelector('#dropdown-item1')
const dropdownItem2 = document.querySelector('#dropdown-item2')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownItem1['has-submit'] = true
dropdownItem1.addEventListener('submit', function (e) {
  console.log(e.detail)
})
```

</TabItem>
</Tabs>

#### 自定义选择后的图标、选择类型、以及是否是多选类型

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" title="自定义图标" icon="plus" />
  <ti-dropdown-item id="dropdown-item2" title="使用 switch" type="switch" />
  <ti-dropdown-item id="dropdown-item3" mode="multiple" title="多选" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownItem1 = document.querySelector('#dropdown-item1')
const dropdownItem2 = document.querySelector('#dropdown-item2')
const dropdownItem3 = document.querySelector('#dropdown-item3')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownItem3.options = dropMenuOptions

```

</TabItem>
</Tabs>

#### 事件操作

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" title="标题1" />
  <ti-dropdown-item id="dropdown-item2" title="标题2" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const dropdownItem1 = document.querySelector('#dropdown-item1')
const dropdownItem2 = document.querySelector('#dropdown-item2')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
dropdownItem1.addEventListener('submit', function (e) {
  console.log(e.detail)
})
dropdownItem1.addEventListener('open', function (e) {
  console.log(e.detail)
})
dropdownItem1.addEventListener('change', function (e) {
  console.log(e.detail)
})
```

</TabItem>
</Tabs>

#### 主动控制展示
#### 事件操作

<Tabs>
<TabItem value="wxml" label="index.html">

```html showLineNumbers
<ti-button id="btn">主动控制</ti-button>
<ti-dropdown-menu>
  <ti-dropdown-item id="dropdown-item1" title="标题1" />
  <ti-dropdown-item id="dropdown-item2" title="标题2" />
</ti-dropdown-menu>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```js showLineNumbers
const dropMenuOptions = [
  { title: '选项1', value: '1' },
  { title: '选项2', value: '2' },
]
const btn = document.querySelector('#btn')
const dropdownItem1 = document.querySelector('#dropdown-item1')
const dropdownItem2 = document.querySelector('#dropdown-item2')
dropdownItem1.options = dropMenuOptions
dropdownItem2.options = dropMenuOptions
btn.addEventListener('click', function () {
  dropdownItem1.toggle()
})
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
| get-position   | <code>(rect: { rect: DOMRect; direction: 'up' \| 'down'; position: IPosition }) => IPosition</code>  | 否   | `down`     | 展示方向， 可选值为：down、up            |  自定义展示位置   |

##### IPosition
```typescript showLineNumbers
export type DistanceUnit = 'px' | 'em' | 'rem' | 'vw' | 'vh' | '%';

export type IPosition = {
  bottom?: `${number}${DistanceUnit}`;
  top?: `${number}${DistanceUnit}`;
  left?: `${number}${DistanceUnit}`;
  right?: `${number}${DistanceUnit}`;
};
```

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
| close  | `(e: CustomEvent<never>) => void` | 关闭时触发的事件 | -    |
| open   | `(e: CustomEvent<never>) => void` | 打开时触发的事件 | -    |
| change | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 切换时触发的事件 | -    |
| submit | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 提交时触发的事件 | -    |

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
