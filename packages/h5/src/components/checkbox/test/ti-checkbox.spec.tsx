import { newSpecPage } from '@stencil/core/testing';
import { TiCheckbox } from '..';

describe('ti-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox],
      html: `<ti-checkbox></ti-checkbox>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
