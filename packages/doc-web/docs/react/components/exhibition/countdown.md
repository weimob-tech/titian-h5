---
title: 倒计时
sidebar_custom_props:
  suffix: Countdown
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/countdown"
---

# 倒计时 _Countdown_
**倒计时组件用于实时展示倒计时数值，精度支持毫秒**

## 安装使用
```typescript showLineNumbers
import { TiCountdown } from '@titian-design/mobile-react'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiCountdown autoplay time={time} />
    </>
  )
}
```
#### 格式化时间
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiCountdown format="HH:mm:ss SSS" />
      <TiCountdown format="DD天HH时mm分ss SSS" />
      <TiCountdown format="D天H时m分s SSS" />
    </>
  )
}
```

#### 风格
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiCountdown variant="pure" format="DD天HH:mm:ss SSS" />
      <TiCountdown variant="block" format="DD天HH时mm分ss SSS" />
      <TiCountdown variant="mixture" format="D天H时m分s SSS" />
    </>
  )
}
```

#### 尺寸
**在variant设为`block`或者`mixture`下生效，对应块状尺寸分别为`32px` `40px` `44px` `48px`**
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiCountdown variant="block" size="small" />
      <TiCountdown variant="block" size="medium" />
      <TiCountdown variant="block" size="big" />
      <TiCountdown variant="block" size="large" />
    </>
  )
}
```

#### 启动、暂停、重置
```typescript tsx showLineNumbers
const App: React.FC = () => {
  const ref = useRef();
  const onStart = () => ref.current.start()
  const onPause = () => ref.current.pause()
  const onReset = () => ref.current.reset()
  return (
    <>
      <TiCountdown ref={ref} />
    </>
  )
}
```

#### 自定义内容
```typescript tsx showLineNumbers
const App: React.FC = () => {
  interface TimeGroup {
    day: number;
    hour: number;
    minute: number;
    second: number;
    millisecond: number;
  }
  const [time, setTime] = useState<A>({time: TimeGroup});
  return (
    <>
      <TiCountdown time="118888666" useSlot onChange={e => setTime(e.detail)}>
        <div class="time">{time.day}</div>
        <div class="tag">天</div>
        <div class="time">{time.hour}</div>
        <div class="tag">:</div>
        <div class="time">{time.minute}</div>
        <div class="tag">:</div>
        <div class="time">{time.second}</div>
        <div class="tag">:</div>
        <div class="time">{time.millisecond}</div>
      </TiCountdown>
    </>
  )
}
```
## TiCountdown API
### 属性 **Properties**

| 名称     | 类型      | 必填 | 默认值     | 说明                                                                                                                                         | 备注 |
| -------- | --------- | ---- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------- | ---- |
| variant  | `string`  | 否   | `pure`     | 倒计时的风格，可选值：`pure` `block` `mixture`                                                                                               | -    |
| size     | `string`  | 否   | `medium`   | 倒计时的尺寸，在variant设为`block`或者`mixture`下生效，可选值：`small` `medium` `big` `large`，对应块状尺寸分别为`32px` `40px` `44px` `48px` | -    |
| time     | `number`  | 否   | `1200`     | 倒计时时长，单位毫秒                                                                                                                         | -    |
| format   | `string`  | 否   | `HH:mm:ss` | 时间格式，DD-日，HH-时，mm-分，ss-秒，SSS-毫秒                                                                                               | -    |
| autoplay | `boolean` | 否   | `false`    | 是否自动开始倒计时                                                                                                                           | -    |
| useSlot  | `boolean` | 否   | `false`    | 是否使用自定义样式插槽                                                                                                                       | -    |
| extStyle | `string`  | 否   | -          | 根节点样式                                                                                                                                   | -    |


### 事件 **Events**

| 名称     | 参数列表                                                                                                     | 描述             | 备注 |
| -------- | ------------------------------------------------------------------------------------------------------------ | ---------------- | ---- |
| onFinish | `(e: CustomEvent) => void`                                                                                   | 倒计时结束时触发 | -    |
| onChange | `(e: CustomEvent<{day: number, hour: number, minute: number, second: number, millisecond: number}>) => void` | 时间变化时触发   | -    |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| default | 默认插槽 | -    |

### 外部样式类 **External Classes**

| 名称     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 根节点样式类 | -    |


### CSS 变量 **CSS Variable**
| 变量                          | 默认值    | 说明                       | 备注 |
| ----------------------------- | --------- | -------------------------- | ---- |
| --countdown-color             | `#757575` | 倒计时文字颜色             | -    |
| --countdown-font-size         | `28px`    | 倒计时文字字号             | -    |
| --countdown-line-height       | `34px`    | 倒计时文字行高             | -    |
| --countdown-border-radius     | `8px`     | 块状风格下，圆角           | -    |
| --countdown-background        | `#fff2f2` | 块状风格下，背景色         | -    |
| --countdown-color             | `#ff2e2e` | 块状风格下，文字颜色       | -    |
| --countdown-font-family       | `wemo`    | 块状风格下，文字字体       | -    |
| --countdown-font-weight       | `600`     | 块状风格下，文字字重       | -    |
| --countdown-day-color         | `600`     | 块状风格下，天数文字颜色   | -    |
| --countdown-day-font-size     | `24px`    | 块状风格下，天数文字大小   | -    |
| --countdown-day-margin        | -         | 块状风格下，天数区域的间距 | -    |
| --countdown-dot-color         | `#212121` | 块状风格下，图标冒号颜色   | -    |
| --countdown-dot-size          | `20`      | 块状风格下，图标冒号大小   | -    |
| --countdown-size              | -         | 块状风格下，方块的大小     | -    |
| --countdown-millisecond-width | `52px`    | 块状风格下，毫秒区域的宽度 | -    |
