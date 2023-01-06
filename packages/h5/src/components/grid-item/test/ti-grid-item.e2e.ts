import { newE2EPage } from '@stencil/core/testing';

describe('ti-grid-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-grid-item></ti-grid-item>');

    const element = await page.find('ti-grid-item');
    expect(element).toHaveClass('hydrated');
  });
});
