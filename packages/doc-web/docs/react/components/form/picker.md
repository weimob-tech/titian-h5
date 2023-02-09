---
title: 选择器
sidebar_custom_props:
  suffix: Picker
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/picker"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 选择器 _Picker_

**选择器，提供单列、双列、级联能力。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tipicker-api" />

## 安装使用

```ts showLineNumbers
import { TiPicker, TiPickerItem } from '@titian-design/mobile-react';
```

## 用法示例

#### 单列数据
options 字段数据结构：[PickerAcronymColumn](#简易模式--列数据结构-pickeracronymcolumn) 或 [PickerColomn](#列数据结构-pickercolumn)

简易属性模式：

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const options = ['选项一', '选项二', '选项三', '选项四', '选项五'];
  const value = ['选项二'];

  return (
    <TiPicker options={ options } value={ value } onConfirm={onConfirm} />
  );
}
```

完整属性模式：

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const options = {
    colAlias: 'a',
    column: ['选项一', '选项二', '选项三', '选项四', '选项五'],
  };
  const value = [
    { colAlias: 'a', value: '选项二' },
  ];

  return (
    <TiPicker options={ options } value={ value } onConfirm={onConfirm} />
  );
}
```

#### 多列数据 
options 字段数据结构： [PickerAcronymColumn](#简易模式--列数据结构-pickeracronymcolumn) 或 [PickerColomn](#列数据结构-pickercolumn)

简易属性模式：

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const options = [
    ['选项一', '选项二', '选项三', '选项四', '选项五'],
    ['选项一', '选项二', '选项三', '选项四', '选项五']
  ];

  const value = ['选项二', '选项三']

  return (
    <TiPicker options={ options } value={ value } onConfirm={onConfirm} />
  );
}
```

完整属性模式：

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const options = [
    {
      colAlias: 'a',
      column: ['选项一', '选项二', '选项三', '选项四', '选项五'],
    },
    {
      colAlias: 'b',
      column: ['选项一', '选项二', '选项三', '选项四', '选项五'],
    },
  ];

  const value = [
    { colAlias: 'a', value: '选项二' },
    { colAlias: 'b', value: '选项三' },
  ];

  return (
    <TiPicker options={ options } value={ value } onConfirm={onConfirm} />
  );
}
```

#### 有禁用项
options 字段数据结构： [PickerAcronymColumn](#简易模式--列数据结构-pickeracronymcolumn) 或 [PickerColomn](#列数据结构-pickercolumn)


```typescript jsx showLineNumbers
const App: React.FC = () => {

   const options = [
    { text: '选项一', disabled: true },
    { text: '选项二' },
    { text: '选项三', disabled: true },
    { text: '选项四' },
    { text: '选项五', disabled: true },
    { text: '选项六' },
  ];

  const value = ['选项二'];

  return (
    <TiPicker options={ options } value={ value } onConfirm={onConfirm} />
  );
}
```

#### 级联数据
options 字段数据结构： [PickerAcronymColumn](#简易模式--列数据结构-pickeracronymcolumn) 或 [PickerColomn](#列数据结构-pickercolumn)


```typescript jsx showLineNumbers
const App: React.FC = () => {

  const options = [
    {
      code: '310000',
      name: '上海市',
      children: [
        {
          code: '310100',
          name: '直辖市',
          children: [
            {
              code: '310101',
              name: '黄浦区',
            },
          ],
        },
      ],
    },
    {
      code: '330000',
      name: '浙江省',
      children: [
        {
          code: '330100',
          name: '杭州市',
          children: [
            {
              code: '330102',
              name: '上城区',
            },
            {
              code: '330105',
              name: '拱墅区',
            },
          ],
        },
      ],
    },
  ];

  const value = ['330105'];

  return (
    <TiPicker label={'name'} rowAlias={'code'} options={ options } onConfirm={onConfirm} />
  );
}
```

## TiPicker API

### 属性 **Properties**

| 名称             | 类型                                                                                            | 必填 | 默认值  | 说明                                                                                | 备注 |
| ---------------- | ----------------------------------------------------------------------------------------------- | ---- | ------- | ----------------------------------------------------------------------------------- | ---- |
| options          | `PickerColumn[]` \| `PickerColumn[][]` \| `PickerAcronymColumn[]`  \| `PickerAcronymColumn[][]` | 否   | []      | 列数据；可以使用该字段实现 PickerColumn 列表， 替换使用 `<TiPickerColumn />` 元素。 | -    |
| value            | 值                                                                                              | 否   | -       |                                                                                     | -    |
| rowAlias         | null \| `number` \| `string`                                                                    | 否   | null    | 当 option 为对象类型时，指定其中某个字段，作为 value 字段；不填则从`0`自增；        |      |
| useRowIndex      | `boolean`                                                                                       | 否   | false   | 是否使用下标                                                                        |      |
| sports           | `boolean`                                                                                       | 否   | false   | 跳转指定位置是否带有动画                                                            | -    |
| cascade          | `boolean`                                                                                       | 否   | false   | 级联                                                                                | -    |
| label            | `string`                                                                                        | 否   | 'label' | 当 option 为对象类型时，设置某个字段作为展示字段                                    | -    |
| visibleItemCount | `number`                                                                                        | 否   |         | 展示项数                                                                            | -    |
| loading          | `boolean`                                                                                       | 否   | false   | 是否展示加载中                                                                      | -    |
| optionItemHeight | `string` \| `number`                                                                            | 否   | 108px   | 单项高度，单位px                                                                    | -    |
| titlebar         | `boolean`                                                                                       | 否   | true    | 是否使用 TiPopupTitlebar 组件                                                       | -    |
| title            | `string`                                                                                        | 否   | ''      | 标题文案，透传给 TiPopupTitlebar                                                    |      |
| subTitle         | `string`                                                                                        | 否   | ''      | 副标题文案，透传给 TiPopupTitlebar                                                  |      |
| confirmText      | `string`                                                                                        | 否   | 确定    | 确认按钮文案，透传给 TiPopupTitlebar                                                |      |
| cancelText       | `string`                                                                                        | 否   | 取消    | 取消按钮文案，透传给 TiPopupTitlebar                                                |      |
| extStyle         | `string`                                                                                        | 否   | ''      | 容器样式                                                                            | -    |
| extOptionStyle   | `string`                                                                                        | 否   | ''      | 子器样式                                                                            | -    |

---

#### Options 字段类型说明
| 值类型                    | 说明             | 备注 |
| ------------------------- | ---------------- | ---- |
| `PickerColumn[]`          | 完整列，单列数组 | —    |
| `PickerColumn[][]`        | 完整列，双列数组 | —    |
| `PickerAcronymColumn[]`   | 简易列，单列数组 | —    |
| `PickerAcronymColumn[][]` | 简易列，双列数组 | —    |

### 事件 **Events**

| 名称          | 参数                                                                       | 说明                | 备注            |
| ------------- | -------------------------------------------------------------------------- | ------------------- | --------------- |
| onChange      | 见 [change \| select 事件返回值](#change--select--事件返回值)              | 当前选中项          | -               |
| onReachTop    | 见 [`reachTop`/`reachBottom`事件返回值](#reachtop--reachbottom-事件返回值) | 运动到顶            | -               |
| onReachBottom | 见 [`reachTop`/`reachBottom`事件返回值](#reachtop--reachbottom-事件返回值) | 运动到底            | -               |
| onConfirm     | 见 [`confirm`/`cancel`事件返回值](#confirm--cancel-事件返回值)             | titleBar 的确认操作 | `titlebar:true` |
| onCancel      | 见 [`confirm`/`cancel`事件返回值](#confirm--cancel-事件返回值)             | titleBar 的取消操作 | `titlebar:true` |

### 插槽 **Slots**

| 名称    | 说明          | 备注 |
| ------- | ------------- | ---- |
| default | picker-column | —    |

### 外部样式类 **External Classes**

| 名称               | 说明         | 备注 |
| ------------------ | ------------ | ---- |
| extHairlineClass   | 中间线样式   | -    |
| extMaskClass       | 蒙层样式     | -    |
| extOptionClass     | 纵列容器样式 | -    |
| extOptionItemClass | 纵列单项样式 | -    |
| extClass           | 容器样式     | -    |

### CSS 变量 **CSS Variables**

| 变量                        | 默认值                                                                      | 说明                                                         | 备注 |
| --------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------ |
| --picker-mask-bg-image      | linear-gradient(180deg, rgba(255, 255, 255, 90%), rgba(255, 255, 255, 40%)) | 蒙层区背景色                                                 | -    |
| --picker-loading-bg-color   | var(--neutral-color-9, #ffffff)                                             | loading 区背景色                                             | -    |
| --picker-row-color          | var(--neutral-color-1, #212121)                                             | 同 `picker-column` 组件 `--picker-column-row-color`          | -    |
| --picker-row-selected-color | var(--neutral-color-1, #212121)                                             | 同 `picker-column` 组件 `--picker-column-row-selected-color` | -    |
| --picker-row-disabled-color | var(--neutral-color-1, #212121)                                             | 同 `picker-column` 组件 `--picker-column-row-disabled-color` | -    |

## TiPickerColumn API

### 属性 **Properties**

| 名称        | 类型                                   | 必填 | 默认值 | 说明                                                               | 备注 |
| ----------- | -------------------------------------- | ---- | ------ | ------------------------------------------------------------------ | ---- |
| colAlias    | `string` \| `number`                   | 否   | null   | PickerColumn 的别名； 多列时有用                                   | -    |
| rowAlias    | `string`                               | 否   | ''     | 当 option 为对象类型时，指定其中某个字段的值，作为返回值中的 value | -    |
| value       | `string` \| `number`                   | 否   | null   | 默认选中项                                                         | -    |
| columns     | `string[]` \| `number[]` \| `object[]` | 否   | []     | 列数据                                                             | -    |
| sports      | `boolean`                              | 否   | false  | columns 或者 value 发生变化时候是否展示动画                        | -    |
| label       | `string`                               | 否   | label  | 当 option 为对象类型时，指定其中某个字段的值，作为展示文案         | -    |
| useRowIndex | `boolean`                              | 否   | false  | 是否使用下标                                                       | -    |
| extStyle    | `string`                               | 否   | ''     | 容器样式                                                           | -    |

### 事件 **Events**

| 名称        | 参数                                                                       | 说明           | 备注 |
| ----------- | -------------------------------------------------------------------------- | -------------- | ---- |
| select      | 见 [change \| select 事件返回值](#change--select--事件返回值)              | 当前选中项     | -    |
| reachTop    | 见 [`reachTop`/`reachBottom`事件返回值](#reachtop--reachbottom-事件返回值) | 运动到顶时触发 | -    |
| reachBottom | 见 [`reachTop`/`reachBottom`事件返回值](#reachtop--reachbottom-事件返回值) | 运动到底时触发 | -    |


### 外部样式类 **External Classes**

| 名称     | 说明     | 备注 |
| -------- | -------- | ---- |
| extClass | 容器样式 | ---- |

### CSS 变量 **CSS Variables**

| 变量                                | 默认值                                                              | 说明         | 备注 |
| ----------------------------------- | ------------------------------------------------------------------- | ------------ |
| --picker-column-row-color           | var(--picker-row-color, var(--neutral-color-1, #212121))            | 文字颜色     | -    |
| --picker-column--row-selected-color | var(--picker-column-row-selected-color, @picker-row-selected-color) | 选中文字颜色 | -    |
| --picker-column--row-disabled-color | var(--picker-column-row-disabled-color, @picker-row-disabled-color) | 禁用文字颜色 | -    |


## 数据结构 **Data Structure**

#### 列数据结构 `PickerColumn`
| 字段          | 类型                             | 必填 | 默认值  | 说明                                    |
| ------------- | -------------------------------- | ---- | ------- | --------------------------------------- |
| colAlias      | `string` \| `number` \| `symbol` | 否   | 类型    | 列别名，不填则从`0`自增                 |
| column        | `PickerAcronymColumn[]`          | 否   | 类型    | 列数据                                  |
| id            | `string`                         | 否   | 默认值  | id                                      |
| isTree        | `boolean`                        | 否   | 默认值  | 是否为树形结构                          |
| children      | `undefined`                      | 否   | 默认值  | 子数据                                  |
| columnId      | `string`                         | 否   | 默认值  | 唯一id                                  |
| [key: string] | `unknown`                        | 否   | `label` | 展示文案的字段，与 `label` 字段的值对应 |

#### 简易模式 / 列数据结构 `PickerAcronymColumn`

简易模式下，传入的字段同时作为每一项的 key 和 value。
```typescript tsx showLineNumbers
type PickerAcronymColumn = string | { [key: string]: unknown, disabled?: boolean };
```

#### `change` | `select`  事件返回值
| 字段     | 类型                   | 说明   | 备注 |
| -------- | ---------------------- | ------ | ---- |
| value    | `unknow`               | 类型   | -    |
| options  | `undefined`            | 集合   |      |
| colIndex | `string` \| `number`   | 列索引 |      |
| colAlias | `string`               | 列别名 |      |
| rowIndex | `string`   \| `number` | 行索引 |      |
| rowAlias | `boolean`              | 行别名 |      |


#### `reachTop` | `reachBottom` 事件返回值
| 字段     | 类型                   | 说明   | 备注 |
| -------- | ---------------------- | ------ | ---- |
| colIndex | `string` \| `number`   | 列索引 | -    |
| rowIndex | `string`   \| `number` | 行索引 | -    |
| colAlias | `string`               | 列别名 | -    |

#### `confirm` | `cancel` 事件返回值
| 字段    | 类型                                                                                   | 说明                  | 备注 |
| ------- | -------------------------------------------------------------------------------------- | --------------------- | ---- |
| value   | `PickerAcronymColumn` \| `PickerAcronymColumn[]` \| `PickerColumn` \| `PickerColumn[]` | 返回 value 字段       | -    |
| options | `PickerAcronymColumn` \| `PickerAcronymColumn[]` \| `PickerColumn` \| `PickerColumn[]` | 返回选中的整个 option | -    |
