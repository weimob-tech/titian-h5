import { Component, h, Prop, State, Element, Watch } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract, use } from '../common/basic/BasicComponent';
import Transition from '../common/basic/transition';
import { isString, addEventListener, addShadowRootStyle, stringToAttrStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import { throttleByAnimationFrameDecorator } from '../common/utils/raf';
import { getScroll, scrollTo } from '../common/utils/scroll';

@Component({
  tag: 'ti-back-top',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiBackTop implements BasicComponentAbstract {
  @use(Transition) this;

  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass;

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  /**
   * 滚动距顶部指定距离后展示
   *
   * @type number
   * @default 400
   * @example
   * <TiBackTop visibilityHeight={100} />
   * @since 0.1.0
   * @memberOf BackTopProps
   * */
  @Prop() visibilityHeight = 400;

  /**
   * 滚动到顶部时间（ms）
   *
   * @type number
   * @default 300
   * @example
   * <TiBackTop duration={300} />
   * @since 0.1.0
   * @memberOf BackTopProps
   * */
  @Prop() duration = 300;

  @Prop() scrollDuration = 300;

  /**
   * 展示文字
   *
   * @type string
   * @default ''
   * @example
   * <TiBackTop text="返回顶部" />
   * @since 0.1.0
   * @memberOf BackTopProps
   * */
  @Prop() text: string;

  /**
   * 设置需要监听其滚动事件的元素，值为一个返回对应 DOM 元素的函数
   *
   * @type {() => HTMLElement}
   * @default Document
   * @example
   * <TiBackTop target={() => window} />
   * @memberOf BackTopProps
   */
  @Prop() target: () => HTMLElement | Window | Document;

  /**
   * 绑定点击事件并触发返回顶部
   *
   * @returns {void}
   * @example
   * <TiBackTop onClick={() => {}} />
   * @since 0.1.0
   * @memberOf BackTopProps
   * */
  // @Event({ bubbles: false, composed: false }) click: EventEmitter<never>;

  show: boolean;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  private name = 'slide-up';

  @State() classes = '';

  @State() display = false;

  @throttleByAnimationFrameDecorator(5)
  handleScroll(e) {
    const scrollTop = getScroll(e.target, true);
    this.show = scrollTop > this.visibilityHeight;
  }

  @Watch('extCss')
  updateShadowRootStyle() {
    addShadowRootStyle.call(this);
  }

  private ref = null;

  private scrollCancel = null;

  bindScrollEvent() {
    const { target, getDefaultTarget } = this;
    const container = (target || getDefaultTarget.bind(this))?.();
    this.scrollCancel = addEventListener(container, 'scroll', (e: HTMLElement) => {
      this.handleScroll(e);
    });
    this.handleScroll({ target: container });
  }

  private getDefaultTarget() {
    return this.ref?.ownerDocument || window;
  }

  componentWillLoad() {
    this.updateShadowRootStyle();
  }

  componentDidLoad(): void {
    this.bindScrollEvent();
  }

  disconnectedCallback(): void {
    if (typeof this.scrollCancel === 'function') {
      this.scrollCancel();
    }
    // @ts-ignore
    this.handleScroll?.cancel();
  }

  private scrollToTop() {
    const { target, scrollDuration = 300, getDefaultTarget } = this;
    scrollTo(0, {
      getContainer: target || getDefaultTarget.bind(this),
      duration: scrollDuration,
    });
    // this.click.emit();
  }

  private getClassNames() {
    const classList = [namespace.join('back-top'), this.classes, this.extClass];
    return classList.join(' ');
  }

  private getStyle() {
    const { extStyle, display } = this;
    return {
      ...stringToAttrStyle(extStyle),
      ...(display ? {} : { display: 'none' }),
    };
  }

  renderText() {
    if (this.text) {
      return <span class={namespace.handle('back-top', 'text')}>{isString(this.text) ? this.text : null}</span>;
    }
    return <slot />;
  }

  render() {
    return (
      <div
        part={this.extClass}
        aria-hidden="true"
        ref={e => (this.ref = e)}
        class={this.getClassNames()}
        onClick={this.scrollToTop.bind(this)}
        style={this.getStyle()}
      >
        <ti-icon size={this.text ? 32 : 48} name="go-to-top" />
        {this.renderText()}
      </div>
    );
  }
}
