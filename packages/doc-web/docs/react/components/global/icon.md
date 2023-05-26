---
title: 图标
sidebar_custom_props:
  suffix: Icon
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "/#/icon/"
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<!-- Custom component -->

import IconCollection from '@site/src/components/iconCollection';

# 图标 _Icon_

** 基于字体的图标集，可以通过 Icon 组件使用，也可以在其他组件中通过 icon 属性引用 **

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiicon-api" />

## 安装使用
```typescript showLineNumbers
import { TiIcon } from '{{packageWeappReact}}'
```

## 用法示例

#### 基础用法
```typescript tsx showLineNumbers
const App: React.FC = () => {
  return (
    <>
      <TiIcon name="plus" size={30} color="#f60" />
    </>
  )
}
```

#### 使用自定义图标

##### 在组件层级配置

<Tabs>
<TabItem value="tsx" label="index.tsx">

  ```typescript tsx showLineNumbers
  const App: React.FC = () => {
    return (
      <TiIcon prefix="weimob-icon" name="plus" />
    )
  }
  ```
</TabItem>
<TabItem value="css" label="index.css">

```css showLineNumbers
// 在html的head中添加link标签，引入字体css文件，或者在全局index.css文件中引入如下字体css文件内容
@font-face {
  font-family: 'weimob-icon';
  src: url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.eot?t=1669700415255'); /* IE9*/
  src: url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.eot?t=1669700415255#iefix') form  ('embedded-opentype'), /* IE6-IE8 */
      url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.woff2?t=1669700415255')
      format('woff2'),
    url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.woff?t=1669700415255')
      format('woff'),
    url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.ttf?t=1669700415255')
      format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.svg?t=1669700415255#weimob-icon')
      format('svg'); /* iOS 4.1- */
}

.weimob-icon {
  font-family: "weimob-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.weimob-icon-plus:before {
  content: "\e60b";
}
```
</TabItem>
</Tabs>

##### 在全局配置层控制
:::warning
该配置会覆盖默认配置，如果需要使用组件库提供的图标，需要组件层级添加 `prefix="titian"`
:::
<Tabs>
<TabItem value="tsx" label="index.tsx">

  ```typescript tsx showLineNumbers
  const App: React.FC = () => {
    return (
      <TiConfigProvider iconClassPrefix="weimob-icon">
        <TiIcon name="plus" />
        <TiIcon name="share" />
      </TiConfigProvider>
    )
  }
  ```
</TabItem>
<TabItem value="css" label="index.css">

```css showLineNumbers
// 在html的head中添加link标签，引入字体css文件，或者在全局index.css文件中引入如下字体css文件内容
@font-face {
  font-family: 'weimob-icon';
  src: url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.eot?t=1669700415255'); /* IE9*/
  src: url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.eot?t=1669700415255#iefix') form  ('embedded-opentype'), /* IE6-IE8 */
      url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.woff2?t=1669700415255')
      format('woff2'),
    url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.woff?t=1669700415255')
      format('woff'),
    url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.ttf?t=1669700415255')
      format('truetype'),
    /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
      url('https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/106/weimob-icon.svg?t=1669700415255#weimob-icon')
      format('svg'); /* iOS 4.1- */
}

.weimob-icon {
  font-family: "weimob-icon" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.weimob-icon-plus:before {
  content: "\e60b";
}

.weimob-icon-share:before {
  content: "\e6cf";
}
```
</TabItem>
</Tabs>


## TiIcon API
### 属性 **Properties**
| 名称      | 类型                                 | 必填 | 默认值 | 说明                            | 备注 |
| --------- | ------------------------------------ | ---- | ------ | ------------------------------- | ---- |
| name      | `string`                             | 是   | -      | Icon 名字                       | -    |
| rotate    | `string`                             | 否   | -      | 旋转                            | -    |
| color     | `string`                             | 否   | -      | 颜色                            | -    |
| size      | `number`                             | 否   | -      | 大小                            | -    |
| hyphen    | `string`                             | 否   | -      | 连接符                          | -    |
| spin      | `boolean`                            | 否   | false  | 旋转动画                        | -    |
| prefix    | `string`                             | 否   | -     | 类名前缀                        | -    |
| iconStyle | `string`                             | 否   | -     | 取值：`''` `lovely` `popular` | -    |
| extStyle  | `string` \| `Record<string, string>` | 否   | -      | 根节点样式                      | -    |

### 外部样式类 **External Classes**
| 类名     | 说明         | 备注 |
| -------- | ------------ | ---- |
| extClass | 扩展样式类名 | -    |

### CSS 变量 **CSS Variable**
| 变量             | 默认值    | 说明         | 备注 |
| ---------------- | --------- | ------------ | ---- |
| --icon-font-size | `inherit` | 字体图标大小 | -    |
| --icon-color     | `inherit` | 字体图标颜色 | -    |

## 图标展示

<IconCollection />
