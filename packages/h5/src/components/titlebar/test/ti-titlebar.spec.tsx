import { newSpecPage } from '@stencil/core/testing';
import { TiTitlebar } from '..';

describe('ti-titlebar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTitlebar],
      html: `<ti-titlebar></ti-titlebar>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-titlebar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-titlebar>
    `);
  });
});
