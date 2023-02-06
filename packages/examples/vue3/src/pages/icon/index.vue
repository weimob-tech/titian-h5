<template>
  <CustomPage :options="options" @change="onChange">
    <div class="icon-group" :style="customStyle">
      <template v-for="item in attrs.iconGroup">
        <ti-svg-path-view
          v-if="item === 'close-double'"
          :name="item"
          class="icon-box"
          :fills="JSON.stringify(attrs.color)"
          :rotate="`${attrs.rotate}deg`"
          :spin="attrs.spin"
        />
        <TiIcon
          v-else
          ext-class="icon-box"
          :name="item"
          :size="attrs.size"
          :rotate="`${attrs.rotate}deg`"
          :spin="attrs.spin"
        ></TiIcon>
      </template>
    </div>
  </CustomPage>
</template>
<script lang="ts" setup>
import { ref, computed, CSSProperties } from 'vue';
import { TiIcon } from '@titian-design/mobile-vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';
interface IconAttrsProps {
  color: string | string[];
  size: string;
  spin?: boolean;
  rotate?: string;
  iconGroup: string[];
}
const options: IOptionType[] = [
  {
    type: 'radio',
    desc: '模式',
    key: 'mode',
    name: 'Mode',
    value: 'mono',
    list: [
      {
        label: '单色',
        value: 'mono',
        attr: { iconGroup: ['tabbar-home', 'tabbar-category', 'tabbar-cart', 'tabbar-mine'] },
        hiddenItems: ['color1', 'color2'],
      },
      {
        label: '双色',
        value: 'colors',
        attr: { iconGroup: ['close-double'] },
        hiddenItems: ['color'],
      },
    ],
  },
  {
    type: 'color',
    name: 'color',
    key: 'color',
    desc: '颜色',
    value: '#fa2c19',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color1',
    desc: '颜色1',
    value: '#ffa300',
  },
  {
    type: 'color',
    name: 'color',
    key: 'color2',
    desc: '颜色2',
    value: '#2a6ae9',
  },
  {
    type: 'radius',
    name: 'Size',
    key: 'size',
    desc: '尺寸',
    value: 36,
    min: 20,
    max: 56,
  },
  {
    type: 'radius',
    name: 'Rotate',
    key: 'rotate',
    desc: '旋转',
    value: 0,
    max: 360,
  },
  {
    type: 'radio',
    desc: '旋转动画',
    key: 'spin',
    name: 'Circulate',
    value: false,
    list: [
      {
        label: '关闭',
        value: false,
      },
      {
        label: '开启',
        value: true,
      },
    ],
  },
];
const attrs = ref<IconAttrsProps>({ color: '', size: '', iconGroup: [] });
const onChange = (details: IconAttrsProps) => {
  attrs.value = details;
};
const customStyle = computed(() => {
  return {
    '--icon-color': attrs.value.color,
    '--icon-font-size': attrs.value.size + 'px',
    '--svg-path-view-size': attrs.value.size + 'px',
  } as CSSProperties;
});
</script>
<style lang="scss">
.icon-group {
  display: flex;

  .icon-box {
    margin: 40px;
  }

  .iconfont-icon {
    display: inline-block;
    position: relative;

    font-size: inherit;
    -webkit-font-smoothing: antialiased;
    text-rendering: auto;
  }

  .iconfont-icon-label_top::before {
    content: '\e615';
  }
}
</style>
