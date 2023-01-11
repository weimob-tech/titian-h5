import { IToastStaticOptions, ToastAPIEnum, IToastText } from './const';

let toastFilter = (str?: string) => str;

export function resolveContainer(getContainer: HTMLElement | (() => HTMLElement) | undefined): HTMLElement {
  const container = typeof getContainer === 'function' ? getContainer() : getContainer;
  return container || document.body;
}
type ToastApiProps = Omit<IToastStaticOptions, 'type'> & {
  teleport?: HTMLElement;
  type?: ToastAPIEnum;
  id?: string;
  ref?: HTMLTiToastElement;
};
export function $tiToast(params: ToastApiProps | IToastText) {
  const {
    teleport,
    type = ToastAPIEnum.Info,
    id,
    ref,
    ...other
  } = typeof params === 'object' ? params : ({ text: params, type: ToastAPIEnum.Info } as ToastApiProps);

  let toastDom: HTMLTiToastElement | undefined;
  const bodyContainer = resolveContainer(teleport);
  if (ref) {
    toastDom = ref;
    if (type === ToastAPIEnum.Clear) {
      toastDom.clear();
      return undefined;
    }
  } else if (id) {
    toastDom = bodyContainer.querySelector(`ti-toast[id=${id}]`) as HTMLTiToastElement;
    if (type === ToastAPIEnum.Clear) {
      toastDom.clear();
      return undefined;
    }
  }

  if (!toastDom) {
    toastDom = document.createElement('ti-toast');
    if (id) {
      toastDom.id = id;
    }
    bodyContainer.appendChild(toastDom);
    toastDom.addEventListener('exited', () => {
      (toastDom as HTMLTiToastElement).remove();
    });
  }
  toastDom[type](other);
  function fn(fnParams: IToastStaticOptions) {
    if (toastDom) {
      toastDom.show(fnParams);
    }
  }
  fn.clear = () => {
    if (toastDom) {
      toastDom.clear();
    }
  };

  fn.info = (infoParams: IToastStaticOptions | IToastText) => {
    if (toastDom) {
      toastDom.info(infoParams);
    }
  };
  fn.loading = (loadingParams: IToastStaticOptions | IToastText) => {
    if (toastDom) {
      toastDom.loading(loadingParams);
    }
  };
  fn.warn = (warnParams: IToastStaticOptions | IToastText) => {
    if (toastDom) {
      toastDom.warn(warnParams);
    }
  };
  fn.success = (successParams: IToastStaticOptions | IToastText) => {
    if (toastDom) {
      toastDom.success(successParams);
    }
  };
  fn.fail = (failParams: IToastStaticOptions | IToastText) => {
    if (toastDom) {
      toastDom.fail(failParams);
    }
  };
  return fn;
}
$tiToast.info = (
  params: (IToastStaticOptions & { teleport?: HTMLElement; id?: string; ref?: HTMLTiToastElement }) | IToastText,
) => $tiToast({ ...(typeof params === 'object' ? { ...params } : { text: params }), type: ToastAPIEnum.Info });
$tiToast.loading = (
  params: (IToastStaticOptions & { teleport?: HTMLElement; id?: string; ref?: HTMLTiToastElement }) | IToastText,
) => $tiToast({ ...(typeof params === 'object' ? { ...params } : { text: params }), type: ToastAPIEnum.Loading });
$tiToast.warn = (
  params: (IToastStaticOptions & { teleport?: HTMLElement; id?: string; ref?: HTMLTiToastElement }) | IToastText,
) => {
  $tiToast({ ...(typeof params === 'object' ? { ...params } : { text: params }), type: ToastAPIEnum.Warn });
};
$tiToast.success = (
  params: (IToastStaticOptions & { teleport?: HTMLElement; id?: string; ref?: HTMLTiToastElement }) | IToastText,
) => $tiToast({ ...(typeof params === 'object' ? { ...params } : { text: params }), type: ToastAPIEnum.Success });
$tiToast.fail = (
  params: (IToastStaticOptions & { teleport?: HTMLElement; id?: string; ref?: HTMLTiToastElement }) | IToastText,
) => $tiToast({ ...(typeof params === 'object' ? { ...params } : { text: params }), type: ToastAPIEnum.Fail });

$tiToast.clear = () => {
  document.querySelectorAll('ti-toast').forEach(toast => {
    toast.clear();
  });
};
$tiToast.addFilter = (cb?: (str?: string) => string) => {
  toastFilter = cb || toastFilter;
  return toastFilter;
};

export const $toastFilter = $tiToast.addFilter;
