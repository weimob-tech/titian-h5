import { newSpecPage } from '@stencil/core/testing';
import { TiTextarea } from '..';

describe('ti-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTextarea],
      html: `<ti-textarea></ti-textarea>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-textarea>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-textarea>
    `);
  });
});
