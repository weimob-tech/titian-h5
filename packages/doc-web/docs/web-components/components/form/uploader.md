---
title: 上传
sidebar_custom_props: 
    suffix: Uploader
hide_title: true
pagination_prev: null
pagination_next: null
side_iframe_path: '#/uploader'
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# 上传 _Uploader_
**用于将本地图片上传到服务器，可以展示上传进度、结果预览。**

import TabsLink from '@site/src/components/tabsLink';

<TabsLink id="ti-uploader-api" />

:::note
1. 内置 wx 所有选择文件 api
2. 内置上传操作
3. 内置上传进度
:::

## 用法示例

#### 基本使用方式

#### 基础用法

**选择完文件后，立即执行上传操作。**

```html showLineNumbers
<ti-uploader url="https://api.bayfiles.com/upload" size="small" choose-text="请选择文件"></ti-uploader>
```

#### 自定义参数

**自定义header**

<Tabs>
<TabItem value="index.html" label="index.html" >

```html showLineNumbers
<ti-uploader id="ti-uploader" url="https://api.bayfiles.com/upload" onchange="change(event)"></ti-uploader>
```
  </TabItem>
  <TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var params = {
    name: 'picture',
    header: {
      'content-type': 'multipart/form-data'
    }
  };
  var tiUploader = document.getElementById("ti-uploader");
  tiUploader.params = params;

  function afterUpload(){
    // 这里的res是你自定义的上传接口的返回值
    const data = JSON.parse(res.data);
    if (data.errcode !== '0') {
      return {
        status: 'fail'
      };
    }
    return {
      path: data.data.url,
      status: 'done'
    };
  };
  tiUploader.addEventListener('afterUpload', afterUpload, false);

  function change(file, fileList) {
    // 上传完成/删除完成后调用
    console.log(file, fileList);
  };
};
```

</TabItem>
</Tabs>


#### 手动上传

**通过设置 `immediately` 为 `false`，并调用 `submit()` 方法，可以手动控制上传时机。**

<Tabs>
<TabItem value="index.html" label="index.html" >

```html showLineNumbers
<ti-uploader id="ti-uploader" url="https://api.bayfiles.com/upload" size="small" choose-text="请选择"></ti-uploader>
```
  </TabItem>
  <TabItem value="index.js" label="index.js">

```js showLineNumbers
window.onload = function(){
  var tiUploader = document.getElementById("ti-uploader");
  tiUploader.count = 10;
  tiUploader.immediately = false;
  tiUploader.beforeUpload = function(event){
    console.log("beforeUpload", event);
  };

  function doSubmit(event) {
    tiUploader.submit();
  };
};
```
</TabItem>
</Tabs>

#### 仅使用组件样式，自定义上传
<Tabs>
  <TabItem value="html" label="index.html" >

  ```html showLineNumbers
  <ti-uploader id="ti-uploader"></ti-uploader>
  ```
  </TabItem>
  <TabItem value="js" label="index.js">

```typescript tsx showLineNumbers
window.onload = function () {
  var tiUploader = document.getElementById('ti-uploader')
  tiUploader.immediately = false
  tiUploader.value = [
    {
      path: 'https://xxxxx.png',
      fileType: 'image',
      status: 'done'
    }
  ]
  tiUploader.afterChoose = function (selectedList, existsList) {
    // 上传之前你可以根据需求，比如size，来过滤selectedList
    YOUR_UPLOAD().then(() => {
      // 在你的上传回调里设置fileList，主要设置路径path，和状态status => 成功: done，失败：fail，上传中：'upload'
      tiUploader.value = [
        ...existsList,
        ...selectedList.map(el => ({
          ...el,
          path: 'https://xxxxx.png',
          status: 'done' // 上传失败的话 这里设置  fail
        }))
      ]
    })
    // 这里return出去的是走后续上传的文件
    return selectedList.map(el => ({ ...el, status: 'upload' }))
  }
  function change(event) {
    tiUploader.value = event.detail.fileList
  }
  tiUploader.addEventListener('change', change, false)
}
```
</TabItem>
</Tabs>

## ti-uploader API

### 属性 **Properties**

| 名称                 | 类型                                         | 是否必填 | 默认值                     | 说明                                                                                        | 备注 |
| -------------------- | -------------------------------------------- | -------- | -------------------------- | ------------------------------------------------------------------------------------------- | ---- |
| value                | `unknown`                                    | 否       | -                          | 使用 value，组件为受控模式                                                                  | -    |
| default-value        | `UploadFileParams[]`                         | 否       | []                         | 使用 defaultValue ，组件为非受控模式                                                        |      |
| disabled             | `boolean`                                    | 否       | false                      | 禁用交互能力                                                                                |      |
| choose-type          | `UploadApiEnum`                              | 否       | false                      | 文件类型                                                                                    |      |
| immediately          | `boolean`                                    | 否       | true                       | 是否立刻上传                                                                                | -    |
| immediately-choose   | `boolean`                                    | 否       | true                       | 点击后立即选择                                                                              | -    |
| size                 | `small`                           \| `large` | 否       | small                      | 组件尺寸                                                                                    | -    |
| choose-text          | `string`                                     | 否       |                            | 选择器文案                                                                                  | -    |
| use-choose-slot      | `boolean`                                    | 否       | false                      | 是否使用选择器插槽                                                                          | -    |
| choose-icon          | `string`                                     | 否       | plus                       | 选择器 icon                                                                                 | -    |
| source-type          | `array`                                      | 否       | ['album', 'camera']        | 选择图片的来源                                                                              | -    |
| size-type            | `array`                                      | 否       | ['original', 'compressed'] | type 为 image 有效； original = 原图; compressed = 压缩                                     | -    |
| max-duration         | number                                       | 否       | 10                         | 对应微信选择文件参数。拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册。 | -    |
| camera               | `back` \| `front`                            | 否       | back                       | 仅在 sourceType 为 camera 时生效，使用前置或后置摄像头                                      | -    |
| count                | `number`                                     | 否       | 9                          | 选择文件/图片/视频的数量                                                                    | -    |
| media-type           | `array`                                      | 否       | ['image', 'video']         | 文件类型，可选值 `image` / `video` / `mix`                                                  | -    |
| url                  | `string`                                     | 否       | -                          | 上传地址                                                                                    | -    |
| before-choose        | `Function`                                   | 否       |                            | 选择前的处理函数                                                                            | -    |
| after-choose         | `Function`                                   | 否       |                            | 选择后的处理函数                                                                            | -    |
| before-upload        | `Function`                                   | 否       |                            | - 上传前置方法 可用用于处理上传参数                                                         | -    |
| upload               | `Function`                                   | 否       |                            | 自定义上传方法，不传则使用内置的上传方法                                                    | -    |
| complete             | `Function`                                   | 否       |                            | 上传完成/删除完成后调用                                                                     | -    |
| after-upload         | `Function`                                   | 否       |                            | 上传后置方法，后置处理返回结果                                                              | -    |
| upload-exercise      | '' \| `loading` \| `progress`                | 否       | loading                    | 上传中展示风格                                                                              | -    |
| upload-exercise-text | `string`                                     | 否       | 上传中                     | 上传中文案                                                                                  | -    |
| upload-fail-text     | `string`                                     | 否       | 上传失败                   | 上传失败文案                                                                                | -    |
| image-params         | `Record<string, any>`                        | 否       | {}                         | 上传图片参数；当不传自定义 `beforeUpload` 方法时，可以传该参数作为内部 beforeUpload 的参数  | -    |
| video-params         | `Record<string, any>`                        | 否       | {}                         | 上传视频参数；当不传自定义 `beforeUpload` 方法时，可以传该参数作为内部 beforeUpload 的参数  | -    |
| file-params          | `Record<string, any>`                        | 否       | {}                         | 上传文件参数；当不传自定义 `beforeUpload` 方法时，可以传该参数作为内部 beforeUpload 的参数  | -    |
| image-result-format  | <code>(string \| number)[]</code>            | 否       | []                         | 图片参数；当不传自定义 `afterUpload` 方法时，可以传该参数作为内部 afterUpload 的参数        | -    |
| video-result-format  | <code>(string \| number)[]</code>            | 否       | []                         | 视频参数；当不传自定义 `afterUpload` 方法时，可以传该参数作为内部 afterUpload 的参数        | -    |
| file-result-format   | <code>(string \| number)[]</code>            | 否       | []                         | 文件参数；当不传自定义 `afterUpload` 方法时，可以传该参数作为内部 afterUpload 的参数        | -    |
| ext-style            | `string`                                     | 否       | ''                         | 容器样式                                                                                    | -    |


### 事件 **Events**

| 名称        | 参数列表                                    | 描述     | 备注 |
| ----------- | ------------------------------------------ | -------- | ---- |
| change | `(e: CustomEvent) => void`                              | 上传处理 |      |
| error  | `(e: CustomEvent) => void`                              | 错误事件 |      |
| choose | `(e: CustomEvent) => void`                              | 选择事件 |      |

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

| 变量                         | 默认值                                        | 说明                            | 备注 |
| ---------------------------- | --------------------------------------------- | ------------------------------- | ---- |
| --uploader-name-color        | var(--neutral-color-4, #c4c4c4)               | 上传文件展示区文字颜色          | -    |
| --uploader-name-font-size    | 24rpx                                       | 上传文件展示区文字大小          | -    |
| --uploader-action-bg-color   | var(--neutral-color-7, #f5f5f5)               | 上传区背景色                    | -    |
| --uploader-action-text-color | var(--neutral-color-4, #c4c4c4)               | 上传区文字颜色                  | -    |
| --uploader-icon-color        | var(--neutral-color-3, #9e9e9e)               | 上传区 icon 颜色                | -    |
| --uploader-disabled-color    | var(--neutral-color-5, #e0e0e0)               | 上传区禁用 icon、(失败)文字颜色 | -    |
| --uploader-fail-color        | var(--neutral-color-9, #ffffff)               | 上传文件失败文字颜色            | -    |
| --uploader-fail-bg-color     | var(--neutral-color-1, #212121)               | 上传文件失败背景颜色            | -    |
| --uploader-loading-color     | var(--neutral-color-9, #ffffff)               | 上传文件 loading 颜色           | -    |
| --uploader-loading-bg-color  | var(--neutral-color-1, #212121)               | 上传文件 loading 背景颜色       | -    |
| --uploader-small-size        | 120rpx                                      | 上传文件小尺寸容器大小          | -    |
| --uploader-small-margin      | 24rpx                                       | 上传文件小尺寸容器外边距        | -    |
| --uploader-small-radius      | calc(var(--base-radius-size, 0rpx) + 8rpx)  | 上传文件小尺寸容器圆角          | -    |
| --uploader-large-size        | 216rpx                                      | 上传文件大尺寸容器大小          | -    |
| --uploader-large-margin      | 24rpx                                       | 上传文件大尺寸容器外边距        | -    |
| --uploader-large-radius      | calc(var(--base-radius-size, 0rpx) + 12rpx) | 上传文件大尺寸容器圆角          | -    |

## 数据结构 **Data Structure**

```ts showLineNumbers
export enum UploadApiEnum {
  /** wx.chooseImage */
  CHOOSEIMAGE = 'chooseImage',
  /** wx.chooseVideo */
  CHOOSEVIDEO = 'chooseVideo',
  /** wx.chooseMedia */
  CHOOSEMEDIA = 'chooseMedia',
  /** wx.chooseMessageFile */
  CHOOSEMESSAGEFILE = 'chooseMessageFile'
}

```

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