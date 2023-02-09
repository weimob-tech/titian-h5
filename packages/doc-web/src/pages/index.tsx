import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

import clsx from 'clsx';
import React, { useState, createContext, useRef, useMemo } from 'react';
import Mark from './_components/mark';
import Pagination from './_components/pagination';
import Page1 from './_home-pages/page1';
import Page2 from './_home-pages/page2';
import Page3 from './_home-pages/page3';
import Page4 from './_home-pages/page4';
import Page5 from './_home-pages/page5';
import Page6 from './_home-pages/page6';
import Page7 from './_home-pages/page7';
import styles from './index.module.scss';

export const UserContext = createContext(null);

export default function Home(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const [leavingPage, setLeavingPage] = useState(0);
  const animationDuration = 300;
  const totalPages = 7;
  const lock = useRef(false);
  const timer = useRef(null);
  const lastTarget = useRef(null);
  const lastDirection = useRef(null);

  const changePage = value => {
    if (value === currentPage) return;
    setTimeout(() => {
      setCurrentPage(value);
    }, animationDuration);
    setLeavingPage(currentPage);
  };

  const handleScroll = event => {
    event.stopPropagation();
    if (lock.current) return;
    const { target } = event;
    let direction;
    if (event.nativeEvent.deltaY < 0) {
      direction = 'up';
    }
    if (event.nativeEvent.deltaY > 0) {
      direction = 'down';
    }
    const isScrolling = lastTarget.current === target && lastDirection.current === direction;
    lastTarget.current = target;
    lastDirection.current = direction;
    if (isScrolling) return;
    lock.current = true;
    timer.current = setTimeout(() => {
      lock.current = false;
    }, animationDuration);
    let value;
    let limit;
    if (direction === 'up') {
      limit = 1;
      value = currentPage - 1;
    } else if (direction === 'down') {
      value = currentPage + 1;
      limit = totalPages;
    } else {
      return;
    }
    if (currentPage === limit) {
      lock.current = false;
      return;
    }
    changePage(value);
  };

  const page = [Page1, Page2, Page3, Page4, Page5, Page6, Page7].map((el, idx) => {
    const count = idx + 1;
    return React.createElement(el, {
      key: count,
      leaving: leavingPage === count,
      display: currentPage === count ? 'flex' : 'none',
    });
  });
  const currentPageMemo = useMemo(() => ({ currentPage }), [currentPage]);
  return (
    <div className={clsx(styles.main)} onWheelCapture={e => handleScroll(e)}>
      <Layout>
        <Head>
          <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/img/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/img/favicon-16x16.png" />
          <link rel="manifest" href="/img/site.webmanifest" />
          <link rel="mask-icon" href="/img/safari-pinned-tab.svg" color="#5bbad5" />
          <link rel="shortcut icon" href="/img/favicon.ico" />
          <meta name="msapplication-TileColor" content="#da532c" />
          <meta name="msapplication-config" content="/img/browserconfig.xml" />
          <meta name="theme-color" content="#ffffff" />
        </Head>
      </Layout>
      <UserContext.Provider value={currentPageMemo}>
        <Pagination total={totalPages} defaultCurrent={currentPage} onChange={i => changePage(i)} />
        {page}
        <Mark value={currentPage} />
      </UserContext.Provider>
    </div>
  );
}
