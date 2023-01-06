import { newSpecPage } from '@stencil/core/testing';
import { TiSwiperItem } from '..';

describe('ti-swiper-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSwiperItem],
      html: `<ti-swiper-item></ti-swiper-item>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-swiper-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-swiper-item>
    `);
  });
});
