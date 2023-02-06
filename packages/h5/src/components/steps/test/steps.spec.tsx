import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiSteps } from '../index';
const options = [
  {
    title: '标题文字',
    subtitle: '副标题',
    description: '详细内容文字，详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
  },
  {
    title: '标题文字',
    subtitle: '副标题',
    description: '详细内容文字，详细内容文字，详细内容文字',
    time: '2018.07.06 09:52:42',
  },
];
describe('渲染 ti-steps', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiSteps],
      template: () => <ti-steps options={options} current={0} />,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('设置副标题右对齐', async () => {
    const page = await newSpecPage({
      components: [TiSteps],
      template: () => <ti-steps options={options} current={0} subtitle-align="right" />,
    });
    expect(page.root).toMatchSnapshot();
  });
});
