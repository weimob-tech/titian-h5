import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiLoading } from '..';
import { TestContainer } from '../../common/test/container';

describe('渲染加载中组件', () => {
  it('基本使用', async () => {
    const page = await newSpecPage({
      components: [TiLoading, TestContainer],
      template: () => (
        <test-container>
          <ti-loading />
          <ti-loading mode="circular" />
          <ti-loading mode="spinner" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('自定义加载颜色, 尺寸', async () => {
    const page = await newSpecPage({
      components: [TiLoading, TestContainer],
      template: () => (
        <test-container>
          <ti-loading color="#ff0000" mode="circular" />
          <ti-loading color="#ff0000" mode="spinner" />
          <ti-loading mode="circular" size={108} />
          <ti-loading mode="spinner" size={108} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('添加文字', async () => {
    const page = await newSpecPage({
      components: [TiLoading, TestContainer],
      template: () => (
        <test-container>
          <ti-loading mode="circular" text="loading..." />
          <ti-loading mode="spinner" text="loading..." />
          <ti-loading color="#ff0000" mode="circular" text="loading..." />
          <ti-loading color="#ff0000" mode="spinner" text="loading..." />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
