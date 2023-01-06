import { newSpecPage } from '@stencil/core/testing';
import { TiDropdownItem } from '..';

describe('ti-dropdown-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiDropdownItem],
      html: `<ti-dropdown-item></ti-dropdown-item>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-dropdown-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-dropdown-item>
    `);
  });
});
