---
title: 图标
sidebar_custom_props:
  suffix: Icon
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "/#/icon/"
---

<!-- Custom component -->

import IconCollection from '@site/src/components/iconCollection';

# 图标 _Icon_

**基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-icon-api" />

## 用法示例

#### 基础用法
```html showLineNumbers
<ti-icon name="plus" size="30" color="#f60"></ti-icon>
```

## ti-icon API
### 属性 **Properties**
| 名称       | 类型                                 | 必填 | 默认值 | 说明                            | 备注 |
| ---------- | ------------------------------------ | ---- | ------ | ------------------------------- | ---- |
| name       | `string`                             | 是   | -      | Icon 名字                       | -    |
| rotate     | `string`                             | 否   | -      | 旋转                            | -    |
| color      | `string`                             | 否   | -      | 颜色                            | -    |
| size       | `number`                             | 否   | -      | 大小                            | -    |
| hyphen     | `string`                             | 否   | -      | 连接符                          | -    |
| spin       | `boolean`                            | 否   | false  | 旋转动画                        | -    |
| prefix     | `string`                             | 否   | -     | 类名前缀                        | -    |
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
