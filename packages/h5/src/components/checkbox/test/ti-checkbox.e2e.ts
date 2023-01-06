import { newE2EPage } from '@stencil/core/testing';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

describe('ti-checkbox', () => {
  it('trigger change with defaultChecked', async () => {
    const page = await newE2EPage();
    // 默认使用 default-checked 选中
    await page.setContent('<ti-checkbox label="checkbox" default-checked="true"></ti-checkbox>');
    const change = await page.spyOnEvent('change');
    const checkbox = await page.find('ti-checkbox');
    const checkboxLabel = await page.find('ti-checkbox >>> .titian-checkbox-label');
    const checkboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon-wrap');

    {
      // label 点击 => 取消
      await checkboxLabel.click();
      expect(change).toHaveReceivedEventDetail(false);
      expect(change.length).toBe(1);
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
    }

    {
      // label 点击 => 选中
      await checkboxLabel.click();
      expect(change).toHaveReceivedEventDetail(true);
      expect(change.length).toBe(2);
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
    }

    {
      // 禁用 label 点击 （label-disabled），保持上一次的 true
      checkbox.setProperty('labelDisabled', true);
      await page.waitForChanges();
      await checkboxLabel.click();
      expect(change.length).toBe(2);
    }

    {
      // 取消禁用 label 点击 （label-disabled），并 label 点击 => 取消
      checkbox.setProperty('labelDisabled', false);
      await page.waitForChanges();
      await checkboxLabel.click();
      expect(change).toHaveReceivedEventDetail(false);
      expect(change.length).toBe(3);
    }

    {
      // icon 点击 => 选中
      await checkboxIcon.click();
      expect(change).toHaveReceivedEventDetail(true);
      expect(change.length).toBe(4);
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
    }

    {
      // icon 点击 => 取消
      await checkboxIcon.click();
      expect(change).toHaveReceivedEventDetail(false);
      expect(change.length).toBe(5);
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
    }

    {
      // 禁用所有点击（disabled), 此时为取消状态
      checkbox.setProperty('disabled', true);
      await page.waitForChanges();
      {
        // label 被禁用
        await checkboxLabel.click();
        expect(change.length).toBe(5);
      }

      {
        // icon 被禁用
        await checkboxIcon.click();
        expect(change.length).toBe(5);
      }
    }

    {
      // 取消 禁用所有点击（disabled), 此时为取消状态，点击icon => 选中
      checkbox.setProperty('disabled', false);
      await page.waitForChanges();
      {
        await checkboxIcon.click();
        expect(change).toHaveReceivedEventDetail(true);
        expect(change.length).toBe(6);
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
      }
    }
  });

  it('trigger change with checked', async () => {
    const page = await newE2EPage();
    // 默认使用 default-checked 选中
    await page.setContent('<ti-checkbox label="checkbox" checked="true"></ti-checkbox>');
    const change = await page.spyOnEvent('change');
    const checkbox = await page.find('ti-checkbox');
    const checkboxLabel = await page.find('ti-checkbox >>> .titian-checkbox-label');
    const checkboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon-wrap');

    {
      // label 点击 => 取消
      await checkboxLabel.click();
      expect(change).toHaveReceivedEventDetail(false);
      expect(change.length).toBe(1);
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      // 仍然保持 选中状态 的 class
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);

      await checkbox.setProperty('checked', false);
      await page.waitForChanges();

      {
        // 取消状态 的 class
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);
      }
    }

    {
      // label 点击 => 选中
      await checkboxLabel.click();
      expect(change).toHaveReceivedEventDetail(true);
      expect(change.length).toBe(2);
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      // 仍然保持 取消状态 的 class
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);

      await checkbox.setProperty('checked', true);
      await page.waitForChanges();

      {
        // 选中状态 的 class
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
      }
    }

    {
      // 禁用 label 点击 （label-disabled），保持上一次的 true
      checkbox.setProperty('labelDisabled', true);
      await page.waitForChanges();
      await checkboxLabel.click();
      expect(change.length).toBe(2);

      // 保持 选中 状态
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
    }

    {
      // 取消禁用 label 点击 （label-disabled），并 label 点击 => 取消
      checkbox.setProperty('labelDisabled', false);
      await page.waitForChanges();
      await checkboxLabel.click();
      expect(change).toHaveReceivedEventDetail(false);
      expect(change.length).toBe(3);

      // 保持 选中 状态
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);

      await checkbox.setProperty('checked', false);
      await page.waitForChanges();

      {
        // 取消 状态
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);
      }
    }

    {
      // icon 点击 => 选中
      await checkboxIcon.click();
      expect(change).toHaveReceivedEventDetail(true);
      expect(change.length).toBe(4);
      // 保持 取消 状态
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);

      await checkbox.setProperty('checked', true);
      await page.waitForChanges();

      {
        // 选中状态
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
      }
    }

    {
      // icon 点击 => 取消
      await checkboxIcon.click();
      expect(change).toHaveReceivedEventDetail(false);
      expect(change.length).toBe(5);
      // 保持选中状态
      const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
      expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);

      await checkbox.setProperty('checked', false);
      await page.waitForChanges();

      {
        // 取消 状态
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
      }
    }

    {
      // 禁用所有点击（disabled), 此时为 取消状态
      checkbox.setProperty('disabled', true);
      await page.waitForChanges();
      {
        // label 被禁用
        await checkboxLabel.click();
        expect(change.length).toBe(5);
      }

      {
        // icon 被禁用
        await checkboxIcon.click();
        expect(change.length).toBe(5);
      }
    }

    {
      // 取消 禁用所有点击（disabled), 此时为取消状态，点击icon => 选中
      checkbox.setProperty('disabled', false);
      await page.waitForChanges();

      {
        await checkboxIcon.click();
        expect(change).toHaveReceivedEventDetail(true);
        expect(change.length).toBe(6);
        const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
        expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
        expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-out']);

        await checkbox.setProperty('checked', true);
        await page.waitForChanges();

        {
          const newCheckboxIcon = await page.find('ti-checkbox >>> .titian-checkbox-icon');
          expect(newCheckboxIcon).toHaveClasses(['titian-checkbox-icon-zoom-in', 'titian-checkbox-icon-checked']);
          expect(newCheckboxIcon).not.toHaveClasses(['titian-checkbox-icon-zoom-out']);
        }
      }
    }
  });
});
