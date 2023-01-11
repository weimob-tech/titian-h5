import { newSpecPage } from '@stencil/core/testing';
import { TiCell } from '../../cell';
import { TiCellGroup } from '..';
import { TestContainer } from '../../common/test/container';
import { h } from '@stencil/core';

describe('单元格渲染测试', () => {
  it('多个单元格组合在一起', async () => {
    const page = await newSpecPage({
      components: [TiCell, TiCellGroup, TestContainer],
      template: () => (
        <test-container>
          <ti-cell-group title="单元格组标题">
            <ti-cell title="标题" desc="详细内容文字" />
            <ti-cell title="标题" desc="详细内容文字" />
            <ti-cell title="标题" desc="详细内容文字" />
          </ti-cell-group>

          <ti-cell-group title="单元格组标题" sub-title="单元格组副标题">
            <ti-cell title="标题" desc="详细内容文字" />
            <ti-cell title="标题" desc="详细内容文字" />
            <ti-cell title="标题" desc="详细内容文字" />
          </ti-cell-group>

          <ti-cell-group title="单元格组模式为卡片" mode="card">
            <ti-cell title="标题" desc="详细内容文字" />
            <ti-cell title="标题" desc="详细内容文字" />
            <ti-cell title="标题" desc="详细内容文字" />
          </ti-cell-group>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });

  it('使用 slot 自定义 title', async () => {
    const page = await newSpecPage({
      components: [TiCell, TiCellGroup],
      template: () => (
        <ti-cell-group>
          <div slot="title">单元格组标题</div>
          <ti-cell title="标题" desc="详细内容文字" />
          <ti-cell title="标题" desc="详细内容文字" />
          <ti-cell title="标题" desc="详细内容文字" />
        </ti-cell-group>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
