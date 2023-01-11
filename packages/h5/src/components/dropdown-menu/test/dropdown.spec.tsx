import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { TiDropdownMenu } from '..';
import { TiDropdownItem } from '../../dropdown-item';
import * as utils from '../../common/utils';
import { TiButton } from '../../button';
import { sleep } from '../../common/test';
import { TiPopup } from '../../popup';
import { TiTransition } from '../../transition';

describe('渲染 dropdown', () => {
  beforeAll(() => {
    jest.spyOn<any, string>(utils, 'getBoundingClientRect').mockReturnValue({ width: 200, top: 200, bottom: 200 });
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  it('向下基本渲染', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiPopup, TiTransition],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    await sleep();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('向上基本渲染', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem],
      template: () => (
        <ti-dropdown-menu direction="up">
          <ti-dropdown-item visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('设置图标', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem],
      template: () => (
        <ti-dropdown-menu icon="plus">
          <ti-dropdown-item visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    await sleep();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('设置选中颜色', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem],
      template: () => (
        <ti-dropdown-menu activeColor="blue">
          <ti-dropdown-item visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    await sleep();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('不使用遮罩', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiPopup, TiTransition],
      template: () => (
        <ti-dropdown-menu hasMask={false}>
          <ti-dropdown-item visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    await sleep();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('点击展开', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    const button = page.root.shadowRoot.querySelectorAll('ti-button');
    {
      // 第一个 title 点击
      button[0].click();
      await page.waitForChanges();
      await sleep();
      expect(page.root).toMatchSnapshot();
    }
    {
      // 第二个 title 点击
      button[1].click();
      await page.waitForChanges();
      await sleep();
      expect(page.root).toMatchSnapshot('第二个 title 点击');
    }
    page.body.innerHTML = '';
  });

  it('被动触发展开', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    const dropdownItem = page.root.querySelectorAll('ti-dropdown-item');
    {
      // 展开
      await dropdownItem[0].toggle();
      await sleep();
      expect(page.root).toMatchSnapshot('展开');
    }

    {
      // 收起
      await dropdownItem[0].toggle();
      await sleep();
      expect(page.root).toMatchSnapshot('收起');
    }
    page.body.innerHTML = '';
  });

  it('被动触发展开', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const change = jest.fn();
    const close = jest.fn();
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton, TiTransition, TiPopup],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item visible onClose={close} onChange={change} title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    const dropdownItem = page.root.querySelectorAll('ti-dropdown-item');
    const cell = dropdownItem[0].shadowRoot.querySelectorAll('ti-cell');
    {
      // 第一个选项选中
      cell[0].click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBe('1');
      // 关闭
      expect(close).toBeCalledTimes(1);
      await sleep();
    }

    {
      // 第一个展开
      await dropdownItem[0].toggle();
      await sleep();

      // 第一个选项取消选中
      cell[0].click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBe('');
      expect(close).toBeCalledTimes(2);
    }
    page.body.innerHTML = '';
  });

  it('submit 模式', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const change = jest.fn();
    const close = jest.fn();
    const submit = jest.fn();
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item
            onSubmit={submit}
            visible
            hasSubmit
            onClose={close}
            onChange={change}
            title="标题1"
            options={dropMenuOptions}
          />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();
    const dropdownItem = page.root.querySelectorAll('ti-dropdown-item');
    const cell = dropdownItem[0].shadowRoot.querySelectorAll('ti-cell');
    const submitButton = dropdownItem[0].shadowRoot.querySelector('ti-button');
    {
      // 第一个选项选中;
      cell[0].click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toBe('1');
      // 没有关闭
      expect(close).toBeCalledTimes(0);
    }

    {
      // 点击提交按钮
      submitButton.click();
      expect(submit.mock.lastCall[0].detail).toBe('1');
      await sleep();
      expect(close).toBeCalledTimes(1);
    }

    page.body.innerHTML = '';
  });

  it('多选模式', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const change = jest.fn();
    const close = jest.fn();
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item
            visible
            value={['1']}
            mode="multiple"
            onClose={close}
            onChange={change}
            title="标题1"
            options={dropMenuOptions}
          />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();
    const dropdownItem = page.root.querySelectorAll('ti-dropdown-item');
    const cell = dropdownItem[0].shadowRoot.querySelectorAll('ti-cell');
    {
      // 第一个选项设置了默认选中，这里取消选中;
      cell[0].click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toEqual([]);
      // 没有关闭
      expect(close).toBeCalledTimes(0);
    }

    {
      // 点击提交按钮
      cell[0].click();
      expect(change.mock.lastCall[0].detail).toEqual(['1']);
      await sleep();
      expect(close).toBeCalledTimes(0);
    }

    page.body.innerHTML = '';
  });

  it('多选模式, value 不为数组', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const change = jest.fn();
    const close = jest.fn();
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item
            visible
            value="1"
            mode="multiple"
            onClose={close}
            onChange={change}
            title="标题1"
            options={dropMenuOptions}
          />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();
    const dropdownItem = page.root.querySelectorAll('ti-dropdown-item');
    const cell = dropdownItem[0].shadowRoot.querySelectorAll('ti-cell');
    {
      // 第一个选项设置了默认选中，这里取消选中;
      cell[0].click();
      await page.waitForChanges();
      expect(change.mock.lastCall[0].detail).toEqual([]);
      // 没有关闭
      expect(close).toBeCalledTimes(0);
    }

    {
      // 点击提交按钮
      cell[0].click();
      expect(change.mock.lastCall[0].detail).toEqual(['1']);
      await sleep();
      expect(close).toBeCalledTimes(0);
    }

    page.body.innerHTML = '';
  });

  it('多选模式, value 不为数组', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu mode="multiple" getPosition={() => ({ top: '0px' })}>
          <ti-dropdown-item visible value="1" title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();

    page.body.innerHTML = '';
  });

  it('Switch 选择类型', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];

    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiButton],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item visible type="switch" value="1" title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    expect(page.root).toMatchSnapshot();

    page.body.innerHTML = '';
  });

  it('点击遮罩关闭', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];
    const close = jest.fn();
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiPopup, TiTransition],
      template: () => (
        <ti-dropdown-menu>
          <ti-dropdown-item onClose={close} visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    const mask = page.root
      .querySelector('ti-dropdown-item')
      .shadowRoot.querySelector('ti-popup')
      .shadowRoot.querySelector('ti-transition');

    mask.click();
    await page.waitForChanges();
    expect(close).toBeCalled();
    page.body.innerHTML = '';
  });
  it('禁用点击遮罩关闭', async () => {
    const dropMenuOptions = [
      { title: '选项1', value: '1' },
      { title: '选项2', value: '2' },
    ];
    const close = jest.fn();
    const page = await newSpecPage({
      components: [TiDropdownMenu, TiDropdownItem, TiPopup, TiTransition],
      template: () => (
        <ti-dropdown-menu closeOnMask={false}>
          <ti-dropdown-item onClose={close} visible title="标题1" options={dropMenuOptions} />
          <ti-dropdown-item title="标题2" options={dropMenuOptions} />
          <ti-dropdown-item title="自定义内容">自定义内容</ti-dropdown-item>
        </ti-dropdown-menu>
      ),
    });
    const mask = page.root
      .querySelector('ti-dropdown-item')
      .shadowRoot.querySelector('ti-popup')
      .shadowRoot.querySelector('ti-transition');

    mask.click();
    await page.waitForChanges();
    expect(close).not.toBeCalled();
    page.body.innerHTML = '';
  });
});
