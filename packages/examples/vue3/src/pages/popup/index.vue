<template>
  <CustomPage :options="options" @change="change">
    <TiButton @click="showPopup">点击演示</TiButton>
    <TiPopup
      :visible="visible"
      :position="attrs.position"
      :closeOnMask="attrs.closeOnMask"
      :preventScroll="attrs.preventScroll"
      :radius="attrs.radius"
      @close="onClose"
      :transition="attrs.transition"
    >
      <div :class="'popup-' + attrs.position" style="overflow-y: auto">
        <div style="height: 500px">可滚动区域演示</div>
      </div>
    </TiPopup>
  </CustomPage>
</template>
<script lang="ts" setup>
import { TiButtonProps, TiButton, TiPopup } from 'titian-h5-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { OptionType } from '../../components/page.interface';
import { mergeOptionIntoAttrs } from '../../utils';

const options: OptionType[] = [
  {
    desc: '位置',
    key: 'position',
    type: 'radio',
    name: 'Position',
    list: [
      { label: '居中', value: 1, property: { position: 'center' }, hiddenItems: ['title', 'subTitle'] },
      { label: '底部', value: 2, property: { position: 'bottom' } },
      { label: '左侧', value: 3, property: { position: 'left' }, hiddenItems: ['title', 'subTitle'] },
      { label: '右侧', value: 4, property: { position: 'right' }, hiddenItems: ['title', 'subTitle'] },
    ],
    value: 1,
  },
  {
    desc: '运动',
    key: 'transition',
    type: 'radio',
    name: 'Transition',
    list: [
      { label: 'Zoom', value: 'zoom' },
      { label: 'Fade', value: 'fade' },
      { label: 'fade up', value: 'fade-up' },
      { label: 'fade down', value: 'fade-down' },
      { label: 'fade left', value: 'fade-left' },
      { label: 'fade right', value: 'fade-right' },
      { label: 'slide up', value: 'slide-up' },
      { label: 'slide down', value: 'slide-down' },
      { label: 'slide left', value: 'slide-left' },
      { label: 'slide right', value: 'slide-right' },
    ],
    value: 'slide-down',
  },
  {
    desc: '标题栏',
    key: 'title',
    type: 'radio',
    name: 'Title',
    list: [
      { label: '无', value: 1, property: {}, hiddenItems: ['subTitle'] },
      { label: '标题+仅取消', value: 2, property: { title: '上拉窗标题栏', variant: 'cancel-only' } },
      { label: '标题+确认取消', value: 3, property: { title: '上拉窗标题栏', variant: 'with-confirm' } },
      { label: '仅关闭', value: 4, property: { title: '上拉窗标题栏', variant: 'mini-close' } },
    ],
    value: 1,
  },
  {
    desc: '副标题',
    key: 'subTitle',
    type: 'radio',
    name: 'Subhead',
    list: [
      { label: '无', value: 1, property: { subTitle: '' } },
      { label: '有', value: 2, property: { subTitle: '我是副标题' } },
    ],
    value: 1,
  },
  {
    desc: '滚动穿透',
    key: 'preventScroll',
    type: 'radio',
    name: 'PreventScroll',
    list: [
      { label: '是', value: true, property: { preventScroll: true } },
      { label: '否', value: false, property: { preventScroll: false } },
    ],
    value: false,
  },
  { key: 'radius', type: 'radius', name: 'Radius', desc: '圆角', value: 16, max: 42 },
];

interface Attrs {
  position?: string;
  title?: string;
  variant?: string;
  subTitle?: string;
  closeOnMask?: boolean;
  preventScroll?: boolean;
  radius?: number;
  transition?: HTMLTiPopupElement['transition'];
}

const attrs = ref<Attrs>({});

const visible = ref(false);

const showPopup = () => {
  visible.value = !visible.value;
};

const change = (detail: Attrs) => {
  const afterAttr = mergeOptionIntoAttrs(options, detail);

  attrs.value = afterAttr;
};

const onConfirm = () => {
  console.log('onConfirm');
  visible.value = false;
};
const onClose = () => {
  console.log('onClose');
  visible.value = false;
};
const onCancel = () => {
  console.log('onCancel');
  visible.value = false;
};
</script>
<style>
.popup-center {
  width: 240px;
  height: 240px;
}

.popup-left {
  width: 150px;
}

.popup-right {
  width: 150px;
}

.popup-bottom {
  height: 648px;
}

.popup-right,
.popup-left {
  height: 100vh;
}
</style>
