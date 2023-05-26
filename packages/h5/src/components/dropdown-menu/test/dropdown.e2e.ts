import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

describe('回到顶部', () => {
  it('默认展开, 点击 title 后关闭', async () => {
    const dropMenuOptions = [
      { title: 'option 1', value: '1' },
      { title: 'option 2', value: '2' },
    ];
    const page = new PageEl();
    await page.init({
      tagName: 'ti-dropdown-menu',
      props: {
        children: [
          {
            tagName: 'ti-dropdown-item',
            props: {
              title: 'title 1',
              visible: true,
              value: '1',
              options: dropMenuOptions,
            } as JSX.TiDropdownItem,
          },
        ],
      },
    });
    const close = await page.instance.spyOnEvent('close');
    await page.instance.waitForChanges();
    const dropdownTitle = await page.instance.find('ti-dropdown-menu >>> .titian-dropdown-menu-title');
    await dropdownTitle.click();
    await page.instance.waitForChanges();
    expect(close).toHaveReceivedEvent();
  });

  it('默认展开, 点击 cell 后关闭', async () => {
    const dropMenuOptions = [
      { title: 'option 1', value: '1' },
      { title: 'option 2', value: '2' },
    ];
    const page = new PageEl();
    await page.init({
      tagName: 'ti-dropdown-menu',
      props: {
        children: [
          {
            tagName: 'ti-dropdown-item',
            props: {
              title: 'title 1',
              visible: true,
              options: dropMenuOptions,
            } as JSX.TiDropdownItem,
          },
        ],
      },
    });
    const dropdownItem = await page.instance.find('ti-dropdown-item');
    const change = await dropdownItem.spyOnEvent('change');
    await page.instance.waitForChanges();
    const cell = await page.instance.find('ti-dropdown-item >>> ti-cell');
    cell.triggerEvent('click');
    await page.instance.waitForChanges();
    expect(change).toHaveReceivedEventDetail('1');
  });
});
