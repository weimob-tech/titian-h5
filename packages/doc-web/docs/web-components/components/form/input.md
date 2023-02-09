---
title: 输入框
sidebar_custom_props:
  suffix: Input
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/input"
---

# 输入框 _Input_
**输入框用于通过键盘输入内容，适用于单行文本**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-input-api" />

## 安装使用

```json showLineNumbers
{
  // 原生小程序
  "usingComponents": {
    "ti-input": "@titian-design/weapp/input/index"
  },
  // titan-cli搭建的项目
  "usingComponents": {
    "ti-input": "platform://titian-weapp/ti-input"
  }
}
```
## 用法示例

#### 基本用法
```html showLineNumbers
<ti-input label="左侧标题" placeholder="用户输入中文案" />
<ti-input disabled label="禁用" />
<ti-input read-only label="只读" />
<ti-input maxlength="{{20}}" label="最大输入长度20" />
<ti-input divider="{{false}}" label="不显示底部分割线" />
<ti-input required label="必填" />
<ti-input clearable="{{false}}" label="不显示清除按钮" />
```

#### 输入类型
```html showLineNumbers
<ti-input type="text" label="文本" />
<ti-input type="number" label="数字" />
<ti-input type="safe-password" label="密码安全输入键盘" />
<ti-input type="digit" label="带小数点的数字键盘" />
```
#### 输入对齐方式
```html showLineNumbers
<ti-input text-align="left" label="标题" />
<ti-input text-align="right" label="标题" />
```

#### label左侧搭配图标
```html showLineNumbers
<ti-input prefix-icon="home" label="标题" />
```

#### 输入框左右使用插槽
```html showLineNumbers
<ti-input label="手机号">
  <div slot="prefix">+ 86</div>
</ti-input>
<ti-input label="验证码">
  <div slot="suffix">发验证码</div>
</ti-input>
```
#### 错误提示
```html showLineNumbers
<ti-input error value="输错了" label="标题" />
<ti-input error-message="手机号格式错误" value="123213" label="手机号" />
```
#### 键盘确认按钮文字
```html showLineNumbers
<ti-input confirm-type="done" label="完成" />
<ti-input confirm-type="send" label="发送" />
<ti-input confirm-type="search" label="搜索" />
<ti-input confirm-type="next" label="下一项" />
<ti-input confirm-type="go" label="前往" />
```
## ti-input API
### 属性 **Properties**

| 名称         | 类型      | 必填 | 默认值  | 说明                                                                                                                                                                 | 备注    |
| ------------ | --------- | ---- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| type                      | string  | 否   | 'text' | input 的类型,可选值为 `text` `number` `idcard` `digit` `safe-password` `nickname`                     | -    |
| value                     | string  | 否   | -      | 当前输入的值, 支持简易双向绑定 model:value（仅微信渠道支持）                                          | -    |
| password                  | boolean | 否   | false  | 是否是密码类型                                                                                        | -    |
| placeholder               | string  | 否   | -      | 输入框为空时占位符                                                                                    | -    |
| placeholder-style         | string  | 否   | -      | 指定 placeholder 的样式                                                                               | -    |
| disabled                  | boolean | 否   | false  | 是否禁用                                                                                              | -    |
| maxlength                 | number  | 否   | 140    | 最大输入长度，设置为 -1 的时候不限制最大长度                                                          | -    |
| prefix-icon               | string  | 否   | -      | 左侧图标名称                                                                                          | -    |
| label                     | string  | 否   | -      | 输入框左侧文本                                                                                        | -    |
| divider                   | boolean | 否   | true   | 是否显示底部分割线                                                                                    | -    |
| required                  | boolean | 否   | false  | 是否显示必填星号                                                                                      | -    |
| clearable                 | boolean | 否   | true   | 是否启用清除控件                                                                                      | -    |
| read-only                 | boolean | 否   | false  | 是否只读                                                                                              | -    |
| text-align                | string  | 否   | 'left' | 输入框内容对齐方式，可选值为 `left` `right`                                                           | -    |
| error                     | boolean | 否   | false  | 是否将输入内容标红                                                                                    | -    |
| error-message             | string  | 否   | -      | 底部错误提示文案，为空时不展示                                                                        | -    |
| cursor-spacing            | number  | 否   | 0      | 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 | -    |
| focus                     | boolean | 否   | false  | 获取焦点                                                                                              | -    |
| confirm-type              | string  | 否   | 'done' | 设置键盘右下角按钮的文字，仅在 type='text'时生效                                                      | -    |
| always-embed              | boolean | 否   | false  | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)                       | -    |
| confirm-hold              | boolean | 否   | false  | 点击键盘右下角按钮时是否保持键盘不收起                                                                | -    |
| cursor                    | number  | 否   | -      | 指定 focus 时的光标位置                                                                               | -    |
| selection-start           | number  | 否   | -1     | 光标起始位置，自动聚集时有效，需与 selection-end 搭配使用                                             | -    |
| selection-end             | number  | 否   | -1     | 光标结束位置，自动聚集时有效，需与 selection-start 搭配使用                                           | -    |
| adjust-position           | boolean | 否   | false  | 键盘弹起时，是否自动上推页面                                                                          | -    |
| hold-keyboard             | boolean | 否   | false  | focus 时，点击页面的时候不收起键盘                                                                    | -    |
| safe-password-cert-path   | string  | 否   | -      | 安全键盘加密公钥的路径，只支持包内路径                                                                | -    |
| safe-password-length      | number  | 否   | -      | 安全键盘输入密码长度                                                                                  | -    |
| safe-password-time-stamp  | number  | 否   | -      | 安全键盘加密时间戳                                                                                    | -    |
| safe-password-nonce       | string  | 否   | -      | 安全键盘加密盐值                                                                                      | -    |
| safe-password-salt        | string  | 否   | -      | 安全键盘计算 hash 盐值，若指定 custom-hash 则无效                                                     | -    |
| safe-password-custom-hash | string  | 否   | -      | 安全键盘计算 hash 的算法表达式，如 `md5(sha1('foo' + sha256(sm3(password + 'bar'))))`                 | -    |
| ext-style                 | string  | 否   | -      | 根节点样式                                        
### 事件 **Events**

| 名称      | 参数列表                                                                       | 描述                 | 备注 |
| --------- | ------------------------------------------------------------------------------ | -------------------- | ---- |
| bind:input   | <code>(e: WechatMiniprogram.CustomEvent<{value: number \| string, keyCode: string}>) => void</code> | 键盘输入时触发       | -    |
| bind:focus   | <code>(e: WechatMiniprogram.CustomEvent<{value: number \| string}>) => void</code>                  | 输入框聚焦时触发     | -    |
| bind:blur    | <code>(e: WechatMiniprogram.CustomEvent<{value: number \| string}>) => void</code>                | 输入框失去焦点时触发 | -    |
| bind:confirm | <code>(e: WechatMiniprogram.CustomEvent<{value: number \| string}>) => void</code>                  | 点击完成按钮时触发   | -    |
| bind:clear   | `(e: WechatMiniprogram.CustomEvent) => void`                                                                              | 点击清除图标是触发   | -    |
| bind:change  | <code>(e: WechatMiniprogram.CustomEvent<{value: number \| string}>) => void</code>                | 输入值改变时触发     | -    |

### 插槽 **Slots**

| 名称       | 说明             | 备注 |
| ---------- | ---------------- | ---- |
| prefix-icon | label 左侧图标   | -    |
| prefix     | 输入框左侧侧插槽 | -    |
| suffix     | 输入框右侧插槽   | -    |

### 外部样式类 **External Classes**

| 名称       | 说明                 | 备注 |
| ---------- | -------------------- | ---- |
| ext-class   | 根节点样式类         | -    |
| label-class | 输入框左侧文本样式类 | -    |
| input-class | input 样式类         | -    |

### CSS 变量 **CSS Variable**

| 变量                            | 默认值    | 说明                                     | 备注 |
| ------------------------------- | --------- | ---------------------------------------- | ---- |
| --input-line-height             | `42rpx`    | 文字行高                                 | -    |
| --input-padding-v               | `32rpx`    | 垂直方向内边距                           | -    |
| --input-padding-h               | `28rpx`    | 水平方向内边距                           | -    |
| --input-font-size               | `28rpx`    | 字体大小                                 | -    |
| --input-label-width             | `168rpx`   | 左侧 label，包括间隙。输入框距最左侧宽度 | -    |
| --input-title-max-width         | `140rpx`   | 左侧文字局域最大宽度                     | -    |
| --input-placeholder-color       | `#9e9e9e` | placeholder 颜色                         | -    |
| -input-font-color               | `#212121` | 输入文字颜色                             | -    |
| --input-placeholder-error-color | `#ff2e2e` | 错误提示下 placeholder 颜色              | -    |
