import { newSpecPage } from '@stencil/core/testing';
import { TiCircleProgress } from '..';

describe('ti-circle-progress', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCircleProgress],
      html: `<ti-circle-progress></ti-circle-progress>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-circle-progress>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-circle-progress>
    `);
  });
});
