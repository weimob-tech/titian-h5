---
title: 弹窗
sidebar_custom_props: 
    suffix: Dialog
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/dialog'
---

# 弹窗 _Dialog_
**弹出对话窗，常用于确认、提示等场景。支持 API 式调用和 DOM 式调用。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tidialog-api" />

## 安装使用

```ts showLineNumbers
import { $tiDialog } from '{{packageWeappReact}}';
```


## 用法示例

#### 常规 API 式调用

```typescript tsx showLineNumbers
import { $tiDialog } from '{{packageWeappReact}}'

const App = () => {

    $tiDialog.show({
      title: "Confirm标题",
      content: "内容",
      cancelBtnText: "取消",
      isTextButton: false,
      hasCancelButton: true,
      confirmBtnText: "确定",
      onCancel() {},
      onConfirm() {},
      onClose() {}
    });

    $tiDialog.close()
}
```

#### 使用 DOM 和插槽

```typescript tsx showLineNumbers
const App: React.FC = () => {
  const [visible, setVisible]= useState(false);

  const onConfirm = () => {
    console.log('声明式调用 - dialog onConfirm!');
    setVisible(false);
  };

  const onCancel = () => {
    console.log('声明式调用 - dialog onCancel!');
    setVisible(false);
  };

  const onClose = () => {
    console.log('声明式调用 - dialog onClose!');
    setVisible(false);
  };

  const attr = {
     title: "Show标题",
      content: "内容",
      useContentSlot: "",
      cancelBtnText: "取消",
      isTextButton: false,
      hasCancelButton: true,
      confirmBtnText: "确定",
  };

  return (
    <>
      <TiDialog {...attr} visible={visible} onCancel={onCancel} onConfirm={onConfirm} onClose={onClose}>
        <div>
          插槽
        </div>
      </TiDialog>
    </>
  );
}
```

## TiDialog API

### 属性 **Properties**

| 名称                 | 类型      | 必填 | 默认值 | 说明                                   | 备注 |
| -------------------- | --------- | ---- | ------ | -------------------------------------- | ---- |
| title                | `string`  | 否   | -      | 标题                                   | -    |
| content                 | `string`  | 否   | -      | 内容，支持使用 `\n` 换行                                   | -    |
| zIndex               | `number`  | 否   | 12000  | zIndex                                 | -    |
| hasCancelButton      | `boolean` | 否   | false  | 是否展示取消按钮                       | -    |
| closeOnMask          | `boolean` | 否   | true   | 点击遮罩是否关闭对话框                 | -    |
| closeOnActions       | `boolean` | 否   | true   | 点击`确认`和`取消`按钮，是否关闭对话框 | -    |
| isTextButton         | `boolean` | 否   | false  | 是否为文字按钮                         | -    |
| cancelBtnText        | `string`  | 否   | 取消   | 取消按钮的文案                         | -    |
| confirmBtnText       | `string`  | 否   | 确定   | 确定按钮的文案                         | -    |
| confirmButtonColor   | `string`  | 否   | -      | 确认按钮的颜色                         | -    |
| confirmButtonBgColor | `string`  | 否   | -      | 确认按钮的背景颜色                     | -    |
| cancelButtonColor    | `string`  | 否   | -      | 取消按钮的颜色                         | -    |
| cancelButtonBgColor  | `string`  | 否   | -      | 取消按钮的背景颜色     -               |
| useContentSlot       | `string`  | 否   | -      | 使用自定义内容的 slot                  | -    |
| useActionsSlot       | `string`  | 否   | -      | 使用自定义按钮的 slot                  | -    |
| teleport        | `Element` | 否   | document.body     | DOM 挂载节点                                            | -    |
| preventScroll   | `boolean`  | 否   | true     | 是否锁定背景滚动；实现上采用 document.body.style.overflow = 'hidden' 方式，内部可以滚动。                                          | -    |


### 事件 **Events**

| 名称      | 参数列表 | 描述               | 备注 |
| --------- | -------- | ------------------ | ---- |
| onCancel  | -        | 点击取消按钮时触发 | -    |
| onConfirm | -        | 点击确认按钮时触发 | -    |
| onClose   | -        | 当关闭时触发       | -    |

### 插槽 **Slots**

| 名称    | 说明           | 备注                                   |
| ------- | -------------- | -------------------------------------- |
| default | 内容           | -                                      |
| actions | 自定义按钮插槽 | 当 `use-actions-slot` 为 `true` 时可用 |
| before-title | 标题前插槽 | 当 `title` 为 `true` 时可用 |


### 外部样式类 **External Classes**

| 名称                   | 说明                    | 备注 |
| ---------------------- | ----------------------- | ---- |
| extClass               | 根节点样式类            | -    |
| extPopupClass          | popup/ext-class         | -    |
| extPopupMaskClass      | popup/ext-mask-class    | -    |
| extPopupContentClass   | popup/ext-content-class | -    |
| extInnerClass          | 内部样式                | -    |
| extTitleClass          | 标题样式                | -    |
| extContentClass        | 内容样式                | -    |
| extActionsClass        | 行为区样式              | -    |
| extActionsConfirmClass | 确认样式                | -    |
| extActionsCancelClass  | 取消样式                | -    |

### CSS 变量 **CSS Variables**

| 变量                                | 默认值                                                           | 说明                 | 备注 |
| ----------------------------------- | ---------------------------------------------------------------- | -------------------- | ---- |
| `--dialog-popup-mask-bg-color`      | @popup-mask-bg-color                                             | 遮罩背景色           | -    |
| `--dialog-popup-radius`             | @popup-radius                                                    | 弹窗圆角             | -    |
| `--dialog-popup-box-bg-color`       | @popup-box-bg-color                                              | 弹窗背景色           | -    |
| `--dialog-width`                    | 560px                                                            | 组件宽度             | -    |
| `--dialog-min-height`               | 300px                                                            | 组件最小高度         | -    |
| `--dialog-inner-padding-v`          | 58px 0 44px 0                                                            | 内容区垂直方向内边距 | -    |
| `--dialog-inner-padding-h`          | 48px                                                             | 内容区水平方向内边距 | -    |
| `--dialog-inner-title-color`        | var(--neutral-color-1, #212121)                                  | 内容区标题颜色       | -    |
| `--dialog-inner-content-color`      | var(--neutral-color-1, #212121)                                  | 内容区颜色           | -    |
| `--dialog-actions-height`           | 88px                                                             | 按钮区高度           | -    |
| `--dialog-actions-gap`              | 32px                                                             | 按钮区按钮间距       | -    |
| `--dialog-actions-border-top-color` | var(--neutral-color-6, #f2f2f2)                                  | 按钮区上边线颜色     | -    |
| `--dialog-actions-space`             | 48px                                                             | 按钮区按钮内边距     | -    |
| `--dialog-actions-cancel-color`     | #757575 | 按钮区取消按钮颜色   | -    |
| `--dialog-actions-cancel-border-color`     | #212121 | 按钮区取消按钮边线颜色   | -    |
| `--dialog-actions-cancel-active-color`     | rgba(33, 33, 33, 0.1) | 按钮区取消按钮按压颜色   | -    |
