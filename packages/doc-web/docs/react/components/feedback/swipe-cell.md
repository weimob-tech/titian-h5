---
title: 滑动单元格
sidebar_custom_props:
  suffix: SwipeCell
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/swipe-cell"
---

# 滑动单元格 _SwipeCell_

** 可以左右滑动来展示操作按钮的单元格组件。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiswipecell-api" />

## 安装使用

```typescript showLineNumbers
import { TiSwipeCell } from '@titian-design/mobile-react';
```

## 用法示例

#### 基本使用
```typescript jsx showLineNumbers
const App: React.FC = () => {
  const style = {
    height: 100,
    width: 100,
  }
  const centerStyle = {
    height: 100,
    width: '100%',
  }
  return (
    <TiSwipeCell>
      <div slot="left" style={style}>left</div>
      <div style={centerStyle}>center</div>
      <div slot="right" style={style}>right</div>
    </TiSwipeCell>
  )
}
```

#### 自定义左右宽度

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const style = {
    height: 100,
  }
  const centerStyle = {
    height: 100,
    width: '100%',
  }
  return (
    <>
      <TiSwipeCell leftWidth={200}>
        <div slot="left" style={style}>left</div>
        <div style={centerStyle}>center</div>
      </TiSwipeCell>
      <TiSwipeCell rightWidth={200}>
        <div style={centerStyle}>center</div>
        <div slot="right" style={style}>right</div>
      </TiSwipeCell>
    </>
  )
}
```

#### 禁用滑动
```typescript jsx showLineNumbers
const App: React.FC = () => {
  const style = {
    height: 100,
    width: 100,
  }
  const centerStyle = {
    height: 100,
    width: '100%',
  }
  return (
    <TiSwipeCell disabled>
      <div slot="left" style={style}>left</div>
      <div style={centerStyle}>center</div>
      <div slot="right" style={style}>right</div>
    </TiSwipeCell>
  )
}
```

#### 异步操作控制
```typescript jsx showLineNumbers
const App: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const style = {
    height: 100,
    width: 100,
  }
  const centerStyle = {
    height: 100,
    width: '100%',
  }
  return (
    <>
      <TiButton onClick={() => setVisible(!visible)}>控制</TiButton>
      <TiSwipeCell visible={visible}>
        <div slot="left" style={style}>left</div>
        <div style={centerStyle}>center</div>
      </TiSwipeCell>
    </>
  )
}
```

#### 监听事件

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const handleOpen = useCallback((e: CustomEvent) => {
    console.log("打开", e);
  }, []);

  const handleClose = useCallback((e: CustomEvent) => {
    console.log("关闭", e);
  }, []);

  const handleTiClick = useCallback((e: CustomEvent) => {
    console.log("点击事件触发了", e);
  }, []);

  return (
    <>
      <TiSwipeCell 
        onOpen={handleOpen}
        onClose={handleClose}
        onTiClick={handleTiClick}
       >
        <div slot="left" style={style}>left</div>
        <div style={centerStyle}>center</div>
      </TiSwipeCell>
    </>
  )
}
```

## TiSwipeCell API

### 属性 **Properties**

| 名称       | 类型      | 必填 | 默认值 | 说明               | 备注                                     |
| ---------- | --------- | ---- | ------ | ------------------ | ---------------------------------------- |
| leftWidth  | `number`  | 否   | `0`      | 左边滑动区域宽度   | -                                        |
| rightWidth | `number`  | 否   | `0`      | 右边滑动区域宽度   | -                                        |
| visible    | `boolean` | 否   | `false`  | 设置可滑动区域划开 | 会先从左边到右开始查找是否有内容用于展示 |
| disabled   | `boolean` | 否   | `false`  | 禁止滑动           | -                                        |
| asyncClose | `boolean` | 否   | `false`  | 是否异步关闭       | -                                        |
| name       | `string`  | 否   | `-`      | 唯一标识           | -                                        |

### 事件 **Events**

| 事件名 | 参数 |  说明       | 备注                                                       |
| ------ | ---------- | -------------- | -------------------------------------------- |
| `onOpen`   | `(e: CustomEvent<OpenParams>) => void` | 打开时触发  | -      |
| `onClose`  | `(e: CustomEvent<CloseParams>) => void` | 关闭时触发 | - |
| `onTiClick`  | <code>(e: CustomEvent<left &vert; right &vert; outside &vert; cell \>) => void</code> | 点击时触发 | 关闭时的点击位置 (`left` `right` `cell` `outside`)         |

#### OpenParams
```typescript showLineNumbers
interface OpenParams {
  position: Position;
  name: string;
}
```

#### CloseParams
```typescript showLineNumbers
interface CloseParams {
  position: ClickPosition;
  name: string;
  instance: TiSwipeCell;
}
```

### 插槽 **Slots**
| 名称    | 说明       | 备注 |
| ------- | ---------- | ---- | 
| right | 右侧内容 | -   |
| left    | 左侧内容   | -    | 

### 可扩展样式名 **External Class**

| 名称     | 说明               | 备注 |
| -------- | ------------------ | ---- |
| extClass | 根节点可扩展的类名 | -    |

