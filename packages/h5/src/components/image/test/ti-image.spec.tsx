import { newSpecPage } from '@stencil/core/testing';
import { TiImage } from '..';

describe('ti-image', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiImage],
      html: `<ti-image></ti-image>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-image>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-image>
    `);
  });
});
