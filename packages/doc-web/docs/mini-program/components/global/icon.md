---
title: 图标
sidebar_custom_props:
  suffix: Icon
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "/#/icon/"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- Custom component -->

import IconCollection from '@site/src/components/iconCollection';

# 图标 _Icon_

**基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-icon-api" />

## 安装使用
```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-icon": "{{packageWeappName}}/icon/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-icon": "platform://titian-mp/ti-icon"
  }
}
```

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-icon name="plus" size="{{30}}" color="#f60" />
```

#### 自定义图标
**可以引入第三方 iconfont 对应的字体文件和 CSS 文件，之后就可以在 Icon 组件中直接使用**

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-icon ext-class="custom-icon" prefix="custom-icon" name="plus" />
```
</TabItem>
<TabItem value="js" label="index.js">

```css showLineNumbers
// app.wxss
@font-face {
  font-family: custom-icon;
  src: url('./custom-icon.ttf') format('truetype');
}

.custom-icon {
  font-family: custom-icon;
}

.custom-icon-plus::before {
  content: '\e626';
}
```
</TabItem>
</Tabs>

#### 多色图标
**把svg转换为base64然后在小程序中以背景图的形式展示svg图**

<Tabs>
<TabItem value="html" label="index.wxml">

```html showLineNumbers
<ti-svg-path-view size="140" paths="{{ paths }}" />
```
</TabItem>
<TabItem value="js" label="index.js">

```js showLineNumbers
Page({
  data: {
    paths: [
      {
        d: 'M0 0m279.272727 0l465.454546 0q279.272727 0 279.272727 279.272727l0 465.454546q0 279.272727-279.272727 279.272727l-465.454546 0q-279.272727 0-279.272727-279.272727l0-465.454546q0-279.272727 279.272727-279.272727Z',
        fill: '#55C7C5'
      },
      {
        d: 'M271.941818 664.878545a61.067636 61.067636 0 0 1 54.504727-33.11709h371.223273a60.974545 60.974545 0 0 1 54.458182 33.11709l34.909091 68.631273a39.726545 39.726545 0 0 1-18.152727 53.527273c-5.655273 2.769455-11.869091 4.212364-18.152728 4.235636H273.454545c-22.504727 0-40.727273-17.92-40.727272-40.029091 0-6.213818 1.466182-12.334545 4.305454-17.850181l34.909091-68.654546v0.139636z',
        fill: 'rgba(255, 255, 255, .6)'
      },
      {
        d: 'M655.569455 292.887273c-1.931636-1.954909-3.84-3.886545-5.818182-5.725091-79.266909-74.752-205.149091-72.192-281.204364 5.725091a207.080727 207.080727 0 0 0 0 290.490182l114.781091 116.224 1.163636 1.070545c7.610182 7.284364 17.873455 11.264 28.485819 11.054545 10.635636-0.209455 20.712727-4.561455 28.043636-12.12509l114.548364-116.224a207.197091 207.197091 0 0 0 0-290.490182z m-143.639273 200.517818c-41.797818-0.186182-75.566545-33.536-75.613091-74.635636a74.705455 74.705455 0 0 1 46.941091-69.073455 76.916364 76.916364 0 0 1 82.850909 16.290909 73.774545 73.774545 0 0 1 16.290909 81.524364 76.008727 76.008727 0 0 1-70.469818 45.893818z',
        fill: '#FFFFFF'
      }
    ]
  },
});
```
</TabItem>
</Tabs>


## ti-icon API
### 属性 **Properties**
| 名称      | 类型                                 | 必填 | 默认值 | 说明                            | 备注 |
| --------- | ------------------------------------ | ---- | ------ | ------------------------------- | ---- |
| name      | `string`                             | 是   | -      | Icon 名字                       | -    |
| rotate    | `string`                             | 否   | -      | 旋转                            | -    |
| color     | `string`                             | 否   | -      | 颜色                            | -    |
| size      | `number`                             | 否   | -      | 大小                            | -    |
| hyphen    | `string`                             | 否   | -      | 连接符                          | -    |
| spin      | `boolean`                            | 否   | false  | 旋转动画                        | -    |
| prefix    | `string`                             | 否   | -     | 类名前缀                        | -    |
| icon-style | `string`                             | 否   | -     | 取值：`''` `lovely` `popular` | -    |
| ext-style  | `string` \| `Record<string, string>` | 否   | -      | 根节点样式                      | -    |

### 外部样式类 **External Classes**
| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 扩展样式类名 | -    |

### CSS 变量 **CSS Variable**
| 变量             | 默认值    | 说明         | 备注 |
| ---------------- | --------- | ------------ | ---- |
| --icon-font-size | `inherit` | 字体图标大小 | -    |
| --icon-color     | `inherit` | 字体图标颜色 | -    |

## 图标展示

<IconCollection />
