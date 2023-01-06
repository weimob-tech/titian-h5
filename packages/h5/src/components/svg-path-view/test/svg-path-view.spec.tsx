import { newSpecPage } from '@stencil/core/testing';
import { TiSvgPathView } from '..';

describe('ti-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiSvgPathView],
      html: `<ti-svg-path-view></ti-svg-path-view>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-svg-path-view>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-svg-path-view>
    `);
  });
});
