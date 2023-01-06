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
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/niuzhuang.png',
    },
    {
      name: 'Robbe.Luo',
      job: 'Developer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/luobeibei.png',
    },
    {
      name: 'Suntgr',
      job: 'Developer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/zhangyang.png',
    },
    {
      name: 'Eleven',
      job: 'Developer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/wangyang.png',
    },
    {
      name: '阿兵',
      job: 'Developer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/abing.png',
    },
    {
      name: 'Zane',
      job: 'Designer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/wangminfei.png',
    },
    {
      name: '黄老实',
      job: 'Designer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/huangcheng.png',
    },
    {
      name: '唔比睇',
      job: 'Designer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/zhangjieming.png',
    },
    {
      name: '王翠花',
      job: 'Designer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/wangcuihua.png',
    },
    {
      name: 'MR.yang',
      job: 'Developer',
      photo: 'https://cdn2.weimob.com/saas/saas-fe-sirius-orion-node/production/157/mengxiangyang.png',
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
