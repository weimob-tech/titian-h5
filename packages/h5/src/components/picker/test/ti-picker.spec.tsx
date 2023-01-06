import { newSpecPage } from '@stencil/core/testing';
import { TiPicker } from '..';

describe('ti-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiPicker],
      html: `<ti-picker></ti-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-picker>
    `);
  });
});
