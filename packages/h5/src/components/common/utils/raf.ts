export interface RAF {
  (callback: () => void, times?: number): number;
  cancel: (pid?: number, callback?: () => void) => void;
}

// eslint-disable-next-line
export let raf: RAF;
let raf$0;
type IDSMap = Map<number, number>;

{
  let _raf = (callback: FrameRequestCallback) => +setTimeout(callback, 1000 / 60);
  let caf = (num: number) => clearTimeout(num);

  if (typeof window !== 'undefined' && 'requestAnimationFrame' in window) {
    _raf = (callback: FrameRequestCallback) => window.requestAnimationFrame(callback);
    caf = (handle: number) => window.cancelAnimationFrame(handle);
  }

  let rafUUID = 0;

  const rafIds: IDSMap = new Map();

  function cleanup(id: number) {
    rafIds.delete(id);
  }

  function wrapperRaf(callback: () => void, times = 1): number {
    rafUUID += 1;
    const id = rafUUID;

    function callRef(leftTimes: number) {
      if (leftTimes === 0) {
        cleanup(id);
        callback();
      } else {
        const realId = _raf(() => {
          callRef(leftTimes - 1);
        });
        rafIds.set(id, realId);
      }
    }

    callRef(times);
    return id;
  }

  wrapperRaf.cancel = (id: number) => {
    const readId = rafIds.get(id);
    cleanup(id);
    return caf(readId);
  };
  raf$0 = wrapperRaf;
}

{
  let id = 0;
  const ids: Record<number, number> = {};

  function wrapperRaf(callback: () => void, delayFrames = 1): number {
    id += 1;
    const _id: number = id;
    let restFrams: number = delayFrames;

    function fn() {
      restFrams -= 1;

      if (restFrams <= 0) {
        callback();
        delete ids[_id];
      } else {
        ids[_id] = raf$0(fn);
      }
    }

    ids[_id] = raf$0(fn);
    return _id;
  }

  wrapperRaf.cancel = function cancel(pid?: number, callback?: () => void) {
    if (pid === undefined) return;
    raf$0.cancel(ids[pid]);
    delete ids[pid];
    if (typeof callback === 'function') {
      callback();
    }
  };

  raf = wrapperRaf;
}

interface Throttled<T extends unknown[]> {
  (args: T): void;

  cancel: () => void;
}

export function throttleByAnimationFrame<T extends unknown[]>(
  fn: (...args: T) => void,
  times = 1,
): Record<string, any> {
  let requestId: number | null;

  const later = args => () => {
    requestId = null;
    fn(...args);
  };

  const throttled: Throttled<T> = (...args) => {
    if (requestId == null) {
      requestId = raf(later(args), times);
    }
  };

  throttled.cancel = () => {
    raf.cancel(requestId);
  };

  return throttled;
}

export function throttleByAnimationFrameDecorator(times = 1) {
  return function throttle(target: any, key: string, descriptor: any) {
    const fn = descriptor.value;
    let definingProperty = false;

    return {
      configurable: true,
      get() {
        // eslint-disable-next-line no-prototype-builtins
        if (definingProperty || this === target.prototype || this.hasOwnProperty(key)) {
          return fn;
        }

        const boundFn = throttleByAnimationFrame(fn.bind(this), times);

        definingProperty = true;
        Object.defineProperty(this, key, {
          value: boundFn,
          configurable: true,
          writable: true,
        });
        definingProperty = false;
        return boundFn;
      },
    };
  };
}
