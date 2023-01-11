import { PageEl } from '../../common/test/page-el';
import { autoScroll, sleep } from '../../common/test';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

describe('回到顶部', () => {
  it('滚动测试', async () => {
    const page = new PageEl();
    await page.init({
      tagName: 'div',
      props: {
        style: 'height: 2000px',
        children: [
          {
            tagName: 'ti-back-top',
          },
        ],
      },
    });
    const click = await page.instance.spyOnEvent('click');

    const backTop = await page.instance.find('ti-back-top >>> .titian-back-top');
    expect((await backTop.getComputedStyle()).display).toBe('none');

    await autoScroll(page.instance);
    await page.instance.waitForChanges();
    expect((await backTop.getComputedStyle()).display).toBe('flex');

    await backTop.click();
    expect(click).toHaveReceivedEvent();
    await page.instance.waitForChanges();
    await sleep();
    expect((await backTop.getComputedStyle()).display).toBe('none');
  });
});
