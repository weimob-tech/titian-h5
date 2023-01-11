<template>
  <CustomPage :options="options" :change="change">
    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column">
      <TiImage
        src="https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png"
        :width="180"
        :height="180"
        :radius="8"
        @click="handleClick"
      >
        预览
      </TiImage>
      <div class="preview-text">点击图片预览</div>
    </div>
    <div ref="previewPreview">
      <TiPreview :displayNumber="attrs.displayNumber" />
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { TiPreview, TiImage, TiPreviewProps } from '@titian-design/vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const previewPreview = ref<HTMLElement | null>(null);

const options: IOptionType[] = [
  {
    desc: '数字',
    key: 'displayNumber',
    type: 'radio',
    name: 'Number',
    value: true,
    list: [
      { label: '展示', value: true },
      { label: '隐藏', value: false },
    ],
  },
];

type Attrs = TiPreviewProps;

const attrs = ref<Attrs>({});

const change = (detail: Attrs) => {
  attrs.value = detail;
};

const handleClick = async () => {
  await previewPreview.value?.querySelector('ti-preview')?.show([
    {
      fileType: 'image',
      path: 'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png',
    },
  ]);
};
</script>
<style>
.preview-text {
  margin-top: 20px;

  color: #c4c4c4;
  font-size: 20px;
}
</style>
