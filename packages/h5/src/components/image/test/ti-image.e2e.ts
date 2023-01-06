import { newE2EPage } from '@stencil/core/testing';

describe('ti-image', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-image></ti-image>');

    const element = await page.find('ti-image');
    expect(element).toHaveClass('hydrated');
  });
});
