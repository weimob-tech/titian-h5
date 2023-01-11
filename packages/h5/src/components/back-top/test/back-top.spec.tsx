import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiBackTop } from '..';
import { sleep } from '../../common/test';
import { TestContainer } from '../../common/test/container';
import * as scroll from '../../common/utils/scroll';

describe('渲染回到顶部', () => {
  beforeAll(() => {
    jest.spyOn(scroll, 'getScroll').mockReturnValue(1000);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
  it('简单使用', async () => {
    const page = await newSpecPage({
      components: [TiBackTop, TestContainer],
      template: () => (
        <test-container>
          <div style={{ height: '2000px' }}>
            <ti-back-top />
          </div>
        </test-container>
      ),
    });

    const backTopEl = page.root.querySelector('ti-back-top');
    const backTop = backTopEl.shadowRoot.querySelector<HTMLDivElement>('.titian-back-top');

    backTop.ownerDocument.dispatchEvent(new Event('scroll'));

    backTopEl.setAttribute('extCss', '.a {background: red}');
    await page.waitForChanges();
    await sleep();
    expect(page.root).toMatchSnapshot();

    backTop.click();
    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it('使用时展示回到顶部文字', async () => {
    const page = await newSpecPage({
      components: [TiBackTop, TestContainer],
      template: () => (
        <test-container>
          <div style={{ height: '2000px' }}>
            <ti-back-top text="顶部" />
          </div>
        </test-container>
      ),
    });

    page.win.scrollTo({ top: 1000 });
    await page.waitForChanges();
    await sleep(3000);

    expect(page.root).toMatchSnapshot();
  });

  it('删除节点，移除点击事件', async () => {
    const page = await newSpecPage({
      components: [TiBackTop, TestContainer],
      template: () => (
        <test-container>
          <ti-back-top text="顶部" />
        </test-container>
      ),
    });
    const backTopEl = page.root.querySelector('ti-back-top');

    page.root.removeChild(backTopEl);

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
