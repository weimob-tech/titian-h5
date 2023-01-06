import { newE2EPage } from '@stencil/core/testing';

describe('ti-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-badge></ti-badge>');

    const element = await page.find('ti-badge');
    expect(element).toHaveClass('hydrated');
  });
});
