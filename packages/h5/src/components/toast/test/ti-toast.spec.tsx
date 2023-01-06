import { newSpecPage } from '@stencil/core/testing';
import { TiToast } from '..';

describe('ti-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiToast],
      html: `<ti-toast></ti-toast>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-toast>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-toast>
    `);
  });
});
