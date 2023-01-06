<template>
  <div className="radius">
    <TiSlider @change="change" :max="max || 100" :min="min || 0" :value="value" />
  </div>
</template>

<script lang="ts" setup>
import { TiSlider } from 'titian-h5-vue';

const { max, min, value } = defineProps({
  max: Number,
  min: Number,
  value: Number,
});

const emit = defineEmits<{ (event: 'change', e: CustomEvent<HTMLTiSliderElement>): void }>();

const change = (e: CustomEvent) => {
  emit('change', e);
};
</script>

<style lang="less">
.radius {
  flex: 1;
  padding-right: 40px;
  padding-left: 20px;
}
</style>
