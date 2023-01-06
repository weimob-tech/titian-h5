<template>
  <div class="page" :class="pageClass">
    <div :class="containerClassName">
      <slot />
    </div>

    <div class="menu">
      <div class="inner-menu">
        <div :style="{ height: '25px' }" />
        <div v-for="item in dataSource.options">
          <div class="drawer" v-if="item.show">
            <div class="title">
              <div class="desc">{{ item.desc }}</div>
              <div class="name">{{ item.name }}</div>
            </div>
            <CustomRadio
              v-if="item.type === 'radio'"
              :list="item.list"
              :value="item.value"
              @click="(value: string) => onClick({key:item.key, value})"
            />
            <CustomColor
              v-if="item.type === 'color'"
              :list="item.list"
              :value="item.value"
              @click="(value: string) => onClick({key:item.key, value})"
            />
            <CustomRadius
              v-if="item.type === 'radius'"
              :min="item.min"
              :max="item.max"
              :value="item.value"
              @change="(value: HTMLTiSliderElement) => onChangeRadius({key: item.key, value})"
            />
          </div>
        </div>
        <div class="footer" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import CustomRadio from './radio.vue';
import CustomColor from './color.vue';
import CustomRadius from './radius.vue';
import type { IPageProps, IOptionType } from './page.interface';
import { defineProps, PropType, reactive, ref, watchEffect } from 'vue';
import { formatOption } from './utils';

interface IProps extends IPageProps {}

const emit = defineEmits<{ (event: 'change', attr: any): void }>();
const { options, center } = defineProps({
  options: {
    required: true,
    type: Object as PropType<IProps['options']>,
  },
  change: Function as PropType<IProps['change']>,
  center: {
    type: Boolean,
    default: true,
  },
  pageClass: {
    type: String,
    default: '',
  },
});

const containerClassName = `page-container ${center ? 'center' : ''}`;

const dataSource = reactive<{ options: IOptionType[] }>({
  options: [],
});

interface Params<T = string | number> {
  key: string;
  value: T;
}

const sendEvent = (optionsParams: IOptionType[] = options, eventName: 'change' | 'repeat' = 'change') => {
  const curOption = formatOption(optionsParams);
  const attr = curOption.reduce<Record<string, any>>((prev, curr) => {
    if (!curr.show) return prev;

    prev[curr.key] = curr.value;

    if (curr.attr) {
      prev = { ...prev, ...curr.attr };
    }

    if (curr.type === 'radio') {
      const item = curr.list.find(el => el.value === curr.value);
      const attr = item?.attr;

      if (item && attr) {
        prev = { ...prev, ...attr };
      }
    }
    return prev;
  }, {});
  dataSource.options = curOption;
  emit('change', attr);
};

const onClick = (params: Params) => {
  const { key, value } = params;
  const target = dataSource.options.find(el => el.key === key);
  if (!target) return;

  const val = value === 'true' ? true : value === 'false' ? false : value;

  if (target.value === val) {
    return;
  }
  const curOption = dataSource.options.map(el =>
    el.key === key ? { ...el, value: typeof el.value === 'number' ? Number(val) : val } : el,
  );

  dataSource.options = curOption as IOptionType[];
  sendEvent(dataSource.options);
};

const onChangeRadius = (params: Params<CustomEvent<HTMLTiSliderElement>>) => {
  let { key, value: e } = params;
  const target = dataSource.options.find(el => el.key === key);
  if (!target) return;

  if (e.target instanceof HTMLElement) {
    let {
      detail: { value },
    } = e as CustomEvent<HTMLTiSliderElement>;

    dataSource.options = dataSource.options.map(el => (el.key === key ? { ...el, value } : el)) as IOptionType[];

    sendEvent(dataSource.options);
  }
};

watchEffect(() => {
  if (options) {
    const formatedOption = formatOption(options);
    dataSource.options = formatedOption;
    sendEvent(formatedOption);
  }
});
</script>

<style lang="less">
.page {
  width: 100vw;
  min-height: 100vh;

  background-color: #f9f9f9;
}

.page-container {
  position: relative;
  height: 40vh;
}

.page-container.center {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(40vh + 44px);
  margin-top: -44px;
}

.page-container:empty {
  display: none;
}

.menu {
  position: relative;
  box-sizing: border-box;
  height: 60vh;
  padding-top: 10px;
  overflow: hidden;

  border-radius: 32px 32px 0 0;

  background: #fff;
  box-shadow: 0 -8px 40px 0 rgba(0, 0, 0, 6%);
}

.inner-menu {
  height: 100%;
  overflow-y: auto;
}

.menu::before {
  content: '';

  position: absolute;
  z-index: 1;
  top: 0;
  right: 40px;
  left: 40px;
  height: 50px;

  background: linear-gradient(0deg, rgba(255, 255, 255, 0%) 0%, #fff 100%);
}

.menu::after {
  content: '';

  position: absolute;
  z-index: 1;
  right: 40px;
  bottom: 0;
  left: 40px;
  height: 68px;

  background: linear-gradient(180deg, rgba(255, 255, 255, 0%) 0%, #fff 100%);
}

.footer {
  height: 34px;
  padding-bottom: constant(safe-area-inset-bottom);
  /* 兼容 iOS < 11.2 */
  padding-bottom: env(safe-area-inset-bottom);
  /* 兼容 iOS >= 11.2 */
}

.page-container:empty + .menu::before {
  content: none;
}

.page-container:empty + .menu::after {
  content: none;
}

.page-container:empty + .menu .footer {
  height: 28px;
  padding-bottom: 0;
}

.drawer {
  display: flex;
  position: relative;
  z-index: 0;
  box-sizing: border-box;
  align-items: center;
  height: 134px;
  margin: 0 48px 20px;
  overflow: hidden;

  border-radius: 12px;

  background: #f9f9f9;
}

.page-container:empty + .menu {
  height: auto;
  padding-top: 0;

  border-radius: 0;

  box-shadow: none;
}

/* .drawer.first {
    margin-top: 50px;
  }
  .drawer.last {
    margin-bottom: 100px;
  } */
.drawer::before {
  content: '';

  position: absolute;
  top: 0;
  left: 0;
  box-sizing: border-box;
  width: 200%;
  height: 200%;

  transform: scale(0.5);
  transform-origin: left top;

  border: 2px solid #f2f2f2;
  border-radius: 24px;
}

.title {
  box-sizing: border-box;
  width: 160px;
  padding-left: 32px;
}

.desc {
  color: #212121;
  font-size: 26px;
  font-weight: 500;
  line-height: 30px;
}

.name {
  margin-top: 6px;

  color: #c4c4c4;
  font-size: 20px;
  line-height: 24px;
}

.operation {
  flex: 1;
}
</style>
