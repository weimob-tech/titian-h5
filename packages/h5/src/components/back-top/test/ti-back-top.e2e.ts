import { newE2EPage } from '@stencil/core/testing';

describe('ti-back-top', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-back-top></ti-back-top>');

    const element = await page.find('ti-back-top');
    expect(element).toHaveClass('hydrated');
  });
});
