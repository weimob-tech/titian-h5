import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiRadioGroup } from '..';
import { TiRadio } from '../../radio';
import { TiRadioButton } from '../../radio-button/radio-button';

describe('渲染 radio group', () => {
  describe('渲染 radio box', () => {
    it('基本渲染', async () => {
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => (
          <ti-radio-group>
            <ti-radio label="文字内容-1" value={1}></ti-radio>
            <ti-radio label="文字内容-2" value={2}></ti-radio>
            <ti-radio label="文字内容-3" value={3}></ti-radio>
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('设置选中值，受控模式', async () => {
      let value: string | number = '1';
      const change = jest.fn();
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => (
          <ti-radio-group value={value} onChange={change}>
            <ti-radio label="受控模式-1" value="1" />
            <ti-radio label="受控模式-2" value="2" />
            <ti-radio label="受控模式-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();

      const radios = page.root.querySelectorAll('ti-radio');
      const checkedRadio = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio');
      const checkedRadioTwo = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio');
      {
        // 样式为选中状态
        expect(checkedRadio).toHaveClass('titian-radio-checked');
        // 样式为未选中状态
        expect(checkedRadioTwo).not.toHaveClass('titian-radio-checked');
      }

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 radio 点击
          // 第一个 radio label 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          // 返回点击值
          expect(change.mock.lastCall[0].detail).toEqual('1');
          // 样式没有变化，仍然为选中状态
          expect(checkedRadio).toHaveClass('titian-radio-checked');
          page.root.setAttribute('value', '');
          await page.waitForChanges();
          // 样式变化，为取消状态
          expect(checkedRadio).not.toHaveClass('titian-radio-checked');
        }

        {
          // 第二个 radio 点击
          // 第二个 radio label 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
          radioIcon.click();
          await page.waitForChanges();
          // 抛出第二个
          expect(change.mock.lastCall[0].detail).toEqual('2');
          expect(change).toBeCalledTimes(2);
          // 样式没有变化, 为取消状态
          expect(checkedRadioTwo).not.toHaveClass('titian-radio-checked');
          // 设置选中第二个
          page.root.setAttribute('value', '2');
          await page.waitForChanges();
          // 样式变化, 为选中状态
          expect(checkedRadioTwo).toHaveClass('titian-radio-checked');
        }
      }
    });

    it('设置选中值，非受控模式', async () => {
      const defaultValue = '1';
      const change = jest.fn();
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => (
          <ti-radio-group defaultValue={defaultValue} onChange={change}>
            <ti-radio label="受控模式-1" value="1" />
            <ti-radio label="受控模式-2" value="2" />
            <ti-radio label="受控模式-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();

      const radios = page.root.querySelectorAll('ti-radio');

      {
        // 点击后样式会变
        {
          // 第一个 radio 点击
          // 第一个 radio label 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          // 抛出选中 1
          expect(change.mock.lastCall[0].detail).toEqual('1');
          // expect(checkedRadio).not.toHaveClass('titian-radio-checked'); // TODO: 样式变化
        }

        {
          // 第二个 radio 点击
          // 第二个 radio label 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(2);
          expect(change.mock.lastCall[0].detail).toEqual('2');
        }
      }
    });

    it('设置 options 渲染', async () => {
      const options = [
        { value: 'a', label: '选项 A' },
        { value: 'b', label: '选项 B' },
        { value: 'c', label: '选项 C' },
      ];
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => <ti-radio-group options={options} />,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });

    it('禁用所有多选框点击效果', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => (
          <ti-radio-group disabled onChange={change}>
            <ti-radio label="文字内容-1" value="1" />
            <ti-radio label="文字内容-2" value="2" />
            <ti-radio label="文字内容-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();

      const radios = page.root.querySelectorAll('ti-radio');

      {
        // 点击后样式会变
        {
          // 第一个 radio 点击
          // 第一个 radio label 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }

        {
          // 第二个 radio 点击
          // 第二个 radio label 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }

        {
          // 第一个 radio 点击
          // 第一个 radio icon 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-icon-wrap');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }

        {
          // 第一个 radio 点击
          // 第一个 radio icon 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-icon-wrap');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }
      }
    });

    it('禁用所有多选框文字点击效果', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => (
          <ti-radio-group onChange={change} labelDisabled>
            <ti-radio label="文字内容-1" value="1" />
            <ti-radio label="文字内容-2" value="2" />
            <ti-radio label="文字内容-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      const radios = page.root.querySelectorAll('ti-radio');

      {
        // 第一个 radio 点击
        // 第一个 radio label 点击
        const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(0);
      }

      {
        // 第二个 radio 点击
        // 第二个 radio label 点击
        const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(0);
      }

      {
        // 第一个 radio 点击
        // 第一个 radio icon 点击
        const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-icon-wrap');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(1);
        expect(change.mock.lastCall[0].detail).toEqual('1');
      }

      {
        // 第二个 radio 点击
        // 第二个 radio icon 点击
        const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-icon-wrap');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(2);
        expect(change.mock.lastCall[0].detail).toEqual('2');
      }
    });

    it('监听切换事件', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadio],
        template: () => (
          <ti-radio-group onChange={change}>
            <ti-radio label="文字内容-1" value="1" />
            <ti-radio label="文字内容-2" value="2" />
            <ti-radio label="文字内容-3" value="3" />
          </ti-radio-group>
        ),
      });
      const radios = page.root.querySelectorAll('ti-radio');

      {
        // 第一个 radio 点击
        // 第一个 radio label 点击
        const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(1);
        expect(change.mock.lastCall[0].detail).toEqual('1');
      }

      {
        // 第二个 radio 点击
        // 第二个 radio label 点击
        const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-label');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(2);
        expect(change.mock.lastCall[0].detail).toEqual('2');
      }
    });
  });

  describe('渲染 radio button', () => {
    it('基本渲染', async () => {
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group>
            <ti-radio-button label="文字内容-1" value={1} />
            <ti-radio-button label="文字内容-2" value={2} />
            <ti-radio-button label="文字内容-3" value={3} />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('修改颜色', async () => {
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group color="#ff0000">
            <ti-radio-button label="文字内容-1" value={1} />
            <ti-radio-button label="文字内容-2" value={2} />
            <ti-radio-button label="文字内容-3" value={3} />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('修改icon', async () => {
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group color="plus">
            <ti-radio-button label="文字内容-1" value={1} />
            <ti-radio-button label="文字内容-2" value={2} />
            <ti-radio-button label="文字内容-3" value={3} />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('设置选中值，受控模式', async () => {
      let value: string | number = '1';
      const change = jest.fn();
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group value={value} onChange={change}>
            <ti-radio-button label="受控模式-1" value="1" />
            <ti-radio-button label="受控模式-2" value="2" />
            <ti-radio-button label="受控模式-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      const radios = page.root.querySelectorAll('ti-radio-button');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 radio button 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLDivElement>('.titian-radio-button');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          // 抛出 1
          expect(change.mock.lastCall[0].detail).toEqual('1');
          const checkedRadio = radios[0].shadowRoot.querySelector('.titian-radio-button');
          // 样式没有变化
          expect(checkedRadio).toHaveClass('titian-radio-button-checked');
          page.root.setAttribute('value', '');
          await page.waitForChanges();
          // 样式变化
          expect(checkedRadio).not.toHaveClass('titian-radio-button-checked');
        }

        {
          // 第二个 radio button 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLDivElement>('.titian-radio-button');
          radioIcon.click();
          await page.waitForChanges();
          expect(change.mock.lastCall[0].detail).toEqual('2'); // 没有内容被选中
          expect(change).toBeCalledTimes(2);
          const checkedRadio = radios[1].shadowRoot.querySelector('.titian-radio-button');
          // 样式没有变化
          expect(checkedRadio).not.toHaveClass('titian-radio-button-checked');
          page.root.setAttribute('value', '2');
          await page.waitForChanges();
          expect(checkedRadio).toHaveClass('titian-radio-button-checked');
        }
      }
    });

    it('设置选中值，非受控模式', async () => {
      const defaultValue = '1';
      const change = jest.fn();
      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group defaultValue={defaultValue} onChange={change}>
            <ti-radio-button label="受控模式-1" value="1" />
            <ti-radio-button label="受控模式-2" value="2" />
            <ti-radio-button label="受控模式-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      const radios = page.root.querySelectorAll('ti-radio-button');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 radio button 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLDivElement>('.titian-radio-button');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          expect(change.mock.lastCall[0].detail).toEqual('1'); // 只有第二个被选中
          // const checkedRadio = radios[0].shadowRoot.querySelector('.titian-radio-button');
          // expect(checkedRadio).not.toHaveClass('titian-radio-button-checked'); // 样式变化
          await page.waitForChanges();
        }

        {
          // 第二个 radio button 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLDivElement>('.titian-radio-button');
          radioIcon.click();
          await page.waitForChanges();
          expect(change.mock.lastCall[0].detail).toEqual('2'); // 没有内容被选中
          expect(change).toBeCalledTimes(2);
          // const checkedRadio = radios[1].shadowRoot.querySelector('.titian-radio-button');
          // expect(checkedRadio).not.toHaveClass('titian-radio-button-checked'); // 样式变化
          await page.waitForChanges();
        }
      }
    });

    it('禁用所有多选框点击效果', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group disabled onChange={change}>
            <ti-radio-button label="文字内容-1" value="1" />
            <ti-radio-button label="文字内容-2" value="2" />
            <ti-radio-button label="文字内容-3" value="3" />
          </ti-radio-group>
        ),
      });
      expect(page.root).toMatchSnapshot();

      const radios = page.root.querySelectorAll('ti-radio-button');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 radio button 点击
          const radioIcon = radios[0].shadowRoot.querySelector<HTMLDivElement>('.titian-radio-button');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
          await page.waitForChanges();
        }

        {
          // 第二个 radio button 点击
          const radioIcon = radios[1].shadowRoot.querySelector<HTMLDivElement>('.titian-radio-button');
          radioIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }
      }
    });

    it('监听切换事件', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiRadioGroup, TiRadioButton],
        template: () => (
          <ti-radio-group onChange={change}>
            <ti-radio-button label="文字内容-1" value="1" />
            <ti-radio-button label="文字内容-2" value="2" />
            <ti-radio-button label="文字内容-3" value="3" />
          </ti-radio-group>
        ),
      });
      const radios = page.root.querySelectorAll('ti-radio-button');

      {
        // 第一个 radio 点击
        // 第一个 radio button 点击
        const radioIcon = radios[0].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-button');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(1);
        expect(change.mock.lastCall[0].detail).toEqual('1');
      }

      {
        // 第二个 radio 点击
        // 第二个 radio button 点击
        const radioIcon = radios[1].shadowRoot.querySelector<HTMLTiRadioElement>('.titian-radio-button');
        radioIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(2);
        expect(change.mock.lastCall[0].detail).toEqual('2');
      }
    });
  });
});
