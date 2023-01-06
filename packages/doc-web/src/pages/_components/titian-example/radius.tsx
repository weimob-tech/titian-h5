import clsx from 'clsx';
import React, { useState } from 'react';

import styles from './index.module.scss';

export default function RadiusController({
  max = 20,
  defaultValue = 4,
  onClick,
}: {
  max: number;
  defaultValue: number;
  onClick: (e: number) => void;
}): JSX.Element {
  const [value, setValue] = useState(defaultValue);
  const onChange = e => {
    setValue(e.target.value);
    // 方便去到负值
    onClick(e.target.value - 8);
  };
  return (
    <div className={clsx(styles['radius-box'])}>
      <span className={clsx(styles['controller-title'])}>圆角</span>
      <div className={clsx(styles['slider-box'])}>
        <input
          className={clsx(styles.input)}
          type="range"
          max={max}
          value={value}
          style={{ '--slider-percent': `${(value * 100) / max}%` }}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
