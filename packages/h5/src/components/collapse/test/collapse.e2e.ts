import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';
import { sleep } from '../../common/test';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

describe('折叠面板', () => {
  it('触发 switch 方法切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCollapse>({
      tagName: 'ti-collapse',
      props: {
        children: [
          {
            tagName: 'ti-collapse-item',
            props: {
              value: 'a',
              title: 'A',
              children: '- A Content -',
            } as JSX.TiCollapseItem,
          },
          {
            tagName: 'ti-collapse-item',
            props: {
              value: 'b',
              title: 'B',
              children: '- B Content -',
            } as JSX.TiCollapseItem,
          },
        ],
      },
    });
    const collapse = await page.instance.find('ti-collapse');
    const change = await collapse.spyOnEvent('change');
    const close = await collapse.spyOnEvent('close');
    const open = await collapse.spyOnEvent('open');

    const collapseItemWrap = await page.instance.findAll('ti-collapse-item >>> .titian-collapse-item-warp');

    {
      // 展开 第一个
      await collapse.callMethod('switch', 'a', true);
      await page.instance.waitForChanges();
      const style = await collapseItemWrap[0].getComputedStyle();
      // 判断展开高度
      expect(parseInt(style.height) > 0).toBeTruthy();
      expect(open).toHaveReceivedEventDetail('a');
      expect(open).toHaveReceivedEventTimes(1);
      expect(change).toHaveReceivedEventDetail(['a']);
    }

    {
      // 展开 第二个
      await collapse.callMethod('switch', 'b', true);
      await page.instance.waitForChanges();
      const style = await collapseItemWrap[1].getComputedStyle();
      // 判断展开高度
      expect(parseInt(style.height) > 0).toBeTruthy();
      expect(open).toHaveReceivedEventDetail('b');
      expect(open).toHaveReceivedEventTimes(2);
      expect(change).toHaveReceivedEventDetail(['a', 'b']);
    }

    {
      // 关闭 第一个
      await collapse.callMethod('switch', 'a', false);
      await page.instance.waitForChanges();
      await sleep();
      const collapseItemWrap = await page.instance.findAll('ti-collapse-item >>> .titian-collapse-item-warp');
      const style = await collapseItemWrap[0].getComputedStyle();
      // 判断展开高度为 0
      expect(parseInt(style.height)).toBe(0);
      expect(close).toHaveReceivedEventTimes(1);
      expect(close).toHaveReceivedEventDetail('a');
      expect(change).toHaveReceivedEventDetail(['b']);
    }

    {
      // 关闭 第二个
      await collapse.callMethod('switch', 'b', false);
      await page.instance.waitForChanges();
      await sleep();
      const collapseItemWrap = await page.instance.findAll('ti-collapse-item >>> .titian-collapse-item-warp');
      const style = await collapseItemWrap[1].getComputedStyle();
      // 判断展开高度为 0
      expect(parseInt(style.height)).toBe(0);
      expect(close).toHaveReceivedEventTimes(2);
      expect(close).toHaveReceivedEventDetail('b');
      expect(change).toHaveReceivedEventDetail([]);
    }
  });

  it('手风琴模式触发 switch 方法切换', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCollapse>({
      tagName: 'ti-collapse',
      props: {
        repel: true,
        children: [
          {
            tagName: 'ti-collapse-item',
            props: {
              value: 'a',
              title: 'A',
              children: '- A Content -',
            } as JSX.TiCollapseItem,
          },
          {
            tagName: 'ti-collapse-item',
            props: {
              value: 'b',
              title: 'B',
              children: '- B Content -',
            } as JSX.TiCollapseItem,
          },
        ],
      },
    });
    const collapse = await page.instance.find('ti-collapse');
    const change = await collapse.spyOnEvent('change');
    const close = await collapse.spyOnEvent('close');
    const open = await collapse.spyOnEvent('open');

    const collapseItemWrap = await page.instance.findAll('ti-collapse-item >>> .titian-collapse-item-warp');

    {
      // 展开 第一个
      await collapse.callMethod('switch', 'a', true);
      await page.instance.waitForChanges();
      const style = await collapseItemWrap[0].getComputedStyle();
      // 判断展开高度
      expect(parseInt(style.height) > 0).toBeTruthy();
      expect(open).toHaveReceivedEventDetail('a');
      expect(open).toHaveReceivedEventTimes(1);
      expect(change).toHaveReceivedEventDetail('a');
    }

    {
      // 展开 第二个
      await collapse.callMethod('switch', 'b', true);
      await page.instance.waitForChanges();
      expect(open).toHaveReceivedEventDetail('b');
      expect(open).toHaveReceivedEventTimes(2);
      expect(change).toHaveReceivedEventDetail('b');
      await sleep();
      const collapseItemWrap = await page.instance.findAll('ti-collapse-item >>> .titian-collapse-item-warp');
      {
        // 第一个自动关闭
        const style0 = await collapseItemWrap[0].getComputedStyle();
        // 判断展开高度为 0
        expect(parseInt(style0.height)).toBe(0);
      }
      const style = await collapseItemWrap[1].getComputedStyle();
      // 判断展开高度
      expect(parseInt(style.height) > 0).toBeTruthy();
    }

    {
      // 再次展开 第一个
      await collapse.callMethod('switch', 'a', true);
      await page.instance.waitForChanges();
      expect(open).toHaveReceivedEventDetail('a');
      expect(open).toHaveReceivedEventTimes(3);
      expect(change).toHaveReceivedEventDetail('a');
      await sleep();
      const collapseItemWrap = await page.instance.findAll('ti-collapse-item >>> .titian-collapse-item-warp');
      {
        // 第二个自动关闭
        const style1 = await collapseItemWrap[1].getComputedStyle();
        // 判断展开高度为 0
        expect(parseInt(style1.height)).toBe(0);
      }
      const style = await collapseItemWrap[0].getComputedStyle();
      // 判断展开高度
      expect(parseInt(style.height) > 0).toBeTruthy();
    }
  });
});
