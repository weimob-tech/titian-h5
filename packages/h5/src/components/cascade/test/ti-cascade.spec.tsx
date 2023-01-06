import { newSpecPage } from '@stencil/core/testing';
import { TiCascade } from '..';

describe('ti-cascade', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCascade],
      html: `<ti-cascade></ti-cascade>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-cascade>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-cascade>
    `);
  });
});
