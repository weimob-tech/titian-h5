import { newSpecPage } from '@stencil/core/testing';
import { TiActionSheet } from '..';

describe('ti-action-sheet', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiActionSheet],
      html: `<ti-action-sheet></ti-action-sheet>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-action-sheet>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-action-sheet>
    `);
  });
});
