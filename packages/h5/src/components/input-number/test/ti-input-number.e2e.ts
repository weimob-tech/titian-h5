import { newE2EPage } from '@stencil/core/testing';

describe('ti-input-number', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-input-number></ti-input-number>');

    const element = await page.find('ti-input-number');
    expect(element).toHaveClass('hydrated');
  });
});
