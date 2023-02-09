---
title: 按钮
sidebar_custom_props:
  suffix: Button
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '/#/button'
---

# 按钮 _Button_

**按钮用于触发一个操作，如路由跳转、打开弹框、提交表单等**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-button-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-button": "@titian-design/weapp/button/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-button": "platform://titian-weapp/ti-button"
  }
}
```

## 用法示例

#### 按钮类型

```html showLineNumbers"
<ti-button type="primary">默认</ti-button>
<ti-button type="warning">警告</ti-button>
<ti-button type="success">成功</ti-button>
<ti-button type="error">错误</ti-button>
<ti-button type="info">信息</ti-button>
```

#### 按钮风格

```html showLineNumbers
<ti-button variant="contained">面性强调</ti-button>
<ti-button variant="filled">面性次要</ti-button>
<ti-button variant="outlined">线框按钮</ti-button>
<ti-button variant="text">文字按钮</ti-button>
```

#### 按钮尺寸

```html showLineNumbers
<ti-button size="tiny">高度48rpx</ti-button>
<ti-button size="small">高度56rpx</ti-button>
<ti-button size="medium">高度64rpx</ti-button>
<ti-button size="big">高度80rpx</ti-button>
<ti-button size="large">高度96rpx</ti-button>
```

#### 按钮颜色

```html showLineNumbers
<ti-button color="#7232dd">确定</ti-button>
<ti-button color="blue">确定</ti-button>
<ti-button color="rgb(7, 193, 96)">确定</ti-button>
<ti-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变按钮</ti-button>
```

#### 按钮圆角

```html showLineNumbers
<ti-button shape="capsule">胶囊按钮</ti-button>
<ti-button shape="round">默认圆角按钮</ti-button>
<ti-button shape="rect">直角按钮</ti-button>
```

#### 按钮边框
**发丝线，仅适用 variant="outlined"风格**
```html showLineNumbers
<ti-button variant="outlined" hairline>一像素边框</ti-button>
```

#### 禁用按钮

```html showLineNumbers
<ti-button disabled>确定</ti-button>
```

#### 块级按钮

```html showLineNumbers
<ti-button block>块级</ti-button>
<ti-button ext-style="width: 200rpx">定宽</ti-button>
<ti-button>自适应宽度</ti-button>
```

#### 搭配图标

```html showLineNumbers
<ti-button prefix-icon="home">左图标</ti-button>
<ti-button suffix-icon="arrow-right">右图标</ti-button>
```

#### 加载状态

```html showLineNumbers
<ti-button loading />
<ti-button loading loading-size="{{46}}">提交</ti-button>
<ti-button loading-type="spinner" loading />
<ti-button loading-text="加载中" loading />
```

## ti-button API

### 属性 **Properties**

| 名称               | 类型                                 | 必填 | 默认值      | 说明                                                                                                                                                           | 备注                                                          |
| ------------------ | ------------------------------------ | ---- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| type               | `string`                             | 否   | `primary`   | 按钮类型，可选值为 `primary` `info` `error` `warning` `success` `simple`                                                                                       | `simple`仅在`variant: outlined` 模式下可用，灰色调            |
| size               | `string`                             | 否   | `big`       | 按钮尺寸，可选值为 `tiny` `small` `medium` `big` `large` 分别对应高度`48rpx` `56rpx` `64rpx` `80rpx` `96rpx`                                                                                                      | -                                                             |
| variant            | `string`                             | 否   | `contained` | 按钮风格，可选值为 `contained` `filled` `outlined` `text`                                                                                                      | -                                                             |
| color              | `string`                             | 否   | -           | 按钮颜色，十六进制色值 `#ffffff` `linear-gradient`渐变色                                                                                                       | 渐变色仅在`variant：contained`模式下可用，color的权重高于type |
| shape              | `string`                             | 否   | `round`     | 按钮圆角风格，可选值为 `capsule` `round` `rect`                                                                                                                | -                                                             |
| hairline           | `boolean`                            | 否   | `false`     | 当 size 为 `tiny` `small` `medium`，是否使用发丝 1rpx 边框                                                                                                      | -                                                             |
| disabled           | `boolean`                            | 否   | `false`     | 是否禁用按钮                                                                                                                                                   | -                                                             |
| loading            | `boolean`                            | 否   | `false`     | 是否显示为加载状态                                                                                                                                             | -                                                             |
| block              | `boolean`                            | 否   | `false`     | 将按钮宽度调整为其父宽度的选项                                                                                                                                 | -                                                             |
| prefix-icon        | `string`                             | 否   | -           | 按钮文字左侧图标                                                                                                                                               | -                                                             |
| suffix-icon        | `string`                             | 否   | -           | 按钮文字右侧图标                                                                                                                                               | -                                                             |
| loading-size       | `number`                             | 否   | `30`        | 加载图标大小，单位 rpx                                                                                                                                          | -                                                             |
| loading-type       | `string`                             | 否   | `circular`  | 加载图标类型，可选择`circular` `spinner`                                                                                                                       | -                                                             |
| loading-text       | `string`                             | 否   | -           | 加载图标文字                                                                                                                                                   | -                                                             |
| form-type          | string                               | 否   | -           | 用于 form 组件，可选值为`submit` `reset`，点击分别会触发 form 组件的 submit/reset 事件                                                                         | -                                                             |
| open-type          | string                               | 否   | -           | 微信开放能力                                                                                                                                                   | -                                                             |
| hover-class        | string                               | 否   | `active`    | 指定按钮按下去的样式类。当 `hover-class="none"` 时，没有点击态效果                                                                                             | -                                                             |
| hover-start-time   | number                               | 否   | `20`          | 按住后多久出现点击态，单位毫秒                                                                                                                                 | -                                                             |
| hover-stay-time    | number                               | 否   | `70`          | 手指松开后点击态保留时间，单位毫秒                                                                                                                             | -                                                             |
| lang               | string                               | 否   | `en`        | 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文。                                                                                              | -                                                             |
| session-from       | string                               | 否   | -           | 会话来源，open-type="contact"时有效                                                                                                                            | -                                                             |
| send-message-title | string                               | 否   | -           | 会话内消息卡片标题，open-type="contact"时有效                                                                                                                  | -                                                             |
| send-message-path  | string                               | 否   | -           | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效                                                                                                    | -                                                             |
| send-message-img   | string                               | 否   | -           | 会话内消息卡片图片，open-type="contact"时有效                                                                                                                  | -                                                             |
| app-parameter      | string                               | 否   | -           | 打开 APP 时，向 APP 传递的参数，open-type=launchApp 时有效                                                                                                     | -                                                             |
| show-message-card  | boolean                              | 否   | -           | 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | -                                                             |
| dataset            | _any_                                | 否   | -           | 按钮 dataset，open-type 为 `share` 时，可在 onShareAppMessage 事件的 `event.target.dataset.detail` 中看到传入的值                                              |
| ext-style          | `string` \| `Record<string, string>` | 否   | -           | 根节点样式                                                                                                                                                     | -                                                             |

### 事件 **Events**

| 名称                | 参数列表     | 描述                                                                                                                    | 备注 |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------------------- | ---- |
| bind:click          | `(e: WechatMiniprogram.CustomEvent) => void`            | 点击按钮，且按钮状态不为加载或禁用时触发                                                                                | -    |
| bind:getuserinfo    | `(e: WechatMiniprogram.CustomEvent) => void` | 用户点击该按钮时，会返回获取到的用户信息，回调的 detail 数据与 wx.getUserInfo 返回的一致，open-type="getUserInfo"时有效 | -    |
| bind:contact        | `(e: WechatMiniprogram.CustomEvent) => void` | 客服消息回调，open-type="contact"时有效                                                                                 | -    |
| bind:getphonenumber | `(e: WechatMiniprogram.CustomEvent) => void` | 获取用户手机号回调，open-type=getPhoneNumber 时有效                                                                     | -    |
| bind:error          | `(e: WechatMiniprogram.CustomEvent) => void` | 当使用开放能力时，发生错误的回调，open-type=launchApp 时有效                                                            | -    |
| bind:opensetting    | `(e: WechatMiniprogram.CustomEvent) => void` | 在打开授权设置页后回调，open-type=openSetting 时有效                                                                    | -    |
| bind:launchapp      | `(e: WechatMiniprogram.CustomEvent) => void` | 打开 APP 成功的回调，open-type=launchApp 时有效                                                                         | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称            | 说明           | 备注 |
| --------------- | -------------- | ---- |
| ext-class        | 根节点样式类   | -    |
| loading-class    | 加载图标样式类 | -    |
| prefix-icon-class | 左侧图标样式类 | -    |
| suffix-icon-class | 右侧图标样式类 | -    |

### CSS 变量 **CSS Variable**

| 变量 <img width={200} /> | 默认值                                                                                                          | 说明                                             | 备注 |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | ---- |
| --button-height          | 不同`size`，默认高度不同。`tiny` `small` `medium` `big` `large`分别对应`48rpx` `56rpx` `64rpx` `80rpx` `96rpx`       | 高度                                             | -    |
| --button-padding-v       | `0`                                                                                                             | 垂直方向内边距                                   | -    |
| --button-padding-h       | 不同`size`，默认左右内边距不同。`tiny` `small` `medium` `big` `large`分别对应`12rpx` `20rpx` `24rpx` `28rpx` `36rpx` | 水平方向内边距                                   | -    |
| --button-font-size       | 不同`size`，默认字号不同。`tiny` `small` `medium` `big` `large`分别对应`24rpx` `26rpx` `26rpx` `28rpx` `32rpx`       | 字号                                             | -    |
| --button-radius          | calc(var(--capsule-radius-size, 0rpx) + 8rpx)                                                                     | 圆角，修改后不在跟随全局风格                     | -    |
| --capsule-radius-size    | `0rpx`                                                                                                           | 全局圆角增量，控制图标风格。在项目根节点统一设置 | -    |
