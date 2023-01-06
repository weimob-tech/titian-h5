import { newE2EPage } from '@stencil/core/testing';

describe('ti-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-radio-group></ti-radio-group>');

    const element = await page.find('ti-radio-group');
    expect(element).toHaveClass('hydrated');
  });
});
