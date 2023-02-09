---
title: 下拉菜单
sidebar_custom_props:
  suffix: DropdownMenu
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/dropdown"
---

# 下拉菜单 _DropdownMenu_

** 下拉菜单是可切换的上下文叠加，用于显示链接列表等, 可以支持多种类型的下拉菜单。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tidropdownmenu-api" />

## 安装使用

```typescript showLineNumbers
import { TiDropdownMenu, TiDropdownItem } from '@titian-design/mobile-react';
```

## 用法示例

### 基本使用

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem visible title="默认展开" options={dropMenuOptions} />
        <TiDropdownItem title="标题" options={dropMenuOptions} />
        <TiDropdownItem title="自定义内容">
          <div>自定义内容</div>
        </TiDropdownItem>
      </TiDropdownMenu>
      
      <TiDropdownMenu direction="up">
        <TiDropdownItem title="标题1" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 设置选中值

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem value={["1"]} title="有选中值" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 禁用点击

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem disabled title="禁用点击" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
      
      <TiDropdownMenu disabled>
        <TiDropdownItem title="禁用所有Item点击" options={dropMenuOptions} />
        <TiDropdownItem title="禁用所有Item点击" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 操作遮罩

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem hasMask={false} title="不展示遮罩" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
      
      <TiDropdownMenu hasMask={false}>
        <TiDropdownItem title="不展示遮罩" options={dropMenuOptions} />
        <TiDropdownItem title="不展示遮罩" options={dropMenuOptions} />
      </TiDropdownMenu>
      
      <TiDropdownMenu>
        <TiDropdownItem closeOnMask={false} title="关闭遮罩点击事件" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
      
      <TiDropdownMenu closeOnMask={false}>
        <TiDropdownItem title="关闭遮罩点击事件" options={dropMenuOptions} />
        <TiDropdownItem title="关闭遮罩点击事件" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 修改选择后的整体色调

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu activeColor="red">
        <TiDropdownItem title="标题1" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
      
      <TiDropdownMenu>
        <TiDropdownItem activeColor="red" title="标题1" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### submit 模式

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem hasSubmit submitText="确定" title="标题1" options={dropMenuOptions} />
        <TiDropdownItem hasSubmit submitText="提交" title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 自定义选择后的图标、选择类型、以及是否是多选类型

```typescript jsx showLineNumbers
const App: React.FC = () => {

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem title="自定义图标" options={dropMenuOptions} icon="plus" />
        <TiDropdownItem title="使用 switch" options={dropMenuOptions} type="switch" />
        <TiDropdownItem mode="multiple" title="多选" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 事件操作

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const handleClose = useCallback((e: CustomEvent<never>) => {
    console.log(e);
  }, []);

  const handleOpen = useCallback((e: CustomEvent<never>) => {
    console.log(e);
  }, []);

  const handleChange = useCallback(
    (e: CustomEvent<string | number | Array<string | number>>) => {
      console.log(e.detail);
    },
    []
  );

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiDropdownMenu>
        <TiDropdownItem 
            onClose={handleClose}
            onOpen={handleOpen}
            onChange={handleChange}
            title="默认展开"
            options={dropMenuOptions}
        />
        <TiDropdownItem title="标题1" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

#### 通过 `Ref` 控制 `TiDropdownItem` 展示

```typescript jsx showLineNumbers
const App: React.FC = () => {
  const dropdownItemRef = useRef<HTMLTiDropdownItemElement>();

  const dropMenuOptions: TiDropdownItemProps['options'] = [
    { title: "选项1", value: "1" },
    { title: "选项2", value: "2" }
  ];

  return (
    <>
      <TiButton onClick={() => dropdownItemRef.current?.toggle()}>
        主动控制
      </TiButton>
      <TiDropdownMenu>
        <TiDropdownItem 
            ref={dropdownRef}
            onOpen={handleOpen}
            onChange={handleChange}
            title="默认展开"
            options={dropMenuOptions}
        />
        <TiDropdownItem title="标题1" options={dropMenuOptions} />
        <TiDropdownItem title="标题2" options={dropMenuOptions} />
      </TiDropdownMenu>
    </>
  )
}

```

## TiDropdownMenu API

### 属性 **Properties**

| 名称        | 类型      | 必填 | 默认值   | 说明                                         | 备注 |
| ----------- | --------- | ---- | -------- | -------------------------------------------- | ---- |
| mode        | `string`  | 否   | -   | 列表选择的模式，可选项：single、multiple     | -    |
| hasMask     | `boolean` | 否   | `true`    | 是否显示遮罩                                 | -    |
| closeOnMask | `boolean` | 否   | `true`    | 是否允许点击遮罩关闭下拉菜单                    | -    |
| type        | `string`  | 否   | - | 激活选择的样式种类，可选项：checkbox，switch | -    |
| icon        | `string`  | 否   | - | 列表选择的图标                               | -    |
| activeColor | `string`  | 否   | -   | 选中状态的颜色                               | -    |
| disabled    | `boolean` | 否   | false    | 是否禁用                                     | -    |
| direction   | `up` \| `down`  | 否   | `down`     | 展示方向                  | -    |
| getPosition   | <code>(rect: { rect: DOMRect; direction: 'up' \| 'down'; position: IPosition }) => IPosition</code>  | 否   | `down`     | 展示方向， 可选值为：down、up            |  自定义展示位置   |

### 可扩展样式名 **External Class**

| 名称       | 说明                 | 备注 |
| ---------- | -------------------- | ---- |
| extClass   | 根节点可扩展的类名   | -    |
| titleClass   | 标题可扩展的类名   | -    |

### CSS 变量 **CSS Variables**

| 变量                          | 默认值 |说明               | 备注 |
| ----------------------------- | ------ | ------------ | ---- |
| `--dropdown-menu-title-wrap-bg-color` | `var(--neutral-color-9, #ffffff)` | - | -    |
| `--dropdown-menu-icon-margin-left`    | `4px`  | -           | -    |
| `--dropdown-title-font-weight`        | `400` | - | - |

## TiDropdownItem API

### 属性 **Properties**

| 名称        | 类型      | 必填 | 默认值   | 说明                                     | 备注 |
| ----------- | --------- | ---- | -------- | ---------------------------------------- | ---- |
| title       | `string`  | 是   | -        | 标题                                     | -    |
| options     | `Array<TiDropdownItemOption>`   | 是   | -        | 选项列表                                 | -    |
| visible     | `boolean` | 否   | `false`    | 是否显示                                 | -    |
| mode        | `string`  | 否   | single   | 列表选择的模式，可选值：single、multiple | -    |
| icon        | `string`  | 否   | selected | 列表选择的图标                           | -    |
| disabled    | `boolean` | 否   | `false`    | 是否禁用                                 | -    |
| value       | <code>string &vert; number &vert; Array<string &vert; number></code>  | 否   | -        | 唯一标识                                 | -    |
| type        | `checkbox` \| `switch`  | 否   | `checkbox`        |  下拉列表选中时的选择样式                              | -    |
| hasMask     | `boolean` | 否   | `false`    | 是否显示遮罩                             | -    |
| closeOnMask | `boolean` | 否   | `false`    | 是否阻止遮罩点击关闭事件                 | -    |
| activeColor | `string`  | 否   | -   | 选中状态的颜色                       | -    |
| hasSubmit   | `boolean`  | 否   | `false`     | 是否显示提交的按钮                       | -    |
| submitText  | `string`  | 否   | -       | 提交按钮的文字                           | -    |
| direction   | `string`  | 否   | `down`     | 展示方向， 可选值为：down、up            | -    |

#### TiDropdownItemOption

```typescript showLineNumbers
interface TiDropdownItemOption {
  title?: string;
  label?: string;
  desc?: string;
  value: string | number;
}
```

### 事件 **Events**

| 名称   | 参数列表 | 描述             | 备注 |
| ------ | -------- | ---------------- | ---- |
| `onClose`  | `(e: CustomEvent<never>) => void` | 关闭时触发的事件 | -    |
| `onOpen`   | `(e: CustomEvent<never>) => void` | 打开时触发的事件 | -    |
| `onChange` | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 切换时触发的事件 | -    |
| `onSubmit` | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 提交时触发的事件 | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 扩展样式类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                          | 默认值 |说明               | 备注 |
| ----------------------------- | ------ | ------------ | ---- |
| `--dropdown-active-color` | `rgb(@theme-r, @theme-g, @theme-b)` | 激活状态的主体颜色 | -    |
| `--dropdown-label-active-color` | `var(--dropdown-active-color, rgb(@theme-r, @theme-g, @theme-b))` | - | - |
| `--dropdown-select-icon-color`  | `var(--dropdown-active-color, rgb(@theme-r, @theme-g, @theme-b))` | - | - |
