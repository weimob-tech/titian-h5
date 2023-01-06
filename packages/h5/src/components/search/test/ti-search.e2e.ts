import { newE2EPage } from '@stencil/core/testing';

describe('ti-search', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-search></ti-search>');

    const element = await page.find('ti-search');
    expect(element).toHaveClass('hydrated');
  });
});
