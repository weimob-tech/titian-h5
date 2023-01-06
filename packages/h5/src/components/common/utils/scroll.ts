import { raf } from './raf';
import { easeInOutCubic } from './index';

interface ScrollToOptions {
  getContainer?: () => HTMLElement | Window | Document;
  callback?: () => unknown;
  duration?: number;
}

function isWindow(obj: any) {
  return obj !== null && obj !== undefined && obj === obj.window;
}

export function getScroll(target: HTMLElement | Window | Document | null, top: boolean): number {
  const method = top ? 'scrollTop' : 'scrollLeft';
  let result = 0;
  if (isWindow(target)) {
    result = (target as Window)[top ? 'pageYOffset' : 'pageXOffset'];
  } else if (target instanceof Document) {
    result = target.documentElement[method];
  } else if (target) {
    result = (target as HTMLElement)[method];
  }

  if (target && !isWindow(target) && typeof result !== 'number') {
    result = ((target as HTMLElement).ownerDocument || (target as Document)).documentElement?.[method];
  }
  return result;
}

export function scrollTo(y: number, options: ScrollToOptions = {}) {
  const { getContainer = () => window, callback, duration = 450 } = options;

  const container = getContainer();
  const scrollTop = getScroll(container, true);
  const startTime = Date.now();

  const func = () => {
    const timestamp = Date.now();
    const time = timestamp - startTime;
    const nexScrollTop = easeInOutCubic(time > duration ? duration : time, scrollTop, y, duration);

    if (isWindow(container)) {
      (container as Window).scrollTo(window.pageXOffset, nexScrollTop);
    } else if (container instanceof Document || container.constructor.name === 'HTMLDocument') {
      (container as Document).documentElement.scrollTop = nexScrollTop;
    } else {
      (container as HTMLElement).scrollTop = nexScrollTop;
    }

    if (time < duration) {
      raf(func);
    } else if (typeof callback === 'function') {
      callback();
    }
  };

  raf(func);
}
