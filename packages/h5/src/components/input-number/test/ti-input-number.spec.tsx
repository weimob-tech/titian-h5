import { newSpecPage } from '@stencil/core/testing';
import { TiInputNumber } from '../index';

describe('ti-input-number', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      html: `<ti-input-number></ti-input-number>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-input-number>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-input-number>
    `);
  });
});
