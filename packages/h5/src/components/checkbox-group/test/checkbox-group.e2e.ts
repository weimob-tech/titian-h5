import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

describe('多选组合', () => {
  describe('多选框行为测试', () => {
    it('非受控模式下，点击选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          children: [
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '1' } },
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');
      const checkboxes = await page.instance.findAll('ti-checkbox >>> .titian-checkbox');
      const checkboxIcon = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-icon-wrap');
      const checkboxLabel = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-label');

      {
        // checkbox 1 点击
        // icon 点击
        await checkboxIcon[0].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail(['1']);
        // 样式变为选中
        expect(checkboxes[0]).toHaveClass('titian-checkbox-checked');

        // label 点击
        await checkboxLabel[0].click();
        expect(change).toHaveReceivedEventDetail([]);
        // 样式变为取消
        expect(checkboxes[0]).not.toHaveClass('titian-checkbox-checked');
      }

      {
        // checkbox 2 点击
        // icon 点击
        await checkboxIcon[1].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail(['2']);
        // 样式变为取消
        expect(checkboxes[1]).toHaveClass('titian-checkbox-checked');

        // label 点击
        await checkboxLabel[1].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail([]);
        expect(checkboxes[1]).not.toHaveClass('titian-checkbox-checked');
      }
    });

    it('受控模式下，点击选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          value: ['1'],
          children: [
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '1' } },
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');
      const checkboxGroup = await page.instance.find('ti-checkbox-group');
      const checkboxes = await page.instance.findAll('ti-checkbox >>> .titian-checkbox');
      const checkboxIcon = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-icon-wrap');
      const checkboxLabel = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-label');

      {
        // checkbox 1 点击
        // icon 点击
        await checkboxIcon[0].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail([]);
        // 样式不变，仍然为选中
        expect(checkboxes[0]).toHaveClass('titian-checkbox-checked');
        checkboxGroup.setAttribute('value', JSON.stringify([]));
        await page.instance.waitForChanges();
        // 样式变为取消
        expect(checkboxes[0]).not.toHaveClass('titian-checkbox-checked');

        // label 点击
        await checkboxLabel[0].click();
        expect(change).toHaveReceivedEventDetail(['1']);
        // 样式不变，为取消
        expect(checkboxes[0]).not.toHaveClass('titian-checkbox-checked');
        checkboxGroup.setAttribute('value', JSON.stringify(['1']));
        await page.instance.waitForChanges();
        // 样式变为选中
        expect(checkboxes[0]).toHaveClass('titian-checkbox-checked');
      }

      {
        // checkbox 2 点击
        // icon 点击
        await checkboxIcon[1].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail(['1', '2']);
        // 样式不变，为取消
        expect(checkboxes[1]).not.toHaveClass('titian-checkbox-checked');
        checkboxGroup.setAttribute('value', JSON.stringify(['1', '2']));
        await page.instance.waitForChanges();
        // 样式变为选中
        expect(checkboxes[1]).toHaveClass('titian-checkbox-checked');

        // label 点击
        await checkboxLabel[1].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail(['1']);
        // 仍然为选中
        expect(checkboxes[1]).toHaveClass('titian-checkbox-checked');
        checkboxGroup.setAttribute('value', JSON.stringify(['1']));
        await page.instance.waitForChanges();
        // 样式变为取消
        expect(checkboxes[1]).not.toHaveClass('titian-checkbox-checked');
      }
    });

    it('禁用选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          disabled: true,
          children: [
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '1' } },
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const checkboxIcon = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-icon-wrap');
      const checkboxLabel = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-label');

      {
        // checkbox 1 点击
        // icon 点击
        await checkboxIcon[0].click();
        expect(change).not.toHaveReceivedEvent();

        // label 点击
        await checkboxLabel[0].click();
        expect(change).not.toHaveReceivedEvent();
      }

      {
        // checkbox 2 点击
        // icon 点击
        await checkboxIcon[1].click();
        expect(change).not.toHaveReceivedEvent();

        // label 点击
        await checkboxLabel[1].click();
        expect(change).not.toHaveReceivedEvent();
      }
    });

    it('禁用 label 选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          labelDisabled: true,
          children: [
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '1' } },
            { tagName: 'ti-checkbox', props: { label: 'checkbox', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const checkboxIcon = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-icon-wrap');
      const checkboxLabel = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-label');

      {
        // // checkbox 1 点击
        // // icon 点击
        await checkboxIcon[0].click();
        expect(change).toHaveReceivedEventDetail(['1']);

        // label 点击
        await checkboxLabel[0].click();
        expect(change).toHaveReceivedEventTimes(1);
      }

      {
        // checkbox 2 点击
        // icon 点击
        await checkboxIcon[1].click();
        expect(change).toHaveReceivedEventDetail(['1', '2']);

        // label 点击
        await checkboxLabel[1].click();
        expect(change).toHaveReceivedEventTimes(2);
      }
    });

    it('超过最大值抛出事件', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          max: 2,
          children: [
            { tagName: 'ti-checkbox', props: { label: 'checkbox 1', value: '1' } },
            { tagName: 'ti-checkbox', props: { label: 'checkbox 2', value: '2' } },
            { tagName: 'ti-checkbox', props: { label: 'checkbox 3', value: '3' } },
          ],
        },
      });
      const handleMax = await page.instance.spyOnEvent('handleMax');
      const checkboxIcon = await page.instance.findAll('ti-checkbox >>> .titian-checkbox-icon-wrap');

      {
        await checkboxIcon[0].click();
        await checkboxIcon[1].click();
      }
      {
        // checkbox 3 点击
        // icon 点击
        await checkboxIcon[2].click();
        await page.instance.waitForChanges();
        expect(handleMax).toHaveReceivedEventTimes(1);
        expect(handleMax).toHaveReceivedEventDetail(null);
      }
    });
  });

  describe('多选按钮行为测试', () => {
    it('点击选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          children: [
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox', value: '1' } },
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const checkboxButton = await page.instance.findAll('ti-checkbox-button >>> .titian-checkbox-button');

      {
        // checkbox button 1 点击
        await checkboxButton[0].click();
        expect(change).toHaveReceivedEventDetail(['1']);
      }

      {
        // checkbox button 2 点击
        await checkboxButton[1].click();
        expect(change).toHaveReceivedEventDetail(['1', '2']);
      }
    });

    it('禁用选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          disabled: true,
          children: [
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox', value: '1' } },
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const checkboxButton = await page.instance.findAll('ti-checkbox-button >>> .titian-checkbox-button');

      {
        // checkbox button 点击
        await checkboxButton[0].click();
        expect(change).not.toHaveReceivedEvent();
      }

      {
        // checkbox button 2 点击
        await checkboxButton[1].click();
        expect(change).not.toHaveReceivedEvent();
      }
    });

    it('超过最大值抛出事件', async () => {
      const page = new PageEl();
      await page.init<JSX.TiCheckboxGroup>({
        tagName: 'ti-checkbox-group',
        props: {
          max: 2,
          children: [
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox 1', value: '1' } },
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox 2', value: '2' } },
            { tagName: 'ti-checkbox-button', props: { label: 'checkbox 3', value: '3' } },
          ],
        },
      });
      const handleMax = await page.instance.spyOnEvent('handleMax');
      const checkboxIcon = await page.instance.findAll('ti-checkbox-button >>> .titian-checkbox-button');

      {
        await checkboxIcon[0].click();
        await checkboxIcon[1].click();
      }
      {
        // checkbox 3 点击
        // icon 点击
        await checkboxIcon[2].click();
        await page.instance.waitForChanges();
        expect(handleMax).toHaveReceivedEventTimes(1);
        expect(handleMax).toHaveReceivedEventDetail(null);
      }
    });
  });
});
