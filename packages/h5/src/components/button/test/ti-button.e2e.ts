import { newE2EPage } from '@stencil/core/testing';

describe('ti-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-button></ti-button>');

    const element = await page.find('ti-button');
    expect(element).toHaveClass('hydrated');
  });
});
