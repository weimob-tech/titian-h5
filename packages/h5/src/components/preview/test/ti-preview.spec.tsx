import { newSpecPage } from '@stencil/core/testing';
import { TiPreview } from '..';

describe('ti-preview', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiPreview],
      html: `<ti-preview></ti-preview>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-preview>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-preview>
    `);
  });
});
