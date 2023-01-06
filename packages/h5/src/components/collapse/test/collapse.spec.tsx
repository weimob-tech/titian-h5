import { newSpecPage } from '@stencil/core/testing';
import { TiCollapse } from '..';

describe('ti-collapse', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCollapse],
      html: `<ti-collapse></ti-collapse>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-collapse>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-collapse>
    `);
  });
});
