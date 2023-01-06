import { newSpecPage } from '@stencil/core/testing';
import { TiRow } from '..';

describe('ti-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TiRow],
      html: `<ti-row></ti-row>`,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('renders gutter success', async () => {
    const page = await newSpecPage({
      components: [TiRow],
      html: `<ti-row gutter="16"></ti-row>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
