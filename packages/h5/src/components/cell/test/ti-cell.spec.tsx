import { newSpecPage } from '@stencil/core/testing';
import { TiCell } from '..';

describe('ti-cell', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCell],
      html: `<ti-cell title="标题"></ti-cell>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
