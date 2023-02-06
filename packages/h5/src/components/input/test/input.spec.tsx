import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiInput } from '../index';
import { TestContainer } from '../../common/test/container';
import { sleep } from '../../common/test';
describe('渲染 ti-input', () => {
  it('填充模式', async () => {
    const page = await newSpecPage({
      components: [TiInput, TestContainer],
      template: () => (
        <test-container>
          <ti-input label="左侧标题" placeholder="用户输入中文案" />
          <ti-input disabled label="禁用" />
          <ti-input readOnly label="只读" />
          <ti-input maxlength={20} label="最大输入长度20" />
          <ti-input divider={false} label="不显示底部分割线" />
          <ti-input required label="必填" />
          <ti-input clearable={false} label="不显示清除按钮" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('输入类型', async () => {
    const page = await newSpecPage({
      components: [TiInput, TestContainer],
      template: () => (
        <test-container>
          <ti-input type="text" label="文本" />
          <ti-input type="number" label="数字" />
          <ti-input type="safe-password" label="密码安全输入键盘" />
          <ti-input type="digit" label="带小数点的数字键盘" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('输入对齐方式', async () => {
    const page = await newSpecPage({
      components: [TiInput, TestContainer],
      template: () => (
        <test-container>
          <ti-input text-align="left" label="标题" />
          <ti-input text-align="right" label="标题" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('label左侧搭配图标', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input prefix-icon="home" label="标题" />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('输入框左右使用插槽', async () => {
    const page = await newSpecPage({
      components: [TiInput, TestContainer],
      template: () => (
        <test-container>
          <ti-input label="手机号">
            <div slot="prefix">+ 86</div>
          </ti-input>
          <ti-input label="验证码">
            <div slot="suffix">发验证码</div>
          </ti-input>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('错误提示', async () => {
    const page = await newSpecPage({
      components: [TiInput, TestContainer],
      template: () => (
        <test-container>
          <ti-input error value="输错了" label="标题" />
          <ti-input error-message="手机号格式错误" value="123213" label="手机号" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('键盘确认按钮文字', async () => {
    const page = await newSpecPage({
      components: [TiInput, TestContainer],
      template: () => (
        <test-container>
          <ti-input confirm-type="done" label="完成" />
          <ti-input confirm-type="send" label="发送" />
          <ti-input confirm-type="search" label="搜索" />
          <ti-input confirm-type="next" label="下一项" />
          <ti-input confirm-type="go" label="前往" />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('点击清除按钮', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="text" label="文本" value="111111" />,
    });
    const input = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    input.focus();
    await page.waitForChanges();
    const dom = page.root.shadowRoot.querySelector<HTMLDivElement>('.titian-input-icon-box');
    dom?.dispatchEvent(new Event('touchStart', {}));
    await sleep(1000);
    dom?.dispatchEvent(new Event('touchEnd', {}));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('禁用', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="number" value="23" label="数字" disabled />,
    });
    const input = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    input.focus();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('自动聚焦', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="number" value="23" label="数字" autofocus />,
    });
    const input = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    input.focus();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('格式化1', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="number" value="23" label="数字" />,
    });
    const input = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    input.focus();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('格式化2', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="number" value="0123" label="数字" />,
    });
    const input = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    input.focus();
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('输入', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="number" value="0123" label="数字" />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    dom?.dispatchEvent(new CustomEvent('input', { detail: '12' }));
    await sleep(1000);
    dom?.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('键盘确认', async () => {
    const page = await newSpecPage({
      components: [TiInput],
      template: () => <ti-input type="number" value="0123" label="数字" />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-input');
    dom?.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await sleep(200);
    dom?.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter' }));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
