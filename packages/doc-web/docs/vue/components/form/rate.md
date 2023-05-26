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
import { TiRate } from '{{packageWeappVue}}';
```

## 用法示例

#### 基础用法

```html showLineNumbers
<template>
  <TiRate :value="3" />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```


#### 半星

```html showLineNumbers
<template>
  <TiRate :value="3" allow-half />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```

#### 只读

```html showLineNumbers
<template>
  <TiRate :value="3" read-only />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```

#### 可清空

```html showLineNumbers
<template>
  <TiRate :value="3" clearable />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```

#### 设置星级

```html showLineNumbers
<template>
  <TiRate :value="3" :count="7" clearable />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```

#### 间距

```html showLineNumbers
<template>
  <TiRate :value="3" ext-style="--rate-gap: 10px;" />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```

#### 评星尺寸

```html showLineNumbers
<template>
  <TiRate :value="3" :icon-size="48" />
</template>

<script lang="ts" setup>
import { TiRate } from '{{packageWeappVue}}';
</script>
```


#### 绑定事件


```html showLineNumbers
<template>
  <TiRate :value="value" @change="onChangeHandler" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { TiRate } from '{{packageWeappVue}}';
 const value = ref(10);
  
 const onChangeHandler = (event) => {
  value.value = event.detail.value;
}
</script>
```

## TiRate API

### 属性 **Properties**

| 属性      | 类型      | 默认值                | 说明                 |
| --------- | --------- | --------------------- | -------------------- |
| value     | `number`  | `0`                   | 值                   |
| allow-half | `boolean` | `false`               | 允许半星             |
| clearable | `boolean` | `false`               | 可清空               |
| count     | `number`  | `5`                   | 评分数量             |
| icon      | `string`  | `rate-star-highlight` | 评分 icon 图标       |
| icon-size  | `string`  | `36`                  | 评分 icon 图标尺寸   |
| empty-icon | `string`  | `rate-star-highlight` | 评分 icon 未选中图标 |
| read-only  | `boolean` | `false`               | 是否只读             |

### 事件 **Events**

| 名称   | 参数列表                                 | 描述                 | 备注 |
| ------ | ---------------------------------------- | -------------------- | ---- |
| change | `(e: CustomEvent<{value: number}>) => void` | 评分变化时触发该事件 | -    |

### CSS 变量 **CSS Variables**

| CSS 变量           | 默认值                                    | 说明           | 备注 |
| ------------------ | ----------------------------------------- | -------------- | ---- |
| --rate-gap         | 24px                                      | 评星间距       | -    |
| --rate-color       | rgb(var(--theme-r, 250), var(--theme-g, 44), var(--theme-b, 25))          | 评分选中颜色   | -    |
| --rate-empty-color | var(--neutral-color-5, #e0e0e0) | 评星未选中颜色 | -    |
