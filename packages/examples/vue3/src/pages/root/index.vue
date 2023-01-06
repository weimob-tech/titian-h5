<script setup lang="ts">
import { TiCellGroup, TiCell } from 'titian-h5-vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const { config } = defineProps({
  config: Object,
});

const completedExtClass = (index: number, length: number) => {
  return `cell${index === length - 1 ? ' cell-last' : ''}`;
};

const nav = (path: string) => {
  router.push(path);
};
</script>
<template>
  <div>
    <img
      className="root-bg"
      src="https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/titlepic.png"
      alt="root"
    />
  </div>
  <div className="group-content">
    <div className="group-root" v-for="group in config" :key="group.groupName">
      <TiCellGroup
        :title="group.groupName"
        mode="card"
        extClass="group"
        titleWrapClass="title-wrap"
        groupTitleClass="group-title"
      >
        <TiCell
          v-for="(child, index) in group.children"
          :key="child.title"
          :title="child.title"
          :label="child.subTitle"
          divider="{{false}}"
          rightIconSize="{{24}}"
          @click="nav(child.path)"
          :extClass="completedExtClass(index, group.children.length)"
          titleClass="cell-title"
          labelClass="cell-label"
        >
          {{ child.title }}
        </TiCell>
      </TiCellGroup>
    </div>
  </div>
</template>

<style lang="less">
.root-page {
  box-sizing: border-box;
  height: 100vh;
  overflow: hidden;

  background-color: #fff;
}

.navigation-bar {
  display: flex;
  position: fixed;
  z-index: 10;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 80px;

  border-bottom: 1px solid #f2f2f2;

  background: #fff;

  color: #191919;
  font-size: 34px;
  font-weight: 500;
}

.root-bg {
  width: 100vw;

  vertical-align: middle;
}

.group-root {
  --neutral-color-1: #9e9e9e;
  --cell-group-title-padding-h: 24px;
  --cell-group-title-padding-v: 16px;
  --cell-group-margin-h: 48px;
  --cell-background-color: #f9f9f9;
  --cell-padding-v: 32px;
  --cell-padding-h: 24px;
  --cell-right-icon-color: #c4c4c4;
  --cell-bg-color: #f9f9f9;

  ti-cell-group::part(group-title) {
    color: #9e9e9e !important;
    font-size: 24px !important;
    font-weight: 400 !important;
    line-height: 28px !important;
  }

  ti-cell-group::part(title-wrap) {
    margin-top: 60px;
    margin-bottom: 12px;

    --cell-group-title-padding-v: 16px;
    --cell-group-title-padding-h: 48px;
    --cell-group-margin-h: 48px;
    --cell-bg-color: #f9f9f9;
    --cell-padding-v: 32px;
    --cell-padding-h: 24px;
  }

  ti-cell::part(cell) {
    --neutral-color-1: #212121;
    --cell-label-text-color: #c4c4c4;
    height: 128px;
    margin-bottom: 32px;

    border-radius: 12px;

    &::after {
      display: none;
    }

    &::before {
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
  }

  ti-cell::part(cell-last) {
    margin-bottom: 0;
  }

  ti-cell::part(cell-title) {
    font-weight: 600;
    line-height: 34px;
  }

  ti-cell::part(cell-label) {
    margin-top: 4px;

    font-size: 22px;
    line-height: 26px;
  }
}

.group-content .group-root:last-child {
  margin-bottom: 32px;
}
</style>
