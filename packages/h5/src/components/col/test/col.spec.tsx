import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiCol } from '../index';
import { TiRow } from '../../row';

describe('渲染布局组件', () => {
  it('基本渲染 span 24', async () => {
    const page = await newSpecPage({
      components: [TiCol, TiRow],
      template: () => (
        <ti-row>
          <ti-col span={24}>span-24</ti-col>
        </ti-row>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('基本渲染 span 12', async () => {
    const page = await newSpecPage({
      components: [TiCol, TiRow],
      template: () => (
        <ti-row>
          <ti-col span={12}>span-12</ti-col>
          <ti-col span={12}>span-12</ti-col>
        </ti-row>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('间距渲染 span 12, gutter 16', async () => {
    const page = await newSpecPage({
      components: [TiCol, TiRow],
      template: () => (
        <ti-row gutter={16}>
          <ti-col span={12}>span-12</ti-col>
          <ti-col span={12}>span-12</ti-col>
        </ti-row>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('偏移量渲染 span 12, offset 12', async () => {
    const page = await newSpecPage({
      components: [TiCol, TiRow],
      template: () => (
        <ti-row>
          <ti-col span={12} offset={12}>
            span-12
          </ti-col>
        </ti-row>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('单独 col', async () => {
    const page = await newSpecPage({
      components: [TiCol, TiRow],
      template: () => <ti-col span={12}>span-12</ti-col>,
    });
    expect(page.root).toMatchSnapshot();
  });
});
