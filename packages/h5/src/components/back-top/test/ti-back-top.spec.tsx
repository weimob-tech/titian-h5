import { newSpecPage } from '@stencil/core/testing';
import { TiBackTop } from '..';

describe('ti-back-top', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiBackTop],
      html: `<ti-back-top></ti-back-top>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-back-top>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-back-top>
    `);
  });
});
