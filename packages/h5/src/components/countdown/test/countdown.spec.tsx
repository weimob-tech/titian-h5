import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiCountdown } from '../index';
import { sleep } from '../../common/test';

const time = 11118888666;
describe('渲染 ti-countdown', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiCountdown],
      template: () => <ti-countdown autoplay time={time} variant="mixture" format="DD天HH时mm分ss SSS" size="big" />,
    });
    page.root.setAttribute('time', '1118888666');

    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('格式化时间', async () => {
    const page = await newSpecPage({
      components: [TiCountdown],
      template: () => <ti-countdown time={time} format="SSS" />,
    });
    page.root.setAttribute('format', 'HH:mm:ss SSS');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('风格', async () => {
    const page = await newSpecPage({
      components: [TiCountdown],
      template: () => <ti-countdown autoplay time={time} variant="pure" format="DD天HH:mm:ss SSS" />,
    });

    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('暂停', async () => {
    const time = 2000;
    const page = await newSpecPage({
      components: [TiCountdown],
      template: () => <ti-countdown time={time} variant="pure" format="DD天HH:mm:ss SSS"></ti-countdown>,
    });
    await page.root.start();
    await sleep(1000);
    await page.root.pause();
    await sleep(200);
    await page.root.start();
    await sleep(2000);
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('尺寸', async () => {
    const time = 1200;
    const page = await newSpecPage({
      components: [TiCountdown],
      template: () => <ti-countdown autoplay useSlot time={time} variant="block" size="small" />,
    });
    page.root.setAttribute('use-slot', 'false');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });

  it('自定义内容', async () => {
    const timeGroup = { day: '', hour: '', minute: '', second: '', millisecond: '' };
    const page = await newSpecPage({
      components: [TiCountdown],
      template: () => (
        <ti-countdown time={time}>
          <div class="time">{timeGroup.day}</div>
          <div class="tag">天</div>
          <div class="time">{timeGroup.hour}</div>
          <div class="tag">:</div>
          <div class="time">{timeGroup.minute}</div>
          <div class="tag">:</div>
          <div class="time">{timeGroup.second}</div>
          <div class="tag">:</div>
          <div class="time">{timeGroup.millisecond}</div>
        </ti-countdown>
      ),
    });
    page.root.setAttribute('use-slot', 'true');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
    page.body.innerHTML = '';
  });
});
