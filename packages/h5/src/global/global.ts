import { getMode, setMode } from '@stencil/core';
import { isPlatform } from '../components/common/utils/platform';
import { Mode } from '../interface';
// packages/h5/src/components/common/utils/platform.ts

let defaultMode: Mode = 'h5';

export const getTitianMode = (ref?: any): Mode => (ref && getMode(ref)) || defaultMode;

// declare const Context: any;

let config = new Map();

if (typeof (window as any) !== 'undefined') {
  setMode(() => defaultMode);
}

export const initialize = (userConfig: any) => {
  if (typeof (window as any) === 'undefined') {
    return;
  }

  const doc = window.document;
  const win = window;
  config = new Map(Object.entries({ ...config, ...userConfig }));
  // eslint-disable-next-line no-multi-assign
  const Titian = ((win as any).Titian = (win as any).Titian || {});

  defaultMode =
    config.get('mode') || doc.documentElement.getAttribute('mode') || (isPlatform(win, 'mobile') ? 'h5' : 'pc');
  Titian.mode = defaultMode;

  config.set('mode', defaultMode);
  doc.documentElement.setAttribute('mode', defaultMode);
  doc.documentElement.classList.add(defaultMode);

  const isTitianElement = (elm: any) => elm.tagName?.startsWith('ti-');

  const isAllowedTitianModeValue = (elmMode: string) => ['h5', 'pc'].includes(elmMode);

  setMode((elm: any) => {
    while (elm) {
      const elmMode = (elm as any).mode || elm.getAttribute('mode');
      if (elmMode) {
        if (isAllowedTitianModeValue(elmMode)) {
          return elmMode;
        }
        if (isTitianElement(elm)) {
          console.warn(`Invalid titian mode: "${elmMode}", expected: "h5" or "pc"`);
        }
      }
      elm = elm.parentElement;
    }
    return defaultMode;
  });
};
