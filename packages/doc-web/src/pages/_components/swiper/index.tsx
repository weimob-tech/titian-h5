import clsx from 'clsx';
import React, { useState, useEffect, memo } from 'react';
import styles from './index.module.scss';

function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

function Swiper() {
  const group = [
    {
      name: 'Zhuang',
      job: 'Developer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/061735ca585d460cb96f9fea422e0357.png',
    },
    {
      name: 'Robbe.Luo',
      job: 'Developer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/a1d6cc90c48b404489a5d64982255e3c.png',
    },
    {
      name: 'Suntgr',
      job: 'Developer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/34c3a9c7f0274f3fa63aca8944227780.png',
    },
    {
      name: 'Eleven',
      job: 'Developer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/384c66da86e34abeb240323df4f82e2b.png',
    },
    {
      name: '阿兵',
      job: 'Developer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/d1dec801c73140ac8e15630629da4b52.png',
    },
    {
      name: 'Zane',
      job: 'Designer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/4c1e1c19a08a4098be8959622c1e298e.png',
    },
    {
      name: '黄老实',
      job: 'Designer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/35b52228840d439185dcf67863ccb3cc.png',
    },
    {
      name: '唔比睇',
      job: 'Designer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/7abf8b34a9964b10b61fc4833f6e71e6.png',
    },
    {
      name: '王翠花',
      job: 'Designer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/2da536bc326647b9b199e5ae18a8a20e.png',
    },
    {
      name: 'MR.yang',
      job: 'Developer',
      photo: 'https://image-c.weimobwmc.com/sass-admin/4c06460cc0e242a38a45f05ea9f66b0d.png',
    },
  ];
  const totalGroup = [...group, ...group, ...group];
  const list = [[], [], []];
  totalGroup.forEach((el, index) => {
    if (index % 3 === 0) {
      list[0].push(el);
    } else if (index % 3 === 1) {
      list[1].push(el);
    } else if (index % 3 === 2) {
      list[2].push(el);
    }
  });
  const [tag, setTag] = useState('');
  const [index, setIndex] = useState(0);
  const run = async idx => {
    if (index < 0) return;
    await sleep(2000);
    setTag('fadeOut');
    await sleep(300);
    const next = idx === list[0].length - 1 ? 0 : idx + 1;
    setIndex(next);
    setTag('fadeIn');
    run(next);
  };
  useEffect(() => {
    run(index);
    return () => {
      setIndex(-1);
    };
  }, []);
  return (
    <div className={clsx(styles.swiper)}>
      {list.map((el, idx) => (
        <div className={clsx(styles.container)} key={el[index].name}>
          <div
            className={clsx(styles['swiper-item'], styles.animation, styles[`animation-${idx + 1}-${tag}`])}
            style={{ backgroundImage: `url(${el[index].photo})` }}
          >
            <div className={clsx(styles.name)}>{el[index].name}</div>
            <div className={clsx(styles.line)} />
            <div className={clsx(styles.job)}>{el[index].job}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(Swiper);
