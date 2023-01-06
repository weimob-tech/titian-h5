import { newE2EPage } from '@stencil/core/testing';

jest.useFakeTimers();

jest.setTimeout(100000);

describe('ti-cell-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-cell-group></ti-cell-group>');

    const element = await page.find('ti-cell-group');
    expect(element).toHaveClass('hydrated');
  });
});
