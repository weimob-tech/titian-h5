import { newSpecPage } from '@stencil/core/testing';
import { TiButton } from '..';

describe('ti-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiButton],
      html: `<ti-button></ti-button>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-button>
    `);
  });
});
