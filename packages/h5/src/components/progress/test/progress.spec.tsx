import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiProgress } from '..';
import { TestContainer } from '../../common/test/container';

describe('进度条', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiProgress, TestContainer],
      template: () => (
        <test-container>
          <ti-progress />
          <ti-progress value={80} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('设置缓冲值', async () => {
    const page = await newSpecPage({
      components: [TiProgress],
      template: () => <ti-progress value={60} buffer={80} />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('设置进度条宽度', async () => {
    const page = await newSpecPage({
      components: [TiProgress],
      template: () => <ti-progress value={60} strokeWidth={20} />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('修改展示进度值、颜色等', async () => {
    const gradientColor = {
      from: '#108ee9',
      to: '#87d068',
    };

    const page = await newSpecPage({
      components: [TiProgress, TestContainer],
      template: () => (
        <test-container>
          <ti-progress value={60} strokeWidth={20} />
          <ti-progress value={80} color="#2a6ae9" />
          <ti-progress value={80} color="rgba(0,0,0,1)" />
          <ti-progress value={80} color="rgba(0,0,0,1)" gradientColor={gradientColor} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('展示进度值', async () => {
    const page = await newSpecPage({
      components: [TiProgress],
      template: () => <ti-progress value={80} color="#2a6ae9" showProgress />,
    });
    expect(page.root).toMatchSnapshot();
  });
});
