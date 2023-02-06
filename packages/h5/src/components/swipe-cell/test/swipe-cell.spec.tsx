import { h } from '@stencil/core';
import * as utils from '../../common/utils';
import { newSpecPage } from '@stencil/core/testing';
import { TiSwipeCell } from '..';
import { MockTouchEvent, sleep } from '../../common/test';

describe('渲染 swipe-cell', () => {
  beforeAll(() => {
    jest.spyOn<any, string>(utils, 'getBoundingClientRect').mockReturnValue({ width: 200 });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  function move(cell: HTMLDivElement, step: number) {
    cell.dispatchEvent(new MockTouchEvent('touchstart', 0));
    cell.dispatchEvent(new MockTouchEvent('touchmove', step));
    cell.dispatchEvent(new MockTouchEvent('touchend', step));
  }

  it('基本渲染+移动', async () => {
    const open = jest.fn();
    const close = jest.fn();
    const click = jest.fn();
    const page = await newSpecPage({
      components: [TiSwipeCell],
      template: () => (
        <ti-swipe-cell left-width={200} right-width={200} onOpen={open} onClose={close} onTiClick={click}>
          <div>基本模式</div>
          <div class="left" slot="left" style={{ width: '200px' }}>
            left
          </div>
          <div class="right" slot="right" style={{ width: '200px' }}>
            right
          </div>
        </ti-swipe-cell>
      ),
    });
    await sleep();
    const cell = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell');

    // 向右滑开
    move(cell, 200);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot('第一次向右滑开');
    expect(open).toBeCalled();
    expect(open.mock.lastCall[0].detail?.position).toBe('left');
    // 向左关闭
    move(cell, -150);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot('第一次向左关闭');
    expect(close).toBeCalled();
    expect(close.mock.lastCall[0].detail?.position).toBe('left');

    // 向左滑开
    move(cell, -150);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot('第二次向左滑开');
    // 向右关闭
    move(cell, 150);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot('第二次向右关闭');

    {
      // 点击 document 关闭移动
      // 向左打开
      move(cell, 150);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击 document 前向左打开');
      page.doc.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击 document 后向右关闭');
      expect(click).toBeCalledTimes(1);
      expect(click.mock.lastCall[0].detail).toBe('outside');
    }

    {
      // 点击左侧
      const leftCell = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell-left');
      move(cell, 150);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击左侧前向右滑动，左侧打开');
      leftCell.click();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击左侧后左侧关闭');
      expect(click).toBeCalledTimes(2);
      expect(click.mock.lastCall[0].detail).toBe('left');
    }

    {
      // 点击右侧
      const rightCell = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell-right');
      move(cell, -150);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击右侧前向右滑动，右侧打开');
      rightCell.click();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击右侧后右侧关闭');
      expect(click).toBeCalledTimes(3);
      expect(click.mock.lastCall[0].detail).toBe('right');
    }

    {
      // 中间点击
      const contentCell = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell-content');
      move(cell, -150);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击右侧前向右滑动，右侧打开');
      contentCell.click();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('点击右侧后右侧关闭');
      expect(click).toBeCalledTimes(4);
      expect(click.mock.lastCall[0].detail).toBe('cell');
    }
    {
      // 右侧宽度变化
      page.root.setAttribute('right-width', '150');
      await page.waitForChanges();

      move(cell, -200);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('右侧宽度变化后，右侧展开');
      move(cell, 200); // 复原
      page.root.setAttribute('right-width', '200');
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('右侧宽度变化结束');
      await sleep();
    }

    {
      // 左侧宽度变化
      page.root.setAttribute('left-width', '150');
      await page.waitForChanges();

      move(cell, 200);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变化后，左侧展开');
      page.root.setAttribute('left-width', '200');
      move(cell, -200);

      await page.waitForChanges();
    }

    {
      // visible
      page.root.setAttribute('visible', 'true');
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('visible 控制打开');

      page.root.setAttribute('visible', 'false');
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('visible 控制关闭');
    }

    {
      // 模拟点击而非 move
      cell.dispatchEvent(new MockTouchEvent('touchstart', 0));
      cell.dispatchEvent(new MockTouchEvent('touchend', 100));
    }
  });

  it('左右宽度变化', async () => {
    const page = await newSpecPage({
      components: [TiSwipeCell],
      template: () => (
        <ti-swipe-cell left-width={200} right-width={200}>
          <div>基本模式</div>
          <div class="left" slot="left" style={{ width: '200px' }}>
            left
          </div>
          <div class="right" slot="right" style={{ width: '200px' }}>
            right
          </div>
        </ti-swipe-cell>
      ),
    });
    await sleep();
    const cell = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell');

    {
      move(cell, -200);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('右侧宽度变化时右侧在打开状态后，右侧先展开');
      // 右侧宽度变化的时候右侧在打开
      page.root.setAttribute('right-width', '150');
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('右侧宽度变化时右侧在打开状态后，右侧变化');
      page.root.setAttribute('right-width', '200');
      await page.waitForChanges();
      // 复原
      page.doc.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('右侧宽度变化时右侧在打开状态后，右侧结束');
    }

    {
      move(cell, 200);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变化时左侧在打开状态后，左侧先展开');
      // 右侧宽度变化的时候右侧在打开
      page.root.setAttribute('left-width', '150');
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变化时左侧在打开状态后，左侧变化');
      page.root.setAttribute('left-width', '200');
      await page.waitForChanges();
      // 复原
      page.doc.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变化时左侧在打开状态后，左侧结束');
    }

    {
      move(cell, 200);
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变为0左侧在打开状态后，左侧先展开');
      // 右侧宽度变化的时候右侧在打开
      page.root.setAttribute('left-width', '0');
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变变为0左侧在打开状态后，左侧变化');
      page.root.setAttribute('left-width', '200');
      await page.waitForChanges();
      // 复原
      page.doc.dispatchEvent(new Event('click'));
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot('左侧宽度变变为0左侧在打开状态后，左侧结束');
    }
  });

  it('没有移动时点击', async () => {
    const page = await newSpecPage({
      components: [TiSwipeCell],
      template: () => (
        <ti-swipe-cell left-width={200} right-width={200}>
          <div>基本模式</div>
          <div class="left" slot="left" style={{ width: '200px' }}>
            left
          </div>
          <div class="right" slot="right" style={{ width: '200px' }}>
            right
          </div>
        </ti-swipe-cell>
      ),
    });
    page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell-right').click();
  });

  it('aaa', async () => {
    const page = await newSpecPage({
      components: [TiSwipeCell],
      template: () => (
        <ti-swipe-cell left-width={200} right-width={200}>
          <div>基本模式</div>
          <div class="left" slot="left" style={{ width: '200px' }}>
            left
          </div>
          <div class="right" slot="right" style={{ width: '200px' }}>
            right
          </div>
        </ti-swipe-cell>
      ),
    });
    page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-swipe-cell-right').click();
  });
});
