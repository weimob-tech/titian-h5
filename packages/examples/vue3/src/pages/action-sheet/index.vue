<template>
  <div>
    <CustomPage
      :options="options"
      @change="
        {
        }
      "
    >
      <TiButton @Click="toggleShow">点击演示</TiButton>
    </CustomPage>
    <TiActionSheet
      :visible="visible"
      :title="attrs.title"
      :actions="actions"
      :cancelText="attrs.cancelText"
      :onClose="toggleShow"
    ></TiActionSheet>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { TiActionSheet, TiActionSheetProps, TiButton } from '@titian-design/mobile-vue';
import { IOptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';
const options: IOptionType[] = [
  {
    key: 'title',
    type: 'radio',
    name: 'Title',
    desc: '标题',
    list: [
      { label: '无', value: '' },
      { label: '有', value: '标题信息' },
    ],
    value: '',
  },
  {
    key: 'cancel',
    type: 'radio',
    name: 'Cancel',
    desc: '取消按钮',
    list: [
      { label: '无', value: false },
      { label: '有', value: true, attr: { cancelText: '取消' } },
    ],
    value: true,
  },
  {
    key: 'loading',
    type: 'radio',
    name: 'Loading',
    desc: '加载',
    list: [
      { label: '无', value: false },
      { label: '有', value: true },
    ],
    value: false,
  },
];
interface Attrs extends TiActionSheetProps {
  color?: string;
}
const attrs = ref<Attrs>({});
const visible = ref(false);
const actions = ref([{ name: '选项1', disabled: true }, { name: '选项2' }, { name: '选项3', icon: 'delete' }]);
const toggleShow = () => {
  visible.value = !visible.value;
};
const onChange = (params: any) => {
  attrs.value = params;
  const newActions = (actions || []).map((item: any, idx: number) => {
    if (idx === 2) {
      return { ...item, loading: params.loading as boolean };
    }
    return { ...item };
  });
  actions.value = newActions;
};
</script>
