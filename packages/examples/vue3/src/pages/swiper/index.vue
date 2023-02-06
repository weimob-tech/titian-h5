<template>
  <CustomPage :options="options" @change="change">
    <TiSwiper
      :displayMultipleItems="attrs.displayMultipleItems"
      :spaceBetween="attrs.spaceBetween"
      :duration="attrs.duration"
      :autoplay="attrs.autoplay"
      :vertical="attrs.vertical"
      :interval="attrs.interval"
      :pagination="attrs.pagination"
      :loop="true"
      @change="onSwiperChange"
    >
      <TiSwiperItem v-for="img in images" :key="img">
        <div className="swiper-item">
          <TiImage :width="'100%'" :height="'100%'" mode="fill" :src="img" />
        </div>
      </TiSwiperItem>
    </TiSwiper>
  </CustomPage>
</template>

<script lang="ts" setup>
import { TiSwiper, TiSwiperItem, TiSwiperProps, TiImage } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { OptionType } from '../../components/page.interface';

const options: OptionType[] = [
  {
    key: 'vertical',
    type: 'radio',
    name: 'Direction',
    desc: '滚动方向',
    list: [
      { label: '横向', value: false },
      { label: '纵向', value: true, hiddenItems: ['displayMultipleItems', 'spaceBetween'] },
    ],
    value: false,
  },
  {
    key: 'displayMultipleItems',
    type: 'radio',
    name: 'Display Items',
    desc: '展示个数',
    list: [
      { label: '1', value: 1 },
      { label: '1.2', value: 1.2 },
      { label: '2', value: 2 },
    ],
    value: 1,
  },
  {
    key: 'spaceBetween',
    type: 'radio',
    name: 'Space Between',
    desc: '间距',
    list: [
      { label: '0', value: 0 },
      { label: '15', value: 15 },
    ],
    value: 15,
  },
  {
    key: 'autoplay',
    type: 'radio',
    name: 'Auto Play',
    desc: '自动播放',
    list: [
      { label: '是', value: true },
      { label: '否', value: false, hiddenItems: ['interval', 'duration'] },
    ],
    value: false,
  },
  {
    key: 'interval',
    type: 'radio',
    name: 'Interval',
    desc: '停留时长',
    list: [
      { label: '1s', value: 1000 },
      { label: '3s', value: 3000 },
      { label: '5s', value: 5000 },
    ],
    value: 3000,
  },
  {
    key: 'duration',
    type: 'radio',
    name: 'Duration',
    desc: '滑动时长',
    list: [
      { label: '100ms', value: 100 },
      { label: '300ms', value: 300 },
      { label: '500ms', value: 500 },
    ],
    value: 300,
  },
  {
    key: 'pagination',
    type: 'radio',
    name: 'Pagination',
    desc: '分页模式',
    list: [
      { label: '无', value: 'none' },
      { label: '指示点', value: 'bullets' },
      { label: '页码', value: 'fraction' },
    ],
    value: 'none',
  },
];

type Attrs = TiSwiperProps;

const attrs = ref<Attrs>({});

const images = [
  'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png',
  'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png',
  'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png',
  'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png',
];

const change = (detail: Attrs) => {
  console.log('change', detail);
  attrs.value = { ...detail };
};

const onSwiperChange = (event: any) => {
  console.log('onSwiperChange', event.detail.current);
};
</script>
<style>
.swiper-item {
  height: 100%;
}

.swiper-content {
  width: 100%;
  height: 300px;
  overflow: hidden;
}

.swiper-content.swiper-content-vertical {
  height: 460px;
}
</style>
