<template>
  <CustomPage :options="options" @change="change">
    <div class="group">
      <div class="group-item">
        <TiPopupTitlebar
          title="标题"
          :sub-title="attrs.subtitle ? '副标题' : ''"
          :variant="attrs.variant"
          ext-class="ext-class"
          @confirm="onConfirm"
          @close="onClose"
          @cancel="onCancel"
          @back="onBack"
        />
      </div>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { TiPopupTitlebar } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
import { mergeOptionIntoAttrs } from '../../utils';

const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'variant',
    name: 'Mode',
    value: 'with-confirm',
    list: [
      {
        label: 'with-confirm',
        value: 'with-confirm',
      },
      {
        label: 'cancel-only',
        value: 'cancel-only',
      },
      {
        label: 'back-title-cancel',
        value: 'back-title-cancel',
      },
      {
        label: 'mini-close',
        value: 'mini-close',
      },
      {
        label: 'left-title-close',
        value: 'left-title-close',
      },
    ],
  },
  {
    type: 'radio',
    desc: '模式',
    key: 'subtitle',
    name: 'Subtitle',
    value: true,
    list: [
      {
        label: '无',
        value: false,
      },
      {
        label: '有副标题',
        value: true,
      },
    ],
  },
];

interface Attrs {
  subtitle?: string;
  title?: string;
  variant?: string;
}

const attrs = ref<Attrs>({});

const visible = ref(false);

const change = (detail: Attrs) => {
  const afterAttr = mergeOptionIntoAttrs(options, detail);

  attrs.value = afterAttr;
};

const onConfirm = () => {
  console.log('onConfirm');
};
const onClose = () => {
  console.log('onClose');
};
const onCancel = () => {
  console.log('onCancel');
};
const onBack = () => {
  console.log('onBack');
};
</script>
<style>
.group {
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  width: 100%;
}

.ext-class {
  margin: 10px 0;

  background: #fff;
}

.group-item {
  position: relative;
}
</style>
