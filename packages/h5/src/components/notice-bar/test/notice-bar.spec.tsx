import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiNoticeBar } from '../index';
// import { TiPopup } from '../../popup';
// import { TestContainer } from '../../common/test/container';

describe('渲染 ti-notice-bar', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiNoticeBar],
      template: () => <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" />,
    });
    page.root.setAttribute('variant', 'vertical');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  // it('纵向滚动', async () => {
  //   const page = await newSpecPage({
  //     components: [TiNoticeBar],
  //     template: () => <ti-notice-bar content={['内容1', '内容2']} variant="vertical" />,
  //   });
  //   expect(page.root).toMatchSnapshot();
  // });
  // it('滚动速度', async () => {
  //   const page = await newSpecPage({
  //     components: [TiNoticeBar],
  //     template: () => (
  //       <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" speed={100} />
  //     ),
  //   });
  //   expect(page.root).toMatchSnapshot();
  // });
  // it('内容超出后显示方式', async () => {
  //   const page = await newSpecPage({
  //     components: [TiNoticeBar, TestContainer],
  //     template: () => (
  //       <test-container>
  //         <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" text-mode="auto" />
  //         <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" text-mode="wrap" />
  //         <ti-notice-bar
  //           content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字"
  //           text-mode="ellipsis"
  //         />
  //         <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" text-mode="clip" />
  //       </test-container>
  //     ),
  //   });
  //   expect(page.root).toMatchSnapshot();
  // });
  // it('动态改变variant', async () => {
  //   const page = await newSpecPage({
  //     components: [TiNoticeBar],
  //     template: () => <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" />,
  //   });
  //   page.root.setAttribute('variant', 'vertical');
  //   await page.waitForChanges();
  //   expect(page.root).toMatchSnapshot();
  // });

  // it('动态改变scrollable', async () => {
  //   const page = await newSpecPage({
  //     components: [TiNoticeBar],
  //     template: () => <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" />,
  //   });
  //   page.root.setAttribute('scrollable', 'false');
  //   page.root.setAttribute('color', 'orange');
  //   await page.waitForChanges();
  //   expect(page.root).toMatchSnapshot();
  // });

  // it('在popup中使用', async () => {
  //   const page = await newSpecPage({
  //     components: [TiNoticeBar, TiPopup],
  //     template: () => (
  //       <ti-popup>
  //         <ti-notice-bar content="内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字" />,
  //       </ti-popup>
  //     ),
  //   });
  //   page.root.setAttribute('visible', 'true');
  //   await page.waitForChanges();
  //   expect(page.root).toMatchSnapshot();
  // });
});
