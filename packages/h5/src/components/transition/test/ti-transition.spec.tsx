import { newSpecPage } from '@stencil/core/testing';
import { TiTransition } from '..';

describe('ti-transition', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiTransition],
      html: `<ti-transition></ti-transition>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-transition>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-transition>
    `);
  });
});
