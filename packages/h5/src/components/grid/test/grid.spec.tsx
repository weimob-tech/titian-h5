import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiGrid } from '../index';
import { TiGridItem } from '../../grid-item';

describe('渲染宫格组件', () => {
  it('基本使用', async () => {
    const page = await newSpecPage({
      components: [TiGrid, TiGridItem],
      template: () => (
        <ti-grid>
          <ti-grid-item extClass="custom-item" icon="mine-to-pay" text="待付款" />
          <ti-grid-item icon="to-deliver" text="待收货" />
          <ti-grid-item icon="to-receive" text="待发货" />
          <ti-grid-item icon="to-comment" text="待评价" />
        </ti-grid>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('自定义每行个数', async () => {
    const page = await newSpecPage({
      components: [TiGrid, TiGridItem],
      template: () => (
        <ti-grid columns={3}>
          <ti-grid-item icon="mine-to-pay" text="待付款" />
          <ti-grid-item icon="to-deliver" text="待收货" />
          <ti-grid-item icon="to-receive" text="待发货" />
          <ti-grid-item icon="to-comment" text="待评价" />
          <ti-grid-item icon="to-refund" text="退货" />
          <ti-grid-item icon="camera-point" text="拍照展示" />
        </ti-grid>
      ),
    });
    expect(page.root).toMatchSnapshot();
    page.root.setAttribute('columns', '4');
  });

  it('设置宫格间距离', async () => {
    const page = await newSpecPage({
      components: [TiGrid, TiGridItem],
      template: () => (
        <ti-grid gutter={16}>
          <ti-grid-item icon="mine-to-pay" text="待付款" />
          <ti-grid-item icon="to-deliver" text="待收货" />
          <ti-grid-item icon="to-receive" text="待发货" />
          <ti-grid-item icon="to-comment" text="待评价" />
        </ti-grid>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('自适应展示正方型', async () => {
    const page = await newSpecPage({
      components: [TiGrid, TiGridItem],
      template: () => (
        <ti-grid square>
          <ti-grid-item icon="mine-to-pay" text="待付款" />
          <ti-grid-item icon="to-deliver" text="待收货" />
          <ti-grid-item icon="to-receive" text="待发货" />
          <ti-grid-item icon="to-comment" text="待评价" />
          <ti-grid-item icon="to-refund" text="退货" />
          <ti-grid-item icon="camera-point" text="拍照展示" />
          <ti-grid-item icon="to-deliver" text="待收货" />
          <ti-grid-item icon="to-receive" text="待发货" />
        </ti-grid>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('自定义图标尺寸，颜色', async () => {
    const page = await newSpecPage({
      components: [TiGrid, TiGridItem],
      template: () => (
        <ti-grid title="自定义图标尺寸，颜色">
          <ti-grid-item icon="mine-to-pay" size={60} text="图标尺寸" />
          <ti-grid-item icon="to-deliver" color="red" text="定义颜色" />
          <ti-grid-item icon="to-receive" text="待发货" />
          <ti-grid-item icon="to-comment" text="待评价" />
          <ti-grid-item icon="to-refund" text="退货" />
        </ti-grid>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('使用 slot 定义内容', async () => {
    const page = await newSpecPage({
      components: [TiGrid, TiGridItem],
      template: () => (
        <ti-grid title="使用 slot 定义内容">
          <ti-grid-item custom-content>
            <div slot="content">待付款</div>
          </ti-grid-item>
          <ti-grid-item>
            <div slot="icon"></div>
            <div slot="text">待收货</div>
          </ti-grid-item>
          <ti-grid-item custom-content>
            <div slot="content">待发货</div>
          </ti-grid-item>
          <ti-grid-item custom-content>
            <div slot="content">待评价</div>
          </ti-grid-item>
        </ti-grid>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
