import { newSpecPage } from '@stencil/core/testing';
import { TiSteps } from '..';

describe('ti-steps', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSteps],
      html: `<ti-steps></ti-steps>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-steps>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-steps>
    `);
  });
});
