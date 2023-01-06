import clsx from 'clsx';
import React from 'react';
import styles from './index.module.scss';

export default function ColorController({
  value = '#fa2c19',
  onClick,
}: {
  value: string;
  onClick: (e: { label: string; value: string; rgb: number[] }) => void;
}) {
  const colors: { label: string; value: string; rgb: number[] }[] = [
    { label: 'red', value: '#fa2c19', rgb: [250, 44, 25] },
    { label: 'orange', value: '#ffa300', rgb: [255, 163, 0] },
    { label: 'green', value: '#07c160', rgb: [7, 193, 96] },
    { label: 'blue', value: '#2a6ae9', rgb: [42, 106, 233] },
  ];
  return (
    <div className={clsx(styles.colors)}>
      <span className={clsx(styles['controller-title'])}>颜色</span>
      {colors.map(color => (
        <div
          key={color.value}
          className={clsx(styles.color, value === color.value ? styles.checked : '')}
          data-value={color.value}
          onClick={() => onClick(color)}
          onKeyDown={() => {}}
          role="presentation"
          style={{ color: color.value, background: color.value }}
        />
      ))}
    </div>
  );
}
