---
title: 虚拟列表
sidebar_custom_props:
  suffix: VirtualList
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/virtual-list"
---

# 虚拟列表 _Virtual List_

** 虚拟列表，常用于渲染数据量非常大的列表，通过渲染当前的可视区域，区域外的内容在用户滚动到可视区域内之后再渲染，以保障页面的流畅。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tivirtuallist-api" />

## 安装使用

```ts showLineNumbers
import { TiVirtualList } from '{{packageWeappReact}}';
```

## 用法示例
#### 基本用法

```typescript tsx showLineNumbers
const App: React.FC = () => {
  const virtualListRef = useRef<HTMLTiVirtualListElement>(null);
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    virtualListRef.current?.setListData(data);
  }, [data.length]);

  useEffect(() => {
    virtualListRef.current?.setRenderItem(item => `<div style="height: 50px; width: 100%;">${item}</div>`);
  }, []);

  const handle = useCallback(() => {
    setData(prev =>
      prev.concat(
        Array(10)
          .fill(0)
          .map((_, idx) => (data[data.length - 1] || 0) + idx + 1),
      ),
    );
  }, []);

  return <TiVirtualList ref={virtualListRef} onLoad={handle} />;
}
```

## TiVirtualList API

### 属性 **Properties**

| 名称     | 类型     | 必填 | 默认值 | 说明       | 备注 |
| -------- | -------- | ---- | ------ | ---------- | ---- |
| containerHeight    | `number` | 否   | 当前 document 高度      | 容器高度       | -    |
| itemHeight    | `number` | 否   | 50     | 节点高度       | -    |
| extStyle | `string` | 否   | -      | 根节点样式 | -    |


### 事件 **Events**

| 名称             | 参数列表                                                 | 描述                    | 备注 |
| ---------------- | -------------------------------------------------------- | ----------------------- | ---- |
| onLoad       | `(e: CustomEvent<never>) => void`                 | 滚动到底部时触发 | -    |

### CSS 变量 **CSS Variables**

| 变量 | 默认值 | 说明 | 备注 |
| -------- | -------- | ---- | ------ | 
| --virtual-list-width | 100% | 虚拟列表宽度 | - |
| --virtual-list-background-color | #fff | 虚拟列表背景色 | - |