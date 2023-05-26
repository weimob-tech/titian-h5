<template>
  <CustomPage :options="options" @change="change">
    <div
      class="tooltip-page"
      :style="{
        'justify-content': attrs.justifyContent,
      }"
    >
      <div
        class="tooltip-page-text"
        :style="{
          'order': attrs.order,
          'margin-left': attrs.marginLeft,
        }"
      >
        {{ attrs.text }}
      </div>

      <TiTooltip
        :closeOnClick="true"
        :direction="attrs.direction"
        content="每行文字限制十二个中文字每行文字限制十二个中文字每行文字限制十二个中文字"
        extClass="ext-tooltip"
        extContentClass="ext-tooltip-content"
        extInnerClass="ext-tooltip-inner"
      >
        <div style="{ 'margin': `0 ${attrs.style}px` }">
          <TiIcon name="info" size="28" />
        </div>
      </TiTooltip>
    </div>
  </CustomPage>
</template>

<script lang="ts" setup>
import { TiTooltip, TiIcon } from '@titian-design/mobile-vue';
import { ref } from 'vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Arrow',
    key: 'direction',
    desc: '箭头 ',
    list: [
      { label: '向上', value: 'bottom' },
      { label: '向下', value: 'top' },
    ],
    value: 'bottom',
  },
  {
    type: 'radio',
    name: 'Style',
    key: 'style',
    desc: '样式 ',
    list: [
      { label: '样式1', value: 1 },
      { label: '样式2', value: 2 },
      { label: '样式3', value: 3 },
    ],
    value: 3,
  },
  {
    type: 'radio',
    name: 'Position',
    key: 'position',
    desc: '位置 ',
    list: [
      { label: '居左', value: 'left', attr: { text: '左侧气泡提示', justifyContent: 'flex-start', order: 2 } },
      {
        label: '居中',
        value: 'center',
        attr: { text: '居中气泡提示信息文案', justifyContent: 'flex-start', marginLeft: 0 },
      },
      { label: '居右', value: 'right', attr: { text: '右侧气泡提示', justifyContent: 'flex-end' } },
    ],
    value: 'left',
  },
];
interface TooltipAttrsProps {
  justifyContent: string;
  direction: string;
  order: number;
  text: string;
  marginLeft: number;
  style?: number;
}

const attrs = ref<TooltipAttrsProps>({
  justifyContent: '',
  direction: '',
  text: '',
  order: 2,
  marginLeft: 0,
});

const change = (detail: any) => {
  attrs.value = { ...detail, url: 'http://172.18.50.250:3000/upload' };
};
</script>
<style lang="less">
.tooltip-page {
  display: flex;
  box-sizing: border-box;
  align-items: center;
  width: -webkit-fill-available;
  height: 108px;
  // margin: 0 28px;
  // padding: 0 28px;
  overflow: hidden;

  border-radius: 20px;

  background: #fff;

  &-text {
    margin: 0 20px;

    font-size: 28px;
  }
}
</style>
