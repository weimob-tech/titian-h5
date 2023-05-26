---
title: 轮播
sidebar_custom_props:
  suffix: Swiper
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/swiper"
---

# 轮播 _Swiper_

** 滑块视图容器。其中只可放 SwipeItem 组件，否则会导致未知的问题。 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiswiper-api" />

## 用法示例

#### 基础用法
```typescript html showLineNumbers
<ti-swiper>
  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png"
      ></ti-image>
    </div>
  </ti-swiper-item>
</ti-swiper>
```

#### 设置无缝滚动
```typescript html showLineNumbers
<ti-swiper loop>
  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png"
      ></ti-image>
    </div>
  </ti-swiper-item>
</ti-swiper>
```

#### 设置垂直滚动
```typescript html showLineNumbers
<ti-swiper vertical>
  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png"
      ></ti-image>
    </div>
  </ti-swiper-item>
</ti-swiper>
```

#### 设置展示数量
```typescript html showLineNumbers
<ti-swiper display-multiple-items="1.5">
  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png"
      ></ti-image>
    </div>
  </ti-swiper-item>
</ti-swiper>
```

#### 当一屏需要展示两边内容时
```typescript html showLineNumbers
<ti-swiper display-multiple-items="1.5" centered-slides loop>
  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png"
      ></ti-image>
    </div>
  </ti-swiper-item>

  <ti-swiper-item>
    <div class="swiper-item">
      <ti-image
        width="100%"
        height="300"
        mode="cover"
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png"
      ></ti-image>
    </div>
  </ti-swiper-item>
</ti-swiper>
```

## TiSwiper API

### 属性 **Properties**

| 名称     | 类型      | 必填 | 默认值 | 说明                                            | 备注 |
| -------- | --------- | ---- | ------ | ----------------------------------------------- | ---- |
| vertical | `boolean` | 否   | `false`  | 是否为垂直方向滚动                              | -    |
| autoplay | `boolean` | 否   | `false`  | 是否自动播放                                    | -    |
| interval | `number`  | 否   | `5000`   | 自动切换时间间隔, 当`autoplay` 值为 `true` 生效 | -    |
| duration | `number`  | 否   | `500`    | 滑动动画时长  | -    |
| pagination | `bullets` \| `fraction` | 否 | `none`  | 页码展示类型设置   | -    |
| current  | `number`  | 否 | 0 | 初始化时所在滑块的 `index`  | -    |
| display-multiple-items | `number` | 否 | `1` | 每屏展示个内容个数 | -  |
| space-between | `number` | 否 | `10` | 每个 `item` 之间的间距 | - |
| loop | `boolean` | 否 | `false` | 无缝滚动 | - |
| centered-slides | `boolean` | 否 | `false` | 居中幻灯片, 当设置 `displayMultipleItems` 时，会居中显示，两边平分设置额外内容 | - |
| extStyle | `string` \| `Record<string, string> ` | 否   | -      | 根节点样式                    | -    |

### 事件 **Events**

| 名称              | 参数列表                                                                                              | 描述                                | 备注 |
| ----------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------- | ---- |
| onChange          | <code>(e: CustomEvent<{current: number; currentItemId: string; source: 'touch' \|''; }>) => void</code> | 切换结束时事,`current` 改变时触发件 |      |
| onAnimationFinish | `(e: CustomEvent<number>) => void`                                                                    | 动画结束事件                        | -    |

### CSS 变量 **CSS Variables**
| 变量                         | 默认值                    | 说明               | 备注 |
| ---------------------------- | ------------------------- | ------------------ | ---- |
| `--swiper-duration`           | `500ms`                     | 滑动动画时长       | -    |
| `--swiper-timing-function`     | `easy`                      | 滑动动画           | -    |
| `--swiper-delay`               | `0`                         | 滑动动画延迟       | -    |
| `--swiper-bullets-top`         | `auto`                      | 指示点容器上侧位置     | -    |
| `--swiper-bullets-bottom`      | `12px`                      | 指示点容器下侧位置     | -    |
| `--swiper-bullets-left`        | `50%`                      | 指示点容器左侧位置     | -    |
| `--swiper-bullets-right`       | `auto`                      | 指示点容器右侧位置     | -    |
| `--swiper-bullets-transform`   | `translate(-50%, 0)`        | - | - |
| `--swiper-vertical-bullets-top` | `50%`                      | - | - |
| `--swiper-vertical-bullets-right` | `auto`                    | - | - |
| `--swiper-vertical-bullets-bottom` | `auto`                   | - | - |
| `--swiper-vertical-bullets-left` | `20px`                     | - | - |
| `--swiper-vertical-bullets-transform` | `translate(0, -50%)` | - | - |
| `--swiper-bullet-width`           | `8px`                       | 指示点宽度         | -    |
| `--swiper-bullet-height`          | `8px`                       | 指示点高度         | -    |
| `--swiper-bullet-gap`             | `6px` | 指示点间距 | - |
| `--swiper-bullet-radius`          | `50%` | - | - |
| `--swiper-bullet-active-bg-color` | `var(--neutral-color-9, #ffffff)` | - | - |
| `--swiper-fraction-right`         | `28px` | - | - |
| `--swiper-fraction-bottom`        | `28px` | - | - |
| `--swiper-fraction-left`          | `auto` | - | - |
| `--swiper-fraction-top`           | `auto` | - | - |
| `--swiper-fraction-radius`        | `8px`  | - | - |
| `--swiper-fraction-bg-color`      | `rgba(33, 33, 33, 60%)` | - | - |
| `--swiper-pagination-current-color` | `var(--swiper-pagination-color, var(--neutral-color-9, #ffffff))` | - | - |
| `--swiper-pagination-current-font-size` | `var(--swiper-pagination-font-size, 22px)` | - | - |
| `--swiper-pagination-current-font-weight` | `var(--swiper-pagination-font-weight, 400)` | - | - |
| `--swiper-pagination-current-line-height` | `var(--swiper-paginaton-line-height, 22px)` | - | - |
| `--swiper-pagination-slash-color` | `var(--swiper-pagination-color, var(--neutral-color-9, #ffffff))` | - | - |
| `--swiper-pagination-slash-font-size` | `var(--swiper-pagination-font-size, 22px)` | - | - |
| `--swiper-pagination-slash-font-weight` | `var(--swiper-pagination-font-weight, 400)` | - | - |
| `--swiper-pagination-slash-line-height` | `var(--swiper-paginaton-line-height, 22px)` | - | - |
| `--swiper-pagination-total-color` | `var(--swiper-pagination-color, var(--neutral-color-9, #ffffff))` | - | - |
| `--swiper-pagination-total-font-size` | `var(--swiper-pagination-font-size, 22px)` | - | - |
| `--swiper-pagination-total-font-weight` | `var(--swiper-pagination-font-weight, @font-weight-400)` | - | - |
| `--swiper-pagination-total-line-height` | `var(--swiper-paginaton-line-height, 22px)` | - | - |

### TiSwiperItem API

### 属性 **Properties**

| 名称                 | 类型      | 必填 | 默认值 | 说明                                                                                             | 备注 |
| -------------------- | --------- | ---- | ------ | ------------------------------------------------------------------------------------------------ | ---- |
| item-id               | `string`  | 否   | -      | 该 swiper-item 的标识符                                                                          | -    |
| skip-hidden-item-layout | `boolean` | 否   | false  | 是否跳过未显示的滑块布局，设为 `true` 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息 | -    |
