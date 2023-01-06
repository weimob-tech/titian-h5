import { newE2EPage } from '@stencil/core/testing';

describe('ti-steps', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-steps></ti-steps>');

    const element = await page.find('ti-steps');
    expect(element).toHaveClass('hydrated');
  });
});
