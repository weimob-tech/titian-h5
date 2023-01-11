import { newE2EPage } from '@stencil/core/testing';

describe('渲染 ti-input', () => {
  it('点击', async () => {
    const page = await newE2EPage({
      html: `<ti-input />`,
    });
    const input = await page.find('ti-input >>> input');
    await input.press('8');
    let value = await input.getProperty('value');
    expect(value).toBe('8');
  });
});
