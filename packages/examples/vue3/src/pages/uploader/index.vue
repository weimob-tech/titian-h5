<template>
  <CustomPage :options="options" @change="change">
    <div class="uploader-page">
      <TiUploader
        extThumBoxClass="ext-thum-box-class"
        :url="attrs.url"
        :size="attrs.size"
        :count="attrs.count"
        :choose-text="attrs.uploadText"
      ></TiUploader>
    </div>
  </CustomPage>
</template>

<script lang="ts" setup>
import { TiUploader } from 'titian-h5-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { OptionType } from '../../components/page.interface';
const options: OptionType[] = [
  {
    type: 'radio',
    name: 'Word',
    key: 'word',
    value: false,
    desc: '文字',
    list: [
      { value: false, label: '无', attr: { uploadText: '' } },
      { value: true, label: '有', attr: { uploadText: '上传图片' } },
    ],
  },
  {
    type: 'radio',
    name: 'Size',
    key: 'size',
    value: 'small',
    desc: '规格',
    list: [
      { value: 'small', label: 'Medium' },
      { value: 'large', label: 'Big' },
    ],
  },
  {
    type: 'radio',
    name: 'State',
    key: 'state',
    value: 'success',
    desc: '状态',
    list: [
      { value: 'success', label: '成功' },
      { value: 'loading', label: '加载' },
      { value: 'error', label: '失败' },
    ],
  },
  {
    type: 'radio',
    name: 'Limit',
    key: 'count',
    value: 999,
    desc: '限制',
    list: [
      { value: 999, label: '无' },
      { value: 3, label: '限3张图' },
    ],
  },
];

interface UploaderAttrsProps {
  size: 'small' | 'large';
  count: number;
  uploadText: string;
  url: string;
}

const attrs = ref<UploaderAttrsProps>({ size: 'large', count: 9, uploadText: 'text', url: '' });

const change = (detail: any) => {
  console.log('change', detail);
  attrs.value = { ...detail, url: 'http://172.18.50.250:3000/upload' };
};
</script>
<style>
.uploader-page {
  width: calc(100% - 56px);
  height: auto;
  margin: 0 28px;
  overflow: hidden;

  border-radius: 20px;

  background: #fff;
}
</style>
