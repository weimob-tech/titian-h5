import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiTooltip } from '../index';
import { TestContainer } from '../../common/test/container';

describe('渲染 ti-tooltip', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiTooltip],
      template: () => (
        <ti-tooltip content="提示文字提示文字提示文字">
          <span>按钮</span>
        </ti-tooltip>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('提示方向', async () => {
    const page = await newSpecPage({
      components: [TiTooltip, TestContainer],
      template: () => (
        <test-container>
          <ti-tooltip direction="top" content="提示文字提示文字提示文字">
            <span>按钮</span>
          </ti-tooltip>
          <ti-tooltip direction="bottom" content="提示文字提示文字提示文字">
            <span>按钮</span>
          </ti-tooltip>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('提示点击关闭', async () => {
    const page = await newSpecPage({
      components: [TiTooltip],
      template: () => (
        <ti-tooltip closeOnClick={true} content="提示文字提示文字提示文字">
          <span>按钮</span>
        </ti-tooltip>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
