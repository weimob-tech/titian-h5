import { newSpecPage } from '@stencil/core/testing';
import { TiCol } from '..';
import { TiRow } from '../../row';

describe('ti-col', () => {
  it('renders basic success', async () => {
    const page = await newSpecPage({
      components: [TiCol],
      html: `<ti-col></ti-col>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders span attribute success', async () => {
    const page = await newSpecPage({
      components: [TiCol],
      html: `<ti-col span="4"></ti-col>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders offset attribute success', async () => {
    const page = await newSpecPage({
      components: [TiCol],
      html: `<ti-col offset="4"></ti-col>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render row with col', async () => {
    const page = await newSpecPage({
      components: [TiCol, TiRow],
      html: `
        <ti-row gutter="16">
          <ti-col span="6"></ti-col>
          <ti-col span="6"></ti-col>
          <ti-col span="6"></ti-col>
          <ti-col span="6"></ti-col>
        </ti-row>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });
});
