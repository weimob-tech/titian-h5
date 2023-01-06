import { newE2EPage } from '@stencil/core/testing';

describe('ti-dropdown-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-dropdown-item></ti-dropdown-item>');

    const element = await page.find('ti-dropdown-item');
    expect(element).toHaveClass('hydrated');
  });
});
