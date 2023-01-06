import { newE2EPage } from '@stencil/core/testing';

describe('ti-transition', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-transition></ti-transition>');

    const element = await page.find('ti-transition');
    expect(element).toHaveClass('hydrated');
  });
});
