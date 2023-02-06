import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';

function Pagination({
  total,
  onChange,
  defaultCurrent,
}: {
  total: number;
  defaultCurrent: number;
  onChange: (e: number) => void;
}) {
  const paginationHeight = 348;
  const tagHeight = 18;
  const gap = (paginationHeight - tagHeight) / (total - 1);
  const [translateY, setTranslateY] = useState(gap * (defaultCurrent - 1));
  const [current, setCurrent] = useState(defaultCurrent);
  const onClick = i => {
    setTranslateY(gap * (i - 1));
    setCurrent(i);
    onChange(i);
  };

  const tags = [];
  for (let i = 1; i <= total; i += 1) {
    const value = `${i}`.padStart(2, '0');
    tags.push(
      <div
        key={i}
        className={clsx(styles.tag, current === i && styles.active)}
        onClick={() => onClick(i)}
        onKeyDown={() => {}}
        role="presentation"
      >
        {value}
      </div>,
    );
  }
  useEffect(() => {
    setCurrent(defaultCurrent);
    setTranslateY(gap * (defaultCurrent - 1));
  }, [defaultCurrent]);
  return (
    <div className={clsx(styles.pagination)}>
      <div className={clsx(styles.mark)} style={{ transform: `translateY(${translateY}px)` }} />
      {tags}
    </div>
  );
}

export default React.memo(Pagination);
