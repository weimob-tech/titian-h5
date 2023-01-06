import { newSpecPage } from '@stencil/core/testing';
import { TiShareSheet } from '..';

describe('ti-share-sheet', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiShareSheet],
      html: `<ti-share-sheet></ti-share-sheet>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-share-sheet>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-share-sheet>
    `);
  });
});
