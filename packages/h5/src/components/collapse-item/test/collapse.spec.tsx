import { newSpecPage } from '@stencil/core/testing';
import { TiCollapseItem } from '..';

describe('ti-collapse', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCollapseItem],
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
