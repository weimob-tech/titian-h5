import { newSpecPage } from '@stencil/core/testing';
import { TiNoticeBar } from '..';

describe('ti-notice-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiNoticeBar],
      html: `<ti-notice-bar></ti-notice-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-notice-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-notice-bar>
    `);
  });
});
