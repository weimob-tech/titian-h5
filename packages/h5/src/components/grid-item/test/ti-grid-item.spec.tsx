import { newSpecPage } from '@stencil/core/testing';
import { TiGridItem } from '..';

describe('ti-grid-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiGridItem],
      html: `<ti-grid-item></ti-grid-item>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-grid-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-grid-item>
    `);
  });
});
