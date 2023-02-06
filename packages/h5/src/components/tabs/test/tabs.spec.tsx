import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiTabs } from '../index';
describe('渲染 ti-steps', () => {
  it('基本用法', async () => {
    const tabs = ['首页', '商品列表', '购物车', '个人中心'];
    const page = await newSpecPage({
      components: [TiTabs],
      template: () => <ti-tabs tabs={tabs} />,
    });
    expect(page.root).toMatchSnapshot();
  });
});
