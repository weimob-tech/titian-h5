---
title: 分享面板
sidebar_custom_props:
  suffix: ShareSheet
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/share-sheet"
---

# 分享面板 _ShareSheet_
**底部弹起的分享面板，用于展示各分享渠道对应的操作按钮，不含具体的分享逻辑**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tisharesheet-api" />

## 安装使用
```typescript showLineNumbers
import { TiShareSheet } from '@titian-design/react'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const options = [
    { name: "微信", icon: "share-wechat", color: "#f5f5f5", bgc: "#26c85a" },
    { name: "朋友圈", icon: "link" },
    { name: "QQ", icon: "picture" },
    { name: "微博", icon: "goods" }
  ];
  const [visible, setVisible] = useState(true);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <TiShareSheet visible={visible} options={options} onClose={onClose} />
    </>
  )
}
```

#### 多行模式
**数据项配置成二位数据，即展示多行**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const options = [
    [
      { name: "微信", icon: "share-wechat", color: "#f5f5f5", bgc: "#26c85a" },
      { name: "朋友圈", icon: "link" },
    ],
    [
      { name: "QQ", icon: "picture" },
      { name: "微博", icon: "goods" },
    ],
  ];
  const [visible, setVisible] = useState(true);
  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <TiShareSheet visible={visible} options={options} onClose={onClose} />
    </>
  )
}
```
## TiShareSheet API
### 属性 **Properties**

| 名称        | 类型                                 | 必填 | 默认值 | 说明                                           | 备注 |
| ----------- | ------------------------------------ | ---- | ------ | ---------------------------------------------- | ---- |
| options     | `Array<Option>`                      | 否   | -      | 数据配置项，使用多行模式的情况需配置成二维数组，[Option类型](#option) | -    |
| visible     | `boolean`                            | 否   | -      | 是否显示                                       |      |
| title       | `string`                             | 否   | -      | 顶部标题                                       |      |
| subTitle    | `string`                             | 否   | -      | 顶部副标题                                     |      |
| cancelText  | `string`                             | 否   | `取消` | 取消文案                                       | -    |
| closeOnMask | `boolean`                            | 否   | `true` | 同popup/close-on-mask                            | -    |
| extStyle    | `string` \| `Record<string, string>` | 否   | -      | 容器样式                                       |      |
| teleport        | `Element` | 否   | document.body     | DOM 挂载节点                                            | -    |


### Option
**API 属性中的 options 为一个数组或者二维数组，数组中的每一个对象有以下 key：**

| 名称      | 类型      | 是否必填 | 默认值  | 说明                          | 备注 |
| --------- | --------- | -------- | ------- | ----------------------------- | ---- |
| name      | `string`  | 否       | -       | 文案                          |  -    |
| icon      | `string`  | 否       | -       | 字体图标(支持传入图片 URL )   |   -   |
| bgc       | `string`  | 否       | -       | 图标背景色                    |   -   |
| color     | `string`  | 否       | -       | 字体图标颜色                  |   -   |
| size      | `number`  | 否       | `48`    | 字体图标颜大小                |   -   |
| isSvgPath | `boolean` | 否       | `false` | 是否是加载 TiSvgPathView 组件 |   -   |

### 事件 **Events**

| 名称     | 参数列表                        | 描述                                     | 备注 |
| -------- | ------------------------------- | ---------------------------------------- | ---- |
| onSelect | `(e: CustomEvent) => void` | 选中选项时触发 | -    |
| onCancel | `(e: CustomEvent) => void`            | 取消按钮点击时触发                       | -    |
| onClose  | `(e: CustomEvent) => void`            | 点击遮罩时触发                           | -    |

### 外部样式类 **External Classes**

| 名称                 | 说明                           | 备注 |
| -------------------- | ------------------------------ | ---- |
| extClass             | 根节点可扩展的类名             | -    |
| extPopupClass        | 同popup组件的ext-class         | ---- |
| extPopupMaskClass    | 同popup组件的ext-mask-class    | ---- |
| extPopupContentClass | 同popup组件的ext-content-class | ---- |
| extTitleClass        | 折叠面板标题样式               | -    |

### CSS 变量 **CSS Variable**

| 变量                                    | 默认值                                | 说明 | 备注 |
| --------------------------------------- | ------------------------------------- | ---- | ---- |
| --share-sheet-cancel-height             | `108px` | 分享面板取消按钮高度                  | -    |
| --share-sheet-content-margin-v          | `60px` | 内容区垂直方向的内边距                | -    |
| --share-sheet-content-margin-h          | `0px` | 内容区水平方向的内边距                | -    |
| --share-sheet-row-offset                | `36px` | 多行面板每行之间下外边距              | -    |
| --share-sheet-item-text-offset          | `12px` | 分享面板文字上外边距                  | -    |
| --share-sheet-item-text-color           | `#212121` | 分享面板文字颜色                      | -    |
| --share-sheet-item-icon-size            | `96px` | 分享面板 icon 尺寸                    | -    |
| --share-sheet-item-icon-bg-color        | `#f5f5f5` | 分享面板 icon 背景色                  | -    |
| --share-sheet-item-icon-radius          | `50%` | 分享面板 icon 圆角                    | -    |
| --share-sheet-item-min-width            | `168px` | 分享面板单项最小宽度                  | -    |
| --share-sheet-cancel-bg-color           | `#f5f5f5` | 分享面板取消按钮背景颜色              | -    |
| --share-sheet-cancel-color              | `#757575` | 分享面板取消按钮字体颜色              | -    |
| --share-sheet-cancel-placeholder-height | `20px` | 分享面板取消按钮容器整体高度          | -    |
| --share-sheet-popup-mask-bg-color       | `#212121` | 同 `Popup` 组件 --popup-mask-bg-color | -    |
| --share-sheet-popup-radius              | `calc(var(--base-radius-size, 0px) + 16px)` | popup的圆角，默认跟随全局圆角风格 | -    |
| --share-sheet-popup-box-bg-color        | `#ffffff` | 同 `Popup` 组件 --popup-box-bg-color  | -    |