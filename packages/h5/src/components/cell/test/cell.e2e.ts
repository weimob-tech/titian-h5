import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

describe('单元格', () => {
  it('点击', async () => {
    const page = new PageEl();
    await page.init<JSX.TiCell>({
      tagName: 'ti-cell',
      props: {
        title: '单元格',
      },
    });
    const change = await page.instance.spyOnEvent('click');
    const cell = await page.find('.titian-cell');
    {
      // cell 点击
      await cell.click();
      expect(change).toHaveReceivedEvent();
    }
  });
});
