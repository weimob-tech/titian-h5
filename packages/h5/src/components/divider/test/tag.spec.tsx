import { newSpecPage } from '@stencil/core/testing';
import { Divider } from '..';

describe('ti-divider', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [Divider],
      html: `<ti-divider></ti-divider>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-divider>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-divider>
    `);
  });
});
