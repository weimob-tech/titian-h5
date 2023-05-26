import { newSpecPage } from '@stencil/core/testing';
import { TiVirtualList } from '../index';

describe('ti-virtual-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiVirtualList],
      html: `<ti-virtual-list></ti-virtual-list>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-virtual-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-virtual-list>
    `);
  });
});
