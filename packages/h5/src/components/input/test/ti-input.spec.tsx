import { newSpecPage } from '@stencil/core/testing';
import { TiInput } from '..';

describe('ti-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      html: `<ti-input></ti-input>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-input>
    `);
  });
});
