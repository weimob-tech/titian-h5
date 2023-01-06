import { newSpecPage } from '@stencil/core/testing';
import { TiBadge } from '..';

describe('ti-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiBadge],
      html: `<ti-badge></ti-badge>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-badge>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-badge>
    `);
  });
});
