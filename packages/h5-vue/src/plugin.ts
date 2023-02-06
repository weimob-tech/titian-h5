import { applyPolyfills, defineCustomElements } from '@titian-design/h5/loader';
import type { Plugin } from 'vue';

const convertEventName = eventName => {
  eventName = eventName.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`);
  return eventName;
};

export const TitianUI: Plugin = {
  async install() {
    applyPolyfills().then(() => {
      defineCustomElements(window, {
        ael: (el: any, eventName: string, cb: any, opts: any) =>
          el.addEventListener(convertEventName(eventName), cb, opts),
        rel: (el: any, eventName: string, cb: any, opts: any) =>
          el.removeEventListener(convertEventName(eventName), cb, opts),
        ce: (eventName: string, opts: any) => new CustomEvent(convertEventName(eventName), opts),
      } as any);
    });
  },
};
