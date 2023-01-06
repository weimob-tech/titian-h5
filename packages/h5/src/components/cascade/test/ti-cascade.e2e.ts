import { newE2EPage } from '@stencil/core/testing';

describe('ti-cascade', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-cascade></ti-cascade>');

    const element = await page.find('ti-cascade');
    expect(element).toHaveClass('hydrated');
  });
});
