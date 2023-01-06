import { newSpecPage } from '@stencil/core/testing';
import { TiTabbarItem } from '..';

describe('ti-tabbar-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTabbarItem],
      html: `<ti-tabbar-item></ti-tabbar-item>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-tabbar-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-tabbar-item>
    `);
  });
});
