import { newE2EPage } from '@stencil/core/testing';

describe('ti-circle-progress', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-circle-progress></ti-circle-progress>');

    const element = await page.find('ti-circle-progress');
    expect(element).toHaveClass('hydrated');
  });
});
