// import { readTask } from '@stencil/core';

import { raf } from '../common/utils/raf';
import { IDialogStaticOptions } from './types';

export function resolveContainer(getContainer: HTMLElement | (() => HTMLElement) | undefined): HTMLElement {
  const container = typeof getContainer === 'function' ? getContainer() : getContainer;
  return container || document.body;
}
const noop = () => {};
export function $tiDialog(
  params: IDialogStaticOptions & {
    teleport?: HTMLElement;
    id?: string;
    ref?: HTMLTiDialogElement;
  },
) {
  const { teleport, id, ref, ...other } = params;
  let dialogDom: HTMLTiDialogElement;
  const bodyContainer = resolveContainer(teleport);
  if (ref) {
    dialogDom = ref;
  } else if (id) {
    dialogDom = bodyContainer.querySelector(`ti-dialog[id=${id}]`);
  }
  if (!dialogDom) {
    dialogDom = document.createElement('ti-dialog');
    if (id) {
      dialogDom.id = id;
    }
    bodyContainer.appendChild(dialogDom);
    dialogDom.addEventListener('exited', () => {
      dialogDom.remove();
    });
  }
  raf(() => {
    dialogDom.show(other);
  });
  return dialogDom.close.bind(dialogDom);
}

$tiDialog.show = $tiDialog;
$tiDialog.alert = (alertParams: IDialogStaticOptions) =>
  new Promise(resolve => {
    const { onConfirm = noop } = alertParams;
    $tiDialog({
      ...alertParams,
      hasCancelButton: false,
      onConfirm: e => {
        onConfirm(e);
        resolve(e);
      },
    });
  });

$tiDialog.confirm = (confirmParams: IDialogStaticOptions) =>
  new Promise((resolve, reject) => {
    const { onConfirm = noop, onCancel = noop, onClose = noop } = confirmParams;
    $tiDialog({
      ...confirmParams,
      hasCancelButton: true,
      onCancel: e => {
        onCancel(e);
        reject();
      },
      onConfirm: e => {
        onConfirm(e);
        resolve(e);
      },
      onClose: e => {
        onClose(e);
        resolve(e);
      },
    });
  });
$tiDialog.clear = (teleport?: HTMLElement) => {
  const bodyContainer = resolveContainer(teleport);
  bodyContainer.querySelectorAll('ti-dialog').forEach(dialog => {
    dialog.close();
  });
};
