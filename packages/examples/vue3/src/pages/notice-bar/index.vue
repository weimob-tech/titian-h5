<template>
  <CustomPage :options="options" @change="change" :center="false">
    <TiNoticeBar
      ref="noticeBar"
      :content="'登录同步各渠道购物车中的商品'"
      :color="attrs.color"
      :scrollable="attrs.scrollable || false"
      :variant="attrs.variant || 'horizontal'"
      :leftIcon="attrs.leftIcon"
      :rightIcon="attrs.rightIcon"
      :ext-style="{ 'text-align': attrs.align, ...attrs.extStyle }"
    >
      <TiButton
        v-if="attrs.slotName"
        slot="after"
        size="tiny"
        variant="outlined"
        :color="attrs.mode === 'custom' ? '#fff' : ''"
      >
        按钮
      </TiButton>
    </TiNoticeBar>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiNoticeBar, TiNoticeBarProps } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'mode',
    name: 'Mode',
    value: 'default',
    list: [
      {
        value: 'default',
        label: '默认',
      },
      {
        value: 'custom',
        label: '自定义',
        hiddenItems: ['color', 'extStyle'],
        attr: {
          extStyle: { '--notice-bar-color': '#FFFFFF', '--notice-bar-background-color': 'rgba(33, 33, 33, 0.8)' },
          color: '#ffffff',
        },
      },
    ],
  },
  {
    type: 'color',
    name: 'Color',
    key: 'color',
    desc: '颜色 ',
    value: '#fa2c19',
  },
  {
    type: 'radio',
    name: 'Left',
    key: 'leftIcon',
    desc: '左侧',
    value: '',
    list: [
      {
        label: '空',
        value: '',
      },
      {
        label: '搭图标',
        value: 'speaker',
      },
    ],
  },
  {
    type: 'radio',
    name: 'Right',
    key: 'rightIcon',
    desc: '右侧',
    value: '',
    list: [
      {
        label: '空',
        value: '',
      },
      {
        label: '图标',
        value: 'arrow-right',
      },
      {
        label: '按钮',
        value: 'button',
        attr: {
          slotName: 'after',
          rightIcon: '',
        },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Play',
    key: 'play',
    desc: '播放',
    value: 'no',
    list: [
      {
        label: '否',
        value: 'no',
      },
      {
        label: '水平滚动',
        value: 'horizontal',
        attr: { scrollable: true, variant: 'horizontal' },
      },
      {
        label: '垂直翻动',
        value: 'vertical',
        attr: { scrollable: true, variant: 'vertical', content: ['1111111111', '2222222222'] },
      },
    ],
  },
  {
    type: 'radio',
    name: 'Align',
    key: 'align',
    desc: '对齐',
    value: 'center',
    list: [
      {
        label: '居左',
        value: 'left',
      },
      {
        label: '居中',
        value: 'center',
      },
    ],
  },
];

interface Attrs extends TiNoticeBarProps {
  slotName?: string;
  mode?: string;
  align?: string;
  extStyle?: {};
}
const attrs = ref<Attrs>({});
const noticeBar = ref();
const change = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
