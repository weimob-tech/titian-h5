import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import * as utils from '../../common/utils';
import { TiSwiper } from '..';
import { MockTouchEvent, sleep } from '../../common/test';
import { TiImage } from '../../image';
import { TiSwiperItem } from '../../swiper-item';

describe('渲染 swiper', () => {
  beforeAll(() => {
    jest
      .spyOn<any, string>(utils, 'getBoundingClientRect')
      .mockReturnValue({ width: 300, height: 200, left: 0, top: 0 });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
  const images = [
    'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default1.png',
    'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default2.png',
    'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default3.png',
    'https://cdn2.weimob.com/saas/@assets/saas-fe-retail-h5-stc/image/titian/default4.png',
  ];
  function move(cell: HTMLDivElement, step: number) {
    cell.dispatchEvent(new MockTouchEvent('touchstart', 0));
    cell.dispatchEvent(new MockTouchEvent('touchmove', step));
    cell.dispatchEvent(new MockTouchEvent('touchend', step));
  }
  it('基本渲染+移动', async () => {
    const page = await newSpecPage({
      components: [TiSwiper, TiSwiperItem, TiImage],
      template: () => (
        <ti-swiper>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[0]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[1]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[2]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[3]} />
            </div>
          </ti-swiper-item>
        </ti-swiper>
      ),
    });
    await page.waitForChanges();
    // 向左滑动第二页
    move(global.box, -300);

    await sleep(3000);
    expect(page.root).toMatchSnapshot('第二页');
    // 向左滑动到第三页
    move(global.box, -300);

    await sleep(3000);
    expect(page.root).toMatchSnapshot('第三页');
    page.body.innerHTML = '';
  });

  it('无缝滚动', async () => {
    const page = await newSpecPage({
      components: [TiSwiper, TiSwiperItem, TiImage],
      template: () => (
        <ti-swiper loop>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[0]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[1]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[2]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[3]} />
            </div>
          </ti-swiper-item>
        </ti-swiper>
      ),
    });
    expect(page.root).toMatchSnapshot('第一页');
    await page.waitForChanges();
    // 向右滑动第 4 页
    move(global.box, 300);

    await sleep(3000);
    expect(page.root).toMatchSnapshot('第4页');
    // 向左滑动到第三页
    move(global.box, 300);

    await sleep(3000);
    expect(page.root).toMatchSnapshot('第三页');
    page.body.innerHTML = '';
  });

  it('自动滚动', async () => {
    const page = await newSpecPage({
      components: [TiSwiper, TiSwiperItem, TiImage],
      template: () => (
        <ti-swiper autoplay>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[0]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[1]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[2]} />
            </div>
          </ti-swiper-item>
          <ti-swiper-item>
            <div class="swiper-item">
              <ti-image width="100%" height={200} mode="cover" src={images[3]} />
            </div>
          </ti-swiper-item>
        </ti-swiper>
      ),
    });

    expect(page.root).toMatchSnapshot('第一页');
    await page.waitForChanges();

    await sleep(500);
    expect(page.root).toMatchSnapshot('第4页');

    await sleep(500);
    expect(page.root).toMatchSnapshot('第三页');
    page.body.innerHTML = '';
  });
});
