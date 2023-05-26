import { Component, Element, h, Prop, State, Method, Event, EventEmitter } from '@stencil/core';
import { JSXBase, Watch } from '@stencil/core/internal';
import { stringToAttrStyle, addShadowRootStyle } from '../common/utils';
import { join, handle } from '../common/utils/namespace';

@Component({
  tag: 'ti-navbar',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiNavbar {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass = '';

  @Prop() extTitleClass = '';

  @Prop() extSubtitleClass = '';

  @Prop() extStyle: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() type: 'normal' | 'immersion' = 'normal';

  @Prop() title = '';

  @Prop() subtitle = '';

  @Prop() subtitleHeight: number;

  @Prop() fontColor = '';

  @Prop() background = '';

  @Prop() loading = false;

  @Prop() usePlaceholder = true;

  @Prop() useHomeButton = false;

  @Prop() useBackButton = true;

  @Prop() frostedGlass = false;

  @Prop() leftIcons: string[] = [];

  @Prop() rightIcons: string[] = [];

  @State() prefixIcons: string[] = [];

  @State() suffixIcons: string[] = [];

  @State() transitionDistance = 100;

  @State() transitionStartTop = 50;

  @State() backIconName = 'nav-back';

  @State() homeIconName = 'home';

  @State() opacity = 0;

  @Event({ bubbles: false, composed: false }) clickIcon!: EventEmitter<{ index: number; name: string }>;

  @Event({ bubbles: false, composed: false }) back!: EventEmitter<{ index: number; name: string }>;

  @Event({ bubbles: false, composed: false }) home!: EventEmitter<{ index: number; name: string }>;

  private setPrefixIcons = () => {
    const prefixIcons = Array.isArray(this.leftIcons) ? [...this.leftIcons] : [];
    if (this.useHomeButton && !prefixIcons.includes(this.homeIconName)) {
      prefixIcons.unshift(this.homeIconName);
    }
    if (this.useBackButton && !prefixIcons.includes(this.backIconName)) {
      prefixIcons.unshift(this.backIconName);
    }

    this.prefixIcons = prefixIcons;
  };

  private computedIconStyle = prefixIcons => {
    const menuWidth = 86;
    const menuHeight = 32;
    const style = {
      'width': `${(menuWidth / 2) * prefixIcons.length}px`,
      'height': `${menuHeight}px`,
      'border-radius': `${menuHeight / 2}px`,
    };
    if (prefixIcons.length === 1) {
      style.width = style.height;
    }

    return style;
  };

  private computedGroupStyle = () => {
    const { subtitle, subtitleHeight } = this;
    if (subtitle || subtitleHeight) {
      return { height: '32px' };
    }
    return { height: '44px' };
  };

  private computedNavStyle = () => {
    const { background, subtitle, subtitleHeight, type, opacity, fontColor, frostedGlass, extStyle } = this;
    let { usePlaceholder } = this;
    const style: any = {
      '--navbar-background-inner': background,
    };
    if (type === 'immersion') {
      usePlaceholder = false;
    }
    if (frostedGlass && (type === 'immersion' || !usePlaceholder)) {
      style['--navbar-background-inner'] = 'rgba(255, 255, 255, 0.7)';
      style['--navbar-backdrop-filter-inner'] = 'blur(8px)';
    }

    if (usePlaceholder) {
      if (subtitle || subtitleHeight) {
        style.height = '62px';
      } else {
        style.height = '44px';
      }
    }
    if (type === 'immersion') {
      style['--navbar-opacity'] = opacity;
    } else {
      style['--navbar-opacity'] = 1;
    }
    if (fontColor) {
      style['--navbar-title-color'] = fontColor;
      if (fontColor === '#ffffff') {
        style['--navbar-subtitle-color'] = fontColor;
        style['--navbar-icon-line-color'] = fontColor;
        style['--navbar-menu-background-inner'] = 'rgba(0, 0, 0, 15%)';
        style['--navbar-menu-border-color-inner'] = 'rgba(255, 255, 255, 30%)';
      }
    }
    return { ...style, ...stringToAttrStyle(extStyle) };
  };

  private onClickIcon = (index, name) => {
    const details = { index, name };
    if (name === 'nav-back') {
      this.back.emit(details);
    } else if (name === 'home') {
      this.home.emit(details);
    }
    this.clickIcon.emit(details);
  };

  @Watch('leftIcons')
  @Watch('useHomeButton')
  @Watch('useBackButton')
  updateLeftIcons() {
    this.setPrefixIcons();
  }

  @Method()
  async updateOpacity(e: { scrollTop: number }) {
    const { scrollTop } = e;
    let opacity = (scrollTop - this.transitionStartTop) / this.transitionDistance;
    opacity = Math.min(opacity, 1);
    if (opacity === this.opacity) return;
    this.opacity = opacity;
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
    this.setPrefixIcons();
  }

  render() {
    const {
      extClass,
      subtitle,
      prefixIcons,
      extTitleClass,
      extSubtitleClass,
      loading,
      title,
      fontColor,
      computedIconStyle,
      computedGroupStyle,
      computedNavStyle,
      subtitleHeight,
      rightIcons,
      onClickIcon,
    } = this;
    return (
      <div class={`${join('navbar')} ${extClass}`} style={computedNavStyle()} part={extClass}>
        <div
          class={`${join('navbar-main')}`}
          style={{ '--navbar-padding-v': subtitle || subtitleHeight ? '6px' : '0px', 'min-height': '44px' }}
        >
          <div class={`${join('navbar-group')}`} style={computedGroupStyle()}>
            <div class={`${join('navbar-prefix')}`}>
              <div
                class={`${join('navbar-icons', { border: prefixIcons.length > 1 })}`}
                style={computedIconStyle(prefixIcons)}
              >
                {prefixIcons.map((item, index) => (
                  <div class={`${join('navbar-icon')}`} aria-hidden="true" onClick={() => onClickIcon(index, item)}>
                    <ti-icon name={item} size="40" color={fontColor} />
                    <div class={`${join('navbar-line', { hidden: index === prefixIcons.length - 1 })}`} />
                  </div>
                ))}
              </div>
              <slot name="prefix" />
            </div>
            {loading && <ti-loading size={40} color={fontColor === '#ffffff' ? '#ffffff' : '#9e9e9e'} />}
            {title ? (
              <div class={`${handle('navbar', ['title', 'animate-text'])} ${extTitleClass}`} part={extTitleClass}>
                {title}
              </div>
            ) : (
              <div class={`${join('navbar-animate-text')}`}>
                <slot name="title" />
              </div>
            )}
            <div class={`${join('navbar-suffix')}`}>
              <div
                class={`${join('navbar-icons', { border: rightIcons.length > 1 })}`}
                style={computedIconStyle(rightIcons)}
              >
                {rightIcons.map((item, index) => (
                  <div class={`${join('navbar-icon')}`} aria-hidden="true" onClick={() => onClickIcon(index, item)}>
                    <ti-icon name={item} size="40" color={fontColor} />
                    <div class={`${join('navbar-line', { hidden: index === rightIcons.length - 1 })}`} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          {subtitle ? (
            <div
              class={`${handle('navbar', ['subtitle', 'animate-text'])} ${extSubtitleClass}`}
              style={{ paddingBottom: '4px' }}
              part={extSubtitleClass}
            >
              {subtitle}
            </div>
          ) : (
            <div class={`${join('navbar-animate-text')}`}>
              <slot name="subtitle" />
            </div>
          )}
        </div>
      </div>
    );
  }
}
