import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

describe('单选框按钮逻辑', () => {
  it('点击选中切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiRadioButton>({
      tagName: 'ti-radio-button',
      props: {
        label: 'radio-button',
        defaultChecked: true,
      },
    });
    const change = await page.instance.spyOnEvent('change');

    const radio = await page.find('.titian-radio-button');
    await page.instance.waitForChanges();

    expect(radio).toHaveClass('titian-radio-button-checked');
    {
      // 点击 取消选中
      await radio.click();
      await page.instance.waitForChanges();
      expect(change).toHaveReceivedEventDetail(false);
    }
    {
      // 点击 选中
      await radio.click();
      await page.instance.waitForChanges();
      expect(change).toHaveReceivedEventDetail(true);
    }
  });

  it('禁用后，切换失效', async () => {
    const page = new PageEl();
    await page.init<JSX.TiRadioButton>({
      tagName: 'ti-radio-button',
      props: {
        label: 'radio-button',
        disabled: true,
        defaultChecked: true,
      },
    });
    const change = await page.instance.spyOnEvent('change');

    const radio = await page.find('.titian-radio-button');
    await page.instance.waitForChanges();

    expect(radio).toHaveClass('titian-radio-button-checked');
    {
      // 点击 取消选中
      await radio.click();
      await page.instance.waitForChanges();
      expect(change).not.toHaveReceivedEvent();
    }
  });
});
