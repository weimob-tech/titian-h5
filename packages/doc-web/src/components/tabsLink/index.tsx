import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function TabsLink({ id }: { id: string }) {
  const [activeKey, setActiveKey] = useState(0);

  const scroll = () => {
    const offsetTop = document.getElementById(id)?.offsetTop;
    window.scrollTo({
      top: activeKey ? offsetTop - 170 : 0,
      behavior: 'smooth',
    });
  };

  useEffect(scroll, [activeKey]);

  return (
    <div className={styles.tabsLink}>
      <div
        className={!activeKey ? styles.active : ''}
        onClick={() => setActiveKey(0)}
        onKeyDown={() => {}}
        role="presentation"
      >
        使用
      </div>
      <div
        className={activeKey ? styles.active : ''}
        onClick={() => setActiveKey(1)}
        onKeyDown={() => {}}
        role="presentation"
      >
        API
      </div>
    </div>
  );
}
