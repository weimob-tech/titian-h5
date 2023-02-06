import { TiCollapse } from '../index';
import { h } from '@stencil/core';
import * as utils from '../../common/utils';
import { TiCollapseItem } from '../../collapse-item';
import { newSpecPage } from '@stencil/core/testing';
import { TiCell } from '../../cell';

describe('渲染collapse', () => {
  beforeAll(() => {
    jest.spyOn<any, string>(utils, 'getBoundingClientRect').mockReturnValue({ height: 200 });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse>
          <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('有分割线', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse>
          <ti-collapse-item divider title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('单独使用collapse item', async () => {
    const page = await newSpecPage({
      components: [TiCollapseItem],
      template: () => (
        <ti-collapse-item divider title="标题文字A">
          - 标题A下的内容 -
        </ti-collapse-item>
      ),
    });
    await page.root.updateDataFromParent();
    expect(page.root).toMatchSnapshot();
  });

  it('基本渲染 手风琴', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse repel>
          <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('基本展开渲染', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse value="1">
          <ti-collapse-item value="0" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="1" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('统一设置图标', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse icon="share-wechat-moments">
          <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('单独设置图标', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse>
          <ti-collapse-item icon="share-wechat-moments" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('统一设置右图标', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse rightIcon="share-wechat-moments">
          <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('单独设置右图标', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse>
          <ti-collapse-item rightIcon="share-wechat-moments" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('禁用全部面板', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse disabled>
          <ti-collapse-item title="标题文字A">- 标题A下的内容 -</ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('禁用单个面板', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse>
          <ti-collapse-item disabled title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item title="标题文字B">- 标题B下的内容 -</ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('展开多个', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse value={['a', 'b']}>
          <ti-collapse-item value="a" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="b" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('手风琴模式下，当value为数组时，选第一个', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse repel value={['a', 'b']}>
          <ti-collapse-item value="a" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="b" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('主动切换', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse>
          <ti-collapse-item value="a" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="b" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot('主动切换前');
    await page.root.switch('a', true);
    await page.waitForChanges();
    // 这里有渲染 BUG
    expect(page.root).toMatchSnapshot('主动切换后，打开第一个面板');

    await page.root.switch('a', false);
    await page.waitForChanges();
    // 这里有渲染 BUG
    expect(page.root).toMatchSnapshot('主动切换后，关闭第一个面板');
  });

  it('主动切换手风琴模式', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCollapseItem],
      template: () => (
        <ti-collapse repel>
          <ti-collapse-item value="a" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="b" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    expect(page.root).toMatchSnapshot('主动切换前');
    await page.root.switch('a', true);
    await page.waitForChanges();
    // 这里有渲染 BUG
    expect(page.root).toMatchSnapshot('主动切换后，打开第一个面板');
  });

  it('点击标题切换', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCell, TiCollapseItem],
      template: () => (
        <ti-collapse repel>
          <ti-collapse-item value="a" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="b" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    const cellWrap = page.root.querySelector('ti-collapse-item').shadowRoot.querySelector('ti-cell');
    cellWrap.click();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot('点击打开');
  });

  it('禁用点击无效', async () => {
    const page = await newSpecPage({
      components: [TiCollapse, TiCell, TiCollapseItem],
      template: () => (
        <ti-collapse repel>
          <ti-collapse-item disabled value="a" title="标题文字A">
            - 标题A下的内容 -
          </ti-collapse-item>
          <ti-collapse-item value="b" title="标题文字B">
            - 标题B下的内容 -
          </ti-collapse-item>
        </ti-collapse>
      ),
    });
    const cellWrap = page.root.querySelector('ti-collapse-item').shadowRoot.querySelector('ti-cell');
    cellWrap.click();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot('点击打开');
  });
});
