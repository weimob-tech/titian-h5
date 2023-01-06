import { newE2EPage } from '@stencil/core/testing';

describe('ti-swipe-cell', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-swipe-cell></ti-swipe-cell>');

    const element = await page.find('ti-swipe-cell');
    expect(element).toHaveClass('hydrated');
  });
});
