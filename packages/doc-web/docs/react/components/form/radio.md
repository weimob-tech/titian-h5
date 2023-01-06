---
title: 单选框
sidebar_custom_props:
  suffix: Radio
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/radio"
---

# 单选框 _Radio_

** 单选框。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiradio-api" />

## 安装使用

```typescript showLineNumbers
import { TiRadio, TiRadioGroup, TiRadioButton } from 'titian-h5-react';
```

#### TiRadio 基本使用

** 组件附带文字内容**

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadio />
      <TiRadio label="文字内容" />
      <TiRadio>文字内容</TiRadio>
    </>
  );
}
```

#### 默认选中状态
** 当设置 checked 时为受控模式，单选框的选中状态将由使用者控制，当设置 defaultChecked时为非受控模式，选中状态将由组件内部控制。默认为非受控模式。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadio label="默认选中" checked />
      <TiRadio label="默认选中" defaultChecked />
    </>
  );
}
```

#### 禁用点击效果
** 当设置 disabled 时， 组件将禁用组件的图标和文字的点击切换效果，当设置 labelDisabled 时将禁用文字的点击效果，实现更细粒的控制。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadio label="禁用全部点击效果" disabled />
      <TiRadio label="禁用文字点击效果" labelDisabled />
    </>
  );
}
```

#### 修改单选框的圆角度数
** 单选框可自定义边框角度，支持方形（square）、圆形（circle）和自定义角度，默认为圆形。 **
> 当自定义角度时，会自动根据屏幕分辨率调整数字大小！

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadio label="方形" shape="square" />
      <TiRadio label="圆形" shape="circle" />
      <TiRadio label="自定义角度" shape={4} />
    </>
  );
}
```

#### 组件图标设置
** 单选框支持自定义组件图标, 图标大小，图标颜色等。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadio label="默认图标" defaultChecked />
      <TiRadio label="自定义图标" icon="plus" defaultChecked />
      <TiRadio label="自定义图标大小" size={64} defaultChecked />
    </>
  );
}
```

#### 监听单选框选中状态变化

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const handleChange = useCallback((e: CustomEvent<boolean>) => {
    console.log(`组件选中状态: ${e.detail ? '选中' : '未选中'}`);
  }, []);
  return (
    <>
      <TiRadio label="监听切换状态变化" onChange={handleChange} />
    </>
  );
}
```

### TiRadioButton 示例

#### 基本使用

** 组件附带文字内容。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadioButton label="单选按钮" />
      <TiRadioButton>单选按钮</TiRadioButton>
    </>
  );
}
```

#### 默认选中状态

** 当设置 checked 时为受控模式，单选按钮的选中状态将由使用者控制，当设置 defaultChecked 时为非受控模式，选中状态将由组件内部控制。默认为非受控模式。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadioButton label="默认选中" checked />
      <TiRadioButton label="默认选中" defaultChecked />
    </>
  );
}
```

#### 组件内容设置
** 单选按钮支持自定义前后内容，图标等。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadioButton label="设置右侧图标" icon="sort-inactive" />
      
      <TiRadioButton label="自定义左侧内容">
        <TiImage
          extStyle={{ marginRight: "6px" }}
          slot="prefix"
          width={40}
          radius={0}
          height={40}
          src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
        />
      </TiRadioButton>
      
      <TiRadioButton label="自定义右侧内容">
        <TiImage
          extStyle={{ marginLeft: "6px" }}
          slot="suffix"
          width={40}
          radius={0}
          height={40}
          src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
        />
      </TiRadioButton>
    </>
  );
}
```

#### 改变单选按钮颜色
** 单选按钮默认根据主题色变化，如需改变按钮颜色可参考下面示例。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const styles: any = {
    "--radio-button-checked-border-color": "rgba(30, 128, 255, 40%)",
    "--radio-button-checked-bg-color": "rgba(30, 128, 255, 10%)",
    "--radio-button-checked-text-color": "rgba(30, 128, 255, 100%)"
  };
  
  return (
    <>
      <TiRadioButton label="通过属性更改颜色" color="#2a6ae9" />
      <div style={styles}>
        <TiRadioButton label="通过 css 变量更改颜色" />
      </div>
    </>
  );
}
```

#### 监听单选按钮选中状态变化

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const handleChange = useCallback((e: CustomEvent<boolean>) => {
    console.log(`组件选中状态: ${e.detail ? '选中' : '未选中'}`);
  }, []);
  return (
    <>
      <TiRadioButton label="监听切换状态变化" onChange={handleChange} />
    </>
  );
}
```

### TiRadioGroup 示例

#### 基本使用

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadioGroup>
        <TiRadio label="文字内容-1" value="1" />
        <TiRadio label="文字内容-2" value="2" />
        <TiRadio label="文字内容-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup>
        <TiRadioButton label="文字内容-1" value="1" />
        <TiRadioButton label="文字内容-2" value="2" />
        <TiRadioButton label="文字内容-3" value="3" />
      </TiRadioGroup>
    </>
  );
}
```

#### 禁用所有单选框点击效果
** 当设置 disabled 时， 子组件将禁用组件的图标和文字的点击切换效果，当设置 labelDisabled 时将禁用子组件文字的点击效果，实现更细粒的控制。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadioGroup disabled>
        <TiRadio label="禁用整体点击效果-1" value="1" />
        <TiRadio label="禁用整体点击效果-2" value="2" />
        <TiRadio label="禁用整体点击效果-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup labelDisabled>
        <TiRadio label="禁用文字点击效果-1" value="1" />
        <TiRadio label="禁用文字点击效果-2" value="2" />
        <TiRadio label="禁用文字点击效果-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup disabled>
        <TiRadioButton label="禁用点击效果-1" value="1" />
        <TiRadioButton label="禁用点击效果-2" value="2" />
        <TiRadioButton label="禁用点击效果-3" value="3" />
      </TiRadioGroup>
    </>
  );
}
```

#### 设置单选框组合中的选中值

```typescript jsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiRadioGroup value="1">
        <TiRadio label="受控模式-1" value="1" />
        <TiRadio label="受控模式-2" value="2" />
        <TiRadio label="受控模式-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup defaultValue="1">
        <TiRadio label="非受控模式-1" value="1" />
        <TiRadio label="非受控模式-2" value="2" />
        <TiRadio label="非受控模式-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup value="1">
        <TiRadioButton label="受控模式-1" value="1" />
        <TiRadioButton label="受控模式-2" value="2" />
        <TiRadioButton label="受控模式-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup defaultValue="1">
        <TiRadioButton label="非受控模式-1" value="1" />
        <TiRadioButton label="非受控模式-2" value="2" />
        <TiRadioButton label="非受控模式-3" value="3" />
      </TiRadioGroup>
    </>
  );
}
```

#### 使用 options 创建单选框
** 此模式只支持 `TiRadio`。 **

```typescript jsx showLineNumbers
const App: React.FC = () => {
   const options = [
    { value: "a", label: "选项 A" },
    { value: "b", label: "选项 B" },
    { value: "c", label: "选项 C" }
  ];
  return (
    <>
      <TiRadioGroup options={options} />
    </>
  );
}
```

#### 监听单选组合中选中状态变化

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const handleChange = useCallback((e: CustomEvent<string | number>) => {
    console.log('选中了 %s', e.detail);
  }, []);
  
  return (
    <>
      <TiRadioGroup onChange={handleChange} >
        <TiRadio label="文字内容-1" value="1" />
        <TiRadio label="文字内容-2" value="2" />
        <TiRadio label="文字内容-3" value="3" />
      </TiRadioGroup>
      
      <TiRadioGroup onChange={handleChange} >
        <TiRadioButton label="文字内容-1" value="1" />
        <TiRadioButton label="文字内容-2" value="2" />
        <TiRadioButton label="文字内容-3" value="3" />
      </TiRadioGroup>
    </>
  );
}
```

## TiRadio API

### 属性 **Properties**

| 名称           | 类型      | 是否必填 | 默认值   | 说明                                          | 备注                   |
| -------------- | --------- | -------- | -------- | --------------------------------------------- | ---------------------- |
| value          | `string`  | 是       | -        | 唯一标识符，根据 value 进行比较，判断是否选中 | -                      |
| label          | `string`  | 是       | -        | 内容文字                                      | -                      |
| checked        | `boolean` | 否       | -    | 指定当前是否选中, 此模式下为受控型组件        | -                      |
| defaultChecked | `boolean` | 否       | -    | 初始是否选中, 此模式下为非受控型组件          | -                      |
| disabled       | `boolean` | 否       | -    | 是否被禁用                                    | -                      |
| labelDisabled  | `boolean` | 否       | -    | 是否禁用文本点击效果                          | -                      |
| icon           | `string`  | 否       | `checkbox-hollow` | 自定义图标名称                                | -                      |
| size           | `number`  | 否       | `32`       | 自定义图标尺寸                                | -                      |
| shape          | `square` \| `circle` \| `number`  | 否       | circle   | 单选框圆角度数                                |-|
| color          | `string`  | 否   | -      | 自定义图标颜色 | - |

### 事件 **Events**

| 名称   | 参数列表             | 描述                   | 备注                                                                           |
| ------ | -------------------- | ---------------------- | ------------------------------------------------------------------------------ |
| `onChange` | `(e: CustomEvent<boolean>) => void` | 单选框选中时触发的事件 | 当被 `TiRadioGroup` 包裹时，只有 `TiRadioGroup` 的 `onChange` 会被触发 |

### 插槽 **Slots**

| 名称    | 说明     | 备注 |
| ------- | -------- | ---- |
| icon    | 图标插槽 |  当 `icon={false}` 或者 icon 不存在时，使用此插槽   |

### 可扩展样式名 **External Class**

| 名称      | 说明                 | 备注 |
| --------- | -------------------- | ---- |
| extClass  | 根节点可扩展的类名   | -    |
| iconClass | 图标节点可扩展的类名 | -    |

### CSS 变量 **CSS Variables**

| 变量   | 默认值 | 说明 | 备注 |  
| ----  | ---- | ------ | --- |
| `--radio-radius`               | `calc(var(--base-radius-size, 0px) + 4px)`   | - | - |
| `--radio-padding-v`            | `0` | -| -  |
| `--radio-padding-h`            | `0` | - | - |
| `--radio-label-padding-v`      | `0` | - | - |
| `--radio-label-padding-h`      | `12px` | - | - |
| `--radio-label-color`          | `var(--neutral-color-1, #212121)` | - | - |
| `--radio-direction`            | `row` | - | - |
| `--radio-icon-color`           | `rgb(@theme-r, @theme-g, @theme-b)` | - | - |
| `--radio-icon-revert-color`    | `var(--neutral-color-9, #ffffff)` | - | - |
| `--radio-align-items`          | `center` | - | - |
| `--radio-icon-wrap-padding-v`  | `0` | - | - |
| `--radio-icon-wrap-padding-h`  | `0` | - | - |

## TiRadioButton API

### 属性 **Properties**

| 名称           | 类型      | 必填 | 默认值 | 说明                                   | 备注 |
| -------------- | --------- | ---- | ------ | -------------------------------------- | ---- |
| label          | `string`  | 否   | -      | 文字内容                               | -    |
| value          | `string`  | 否   | -      | 标识 radio 名称, 用户确定当前组件是否被选中                    | -    |
| checked        | `boolean` | 否   | false  | 指定当前是否选中, 此模式下为控制型组件 | -    |
| defaultChecked | `boolean` | 否   | false  | 初始是否选中, 此模式下为非控制型组件   | -    |
| disabled       | `boolean` | 否   | false  | 是否禁用 | -    |
| icon           | `string`  | 否   | -      | 自定义图标名称 | - |
| color          | `string`  | 否   | -      | 自定义图标颜色 | - |
| extStyle      | `string` \| `Record<string, string>`  | 否 | -  | 根节点额外扩展样式 | 属性值如果是带单位的话，要带上单位，如：`{margin: '10px'}` |

### 事件 **Events**

| 名称   | 参数列表             | 描述                   | 备注                                                                                    |
| ------ | -------------------- | ---------------------- | --------------------------------------------------------------------------------------- |
| `onChange` | `(e: CustomEvent<boolean>) => void` | 单选框选中时发生的回调 | 当被 `TiRadioGroup` 包裹时，只有 `TiRadioGroup` 的 `onChange` 会被触发 |

### 插槽 **Slots**

| 名称    | 说明               | 备注 |
| ------- | ------------------ | ---- |
| prefix   | 自定义文字前面内容   | -  |
| suffix   | 自定义文字后面内容   | -  |

### CSS 变量 **CSS Variables**

| 变量   | 默认值 | 说明 | 备注 |  
| ----  | ------ | ---- | --- |
| `--radio-button-height`                     | `56px` | - | - |
| `--radio-button-padding-v`                  | `0`  | - | - |
| `--radio-button-padding-h`                  | `12px` | - | - |
| `--radio-button-text-color`                 | `var(--neutral-color-2, #757575)`  | - | - |
| `--radio-button-disabled-text-color`        | `var(--neutral-color-4, #c4c4c4)`  | - | - |
| `--radio-button-disabled-border-color`      | `rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 20%)` | - | - |
| `--radio-button-bg-color`                   | `var(--neutral-color-7, #f5f5f5)`  | - | - |
| `--radio-button-padding`                    | `12px 20px`  | - | - |
| `--radio-button-radius`                     | `var(--radio-radius, @radius-8)` | - | - |
| `--radio-button-checked-bg-color`           | `var(--radio-button-checked-color, rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 10%))` | - | - |
| `--radio-button-checked-border-color`       | `var(--radio-button-checked-color, rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 40%))` | - | - |
| `--radio-button-checked-text-color`         | `var(--radio-button-checked-color, rgba(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25), 100%))` | - | - | 

## TiRadioGroup API

### 属性 **Properties**

| 名称          | 类型                                                            | 是否必填 | 默认值     | 说明                                    | 备注 |
| ------------- | --------------------------------------------------------------- | -------- | ---------- | --------------------------------------- | ---- |
| value         | <code>string &vert; number</code>  | 否       | -            | 用于设置当前选中的值                    | -    |
| defaultValue  | <code>string &vert; number</code>  | 否       | -            | 默认选中的值                            | -    |
| disabled      | `boolean`                           | 否       | `false`        | 指定当前是否禁用                        | -    |
| labelDisabled | `boolean`                           | 否       | `false`        | 是否禁用文本点击效果                    | -    |
| direction     | <code>horizontal &vert; vertical</code>          | 否       | `horizontal`   | 排列方向 | -    |
| shape         | <code>circle &vert; square</code>              | 否       | `circle`       | 图标形状，可选值为 circle、square       | -    |
| icon          | `string`                            | 否       | -     | 自定义图标名称                          | -    |
| options       | `Array<Option>`                     | 否       | -     | 以配置形式设置子元素 | -    |
| size          | `number`                            | 否       | -     | 自定义图标尺寸 | -    |
| color         | `string`                            | 否       | -     | 自定义图标颜色 | -    |
| extStyle      | <code>string &vert; Record<string, string\></code>  | 否 | -  | 根节点额外扩展样式 | 属性值如果是带单位的话，要带上单位，如：`{margin: '10px'}` |

#### Options

```typescript showLineNumbers
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```

### 事件 **Events**

| 名称   | 参数列表             | 描述                     | 备注 |
| ------ | -------------------- | ------------------------ | ---- |
| onChange | <code>(e: CustomEvent<string &vert; number\>) => void</code> | 单选框选中时发生的回调 |   -   |

### 可扩展样式名 **External Class**

| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 扩展样式类名 | -    |
