<template>
  <CustomPage :options="options" @change="setAttrs">
    <TiBadge
      v-if="attrs.atText"
      :content="attrs.content"
      :dot="attrs.dot"
      :icon="attrs.icon"
      :atText="attrs.atText"
      :spread="attrs.spread"
      :offset="attrs.offset"
    >
      <div v-if="attrs.isText" class="text">Title Text</div>
    </TiBadge>
    <div v-else class="badge-box">
      <TiBadge
        :content="attrs.content"
        :dot="attrs.dot"
        :icon="attrs.icon"
        :spread="attrs.spread"
        :offset="attrs.offset"
      >
        <div v-if="attrs.isIcon" class="badge-box-icon">icon</div>
      </TiBadge>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiBadge, TiBadgeProps } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'dashed',
    name: 'Mode',
    value: 0,
    list: [
      {
        label: '图标',
        value: 0,
        attr: { atText: false, isIcon: true },
        hiddenItems: ['position'],
      },
      {
        label: '文字',
        value: 1,
        attr: { atText: true, isText: true },
        hiddenItems: ['position', 'spread'],
      },
      {
        label: '自定义',
        value: 2,
        attr: { atText: false, isIcon: true },
        hiddenItems: ['badge', 'spread'],
      },
    ],
  },
  {
    type: 'radio',
    desc: '徽标',
    key: 'badge',
    name: 'Badge',
    value: 0,
    list: [
      {
        label: '红点',
        value: 0,
        attr: { dot: true },
        hiddenItems: ['spread'],
      },
      {
        label: '图标',
        value: 1,
        attr: { icon: 'home' },
        hiddenItems: ['spread'],
      },
      {
        label: '个位数',
        value: 2,
        attr: { content: '9' },
        hiddenItems: ['spread'],
      },
      {
        label: '十位数',
        value: 3,
        attr: { content: '99' },
      },
      {
        label: '文字',
        value: 4,
        attr: { content: 'HOT' },
      },
    ],
  },
  {
    type: 'radio',
    desc: '文字延展',
    key: 'spread',
    name: 'Extend',
    value: 'toRight',
    list: [
      {
        label: '向左',
        value: 'toRight',
      },
      {
        label: '左右',
        value: 'bothSides',
      },
    ],
  },
  {
    type: 'radio',
    desc: '位置',
    key: 'position',
    name: 'Position',
    value: 0,
    list: [
      {
        label: '位置1',
        value: 0,
        attr: { offset: [-6, -2], dot: true },
      },
      {
        label: '位置2',
        value: 1,
        attr: { offset: [-6, 25], dot: true },
      },
      {
        label: '位置3',
        value: 2,
        attr: { offset: [-6, 55], dot: true },
      },
    ],
  },
];

interface Attrs extends TiBadgeProps {
  isText?: boolean;
  isIcon?: boolean;
}
const attrs = ref<Attrs>({});
const setAttrs = (detail: Attrs) => {
  attrs.value = detail;
};
</script>
<style>
.text {
  display: inline-block;
  position: relative;

  background: #f2f2f2;

  font-size: 28px;
  line-height: 34px;
}

.badge-box {
  margin: 20px;
}

.badge-box-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;

  border-radius: 12px;

  background: #f2f2f2;

  color: #212121;
  font-family: PingFangSC-Medium, 'PingFang SC';
  font-size: 18px;
  font-weight: 500;
}
</style>
