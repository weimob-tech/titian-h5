import { newSpecPage } from '@stencil/core/testing';
import { TiSafeArea } from '..';

describe('ti-safe-area', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSafeArea],
      html: `<ti-safe-area></ti-safe-area>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-safe-area>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-safe-area>
    `);
  });
});
