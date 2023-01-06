---
title: 标签页
sidebar_custom_props:
  suffix: Tabs
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/tabs"
---

# 标签页 _Tabs_
**选项卡切换组件，用于在不同的内容区域之间进行切换**

## 安装使用
```typescript showLineNumbers
import { TiTabs } from 'titian-h5-react'
```

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="titabs-api" />

## 用法示例
#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = ["首页", "商品列表", "购物车", "个人中心"]
  return (
    <>
      <TiTabs tabs={tabs} />
    </>
  )
}
```
#### 自定义字段名称
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = [{name: '首页'}, {name: '我的'}]
  return (
    <>
      <TiTabs tabs={tabs} tabKey="name" />
    </>
  )
}
```
#### 主体内容使用插槽，内置swiper
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = ["首页", "商品列表", "购物车", "个人中心"]
  return (
    <>
      <TiTabs tabs={tabs} useSlot>
        {
          tabs.map((item, index) => (<div key={index} slot={`tab-content-${index}`}>{item}</div>))
        }
      </TiTabs>
    </>
  )
}
```
#### 设置单屏平铺显示的tab数量
**当实际tabs总量小于设置的count值时，默认按当前总数平分整个屏幕。可以设置autoGap为false, 取消默认效果。**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const option1 = ["首页", "商品列表", "购物车", "个人中心", "详情页", "筛选"]
  const option2 = ["首页", "商品列表"]
  return (
    <>
      <TiTabs tabs={option1} count={3} />
      <TiTabs tabs={option2} count={3} />
      <TiTabs tabs={option2} count={3} autoGap={false} />
    </>
  )
}
```
#### 设置每个tab的宽度
**当实际tabs总宽度小于屏幕宽度时，默认按当前总数平分整个屏幕。可以设置autoGap为false, 取消默认效果。**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const option1 = ["首页", "商品列表", "购物车", "个人中心", "详情页", "筛选"]
  const option2 = ["首页", "商品列表"]
  return (
    <>
      <TiTabs tabs={option1} tabWidth={50} />
      <TiTabs tabs={option2} tabWidth={50} />
      <TiTabs tabs={option2} tabWidth={50} autoGap={false} />
    </>
  )
}
```
#### 设置相邻tab之间的间隔
**当实际tabs总宽度小于屏幕宽度时，默认会增加tab之间间隙，到达撑满一屏。可以设置autoGap为false, 取消默认效果。**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const option1 = ["首页", "商品列表", "购物车", "个人中心", "详情页", "筛选"]
  const option2 = ["首页", "商品列表"]
  return (
    <>
      <TiTabs tabs={option1} gap={50} />
      <TiTabs tabs={option2} gap={50} />
      <TiTabs tabs={option2} gap={50} autoGap={false} />
    </>
  )
}
```
#### tabs组件内置吸顶
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = ["首页", "商品列表"]
  return (
    <>
      <TiTabs tabs={tabs} sticky offsetTop={100} />
    </>
  )
}
```
#### 禁用项
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = ["首页", "商品列表", "购物车", "个人中心", "详情页", "筛选"]
  return (
    <>
      <TiTabs tabs={tabs} disabledTabs={[3]} />
    </>
  )
}
```
#### 风格设置
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = ["首页", "商品列表"]
  const calendarTabs = [
    { label: '01', description: '周一' }, 
    { label: '02', description: '周二' }
  ]
  const multiTabs = [
    { label: '第一期', description: '01.01', date: '2022-01-01' }, 
    { label: '第二期', description: '10.01', date: '2022-10-01', tag: '国庆节'},
    { label: '第三期', description: '12.02', date: '2022-12-02' },
    { label: '第四期', description: '12.03', date: '2022-12-03' }
  ]
  return (
    <>
      <TiTabs tabs={tabs} variant="pure" />
      <TiTabs tabs={tabs} variant="block" />
      <TiTabs tabs={calendarTabs} variant="calendar" />
      <TiTabs tabs={multiTabs} variant="multi" />
    </>
  )
}
```
#### 风格线设置
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const tabs = ["首页", "商品列表"]
  return (
    <>
      <TiTabs tabs={tabs} divider="default" />
      <TiTabs tabs={tabs} divider="line" />
      <TiTabs tabs={tabs} divider="shadow" />
    </>
  )
}
```
## TiTabs API
### 属性 **Properties**

| 名称         | 类型                                 | 必填 | 默认值  | 说明                                                                                         | 备注 |
| ------------ | ------------------------------------ | ---- | ------- | -------------------------------------------------------------------------------------------- | ---- |
| variant      | `string`                             | 否   | `pure`  | 标签页的风格，可选值：`block` `pure` `calendar` `multi`                                      | -    |
| tabs         | `array` \| `Array<Option>`           | 是   | -       | 数据项, ['首页', '我的'] 或者 [{label: '首页'}，{label: '我的'}]                             | -    |
| activeTab    | `number` \| `string`                 | 否   | `0`     | 选中项索引，或者 tab-key 对应的值                                                            | -    |
| disabledTabs | `array`                              | 否   | -       | 禁用的数据项                                                                                 | -    |
| duration     | `number`                             | 否   | `500`   | 滑动动画时长                                                                                 | -    |
| divider      | `string`                             | 否   | -       | 分割线类型，可选值：`line` `shadow` `default`                                                | -    |
| sticky       | `boolean`                            | 否   | `false` | 是否有吸顶效果                                                                               | -    |
| offsetTop    | `number`                             | 否   | 0       | 吸顶距离                                                                                     | -    |
| usePureCss   | `boolean`                            | 否   | `false` | 使用css的position: sticky实现                                                                | -    |
| count        | `number`                             | 否   | `5`     | 单屏展示的菜单数量                                                                           | -    |
| tabWidth     | `number`                             | 否   | -       | 每个菜单的宽度，单位 px，设置此项后 count 则无效                                             | -    |
| gap          | `number`                             | 否   | `-1`    | tab(文字)间距，单位 px，设置此项后 tab-width 和 count 无效                                   | -    |
| autoGap      | `boolean`                            | 否   | `true`  | 当 tab 总宽度不够一屏，采用平铺模式                                                          | -    |
| useSlot      | `boolean`                            | 否   | `false` | 是否启用插槽，即内置 swiper 组件                                                             | -    |
| extStyle     | `string` \| `Record<string, string>` | 否   | -       | 根节点样式                                                                                   | -    |
| tabKey       | `string`                             | 否   | `label` | tabs 如果是对象数组，对应每项的关键词 key                                                    | -    |
| alias        | `Record<string, string>`             | 否   | -       | 数据项默认字段名`label` `description` `tag` `date`的别名，用于自定义数据，可替代`tabKey`属性 | -    |
### Option

API 中的 tabs 可以为一个对象数组，数组中的每一个对象有以下 key：

| 名称        | 类型     | 必填 | 默认值 | 说明                                                                                  | 备注 |
| ----------- | -------- | ---- | ------ | ------------------------------------------------------------------------------------- | ---- |
| label       | `string` | 否   | -      | 标题                                                                                  | -    |
| description | `string` | 否   | -      | variant设置`calendar`或者`multi`可用，标题下描述文字                                  | -    |
| tag         | `string` | 否   | -      | variant设置`multi`可用，最下方标签，如设置日期标签国庆节等                            | -    |
| date        | `string` | 否   | -      | variant设置`multi`可用，设置日期如：2022-12-01，如果是当前日期，下标tag将会写成`当前` | -    |

### 事件 **Events**

| 名称     | 参数列表                                                                  | 描述                               | 备注 |
| -------- | ------------------------------------------------------------------------- | ---------------------------------- | ---- |
| onChange | `(e: CustomEvent<{index: number, item: Record<string, string>}>) => void` | 当前激活的标签                     | -    |
| onFixed  | `(e: CustomEvent<{isFixed: boolean}>) => void`                            | 使用吸顶功能是，吸顶状态改变是触发 | -    |
| onTiClick  | `(e: CustomEvent<{index: number, item: Record<string, string>}>) => void` | 点击tab项时触发 | -    |
| onDisabled  | `(e: CustomEvent<{index: number, item: Record<string, string>}>) => void` | 点击禁用的tab项时触发 | -    |

### 插槽 **Slots**

| 名称                 | 说明                                                                                            | 备注 |
| -------------------- | ----------------------------------------------------------------------------------------------- | ---- |
| tab-content-${index} | 每个标签页展示项，index为tabs的索引，如果使用插槽请用可扩展样式类名`swiper-class`设置容器高度。 | -    |

### 外部样式类 **External Classes**

| 名称           | 说明               | 备注                                                            |
| -------------- | ------------------ | --------------------------------------------------------------- |
| tabActiveClass | 选中节点样式名     | -                                                               |
| tabTextClass   | tab 文字容器样式名 | 可设置缺省或者截断                                              |
| swiperClass    | swiper 容器样式名  | -                                                               |
| tabsClass      | tabs 样式名        | -                                                               |
| tabsMarkClass  | 当前项底部标志类名 | 如果修改下划线的宽度，在自定义样式类里加--tabs-mark-width: 10px |
| extClass       | 根节点样式类名     | -                                                               |

### CSS 变量 **CSS Variable**

| 变量                           | 默认值    | 说明                               | 备注 |
| ------------------------------ | --------- | ---------------------------------- | ---- |
| --tabs-background-color        | `#fff`    | tabs背景颜色                       | -    |
| --tabs-swiper-background-color | `#fff`    | tabs下方swiper内容部分背景颜色     | -    |
| --tabs-tab-height              | `88px`    | tabs高度                           | -    |
| --tabs-swiper-height           | `150px`   | tabs下方swiper内容部分高度         | -    |
| --tabs-tab-color               | `#757575` | tabs文字颜色                       | -    |
| --tabs-tab-font-size           | `28px`    | tabs文字字号                       | -    |
| --tabs-active-text-color       | `#212121` | tabs激活项文字颜色                 | -    |
| --tabs-active-line-color       | `#fa2c19` | tabs激活项下标颜色，默认跟随主题色 | -    |