import { newE2EPage } from '@stencil/core/testing';

describe('ti-dropdown-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-dropdown-menu></ti-dropdown-menu>');

    const element = await page.find('ti-dropdown-menu');
    expect(element).toHaveClass('hydrated');
  });
});
