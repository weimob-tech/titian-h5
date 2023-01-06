import { newSpecPage } from '@stencil/core/testing';
import { TiSearch } from '..';

describe('ti-search', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSearch],
      html: `<ti-search></ti-search>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-search>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-search>
    `);
  });
});
