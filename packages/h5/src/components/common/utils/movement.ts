/**
 * touchmove 行为
 * 1.
 */
type Point = {
  x: number;
  y: number;
};
export default class Movement {
  touch: boolean;

  touchMove: boolean;

  box: Element;

  // 起点坐标
  start: Point;

  // 终点坐标
  end: Point;

  // 移动坐标
  move: Point;

  // 是否是垂直方向
  vertical: boolean;

  #startEvent: (fn: any, event: TouchEvent) => void;

  #moveEvent: (fn: any, event: TouchEvent) => void;

  #endEvent: (fn: any, event: TouchEvent) => void;

  #cancelEvent: (fn: any, event: TouchEvent) => void;

  constructor({
    box,
    vertical,
    touchstart,
    touchmove,
    touchend,
    touchcancel,
    options = { passive: true },
  }: {
    box: Element;
    vertical: boolean;
    touchstart?: (...agrn: unknown[]) => void;
    touchmove?: (...agrn: unknown[]) => void;
    touchend?: (...agrn: unknown[]) => void;
    touchcancel?: (...agrn: unknown[]) => void;

    options?: boolean | AddEventListenerOptions;
  }) {
    this.box = box;
    global.box = box;
    this.#startEvent = this.#touchstart.bind(this, touchstart);
    this.#moveEvent = this.#touchmove.bind(this, touchmove);
    this.#endEvent = this.#touchend.bind(this, touchend);
    this.#cancelEvent = this.#touchcancel.bind(this, touchcancel);

    this.box.addEventListener('touchstart', this.#startEvent as EventListenerOrEventListenerObject, options);
    this.box.addEventListener('touchmove', this.#moveEvent as EventListenerOrEventListenerObject, options);
    this.box.addEventListener('touchend', this.#endEvent as EventListenerOrEventListenerObject, options);
    this.box.addEventListener('touchcancel', this.#cancelEvent as EventListenerOrEventListenerObject, options);

    this.touch = false;
    this.vertical = vertical;
  }

  destroy() {
    this.box.removeEventListener('touchstart', this.#startEvent as EventListenerOrEventListenerObject);
    this.box.removeEventListener('touchmove', this.#moveEvent as EventListenerOrEventListenerObject);
    this.box.removeEventListener('touchend', this.#endEvent as EventListenerOrEventListenerObject);
    this.box.removeEventListener('touchcancel', this.#cancelEvent as EventListenerOrEventListenerObject);
  }

  changeVertical(vertical) {
    this.vertical = vertical;
  }

  #touchstart(fn, event: TouchEvent) {
    this.touch = true;
    const { clientX, clientY } = event.touches[0];

    this.start = { x: clientX, y: clientY };

    if (typeof fn === 'function') {
      fn(event);
    }
  }

  #touchmove(fn, event: TouchEvent) {
    if (!this.touch) {
      return;
    }
    this.touchMove = true;
    const { clientX, clientY } = event.touches[0];
    this.end = { x: clientX, y: clientY };
    this.move = { x: clientX - this.start.x, y: clientY - this.start.y };
    if (!this.isCorrectDirection()) {
      return;
    }
    if (typeof fn === 'function') {
      fn(event);
    }
  }

  #touchcancel(fn, event: TouchEvent) {
    if (!this.touch || !this.touchMove) {
      return;
    }
    this.touchMove = false;
    this.touch = false;
    if (!this.isCorrectDirection()) {
      if (typeof fn === 'function') {
        fn(event, false);
      }
      return;
    }

    if (typeof fn === 'function') {
      fn(event, true);
    }
  }

  #touchend(fn, event: TouchEvent) {
    if (!this.touch || !this.touchMove) {
      return;
    }
    this.touchMove = false;
    this.touch = false;
    if (!this.isCorrectDirection()) {
      if (typeof fn === 'function') {
        fn(event, false);
      }
      return;
    }

    if (typeof fn === 'function') {
      fn(event, true);
    }
  }

  isCorrectDirection() {
    // 垂直方向 y >= x
    if (Math.abs(this.move.x) <= Math.abs(this.move.y) && this.vertical) {
      return true;
    }
    // 水平方向 x >= y
    if (Math.abs(this.move.x) > Math.abs(this.move.y) && !this.vertical) {
      return true;
    }
    return false;
  }

  // 手势向右移动
  isRight() {
    return this.move.x > 0;
  }

  // 手势向左移动
  isLeft() {
    return this.move.x < 0;
  }

  // 手势向下移动
  isBottom() {
    return this.move.y > 0;
  }

  // 手势向上移动
  isTop() {
    return this.move.y < 0;
  }
}
