---
title: 评分
sidebar_custom_props:
  suffix: Rate
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/rate"
---

# 评分 _Rate_

**提供评分能力。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tirate-api" />


## 安装使用

```typescript showLineNumbers
import { TiRate } from '{{packageWeappReact}}';
```

## 用法示例

#### 基础用法

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" />
    </>
  )
}
```

#### 半星

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" allowHalf />
    </>
  )
}
```

#### 只读

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" readOnly />
    </>
  )
}
```

#### 可清空

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" clearable />
    </>
  )
}
```

#### 设置星级

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" count="7" clearable />
    </>
  )
}
```

#### 间距

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" extStyle="--rate-gap: 10px;" />
    </>
  )
}
```

#### 评星尺寸

```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
       <TiRate value="3" iconSize="48" />
    </>
  )
}
```

#### 绑定事件
```typescript tsx showLineNumbers
import { useState } from 'react';

const App: React.FC = () => {

  const [value, setValue] = useState(10);

  const onChangeHandler = (event)=> {
    setValue(event.detail.value);
  }

  return (
    <section>
      // 常规
      <TiRate value={value} onChange={onChangeHandler} />
    </section>
  )
}
```
## TiRate API

### 属性 **Properties**

| 属性      | 类型      | 默认值                | 说明                 |
| --------- | --------- | --------------------- | -------------------- |
| value     | `number`  | `0`                   | 值                   |
| allowHalf | `boolean` | `false`               | 允许半星             |
| clearable | `boolean` | `false`               | 可清空               |
| count     | `number`  | `5`                   | 评分数量             |
| icon      | `string`  | `rate-star-highlight` | 评分 icon 图标       |
| iconSize  | `string`  | `36`                  | 评分 icon 图标尺寸   |
| emptyIcon | `string`  | `rate-star-highlight` | 评分 icon 未选中图标 |
| readOnly  | `boolean` | `false`               | 是否只读             |

### 事件 **Events**

| 名称   | 参数列表                                 | 描述                 | 备注 |
| ------ | ---------------------------------------- | -------------------- | ---- |
| onChange | `(e: CustomEvent<{value: number}>) => void` | 评分变化时触发该事件 | -    |

### CSS 变量 **CSS Variables**

| CSS 变量           | 默认值                                    | 说明           | 备注 |
| ------------------ | ----------------------------------------- | -------------- | ---- |
| --rate-gap         | 24px                                      | 评星间距       | -    |
| --rate-color       | rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))          | 评分选中颜色   | -    |
| --rate-empty-color | var(--neutral-color-5, #e0e0e0) | 评星未选中颜色 | -    |
