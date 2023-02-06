<template>
  <CustomPage :options="options" @change="onChange">
    <img v-if="attrs.mode === 'cover' && attrs.selectMode === 'normal'" className="bg-pic" :src="successUrl" />
    <div className="img-container">
      <TiImage
        width="180"
        height="180"
        :mode="attrs.mode"
        :radius="attrs.radius"
        :src="attrs.src"
        :use-loading-slot="attrs.useLoadingSlot"
        :use-error-slot="attrs.useErrorSlot"
        :loading-icon="attrs.loadingIcon"
        :error-icon="attrs.errorIcon"
      >
        <TiLoading v-if="attrs.slotName === 'loading'" slot="loading" />
        <div v-if="attrs.slotName === 'text'" slot="loading">加载中...</div>
        <div v-if="attrs.slotName === 'error'" slot="error">加载失败</div>
      </TiImage>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiImage } from '@titian-design/mobile-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const successUrl = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png?';
const pendingUrl = 'https://placeholder.com/150';
const failUrl = 'https://cdn2.weimob.com/saas/assets/images/a.jpg';
interface ImageAttrs {
  src?: string;
  mode?: string;
  radius?: number;
  useLoadingSlot?: boolean;
  useErrorSlot?: boolean;
  loadingIcon?: string;
  errorIcon?: string;
  slotName?: string;
  loadingSlot?: string;
  errorSlot?: string;
  selectMode?: string;
}

const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    desc: '状态',
    key: 'selectMode',
    value: 'normal',
    list: [
      {
        value: 'normal',
        label: '正常',
        attr: {
          loadingIcon: 'default-pic',
          src: successUrl,
        },
        hiddenItems: ['loadingSlot', 'errorSlot'],
      },
      {
        value: 'loading',
        label: '加载中',
        attr: {
          src: pendingUrl,
        },
        hiddenItems: ['errorSlot', 'mode', 'radius'],
      },
      {
        value: 'error',
        label: '加载失败',
        hiddenItems: ['mode', 'loadingSlot', 'radius'],
        attr: { errorIcon: 'default-pic', src: failUrl },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'loadingSlot',
    desc: '样式',
    value: 'image',
    attr: { random: () => Math.random() },
    list: [
      {
        value: 'image',
        label: '图片',
        attr: {
          loadingIcon: 'default-pic',
        },
      },
      {
        value: 'icon',
        label: '图标',
        attr: {
          loadingIcon: 'right',
        },
      },
      {
        value: 'loading',
        label: '加载',
        attr: {
          useLoadingSlot: true,
          slotName: 'loading',
        },
      },
      {
        value: 'text',
        label: '文字',
        attr: {
          useLoadingSlot: true,
          slotName: 'text',
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'errorSlot',
    desc: '样式',
    value: 'icon',
    attr: { random: () => Math.random() },
    list: [
      {
        value: 'image',
        label: '图片',
      },
      {
        value: 'icon',
        label: '图标',
        attr: {
          errorIcon: 'close',
        },
      },
      {
        value: 'text',
        label: '文字',
        attr: {
          useErrorSlot: true,
          slotName: 'error',
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Fill Mode',
    key: 'mode',
    desc: '填充 ',
    list: [
      { value: 'cover', label: 'Cover' },
      { value: 'none', label: 'None' },
      { value: 'contain', label: 'Contain' },
      { value: 'scaleToFill', label: 'Fill' },
      { value: 'scaleDown', label: 'Scale Down' },
      { value: 'top left', label: 'top left' },
      { value: 'bottom right', label: 'bottom right' },
      { value: 'scaleToFill', label: 'scaleToFill' },
    ],
    value: 'cover',
  },
  {
    type: 'radius',
    name: 'Radius',
    key: 'radius',
    desc: '圆角',
    value: 30,
  },
];
const attrs = ref<ImageAttrs>({});
const onChange = (detail: any) => {
  attrs.value = detail;
};
</script>
<style>
.img-container {
  display: flex;
  width: auto;

  border-radius: 0;

  background: #f2f2f2;
}

.bg-pic {
  position: absolute;
  width: 270px;
  height: 180px;

  opacity: 0.2;
}
</style>
