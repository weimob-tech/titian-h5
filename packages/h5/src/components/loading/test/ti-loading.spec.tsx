import { newSpecPage } from '@stencil/core/testing';
import { TiLoading } from '..';

describe('ti-loading', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiLoading],
      html: `<ti-loading></ti-loading>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-loading>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-loading>
    `);
  });
});
