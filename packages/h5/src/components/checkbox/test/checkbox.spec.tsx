import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TestContainer } from '../../common/test/container';
import { TiCheckbox } from '../index';

describe('渲染 checkbox', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox label="单选框" />
          <ti-checkbox>单选框</ti-checkbox>
          <ti-checkbox />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('默认选中状态', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox label="默认选中" checked />
          <ti-checkbox label="默认选中" defaultChecked />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('修改多选框的圆角度数', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox],
      template: () => (
        <test-container>
          <ti-checkbox label="方型" shape="square" />
          <ti-checkbox label="圆型" shape="circle" />
          <ti-checkbox label="自定义角度" shape={4} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('修改多选框的颜色', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox label="方型" color="red" />
          <ti-checkbox label="方型" color="#ff0000" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('禁用多选框点击效果', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox, TestContainer],
      template: () => (
        <test-container>
          <ti-checkbox label="禁用全部点击效果" disabled />
          <ti-checkbox label="禁用文字点击效果" label-disabled />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('组件图标设置', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox],
      template: () => (
        <test-container>
          <ti-checkbox label="默认图标" />
          <ti-checkbox label="自定义图标大小" size={64} />
          <ti-checkbox label="自定义图标 plus" icon="plus" />
          <ti-checkbox label="自定义图标 false" icon="false" />
          <ti-checkbox label="自定义图标 slot" slot="">
            <div slot="icon">icon</div>
          </ti-checkbox>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('组件图标设置', async () => {
    const page = await newSpecPage({
      components: [TiCheckbox],
      template: () => <ti-checkbox label="自定义图标 false" icon={false} />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('监听 全部 点击事件', async () => {
    let checked = false;
    const change = jest.fn((e: CustomEvent) => {
      checked = e.detail;
    });
    const page = await newSpecPage({
      components: [TiCheckbox],
      template: () => <ti-checkbox label="单选框" onChange={change} />,
    });

    {
      // label 点击
      const label = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-label');
      label.click();
      expect(checked).toBeTruthy();
    }

    {
      // icon 点击
      const iconWrap = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-icon-wrap');
      iconWrap.click();
      expect(checked).toBeFalsy();
    }
  });

  it('禁用全部点击事件', async () => {
    const change = jest.fn();

    const page = await newSpecPage({
      components: [TiCheckbox],
      template: () => <ti-checkbox disabled onChange={change} label="单选框" />,
    });

    {
      // label 点击
      const label = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-label');
      label.click();
      expect(change).toBeCalledTimes(0);
    }

    {
      // icon 点击
      const iconWrap = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-icon-wrap');
      iconWrap.click();
      expect(change).toBeCalledTimes(0);
    }
  });

  it('禁用 label 点击事件', async () => {
    const change = jest.fn();
    const page = await newSpecPage({
      components: [TiCheckbox],
      template: () => <ti-checkbox labelDisabled onChange={change} label="单选框" />,
    });
    {
      // label 点击
      const label = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-label');
      label.click();
      expect(change).toBeCalledTimes(0);
    }

    {
      // icon 点击
      const iconWrap = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-icon-wrap');
      iconWrap.click();
      expect(change).toBeCalledTimes(1);
    }
  });
});
