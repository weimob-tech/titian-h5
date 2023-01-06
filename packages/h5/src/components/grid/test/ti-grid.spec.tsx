import { newSpecPage } from '@stencil/core/testing';
import { TiGrid } from '..';

describe('ti-grid', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiGrid],
      html: `<ti-grid></ti-grid>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-grid>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-grid>
    `);
  });
});
