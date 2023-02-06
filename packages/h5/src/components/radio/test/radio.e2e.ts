import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

describe('单选框行为测试', () => {
  it('点击选中切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiRadio>({
      tagName: 'ti-radio',
      props: {
        label: 'radio',
        defaultChecked: true,
      },
    });
    const change = await page.instance.spyOnEvent('change');
    // 根节点查询
    const radio = await page.find('.titian-radio');
    // icon wrap
    const radioIconWrap = await page.find('.titian-radio-icon-wrap');
    // 查找 label 标签
    const radioLabel = await page.find('.titian-radio-label');

    {
      // 初始化 class 判断
      expect(radio).toHaveClass('titian-radio-checked');
      expect(radioIconWrap).toHaveClass('titian-radio-icon-wrap-checked');
    }

    {
      // 模拟 label 点击
      await radioLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断label点击事件后选中状态, 因为 radio 默认选中、所以这里为 false
      expect(change).toHaveReceivedEventDetail(false);

      // class 判断
      expect(radio).not.toHaveClass('titian-radio-checked');
      expect(radioIconWrap).not.toHaveClass('titian-radio-icon-wrap-checked');
    }
    {
      // 再次模拟 label 点击
      await radioLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 label 点击事件后选中状态、因为上一步点击取消选中，这次则为选中状态
      expect(change).toHaveReceivedEventDetail(true);
      // class 判断
      expect(radio).toHaveClass('titian-radio-checked');
      expect(radioIconWrap).toHaveClass('titian-radio-icon-wrap-checked');
    }

    {
      // 模拟 icon 点击
      await radioIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 icon 点击事件后选中状态、因为上一步为点击选中，这次则为取消状态
      expect(change).toHaveReceivedEventDetail(false);

      // class 判断
      expect(radio).not.toHaveClass('titian-radio-checked');
      expect(radioIconWrap).not.toHaveClass('titian-radio-icon-wrap-checked');
    }

    {
      // 再次模拟 icon 点击
      await radioIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 icon 点击事件后选中状态、因为上一步为取消选中状态，这次则为选中状态
      expect(change).toHaveReceivedEventDetail(true);

      // class 判断
      expect(radio).toHaveClass('titian-radio-checked');
      expect(radioIconWrap).toHaveClass('titian-radio-icon-wrap-checked');
    }
  });

  it('禁用全部, 事件无法执行', async () => {
    const page = new PageEl();
    await page.init<JSX.TiRadio>({
      tagName: 'ti-radio',
      props: {
        label: 'radio',
        disabled: true,
      },
    });

    // 根节点查询
    const radio = await page.find('.titian-radio');

    // icon wrap
    const radioIconWrap = await page.find('.titian-radio-icon-wrap');
    // 查找 label 标签
    const radioLabel = await page.find('.titian-radio-label');
    // mock change 事件
    const change = await page.instance.spyOnEvent('change');

    {
      // 初始化 class 判断
      expect(radio).toHaveClass('titian-radio-disabled');
    }
    {
      // 模拟 label 点击
      await radioLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 没有时间抛出
      expect(change).not.toHaveReceivedEvent();
      // class 判断
      expect(radio).toHaveClass('titian-radio-disabled');
    }
    {
      // 模拟 icon 点击
      await radioIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 icon 点击事件后选中状态、因为上一步为点击选中，这次则为取消状态
      expect(change).not.toHaveReceivedEvent();
      // class 判断
      expect(radio).toHaveClass('titian-radio-disabled');
    }
  });

  it('禁用 label 点击, label事件无法执行, icon事件可以执行', async () => {
    const page = new PageEl();
    await page.init<JSX.TiRadio>({
      tagName: 'ti-radio',
      props: {
        label: 'radio',
        labelDisabled: true,
      },
    });

    // 根节点查询
    const radio = await page.find('.titian-radio');

    // icon wrap
    const radioIconWrap = await page.find('.titian-radio-icon-wrap');
    // 查找 label 标签
    const radioLabel = await page.find('.titian-radio-label');
    // mock change 事件
    const change = await page.instance.spyOnEvent('change');

    {
      // 初始化 class 判断
      expect(radio).not.toHaveClass('titian-radio-disabled');
    }
    {
      // 模拟 label 点击
      await radioLabel.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 没有时间抛出
      expect(change).not.toHaveReceivedEvent();
    }
    {
      // 模拟 icon 点击
      await radioIconWrap.click();
      // 等待 异步事件处理完成
      await page.instance.waitForChanges();
      // 判断 icon 点击事件后选中状态、因为上一步为点击选中，这次则为取消状态
      expect(change).toHaveReceivedEventDetail(true);
    }
  });
});
