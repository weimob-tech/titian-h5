import { newSpecPage } from '@stencil/core/testing';
import { TiScrollView } from '..';

describe('ti-scroll-view', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiScrollView],
      html: `<ti-scroll-view></ti-scroll-view>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-scroll-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-scroll-view>
    `);
  });
});
