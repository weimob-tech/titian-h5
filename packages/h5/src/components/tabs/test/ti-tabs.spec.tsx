import { newSpecPage } from '@stencil/core/testing';
import { TiTabs } from '..';

describe('ti-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTabs],
      html: `<ti-tabs></ti-tabs>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-tabs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-tabs>
    `);
  });
});
