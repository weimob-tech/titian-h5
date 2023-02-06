import { Component, h, Prop, Element } from '@stencil/core';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { filterInvalidData, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

const PROPORTION = 1.2;

@Component({
  tag: 'ti-loading',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiLoading implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  /**
   * loading 展示模式
   *
   * @type {string}
   * @default 'circular'
   * @enum ['circular', 'spinner']
   * @example
   * <TiLoading mode="circular" />
   * @since 0.1.0
   * @memberOf LoadingProps
   */
  @Prop() mode: 'circular' | 'spinner' = 'circular';

  @Prop() color: string;

  /**
   * loading 尺寸
   *
   * @type {number}
   * @default 72
   * @example
   * <TiLoading size={100} />
   * @since 0.1.0
   * @memberOf LoadingProps
   */
  @Prop() size = 72;

  /**
   * 加载文字
   *
   * @type {string}
   * @default ''
   * @example
   * <TiLoading text="加载中" />
   * @since 0.1.0
   * @memberOf LoadingProps
   */
  @Prop() text = '';

  /**
   * 图标颜色
   *
   * @type {string}
   * @default ''
   * @enum https://developer.mozilla.org/zh-CN/docs/Web/CSS/flex-direction
   * @example
   * <ti-loading align="horizontal" />
   * @since 0.1.0
   * @memberOf LoadingProps
   */
  @Prop() direction = 'row';

  private readonly circular = Array(5).fill(0);

  private readonly spinner = Array(8).fill(0);

  private renderCircular() {
    const { mode, size, color } = this;
    const loadingSize = size / PROPORTION;

    const loadingStyles = {
      width: addUnit(loadingSize),
      height: addUnit(loadingSize),
    };

    const loadingItemStyle = {
      ...loadingStyles,
      borderWidth: addUnit(Math.max(loadingSize / 12, 2)),
      borderTopColor: color,
    };

    return this.circular.map(() => (
      <div class={namespace.join('loading-view', [mode])} style={loadingStyles}>
        <div class={namespace.handle('loading-view', ['item'])} style={loadingItemStyle} />
      </div>
    ));
  }

  private renderSpinner() {
    const { mode, size } = this;
    const loadingSize = size / PROPORTION;

    const loadingStyles = {
      width: addUnit(loadingSize),
      height: addUnit(loadingSize),
    };
    return this.spinner.map(() => <div class={namespace.join('loading-view', [mode])} style={loadingStyles} />);
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  render() {
    const { mode, direction, color, size } = this;
    const loadingSize = size / PROPORTION;
    const wrapStyles = filterInvalidData({
      'padding': addUnit(Math.ceil((size - loadingSize) / 2)),
      'width': addUnit(loadingSize),
      'height': addUnit(loadingSize),
      '--loading-color': color,
    });

    return (
      <div class={namespace.handle('loading', 'wrap')} style={{ flexDirection: direction }}>
        <div part={this.extClass} class={`${namespace.join('loading', [mode])} ${this.extClass}`} style={wrapStyles}>
          {mode === 'circular' ? this.renderCircular() : this.renderSpinner()}
        </div>
        <div class={namespace.join('loading-text', [direction, { empty: !this.text }])} style={{ color }}>
          {this.text || <slot />}
        </div>
      </div>
    );
  }
}
