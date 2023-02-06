import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

describe('多选按钮逻辑', () => {
  it('非受控模式下，点击选中切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckboxButton>({
      tagName: 'ti-checkbox-button',
      props: {
        label: 'checkbox-button',
        defaultChecked: true,
      },
    });
    const change = await page.instance.spyOnEvent('change');

    const checkbox = await page.find('.titian-checkbox-button');
    await page.instance.waitForChanges();

    {
      // 初始样式
      expect(checkbox).toHaveClass('titian-checkbox-button-checked');
    }
    {
      // 点击 取消选中
      await checkbox.click();
      await page.instance.waitForChanges();
      // 抛出的detail 为 false
      expect(change).toHaveReceivedEventDetail(false);
      // 样式变化
      expect(checkbox).not.toHaveClass('titian-checkbox-button-checked');
    }
    {
      // 点击 选中
      await checkbox.click();
      await page.instance.waitForChanges();
      // 抛出的detail 为 true
      expect(change).toHaveReceivedEventDetail(true);
      // 样式变化
      expect(checkbox).toHaveClass('titian-checkbox-button-checked');
    }
  });

  it('受控模式下，点击选中切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckboxButton>({
      tagName: 'ti-checkbox-button',
      props: {
        label: 'checkbox-button',
        checked: true,
      },
    });
    const change = await page.instance.spyOnEvent('change');
    const checkbox = await page.find('.titian-checkbox-button');
    const checkboxEl = await page.instance.find('ti-checkbox-button');
    await page.instance.waitForChanges();
    {
      // 初始样式
      expect(checkbox).toHaveClass('titian-checkbox-button-checked');
    }
    {
      // 点击 取消选中
      await checkbox.click();
      await page.instance.waitForChanges();
      // 样式 没有变化
      expect(checkbox).toHaveClass('titian-checkbox-button-checked');
      // 抛出的 detail 为 false
      expect(change).toHaveReceivedEventDetail(false);
      // 主动设置为 false
      checkboxEl.setAttribute('checked', false);
      await page.instance.waitForChanges();
      // 样式变化
      expect(checkbox).not.toHaveClass('titian-checkbox-button-checked');
    }
    {
      // 点击 选中
      await checkbox.click();
      await page.instance.waitForChanges();
      // 样式 没有变化
      expect(checkbox).not.toHaveClass('titian-checkbox-button-checked');
      // 抛出的 detail 为 true
      expect(change).toHaveReceivedEventDetail(true);
      // 主动设置为 true
      checkboxEl.setAttribute('checked', true);
      await page.instance.waitForChanges();
      // 样式变化
      expect(checkbox).toHaveClass('titian-checkbox-button-checked');
    }
  });

  it('禁用后，切换失效', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckboxButton>({
      tagName: 'ti-checkbox-button',
      props: {
        label: 'checkbox-button',
        disabled: true,
        defaultChecked: true,
      },
    });
    const change = await page.instance.spyOnEvent('change');

    const checkbox = await page.find('.titian-checkbox-button');
    await page.instance.waitForChanges();

    expect(checkbox).toHaveClass('titian-checkbox-button-checked');
    {
      // 点击 取消选中
      await checkbox.click();
      await page.instance.waitForChanges();
      expect(change).not.toHaveReceivedEvent();
    }
  });
});
