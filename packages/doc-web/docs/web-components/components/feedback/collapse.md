---
title: 折叠面板
sidebar_custom_props:
  suffix: Collapse
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/collapse"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 折叠面板 _Collapse_

** 可以折叠/展开的内容区域。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-collapse-api" />

## 用法示例

#### 基本使用
```html showLineNumbers
<ti-collapse>
  <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>

<!-- 设置手风琴模式 -->
<ti-collapse repel>
  <ti-collapse-item title="标题文字A">- 设置手风琴模式 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>
```

#### 自定义标题部分，即cell组件区域
```html showLineNumbers
<ti-collapse>
  <ti-collapse-item use-cell-slot>
    <div slot="cell">我是标题</div>
    - 标题A下的内容 -
  </ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>
```

#### 设置默认展开
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-collapse id="collapse">
  <ti-collapse-item title="默认展开">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>
```
</TabItem>
<TabItem value="index.js" label="index.js">

```javascript showLineNumbers
const collapse = document.querySelector('#collapse');
collapse.value = 0
```

</TabItem>
</Tabs>

#### 设置图标
** 支持左右两侧分别设置图标 **
```html showLineNumbers
<ti-collapse icon="share-wechat-moments">
  <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>

<ti-collapse>
  <ti-collapse-item icon="share-wechat-moments" title="标题文字A">
      - 标题A下的内容 -
  </ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>

<ti-collapse right-icon="share-wechat-moments">
  <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>

<ti-collapse>
  <ti-collapse-item right-icon="share-wechat-moments" title="标题文字A">
      - 标题A下的内容 -
  </ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>
```

#### 禁用面板

```html showLineNumbers
<ti-collapse disabled>
  <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>

<ti-collapse>
  <ti-collapse-item disabled title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>
```

#### 使用 `options` 属性创建面板

<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-collapse id="collapse" />
```

</TabItem>
<TabItem value="index.js" label="index.js">

```javascript showLineNumbers
const collapse = document.querySelector('#collapse')
collapse.options = [
  { title: '标题文字A', content: '- 标题A下的内容 -' },
  { title: '标题文字B', content: '- 标题B下的内容 -' },
]
```

</TabItem>
</Tabs>

#### 监听展开、关闭、切换事件
<Tabs>
<TabItem value="index.html" label="index.html">

```html showLineNumbers
<ti-collapse id="collapse">
  <ti-collapse-item value="a" title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item value="b" title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>

<ti-collapse repel id="collapse-repel">
  <ti-collapse-item value="a" title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
  <ti-collapse-item value="b" title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
</ti-collapse>
```

</TabItem>
<TabItem value="index.js" label="index.js">

```javascript showLineNumbers
const collapse = document.querySelector('#collapse')
const collapseRepel = document.querySelector('#collapse-repel')
collapse.addEventListener('close', function(e) {
  console.log('关闭', e.detail);
})
collapse.addEventListener('change', function(e) {
  console.log('切换', e.detail);
})
collapse.addEventListener('open', function(e) {
  console.log('打开', e.detail);
})

collapseRepel.addEventListener('close', function(e) {
  console.log('关闭', e.detail);
})
collapseRepel.addEventListener('change', function(e) {
  console.log('切换', e.detail);
})
collapseRepel.addEventListener('open', function(e) {
  console.log('打开', e.detail);
})
```

</TabItem>
</Tabs>

## ti-collapse API

### 属性 **Properties**

| 名称           | 类型                            | 必填 | 默认值 | 说明              | 备注 |
| -------------- | ------------------------------- | ---- | ------ | ----------------- | ---- |
| value          | <code>Array<string &vert; number\></code> \| `string` \| `number` | 否   | null   | 选中值            | -    |
| options        | `Options`           | 否   | []     |                   | -    |
| icon           | `string`                        | 否   | -   | 全局设置左侧 icon | -    |
| right-icon      | `string`                        | 否   | -   | 全局设置右侧 icon | -    |
| disabled       | `boolean`                       | 否   | -  | 全局设置是否禁用  | -    |
| repel          | `boolean`                       | 否   | -  | 是否手风琴模式    | -    |
| divider          | `boolean`                       | 否   | -  | 是否展示分割线    | -    |
| clickable          | `boolean`                       | 否   | -  | 开启点击反馈    | -    |
| ext-option-style | `string`                        | 否   | -     | 子项容器样式      |      |

#### Options

详情可参考 [ti-cell 属性](详情可参考 [ti-cell 属性](/docs/mini-program/components/global/cell#%E5%B1%9E%E6%80%A7-properties)

```typescript showLineNumbers
interface Options {
  "clickable"?: boolean;
  "desc"?: string;
  "disabled"?: boolean;
  "divider"?: boolean;
  "icon"?: string;
  "label"?: string;
  "rightIcon"?: string;
  "title": string;
  "content": string;
  "value"?: string | number;
}
```

### 事件 **Events**

| 名称     | 参数 | 描述             | 备注 |
| -------- | -------- | ---------------- | ---- |
| change | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code>      | 折叠面板选中值   | 当为手风琴模式时返回值为 <code>string &vert; number</code>，否则为 <code>Array<string &vert; number\></code>   |
| open   | <code>(e: CustomEvent<string &vert; number\>) => void</code>        | 折叠面板展开事件 | -    |
| close | <code>(e: CustomEvent<string &vert; number\>) => void</code>         | 折叠面板关闭事件 | -    |

### 可扩展样式名 **External Class**

| 类名                  | 说明               | 备注 |
| --------------------- | ------------------ | ---- |
| ext-option-class        | 子项容器样式       |
| ext-option-content-class | 子项容器折叠区样式 |


## ti-collapse-item API

### 属性 **Properties**

| 名称             | 类型      | 必填 | 默认值 | 说明                   | 备注 |
| ---------------- | --------- | ---- | ------ | ---------------------- | ---- |
| value            | `string`  | 否   | null   | 用来匹配父类 value，判断当前面板是否需要被展开，如果不传入，默认使用下标(**index**)         | -    |
| title            | `string`  | 否   | []     | 标题文字               | -    |
| desc             | `string`  | 否   | null   | 内容文字               | -    |
| icon             | `string`  | 否   | false  | 左侧 icon              | -    |
| right-icon        | `string`  | 否   | null   | 右侧 icon              | -    |
| disabled         | `boolean` | 否   | false  | 是否禁用               | -    |
| use-right-icon-slot | `boolean` | 否   | false  | 是否使用右侧 icon 插槽 | -    |
| ext-style         | `string`  | 否   | ''     | 容器样式               | -    |
| divider          | `boolean`                       | 否   | -  | 是否展示分割线    | -    |
| clickable          | `boolean`                       | 否   | -  | 开启点击反馈    | -    |

### 插槽 **Slots**

| 名称      | 说明           | 备注 |
| --------- | -------------- | ---- |
| cell       | 常显示区域插槽，配合use-cell-slot使用 | -    |
| title     | 文档           | -    |
| icon      | 左侧 icon      | -    |
| right-icon | 右侧 icon      | -    |
| desc      | 内容           | -    |
| default   | 内容区默认插槽 | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明     | 备注 |
| -------- | -------- | ---- |
| ext-class | 容器样式 |

### CSS 变量 **CSS Variables**

| 变量                                    | 默认值 | 说明                                                             | 备注 |
| ----------------------------------------| ------------------- | ---------------------------------------------------------------- | ---- |
| --collapse-item-padding-v               | `46rpx` | 同`collapse-item` 组件`--collapse-item-padding-v`                | -    |
| --collapse-item-padding-h               | `28rpx` | 同`collapse-item` 组件`--collapse-item-padding-h`                | -    |
| --collapse-item-text-color              | `var(--neutral-color-3, #9e9e9e)`  | 同`collapse-item` 组件`--collapse-item-text-color`               | -    |
| --collapse-item-icon-color              | `var(--neutral-color-4, #c4c4c4)`  | 同`collapse-item` 组件`--collapse-item-icon-color`               | -    |
| --collapse-item-cubic-bezier            | `cubic-bezier(0.48, 0.33, 0.24, 0.95)`  | 同`collapse-item` 组件`--collapse-item-cubic-bezier`             | -    |
| --collapse-item-cell-padding-v          | - | 同`collapse-item` 组件`--collapse-item-cell-padding-v`           | -    |
| --collapse-item-cell-padding-h          | -  | 同`collapse-item` 组件`--collapse-item-cell-padding-h`           | -    |
| --collapse-item-cell-text-color         | -  | 同`collapse-item` 组件`--collapse-item-cell-text-color`          | -    |
| --collapse-item-cell-title-text-color   | -  | 同`collapse-item` 组件`--collapse-item-cell-title-text-color`    | -    |
| --collapse-item-cell-label-text-color   | -  | 同`collapse-item` 组件`--collapse-item-cell-label-text-color`    | -    |
| --collapse-item-cell-desc-text-color    | -  | 同`collapse-item` 组件`--collapse-item-cell-desc-text-color`     | -    |
| --collapse-item-cell-bg-color           | -  | 同`collapse-item` 组件`--collapse-item-cell-bg-color`            | -    |
| --collapse-item-cell-right-icon-color   | -  | 同`collapse-item` 组件`--collapse-item-cell-right-icon-color`    | -    |
| --collapse-item-cell-text-disabled-color | - | 同`collapse-item` 组件`--collapse-item-cell-text-disabled-color` | -    |
| --collapse-item-cell-hover-bg-color      | - | 同`collapse-item` 组件`--collapse-item-cell-hover-bg-color`      | -    |
| --collapse-item-line-height | `1.2` | - | - |
| --collapse-item-font-weight | `400` | - | - |
| --collapse-item-font-size | `24` | - | - |