import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiDivider } from '../index';
import { TestContainer } from '../../common/test/container';

describe('渲染 ti-divider', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiDivider, TestContainer],
      template: () => (
        <test-container>
          <ti-divider>实线</ti-divider>
          <ti-divider dashed>虚线</ti-divider>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('文字对齐方式', async () => {
    const page = await newSpecPage({
      components: [TiDivider, TestContainer],
      template: () => (
        <test-container>
          <ti-divider text-align="left">居左</ti-divider>
          <ti-divider text-align="center">居中</ti-divider>
          <ti-divider text-align="right">居右</ti-divider>
          <ti-divider text-align="">居右</ti-divider>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('分割线颜色', async () => {
    const page = await newSpecPage({
      components: [TiDivider, TestContainer],
      template: () => (
        <test-container>
          <ti-divider color="red">整体红色</ti-divider>
          <ti-divider border-color="blue">分割线蓝色</ti-divider>
          <ti-divider color="red" border-color="blue">
            文字红色、分割线蓝色
          </ti-divider>
          <ti-divider border-color="linear-gradient(to right, #fff 0%, #FFBE70 100%)" border-width={6}>
            线性渐变（默认对称）
          </ti-divider>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('分割线厚度', async () => {
    const page = await newSpecPage({
      components: [TiDivider, TestContainer],
      template: () => (
        <test-container>
          <ti-divider border-width={6}>分割线厚度</ti-divider>
          <ti-divider hairline>分割线厚度</ti-divider>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('分割线方向', async () => {
    const page = await newSpecPage({
      components: [TiDivider, TestContainer],
      template: () => (
        <test-container>
          <ti-divider orientation="horizontal">横向</ti-divider>
          <ti-divider orientation="vertical">纵向</ti-divider>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
