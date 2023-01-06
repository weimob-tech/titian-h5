//@ts-nocheck
import { $tiDialog, TiButton, TiDialog } from 'titian-h5-react';
import Page, { OptionType } from '../../components/page';
import { useState, useCallback } from 'react';
import { mergeOptionIntoAttrs } from '../../util/index';
import './index.less';

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
            '弹窗正文单行\n限制宽度超出后折弹窗正文单行限制宽度超出后折弹窗正文单行限制宽度超出后折弹窗正文单行限制宽度超出后折弹窗正文单行限制宽度超出后折弹窗正文单行限制宽度超出后折',
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

const Dialog = () => {
  const [attr, setAttr] = useState<any>({});
  const change = useCallback((detail: any) => {
    const attr = detail;

    const afterAttr = mergeOptionIntoAttrs(options, attr);

    afterAttr.useContentSlot = !!afterAttr.useContentSlot;
    setAttr(afterAttr);
  }, []);

  const onClickForAPI = () => {
    $tiDialog.show({
      ...attr,
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

  const [visible, setVisible] = useState(false);

  const onClickForDom = () => {
    console.log('声明式调用 - dialog visible true!');

    setVisible(true);
  };

  const onConfirm1 = () => {
    console.log('声明式调用 - dialog onConfirm1!');
    setVisible(false);
  };

  const onCancel1 = () => {
    console.log('声明式调用 - dialog onCancel1!');
    setVisible(false);
  };

  const onClose1 = () => {
    console.log('声明式调用 - dialog onClose!');
    setVisible(false);
  };

  return (
    <>
      <Page options={options} change={change}>
        <div className="wrapper">
          <TiButton onClick={onClickForAPI}>点击演示 - API 式</TiButton>
          <TiButton onClick={onClickForDom}>点击演示 - 声明式</TiButton>
        </div>

        <TiDialog {...attr} visible={visible} onCancel={onCancel1} onConfirm={onConfirm1} onClose={onClose1}></TiDialog>
      </Page>
    </>
  );
};
export default Dialog;
