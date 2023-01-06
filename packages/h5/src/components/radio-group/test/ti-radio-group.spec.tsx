import { newSpecPage } from '@stencil/core/testing';
import { TiRadioGroup } from '..';

describe('ti-radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiRadioGroup],
      html: `<ti-radio-group></ti-radio-group>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-radio-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-radio-group>
    `);
  });
});
