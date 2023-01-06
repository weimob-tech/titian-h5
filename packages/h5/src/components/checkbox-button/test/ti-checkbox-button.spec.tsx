import { newSpecPage } from '@stencil/core/testing';
import { TiCheckboxButton } from '../index';

describe('ti-checkbox-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxButton],
      html: `<ti-checkbox-button></ti-checkbox-button>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-checkbox-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-checkbox-button>
    `);
  });
});
