import { Component, h, Prop, State, Watch, Element, EventEmitter, Event, Method } from '@stencil/core';
import { JSXBase } from '@stencil/core/internal';
import { setStyle, stringToAttrStyle, nextAvailable, prevAvailable, addShadowRootStyle } from '../common/utils';
import Movement from '../common/utils/movement';
import { join, handle } from '../common/utils/namespace';
import { raf } from '../common/utils/raf';
import { getChildren } from '../common/utils/relation';

const SCALE = 0.2;
const DISPLAY_MULTIPLE_ITEMS = 1;
const SPACE_BETWEEN = 10;

@Component({
  tag: 'ti-swiper',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiSwiper {
  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() current = 0;

  @Prop() autoplay = false;

  @Prop() pagination: 'bullets' | 'fraction' | 'none' = 'none';

  @Prop() interval = 5000;

  @Prop() duration: number;

  @Prop() extClass? = '';

  @Prop() extContentClass? = '';

  @Prop() extStyle?: string | JSXBase.HTMLAttributes<Record<string, unknown>>['style'] = '';

  @Prop() vertical?: boolean = false;

  @Prop() displayMultipleItems = DISPLAY_MULTIPLE_ITEMS;

  @Prop() spaceBetween = SPACE_BETWEEN;

  @Prop() loop = false;

  @State() index = 0;

  @Event({ eventName: 'change', composed: false }) changeEvent!: EventEmitter<{
    current: number;
    currentItemId: string;
    source: 'touch' | '';
  }>;

  @Event({ eventName: 'animationFinish', composed: false }) animationFinishEvent!: EventEmitter<number>;

  @Prop() sports?: boolean = false;

  box!: HTMLElement;

  movement: Movement;

  temp: {
    width: number;
    height: number;
    lastLeft: number;
    lastTop: number;
  };

  touch = false;

  timerId = null;

  @Watch('autoplay')
  observerAutoPlay(value: boolean, oldValue?: boolean) {
    if (value !== oldValue) {
      clearTimeout(this.timerId);
      if (value) {
        this.timerId = setTimeout(() => {
          const childrenLength = this.children?.length || 0;
          if (this.loop) {
            if (this.index === childrenLength - 1) {
              const curIndex = 1;
              setStyle(this.box, {
                'transform': this.getTransform(curIndex),
                'transition-property': 'none',
              } as any);
              this.index = curIndex;
            }
          }
          const nextIndex = this.index < childrenLength - 1 ? this.index + 1 : 0;
          setStyle(this.box, {
            'transform': this.getTransform(nextIndex),
            'transition-property': 'transform',
          } as any);
          this.observerAutoPlay(value);
          this.index = nextIndex;

          this.changeEvent.emit({
            current: this.getCurIndex(this.index),
            source: 'touch',
            currentItemId: this.children[this.getCurIndex(this.index)].itemId,
          });
        }, this.interval);
      }
    }
  }

  @Watch('current')
  observerCurrent(value: number) {
    raf(() => {
      const { children, index, sports, box } = this;
      if (index === value) {
        return;
      }
      if (!children[index] || children[index].skipHiddenItemLayout) {
        return;
      }
      if (typeof value !== 'number' || value < 0 || !Number.isInteger(value)) {
        return;
      }
      this.index = value;

      if (!sports) {
        setStyle(box, {
          transition: 'none',
        });
      }
      this.changeEvent.emit({
        current: this.getCurIndex(value),
        source: '',
        currentItemId: this.children[this.getCurIndex(value)].itemId || '',
      });
    });
  }

  @Watch('vertical')
  observerVertical() {
    this.movement?.destroy();
    this.movement = new Movement({
      box: this.host,
      vertical: this.vertical,
      touchstart: this.touchstart,
      touchmove: this.touchmove,
      touchend: this.touchend,
    });
  }

  get rect() {
    return this.box?.getBoundingClientRect() || this.host.getBoundingClientRect();
  }

  get children() {
    return getChildren({
      host: this.host,
      useSlot: true,
      tag: 'ti-swiper-item',
      relations: 'descendant', // 'descendant' ,'child',
    });
  }

  descendant: HTMLTiSwiperItemElement[] = [];

  insertAfter(newElement, targetElement) {
    const parent = targetElement.parentNode; // 获取目标节点的父级标签
    if (parent.lastChild === targetElement) {
      // 如果目标节点正好是最后一个节点，使用appendChild插入
      parent.appendChild(newElement);
    } else {
      parent.insertBefore(newElement, targetElement.nextSibling); // 一般情况下要取得目标节点的下一个节点，再使用insertBefore()方法。
    }
  }

  componentDidLoad() {
    this.observerAutoPlay(this.autoplay);
    if (this.loop) {
      const { children } = this;
      this.insertAfter(children[0].cloneNode(true), children[children.length - 1]);
      children[children.length - 1].parentNode.prepend(children[children.length - 1].cloneNode(true));
      this.index = this.current + 1;
    } else {
      this.index = this.current;
    }
  }

  componentWillLoad() {
    addShadowRootStyle.call(this);
  }

  connectedCallback() {
    this.movement = new Movement({
      box: this.host,
      vertical: this.vertical,
      touchstart: this.touchstart,
      touchmove: this.touchmove,
      touchend: this.touchend,
    });
  }

  disconnectedCallback() {
    this.movement?.destroy();
  }

  getCurIndex(index) {
    if (this.loop) {
      if (index === 0) {
        return this.children.length - 3;
      }
      if (index === this.children.length - 1) {
        return 0;
      }
      return index - 1;
    }
    return index;
  }

  onTransitionEnd = () => {
    this.animationFinishEvent.emit(this.getCurIndex(this.index));
  };

  touchstart = () => {
    const { width, height, left: lastLeft, top: lastTop } = this.rect;

    clearTimeout(this.timerId);
    this.temp = {
      width,
      height,
      lastLeft,
      lastTop,
    };
    this.descendant = this.children;

    if (this.loop) {
      if (this.index === 0) {
        const curIndex = this.children.length - 2;
        setStyle(this.box, {
          'transform': this.getTransform(curIndex),
          'transition-property': 'none',
        } as any);
        this.index = curIndex;
      } else if (this.index === this.children.length - 1) {
        const curIndex = 1;
        setStyle(this.box, {
          'transform': this.getTransform(curIndex),
          'transition-property': 'none',
        } as any);
        this.index = curIndex;
      }

      const { width: newWidth, height: newHeight, left: newLastLeft, top: newLastTop } = this.rect;
      this.temp = {
        width: newWidth,
        height: newHeight,
        lastLeft: newLastLeft,
        lastTop: newLastTop,
      };
    }
  };

  touchmove = (event: TouchEvent) => {
    event.stopPropagation();
    setStyle(this.box, {
      'transform': `translate${this.movement.vertical ? 'Y' : 'X'}(${
        this.vertical ? this.movement.move.y + this.temp.lastTop : this.movement.move.x + this.temp.lastLeft
      }px)`,
      'transition-property': 'transform',
    } as any);
  };

  touchend = () => {
    const moveStep = this.getMoveStep();
    let step = this.index;
    this.host?.scroll({ left: 0, top: 0 });
    if (moveStep === 0) {
      setStyle(this.box, {
        transform: this.getTransform(this.index),
      });
      return;
    }
    if ((this.movement.vertical && this.movement.isBottom()) || (!this.movement.vertical && this.movement.isRight())) {
      step -= moveStep;
    }
    if ((this.movement.vertical && this.movement.isTop()) || (!this.movement.vertical && this.movement.isLeft())) {
      step += moveStep;
    }

    step = this.getOptimalStep(step);
    if (step !== -1) {
      this.index = step;
      this.changeEvent.emit({
        current: this.getCurIndex(step),
        source: 'touch',
        currentItemId: this.descendant[this.getCurIndex(step)].itemId,
      });
    }

    setStyle(this.box, {
      transform: this.getTransform(this.index),
    });
    this.observerAutoPlay(this.autoplay);
  };

  getOptimalStep(number: number) {
    let step = number;
    if (step < 0) {
      step = 0;
    }
    if (step > this.descendant.length - 1) {
      step = this.descendant.length - 1;
    }
    if (this.isAvailable(step)) {
      return step;
    }
    const num = step;
    if ((this.vertical && this.movement.isTop()) || (!this.vertical && this.movement.isLeft())) {
      if (this.descendant[num] && !this.descendant[num].skipHiddenItemLayout) {
        return num;
      }
      return nextAvailable({
        start: this.index,
        end: num,
        list: this.descendant,
        fn: (list, index) => list[index] && !list[index].skipHiddenItemLayout,
      });
    }
    if ((this.vertical && this.movement.isBottom()) || (!this.vertical && this.movement.isRight())) {
      if (this.descendant[num] && !this.descendant[num].skipHiddenItemLayout) {
        return num;
      }
      return prevAvailable({
        start: this.index,
        end: num,
        list: this.descendant,
        fn: (list, index) => list[index] && !list[index].skipHiddenItemLayout,
      });
    }
    return -1;
  }

  isAvailable(step: number) {
    return this.descendant[step] && !this.descendant[step].skipHiddenItemLayout;
  }

  getMoveStep() {
    const moveStep = this.vertical
      ? Math.abs(this.movement.move.y) / this.temp.height
      : Math.abs(this.movement.move.x) / this.temp.width;
    const lastScale = this.vertical
      ? (Math.abs(this.movement.move.y) % this.temp.height) / this.temp.height
      : (Math.abs(this.movement.move.x) % this.temp.width) / this.temp.width;
    if (moveStep > 1) {
      const number = Math.trunc(moveStep);
      if (lastScale > SCALE) {
        return number + 1;
      }
      return number;
    }
    if (moveStep > SCALE) {
      return 1;
    }
    return 0;
  }

  @Method()
  async getInstance() {
    return this;
  }

  @Watch('vertical')
  verticalChange() {
    this.index = this.reallyZero;
    this.children.forEach(child => child.updateDataFromParent(this));
  }

  @Watch('displayMultipleItems')
  itemsChange() {
    this.index = this.reallyZero;
    this.children.forEach(child => child.updateDataFromParent(this));
  }

  @Watch('spaceBetween')
  spaceBetweenChange() {
    this.index = this.reallyZero;
    this.children.forEach(child => child.updateDataFromParent(this));
  }

  get reallyZero() {
    return this.loop ? 1 : 0;
  }

  getSwiperItemRect() {
    const { displayMultipleItems = 1, spaceBetween = 0 } = this;
    if (this.rect) {
      let { width, height } = this.rect;

      if (this.vertical) {
        height = (height - (displayMultipleItems - 1) * spaceBetween) / displayMultipleItems;
      } else {
        width = (width - (displayMultipleItems - 1) * spaceBetween) / displayMultipleItems;
      }
      return { width, height };
    }
    return this.host.getBoundingClientRect();
  }

  getTransform(index: number) {
    let translate = '0px';
    const { spaceBetween = 0 } = this;
    const { height: swiperItemHeight, width: swiperItemWidth } = this.getSwiperItemRect();

    if (this.vertical) {
      const maxHeightPosition =
        (swiperItemHeight + spaceBetween) * this.children.length - spaceBetween - this.rect.height;
      const position = Math.min(maxHeightPosition, (swiperItemHeight + spaceBetween) * index);

      translate = `translateY(-${position}px)`;
    } else {
      const maxPosition = (swiperItemWidth + spaceBetween) * this.children.length - spaceBetween - this.rect.width;
      const position = Math.min(maxPosition, (swiperItemWidth + spaceBetween) * index);

      translate = `translateX(-${position}px)`;
    }
    return translate;
  }

  renderPagation() {
    const { pagination } = this;
    const currentIndex = this.getCurIndex(this.index);
    const children = this.loop ? this.children.slice(1, this.children.length - 1) : this.children;
    switch (pagination) {
      case 'bullets': {
        return (
          <div class={handle('swiper', ['pagination', 'pagination-bullets'])}>
            {children.map((_el, idx) => (
              <div class={join('swiper-pagination-bullet', { active: idx === currentIndex })} />
            ))}
          </div>
        );
      }
      case 'fraction': {
        return (
          <div class={handle('swiper', ['pagination', 'pagination-fraction'])}>
            <span class={handle('swiper', ['pagination-current'])}>{currentIndex + 1}</span>
            <span class={handle('swiper', ['pagination-slash'])}>/</span>
            <span class={handle('swiper', ['pagination-total'])}>{children?.length}</span>
          </div>
        );
      }
      default: {
        return null;
      }
    }
  }

  render() {
    const { duration, index, vertical, extContentClass = '', extClass = '', extStyle } = this;
    const transform = this.getTransform(index);
    const styles = {
      transform,
    };
    if (duration) {
      styles['--swiper-duration'] = `${duration}ms`;
    }
    return (
      <div
        class={`${extClass || ''}`}
        part={extClass}
        style={{ 'height': '100%', 'width': '100%', 'min-width': '0', ...stringToAttrStyle(extStyle) }}
      >
        <div class={join('swiper-wrap', [vertical ? 'vertical' : 'horizontal '])}>
          <div
            class={`${join('swiper', [vertical ? 'vertical' : 'horizontal '])} ${extContentClass}`}
            part={extContentClass}
            style={styles}
            onTransitionEnd={this.onTransitionEnd}
            onTransitionEndCapture={this.onTransitionEnd}
            ref={box => {
              if (box) {
                this.box = box;
              }
            }}
          >
            <slot />
          </div>
          {this.renderPagation()}
        </div>
      </div>
    );
  }
}
