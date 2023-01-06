import { newSpecPage } from '@stencil/core/testing';
import { TiTabbar } from '..';

describe('ti-tabbar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTabbar],
      html: `<ti-tabbar></ti-tabbar>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-tabbar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-tabbar>
    `);
  });
});
