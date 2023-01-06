---
title: 上传
sidebar_custom_props:
  suffix: Uploader
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: "#/uploader"
---

# 上传 _Uploader_
**用于将本地图片上传到服务器，可以展示上传进度、结果预览。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="tiuploader-api" />

## 安装使用
```typescript showLineNumbers
import { TiUploader } from 'titian-h5-vue'
```

## 用法示例


#### 基础用法

选择完文件后，立即执行上传操作。


```html showLineNumbers
<template>
  <TiUploader
    url="https://api.bayfiles.com/upload"
    size="small"
    choose-text="请选择文件"
     />
</template>

<script lang="ts" setup>
import { TiUploader } from 'titian-h5-vue';
</script>
```

#### 手动上传

通过设置 `immediately` 为 `false`，并调用 `submit()` 方法，可以手动控制上传时机。


```html showLineNumbers
<template>
  <TiUploader
    ref="uploaderRef"
    url="https://api.bayfiles.com/upload"
    size="small"
    :count="10"
    :before-upload="beforeUpload"
    :immediately="false"
    choose-text="请选择"
     />
</template>

<script lang="ts" setup>
import { TiUploader } from 'titian-h5-vue';

const beforeUpload = (event: any) => {
  console.log("beforeUpload", event);
};

const doSubmit = (event: any) => {
  this.$refs.uploaderRef.submit();
  console.log("doSubmit", event);
};
</script>
```


## TiUploader API

### 属性 **Properties**

| 名称                | 类型                              | 是否必填 | 默认值              | 说明                                                   | 备注     |
| ------------------- | --------------------------------- | -------- | ------------------- | ------------------------------------------------------ | -------- |
| value               | `unknown`                         | 否       | -                   | 使用 value，组件为受控模式                             | -        |
| default-value       | `UploadFileParams[]`              | 否       | []                  | 使用 defaultValue ，组件为非受控模式                   |          |
| disabled            | `boolean`                         | 否       | false               | 禁用交互能力                                           |          |
| immediately         | `boolean`                         | 否       | true                | 是否立刻上传                                           | -        |
| immediately-choose  | `boolean`                         | 否       | true                | 点击后立即选择                                         | -        |
| size                | `small`                           | `large`  | 否                  | small                                                  | 组件尺寸 | - |
| choose-text         | `string`                          | 否       |                     | 选择器文案                                             | -        |
| choose-icon         | `string`                          | 否       | plus                | 选择器 icon                                            | -        |
| source-type         | `array`                           | 否       | ['album', 'camera'] | 选择图片的来源                                         | -        |
| camera              | `back` \| `front`                 | 否       | back                | 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头 | -        |
| count               | `number`                          | 否       | 9                   | 选择文件/图片/视频的数量                               | -        |
| url                 | `string`                          | 否       | -                   | 上传地址                                               | -        |
| preview             | `Function`                        | 否       |                     | 自定义预览组件。默认使用内置的预览工具                 | -        |
| choose              | `Function`                        | 否       |                     | 选择函数                                               | -        |
| before-upload       | `Function`                        | 否       |                     | - 上传前置方法 可用用于处理上传参数                    | -        |
| upload              | `Function`                        | 否       |                     | 自定义上传方法，不传则使用内置的上传方法               | -        |
| complete            | `Function`                        | 否       |                     | 上传完成/删除完成后调用                                | -        |
| after-upload        | `Function`                        | 否       |                     | 上传后置方法，后置处理返回结果                         | -        |
| upload-exercise     | '' \| `loading` \| `progress`     | 否       | loading             | 上传中展示风格                                         | -        |
| image-params        | `Record<string, any>`             | 否       | {}                  | 上传图片参数                                           | -        |
| video-params        | `Record<string, any>`             | 否       | {}                  | 上传视频参数                                           | -        |
| file-params         | `Record<string, any>`             | 否       | {}                  | 上传文件参数                                           | -        |
| image-result-format | <code>(string \| number)[]</code> | 否       | []                  | 图片参数                                               | -        |
| video-result-format | <code>(string \| number)[]</code> | 否       | []                  | 视频参数                                               | -        |
| file-result-format  | <code>(string \| number)[]</code> | 否       | []                  | 文件参数                                               | -        |
| accept              | `string`                          | 否       | */*                 | http 的 accept 参数，指定文件类型                      | -        |
| ext-style           | `string`                          | 否       | ''                  | 容器样式                                               | -        |



### 事件 **Events**

| 名称   | 参数列表                                                                                      | 描述     | 备注 |
| ------ | --------------------------------------------------------------------------------------------- | -------- | ---- |
| change | `(e: CustomEvent<{ file: UploadFile; fileList: UploadFile[];  uploading: boolean }>) => void` | 上传处理 |      |
| error  | `(e: CustomEvent<{ status: string; message: string; }>) => void`                              | 错误事件 |      |
| choose | `(e: CustomEvent<any>) => void`                                                               | 选择事件 |      |

### 外部样式类 **External Classes**

| 名称                 | 说明               | 备注 |
| -------------------- | ------------------ | ---- |
| ext-class            | 根节点可扩展的类名 | -    |
| ext-thum-box-class   | 缩略图容器类名     | --   |
| ext-thum-tip-class   | 缩略图容器提示类名 | --   |
| ext-thum-class       | 缩略图类名         | --   |
| ext-thum-image-class | 缩略图-图片类名    | --   |
| ext-thum-video-class | 缩略图-视频类名    | --   |
| ext-thum-other-class | 缩略图-其他类名    | --   |
| ext-action-class     | 选择器-类名        | --   |

### CSS 变量 **CSS Variable**

| 变量                         | 默认值                                      | 说明                            | 备注 |
| ---------------------------- | ------------------------------------------- | ------------------------------- | ---- |
| --uploader-name-color        | var(--neutral-color-4, #c4c4c4)             | 上传文件展示区文字颜色          | -    |
| --uploader-name-font-size    | `24px`                                      | 上传文件展示区文字大小          | -    |
| --uploader-action-bg-color   | var(--neutral-color-7, #f5f5f5)             | 上传区背景色                    | -    |
| --uploader-action-text-color | var(--neutral-color-4, #c4c4c4)             | 上传区文字颜色                  | -    |
| --uploader-icon-color        | var(--neutral-color-3, #9e9e9e)             | 上传区 icon 颜色                | -    |
| --uploader-disabled-color    | @neutral-color-5                            | 上传区禁用 icon、(失败)文字颜色 | -    |
| --uploader-fail-color        | var(--neutral-color-9, #ffffff)             | 上传文件失败文字颜色            | -    |
| --uploader-fail-bg-color     | var(--neutral-color-1, #212121)             | 上传文件失败背景颜色            | -    |
| --uploader-loading-color     | var(--neutral-color-9, #ffffff)             | 上传文件 loading 颜色           | -    |
| --uploader-loading-bg-color  | var(--neutral-color-1, #212121)             | 上传文件 loading 背景颜色       | -    |
| --uploader-small-size        | `120px`                                     | 上传文件小尺寸容器大小          | -    |
| --uploader-small-margin      | `24px`                                      | 上传文件小尺寸容器外边距        | -    |
| --uploader-small-radius      | `calc(var(--base-radius-size, 0px) + 8px)`  | 上传文件小尺寸容器圆角          | -    |
| --uploader-large-size        | `216px`                                     | 上传文件大尺寸容器大小          | -    |
| --uploader-large-margin      | `24px`                                      | 上传文件大尺寸容器外边距        | -    |
| --uploader-large-radius      | `calc(var(--base-radius-size, 0px) + 12px)` | 上传文件大尺寸容器圆角          | -    |

## 数据结构 **Data Structure**

#### 文件 `UploadFile`

```ts showLineNumbers
interface UploadFile extends UploadFileExternal {
  key: string;
}

interface UploadFileExternal {
  path: string;
  poster?: string;
  size: number;
  name: string;
  duration?: number;
  fileType: UploadType;
  status: UploadStatus;
}
```