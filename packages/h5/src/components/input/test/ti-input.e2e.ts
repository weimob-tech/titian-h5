import { newE2EPage } from '@stencil/core/testing';

describe('ti-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-input></ti-input>');

    const element = await page.find('ti-input');
    expect(element).toHaveClass('hydrated');
  });
});
