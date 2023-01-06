import { newSpecPage } from '@stencil/core/testing';
import { TiSwiper } from '..';

describe('ti-swiper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSwiper],
      html: `<ti-swiper></ti-swiper>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-swiper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-swiper>
    `);
  });
});
