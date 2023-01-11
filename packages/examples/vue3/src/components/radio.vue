<template>
  <div class="radio-box">
    <div class="inner-radio-box">
      <div
        v-for="(item, index) in list"
        :key="index"
        :id="genId(index)"
        @data-value="item.value"
        :class="genClassname(item, value)"
        @click="emit('click', item.value as string)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, PropType } from 'vue';
import { IRadioItem } from './page.interface';

const emit = defineEmits<{ (event: 'click', value: string): void }>();

const { list, value } = defineProps({
  id: String,
  list: Array as PropType<IRadioItem[]>,
  value: String as PropType<string | number | unknown>,
});
const genId = (index: number) => `item-${index}`;
const genClassname = (radio: IRadioItem, value?: string | unknown) => `radio ${value === radio.value ? 'checked' : ''}`;
</script>

<style lang="less">
.radio-box {
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  width: calc(100vw - 246px);
}

.inner-radio-box {
  width: 100%;
  overflow-x: auto;

  white-space: nowrap;

  &::-webkit-scrollbar {
    display: none;
  }
}

.radio-box::before {
  content: '';

  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: 0;
  width: 20px;

  background: linear-gradient(-90deg, rgba(250, 250, 250, 0%) 0%, #fafafa 100%);
}

.radio-box::after {
  content: '';

  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  width: 20px;

  background: linear-gradient(90deg, rgba(250, 250, 250, 0%) 0%, #fafafa 100%);
}

.radio {
  display: inline-flex;
  box-sizing: border-box;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 60px;
  padding: 0 24px;

  border-radius: 8px;

  background: #fff;
  box-shadow: 0 4px 10px 0 rgba(0, 0, 0, 2%);

  color: #9e9e9e;
  font-size: 24px;
  line-height: normal;
}

.radio:first-child {
  margin-left: 20px;
}

.radio:last-child {
  margin-right: 20px;
}

.radio + .radio {
  margin-left: 12px;
}

.radio.checked {
  color: #111;
  font-weight: 500;
}
</style>
