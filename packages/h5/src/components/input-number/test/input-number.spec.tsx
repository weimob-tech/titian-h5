import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiInputNumber } from '../index';
import { TestContainer } from '../../common/test/container';
import { sleep } from '../../common/test';
describe('渲染 ti-input-number', () => {
  it('基本用法', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber, TestContainer],
      template: () => (
        <test-container>
          <ti-input-number size="medium" />
          <ti-input-number size="big" />
          <ti-input-number variant="pure" />
          <ti-input-number variant="block" />
          <ti-input-number variant="bright" />
          <ti-input-number auto-width />
          <ti-input-number step={5} />
          <ti-input-number disabled />
          <ti-input-number disabled-input />
          <ti-input-number read-only />
          <ti-input-number read-only-input />
          <ti-input-number variant="pure" border />
          <ti-input-number variant="block" border />
          <ti-input-number thumbnail />
          <ti-input-number input-width={30} />
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('改变value', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      template: () => <ti-input-number size="medium" />,
    });
    page.root.setAttribute('value', '12');
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('展开收起', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      template: () => <ti-input-number thumbnail value={12} />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-number-thumbnail');
    dom?.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('点击加减号', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      template: () => <ti-input-number value={12} max={13} />,
    });
    const plusBtn = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-number-plus');
    const minusBtn = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-number-minus');
    plusBtn?.dispatchEvent(new Event('click'));
    await sleep(200);
    plusBtn?.dispatchEvent(new Event('click'));
    await sleep(200);
    minusBtn?.dispatchEvent(new Event('click'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('输入', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      template: () => <ti-input-number max={3} />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-number-field');
    dom?.dispatchEvent(new Event('focus'));
    await sleep(200);
    dom?.dispatchEvent(new Event('click'));
    await sleep(200);
    dom.value = '1';
    dom?.dispatchEvent(new Event('input'));
    await sleep(200);
    dom.value = '12';
    dom?.dispatchEvent(new Event('input'));
    await sleep(200);
    dom?.dispatchEvent(new Event('blur'));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });

  it('输入整数', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      template: () => <ti-input-number integer value={'12.'} />,
    });
    const dom = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-number-field');
    dom?.dispatchEvent(new CustomEvent('input'));
    await sleep(200);
    expect(page.root).toMatchSnapshot();
  });

  it('非受控', async () => {
    const page = await newSpecPage({
      components: [TiInputNumber],
      template: () => <ti-input-number asyncChange />,
    });
    const plusBtn = page.root.shadowRoot.querySelector<HTMLInputElement>('.titian-input-number-plus');
    plusBtn?.dispatchEvent(new Event('click'));
    await sleep(200);
    expect(page.root).toMatchSnapshot();
  });
});
