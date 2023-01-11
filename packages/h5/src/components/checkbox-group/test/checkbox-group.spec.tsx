import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiCheckboxGroup } from '..';
import { TiCheckbox } from '../../checkbox';
import { TiCheckboxButton } from '../../checkbox-button';

describe('渲染 checkbox group', () => {
  describe('渲染 checkbox box', () => {
    it('基本渲染', async () => {
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group>
            <ti-checkbox label="文字内容-1" value={1}></ti-checkbox>
            <ti-checkbox label="文字内容-2" value={2}></ti-checkbox>
            <ti-checkbox label="文字内容-3" value={3}></ti-checkbox>
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('设置选中值，受控模式', async () => {
      let value: Array<string | number> = ['1', '2'];
      const change = jest.fn((e: CustomEvent<Array<string | number>>) => (value = e.detail));
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group value={value} onChange={change}>
            <ti-checkbox label="受控模式-1" value="1" />
            <ti-checkbox label="受控模式-2" value="2" />
            <ti-checkbox label="受控模式-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();

      const checkboxes = page.root.querySelectorAll('ti-checkbox');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 checkbox 点击
          // 第一个 checkbox label 点击
          const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          expect(change.mock.lastCall[0].detail).toEqual(['2']); // 只有第二个被选中
          const checkedCheckbox = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox');
          expect(checkedCheckbox).toHaveClass('titian-checkbox-checked'); // 样式没有变化
          page.root.setAttribute('value', JSON.stringify(value));
          await page.waitForChanges();
        }

        {
          // 第二个 checkbox 点击
          // 第二个 checkbox label 点击
          const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change.mock.lastCall[0].detail).toEqual([]); // 没有内容被选中
          expect(change).toBeCalledTimes(2);
          const checkedCheckbox = checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox');
          expect(checkedCheckbox).toHaveClass('titian-checkbox-checked'); // 样式没有变化
          page.root.setAttribute('value', JSON.stringify(value));
          await page.waitForChanges();
        }

        {
          // 第一个 checkbox 点击
          // 第一个 checkbox icon 点击
          const checkboxIcon =
            checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(3);
        }

        {
          // 第一个 checkbox 点击
          // 第一个 checkbox icon 点击
          const checkboxIcon =
            checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(4);
        }
      }
    });

    it('设置选中值，非受控模式', async () => {
      const defaultValue: Array<string | number> = ['1', '2'];
      const change = jest.fn();
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group defaultValue={defaultValue} onChange={change}>
            <ti-checkbox label="受控模式-1" value="1" />
            <ti-checkbox label="受控模式-2" value="2" />
            <ti-checkbox label="受控模式-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();

      const checkboxes = page.root.querySelectorAll('ti-checkbox');

      {
        // 点击后样式会变
        {
          // 第一个 checkbox 点击
          // 第一个 checkbox label 点击
          const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          expect(change.mock.lastCall[0].detail).toEqual(['2']); // 只有第二个被选中
          // const checkedCheckbox = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox');
          // expect(checkedCheckbox).not.toHaveClass('titian-checkbox-checked'); // TODO: 样式变化
        }

        {
          // 第二个 checkbox 点击
          // 第二个 checkbox label 点击
          const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(2);
          expect(change.mock.lastCall[0].detail).toEqual([]); // 没有内容被选中
        }

        {
          // 第一个 checkbox 点击
          // 第一个 checkbox icon 点击
          const checkboxIcon =
            checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(3);
          expect(change.mock.lastCall[0].detail).toEqual(['1']); // 第一个被选中
        }

        {
          // 第一个 checkbox 点击
          // 第一个 checkbox icon 点击
          const checkboxIcon =
            checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(4);
          expect(change.mock.lastCall[0].detail).toEqual(['1', '2']); // 第一个被选中
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
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => <ti-checkbox-group options={options} />,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });

    it('禁用所有多选框点击效果', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group disabled onChange={change}>
            <ti-checkbox label="文字内容-1" value="1" />
            <ti-checkbox label="文字内容-2" value="2" />
            <ti-checkbox label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();

      const checkboxes = page.root.querySelectorAll('ti-checkbox');

      {
        // 点击后样式会变
        {
          // 第一个 checkbox 点击
          // 第一个 checkbox label 点击
          const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }

        {
          // 第二个 checkbox 点击
          // 第二个 checkbox label 点击
          const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }

        {
          // 第一个 checkbox 点击
          // 第一个 checkbox icon 点击
          const checkboxIcon =
            checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }

        {
          // 第一个 checkbox 点击
          // 第一个 checkbox icon 点击
          const checkboxIcon =
            checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }
      }
    });

    it('禁用所有多选框文字点击效果', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group onChange={change} labelDisabled>
            <ti-checkbox label="文字内容-1" value="1" />
            <ti-checkbox label="文字内容-2" value="2" />
            <ti-checkbox label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      const checkboxes = page.root.querySelectorAll('ti-checkbox');

      {
        // 第一个 checkbox 点击
        // 第一个 checkbox label 点击
        const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(0);
      }

      {
        // 第二个 checkbox 点击
        // 第二个 checkbox label 点击
        const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(0);
      }

      {
        // 第一个 checkbox 点击
        // 第一个 checkbox icon 点击
        const checkboxIcon =
          checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(1);
        expect(change.mock.lastCall[0].detail).toEqual(['1']);
      }

      {
        // 第一个 checkbox 点击
        // 第一个 checkbox icon 点击
        const checkboxIcon =
          checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-icon-wrap');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(2);
        expect(change.mock.lastCall[0].detail).toEqual(['1', '2']);
      }
    });

    it('监听切换事件', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group onChange={change}>
            <ti-checkbox label="文字内容-1" value="1" />
            <ti-checkbox label="文字内容-2" value="2" />
            <ti-checkbox label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      const checkboxes = page.root.querySelectorAll('ti-checkbox');

      {
        // 第一个 checkbox 点击
        // 第一个 checkbox label 点击
        const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(1);
        expect(change.mock.lastCall[0].detail).toEqual(['1']);
      }

      {
        // 第二个 checkbox 点击
        // 第二个 checkbox label 点击
        const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(2);
        expect(change.mock.lastCall[0].detail).toEqual(['1', '2']);
      }
    });

    it('监听切换到最大', async () => {
      const handleMax = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckbox],
        template: () => (
          <ti-checkbox-group defaultValue={['1', '2']} max={2} onHandleMax={handleMax}>
            <ti-checkbox label="文字内容-1" value="1" />
            <ti-checkbox label="文字内容-2" value="2" />
            <ti-checkbox label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });

      const checkboxes = page.root.querySelectorAll('ti-checkbox');

      {
        // 第三个 checkbox 点击
        // 第三个 checkbox label 点击，抛出handleMax事件
        const checkboxIcon = checkboxes[2].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-label');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(handleMax).toBeCalledTimes(1);
        expect(handleMax.mock.lastCall[0].detail).toEqual(undefined);
      }
    });
  });

  describe('渲染 checkbox button', () => {
    it('基本渲染', async () => {
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group>
            <ti-checkbox-button label="文字内容-1" value={1} />
            <ti-checkbox-button label="文字内容-2" value={2} />
            <ti-checkbox-button label="文字内容-3" value={3} />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('修改颜色', async () => {
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group color="#ff0000">
            <ti-checkbox-button label="文字内容-1" value={1} />
            <ti-checkbox-button label="文字内容-2" value={2} />
            <ti-checkbox-button label="文字内容-3" value={3} />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('修改icon', async () => {
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group color="plus">
            <ti-checkbox-button label="文字内容-1" value={1} />
            <ti-checkbox-button label="文字内容-2" value={2} />
            <ti-checkbox-button label="文字内容-3" value={3} />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
    });

    it('设置选中值，受控模式', async () => {
      let value: Array<string | number> = ['1', '2'];
      const change = jest.fn((e: CustomEvent<Array<string | number>>) => {
        value = e.detail;
      });
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group value={value} onChange={change}>
            <ti-checkbox-button label="受控模式-1" value="1" />
            <ti-checkbox-button label="受控模式-2" value="2" />
            <ti-checkbox-button label="受控模式-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      const checkboxes = page.root.querySelectorAll('ti-checkbox-button');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 checkbox button 点击
          const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-button');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          expect(change.mock.lastCall[0].detail).toEqual(['2']); // 只有第二个被选中
          const checkedCheckbox = checkboxes[0].shadowRoot.querySelector('.titian-checkbox-button');
          expect(checkedCheckbox).toHaveClass('titian-checkbox-button-checked'); // 样式没有变化
          page.root.setAttribute('value', JSON.stringify(value));
          await page.waitForChanges();
        }

        {
          // 第二个 checkbox button 点击
          const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-button');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change.mock.lastCall[0].detail).toEqual([]); // 没有内容被选中
          expect(change).toBeCalledTimes(2);
          const checkedCheckbox = checkboxes[1].shadowRoot.querySelector('.titian-checkbox-button');
          expect(checkedCheckbox).toHaveClass('titian-checkbox-button-checked'); // 样式没有变化
          page.root.setAttribute('value', JSON.stringify(value));
          await page.waitForChanges();
        }
      }
    });

    it('设置选中值，非受控模式', async () => {
      const defaultValue = ['1', '2'];
      const change = jest.fn();
      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group defaultValue={defaultValue} onChange={change}>
            <ti-checkbox-button label="受控模式-1" value="1" />
            <ti-checkbox-button label="受控模式-2" value="2" />
            <ti-checkbox-button label="受控模式-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();
      const checkboxes = page.root.querySelectorAll('ti-checkbox-button');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 checkbox button 点击
          const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-button');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(1);
          expect(change.mock.lastCall[0].detail).toEqual(['2']); // 只有第二个被选中
          // const checkedCheckbox = checkboxes[0].shadowRoot.querySelector('.titian-checkbox-button');
          // expect(checkedCheckbox).not.toHaveClass('titian-checkbox-button-checked'); // 样式变化
          await page.waitForChanges();
        }

        {
          // 第二个 checkbox button 点击
          const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-button');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change.mock.lastCall[0].detail).toEqual([]); // 没有内容被选中
          expect(change).toBeCalledTimes(2);
          // const checkedCheckbox = checkboxes[1].shadowRoot.querySelector('.titian-checkbox-button');
          // expect(checkedCheckbox).not.toHaveClass('titian-checkbox-button-checked'); // 样式变化
          await page.waitForChanges();
        }
      }
    });

    it('禁用所有多选框点击效果', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group disabled onChange={change}>
            <ti-checkbox-button label="文字内容-1" value="1" />
            <ti-checkbox-button label="文字内容-2" value="2" />
            <ti-checkbox-button label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      expect(page.root).toMatchSnapshot();

      const checkboxes = page.root.querySelectorAll('ti-checkbox-button');

      {
        // 点击后事件会返回新值，但是内容不会变
        {
          // 第一个 checkbox button 点击
          const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-button');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
          await page.waitForChanges();
        }

        {
          // 第二个 checkbox button 点击
          const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLDivElement>('.titian-checkbox-button');
          checkboxIcon.click();
          await page.waitForChanges();
          expect(change).toBeCalledTimes(0);
        }
      }
    });

    it('监听切换事件', async () => {
      const change = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group onChange={change}>
            <ti-checkbox-button label="文字内容-1" value="1" />
            <ti-checkbox-button label="文字内容-2" value="2" />
            <ti-checkbox-button label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });
      const checkboxes = page.root.querySelectorAll('ti-checkbox-button');

      {
        // 第一个 checkbox 点击
        // 第一个 checkbox button 点击
        const checkboxIcon = checkboxes[0].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-button');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(1);
        expect(change.mock.lastCall[0].detail).toEqual(['1']);
      }

      {
        // 第二个 checkbox 点击
        // 第二个 checkbox button 点击
        const checkboxIcon = checkboxes[1].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-button');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(change).toBeCalledTimes(2);
        expect(change.mock.lastCall[0].detail).toEqual(['1', '2']);
      }
    });

    it('监听切换到最大', async () => {
      const handleMax = jest.fn();

      const page = await newSpecPage({
        components: [TiCheckboxGroup, TiCheckboxButton],
        template: () => (
          <ti-checkbox-group defaultValue={['1', '2']} max={2} onHandleMax={handleMax}>
            <ti-checkbox-button label="文字内容-1" value="1" />
            <ti-checkbox-button label="文字内容-2" value="2" />
            <ti-checkbox-button label="文字内容-3" value="3" />
          </ti-checkbox-group>
        ),
      });

      const checkboxes = page.root.querySelectorAll('ti-checkbox-button');

      {
        // 第三个 checkbox 点击
        // 第三个 checkbox button 点击，抛出handleMax事件
        const checkboxIcon = checkboxes[2].shadowRoot.querySelector<HTMLTiCheckboxElement>('.titian-checkbox-button');
        checkboxIcon.click();
        await page.waitForChanges();
        expect(handleMax).toBeCalledTimes(1);
        expect(handleMax.mock.lastCall[0].detail).toEqual(undefined);
      }
    });
  });
});
