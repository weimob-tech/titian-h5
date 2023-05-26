import clsx from 'clsx';
import React, { useState, useRef } from 'react';
import styles from './index.module.scss';

export default function Slider() {
  const slider = useRef(null);
  const [len, setLen] = useState(0);
  const [domClientRect, setDomDomClientRect] = useState(null);
  const [mouseDown, setMouseDown] = useState(false);
  const changeLen = e => {
    let top;
    let height;
    if (domClientRect) {
      top = domClientRect.top;
      height = domClientRect.height;
    } else {
      const dom = slider.current.getBoundingClientRect();
      top = dom.top;
      height = dom.height;
      setDomDomClientRect(dom);
    }
    setLen(height - (e.pageY - top) - 9);
  };
  const onClick = e => {
    changeLen(e);
  };
  const onMouseDown = () => {
    setMouseDown(true);
  };
  const onMouseUp = () => {
    setMouseDown(false);
  };
  const onMouseMove = e => {
    if (mouseDown) {
      changeLen(e);
    }
  };
  return (
    <div className={clsx(styles.slider)} onClick={onClick} onKeyDown={() => {}} role="presentation" ref={slider}>
      <div className={clsx(styles.inner)} style={{ height: `${len}px` }} />
      <div
        className={clsx(styles.ball)}
        style={{ bottom: `${len}px` }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        role="presentation"
      />
    </div>
  );
}
