import { raf } from '../common/utils/raf';

interface ScaleOptions {
  clickScale: number;
  maxScale: number;
}

export default class ScaleImage {
  start: TouchList;

  isTouch = false;

  now = 0;

  isDoubleTouch = false;

  endPosition: [number, number];

  startPosition: [number, number];

  tMatrix = [1, 0, 0, 1, 0, 0]; // x缩放，无，无，y缩放，x平移，y平移

  originLast: [number, number];

  maxSwipeLeft: number;

  maxSwipeRight: number;

  maxSwipeTop: number;

  maxSwipeBottom: number;

  target: HTMLElement;

  oldTransform: string;

  rect: DOMRect;

  parentRect: DOMRect;

  options: ScaleOptions = { clickScale: 2, maxScale: 3 };

  constructor(target: HTMLElement, options: Partial<ScaleOptions> = {}) {
    this.target = target;
    this.rect = this.target.getBoundingClientRect();
    this.parentRect = this.target.parentElement.getBoundingClientRect();
    this.oldTransform = this.target.style.transform;
    this.options = { ...this.options, ...options };
  }

  midPoint: [number, number];

  handleTouchStart(e: TouchEvent) {
    if (e.touches.length >= 2) {
      this.isDoubleTouch = true;
      this.isTouch = false;
      this.start = e.touches;
      const screenMinPoint = this.getMidPoint(this.start[0], this.start[1]); // 获取两个触点中心坐标
      this.midPoint = [screenMinPoint[0] - this.rect.left, screenMinPoint[1] - this.rect.top];
      this.gestureActions({ position: this.midPoint, type: 'touchStart' });
    } else {
      const delta = Date.now() - this.now;
      this.now = Date.now();
      this.startPosition = [e.touches[0].pageX, e.touches[0].pageY];
      if (delta > 0 && delta <= 300) {
        // 双击事件
        const rect = this.target.getBoundingClientRect();
        const position = [e.touches[0].pageX - rect.left, e.touches[0].pageY - rect.top];
        this.gestureActions({ position, type: 'doubleTouch' });
      }
      this.isTouch = true;
    }
  }

  handleTouchMove(e: TouchEvent) {
    if (this.maxSwipeRight && Math.abs(this.tMatrix[4]) !== this.maxSwipeRight) {
      e.stopPropagation();
    }
    if (e.touches.length >= 2 && this.isDoubleTouch) {
      // 手势事件
      const scale = this.getDistance(e.touches[0], e.touches[1]) / this.getDistance(this.start[0], this.start[1]);

      this.gestureActions({ scale: scale.toFixed(2), type: 'touchMove' });
    } else if (this.isTouch) {
      let movePosition: [number, number] = [e.touches[0].pageX, e.touches[0].pageY];
      this.endPosition = movePosition;
      movePosition = [movePosition[0] - this.startPosition[0], movePosition[1] - this.startPosition[1]];
      this.startPosition = [e.touches[0].pageX, e.touches[0].pageY];
      const distance = [movePosition[0].toFixed(2), movePosition[1].toFixed(2)];
      this.gestureActions({ position: distance, type: 'oneTouchMove' });
    }
  }

  handleTouchEnd() {
    if (this.isDoubleTouch) {
      this.isDoubleTouch = false;
      this.gestureActions({ position: this.endPosition, type: 'touchEnd' });
    }
  }

  getDistance(p1: Touch, p2: Touch) {
    const x = p2.pageX - p1.pageX;
    const y = p2.pageY - p1.pageY;
    return Math.sqrt(x * x + y * y);
  }

  getMidPoint(p1: Touch, p2: Touch) {
    const x = (p1.pageX + p2.pageX) / 2;
    const y = (p1.pageY + p2.pageY) / 2;
    return [x, y];
  }

  maxMove() {
    // @ts-ignore
    const imgWidth = this.target.width;
    // @ts-ignore
    const imgHeight = this.target.height;
    // 最大可拖动范围
    const scale = this.tMatrix[0];

    this.maxSwipeLeft = ((scale - 1) * imgWidth) / 2;
    this.maxSwipeRight = Math.abs(+((Math.abs(scale - 1) * imgWidth) / 2).toFixed(2));
    this.maxSwipeTop = Math.abs(+((Math.abs(scale - 1) * imgHeight) / 2).toFixed(2));
    this.maxSwipeBottom = Math.abs(+((Math.abs(scale - 1) * imgHeight) / 2).toFixed(2));
  }

  gestureActions(data: any) {
    const rect = this.target.getBoundingClientRect();
    const { width, height } = rect;

    switch (data.type) {
      case 'touchStart': {
        this.originLast = data.position;
        this.maxSwipeLeft = 0;
        this.maxSwipeRight = 0;
        break;
      }
      case 'doubleTouch': {
        this.originLast = data.position;
        const centerPoint = [width / 2, height / 2];
        const isZoomOut = this.tMatrix[0] !== 1 || this.tMatrix[3] !== 1;
        if (isZoomOut) {
          this.tMatrix = [1, 0, 0, 1, 0, 0];
          this.target.style.transform = null;
        } else {
          const { clickScale = 2 } = this.options;
          this.tMatrix = [
            clickScale,
            0,
            0,
            clickScale,
            (centerPoint[0] - data.position[0]) * (clickScale - 1),

            // (centerPoint[1] - data.position[1]) * (num - 1),
            0,
          ];
          const temp = this.tMatrix.join(', ');
          raf(() => {
            this.target.style.transform = `matrix(${temp})`;
          });
        }
        this.maxMove();
        break;
      }
      case 'touchMove': {
        const { parentRect } = this;
        const centerPoint = [
          Math.abs(this.rect.left - parentRect.left) + parentRect.width / 2,
          Math.abs(this.rect.top - parentRect.top) + parentRect.height / 2,
        ];
        const scale = parseFloat(data.scale);
        const nextM = this.tMatrix[0] + scale - 1;
        const { maxScale = 3 } = this.options;
        this.tMatrix[0] = +(nextM > 0.5 && nextM < maxScale + 1.5 ? nextM : this.tMatrix[0]).toFixed(2);
        this.tMatrix[3] = +(nextM > 0.5 && nextM < maxScale + 1.5 ? nextM : this.tMatrix[3]).toFixed(2);
        this.maxMove();

        this.tMatrix[4] = +((centerPoint[0] - this.originLast[0]) * (this.tMatrix[0] - 1)).toFixed(2);
        // this.tMatrix[5] = +((centerPoint[1] - this.originLast[1]) * (this.tMatrix[3] - 1)).toFixed(2);
        this.tMatrix[5] = 0;
        const temp = this.tMatrix.join(',');

        raf(() => {
          this.target.style.transform = `matrix(${temp})`;
        });
        break;
      }
      case 'oneTouchMove': {
        if (!this.maxSwipeLeft || !this.maxSwipeRight || !this.maxSwipeTop || !this.maxSwipeBottom) return;

        if (this.tMatrix[0] < 1 || this.tMatrix[3] < 1) return;
        if (data.position[0] > 0) {
          this.tMatrix[4] = Math.min(this.tMatrix[4] + parseInt(data.position[0], 10), this.maxSwipeLeft);
        }
        if (data.position[0] < 0) {
          this.tMatrix[4] = Math.max(this.tMatrix[4] + parseInt(data.position[0], 10), -this.maxSwipeRight);
        }
        if (data.position[1] > 0) {
          this.tMatrix[5] = Math.min(this.tMatrix[5] + parseInt(data.position[1], 10), this.maxSwipeTop);
        }
        if (data.position[1] < 0) {
          this.tMatrix[5] = Math.max(this.tMatrix[5] + parseInt(data.position[1], 10), -this.maxSwipeBottom);
        }
        const temp = this.tMatrix.join(',');
        raf(() => {
          this.target.style.transform = `matrix(${temp})`;
        });
        break;
      }
      case 'touchEnd': {
        const { maxScale = 3 } = this.options;
        const isZoomOut = this.tMatrix[0] < 1 || this.tMatrix[3] < 1;
        const isZoomOut2 = this.tMatrix[0] > maxScale || this.tMatrix[3] > maxScale;

        if (isZoomOut) {
          this.tMatrix = [1, 0, 0, 1, 0, 0];
        } else if (isZoomOut2) {
          this.tMatrix[0] = maxScale;
          this.tMatrix[3] = maxScale;
          this.maxMove();
          this.tMatrix[4] = Math.max(-this.maxSwipeRight, Math.min(this.maxSwipeLeft, this.tMatrix[4]));
        }
        const temp = this.tMatrix.join(', ');
        raf(() => {
          this.target.style.transform = `matrix(${temp})`;
        });
        break;
      }
      default: {
        break;
      }
    }
  }

  destroy() {
    this.target.style.transform = this.oldTransform;
    this.tMatrix = [1, 0, 0, 1, 0, 0];
  }
}
