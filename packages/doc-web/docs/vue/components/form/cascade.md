---
title: 级联
sidebar_custom_props:
  suffix: Cascade
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/cascade"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# 级联 _Cascade_

**用于联动选择。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ticascade-api" />

## 安装使用

```typescript showLineNumbers
import { TiCascade } from 'titian-h5-vue';
```


## 用法示例

#### 静态数据
:::note
按照示例数据格式，把全部层级的数据传给 `options` 字段。
:::

<Tabs>
  <TabItem value="vue" label="index.vue" >

```html showLineNumbers
<template>
  <TiCascade :tabs="tabs" :options="options"/>
</template>

<script lang="ts" setup>
import { TiCascade } from 'titian-h5-vue';
import { tabs, options } from './mockData';
</script>
```

  </TabItem>
  <TabItem value="js" label="mockData.js">

```typescript js showLineNumbers
const tabs = ['省', '市', '区/县'];
const options = [
  {
      code: '310000',
      name: '上海市',
      children: [
        {
          code: '310100',
          name: '直辖市',
          children: [
            {
              code: '310101',
              name: '黄浦区',
            },
          ],
        },
      ],
    },
    {
      code: '330000',
      name: '浙江省',
      children: [
        {
          code: '330100',
          name: '杭州市',
          children: [
            {
              code: '330102',
              name: '上城区',
            },
            {
              code: '330105',
              name: '拱墅区',
            },
          ],
        },
      ],
    },
  ];
export default { tabs, options };
```

  </TabItem>
</Tabs>



#### 动态数据

:::note
给 `getOptions` 属性传入一个异步接口，有 3 种做法：
1. 该接口返回全部层级的数据。
2. 该接口可以返回单层数据；选择时，会再次调用该接口，获取下一层级数据。
3. 该接口可以搭配静态 `options` 数据；当在 `options` 内找不到下一层数据时，会尝试调用 `getOptions` 接口，拿到下一层级数据。
:::

```html showLineNumbers
<template>
  <TiCascade :get-options="asyncGetOptionAPI"/>
</template>

<script lang="ts" setup>
import { TiCascade } from 'titian-h5-vue';
  
const asyncGetOptionAPI = async (value: any) => {
    let rawResponse;
    if (value) {
      rawResponse = await fetch('api3/address/tmp/getAreasByCityId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ areaCode: value.areaCode }),
      });
    } else {
      rawResponse = await fetch('api3/address/tmp/getProvinceCity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
      });
    }
    const { data } = await rawResponse.json();
    return data;
};
</script>
```

## TiCascade API

### 属性 **Properties**
| 名称               | 类型                                 | 必填 | 默认值     | 说明        | 备注 |
| ------------------ | ------------------------------------ | ---- | ---------- | ----------- | ---- |
| titlebar           | `boolean`                            | 否   | true       |             | -    |
| title              | `string`                             | 否   | '选择地址' | 标题        | -    |
| sub-title           | `string`                             | 否   | -          | 副标题      | -    |
| code               | `string`                             | 否   | 'code'     | 列标识      | -    |
| label              | `string`                             | 否   | 'label'    | 文案字段    | -    |
| value              | `array`                              | 否   | []         | 结果        | -    |
| options            | <code> { [key: string \| number]: unknown }[]  </code>                            | 否   | []       | 数据源      | -    |
| active             | `number`                             | 否   | 0          | 当前展示项  | -    |
| get-options         | `function`                           | 否   | -          | 获取列数据  | -    |
| cascade            | `string`                             | 否   | `children` | 级联字段    | -    |
| ext-header-style     | `string` \| `Record<string, string>` | 否   |            | header 样式 | -    |
| ext-tab-style        | `string` \| `Record<string, string>` | 否   |            | tab 样式    | -    |
| ext-option-item-style | `string` \| `Record<string, string>` | 否   |            | 当前项样式  | -    |


### 事件 **Events**

| 名称         | 参数列表             | 描述             | 备注 |
| ------------ | -------------------- | ---------------- | ---- |
| change       | `e: CustomEvent<{ value: unknown[]; options: CascadeOption[];active: number;}> => void` | 当前选中项，见 [级联项 `CascadeOption`](#级联项-cascadeoption)      | -    |
| changeSwiper | `e: CustomEvent<{  current: number; source: 'touch' | '';}> => void`       | 切换当前活动项目 | -    |
| close        |                      | 关闭             | -    |

### CSS 变量 **CSS Variable**

| 变量                             | 默认值                          | 说明                       | 备注 |
| -------------------------------- | ------------------------------- | -------------------------- |
| --cascade-header-height          | 88px                            | header 高度                | -    |
| --cascade-header-padding-v       | 0                               | header 垂直方向的内边距    | -    |
| --cascade-header-padding-h       | 20px                            | header 水平方向的内边距    | -    |
| --cascade-tab-padding-v          | 0                               | tab 垂直方向的内边距       | -    |
| --cascade-tab-padding-h          | 28px                            | tab 水平方向的内边距       | -    |
| --cascade-tab-font-size          | 28px                            | tab 字体大小               | -    |
| --cascade-tab-color              | var(--neutral-color-4, #c4c4c4) | tab 字体颜色               | -    |
| --cascade-tab-selected-color     | var(--neutral-color-2, #757575) | tab 选中字体颜色           | -    |
| --cascade-tab-active-color       | var(--neutral-color-1, #212121) | tab 活动状态字体颜色       | -    |
| --cascade-tab-active-font-weight | var(--font-weight-bold, 600)    | tab 活动状态字体 weight    | -    |
| --cascade-content-height         | 750px                           | 内容区高度                 | -    |
| --cascade-item-height            | 108px                           | 内容区单项高度             | -    |
| --cascade-item-padding-v         | 0px                             | 内容区单项垂直方向的内边距 | -    |
| --cascade-item-padding-h         | 48px                            | 内容区单项水平方向的内边距 | -    |
| --cascade-item-font-size         | 28px                            | 内容区单项字体大小         | -    |
| --cascade-item-font-weight       | 400                             | 内容区单项字体 weight      | -    |
| --cascade-item-color             | var(--neutral-color-1, #212121) | 内容区单项字体颜色         | -    |


## 数据结构 **Data Structure**

#### 级联项 `CascadeOption`
```ts
type CascadeOption = { [key: string | number]: unknown }
```