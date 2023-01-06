import { newSpecPage } from '@stencil/core/testing';
import { TiDropdownMenu } from '..';

describe('ti-dropdown-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiDropdownMenu],
      html: `<ti-dropdown-menu></ti-dropdown-menu>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-dropdown-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-dropdown-menu>
    `);
  });
});
