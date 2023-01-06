import { newSpecPage } from '@stencil/core/testing';
import { TiDatetimePicker } from '..';

describe('ti-datetime-picker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiDatetimePicker],
      html: `<ti-datetime-picker></ti-datetime-picker>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-datetime-picker>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-datetime-picker>
    `);
  });
});
