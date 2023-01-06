import { newSpecPage } from '@stencil/core/testing';
import { TiProgress } from '..';

describe('ti-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiProgress],
      html: `<ti-progress></ti-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-progress>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-progress>
    `);
  });
});
