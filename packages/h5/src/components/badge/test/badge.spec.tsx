import { newSpecPage } from '@stencil/core/testing';
import { h } from '@stencil/core';
import { TiBadge } from '../index';
import { TiCell } from '../../cell';
import { TestContainer } from '../../common/test/container';

describe('渲染 ti-action-sheet', () => {
  it('基本渲染', async () => {
    const page = await newSpecPage({
      components: [TiBadge, TestContainer],
      template: () => (
        <test-container>
          <ti-badge content="5">
            <div class="box" />
          </ti-badge>
          <ti-badge dot>
            <div class="box" />
          </ti-badge>
          <ti-badge icon="home">
            <div class="box" />
          </ti-badge>
          <div class="box" style={{ position: 'relative' }}>
            <ti-badge content="6" />
          </div>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('无定位', async () => {
    const page = await newSpecPage({
      components: [TiBadge, TiCell],
      template: () => (
        <ti-cell>
          <ti-badge static slot="desc" content="6" />
        </ti-cell>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('自定义偏移', async () => {
    const page = await newSpecPage({
      components: [TiBadge],
      template: () => (
        <ti-badge content="6" offset={[2, 6]}>
          <div class="box" />
        </ti-badge>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('在文字右上角', async () => {
    const page = await newSpecPage({
      components: [TiBadge],
      template: () => (
        <ti-badge content="6" at-text>
          <div>Title Text</div>
        </ti-badge>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('徽标内容撑开方向', async () => {
    const page = await newSpecPage({
      components: [TiBadge, TestContainer],
      template: () => (
        <test-container>
          <ti-badge content="6" spread="bothSides">
            <div class="box" />
          </ti-badge>
          <ti-badge content="6" spread="toRight">
            <div class="box" />
          </ti-badge>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
