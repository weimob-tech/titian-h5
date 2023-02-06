import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

describe('多选组合', () => {
  describe('多选框行为测试', () => {
    it('非受控模式下，点击选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiRadioGroup>({
        tagName: 'ti-radio-group',
        props: {
          children: [
            { tagName: 'ti-radio', props: { label: 'radio', value: '1' } },
            { tagName: 'ti-radio', props: { label: 'radio', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');
      const radios = await page.instance.findAll('ti-radio >>> .titian-radio');
      const radioIcon = await page.instance.findAll('ti-radio >>> .titian-radio-icon-wrap');
      const radioLabel = await page.instance.findAll('ti-radio >>> .titian-radio-label');

      {
        // radio 1 点击
        // icon 点击
        await radioIcon[0].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail('1');
        // 样式变为选中
        expect(radios[0]).toHaveClass('titian-radio-checked');

        // radio 2 icon 点击
        await radioIcon[1].click();
        expect(change).toHaveReceivedEventDetail('2');
        // 样式变为取消
        expect(radios[0]).not.toHaveClass('titian-radio-checked');
      }

      {
        // radio 2 点击
        // icon 点击
        await radioLabel[0].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail('1');
        // 样式变为取消
        expect(radios[1]).not.toHaveClass('titian-radio-checked');
        expect(radios[0]).toHaveClass('titian-radio-checked');

        // label 点击
        await radioLabel[1].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail('2');
        expect(radios[0]).not.toHaveClass('titian-radio-checked');
        expect(radios[1]).toHaveClass('titian-radio-checked');
      }
    });

    it('受控模式下，点击选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiRadioGroup>({
        tagName: 'ti-radio-group',
        props: {
          value: '1',
          children: [
            { tagName: 'ti-radio', props: { label: 'radio', value: '1' } },
            { tagName: 'ti-radio', props: { label: 'radio', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');
      const radioGroup = await page.instance.find('ti-radio-group');
      const radios = await page.instance.findAll('ti-radio >>> .titian-radio');
      const radioIcon = await page.instance.findAll('ti-radio >>> .titian-radio-icon-wrap');

      {
        // radio 1 点击
        await radioIcon[0].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail('1');
        // 样式不变，仍然为选中
        expect(radios[0]).toHaveClass('titian-radio-checked');
        radioGroup.setAttribute('value', '');
        await page.instance.waitForChanges();
        // 样式变为取消
        expect(radios[0]).not.toHaveClass('titian-radio-checked');
      }

      {
        // radio 2 点击
        await radioIcon[1].click();
        await page.instance.waitForChanges();
        expect(change).toHaveReceivedEventDetail('2');
        // 仍然为取消选中
        expect(radios[1]).not.toHaveClass('titian-radio-checked');
        radioGroup.setAttribute('value', '2');
        await page.instance.waitForChanges();
        // 样式变为选中
        expect(radios[1]).toHaveClass('titian-radio-checked');
      }
    });

    it('禁用选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiRadioGroup>({
        tagName: 'ti-radio-group',
        props: {
          disabled: true,
          children: [
            { tagName: 'ti-radio', props: { label: 'radio', value: '1' } },
            { tagName: 'ti-radio', props: { label: 'radio', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const radioIcon = await page.instance.findAll('ti-radio >>> .titian-radio-icon-wrap');
      const radioLabel = await page.instance.findAll('ti-radio >>> .titian-radio-label');

      {
        // radio 1 点击
        // icon 点击
        await radioIcon[0].click();
        expect(change).not.toHaveReceivedEvent();

        // label 点击
        await radioLabel[0].click();
        expect(change).not.toHaveReceivedEvent();
      }

      {
        // radio 2 点击
        // icon 点击
        await radioIcon[1].click();
        expect(change).not.toHaveReceivedEvent();

        // label 点击
        await radioLabel[1].click();
        expect(change).not.toHaveReceivedEvent();
      }
    });

    it('禁用 label 选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiRadioGroup>({
        tagName: 'ti-radio-group',
        props: {
          labelDisabled: true,
          children: [
            { tagName: 'ti-radio', props: { label: 'radio', value: '1' } },
            { tagName: 'ti-radio', props: { label: 'radio', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const radioIcon = await page.instance.findAll('ti-radio >>> .titian-radio-icon-wrap');
      const radioLabel = await page.instance.findAll('ti-radio >>> .titian-radio-label');

      {
        // // radio 1 点击
        // // icon 点击
        await radioIcon[0].click();
        expect(change).toHaveReceivedEventDetail('1');

        // label 点击
        await radioLabel[0].click();
        expect(change).toHaveReceivedEventTimes(1);
      }

      {
        // radio 2 点击
        // icon 点击
        await radioIcon[1].click();
        expect(change).toHaveReceivedEventDetail('2');

        // label 点击
        await radioLabel[1].click();
        expect(change).toHaveReceivedEventTimes(2);
      }
    });
  });

  describe('多选按钮行为测试', () => {
    it('非受控模式，点击选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiRadioGroup>({
        tagName: 'ti-radio-group',
        props: {
          children: [
            { tagName: 'ti-radio-button', props: { label: 'radio', value: '1' } },
            { tagName: 'ti-radio-button', props: { label: 'radio', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const radioButton = await page.instance.findAll('ti-radio-button >>> .titian-radio-button');

      {
        // radio button 1 点击
        await radioButton[0].click();
        expect(change).toHaveReceivedEventDetail('1');
      }

      {
        // radio button 2 点击
        await radioButton[1].click();
        expect(change).toHaveReceivedEventDetail('2');
      }
    });

    it('禁用选中切换', async () => {
      const page = new PageEl();
      await page.init<JSX.TiRadioGroup>({
        tagName: 'ti-radio-group',
        props: {
          disabled: true,
          children: [
            { tagName: 'ti-radio-button', props: { label: 'radio', value: '1' } },
            { tagName: 'ti-radio-button', props: { label: 'radio', value: '2' } },
          ],
        },
      });
      const change = await page.instance.spyOnEvent('change');

      const radioButton = await page.instance.findAll('ti-radio-button >>> .titian-radio-button');

      {
        // radio button 点击
        await radioButton[0].click();
        expect(change).not.toHaveReceivedEvent();
      }

      {
        // radio button 2 点击
        await radioButton[1].click();
        expect(change).not.toHaveReceivedEvent();
      }
    });
  });
});
