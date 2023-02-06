<template>
  <div className="custom-container">
    <CustomPage :options="options" @change="change">
      <TiTransition
        :show="show"
        :name="attrs.state"
        extClass="transition-placeholder"
        ext-css=".transition-placeholder { width: 100px; height: 100px; background-color: #fa2c19;}"
      />
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { TiTransitionProps, TiTransition } from '@titian-design/mobile-vue';
import { ref, watch, watchEffect } from 'vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';

const options: IOptionType[] = [
  {
    key: 'state',
    type: 'radio',
    name: 'State',
    desc: '状态',
    list: [
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
    value: 'fade',
  },
];

interface Attrs {
  state?: TiTransitionProps['name'];
}

const attrs = ref<Attrs>({});
const show = ref<boolean>(false);
let showEnd = true;

const change = (detail: Attrs) => {
  console.log('detail: ', detail);
  if (showEnd) {
    attrs.value = detail;
  }
};

watch(
  attrs,
  () => {
    if (attrs.value.state) {
      show.value = !show.value;
      showEnd = false;
      setTimeout(() => {
        show.value = !show.value;
        setTimeout(() => {
          showEnd = true;
        }, 500);
      }, 1000);
    }
  },
  {
    flush: 'post',
  },
);
</script>
<style>
.transition-placeholder {
  width: 100px;
  height: 100px;

  background-color: #fa2c19;
}
</style>
