import { newSpecPage } from '@stencil/core/testing';
import { TiDialog } from '..';

describe('ti-dialog', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiDialog],
      html: `<ti-dialog></ti-dialog>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-dialog>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-dialog>
    `);
  });
});
