import { newE2EPage } from '@stencil/core/testing';

describe('ti-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-progress></ti-progress>');

    const element = await page.find('ti-progress');
    expect(element).toHaveClass('hydrated');
  });
});
