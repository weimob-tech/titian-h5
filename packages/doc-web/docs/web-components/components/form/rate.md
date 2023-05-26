---
title: 评分
sidebar_custom_props: 
    suffix: Rate
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/rate'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 评分 *Rate*

**提供评分能力。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-rate-api" />

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-rate value="3"></ti-rate>
```

#### 半星
```html showLineNumbers
<ti-rate value="3" allow-half></ti-rate>
```

#### 只读
```html showLineNumbers
<ti-rate value="3" read-only></ti-rate>
```

#### 可清空
```html showLineNumbers
<ti-rate value="3" clearable></ti-rate>
```

#### 设置星级
```html showLineNumbers
<ti-rate value="3" count="7" clearable></ti-rate>
```

#### 间距
```html showLineNumbers
<ti-rate value="3" ext-style="--rate-gap: 10rpx;"></ti-rate>
```

#### 评星尺寸
```html showLineNumbers
<ti-rate value="3" icon-size="48"></ti-rate>
```

#### 绑定事件

<Tabs>
  <TabItem value="index.html" label="index.html" >

```html showLineNumbers
<ti-rate value="{{value}}" onchange="onChange(event)"></ti-rate>
```
  </TabItem>
  <TabItem value="index.js" label="index.js">

```js showLineNumbers
var value = 0;
function onChange(event){
  value = event.detail?.value
}
```
 </TabItem>
</Tabs>

## ti-rate API

### 属性 **Properties**

| 属性      | 类型      | 默认值                | 说明                 |
| --------- | --------- | --------------------- | -------------------- |
| value     | `number`  | 0                   | 值                   |
| allow-half | `boolean` | false               | 允许半星             |
| clearable | `boolean` | false               | 可清空               |
| count     | `number`  | 5                   | 评分数量             |
| icon      | `string`  | rate-star-highlight | 评分 icon 图标       |
| icon-size  | `string`  | 36                  | 评分 icon 图标尺寸   |
| empty-icon | `string`  | rate-star-highlight | 评分 icon 未选中图标 |
| read-only  | `boolean` | false               | 是否只读             |

### 事件 **Events**

| 名称   | 参数列表                                 | 描述                 | 备注 |
| ------ | ---------------------------------------- | -------------------- | ---- |
| change | `(e: CustomEvent) => void` | 评分变化时触发该事件 | -    |

### CSS 变量 **CSS Variables**

| CSS 变量           | 默认值                                    | 说明           | 备注 |
| ------------------ | ----------------------------------------- | -------------- | ---- |
| --rate-gap         | 24rpx                                      | 评星间距       | -    |
| --rate-color       | rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))          | 评分选中颜色   | -    |
| --rate-empty-color | var(--neutral-color-5, #e0e0e0) | 评星未选中颜色 | -    |
