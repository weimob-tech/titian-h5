import { newSpecPage } from '@stencil/core/testing';
import { TiSidebar } from '..';

describe('ti-sidebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSidebar],
      html: `<ti-sidebar></ti-sidebar>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-sidebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-sidebar>
    `);
  });
});
