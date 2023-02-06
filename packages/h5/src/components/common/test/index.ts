import { E2EPage } from '@stencil/core/testing';

export const sleep = (time = 1000) => new Promise(resolve => setTimeout(resolve, time));

export class MockTouchEvent extends Event {
  type: string;
  touches: Partial<Touch>[];
  changedTouches?: Partial<Touch>[];
  constructor(type: 'touchstart' | 'touchmove' | 'touchend', clientX: number) {
    super('type');
    this.type = type;
    if (type === 'touchend') {
      this.changedTouches = [{ clientX }];
    }
    this.touches = [{ clientX }];
  }
}

export async function autoScroll(page: E2EPage) {
  await page.evaluate(async () => {
    await new Promise<void>(resolve => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight - window.innerHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
