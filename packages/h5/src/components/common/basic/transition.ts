import { isPlainObject } from '../utils';
import { raf } from '../utils/raf';

export interface Timeout {
  exit?: number;
  appear?: number;
}

enum TransitionStatus {
  enter,
  exit,
}

const DEFAULT_TIMEOUT = 300;

export type TransitionName =
  | 'fade'
  | 'fade-down'
  | 'fade-up'
  | 'fade-left'
  | 'fade-right'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'zoom';

const getTransitions = (name: string) => {
  const transitionsMapping = new Map();

  transitionsMapping.set('enter', `titian-${name}-enter titian-${name}-enter-active enterClass enterActiveClass`);
  transitionsMapping.set(
    'enter-done',
    `titian-${name}-enter-done titian-${name}-enter-active enterDoneClass enterActiveClass`,
  );
  transitionsMapping.set('exit', `titian-${name}-exit titian-${name}-exit-active exitClass exitActiveClass`);
  transitionsMapping.set(
    'exit-done',
    `titian-${name}-exit-done titian-${name}-exit-active exitDoneClass exitActiveClass`,
  );

  return transitionsMapping;
};
export default class Transition {
  [x: string]: any;

  get show() {
    return this.$show;
  }

  set show(value: boolean) {
    this.$show = value;
    this.updateShow(value);
  }

  get timeout() {
    return this.$timeout || DEFAULT_TIMEOUT;
  }

  set timeout(value: number | Timeout) {
    this.$timeout = value;
  }

  get name() {
    return this.$name || 'fade';
  }

  set name(value: TransitionName) {
    this.$name = value;
  }

  set enterName(value: TransitionName) {
    this.$enterName = value;
  }

  get enterName() {
    return this.$enterName || this.name;
  }

  set exitName(value: TransitionName) {
    this.$exitName = value;
  }

  get exitName() {
    return this.$exitName || this.name;
  }

  set destroyOnExit(value: boolean) {
    this.$destroyOnExit = value;
  }

  get destroyOnExit() {
    return this.$destroyOnExit || this.name;
  }

  set timingFunction(value: string) {
    this.$timingFunction = value;
  }

  get timingFunction() {
    return this.$timingFunction || 'linear';
  }

  set classes(value: string) {
    this.$classes = value;
  }

  get classes() {
    return this.$classes || '';
  }

  set display(value: boolean) {
    this.$display = value;
  }

  get display() {
    return this.$display || false;
  }

  set transitionEnd(value: boolean) {
    this.$transitionEnd = value;
  }

  get transitionEnd() {
    return this.$transitionEnd;
  }

  set status(value: TransitionStatus) {
    this.$status = value;
  }

  get status() {
    return this.$status;
  }

  updateShow(newValue: boolean, oldValue?: boolean) {
    if (newValue !== oldValue) {
      if (newValue) {
        this.enterHandler();
      } else {
        this.exitHandler();
      }
    }
  }

  private enterHandler() {
    const { name, enterName, timeout } = this;

    const duration = isPlainObject(timeout) ? timeout.appear : timeout;
    const transitionsMapping = getTransitions(enterName || name);
    this.status = TransitionStatus.enter;

    if (this.enterEvent && this.enterEvent.emit) {
      this.enterEvent.emit();
    }

    raf(() => {
      if (this.status !== TransitionStatus.enter) {
        return;
      }

      if (this.enteringEvent && this.enteringEvent.emit) {
        this.enteringEvent.emit();
      }

      this.duration = duration;
      this.initialized = true;
      this.display = true;
      this.classes = transitionsMapping.get('enter');
      raf(() => {
        if (this.status !== TransitionStatus.enter) {
          return;
        }
        this.transitionEnd = false;
        this.classes = transitionsMapping.get('enter-done');
        setTimeout(() => this.onTransitionEnd(), duration as number);
      });
    });
  }

  private exitHandler() {
    const { display, exitName, name, timeout } = this;
    if (!display) return;

    const duration = isPlainObject(timeout) ? timeout.exit || DEFAULT_TIMEOUT : timeout;
    const transitionsMapping = getTransitions(exitName || name);

    this.status = TransitionStatus.exit;

    if (this.exitEvent && this.exitEvent.emit) {
      this.exitEvent.emit();
    }

    raf(() => {
      if (this.status !== TransitionStatus.exit) {
        return;
      }

      if (this.exitingEvent && this.exitingEvent.emit) {
        this.exitingEvent.emit();
      }
      this.classes = transitionsMapping.get('exit');
      this.duration = duration;

      raf(() => {
        if (this.status !== TransitionStatus.exit) {
          return;
        }
        this.transitionEnd = false;
        this.classes = transitionsMapping.get('exit-done');
        setTimeout(() => this.onTransitionEnd(), duration as number);
      });
    });
  }

  private onTransitionEnd() {
    const { display, destroyOnExit, show } = this;

    if (this.transitionEnd) return;

    this.transitionEnd = true;
    if (this.status === TransitionStatus.enter) {
      if (this.enteredEvent && this.enteredEvent.emit) {
        this.enteredEvent.emit();
      }
    } else if (this.exitedEvent && this.exitedEvent.emit) {
      this.exitedEvent.emit();
    }

    if (!show && display) {
      this.classes = '';
      this.display = false;
      if (destroyOnExit) {
        this.initialized = false;
      }
    }
  }
}
