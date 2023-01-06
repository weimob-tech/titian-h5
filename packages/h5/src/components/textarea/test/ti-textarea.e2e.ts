import { newE2EPage } from '@stencil/core/testing';

describe('ti-textarea', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-textarea></ti-textarea>');

    const element = await page.find('ti-textarea');
    expect(element).toHaveClass('hydrated');
  });
});
