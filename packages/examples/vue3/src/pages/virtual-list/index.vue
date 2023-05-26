<template>
  <TiVirtualList ref="virtualListRef" @load="load"></TiVirtualList>
</template>
<script lang="ts" setup>
import { ref, onMounted, ComponentPublicInstance, watchEffect } from 'vue';
import { TiVirtualList } from '@titian-design/mobile-vue';

const virtualListRef = ref<ComponentPublicInstance<HTMLTiVirtualListElement> | null>(null);
const data = ref<number[]>([]);

const load = () => {
  data.value = data.value.concat(
    Array(10)
      .fill(0)
      .map((_, idx) => (data.value[data.value.length - 1] || 0) + idx + 1),
  );
};

watchEffect(() => {
  virtualListRef.value?.$el.setListData(data.value);
});

onMounted(() => {
  virtualListRef.value?.$el.setRenderItem(
    (item: number | string) => `<div style="height: 50px; width: 100%;">${item}</div>`,
  );
});
</script>
