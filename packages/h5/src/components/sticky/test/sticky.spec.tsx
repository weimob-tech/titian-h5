import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiSticky } from '../index';

describe('渲染 ti-sticky', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiSticky],
      template: () => (
        <ti-sticky>
          <div>吸顶元素</div>
        </ti-sticky>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
