import { Component, Prop, Element, State, h, Listen, Watch, Event, EventEmitter } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { BasicComponentAbstract } from '../common/basic/BasicComponent';
import { stringToAttrStyle, throttle, addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';
import addUnit from '../common/utils/suffix';

enum ImageModeEnum {
  'SCALE_TO_FILL' = 'scaleToFill',
  'ASPECT_FIT' = 'aspectFit',
  'ASPECT_FILL' = 'aspectFill',
  'WIDTH_FIX' = 'widthFix',
  'HEIGHT_FIX' = 'heightFix',
  'TOP' = 'top',
  'BOTTOM' = 'bottom',
  'CENTER' = 'center',
  'LEFT' = 'left',
  'RIGHT' = 'right',
  'TOP_LEFT' = 'top left',
  'TOP_RIGHT' = 'top right',
  'BOTTOM_LEFT' = 'bottom left',
  'BOTTOM_RIGHT' = 'bottom right',
  'SCALE_DOWN' = 'scaleDown',
  'NONE' = 'none',
  'FILL' = 'fill',
  'COVER' = 'cover',
  'CONTAIN' = 'contain',
}
type MainStyleAttrs = {
  'width'?: string;
  'height'?: string;
  'border-radius'?: string;
};
@Component({
  tag: 'ti-image',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiImage implements BasicComponentAbstract {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() extClass?: string = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'];

  @Prop() src: string;

  @Prop() alt: string;

  @Prop() width?: string | number;

  @Prop() height?: string | number;

  @Prop() radius?: string | number;

  @Prop() mode?: ImageModeEnum = ImageModeEnum.SCALE_TO_FILL;

  @Prop() lazyLoad?: boolean;

  @Prop() showLoading?: boolean = true;

  @Prop() showError?: boolean = true;

  @Prop() useLoadingSlot?: boolean;

  @Prop() useErrorSlot?: boolean;

  @Prop() loadingIcon?: string = 'default-pic';

  @Prop() errorIcon?: string = 'default-pic';

  @Prop() loadingIconSize?: number = 72;

  @Prop() errorIconSize?: number = 72;

  @Prop() useGlobalStyle?: boolean;

  @Prop() aspectRatio?: number | 'inherit' = -1;

  @State() loading = true;

  @State() isError = false;

  @State() imageWidth: number;

  @State() imageHeight: number;

  @State() show = false;

  @State() mainStyle: MainStyleAttrs = {};

  @State() imgStyle = {};

  @State() modeClass = {};

  @Event({ bubbles: false, composed: false }) load: EventEmitter<{ width: number; height: number }>;

  @Event({ bubbles: false, composed: false }) error: EventEmitter<never>;

  private handleLazyLoad: any;

  private imgBoxRef = null;

  private imgRef = null;

  private isSupportLoading = false;

  private timer = null;

  @Listen('scroll', { target: 'window', capture: true })
  handleScroll() {
    if (!this.lazyLoad || !this.loading || !this.handleLazyLoad) return;
    this.handleLazyLoad();
  }

  @Watch('radius')
  @Watch('width')
  @Watch('height')
  @Watch('aspectRatio')
  @Watch('extStyle')
  getMainStyle() {
    const { width, height, radius, extStyle, useGlobalStyle, aspectRatio } = this;
    const mainStyle: MainStyleAttrs = {};
    if (useGlobalStyle) {
      const curRadius = radius ? addUnit(radius) : '0px';
      mainStyle['border-radius'] = `calc(var(--base-radius-size, 0px) + ${curRadius})`;
    } else {
      mainStyle['border-radius'] = addUnit(radius);
    }
    if (aspectRatio > 0) {
      mainStyle['--image-aspect-ratio'] = aspectRatio;
    }

    if (width) {
      mainStyle.width = addUnit(width);
    }
    if (height) {
      mainStyle.height = addUnit(height);
      // 没有宽度，只有高度（且不是百分比）
      const supportsAspect = CSS.supports('aspect-ratio: 1');
      const useAspectRatio = aspectRatio > 0 || aspectRatio === 'inherit';
      if (
        !supportsAspect &&
        useAspectRatio &&
        !width &&
        (typeof height === 'string' ? height.indexOf('%') === -1 : true)
      ) {
        mainStyle.width = `calc(${addUnit(height)} * var(--image-aspect-ratio, 1))`;
      }
    }

    this.mainStyle = Object.assign(mainStyle, stringToAttrStyle(extStyle));
  }

  @Watch('mode')
  getImgStyle() {
    const { mode } = this;
    const MODE_MAP = {
      none: 'center',
      scaleToFill: 'fill',
      aspectFill: 'cover',
      aspectFit: 'contain',
    };
    const currentMode = MODE_MAP[mode] || mode || ImageModeEnum.SCALE_TO_FILL;
    this.modeClass = currentMode.toLowerCase().replace(/\s/g, '');
  }

  @Watch('src')
  update(val, oldVal) {
    if (val !== oldVal) {
      this.loading = true;
      this.isError = false;
      this.LazyLoadImg();
    }
  }

  onLoad = () => {
    this.isError = false;
    this.loading = false;
    this.handleLazyLoad = null;
    this.load.emit({ width: this.imgRef.naturalWidth, height: this.imgRef.naturalHeight });
  };

  onError = () => {
    this.isError = true;
    this.loading = false;
    this.error.emit();
  };

  componentWillLoad() {
    this.isSupportLoading = 'loading' in document.createElement('img');
    this.getMainStyle();
    this.getImgStyle();
    addShadowRootStyle.call(this);
  }

  LazyLoadImg() {
    if (!this.lazyLoad || this.isSupportLoading) return;
    const isOutScreen = () => {
      const { top, bottom } = this.imgBoxRef.getBoundingClientRect();
      return top > window.innerHeight * 3 || bottom < window.innerHeight * -3;
    };
    this.handleLazyLoad = throttle(() => {
      if (isOutScreen()) return;
      this.imgRef.src = this.src;
    });
    this.handleLazyLoad();
  }

  onTouchStart = () => {
    const img = this.host.querySelector('img');
    if (img) {
      img.src = this.src;
      return;
    }
    this.timer = setTimeout(() => {
      this.longpress();
    }, 500);
  };

  onTouchMove = () => {
    clearTimeout(this.timer);
  };

  onTouchEnd = () => {
    clearTimeout(this.timer);
  };

  longpress = () => {
    const img = document.createElement('img');
    img.src = this.src;
    img.setAttribute('style', 'opacity: 0;position:absolute;top:0;left:0;width:100%;height:100%');
    this.host.appendChild(img);
  };

  componentDidLoad() {
    this.LazyLoadImg();
  }

  render() {
    const {
      src,
      alt,
      extClass,
      mainStyle,
      imgStyle,
      loading,
      isError,
      modeClass,
      showLoading,
      useLoadingSlot,
      loadingIcon,
      loadingIconSize,
      useErrorSlot,
      showError,
      errorIcon,
      errorIconSize,
      isSupportLoading,
      lazyLoad,
      aspectRatio,
    } = this;
    const useAspectRatio = aspectRatio > 0 || aspectRatio === 'inherit';
    const imgClass = `${namespace.join('image-img', [modeClass, { ratio: useAspectRatio }])}`;
    const iconClass = `${namespace.join('image-notice')}`;
    return (
      <div
        class={`${namespace.join('image', [{ ratio: useAspectRatio }])} ${extClass}`}
        style={mainStyle}
        part={extClass}
        ref={el => el && (this.imgBoxRef = el)}
        aria-hidden="true"
        onTouchStart={this.onTouchStart}
        onTouchMove={this.onTouchMove}
        onTouchEnd={this.onTouchEnd}
      >
        {!isError &&
          (isSupportLoading || !lazyLoad ? (
            <img
              ref={el => el && (this.imgRef = el)}
              class={imgClass}
              src={src}
              alt={alt}
              style={imgStyle}
              loading={lazyLoad ? 'lazy' : 'eager'}
              onLoad={this.onLoad}
              onError={this.onError}
            />
          ) : (
            <img
              ref={el => el && (this.imgRef = el)}
              class={imgClass}
              date-src={src}
              alt={alt}
              style={imgStyle}
              onLoad={this.onLoad}
              onError={this.onError}
            />
          ))}
        {showLoading && loading && (
          <div class={iconClass}>
            {useLoadingSlot ? <slot name="loading" /> : <ti-icon name={loadingIcon} size={loadingIconSize} />}
          </div>
        )}
        {showError && isError && (
          <div class={iconClass}>
            {useErrorSlot ? <slot name="error" /> : <ti-icon name={errorIcon} size={errorIconSize} />}
          </div>
        )}
        <slot />
      </div>
    );
  }
}
