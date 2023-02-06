import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TestContainer } from '../../common/test/container';
import { TiImage } from '../../image';
import { TiRadioButton } from '../radio-button';

describe('渲染单选按钮', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiRadioButton, TestContainer],
      template: () => (
        <test-container>
          <ti-radio-button />
          <ti-radio-button label="文字内容" />
          <ti-radio-button>文字内容</ti-radio-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('默认选中状态', async () => {
    const page = await newSpecPage({
      components: [TiRadioButton, TestContainer],
      template: () => (
        <test-container>
          <ti-radio-button label="默认选中" checked />
          <ti-radio-button label="默认选中" default-checked />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
  //

  it('组件内容设置', async () => {
    const page = await newSpecPage({
      components: [TiRadioButton, TiImage, TestContainer],
      template: () => (
        <test-container>
          <ti-radio-button label="设置右侧图标" icon="sort-inactive" />
          <ti-radio-button label="自定义左侧内容">
            <ti-image
              ext-style="margin-right: 6px"
              slot="prefix"
              width="40"
              radius="0"
              height="40"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
            />
          </ti-radio-button>
          <ti-radio-button label="自定义右侧内容">
            <ti-image
              ext-style="margin-left: 6px"
              slot="suffix"
              width="40"
              radius="0"
              height="40"
              src="https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png"
            />
          </ti-radio-button>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('改变单选按钮颜色', async () => {
    const page = await newSpecPage({
      components: [TiRadioButton, TestContainer],
      template: () => (
        <test-container>
          <ti-radio-button label="通过属性更改颜色" color="#2a6ae9" />
          <ti-radio-button label="通过属性更改颜色" color="rgb(0,0,0)" />
          <ti-radio-button label="通过属性更改颜色" color="rgba(0,0,0, 0.5)" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('受控模式', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiRadioButton],
      template: () => <ti-radio-button label="监听切换状态变化" checked onChange={change} />,
    });
    {
      // 点击
      const tag = page.root.shadowRoot.querySelector<HTMLDivElement>('ti-tag');
      tag.click();

      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBeFalsy();

      tag.click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBeFalsy();

      page.root.setAttribute('checked', 'false');
      await page.waitForChanges();
      tag.click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBeTruthy();
    }
  });

  it('监听点击切换事件', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiRadioButton],
      template: () => <ti-radio-button label="监听切换状态变化" onChange={change} />,
    });
    {
      // 点击
      const tag = page.root.shadowRoot.querySelector<HTMLDivElement>('ti-tag');
      tag.click();

      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBeTruthy();
      const radioButton = page.root.shadowRoot.querySelector('.titian-radio-button');
      expect(radioButton).toHaveClass('titian-radio-button-checked');

      tag.click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBeFalsy();
      expect(radioButton).not.toHaveClass('titian-radio-button-checked');
    }
  });
});
