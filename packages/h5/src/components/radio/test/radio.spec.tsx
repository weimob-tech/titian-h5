import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiRadio } from '..';
import { TestContainer } from '../../common/test/container';

describe('渲染单选框', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiRadio, TestContainer],
      template: () => (
        <test-container>
          <ti-radio />
          <ti-radio label="文字内容" />
          <ti-radio>文字内容</ti-radio>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('默认选中状态', async () => {
    const page = await newSpecPage({
      components: [TiRadio],
      template: () => (
        <test-container>
          <ti-radio label="默认非受控模式" />
          <ti-radio label="默认选中，受控模式" checked />
          <ti-radio label="默认选中，非受控模式" default-checked />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('禁用点击效果', async () => {
    const page = await newSpecPage({
      components: [TiRadio, TestContainer],
      template: () => (
        <test-container>
          <ti-radio label="禁用全部点击效果" disabled />
          <ti-radio label="禁用文字点击效果" label-disabled />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('修改单选框的圆角度数', async () => {
    const page = await newSpecPage({
      components: [TiRadio],
      template: () => (
        <test-container>
          <ti-radio label="方型" shape="square" />
          <ti-radio label="圆型" shape="circle" />
          <ti-radio label="自定义角度" shape={6} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('组件图标设置', async () => {
    const page = await newSpecPage({
      components: [TiRadio, TestContainer],
      template: () => (
        <test-container>
          <ti-radio label="默认图标" />
          <ti-radio label="自定义图标大小" size={64} />
          <ti-radio label="自定义图标" icon="plus" />
          <ti-radio label="自定义图标为空" icon="" />
          <ti-radio label="自定义颜色" color="blue" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('组件图标设置', async () => {
    const page = await newSpecPage({
      components: [TiRadio],
      template: () => <ti-radio label="自定义图标 false" icon={false} />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('监听点击切换事件', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiRadio],
      template: () => <ti-radio label="单选框" onChange={change} />,
    });
    {
      // label 点击
      const label = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-radio-label');
      label.click();
      expect(change).toBeCalledTimes(1);
      expect(change.mock.lastCall[0].detail).toBeTruthy();
    }
    {
      // icon 点击
      const iconWrap = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-radio-icon-wrap');
      iconWrap.click();
      expect(change).toBeCalledTimes(2);
      expect(change.mock.lastCall[0].detail).toBeFalsy();
    }
  });

  it('禁用全部点击切换事件', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiRadio],
      template: () => <ti-radio label="单选框" onChange={change} disabled />,
    });
    {
      // label 点击
      const label = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-radio-label');
      label.click();
      expect(change).toBeCalledTimes(0);
    }
    {
      // icon 点击
      const iconWrap = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-radio-icon-wrap');
      iconWrap.click();
      expect(change).toBeCalledTimes(0);
    }
  });

  it('禁用label点击切换事件', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiRadio],
      template: () => <ti-radio label="单选框" onChange={change} labelDisabled />,
    });
    {
      // label 点击
      const label = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-radio-label');
      label.click();
      expect(change).toBeCalledTimes(0);
    }
    {
      // icon 点击
      const iconWrap = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-radio-icon-wrap');
      iconWrap.click();
      expect(change).toBeCalledTimes(1);
      expect(change.mock.lastCall[0].detail).toBeTruthy();
    }
  });
});
