import { newSpecPage } from '@stencil/core/testing';
import { TiTreeSelect } from '..';

describe('ti-tree-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTreeSelect],
      html: `<ti-tree-select></ti-tree-select>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-tree-select>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-tree-select>
    `);
  });
});
