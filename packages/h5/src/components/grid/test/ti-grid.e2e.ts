import { newE2EPage } from '@stencil/core/testing';

describe('ti-grid', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-grid></ti-grid>');

    const element = await page.find('ti-grid');
    expect(element).toHaveClass('hydrated');
  });
});
