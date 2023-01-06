import { newSpecPage } from '@stencil/core/testing';
import { Icon as TiIcon } from '..';

describe('ti-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiIcon],
      html: `<ti-icon></ti-icon>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-icon>
    `);
  });
});
