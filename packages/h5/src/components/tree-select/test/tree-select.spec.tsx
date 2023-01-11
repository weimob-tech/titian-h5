import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiTreeSelect } from '../index';
describe('渲染 ti-steps', () => {
  it('基本用法', async () => {
    const options = [
      {
        name: '侧边导航',
        id: 'a1',
        list: [
          { name: '标题文字', id: 'a1-1' },
          { name: '标题文字', id: 'a1-2' },
        ],
      },
    ];
    const alias = { label: 'name', value: 'id', children: 'list' };
    const page = await newSpecPage({
      components: [TiTreeSelect],
      template: () => <ti-tree-select options={options} alias={alias} />,
    });
    expect(page.root).toMatchSnapshot();
  });
});
