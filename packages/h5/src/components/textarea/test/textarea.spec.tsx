import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiTextarea } from '../index';
import { TestContainer } from '../../common/test/container';

describe('渲染 ti-steps', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiTextarea, TestContainer],
      template: () => (
        <test-conatiner>
          <ti-textarea placeholder="请输入评论文字，限200字以内…" />
          <ti-textarea auto-height />
          <ti-textarea show-count />
        </test-conatiner>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
