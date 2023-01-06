import { newSpecPage } from '@stencil/core/testing';
import { TiUploader } from '..';

describe('ti-uploader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiUploader],
      html: `<ti-uploader></ti-uploader>`,
    });
    expect(page.root).toEqualHtml(`
      <ti-uploader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </ti-uploader>
    `);
  });
});
