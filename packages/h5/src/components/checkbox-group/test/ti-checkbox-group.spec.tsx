import { newSpecPage } from '@stencil/core/testing';
import { TiCheckboxGroup } from '..';

describe.skip('ti-checkbox-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxGroup],
      html: `<ti-checkbox-group></ti-checkbox-group>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-checkbox-group>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-checkbox-group>
    `);
  });
});
