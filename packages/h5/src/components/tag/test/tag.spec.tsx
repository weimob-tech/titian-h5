import { newSpecPage } from '@stencil/core/testing';
import { Tag } from '..';

describe('ti-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Tag],
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
