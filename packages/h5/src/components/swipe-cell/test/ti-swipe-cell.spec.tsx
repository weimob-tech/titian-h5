import { newSpecPage } from '@stencil/core/testing';
import { TiSwipeCell } from '..';

describe('ti-swipe-cell', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSwipeCell],
      html: `<ti-swipe-cell></ti-swipe-cell>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-swipe-cell>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-swipe-cell>
    `);
  });
});
