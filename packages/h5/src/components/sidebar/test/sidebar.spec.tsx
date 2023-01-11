import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiSidebar } from '../index';
import { TiSidebarItem } from '../../sidebar-item';
describe('渲染 ti-sidebar', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiSidebar, TiSidebarItem],
      template: () => (
        <ti-sidebar active-index={1}>
          <ti-sidebar-item label="侧边导航" badge="1" />
          <ti-sidebar-item label="IP联名款" />
          <ti-sidebar-item label="精选系列" disabled />
        </ti-sidebar>
      ),
    });
    page.root.setAttribute('active-index', '2');
    const dom = page.root
      .querySelector<HTMLElement>('ti-sidebar-item')
      .shadowRoot.querySelector('.titian-sidebar-item');
    dom?.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
