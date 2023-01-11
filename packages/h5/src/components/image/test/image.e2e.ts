import { PageEl } from '../../common/test/page-el';
import { JSX } from '../../../components';

// process.on('unhandledRejection', (reason, p) => {
//   console.log('Unhandled Rejection at:', p, 'reason:', reason);
// });

describe('渲染 ti-image', () => {
  it('点击', async () => {
    const page = new PageEl();
    await page.init<JSX.TiImage>({
      tagName: 'ti-image',
      props: {
        src: 'https://image-c-dev.weimobwmc.com/qa-On6X/8b97cd488593474ba4a8ccaa3c1a493f.png',
      },
    });
    const change = await page.instance.spyOnEvent('click');
    const img = await page.find('.titian-image');
    {
      await img.click();
      expect(change).toHaveReceivedEvent();
    }
  });
});
