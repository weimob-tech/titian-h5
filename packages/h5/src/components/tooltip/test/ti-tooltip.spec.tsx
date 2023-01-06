import { newSpecPage } from '@stencil/core/testing';
import { TiTooltip } from '..';

describe('ti-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTooltip],
      html: `<ti-tooltip></ti-tooltip>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-tooltip>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-tooltip>
    `);
  });
});
