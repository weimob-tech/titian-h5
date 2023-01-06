import { newE2EPage } from '@stencil/core/testing';

describe('ti-countdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-countdown></ti-countdown>');

    const element = await page.find('ti-countdown');
    expect(element).toHaveClass('hydrated');
  });
});
