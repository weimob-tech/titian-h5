import { newSpecPage } from '@stencil/core/testing';
import { TiSticky } from '..';

describe('ti-sticky', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSticky],
      html: `<ti-sticky></ti-sticky>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-sticky>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-sticky>
    `);
  });
});
