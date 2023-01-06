import { newE2EPage } from '@stencil/core/testing';

describe('ti-loading', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-loading></ti-loading>');

    const element = await page.find('ti-loading');
    expect(element).toHaveClass('hydrated');
  });
});
