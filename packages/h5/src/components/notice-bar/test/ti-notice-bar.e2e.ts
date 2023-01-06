import { newE2EPage } from '@stencil/core/testing';

describe('ti-notice-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-notice-bar></ti-notice-bar>');

    const element = await page.find('ti-notice-bar');
    expect(element).toHaveClass('hydrated');
  });
});
