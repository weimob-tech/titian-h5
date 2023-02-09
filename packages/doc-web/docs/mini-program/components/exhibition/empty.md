---
title: 空态
sidebar_custom_props: 
    suffix: Empty
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/empty'
---


# 空态 *Empty*
**空态占位图，常用于加载失败、加载数据为空等场景。**


import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-empty-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-empty": "@titian-design/weapp/empty/index"
  },
  // titan-cli 搭建的项目
  "usingComponents": {
    "ti-empty": "platform://titian-weapp/ti-empty"
  }
}
```

## 用法示例

#### 基本用法

```html showLineNumbers
<ti-empty />
```

#### 设置标题

```html showLineNumbers
<ti-empty title="空态页说明文案" />
```

#### 设置标题,副标题

```html showLineNumbers
<ti-empty title="空态页说明文案" sub-title="补充说明文案请尽量简短" />
```

#### 设置 ext-style 样式

```html showLineNumbers
<ti-empty title="空态页说明文案" ext-style="margin:20rpx 0 " />
```


#### 设置 ext-class

```html showLineNumbers
<ti-empty title="空态页说明文案" ext-class="ext-class" />
```


#### 设置 size

```html showLineNumbers
<ti-empty title="空态页说明文案" size="big" />
```

#### 设置 image

```html showLineNumbers
<ti-empty title="空态页说明文案" image="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png" />
```

## ti-empty API

### 属性 **Properties**

| 名称         | 类型              | 必填 | 默认值                                                                                         | 说明                | 备注 |
| ------------ | ----------------- | ---- | ---------------------------------------------------------------------------------------------- | ------------------- | ---- |
| image        | `string`          | 否   | `https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/145/searchwithnoresult.png` | 图片网址            |      |
| size         | `medium` \| `big` | 否   | medium                                                                                         | 尺寸                |      |
| title        | `string`          | 否   | -                                                                                              | 标题                | -    |
| sub-title     | `string`          | 否   | -                                                                                              | 副标题              | -    |
| use-image-slot | `boolean`         | 否   | false                                                                                          | 是否启用 image 插槽 | -    |
| use-title-slot | `boolean`         | 否   | false                                                                                          | 是否启用 title 插槽 | -    |
| ext-style     | `string`          | 否   | -                                                                                              | 容器样式            | -    |

### 插槽 **Slots**

| 名称   | 说明             | 备注 |
| ------ | ---------------- | ---- |
| image  | 自定义图片展示   | -    |
| title  | 自定义标题块展示 | -    |
| bottom | 自定义底部块展示 | -    |

### 外部样式类 **External Classes**

| 名称      | 说明               | 备注 |
| --------- | ------------------ | ---- |
| ext-class | 根节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                            | 默认值           | 说明                             | 备注 |
| ------------------------------- | ---------------- | -------------------------------- | ---- |
| --empty-medium-size             | 200rpx            | 中间尺寸下图片大小               | -    |
| --empty-medium-title-margin-top | @gap-28          | 中间尺寸下标题距离图片的上外边距 | -    |
| --empty-big-size                | 240rpx            | 大尺寸下图片大小                 | -    |
| --empty-big-title-margin-top    | @gap-32          | 大尺寸下标题距离图片的上外边距   | -    |
| --empty-title-color             | var(--neutral-color-2, #757575) | 标题区文字颜色                   | -    |
| --empty-sub-title-color         | var(--neutral-color-4, #c4c4c4) | 副标题区文字颜色                 | -    |
| --empty-min-width               | 100%             | empty 最小宽度                   | -    |
| --empty-min-height              | 485rpx            | empty 最小高度                   | -    |
| --empty-width                   | 100%             | empty 宽度                       | -    |
| --empty-height                  | 100%             | empty 高度                       | -    |
