import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiButton } from '../index';
import { TestContainer } from '../../common/test/container';

describe('渲染 ti-button', () => {
  it('按钮类型', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button type="primary">默认</ti-button>
          <ti-button type="warning">警告</ti-button>
          <ti-button type="success">成功</ti-button>
          <ti-button type="error">错误</ti-button>
          <ti-button type="info">信息</ti-button>
          <ti-button type="simple">灰色调</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('按钮类型', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button variant="contained">面性强调</ti-button>
          <ti-button variant="filled">面性次要</ti-button>
          <ti-button variant="outlined">线框按钮</ti-button>
          <ti-button variant="outlined" type="simple">
            灰色调线框按钮
          </ti-button>
          <ti-button variant="text">文字按钮</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('按钮尺寸', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button size="tiny">高度48rpx</ti-button>
          <ti-button size="small">高度56rpx</ti-button>
          <ti-button size="medium">高度64rpx</ti-button>
          <ti-button size="big">高度80rpx</ti-button>
          <ti-button size="large">高度96rpx</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('按钮颜色', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button variant="filled" color="#7232dd">
            确定
          </ti-button>
          <ti-button color="blue">确定</ti-button>
          <ti-button variant="outlined" color="blue">
            确定
          </ti-button>
          <ti-button color="rgb(7, 193, 96)">确定</ti-button>
          <ti-button variant="filled" color="rgba(7, 193, 96, 0.5)">
            确定
          </ti-button>
          <ti-button color="linear-gradient(to right, #4bb0ff, #6149f6)">渐变按钮</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('按钮圆角', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button shape="capsule">胶囊按钮</ti-button>
          <ti-button shape="round">默认圆角按钮</ti-button>
          <ti-button shape="rect">直角按钮</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('按钮边框、禁用', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <ti-button variant="outlined" hairline>
          一像素边框
        </ti-button>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('块级按钮', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button block>块级</ti-button>
          <ti-button ext-style="width: 200rpx">定宽</ti-button>
          <ti-button>自适应宽度</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('搭配图标', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button prefix-icon="home">左图标</ti-button>
          <ti-button suffix-icon="arrow-right">有图标</ti-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('加载状态', async () => {
    const page = await newSpecPage({
      components: [TiButton, TestContainer],
      template: () => (
        <test-container>
          <ti-button loading />
          <ti-button loading loading-size="{{46}}">
            提交
          </ti-button>
          <ti-button loading-type="spinner" loading />
          <ti-button loading-text="加载中" loading />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('动态改变color', async () => {
    const color = 'orange';
    const page = await newSpecPage({
      components: [TiButton],
      template: () => <ti-button color={color}>确定</ti-button>,
    });
    page.root.setAttribute('color', 'red');

    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('改变extCss', async () => {
    const extCss = 'my-class';
    const extClass = '.my-class {width: 50px}';
    const page = await newSpecPage({
      components: [TiButton],
      template: () => (
        <ti-button ext-class={extClass} ext-css={extCss}>
          确定
        </ti-button>
      ),
    });

    page.root.setAttribute('ext-css', '.my-class {width: 100px}');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('disabled状态点击', async () => {
    const page = await newSpecPage({
      components: [TiButton],
      template: () => <ti-button disabled>确定</ti-button>,
    });
    const elm = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-button');
    elm.click();
  });
  it('loading状态点击', async () => {
    const page = await newSpecPage({
      components: [TiButton],
      template: () => <ti-button loading>确定</ti-button>,
    });
    const elm = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-button');
    elm.click();
  });
});
