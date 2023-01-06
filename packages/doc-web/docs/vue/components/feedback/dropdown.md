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
import { TiDropdownMenu, TiDropdownItem } from 'titian-h5-vue';
```

## 用法示例

### 基本使用

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem visible title="默认展开" :options="dropMenuOptions" />
    <TiDropdownItem title="标题" :options="dropMenuOptions" />
    <TiDropdownItem title="自定义内容">
      <div>自定义内容</div>
    </TiDropdownItem>
  </TiDropdownMenu>
  
  <TiDropdownMenu direction="up">
    <TiDropdownItem title="标题1" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 设置选中值

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem :value="['1']" title="有选中值" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 禁用点击

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem disabled title="禁用点击" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
  
  <TiDropdownMenu disabled>
    <TiDropdownItem title="禁用所有Item点击" :options="dropMenuOptions" />
    <TiDropdownItem title="禁用所有Item点击" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 操作遮罩

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem :has-mask="false" title="不展示遮罩" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
  
  <TiDropdownMenu :has-mask="false">
    <TiDropdownItem title="不展示遮罩" :options="dropMenuOptions" />
    <TiDropdownItem title="不展示遮罩" :options="dropMenuOptions" />
  </TiDropdownMenu>
  
  <TiDropdownMenu>
    <TiDropdownItem :close-on-mask="false" title="关闭遮罩点击事件" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
  
  <TiDropdownMenu :close-on-mask="false">
    <TiDropdownItem title="关闭遮罩点击事件" :options="dropMenuOptions" />
    <TiDropdownItem title="关闭遮罩点击事件" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 修改选择后的整体色调

```html showLineNumbers
<template>
  <TiDropdownMenu active-color="red">
    <TiDropdownItem title="标题1" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
  
  <TiDropdownMenu>
    <TiDropdownItem active-color="red" title="标题1" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### submit 模式

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem has-submit submit-text="确定" title="标题1" :options="dropMenuOptions" />
    <TiDropdownItem has-submit submit-text="提交" title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 自定义选择后的图标、选择类型、以及是否是多选类型

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem title="自定义图标" :options="dropMenuOptions" icon="plus" />
    <TiDropdownItem title="使用 switch" :options="dropMenuOptions" type="switch" />
    <TiDropdownItem mode="multiple" title="多选" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem, TiDropdownItemProps } from 'titian-h5-vue';

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 事件操作

```html showLineNumbers
<template>
  <TiDropdownMenu>
    <TiDropdownItem 
        @close="handleClose"
        @open="handleOpen"
        @change="handleChange"
        title="默认展开"
        :options="dropMenuOptions"
    />
    <TiDropdownItem title="标题1" :options="dropMenuOptions" />
    <TiDropdownItem title="标题2" :options="dropMenuOptions" />
  </TiDropdownMenu>
</template>

<script lang="ts" setup>
import { TiDropdownMenu, TiDropdownItem } from 'titian-h5-vue';

const handleClose = (e: CustomEvent<never>) => {
  console.log(e);
};

const handleOpen = (e: CustomEvent<never>) => {
  console.log(e);
};

const handleChange = (e: CustomEvent<string | number | Array<string | number>>) => {
  console.log(e.detail);
};

const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
</script>
```

#### 通过 `Ref` 控制 `TiDropdownItem` 展示

```html showLineNumbers
<template>
  <TiButton @click="handleClick">
    主动控制
  </TiButton>
  <div ref="wrap">
    <TiDropdownMenu>
      <TiDropdownItem title="默认展开" :options="dropMenuOptions" />
      <TiDropdownItem title="标题1" :options="dropMenuOptions" />
      <TiDropdownItem title="标题2" :options="dropMenuOptions" />
    </TiDropdownMenu>
  </div>
</template>

<script lang="ts" setup>
import {  ref } from 'vue';
import { TiDropdownMenu, TiDropdownItem } from 'titian-h5-vue';
const dropMenuOptions: TiDropdownItemProps['options'] = [
  { title: "选项1", value: "1" },
  { title: "选项2", value: "2" }
];
const wrap = ref<HTMLTiDropdownItemElement | null>(null);

const handleClick = () => {
  wrap.value?.querySelector('ti-dropdown-item')?.toggle();
}
</script>
```

## TiDropdownMenu API

### 属性 **Properties**

| 名称        | 类型      | 必填 | 默认值   | 说明                                         | 备注 |
| ----------- | --------- | ---- | -------- | -------------------------------------------- | ---- |
| mode        | `string`  | 否   | -   | 列表选择的模式，可选项：single、multiple     | -    |
| has-mask     | `boolean` | 否   | `true`    | 是否显示遮罩                                 | -    |
| close-on-mask | `boolean` | 否   | `true`    | 是否允许点击遮罩关闭下拉菜单                    | -    |
| type        | `string`  | 否   | - | 激活选择的样式种类，可选项：checkbox，switch | -    |
| icon        | `string`  | 否   | - | 列表选择的图标                               | -    |
| active-color | `string`  | 否   | -   | 选中状态的颜色                               | -    |
| disabled    | `boolean` | 否   | false    | 是否禁用                                     | -    |
| direction   | `up` \| `down`  | 否   | `down`     | 展示方向                  | -    |

### 可扩展样式名 **External Class**

| 名称       | 说明                 | 备注 |
| ---------- | -------------------- | ---- |
| ext-class   | 根节点可扩展的类名   | -    |
| title-class   | 标题可扩展的类名   | -    |

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
| has-mask     | `boolean` | 否   | `false`    | 是否显示遮罩                             | -    |
| close-on-mask | `boolean` | 否   | `false`    | 是否阻止遮罩点击关闭事件                 | -    |
| active-color | `string`  | 否   | -   | 选中状态的颜色                       | -    |
| has-submit   | `boolean`  | 否   | `false`     | 是否显示提交的按钮                       | -    |
| submit-text  | `string`  | 否   | -       | 提交按钮的文字                           | -    |
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
| `close`  | `(e: CustomEvent<never>) => void` | 关闭时触发的事件 | -    |
| `open`   | `(e: CustomEvent<never>) => void` | 打开时触发的事件 | -    |
| `change` | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 切换时触发的事件 | -    |
| `submit` | <code>(e: CustomEvent<string &vert; number &vert; Array<string &vert; number\>\>) => void</code> | 提交时触发的事件 | -    |

### 可扩展样式名 **External Class**

| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| ext-class | 扩展样式类名 | -    |

### CSS 变量 **CSS Variables**

| 变量                          | 默认值 |说明               | 备注 |
| ----------------------------- | ------ | ------------ | ---- |
| `--dropdown-active-color` | `rgb(@theme-r, @theme-g, @theme-b)` | 激活状态的主体颜色 | -    |
| `--dropdown-label-active-color` | `var(--dropdown-active-color, rgb(@theme-r, @theme-g, @theme-b))` | - | - |
| `--dropdown-select-icon-color`  | `var(--dropdown-active-color, rgb(@theme-r, @theme-g, @theme-b))` | - | - |
