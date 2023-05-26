import useIsBrowser from '@docusaurus/useIsBrowser';
import React, { useState, useEffect } from 'react';
import styles from './styles.module.scss';

export default function TabsLink({ id }: { id: string }) {
  const isBrowser = useIsBrowser();
  const [isActive, setIsActive] = useState(false);

  const scroll = () => {
    const offsetTop = window.pageYOffset;
    setIsActive(offsetTop > document.getElementById(id).offsetTop - 200);
  };

  useEffect(() => {
    function throttle(func, delay) {
      let timerId;
      return function (...args) {
        if (!timerId) {
          timerId = setTimeout(() => {
            func.apply(this, args);
            timerId = null;
          }, delay);
        }
      };
    }

    window.addEventListener('scroll', throttle(scroll, 100));
    return () => window.removeEventListener('scroll', scroll);
  }, []);

  return (
    <div className={styles.tabsLink}>
      <div
        className={!isActive ? styles.active : ''}
        onClick={() => {
          if (isBrowser) window.location.hash = '';
        }}
        onKeyDown={() => {}}
        role="presentation"
      >
        使用
      </div>
      <a className={isActive ? styles.active : ''} href={`#${id}`}>
        API
      </a>
    </div>
  );
}
