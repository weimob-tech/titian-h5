import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiSearch } from '../index';
import { TiIcon } from '../../icon';
import { TestContainer } from '../../common/test/container';
import { sleep } from '../../common/test';

describe('渲染 ti-search', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiSearch],
      template: () => <ti-search />,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('居中模式', async () => {
    const page = await newSpecPage({
      components: [TiSearch],
      template: () => <ti-search center />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-search-virtual-placeholder');
    dom?.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('输入', async () => {
    const page = await newSpecPage({
      components: [TiSearch],
      template: () => <ti-search placeholder="请输入" />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-search-input-host');
    dom?.dispatchEvent(new Event('focus'));
    dom?.dispatchEvent(new CustomEvent('input', { detail: '12' }));
    dom?.dispatchEvent(new CustomEvent('change', { detail: '12' }));
    dom?.dispatchEvent(new CustomEvent('confirm', { detail: '12' }));
    await sleep(1000);
    dom?.dispatchEvent(new CustomEvent('clear'));
    dom?.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('搜索按钮状态', async () => {
    const page = await newSpecPage({
      components: [TiSearch, TestContainer],
      template: () => (
        <test-container>
          <ti-search animation={false} />
          <ti-search always-show-search />
          <ti-search use-search-button={false} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('使用插槽', async () => {
    const page = await newSpecPage({
      components: [TiSearch, TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-search>
            <div slot="prefix">
              <span>请选择</span>
              <ti-icon name="arrow-down" size={32} />
            </div>
            <ti-icon slot="right-icon" name="scan" size={32} />
          </ti-search>
          <ti-search>
            <div slot="prefix">
              <ti-icon name="category" size={42} />
            </div>
            <div slot="suffix">
              <ti-icon name="arrange" size={42} />
            </div>
          </ti-search>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
