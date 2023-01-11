import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiPreview } from '../index';

describe('渲染 ti-preview', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiPreview],
      template: () => <ti-preview></ti-preview>,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('隐藏页码', async () => {
    const page = await newSpecPage({
      components: [TiPreview],
      template: () => <ti-preview displayNumber={false}></ti-preview>,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('隐藏标题', async () => {
    const page = await newSpecPage({
      components: [TiPreview],
      template: () => <ti-preview displayTitle={false}></ti-preview>,
    });
    expect(page.root).toMatchSnapshot();
  });
});
