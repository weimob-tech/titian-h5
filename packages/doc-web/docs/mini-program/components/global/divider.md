---
title: 分割线
sidebar_custom_props:
  suffix: Divider
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/divider'
---

# 分割线 _Divider_

**用于将内容分隔为多个区域**

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-divider": "titian-mp/divider/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-divider": "platform://titian-mp/ti-divider"
  }
}
```

## 用法示例

#### 基础用法

```html showLineNumbers
<ti-divider />
```

#### 分割线风格

```html showLineNumbers
<ti-divider>实线</ti-divider>
<ti-divider dashed>虚线</ti-divider>
```

#### 文字对齐方式

```html showLineNumbers
<ti-divider text-align="left">居左</ti-divider>
<ti-divider text-align="center">居中</ti-divider>
<ti-divider text-align="right">居右</ti-divider>
```

#### 分割线颜色

```html showLineNumbers
<ti-divider color="red">整体红色</ti-divider>
<ti-divider border-color="blue">分割线蓝色</ti-divider>
<ti-divider color="red" border-color="blue">
  文字红色、分割线蓝色
</ti-divider>
<ti-divider border-color="linear-gradient(to right, #fff 0%, #FFBE70 100%)" border-width="{{6}}">
  线性渐变（默认对称）
</ti-divider>
```

#### 分割线厚度

```html showLineNumbers
<ti-divider border-width="{{6}}">分割线厚度</ti-divider>
```

#### 分割线方向

```html showLineNumbers
<ti-divider orientation="horizontal">横向</ti-divider>
<ti-divider orientation="vertical">纵向</ti-divider>
```
## ti-divider API
### 属性 **Properties**
| 名称        | 类型      | 必填 | 默认值     | 说明                                      | 备注 |
| ----------- | --------- | ---- | ---------- | ----------------------------------------- | ---- |
| dashed      | `boolean` | 否   | false      | 虚线                                      | -    |
| hairline    | `boolean` | 否   | false      | 发丝线                                    | -    |
| text-align   | `string`  | 否   | center     | 文本位置，可选值 `left` `center` `right ` | -    |
| color       | `string`  | 否   | -          | 颜色，包括分割线和文字                    | -    |
| border-color | `string`  | 否   | -          | 分割线颜色                                | -    |
| border-width | `number`  | 否   | 2          | 分割线厚度，单位rpx                                | -    |
| orientation | `string`  | 否   | horizontal | 分割线方向，可选值`horizontal` `vertical` | -    |
| ext-style    | `string` \| `Record<string, string>`  | 否   | -          | 根节点样式                                | -    |

### 插槽 **Slots**
| 名称    | 说明     | 备注                             |
| ------- | -------- | -------------------------------- |
| default | 默认插槽 | orientation 为 `horizontal` 可用 |

### 外部样式类 **External Classes**
| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 根节点样式类 | -    |

### CSS 变量 **CSS Variable**
| 变量            | 默认值                                                                         | 说明             | 备注 |
| --------------- | ------------------------------------------------------------------------------ | ---------------- | ---- |
| --divider-gap   | 不同`orientation`，默认间隔不同；`horizontal` `vertical` 分别对应`24rpx` `20rpx` | 分割线和文字间距 | -    |
| --divider-width | `2rpx`                                                                          | 分割线厚度       | -    |
| --divider-color | var(--neutral-color-6, #f2f2f2)                                                | 分割线颜色       | -    |
| --divider-style | `solid`                                                                        | 分割线类型       | -    |
