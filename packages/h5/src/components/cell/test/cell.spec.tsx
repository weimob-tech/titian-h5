import { newSpecPage } from '@stencil/core/testing';
import { TiCell } from '../index';
import { TestContainer } from '../../common/test/container';
import { h } from '@stencil/core';

describe('单元格渲染测试', () => {
  it('单独使用单元格', async () => {
    const page = await newSpecPage({
      components: [TiCell, TestContainer],
      template: () => (
        <test-container>
          <ti-cell title="标题" desc="不展示下方分割线" divider={false} />
          <ti-cell title="标题" />
          <ti-cell title="标题" desc="居右详细内容文字" />
          <ti-cell title="标题" sub-desc="居右下方文字" />
          <ti-cell title="标题" desc="居右详细内容文字" sub-desc="居右下方文字" />
          <ti-cell title="标题" desc="居右详细内容文字" sub-desc="居右下方文字" right-icon="arrow-right" />
          <ti-cell title="标题" desc="居右详细内容文字" sub-desc="居右下方文字" arrow />
          <ti-cell title="标题" label="标题下方附加信息" />
          <ti-cell title="标题" desc="自定义左侧图标" icon="home" />
          <ti-cell title="标题" desc="自定义图标颜色" icon="home" color="#ff0000" />
          <ti-cell title="标题" desc="自定义右侧图标" right-icon="arrow-right" />
          <ti-cell title="标题" desc="使用默认右侧箭头" arrow />
          <ti-cell title="标题" desc="禁用单元格" disabled />
          <ti-cell title="标题" desc="开启点击反馈" clickable />
          <ti-cell title="标题" label="附加信息" desc="居上对齐" align-items="start" />
          <ti-cell title="标题" label="附加信息" desc="居中对齐" align-items="center" />
          <ti-cell title="标题" label="附加信息" desc="居下对齐" align-items="end" />
          <ti-cell title="标题" label="附加信息" desc="居下对齐" align-items="end" />
          <ti-cell title="标题" label="附加信息" desc="居下对齐" align-items="end" use-sub-arrow />
        </test-container>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });

  it('使用 slot 修改单元格内容', async () => {
    const page = await newSpecPage({
      components: [TiCell, TestContainer],
      template: () => (
        <test-container>
          <ti-cell title="使用slot自定义左侧图标">
            <ti-icon name="home" slot="icon" />
          </ti-cell>
          <ti-cell title="使用slot自定义右侧图标">
            <ti-icon name="home" slot="right-icon" />
          </ti-cell>
          <ti-cell>
            <div slot="title">使用 slot 修改 title</div>
          </ti-cell>
          <ti-cell title="使用slot自定义label">
            <div slot="label">标题下方附加信息</div>
          </ti-cell>
          <ti-cell title="使用slot自定义desc">
            <div slot="desc">居右详细内容文字</div>
          </ti-cell>
        </test-container>
      ),
    });
    expect(page.root).toMatchSnapshot();
  });
});
