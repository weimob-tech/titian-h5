---
title: 图片
sidebar_custom_props:
  suffix: Image
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/image'
---

# 图片 _Image_
**图片容器，在保留原生 img 的特性下，支持懒加载，自定义占位、加载失败等。**

## 安装使用

```typescript showLineNumbers
import { TiImage } from '@titian-design/react'
```

## 用法示例

#### 基础用法

```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  return (
    <>
      <TiImage src={src} />
    </>
  )
}
```
#### 填充模式

```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  return (
    <>
      <TiImage mode="contain" width="180" height="180" src={src} />
      <TiImage mode="cover" width="180" height="180" src={src} />
      <TiImage mode="fill" width="180" height="180" src={src} />
      <TiImage mode="none" width="180" height="180" src={src} />
      <TiImage mode="scaleDown" width="180" height="180" src={src} />
    </>
  )
}
```

#### 自定义圆角
**useGlobalStyle设置为true，可跟随全局圆角风格，即受控于css变量--base-radius-size**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  return (
    <>
      <TiImage radius="18" width="100" height="100" src={src} />
      <TiImage radius="100%" width="100" height="100" src={src} />
      <TiImage useGlobalStyle width="100" height="100" src={src} />
    </>
  )
}
```
#### 懒加载

```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  return (
    <>
      <TiImage lazyLoad src={src} />
    </>
  )
}
```
#### 图片比例（宽高比）
**aspectRatio设置inherit，可跟随全局比例风格，即受控于css变量--image-aspect-ratio；也可以设置具体的宽高比。**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  return (
    <>
      <TiImage aspectRatio={2} src={src} />
      <TiImage aspectRatio="inherit" src={src} />
    </>
  )
}
```
#### 加载中提示
**更多可用iconName详见[TiIcon组件](./icon#图标展示)**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  const iconName = 'default-pic'
  return (
    <>
      <TiImage loadingIcon={iconName} src={src} />
      <TiImage src={ src }>
        <div slot="loading" />
      </TiImage>
    </>
  )
}
```
#### 加载失败提示
**更多可用iconName详见[TiIcon组件](./icon#图标展示)**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png'
  const iconName = 'default-pic'
  return (
    <>
      <TiImage errorIcon={iconName} src={src} />
      <TiImage src={ src }>
        <div slot="error" />
      </TiImage>
    </>
  )
}
```
## TiImage API
### 属性 **Properties**

| 名称            | 类型              | 必填 | 默认值        | 说明                                                                                 | 备注 |
| --------------- | ----------------- | ---- | ------------- | ------------------------------------------------------------------------------------ | ---- |
| src             | `string`          | 是   | -             | 图片资源地址                                                                         | -    |
| mode            | `string`          | 否   | `scaleToFill` | 图片填充模式，[可选类型](#图片填充模式mode)                                                                        | -    |
| width           | `string`          | 否   | -             | 宽度，默认单位为 px                                                                  | -    |
| height          | `string`          | 否   | -             | 高度，默认单位为 px                                                                  | -    |
| radius          | `string`          | 否   | -             | 圆角，默认单位为 px                                                                  | -    |
| showLoading     | `boolean`         | 否   | `false`       | 是否展示图片加载中提示                                                               | -    |
| showError       | `boolean`         | 否   | `false`       | 是否展示图片加载失败提示                                                             | -    |
| loadingIcon     | `string`          | 否   | `default-pic` | 加载中显示的图标                                                                     | -    |
| errorIcon       | `string`          | 否   | `default-pic` | 加载失败显示的图标                                                                   | -    |
| loadingIconSize | `number`          | 否   | `72`          | 加载中显示的图标，尺寸                                                               | -    |
| errorIconSize   | `number`          | 否   | 72            | 加载失败显示的图标，尺寸                                                             | -    |
| useLoadingSlot  | `boolean`         | 否   | false         | 使用 loading 插槽                                                                    | -    |
| useErrorSlot    | `boolean`         | 否   | false         | 使用 error 插槽                                                                      | -    |
| lazyLoad        | `boolean`         | 否   | false         | 图片懒加载，在即将进入一定范围（上下三屏）时才开始加载                               | -    |
| useGlobalStyle  | `boolean`         | 否   | false         | 设为true，可跟随全局圆角风格，即受控于css变量--base-radius-size                      | -    |
| aspectRatio     | `string` `number` | 否   | -1            | 宽高比，如果设置为`inherit`，可跟随全局比例风格，即受控于css变量--image-aspect-ratio | -    |
| extStyle        | `string` \| `Record<string, string>`          | 否   | -             | 根节点样式                                                                           | -    |

#### 图片填充模式（mode）

| 名称         | 含义                                                                                    |
| ------------ | --------------------------------------------------------------------------------------- |
| contain      | 同 aspectFit， 保持宽高缩放图片，使图片的长边能完全显示出来                             |
| cover        | 同 aspectFill， 保持宽高缩放图片，使图片的短边能完全显示出来，裁剪长边                  |
| fill         | 同 scaleToFill，拉伸图片，使图片填满元素                                                |
| none         | 同 center，保持图片原有尺寸                                                             |
| scaleDown    | 内容的尺寸与 none 或 contain 中的一个相同，取决于它们两个之间谁得到的对象尺寸会更小一些 |
| top          | 裁剪模式，不缩放图片，只显示图片的顶部区域                                              |
| bottom       | 裁剪模式，不缩放图片，只显示图片的底部区域                                              |
| center       | 裁剪模式，不缩放图片，只显示图片的中间区域                                              |
| left         | 裁剪模式，不缩放图片，只显示图片的左边区域                                              |
| right        | 裁剪模式，不缩放图片，只显示图片的右边区域                                              |
| top left     | 裁剪模式，不缩放图片，只显示图片的左上边区域                                            |
| top right    | 裁剪模式，不缩放图片，只显示图片的右上边区域                                            |
| bottom left  | 裁剪模式，不缩放图片，只显示图片的左下边区域                                            |
| bottom right | 裁剪模式，不缩放图片，只显示图片的右下边区域                                            |

### 事件 **Events**

| 名称    | 参数列表                                                 | 描述                 | 备注 |
| ------- | -------------------------------------------------------- | -------------------- | ---- |
| onLoad  |  `(e: CustomEvent<{width: number, height: number}>) => void` | 当图片载入完毕时触发 | -    |
| onError | `(e: CustomEvent) => void`                                                        | 当错误发生时触发     | -    |

### 插槽 **Slots**

| 名称    | 说明         | 备注 |
| ------- | ------------ | ---- |
| loading | 加载中展示   | -    |
| error   | 加载失败展示 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 根节点样式类 | -    |
### CSS 变量 **CSS Variable**
| 变量                 | 默认值 | 说明                                                                       | 备注 |
| -------------------- | ------ | -------------------------------------------------------------------------- | ---- |
| --image-aspect-ratio | `1`    | 图片比例，aspectRatio属性为inherit下生效，一般设置在项目根节点，作用于全局 | -    |
| --base-radius-size   | `0px`  | 图片圆角，useGlobalStyle属性为true下生效，一般设置在项目根节点，作用于全局 | -    |