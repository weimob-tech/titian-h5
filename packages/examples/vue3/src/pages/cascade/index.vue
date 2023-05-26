<template>
  <div class="page">
    <CustomPage :options="options" @change="change">
      <TiButton @click="toggleVisible">点击演示</TiButton>
    </CustomPage>
    <TiPopup :visible="visible" position="bottom" @close="toggleVisible" :preventScroll="true">
      <TiCascade
        v-if="attrs && Object.keys(attrs).length > 0 && visible"
        :key="attrs.mode + (attrs.value || []).join('')"
        :code="attrs.code"
        :label="attrs.label"
        :cascade="attrs.cascade"
        :options="attrs.options"
        :tabs="attrs.tab"
        :value="attrs.value"
        :getOptions="getOption"
        @change="onChangeCascade"
        @close="toggleVisible"
        @changeSwiper="onChangeSwiperCascade"
      ></TiCascade>
    </TiPopup>
  </div>
</template>

<script setup lang="ts">
import CustomPage from '../../components/page.vue';
import { TiCascade, TiButton, TiPopup } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import { IOptionType } from '../../components/page.interface';
import city from './city';

const options: IOptionType[] = [
  {
    type: 'radio',
    key: 'mode',
    desc: '模式',
    name: 'Mode',
    list: [
      {
        label: '固定数据',
        value: 'default',
        attr: {
          code: 'code',
          label: 'name',
          cascade: 'children',
          options: city,
          tab: ['省', '市', '区/县'],
        },
      },
      {
        label: '非固定数据',
        value: 'block',
        attr: {
          code: 'areaCode',
          label: 'areaName',
          cascade: 'child',
          tab: ['省', '市', '区/县', '街道'],
        },
      },
    ],

    value: 'default',
  },
  {
    type: 'radio',
    key: 'defaultValue',
    desc: '默认值',
    name: 'DefaultValue',
    list: [
      {
        label: '无默认值',
        value: false,
      },
      {
        label: '默认值',
        value: true,
      },
    ],
    value: false,
  },
];

const attrs = ref<any>({});
const change = (detail: any) => {
  if (detail.defaultValue) {
    if (detail.mode === 'default') {
      detail.value = ['330000', '330200', '330211'];
    } else {
      detail.value = ['440000', '440200', '440205', '440205455'];
    }
  }

  attrs.value = { ...detail };
};

const visible = ref(false);
const toggleVisible = () => {
  visible.value = !visible.value;
};

const getOption = async (value: any) => {
  let rawResponse;
  if (value) {
    rawResponse = await fetch('api3/address/tmp/getAreasByCityId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ areaCode: value.areaCode }),
    });
  } else {
    rawResponse = await fetch('api3/address/tmp/getProvinceCity', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
  }
  const { data } = await rawResponse.json();
  console.log(data);
  return data;
};

const onChangeCascade = (event: CustomEvent) => {
  console.log(event.detail);
};

const onChangeSwiperCascade = (event: CustomEvent) => {
  console.log(event.detail);
};
</script>

<style lang="less"></style>
