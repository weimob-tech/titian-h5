import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiActionSheet } from '../index';
import { TiPopup } from '../../popup';
import { TiTransition } from '../../transition';
const actions = [
  { name: '选项1', description: '描述1' },
  { name: '选项1', description: '描述1', icon: 'home' },
  { name: '选项1', description: '描述1', disabled: true },
  { name: '选项1', description: '描述1', loading: true },
];
describe('渲染 ti-action-sheet', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiActionSheet],
      template: () => <ti-action-sheet title="标题" actions={actions} />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('字段别名', async () => {
    const options = [{ label: '选项1' }];
    const page = await newSpecPage({
      components: [TiActionSheet],
      template: () => <ti-action-sheet alias={{ name: 'label' }} actions={options} />,
    });
    expect(page.root).toMatchSnapshot();
  });

  it('点击遮罩关闭', async () => {
    const page = await newSpecPage({
      components: [TiActionSheet, TiPopup, TiTransition],
      template: () => <ti-action-sheet visible={true} title="标题" actions={actions} />,
    });
    const parent = page.root.shadowRoot.querySelector('ti-popup');
    const elm = parent.shadowRoot.querySelectorAll('ti-transition');
    elm[0].click();
    await page.waitForChanges();
  });

  it('点击菜单项', async () => {
    const page = await newSpecPage({
      components: [TiActionSheet, TiPopup, TiTransition],
      template: () => <ti-action-sheet visible={true} title="标题" actions={actions} />,
    });
    const parent = page.root.shadowRoot.querySelector('ti-popup');
    const btn = parent.querySelectorAll<HTMLDivElement>('.titian-action-sheet-button');
    btn[1].click();
    btn[2].click();
    await page.waitForChanges();
  });

  it('点击取消按钮', async () => {
    const page = await newSpecPage({
      components: [TiActionSheet, TiPopup, TiTransition],
      template: () => <ti-action-sheet visible={true} cancel-text="取消" title="标题" actions={actions} />,
    });
    const parent = page.root.shadowRoot.querySelector('ti-popup');
    const btn = parent.querySelector<HTMLButtonElement>('.titian-action-sheet-cancel');
    btn.click();
    await page.waitForChanges();
  });
});
