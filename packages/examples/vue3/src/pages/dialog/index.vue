<template>
  <CustomPage :options="options" @change="change">
    <div className="wrapper">
      <TiButton @click="onClickForAPI">点击演示 - API 式</TiButton>
      <TiButton @click="onClickForDom">点击演示 - 声明式</TiButton>
    </div>
    <TiDialog
      :title="attrs.title"
      :useContentSlot="attrs.useContentSlot"
      :content="attrs.content"
      :visible="visible"
      :isTextButton="attrs.isTextButton"
      :hasCancelButton="attrs.hasCancelButton"
      @cancel="onCancel1"
      @confirm="onConfirm1"
      @close="onClose1"
    >
      <div v:if="useContentSlot" class="dialog-slot-content">插槽</div>
    </TiDialog>
  </CustomPage>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { TiDialog, $tiDialog, TiButton } from '@titian-design/mobile-vue';
import { OptionType } from '../../components/page.interface';
import CustomPage from '../../components/page.vue';
import { mergeOptionIntoAttrs } from '../../utils/index';

const options: OptionType[] = [
  {
    desc: '内容',
    key: 'content',
    type: 'radio',
    name: 'Content',
    list: [
      { label: '单行', value: 1, property: { content: '弹窗正文单行' } },
      {
        label: '多行',
        value: 2,
        property: {
          title: '弹框标题弹框标题弹框标题弹框标题弹框标题弹框标题',
          content:
            '使用\\n手动换行，限制宽度超出后自动折行。\n文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容文字填充内容',
        },
      },
      { label: '自定义插槽', value: 3, attr: { useContentSlot: true } },
    ],
    value: 1,
  },
  {
    desc: '标题',
    key: 'title',
    type: 'radio',
    name: 'Title',
    list: [
      { label: '无', value: 1, property: { title: '' } },
      { label: '有', value: 2, property: { title: '弹框标题' } },
    ],
    value: 1,
  },
  {
    desc: '按钮类型',
    key: 'isTextButton',
    type: 'radio',
    name: 'IsTextButton',
    list: [
      { label: '实心', value: 1, property: { isTextButton: false } },
      { label: '文字', value: 2, property: { isTextButton: true } },
    ],
    value: 1,
  },
  {
    desc: '取消按钮',
    key: 'num',
    type: 'radio',
    name: 'Number',
    list: [
      { label: '无', value: false, property: { hasCancelButton: false, isTextButton: true } },
      { label: '有', value: true, property: { hasCancelButton: true } },
    ],
    value: true,
  },
];

const attrs = ref<any>({});

const visible = ref<boolean>(false);

const change = (detail: any) => {
  console.log('detail', detail);
  const afterAttr = mergeOptionIntoAttrs(options, detail);

  afterAttr.useContentSlot = !!afterAttr.useContentSlot;

  attrs.value = afterAttr;
};

const onClickForAPI = () => {
  $tiDialog.show({
    ...attrs.value,
    extClass: 'ext-dialog',
    extPopupClass: 'ext-dialog-popup',
    extPopupContentClass: 'ext-dialog-popup-content',
    extPopupMaskClass: 'ext-dialog-popup-mask',
    extInnerClass: 'ext-dialog-inner',
    extContentClass: 'ext-dialog-content',
    extTitleClass: 'ext-dialog-title',
    extActionsClass: 'ext-dialog-actions',
    extActionCancelClass: 'ext-dialog-cancel',
    extActionConfirmClass: 'ext-dialog-confirm',
    onCancel: () => {
      console.log('API 式调用 - dialog onCancel!');
    },
    onConfirm: () => {
      console.log('API 式调用 - dialog onConfirm!');
    },
    onClose: () => {
      console.log('API 式调用 - dialog onClose!');
    },
  });
};

const onClickForDom = () => {
  console.log('声明式调用 - dialog visible = true!');
  visible.value = true;
};

const onConfirm1 = () => {
  console.log('声明式调用 - dialog onConfirm1!');
  visible.value = false;
};

const onCancel1 = () => {
  console.log('声明式调用 - dialog onCancel1!');
  visible.value = false;
};

const onClose1 = () => {
  console.log('声明式调用 - dialog onClose!');
  visible.value = false;
};
</script>
<style>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 30px;
}

.dialog-slot-content {
  background-color: #cecece;
  display: flex;
  height: 150px;
  justify-content: center;
  align-items: center;
  width: 100%;
}
</style>
