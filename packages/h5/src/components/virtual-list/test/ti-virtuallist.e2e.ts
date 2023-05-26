import { newE2EPage } from '@stencil/core/testing';

describe('ti-virtual-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-virtual-list></ti-virtual-list>');

    const element = await page.find('ti-virtual-list');
    expect(element).toHaveClass('hydrated');
  });
});
