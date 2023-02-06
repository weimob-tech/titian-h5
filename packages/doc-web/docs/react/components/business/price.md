---
title: 价格
sidebar_custom_props:
  suffix: Price
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/price"
---

# 价格 _Price_

**价格，常用于价格字体大小不一的场景**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiprice-api" />

## 安装使用

```ts showLineNumbers
import { TiPrice } from '@titian-design/mobile-react';
```

## 用法示例
#### 基本用法

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
        <TiPrice 
          label='销售价'
          unit='$'
          prefix='最低'
          value={29.99}
          suffix='起'
        />
    </>
  );
}
```

## TiPrice API

### 属性 **Properties**

| 名称     | 类型     | 必填 | 默认值 | 说明       | 备注 |
| -------- | -------- | ---- | ------ | ---------- | ---- |
| label    | `string` | 否   | -      | 描述       | -    |
| unit     | `string` | 否   | -      | 单位       | -    |
| prefix   | `string` | 否   | -      | 前缀       | -    |
| value    | `number` | 否   | 0      | 价格       | -    |
| suffix   | `string` | 否   | -      | 后缀       | -    |
| extStyle | `string` | 否   | -      | 根节点样式 | -    |

### CSS 变量 **CSS Variables**

| 变量                         | 默认值                                                                                                   | 说明                           | 备注 |
| ---------------------------- | -------------------------------------------------------------------------------------------------------- | ------------------------------ | ---- |
| --price-color                | var(--price-color, var(--theme-price, rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25)))) | 价格颜色，默认为 --theme-price | -    |
| --price-label-color          | inherit                                                                                                  | 价格描述-颜色                  | -    |
| --price-label-font-size      | 24px                                                                                                     | 价格描述-字号                  | -    |
| --price-label-font-weight    | 400                                                                                                      | 价格描述-字重                  | -    |
| --price-label-line-height    | 28px                                                                                                     | 价格描述-行高                  | -    |
| --price-prefix-color         | inherit                                                                                                  | 前缀-颜色                      | -    |
| --price-prefix-font-size     | 24px                                                                                                     | 前缀-字号                      | -    |
| --price-prefix-font-weight   | 400                                                                                                      | 前缀-字重                      | -    |
| --price-prefix-line-height   | 28px                                                                                                     | 前缀-行高                      | -    |
| --price-suffix-color         | inherit                                                                                                  | 后缀-颜色                      | -    |
| --price-suffix-font-size     | 24px                                                                                                     | 后缀-字号                      | -    |
| --price-suffix-font-weight   | 400                                                                                                      | 后缀-字重                      | -    |
| --price-suffix-line-height   | 28px                                                                                                     | 后缀-行高                      | -    |
| --price-unit-color           | inherit                                                                                                  | 单位-颜色                      | -    |
| --price-unit-margin-left           | 4px                                                                                                  | 单位-左边距                      | -    |
| --price-unit-margin-right           | inherit                                                                                                  | 单位-右边距                      | -    |
| --price-unit-font-size       | 30px                                                                                                     | 单位-字号                      | -    |
| --price-unit-font-weight     | 600                                                                                                      | 单位-字重                      | -    |
| --price-unit-line-height     | 28px                                                                                                     | 单位-行高                      | -    |
| --price-integer-color        | inherit                                                                                                  | 整数部分-颜色                  | -    |
| --price-integer-font-size    | 48px                                                                                                     | 整数部分-字号                  | -    |
| --price-integer-font-family  | font-wemo                                                                                                | 整数部分-字体族                | -    |
| --price-integer-font-weight  | 400                                                                                                      | 整数部分-字重                  | -    |
| --price-integer-line-height  | 48px                                                                                                     | 整数部分-行高                  | -    |
| --price-fraction-color       | inherit                                                                                                  | 小数部分-颜色                  | -    |
| --price-fraction-font-size   | 32px                                                                                                     | 小数部分-字号                  | -    |
| --price-fraction-font-family | font-wemo                                                                                                | 小数部分-字体族                | -    |
| --price-fraction-font-weight | 400                                                                                                      | 小数部分-字重                  | -    |
| --price-fraction-line-height | 28px                                                                                                     | 小数部分-行高                  | -    |
