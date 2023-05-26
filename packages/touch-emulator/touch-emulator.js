/* eslint-disable no-undef, prefer-rest-params, @typescript-eslint/no-use-before-define, @typescript-eslint/no-loop-func */

(function (window, document, exportName) {
  

  let isMultiTouch = false;
  let multiTouchStartPos;
  let eventTarget;
  let eventTargetList = [];
  const touchElements = {};

  // polyfills
  if (!document.createTouch) {
    document.createTouch = function (view, target, identifier, pageX, pageY, screenX, screenY, clientX, clientY) {
      // auto set
      if (clientX === undefined || clientY === undefined) {
        clientX = pageX - window.pageXOffset;
        clientY = pageY - window.pageYOffset;
      }

      return new Touch(target, identifier, {
        pageX,
        pageY,
        screenX,
        screenY,
        clientX,
        clientY,
      });
    };
  }

  if (!document.createTouchList) {
    document.createTouchList = function () {
      const touchList = new TouchList();
      for (let i = 0; i < arguments.length; i += 1) {
        touchList[i] = arguments[i];
      }
      touchList.length = arguments.length;
      return touchList;
    };
  }

  /**
   * create an touch point
   * @constructor
   * @param target
   * @param identifier
   * @param pos
   * @param deltaX
   * @param deltaY
   * @returns {Object} touchPoint
   */
  function Touch(target, identifier, pos, deltaX, deltaY) {
    deltaX = deltaX || 0;
    deltaY = deltaY || 0;

    this.identifier = identifier;
    this.target = target;
    this.clientX = pos.clientX + deltaX;
    this.clientY = pos.clientY + deltaY;
    this.screenX = pos.screenX + deltaX;
    this.screenY = pos.screenY + deltaY;
    this.pageX = pos.pageX + deltaX;
    this.pageY = pos.pageY + deltaY;
  }

  /**
   * create empty touchlist with the methods
   * @constructor
   * @returns touchList
   */
  function TouchList() {
    const touchList = [];

    touchList.item = function (index) {
      return this[index] || null;
    };

    // specified by Mozilla
    touchList.identifiedTouch = function (id) {
      return this[id + 1] || null;
    };

    return touchList;
  }

  /**
   * Simple trick to fake touch event support
   * this is enough for most libraries like Modernizr and Hammer
   */
  function fakeTouchSupport() {
    const objs = [window, document.documentElement];
    const props = ['ontouchstart', 'ontouchmove', 'ontouchcancel', 'ontouchend'];

    for (let o = 0; o < objs.length; o += 1) {
      for (let p = 0; p < props.length; p += 1) {
        if (objs[o] && objs[o][props[p]] === undefined) {
          objs[o][props[p]] = null;
        }
      }
    }
  }

  /**
   * we don't have to emulate on a touch device
   * @returns {boolean}
   */
  function hasTouchSupport() {
    return (
      'ontouchstart' in window || // touch events
      (window.Modernizr && window.Modernizr.touch) || // modernizr
      (navigator.msMaxTouchPoints || navigator.maxTouchPoints) > 2
    ); // pointer events
  }

  /**
   * disable mouseevents on the page
   * @param ev
   */
  function preventMouseEvents(ev) {
    ev.preventDefault();
    ev.stopPropagation();
  }

  /**
   * only trigger touches when the left mousebutton has been pressed
   * @param touchType
   * @returns {Function}
   */
  function onMouse(touchType) {
    return function (ev) {
      // if (TouchEmulator.ignoreTags.indexOf(ev.target.tagName) < 0) {
      //   // prevent mouse events
      //   preventMouseEvents(ev);
      // }

      if (ev.which !== 1) {
        return;
      }

      // The EventTarget on which the touch point started when it was first placed on the surface,
      // even if the touch point has since moved outside the interactive area of that element.
      // also, when the target doesnt exist anymore, we update it

      if (ev.type === 'mousedown' || !eventTarget || (eventTarget && !eventTarget.dispatchEvent)) {
        const composedPathList = ev.composedPath();
        // Emulating event bubble for DOM inside Web Components from composedPath()[0] to ev.target.

        if (composedPathList.length > 0) {
        
          for(let i = 0; i < composedPathList.length; i +=1){
            if(composedPathList[i]!==ev.target && (eventTargetList.length === 0 || eventTargetList.indexOf(composedPathList[i]) === -1 )){
              eventTargetList.push(composedPathList[i])
            } else {
              break;
            }
          }

          for(let j = 0; j < eventTargetList.length; j +=1){
            processTriggerForOneElement(ev, touchType, eventTargetList[j])
          }
        } else {
          eventTarget = ev.target;
          processTriggerForOneElement(ev, touchType, eventTarget);
        }
      }
    };
  }

  function processTriggerForOneElement(ev, touchType, target) {
    // shiftKey has been lost, so trigger a touchend
    if (isMultiTouch && !ev.shiftKey) {
      triggerTouch('touchend', ev, target);
      isMultiTouch = false;
    }

    triggerTouch(touchType, ev, target);

    // we're entering the multi-touch mode!
    if (!isMultiTouch && ev.shiftKey) {
      isMultiTouch = true;
      multiTouchStartPos = {
        pageX: ev.pageX,
        pageY: ev.pageY,
        clientX: ev.clientX,
        clientY: ev.clientY,
        screenX: ev.screenX,
        screenY: ev.screenY,
      };
      triggerTouch('touchstart', ev, target);
    }

    // reset
    if (ev.type === 'mouseup') {
      multiTouchStartPos = null;
      isMultiTouch = false;
      eventTarget = null;
      eventTargetList = [];
    }
  }

  /**
   * trigger a touch event
   * @param eventName
   * @param mouseEv
   */
  function triggerTouch(eventName, mouseEv, target) {

    const touchEvent = new Event(eventName, {
      bubbles: true,
      cancelable: true,
      composed: true
    });

    touchEvent.altKey = mouseEv.altKey;
    touchEvent.ctrlKey = mouseEv.ctrlKey;
    touchEvent.metaKey = mouseEv.metaKey;
    touchEvent.shiftKey = mouseEv.shiftKey;

    touchEvent.touches = getActiveTouches(mouseEv, eventName);
    touchEvent.targetTouches = getActiveTouches(mouseEv, eventName);
    touchEvent.changedTouches = getChangedTouches(mouseEv, eventName);
    target.dispatchEvent(touchEvent);
  }

  /**
   * create a touchList based on the mouse event
   * @param mouseEv
   * @returns {TouchList}
   */
  function createTouchList(mouseEv) {
    const touchList = new TouchList();

    if (isMultiTouch) {
      const f = TouchEmulator.multiTouchOffset;
      const deltaX = multiTouchStartPos.pageX - mouseEv.pageX;
      const deltaY = multiTouchStartPos.pageY - mouseEv.pageY;

      touchList.push(new Touch(eventTarget, 1, multiTouchStartPos, deltaX * -1 - f, deltaY * -1 + f));
      touchList.push(new Touch(eventTarget, 2, multiTouchStartPos, deltaX + f, deltaY - f));
    } else {
      touchList.push(new Touch(eventTarget, 1, mouseEv, 0, 0));
    }

    return touchList;
  }

  /**
   * receive all active touches
   * @param mouseEv
   * @returns {TouchList}
   */
  function getActiveTouches(mouseEv, eventName) {
    // empty list
    if (mouseEv.type === 'mouseup') {
      return new TouchList();
    }

    const touchList = createTouchList(mouseEv);
    if (isMultiTouch && mouseEv.type !== 'mouseup' && eventName === 'touchend') {
      touchList.splice(1, 1);
    }
    return touchList;
  }

  /**
   * receive a filtered set of touches with only the changed pointers
   * @param mouseEv
   * @param eventName
   * @returns {TouchList}
   */
  function getChangedTouches(mouseEv, eventName) {
    const touchList = createTouchList(mouseEv);

    // we only want to return the added/removed item on multitouch
    // which is the second pointer, so remove the first pointer from the touchList
    //
    // but when the mouseEv.type is mouseup, we want to send all touches because then
    // no new input will be possible
    if (isMultiTouch && mouseEv.type !== 'mouseup' && (eventName === 'touchstart' || eventName === 'touchend')) {
      touchList.splice(0, 1);
    }

    return touchList;
  }

  /**
   * show the touchpoints on the screen
   */
  function showTouches(ev) {
    let touch; let i; let el; let styles;

    // first all visible touches
    for (i = 0; i < ev.touches.length; i += 1) {
      touch = ev.touches[i];
      el = touchElements[touch.identifier];
      if (!el) {
        touchElements[touch.identifier] = document.createElement('div');
        el = touchElements[touch.identifier];

        document.body.appendChild(el);
      }

      styles = TouchEmulator.template(touch);
      Object.keys(styles).forEach(prop => {
        el.style[prop] = styles[prop];
      })
    }

    // remove all ended touches
    if (ev.type === 'touchend' || ev.type === 'touchcancel') {
      for (i = 0; i < ev.changedTouches.length; i += 1) {
        touch = ev.changedTouches[i];
        el = touchElements[touch.identifier];
        if (el) {
          el.parentNode.removeChild(el);
          delete touchElements[touch.identifier];
        }
      }
    }
  }

  /**
   * TouchEmulator initializer
   */
  function TouchEmulator() {
    if (hasTouchSupport()) {
      return;
    }

    fakeTouchSupport();

    window.addEventListener('mousedown', onMouse('touchstart'), true);
    window.addEventListener('mousemove', onMouse('touchmove'), true);
    window.addEventListener('mouseup', onMouse('touchend'), true);

    window.addEventListener('mouseenter', preventMouseEvents, true);
    window.addEventListener('mouseleave', preventMouseEvents, true);
    window.addEventListener('mouseout', preventMouseEvents, true);
    window.addEventListener('mouseover', preventMouseEvents, true);

    // it uses itself!
    window.addEventListener('touchstart', showTouches, true);
    window.addEventListener('touchmove', showTouches, true);
    window.addEventListener('touchend', showTouches, true);
    window.addEventListener('touchcancel', showTouches, true);
  }

  // start distance when entering the multitouch mode
  TouchEmulator.multiTouchOffset = 75;

  // tags that shouldn't swallow mouse events
  TouchEmulator.ignoreTags = ['TEXTAREA', 'INPUT', 'SELECT'];

  /**
   * css template for the touch rendering
   * @param touch
   * @returns object
   */
  TouchEmulator.template = function (touch) {
    const size = 30;
    const transform = `translate(${  touch.clientX - size / 2  }px, ${  touch.clientY - size / 2  }px)`;
    return {
      position: 'fixed',
      left: 0,
      top: 0,
      background: '#fff',
      border: 'solid 1px #999',
      opacity: 0.6,
      borderRadius: '100%',
      height: `${size  }px`,
      width: `${size  }px`,
      padding: 0,
      margin: 0,
      display: 'block',
      overflow: 'hidden',
      pointerEvents: 'none',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      userSelect: 'none',
      webkitTransform: transform,
      mozTransform: transform,
      transform,
      zIndex: 100,
    };
  };

  // export
  if (typeof define === 'function' && define.amd) {
    define(() => TouchEmulator);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = TouchEmulator;
  } else {
    window[exportName] = TouchEmulator;
  }
})(window, document, 'TouchEmulator');
