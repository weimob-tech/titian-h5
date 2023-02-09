/* eslint-disable @titian/no-more-args */
import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

function AnimationBox({
  position,
  leaving,
  className,
  children,
}: {
  position: string;
  leaving: boolean;
  className: string;
  children: any;
}) {
  const name = (position || '').replace(/^\S/, s => s.toUpperCase());
  let animationName = `animate__fadeIn${name}`;
  if (leaving) {
    animationName = `animate__fadeOut${name}`;
  }
  return <div className={clsx(styles[animationName], styles.container, className)}>{children}</div>;
}

export default React.memo(AnimationBox);
