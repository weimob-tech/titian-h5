import { newE2EPage } from '@stencil/core/testing';

describe('ti-sticky', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-sticky></ti-sticky>');

    const element = await page.find('ti-sticky');
    expect(element).toHaveClass('hydrated');
  });
});
