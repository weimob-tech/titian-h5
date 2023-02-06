import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiCheckboxButton } from '../index';
import { TiImage } from '../../image';
import { TestContainer } from '../../common/test/container';

describe('渲染 checkbox button', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxButton, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox-button label="复选按钮文字" />
          <ti-checkbox-button>复选按钮文字</ti-checkbox-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('渲染默认选中状态', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxButton, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox-button label="默认选中" checked />
          <ti-checkbox-button label="默认选中" default-checked />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('渲染禁用按钮', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxButton],
      template: () => <ti-checkbox-button label="禁用" disabled />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('修改按钮颜色', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxButton, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox-button color="#ffff00" label="颜色" />
          <ti-checkbox-button color="rgb(0,0,0)" label="颜色" />
          <ti-checkbox-button color="rgba(0,0,0,0.5)" label="颜色" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('渲染组件内容', async () => {
    const page = await newSpecPage({
      components: [TiCheckboxButton, TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox-button label="设置右侧图标" icon="sort-inactive" />
          <ti-checkbox-button label="自定义左侧内容">
            <ti-image
              ext-style="margin-right: 6rpx"
              slot="prefix"
              width="40"
              radius="0"
              height="40"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
            />
          </ti-checkbox-button>
          <ti-checkbox-button label="自定义右侧内容">
            <ti-image
              ext-style="margin-left: 6rpx"
              slot="suffix"
              width="40"
              radius="0"
              height="40"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
            />
          </ti-checkbox-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('监听点击事件', async () => {
    let checked = false;
    const change = jest.fn((e: CustomEvent) => {
      checked = e.detail;
    });
    const page = await newSpecPage({
      components: [TiCheckboxButton],
      template: () => <ti-checkbox-button label="单选按钮" onChange={change} />,
    });

    {
      // 点击
      const tag = page.root.shadowRoot.querySelector<HTMLDivElement>('ti-tag');
      tag.click();
      expect(checked).toBeTruthy();
      tag.click();
      expect(checked).toBeFalsy();
    }
  });

  it('禁用情况下，监听点击事件', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiCheckboxButton],
      template: () => <ti-checkbox-button label="单选按钮" disabled onChange={change} />,
    });

    {
      // 点击
      const tag = page.root.shadowRoot.querySelector<HTMLDivElement>('ti-tag');
      tag.click();
      expect(change).not.toBeCalled();
    }
  });
});
