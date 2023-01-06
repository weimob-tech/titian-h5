<template>
  <div className="share-sheet-page">
    <CustomPage :options="options" @change="change">
      <TiButton @click="onClick">点击演示</TiButton>
    </CustomPage>
    <TiShareSheet
      :visible="visible"
      @close="onClick"
      @cancel="onClick"
      :options="attrs"
      ext-popup-class="ext-share-sheet-class"
      ext-popup-mask-class="ext-share-sheet-mask-class"
      ext-popup-content-class="ext-share-sheet-content-class"
      ext-title-class="ext-share-sheet-title-class"
    />
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiButton, TiShareSheet } from 'titian-h5-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Row',
    key: 'row',
    desc: '行数 ',
    list: [
      { label: '1行', value: 1 },
      { label: '2行', value: 2 },
    ],
    value: 2,
  },
  {
    type: 'radio',
    name: 'Column',
    key: 'column',
    desc: '列数 ',
    list: [
      { label: '3列', value: 3 },
      { label: '4列', value: 4 },
      { label: '5列', value: 5 },
      { label: '8列', value: 8 },
    ],
    value: 5,
  },
];
const group = [
  [
    {
      name: '微信',
      icon: 'wechat',
      openType: 'contact',
      color: '#f5f5f5',
      bgc: '#26c85a',
    },
    { name: '朋友圈', icon: 'share-wechat-moments', color: '#f5f5f5', bgc: '#26c85a', openType: 'share' },
    { name: 'QQ', icon: 'qq', color: '#f5f5f5', bgc: '#2793ff', openType: 'getPhoneNumber' },
    { name: '微博', icon: 'weibo', color: '#f5f5f5', bgc: '#ff2f3b', openType: 'getUserInfo' },
    {
      name: '微博2',
      bgc: '#2793ff',
      icon: 'https://cdn2.weimob.com/static/saas-cloud-component-xapp-stc/titian/share-sheet/weibo-black.svg',
    },
    {
      name: '微博3',
      isSvgPath: true,
      icon: 'checkbox',
      bgc: 'rgb(255, 44, 25)',
      extStyle: 'background-color:#fff',
    },
    {
      name: '微博4',
      isSvgPath: true,
      paths: [
        {
          d: 'M210.289778 210.289778c-166.599111 166.627556-166.599111 436.792889 0 603.420444 166.627556 166.599111 436.792889 166.599111 603.420444 0 166.599111-166.627556 166.599111-436.792889 0-603.420444-166.627556-166.599111-436.792889-166.599111-603.420444 0z',
          fill: '#454545',
        },
        {
          d: 'M342.044444   631.978667l2.588445-2.901334L461.738667 512l-117.105778-117.077333a35.555556 35.555556 0 0 1 47.388444-52.878223l2.901334 2.588445L512 461.738667l117.077333-117.105778a35.555556 35.555556 0 0 1 52.878223 47.388444l-2.588445 2.901334L562.261333 512l117.105778 117.077333a35.555556 35.555556 0 0 1-47.388444 52.878223l-2.901334-2.588445L512 562.261333l-117.077333 117.105778a35.555556 35.555556 0 0 1-52.878223-47.388444z',
          fill: 'rgb(255, 255, 255)',
        },
      ],
    },
    { name: '推荐', icon: 'profile' },
  ],
  [
    { name: '保存图片', icon: 'save', openType: 'launchApp' },
    { name: '海报分享', icon: 'picture', openType: 'openSetting' },
    { name: '多商品海报', icon: 'goods', openType: 'feedback' },
    { name: '推荐', icon: 'profile' },
    { name: '推荐', icon: 'profile' },
  ],
];

const attrs = ref([]);
const visible = ref(false);

const change = (detail: { row: number; column: number }) => {
  const { row, column } = detail;
  let list = JSON.parse(JSON.stringify(group));
  list.length = row;
  if (row === 1) {
    list = list.pop();
    list.length = column;
    list = [list];
  }
  if (row === 2) {
    list.forEach((el: any) => (el.length = column));
  }
  attrs.value = list;
};

const onClick = () => {
  visible.value = !visible.value;
};
</script>
<style></style>
