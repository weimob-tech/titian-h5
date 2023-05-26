---
title: 多选框
sidebar_custom_props:
  suffix: Checkbox
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/checkbox"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 多选框 _Checkbox_

** 多选框 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-checkbox-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-checkbox-group": "{{packageWeappName}}/checkbox-group/index",
    "ti-checkbox-button": "{{packageWeappName}}/checkbox-button/index",
    "ti-checkbox": "{{packageWeappName}}/checkbox/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-checkbox-group": "platform://titian-mp/ti-checkbox-group",
    "ti-checkbox-button": "platform://titian-mp/ti-checkbox-button",
    "ti-checkbox": "platform://titian-mp/ti-checkbox"
  }
}
```

## 用法示例

### ti-checkbox 示例

#### 单独使用

** 组件附带文字内容 **

```html showLineNumbers
<ti-checkbox />
<ti-checkbox label="文字内容" />
<ti-checkbox>文字内容</ti-checkbox>
```

#### 默认选中状态

** 当设置 `checked` 时为受控模式，多选框的选中状态将由使用者控制，当设置 `default-checked`时为非受控模式，选中状态将由组件内部控制。默认为非受控模式。 **

```html showLineNumbers
<ti-checkbox label="默认非受控模式" />
<ti-checkbox label="默认选中，受控模式" checked />
<ti-checkbox label="默认选中，非受控模式" default-checked />
```

#### 禁用多选框点击效果

** 当设置 `disabled` 时， 组件将禁用组件的图标和文字的点击切换效果，当设置 `label-disabled` 时将禁用文字的点击效果，实现更细粒的控制。**

```html showLineNumbers
<ti-checkbox label="禁用全部点击效果" disabled />
<ti-checkbox label="禁用文字点击效果" label-disabled />
```

#### 修改多选框的圆角度数

** 多选框可自定义边框角度，支持方形（square）、圆形（circle）和自定义角度，默认为圆形 **
> ** 当自定义角度时，单位为`rpx`**

```html showLineNumbers
<ti-checkbox label="方型" shape="square" />
<ti-checkbox label="圆型" shape="circle" />
<ti-checkbox label="自定义角度" shape="{{4}}" />
````

#### 组件图标设置

** 多选框支持自定义组件图标, 图标大小，图标颜色等。 **

```html showLineNumbers
<ti-checkbox label="默认图标" default-checked />
<ti-checkbox label="自定义图标大小" size="{{64}}" default-checked />
<ti-checkbox label="自定义图标" icon="plus" default-checked />
```

#### 监听多选框选中状态变化

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox label="监听切换状态变化" bind:change="handleChange" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  handleChange(e) {
    console.log('e: ', e.detail ? '选中' : '取消选中');
  },
});
```

</TabItem>
</Tabs>

### ti-checkbox-button 示例

#### 基本使用

** 组件附带文字内容 **

```html showLineNumbers
<ti-checkbox-button label="复选按钮文字" />
<ti-checkbox-button>复选按钮文字</ti-checkbox-button>
```

#### 默认选中状态

** 当设置 `checked` 时为受控模式，多选按钮的选中状态将由使用者控制，当设置 `default-checked` 时为非受控模式，选中状态将由组件内部控制。默认为非受控模式。 **

```html showLineNumbers
<ti-checkbox-button label="默认选中" checked />
<ti-checkbox-button label="默认选中" default-checked />
```

#### 组件内容设置

** 多选按钮支持自定义前后内容，图标等。 **

```html showLineNumbers
<ti-checkbox-button label="设置右侧图标" icon="sort-inactive" />
<ti-checkbox-button label="自定义左侧内容">
    <ti-image
      ext-style="margin-right: 6rpx"
      slot="prefix" 
      width="{{40}}"
      radius="{{0}}" 
      height="{{40}}" 
      src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
    />
</ti-checkbox-button>
<ti-checkbox-button label="自定义右侧内容">
    <ti-image
      ext-style="margin-left: 6rpx"
      slot="suffix" width="{{40}}"
      radius="{{0}}"
      height="{{40}}"
      src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
    />
</ti-checkbox-button>
```

#### 改变多选按钮颜色

** 多选按钮默认根据主题色变化，如需改变按钮颜色可参考下面示例 **

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox-button label="通过属性更改颜色" color="#2a6ae9" default-checked />
<view class="custom-color">
    <ti-checkbox-button label="通过 css 变量更改颜色" default-checked />
</view>
```

</TabItem>
<TabItem value="css" label="app.wxss">

```css showLineNumbers
.custom-color {
  --checkbox-button-checked-border-color: rgba(30, 128, 255, 40%);
  --checkbox-button-checked-bg-color: rgba(30, 128, 255, 10%);
  --checkbox-button-checked-text-color: rgba(30, 128, 255, 100%);
}
```

</TabItem>
</Tabs>

#### 监听多选按钮选中状态变化

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox-button label="监听切换状态变化" bind:change="handleChange" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  handleChange(e) {
    console.log(e.detail);
  },
});
```

</TabItem>
</Tabs>

### ti-checkbox-group 示例

#### 基本使用

```html showLineNumbers
<ti-checkbox-group>
    <ti-checkbox label="文字内容-1" value="1" />
    <ti-checkbox label="文字内容-2" value="2" />
    <ti-checkbox label="文字内容-3" value="3" />
</ti-checkbox-group>
<ti-checkbox-group>
    <ti-checkbox-button label="文字内容-1" value="1" />
    <ti-checkbox-button label="文字内容-2" value="2" />
    <ti-checkbox-button label="文字内容-3" value="3" />
</ti-checkbox-group>
```

#### 禁用所有多选框点击效果

** 当设置 `disabled` 时， 子组件将禁用组件的图标和文字的点击切换效果，当设置 `label-disabled` 时将禁用子组件文字的点击效果，实现更细粒的控制。**

```html showLineNumbers
<ti-checkbox-group disabled>
    <ti-checkbox label="整体禁用点击-1" value="1" />
    <ti-checkbox label="整体禁用点击-2" value="2" />
    <ti-checkbox label="整体禁用点击-3" value="3" />
</ti-checkbox-group>

<ti-checkbox-group label-disabled>
    <ti-checkbox label="文字禁用点击-1" value="1" />
    <ti-checkbox label="文字禁用点击-2" value="2" />
    <ti-checkbox label="文字禁用点击-3" value="3" />
</ti-checkbox-group>

<ti-checkbox-group disabled>
    <ti-checkbox-button label="禁用点击效果-1" value="1" />
    <ti-checkbox-button label="禁用点击效果-2" value="2" />
    <ti-checkbox-button label="禁用点击效果-3" value="3" />
</ti-checkbox-group>
```

#### 设置多选框组合中的选中值

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox-group value="{{groupValue}}">
  <ti-checkbox label="受控模式-1" value="1" />
  <ti-checkbox label="受控模式-2" value="2" />
  <ti-checkbox label="受控模式-3" value="3" />
</ti-checkbox-group>

<ti-checkbox-group value="{{groupValue}}">
  <ti-checkbox-button label="受控模式-1" value="1" />
  <ti-checkbox-button label="受控模式-2" value="2" />
  <ti-checkbox-button label="受控模式-3" value="3" />
</ti-checkbox-group>

<ti-checkbox-group default-value="{{groupValue}}">
  <ti-checkbox label="非受控模式-1" value="1" />
  <ti-checkbox label="非受控模式-2" value="2" />
  <ti-checkbox label="非受控模式-3" value="3" />
</ti-checkbox-group>

<ti-checkbox-group default-value="{{groupValue}}">
  <ti-checkbox-button label="非受控模式-1" value="1" />
  <ti-checkbox-button label="非受控模式-2" value="2" />
  <ti-checkbox-button label="非受控模式-3" value="3" />
</ti-checkbox-group>
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  data: {
    groupValue: ['1', '2'],
  }
});
```

</TabItem>
</Tabs>

#### 使用 `options` 创建多选框

** 此模式只支持创建 `ti-checkbox` **

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox-group default-value="{{groupValue}}" options="{{options}}" />
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  data: {
    groupValue: ['1', '2'],
    options: [
      { value: 'a', label: '选项 A' },
      { value: 'b', label: '选项 B' },
      { value: 'c', label: '选项 C' },
    ],
  }
});
```

</TabItem>
</Tabs>

#### 监听多选组合中选中状态变化

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox-group bind:change="handleChange">
  <ti-checkbox label="监听切换状态变化-1" value="1" />
  <ti-checkbox label="监听切换状态变化-2" value="2" />
  <ti-checkbox label="监听切换状态变化-3" value="3" />
</ti-checkbox-group>

<ti-checkbox-group bind:change="handleChange">
  <ti-checkbox-button label="监听切换状态变化-1" value="1" />
  <ti-checkbox-button label="监听切换状态变化-2" value="2" />
  <ti-checkbox-button label="监听切换状态变化-3" value="3" />
</ti-checkbox-group>
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  handleChange(e) {
    console.log(e.detail);
  },
});
```

</TabItem>
</Tabs>

#### 设置最大选中数量
<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-checkbox-group bind:handle-max="handleMax" max="{{2}}">
  <ti-checkbox label="监听切换状态变化-1" value="1" />
  <ti-checkbox label="监听切换状态变化-2" value="2" />
  <ti-checkbox label="监听切换状态变化-3" value="3" />
</ti-checkbox-group>
<ti-checkbox-group bind:handle-max="handleMax" max="{{2}}">
  <ti-checkbox-button label="监听切换状态变化-1" value="1" />
  <ti-checkbox-button label="监听切换状态变化-2" value="2" />
  <ti-checkbox-button label="监听切换状态变化-3" value="3" />
</ti-checkbox-group>
```

</TabItem>
<TabItem value="js" label="index.js">

```javascript showLineNumbers
Page({
  handleMax(e) {
    console.log('e: ', e);
  },
});
```

</TabItem>
</Tabs>

## ti-checkbox API

### 属性 **Properties**

| 名称           | 类型      | 必填 | 默认值 | 说明                                   | 备注 |
| -------------- | --------- | ---- | ------ | -------------------------------------- | ---- |
| label          | `string`  | 否   | -      | 文字内容                               | -    |
| value          | `string`  | 否   | -      | 标识 Checkbox 名称                     | -    |
| checked        | `boolean` | 否   | false  | 指定当前是否选中, 此模式下为控制型组件 | -    |
| default-checked | `boolean` | 否   | false  | 初始是否选中, 此模式下为非控制型组件   | -    |
| disabled       | `boolean` | 否   | false  | 是否禁用 | -    |
| label-disabled  | `boolean` | 否   | false  | 文字区域是否禁用 | - |
| shape          | `square` \| `circle` \| `number`   | 否   | `circle` | 多选框形状      | -    |
| icon           | `string`  | 否   | -      | 自定义图标名称 | - |
| size           | `number`  | 否   | -      | 自定义图标尺寸 | - |
| color          | `string`  | 否   | -      | 自定义图标颜色 | - |
| ext-style      | `string`   | 否 | -  | 根节点额外扩展样式 | - |

### 事件 **Events**

| 名称   | 参数列表             | 描述                   | 备注                                                                                    |
| ------ | -------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `bind:change` | `(e: WechatMiniprogram.CustomEvent<boolean>) => void` | 多选框选中时触发的事件 | 当被 `ti-checkbox-group` 包裹时，只有 `ti-checkbox-group` 的 `change` 会被触发 |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| icon    | 图标插槽 |  当 `icon="{{false}}"`时，使用此插槽   |

### 可扩展样式名 **External Class**

| 名称       | 说明               | 备注 |
| ---------- | ------------------ | ---- |
| ext-class  | 根节点可扩展的类名 | -    |
| icon-class | icon 可扩展的类名  | -    |

### CSS 变量 **CSS Variables**

| 变量   | 默认值 | 说明 | 备注 |  
| ----  | ---- | ------ | --- |
| `--checkbox-radius`               | `calc(var(--base-radius-size, 0px) + 4px)`   | - | - |
| `--checkbox-padding-v`            | `0` | -| -  |
| `--checkbox-padding-h`            | `0` | - | - |
| `--checkbox-label-padding-v`      | `0` | - | - |
| `--checkbox-label-padding-h`      | `12rpx` | - | - |
| `--checkbox-label-color`          | `var(--neutral-color-1, #212121)` | - | - |
| `--checkbox-direction`            | `row` | - | - |
| `--checkbox-icon-color`           | `rgb(@theme-r, @theme-g, @theme-b)` | - | - |
| `--checkbox-icon-revert-color`    | `var(--neutral-color-9, #ffffff)` | - | - |

## ti-checkbox-button API

### 属性 **Properties**

| 名称           | 类型      | 必填 | 默认值 | 说明                                   | 备注 |
| -------------- | --------- | ---- | ------ | -------------------------------------- | ---- |
| label          | `string`  | 否   | -      | 文字内容                               | -    |
| value          | `string`  | 否   | -      | 标识 Checkbox 名称                     | -    |
| checked        | `boolean` | 否   | false  | 指定当前是否选中, 此模式下为控制型组件 | -    |
| default-checked | `boolean` | 否   | false  | 初始是否选中, 此模式下为非控制型组件   | -    |
| disabled       | `boolean` | 否   | false  | 是否禁用 | -    |
| icon           | `string`  | 否   | -      | 自定义右侧图标名称 | - |
| left-icon      |  `string`  | 否   | -      | 自定义左侧图标名称 | - |
| color          | `string`  | 否   | -      | 自定义图标颜色 | - |
| ext-style      | `string`   | 否 | -  | 根节点额外扩展样式 | - |

### 事件 **Events**

| 名称   | 参数列表             | 描述                   | 备注                                                                                    |
| ------ | -------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `bind:change` | `(e: WechatMiniprogram.CustomEvent<boolean>) => void` | 多选框选中时发生的回调 | 当被 `ti-checkbox-group` 包裹时，只有 `ti-checkbox-group` 的 `change` 会被触发 |

### 插槽 **Slots**

| 名称    | 说明               | 备注 |
| ------- | ------------------ | ---- |
| prefix   | 自定义文字前面内容   | -  |
| suffix   | 自定义文字后面内容   | -  |

### 可扩展样式名 **External Class**

| 名称      | 说明               | 备注 |
| --------- | ------------------ | ---- |
| ext-class  | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量   | 默认值 | 说明 | 备注 |  
| ----  | ------ | ---- | --- |
| `--checkbox-button-height`                     | `56rpx` | - | - |
| `--checkbox-button-padding-v`                  | `0`  | - | - |
| `--checkbox-button-padding-h`                  | `12rpx` | - | - |
| `--checkbox-button-text-color`                 | `var(--neutral-color-2, #757575)`  | - | - |
| `--checkbox-button-disabled-text-color`        | `var(--neutral-color-4, #c4c4c4)`  | - | - |
| `--checkbox-button-disabled-border-color`      | `rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 20%)` | - | - |
| `--checkbox-button-bg-color`                   | `var(--neutral-color-7, #f5f5f5)`  | - | - |
| `--checkbox-button-padding`                    | `12px 20px`  | - | - |
| `--checkbox-button-radius`                     | `var(--checkbox-radius, @radius-8)` | - | - |
| `--checkbox-button-checked-bg-color`           | `var(--checkbox-button-checked-color, rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 10%))` | - | - |
| `--checkbox-button-checked-border-color`       | `var(--checkbox-button-checked-color, rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 40%))` | - | - |
| `--checkbox-button-checked-text-color`         | `var(--checkbox-button-checked-color, rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 100%))` | - | - | 

## ti-checkbox-group API

### 属性 **Properties**

| 名称          | 类型 | 是否必填 | 默认值       | 说明      | 备注 |
| ------------- | --------- | -------- | ------------ | ------------ | ---- |
| value         | <code>Array<string &vert; number \></code>  | 否       | -            | 用于设置当前选中的值                    | -    |
| default-value  | <code>Array<string &vert; number \></code>  | 否       | -            | 默认选中的值                            | -    |
| disabled      | `boolean`                           | 否       | `false`        | 指定当前是否禁用                        | -    |
| direction     | <code>horizontal &vert; vertical</code>        | 否       | `horizontal`   | 排列方向 | -    |
| shape         | <code>circle &vert; square</code>              | 否       | `circle`       | 图标形状，可选值为 circle、square       | -    |
| label-disabled | `boolean`                           | 否       | `false`        | 是否禁用文本点击效果                    | -    |
| icon          | `string`                            | 否       | -     | 自定义图标名称                          | -    |
| options       | `Array<Option>`                     | 否       | -     | 以配置形式设置子元素 | -    |
| size          | `number`                            | 否       | -     | 自定义图标尺寸 | -    |
| color         | `string`                            | 否       | -     | 自定义图标颜色 | -    |
| max           | `number`                            | 否       | `Number.MAX_SAFE_INTEGER` | 最大选中数量 | - |
| ext-style      | <code>string</code> | 否 | -  | 根节点额外扩展样式 | 属性值如果是带单位的话，要带上单位，如：`{margin: '10px'}` |

#### Options

```typescript showLineNumbers
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

### 事件 **Events**

| 名称   | 参数列表                                                    | 描述                   | 备注 |
| ------ | ----------------------------------------------------------- | ---------------------- | ---- |
| `bind:change` | <code>(e: WechatMiniprogram.CustomEvent<Array<string &vert; number\>\>) => void</code> | 多选框选中时发生的回调 |   -   |
| `bind:handle-max` | `(e: WechatMiniprogram.CustomEvent<never>) => void` | 达到最大值时发生的回调 |   -   |

### 可扩展样式名 **External Class**

| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 扩展样式类名 | -    |
