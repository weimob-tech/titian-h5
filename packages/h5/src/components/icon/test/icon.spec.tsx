import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiIcon } from '../index';
import { TestContainer } from '../../common/test/container';

describe('渲染 ti-icon', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-icon name="close"></ti-icon>
          <ti-icon name="plus"></ti-icon>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('图标大小', async () => {
    const page = await newSpecPage({
      components: [TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-icon size={20} name="plus"></ti-icon>
          <ti-icon size={40} name="plus"></ti-icon>
          <ti-icon size={60} name="plus"></ti-icon>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('图标颜色', async () => {
    const page = await newSpecPage({
      components: [TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-icon color="red" name="plus"></ti-icon>
          <ti-icon color="blue" name="plus"></ti-icon>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('图标加载', async () => {
    const page = await newSpecPage({
      components: [TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-icon name="close"></ti-icon>
          <ti-icon name="plus"></ti-icon>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('图标圆角', async () => {
    const page = await newSpecPage({
      components: [TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-icon rotate={20} name="plus"></ti-icon>
          <ti-icon rotate={40} name="plus"></ti-icon>
          <ti-icon rotate={60} name="plus"></ti-icon>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('图标风格', async () => {
    const page = await newSpecPage({
      components: [TiIcon, TestContainer],
      template: () => (
        <test-container>
          <ti-icon name="plus"></ti-icon>
          <ti-icon icon-style="lovely" name="plus"></ti-icon>
          <ti-icon icon-style="popular" name="plus"></ti-icon>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
