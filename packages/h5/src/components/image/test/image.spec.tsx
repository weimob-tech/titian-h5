import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiImage } from '../index';
import { TestContainer } from '../../common/test/container';
import { sleep } from '../../common/test';

const src = 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png';
describe('渲染 ti-image', () => {
  it('填充模式', async () => {
    const page = await newSpecPage({
      components: [TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-image mode="contain" width="180" height="180" src={src} />
          <ti-image mode="cover" width="180" height="180" src={src} />
          <ti-image mode="fill" width="180" height="180" src={src} />
          <ti-image mode="none" width="180" height="180" src={src} />
          <ti-image mode="scaleDown" width="180" height="180" src={src} />
        </test-container>
      ),
    });
    await page.waitForChanges();
    const image = page.root.querySelector('ti-image').shadowRoot.querySelector<HTMLImageElement>('img');
    image.dispatchEvent(new Event('load'));

    expect(page.root).toMatchSnapshot();
  });

  it('自定义圆角', async () => {
    const page = await newSpecPage({
      components: [TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-image radius="18" width="100" height="100" src={src} />
          <ti-image radius="100%" width="100" height="100" src={src} />
          <ti-image useGlobalStyle width="100" height="100" src={src} />
        </test-container>
      ),
    });
    const image = page.root.querySelector('ti-image').shadowRoot.querySelector<HTMLImageElement>('img');
    image.dispatchEvent(new Event('error'));
    expect(page.root).toMatchSnapshot();
  });

  it('懒加载', async () => {
    const page = await newSpecPage({
      components: [TiImage],
      template: () => (
        <div id="zy-view">
          <div style={{ height: '200vh' }}></div>
          <ti-image lazyLoad src="https://image-c-dev.weimobwmc.com/qa-On6X/330f19549ea34f97a0851db8ae5187a4.jpg" />
        </div>
      ),
    });
    await sleep(1000);
    page.win.scrollTo({ top: 10000 });
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    jest.resetAllMocks();
  });

  it('图片比例', async () => {
    const page = await newSpecPage({
      components: [TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-image aspectRatio={2} src={src} />
          <ti-image aspectRatio="inherit" src={src} />
          <ti-image aspectRatio={2} height={100} src={src} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('加载中提示', async () => {
    const iconName = 'default-pic';
    const page = await newSpecPage({
      components: [TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-image loadingIcon={iconName} src={src} />
          <ti-image src={src}>
            <div slot="loading" />
          </ti-image>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('加载失败提示', async () => {
    const iconName = 'default-pic';
    const errSrc = 'https://cdn2.weimob.com/saas/assets/images/a.jpg';
    const page = await newSpecPage({
      components: [TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-image errorIcon={iconName} src={errSrc} />
          <ti-image src={errSrc}>
            <div slot="error" />
          </ti-image>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('动态改变color', async () => {
    const page = await newSpecPage({
      components: [TiImage],
      template: () => <ti-image src={src} />,
    });
    page.root.setAttribute('src', 'https://res.wx.qq.com/wxdoc/dist/assets/img/0.4cb08bb4.jpg');

    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('touch事件', async () => {
    const page = await newSpecPage({
      components: [TiImage],
      template: () => <ti-image src={src} />,
    });
    page.root.click();
    const dom = page.root.shadowRoot.querySelector('.titian-image');
    dom?.dispatchEvent(new Event('touchStart', {}));
    await sleep(1000);
    dom?.dispatchEvent(new Event('touchEnd', {}));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
