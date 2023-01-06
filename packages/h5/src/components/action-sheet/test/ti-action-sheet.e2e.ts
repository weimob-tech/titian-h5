import { newE2EPage } from '@stencil/core/testing';

describe('ti-action-sheet', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<ti-action-sheet></ti-action-sheet>');

    const element = await page.find('ti-action-sheet');
    expect(element).toHaveClass('hydrated');
  });
});
