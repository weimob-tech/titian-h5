import { getTitianMode } from '../../../global/global';
import { IAnyObject, OmitType } from '../interface/index';

export * from './number';

export const objectToString = Object.prototype.toString;

export const toTypeString = (val: unknown): string => objectToString.call(val);

export type Key = string | number | symbol;

export const isString = (obj: unknown): obj is string => toTypeString(obj) === '[object String]';

export const isPlainObject = (obj: unknown): obj is { [key: Key]: unknown } => toTypeString(obj) === '[object Object]';

export const isPlainArray = (obj: unknown): obj is unknown[] => toTypeString(obj) === '[object Array]';

export const isPlainRegExp = (obj: unknown): obj is RegExp => toTypeString(obj) === '[object RegExp]';

export const isBoolean = (obj: unknown): obj is boolean => toTypeString(obj) === '[object Boolean]';

export const isFunction = (obj: unknown): obj is (...agrn: unknown[]) => unknown => typeof obj === 'function';

export const isArrayEqual = (arr1: unknown[], arr2: unknown[]): boolean => {
  if (arr1.length !== arr2.length) {
    return false;
  }

  return arr1.every((item, index) => item === arr2[index]);
};

export function debounce(fn: (...agrn: unknown[]) => unknown, ms = 300) {
  let timeoutId: ReturnType<typeof setTimeout>;
  return function debounceFn(this: unknown, ...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), ms);
  };
}

export function throttle(fn: (...agrn: unknown[]) => unknown, ms = 300) {
  let inThrottle: boolean;
  let lastFn: ReturnType<typeof setTimeout>;
  let lastTime: number;
  return function r(this: unknown, ...args: unknown[]) {
    if (!inThrottle) {
      fn.apply(this, args);
      lastTime = Date.now();
      inThrottle = true;
    } else {
      clearTimeout(lastFn);
      lastFn = setTimeout(() => {
        if (Date.now() - lastTime >= ms) {
          fn.apply(this, args);
          lastTime = Date.now();
        }
      }, Math.max(ms - (Date.now() - lastTime), 0));
    }
  };
}

export const randomString = () => Math.random().toString(36).slice(2);

export function filterInvalidData<T extends IAnyObject>(obj: T): OmitType<T, null | undefined> {
  const params = { ...obj };
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'undefined' || value === null) {
      delete params[key];
    }
  });
  return params;
}

export const DISABLED = 'disabled';

export function isDisabled(params: unknown): boolean {
  if (typeof params !== 'object' || !params) {
    return false;
  }
  return (params as IAnyObject)[DISABLED] as boolean;
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function padZero(val: string | number, number = 2) {
  return `${val}`.padStart(number, '0');
}

export function isValidDate(d: unknown): d is Date {
  return d !== undefined && d !== null && !Number.isNaN(new Date(d as Date).getTime());
}

export function getDate(): Date;
export function getDate(date: string | number | Date): Date;
export function getDate(year: number, month: number): Date;
export function getDate(year: number, month: number, day: number): Date;
export function getDate(date?: string | number | Date, month?: number, day?: number) {
  let cur: Date;
  if (typeof date === 'undefined') {
    return new Date();
  }
  if (typeof date === 'number' && typeof month === 'number' && typeof day === 'number') {
    cur = new Date(date, month, day);
  } else if (typeof date === 'number' && typeof month === 'number') {
    cur = new Date(date, month);
  } else {
    cur = new Date(date);
  }
  if (!cur) {
    throw new Error('时间格式错误');
  }
  if (cur.toString() === 'Invalid Date') {
    throw new Error('时间格式错误');
  }
  return cur;
}

export function isUndefined(val: unknown) {
  return toTypeString(val) === '[object Undefined]';
}

// eslint-disable-next-line @titian-design/no-more-args
export function easeInOutCubic(t: number, b: number, c: number, d: number) {
  const cc = c - b;
  t /= d / 2;
  if (t < 1) {
    return (cc / 2) * t * t * t + b;
  }
  return (cc / 2) * ((t -= 2) * t * t + 2) + b;
}

// eslint-disable-next-line @titian-design/no-more-args
export function addEventListener<K extends Element>(
  target: K,
  eventType: string,
  cb: (arg: any) => any,
  options?: boolean | AddEventListenerOptions,
): () => void {
  if (target.addEventListener) {
    target.addEventListener(eventType, cb, options);
    document.addEventListener(eventType, cb, options);
  }

  return () => {
    if (target.removeEventListener) {
      target.removeEventListener(eventType, cb, options);
    }
  };
}

export const attrStyleToString = (attr: unknown) => {
  if (!attr) {
    return '';
  }
  if (typeof attr === 'string') {
    return attr;
  }
  if (Array.isArray(attr)) {
    return attr.join(';');
  }
  if (Object.keys(attr as { [key: string]: unknown }).length > 0) {
    return Object.keys(attr as { [key: string]: unknown })
      .reduce((array, key) => {
        array.push(`${key}:${(attr as { [key: string]: unknown })[key]}`);
        return array;
      }, [] as string[])
      .join(';');
  }

  return '';
};

export const stringToAttrStyle = (attrStr: unknown): { [key: string]: string } => {
  if (!attrStr) {
    return {};
  }
  if (isPlainObject(attrStr)) {
    return attrStr as { [key: string]: string };
  }
  if (!isString(attrStr)) {
    return {};
  }
  try {
    attrStr = JSON.parse(attrStr);
    // eslint-disable-next-line no-empty
  } catch (e) {}
  if (isPlainObject(attrStr)) {
    return attrStr as { [key: string]: string };
  }
  if (!isString(attrStr)) {
    return {};
  }
  return attrStr
    .trim()
    .split(';')
    .filter(Boolean)
    .reduce((pre, cur) => {
      const [key, value] = cur.split(':');
      const nkey = key.trim();
      pre[nkey] = value;
      return pre;
    }, {} as { [key: string]: string });
};

export const getResponsivePixel = (px: number) => {
  const mode = getTitianMode();
  if (mode === 'pc') {
    return px / 2;
  }
  return (document.documentElement.clientWidth / 750) * px;
};

export function getStyle<T extends HTMLElement>(element: T, attrName: keyof CSSStyleDeclaration) {
  let ret = element.style[attrName];
  if (ret) {
    return ret;
  }

  const getComputedStyle = document?.defaultView?.getComputedStyle;

  if (getComputedStyle) {
    ret = getComputedStyle(element, null)[attrName];
  }
  return ret;
}

export function setStyle(
  dom: HTMLElement,
  style: Partial<{ [key in keyof CSSStyleDeclaration]: CSSStyleDeclaration[key] | null }>,
) {
  (Object.keys(style) as (keyof CSSStyleDeclaration)[]).forEach(key => {
    if (style[key] === null) {
      dom.style.removeProperty(key as string);
    } else {
      dom.style.setProperty(key as string, style[key] as string);
    }
  });
}
export function hasClass(target: Element, className: string) {
  return target.className.indexOf(className) > -1;
}
export function addClass(target: Element, className: string) {
  return target.classList.add(className);
}
export function removeClass(target: Element, className: string) {
  return target.classList.remove(className);
}
export function toggleClass(target: Element, className: string) {
  return target.classList.toggle(className);
}
export function isCustomEvent(event: CustomEvent | Event): event is CustomEvent {
  return !event.isTrusted;
}

//  end 向后 无法查找 则  start end 之间
export function nextAvailable<T>(params: {
  start: number;
  end: number;
  list: T[];
  fn?: (list: T[], num: number) => boolean;
}) {
  const { start, end, list, fn } = params;
  let num = end;
  while (num < list.length) {
    num += 1;
    if (typeof list[num] !== undefined) {
      if (typeof fn === 'function' && fn(list, num)) {
        return num;
      }
    }
  }
  num = end;
  while (num > start) {
    num -= 1;
    if (typeof list[num] !== undefined) {
      if (typeof fn === 'function' && fn(list, num)) {
        return num;
      }
    }
  }
  return -1;
}

//  end 向前 无法查找 则 start end 之间
export function prevAvailable<T>(params: {
  start: number;
  end: number;
  list: T[];
  fn?: (list: T[], num: number) => boolean;
}) {
  const { start, list, end, fn } = params;
  let num = end;
  // 节点向前
  while (num > 0) {
    num -= 1;
    if (typeof list[num] !== undefined) {
      if (typeof fn === 'function' && fn(list, num)) {
        return num;
      }
    }
  }
  num = end;
  while (num < start) {
    num += 1;
    if (typeof list[num] !== undefined) {
      if (typeof fn === 'function' && fn(list, num)) {
        return num;
      }
    }
  }
  return -1;
}

export function addShadowRootStyle() {
  if (!this.extCss || !this.host || !this.host.shadowRoot) return;
  const style = this.host.shadowRoot.querySelector('style') || document.createElement('style');
  style.innerHTML = this.extCss;
  this.host.shadowRoot.appendChild(style);
}

export function pxToVW(str) {
  const mode = getTitianMode();

  if (mode === 'pc') return str;

  const res = (Number(str.replace('px', '')) * 100) / 750;
  function toFixedFn(value, n) {
    return Math.round(value * 10 ** n) / 10 ** n;
  }
  return `${toFixedFn(res, 5)}vw`;
}

export function validateEvent(event, shadowRoot) {
  const root = event.target.getRootNode();
  if (root === shadowRoot) {
    return true;
  }
  const slot = event.path.find(element => element.tagName === 'SLOT');
  const [node] = slot.assignedNodes();
  if (node && node.hasAttribute('slot')) {
    const stop = node.getAttribute('stopPropagation') || node.getAttribute('stop-propagation');
    if (typeof stop === 'boolean' && stop) {
      return false;
    }
    if (typeof stop === 'string' && (stop === 'true' || stop === '')) {
      return false;
    }
  }
  return true;
}

export function checkSlotIsUsed(host) {
  const slot = host.shadowRoot?.querySelector('slot')?.assignedNodes({ flatten: true });
  if (!slot || slot.length === 0) return false;
  if (slot && slot.length === 1) {
    if (slot[0].nodeName === '#text' && slot[0].textContent === '') {
      return false;
    }
  }
  return true;
}
