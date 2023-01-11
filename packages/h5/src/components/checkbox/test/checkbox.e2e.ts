import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

describe('多选框', () => {
  it('非受控模式，点击选中切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckbox>({
      tagName: 'ti-checkbox',
      props: {
        label: 'checkbox',
        defaultChecked: true,
      },
    });
    // 根节点查询
    const checkbox = await page.find('.titian-checkbox');
    // icon wrap
    const checkboxIconWrap = await page.find('.titian-checkbox-icon-wrap');
    // 查找 label 标签
    const checkboxLabel = await page.find('.titian-checkbox-label');
    // mock change 事件
    const change = await page.instance.spyOnEvent('change');

    {
      // 初始化 class 判断
      expect(checkbox).toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).toHaveClass('titian-checkbox-icon-wrap-checked');
    }

    {
      // 模拟 label 点击
      await checkboxLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断label点击事件后选中状态, 因为 checkbox 默认选中、所以这里为 false
      expect(change).toHaveReceivedEventDetail(false);

      // class 判断
      expect(checkbox).not.toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).not.toHaveClass('titian-checkbox-icon-wrap-checked');
    }

    {
      // 再次模拟 label 点击
      await checkboxLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 label 点击事件后选中状态、因为上一步点击取消选中，这次则为选中状态
      expect(change).toHaveReceivedEventDetail(true);
      // class 判断
      expect(checkbox).toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).toHaveClass('titian-checkbox-icon-wrap-checked');
    }
  });

  it('受控模式，点击选中切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckbox>({
      tagName: 'ti-checkbox',
      props: {
        label: 'checkbox',
        checked: true,
      },
    });
    // 根节点查询
    const checkbox = await page.find('.titian-checkbox');
    // icon wrap
    const checkboxIconWrap = await page.find('.titian-checkbox-icon-wrap');
    // 查找 label 标签
    const checkboxLabel = await page.find('.titian-checkbox-label');
    // mock change 事件
    const change = await page.instance.spyOnEvent('change');

    const checkboxEl = await page.instance.find('ti-checkbox');

    {
      // 初始化 class 判断
      expect(checkbox).toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).toHaveClass('titian-checkbox-icon-wrap-checked');
    }

    {
      // 模拟 label 点击
      await checkboxLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断label点击事件后选中状态, 因为 checkbox 默认选中、所以这里为 false
      expect(change).toHaveReceivedEventDetail(false);
      // class 判断，然后为选中状态
      expect(checkbox).toHaveClass('titian-checkbox-checked');

      expect(checkboxIconWrap).toHaveClass('titian-checkbox-icon-wrap-checked');
      checkboxEl.setAttribute('checked', false);
      await page.instance.waitForChanges();
      // 更新为取消状态
      expect(checkbox).not.toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).not.toHaveClass('titian-checkbox-icon-wrap-checked');
    }

    {
      // 再次模拟 label 点击
      await checkboxIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 label 点击事件后选中状态、因为上一步点击取消选中，这次则为选中状态
      expect(change).toHaveReceivedEventDetail(true);
      // class 判断, 受控模式下，不会主动更改状态，仍然为取消状态
      expect(checkbox).not.toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).not.toHaveClass('titian-checkbox-icon-wrap-checked');

      checkboxEl.setAttribute('checked', true);
      await page.instance.waitForChanges();
      // 更新为选中状态
      expect(checkbox).toHaveClass('titian-checkbox-checked');
      expect(checkboxIconWrap).toHaveClass('titian-checkbox-icon-wrap-checked');
    }
  });

  it('禁用全部, 事件无法执行', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckbox>({
      tagName: 'ti-checkbox',
      props: {
        label: 'checkbox',
        disabled: true,
      },
    });

    // 根节点查询
    const checkbox = await page.find('.titian-checkbox');

    // icon wrap
    const checkboxIconWrap = await page.find('.titian-checkbox-icon-wrap');
    // 查找 label 标签
    const checkboxLabel = await page.find('.titian-checkbox-label');
    // mock change 事件
    const change = await page.instance.spyOnEvent('change');

    {
      // 初始化 class 判断
      expect(checkbox).toHaveClass('titian-checkbox-disabled');
    }
    {
      // 模拟 label 点击
      await checkboxLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 没有时间抛出
      expect(change).not.toHaveReceivedEvent();
      // class 判断
      expect(checkbox).toHaveClass('titian-checkbox-disabled');
    }
    {
      // 模拟 icon 点击
      await checkboxIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 icon 点击事件后选中状态、因为上一步为点击选中，这次则为取消状态
      expect(change).not.toHaveReceivedEvent();
      // class 判断
      expect(checkbox).toHaveClass('titian-checkbox-disabled');
    }
  });

  it('禁用 label 点击, label事件无法执行, icon事件可以执行', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCheckbox>({
      tagName: 'ti-checkbox',
      props: {
        label: 'checkbox',
        labelDisabled: true,
      },
    });

    // 根节点查询
    const checkbox = await page.find('.titian-checkbox');

    // icon wrap
    const checkboxIconWrap = await page.find('.titian-checkbox-icon-wrap');
    // 查找 label 标签
    const checkboxLabel = await page.find('.titian-checkbox-label');
    // mock change 事件
    const change = await page.instance.spyOnEvent('change');

    {
      // 初始化 class 判断
      expect(checkbox).not.toHaveClass('titian-checkbox-disabled');
    }
    {
      // 模拟 label 点击
      await checkboxLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 没有时间抛出
      expect(change).not.toHaveReceivedEvent();
    }
    {
      // 模拟 icon 点击
      await checkboxIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 icon 点击事件后选中状态、因为上一步为点击选中，这次则为取消状态
      expect(change).toHaveReceivedEventDetail(true);
    }
  });
});
