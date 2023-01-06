import { newSpecPage } from '@stencil/core/testing';
import { TiPickerColumn } from '..';

describe('ti-picker-column', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiPickerColumn],
      html: `<ti-picker-column></ti-picker-column>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-picker-column>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-picker-column>
    `);
  });
});
