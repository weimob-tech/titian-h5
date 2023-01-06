import { newSpecPage } from '@stencil/core/testing';
import { TiCountdown } from '..';

describe('ti-countdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCountdown],
      html: `<ti-countdown></ti-countdown>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-countdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-countdown>
    `);
  });
});
