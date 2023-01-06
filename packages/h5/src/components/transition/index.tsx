import { Component, h, Prop, State, EventEmitter, Event, Watch, Element, Host } from '@stencil/core';
import { BasicComponentAbstract, use } from '../common/basic/BasicComponent';
import Transition, { TransitionName } from '../common/basic/transition';
import { addShadowRootStyle } from '../common/utils';
import * as namespace from '../common/utils/namespace';

export interface Timout {
  exit?: number;
  appear?: number;
}

const DEFAULT_TIMEOUT = 300;

@Component({
  tag: 'ti-transition',
  styleUrls: {
    pc: 'index.pc.less',
    h5: 'index.h5.less',
  },
  shadow: true,
})
export class TiTransition implements BasicComponentAbstract {
  [x: string]: any;

  @Element() host: HTMLElement;

  @Prop() extCss = '';

  @Prop() show = false;

  @Prop() extClass = '';

  @Prop() enterClass = '';

  @Prop() enterActiveClass = '';

  @Prop() enterDoneClass = '';

  @Prop() exitClass = '';

  @Prop() exitActiveClass = '';

  @Prop() exitDoneClass = '';

  @Prop() extStyle = {};

  @Prop() timeout: Timout | number = DEFAULT_TIMEOUT;

  @Prop() name: TransitionName = 'fade';

  @Prop() enterName: string;

  @Prop() exitName: string;

  @Prop() destroyOnExit = false;

  @Prop() timingFunction = 'linear';

  @use(Transition) this;

  @State() classes = '';

  @State() display = false;

  @Event({ eventName: 'enter', bubbles: false, composed: false }) enterEvent: EventEmitter<void>;

  @Event({ eventName: 'entering', composed: false, bubbles: false }) enteringEvent: EventEmitter<void>;

  @Event({ eventName: 'entered', bubbles: false, composed: false }) enteredEvent: EventEmitter<void>;

  @Event({ eventName: 'exit', bubbles: false, composed: false }) exitEvent: EventEmitter<void>;

  @Event({ eventName: 'exiting', composed: false, bubbles: false }) exitingEvent: EventEmitter<void>;

  @Event({ eventName: 'exited', bubbles: false, composed: false }) exitedEvent: EventEmitter<void>;

  componentWillLoad(): void | Promise<void> {
    if (this.show) {
      this.toggleShow(true);
    }

    addShadowRootStyle.call(this);
  }

  @Watch('show')
  private toggleShow(newValue: boolean, oldValue?: boolean) {
    this.updateShow(newValue, oldValue);
  }

  private getClassName() {
    const { classes } = this;
    const classList = [namespace.join('transition'), classes];

    return classList.join(' ');
  }

  private completedStyle() {
    const { duration, timingFunction, display, extStyle } = this;

    let style: Record<string, any> = { ...extStyle };

    if (display) {
      style = {
        '-webkit-transition-duration': `${duration}ms`,
        'transition-duration': `${duration}ms`,
        '-webkit-transition-timing-function': timingFunction,
        'transition-timing-function': timingFunction,
        ...style,
      };
    } else {
      style.display = 'none';
    }
    return style;
  }

  render() {
    const classNames = this.getClassName();
    const parts = classNames
      .split(' ')
      .filter(i => !i.startsWith(namespace.PREFIX))
      .map(i => this[i])
      .concat(this.extClass)
      .join(' ')
      .trim();
    return (
      <Host part={parts} class={`${this.getClassName()} ${parts}`} style={this.completedStyle()}>
        {this.initialized ? <slot /> : null}
      </Host>
    );
  }
}
