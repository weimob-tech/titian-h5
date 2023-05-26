---
title: 规格选择器
sidebar_custom_props:
  suffix: SkuSelector
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/sku"
---

# 规格选择器 _Sku Selector_

**规格选择器，用于选择 SKU 的不同规格**

import TabsLink from '@site/src/components/tabsLink';

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<TabsLink id="ti-sku-selector-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-sku-selector": "{{packageWeappName}}/sku-selector/index"
  },
  // titan-cli 搭建的项目
  "usingComponents": {
    "ti-sku-selector": "platform://titian-mp/ti-sku-selector"
  }
}
```

## 用法示例
#### 基本用法



<Tabs>
<TabItem value="wxml" label="index.wxml">

```html showLineNumbers
<ti-sku-selector
  bind:ti-change="onTiChange"
  bind:ti-option-change="onTiOptionChange"
  skus="{{mockSkuData.skus}}"
  specs="{{mockSkuData.specs}}"
  value="{{value}}"
  optionIds="{{optionIds}}"
/>
```

</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
import mockData from './mockData.js'
Page({
  data: {
    value: '1',
    optionIds: ['1', '2', '3']
  },
  methods: {
    onTiChange(){},
    onTiOptionChange(){}
  }
})
```


</TabItem>
<TabItem value="mock" label="mockData.js">


```js

const mockSkuData = {
  specs: [
    {
      label: '套餐',
      specId: '2',
      options: [
        { optionId: '3', label: '套餐一' },
        { optionId: '4', label: '套餐二' },
        { optionId: '30', label: '套餐三' },
        { optionId: '40', label: '套餐四' },
        { optionId: '50', label: '套餐五' },
        { optionId: '60', label: '套餐六' },
      ],
    },
    {
      label: '颜色',
      specId: '1',
      options: [
        { optionId: '1', label: '红色' },
        { optionId: '2', label: '紫色' },
      ],
    },

    {
      label: '内存',
      specId: '3',
      options: [
        { optionId: '5', label: '64G' },
        { optionId: '6', label: '128G' },
        { optionId: '7', label: '256G' },
      ],
    },
  ],
  skus: [
    {
      skuId: '1',
      specOptionDesc: ['紫色', '套餐一', '64G'],
      specOptionIds: ['2', '3', '5'],
      price: 123.12,
      priceLabel: '价格',
      subPrice: 99.99,
      subPriceLabel: '会员价',
      initCount: 2,
      stock: 10,
      title: '1测试商品测试商品测试商品测试商品测试商品测试商品',
      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '2',
      specOptionDesc: ['紫色', '套餐一', '128G'],
      specOptionIds: ['2', '3', '6'],
      price: 3456.11,
      priceLabel: '价格',
      subPrice: 3000,
      stock: 11,
      initCount: 3,
      title: '2测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '3',
      specOptionDesc: ['紫色', '套餐二', '128G'],
      specOptionIds: ['2', '4', '6'],
      price: 12.0,
      priceLabel: '价格',
      subPrice: 9.99,
      subPriceLabel: '会员价',
      initCount: 4,
      stock: 12,
      title: '3测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '4',
      specOptionDesc: ['红色', '套餐二', '256G'],
      specOptionIds: ['1', '4', '7'],
      price: 1.56,
      priceLabel: '价格',
      subPrice: 1,
      subPriceLabel: '会员价',
      initCount: 5,
      stock: 13,
      title: '4测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
    {
      skuId: '5',
      specOptionDesc: ['红色', '套餐二', '128G'],
      specOptionIds: ['1', '4', '6'],
      price: 14,
      priceLabel: '价格',
      stock: 14,
      initCount: 6,
      title: '5测试商品测试商品测试商品测试商品测试商品测试商品',

      imageUrl: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/placeholder.jpg',
    },
  ],
} 

```

</TabItem>
</Tabs>


## ti-sku-selector API

### 属性 **Properties**

| 名称       | 类型       | 必填 | 默认值 | 说明                                        | 备注                                     |
| ---------- | ---------- | ---- | ------ | ------------------------------------------- | ---------------------------------------- |
| skus       | `Sku[]`    | 是   | []     | 商品列表，见[商品](#商品-sku)               | -                                        |
| specs      | `Spec[]`   | 是   | []     | 规格列表，见[规格](#规格-spec)              | 一个数组中的规格的 optionId 需要保持唯一 |
| value      | `string`   | 否   | -      | 选中商品的 id；对应 `skus` 中的 `skuId`     | -                                        |
| option-ids | `string[]` | 否   | []     | 选中规格的 id；对应 `specs` 中的 `optionId` | 当不填 `value` 时生效                    |
| ext-style  | `string`   | 否   | -      | 根节点样式                                  | -                                        |

### 事件 **Events**

| 名称             | 参数列表                                                 | 描述                    | 备注 |
| ---------------- | -------------------------------------------------------- | ----------------------- | ---- |
| ti-change        | `(e: WechatMiniprogram.CustomEvent<{value: Sku}>) => void`                 | 选中的 SKU 值变化时出发 | -    |
| ti-option-change | `(e: WechatMiniprogram.CustomEvent<{options: [], optionIds: []}>) => void` | 选中的规则变化时触发    | -    |

### 外部样式类 **External Classes**

| 名称      | 说明         | 备注 |
| --------- | ------------ | ---- |
| ext-class | 根节点样式类 | -    |

## 数据结构 **Data Structure**

#### 商品 `Sku`

```typescript showLineNumbers
export interface Sku {
  skuId: string;
  specOptionIds: string[];
  stock: number;
  // ...
}
```

#### 规格 `Spec`

```typescript showLineNumbers
export interface Spec {
  label: string;
  specId: string;
  options: Array<SpecOption>;
}

export interface SpecOption {
  optionId: string;
  label: string;
}
```