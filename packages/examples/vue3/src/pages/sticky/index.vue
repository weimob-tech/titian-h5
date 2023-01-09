<template>
  <div>
    <CustomPage :options="options" @change="change">
      <div v-if="flag && attrs.container" ref="containerRef" :class="attrs.containerClass">
        <TiSticky :offset-top="attrs.offsetTop" @container="attrs.container">
          <TiButton>{{ attrs.text }}</TiButton>
        </TiSticky>
      </div>
      <TiSticky v-if="flag && !attrs.container" use-pure-css :offset-top="attrs.offsetTop">
        <TiButton>{{ attrs.text }}</TiButton>
      </TiSticky>
      <div className="tip">- 上滑展示区页面，显示吸顶效果 -</div>
    </CustomPage>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiSticky, TiStickyProps, TiButton } from '@titian-design/vue';
import CustomPage from '../../components/page.vue';
import { IOptionType } from '../../components/page.interface';

const options: IOptionType[] = [
  {
    type: 'radio',
    name: 'Mode',
    key: 'mode',
    desc: '模式 ',
    value: 'basic',
    list: [
      { value: 'basic', label: '基础吸顶', attr: { text: '基础吸顶', offsetTop: 0 } },
      { value: 'offset', label: '吸顶距离', attr: { text: '吸顶距离', offsetTop: 10 } },
      {
        value: 'container',
        label: '指定容器',
        attr: { text: '指定容器', containerClass: 'sticky-container', offsetTop: 0 },
      },
    ],
  },
];

interface Attrs extends TiStickyProps {
  containerClass?: string;
  mode?: string;
  text?: string;
}
const attrs = ref<Attrs>({});
const flag = ref<boolean>(false);
const containerRef = ref(null);

const change = (e: Attrs) => {
  const detail = { top: 0, text: '按钮', ...e };
  if (e.mode === 'container') {
    detail.container = containerRef.value as unknown as TiStickyProps['container'];
  } else {
    detail.container = undefined;
  }
  flag.value = false;
  requestAnimationFrame(() => {
    flag.value = true;
    attrs.value = detail;
  });
};
</script>
<style>
.sticky-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: calc(100% - 56px);
  height: 20vh;
  margin: 0 28px;
  overflow: hidden;
  border-radius: unset;
  background: #fff;
}

.placeholder {
  height: 40vh;
}

.page-container {
  flex-direction: column;
}

.tip {
  position: absolute;
  bottom: 100px;
  color: #9e9e9e;
  font-size: 20px;
  text-align: center;
}
</style>
