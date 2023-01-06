import { newSpecPage } from '@stencil/core/testing';
import { TiSidebarItem } from '..';

describe('ti-sidebar-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSidebarItem],
      html: `<ti-sidebar-item></ti-sidebar-item>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-sidebar-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-sidebar-item>
    `);
  });
});
