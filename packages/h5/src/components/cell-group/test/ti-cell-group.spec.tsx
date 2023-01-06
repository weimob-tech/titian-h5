import { newSpecPage } from '@stencil/core/testing';
import { TiCellGroup } from '..';

describe('ti-cell-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCellGroup],
      html: `<ti-cell-group></ti-cell-group>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-cell-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-cell-group>
    `);
  });
});
