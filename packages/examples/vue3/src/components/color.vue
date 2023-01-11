<template>
  <div className="colors">
    <div
      v-for="(color, index) in colors"
      :key="index"
      :className="genClassname(color, value)"
      :style="{ color: color.value, background: color.value }"
      @click="emit('click', color.value)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, PropType, defineEmits } from 'vue';
import { IColorListItem } from './page.interface';

const emit = defineEmits<{ (event: 'click', value: string): void }>();

const { list, value } = defineProps({
  id: String,
  list: Array as PropType<IColorListItem[]>,
  value: String,
});

const colors: IColorListItem[] = list || [
  { label: 'red', value: '#fa2c19' },
  { label: 'orange', value: '#ffa300' },
  { label: 'green', value: '#07c160' },
  { label: 'blue', value: '#2a6ae9' },
  { label: 'grey', value: '#9e9e9e' },
];

const genClassname = (color: IColorListItem, value?: string) => `color ${value === color.value ? 'checked' : ''}`;
</script>

<style lang="less">
.colors {
  display: flex;
  flex: 1;
  align-items: center;
  padding-left: 50px;
}

.color {
  position: relative;
  width: 36px;
  height: 36px;

  border: 2px solid #f2f2f2;
  border-radius: 100%;
}

.color + .color {
  margin-left: 51px;
}

.color.checked {
  border-color: inherit;
}

.color.checked::before {
  content: '';

  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  border: 3px solid #fff;
  border-radius: 100%;
}
</style>
