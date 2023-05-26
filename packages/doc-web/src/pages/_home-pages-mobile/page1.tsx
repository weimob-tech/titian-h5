import { useHistory } from '@docusaurus/router';
import SvgIphone from '@site/src/asset/svg/iphone.svg';
import SvgArrow from '@site/src/asset/svg/nextpage.svg';
import SvgTitian from '@site/src/asset/svg/titian.svg';
import clsx from 'clsx';
import React from 'react';
import Notice from '../_components-mobile/notice';
import styles from './page1.module.scss';

function Page() {
  const history = useHistory();
  const navigatorToDocs = () => {
    history.push('/docs/react/components/start/quick-start');
  };
  const navigatorToExample = () => {
    window.open('https://titian-examples.weimob.com');
  };
  const scrollToNextPage = () => {
    window.scrollTo({
      top: document.body.clientHeight,
      behavior: 'smooth',
    });
  };
  let startY = 0;
  let diff = 0;
  const onTouchStart = e => {
    startY = e.touches[0].pageY;
  };
  const onTouchMove = e => {
    diff = e.touches[0].pageY - startY;
  };
  const onTouchEnd = () => {
    if (diff < -5) {
      scrollToNextPage();
    }
  };

  return (
    <div className={clsx(styles.page)} onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
      <div className={clsx(styles.main)}>
        <div className={clsx(styles.notice)}>
          <Notice
            title={<SvgTitian className={clsx(styles.svg)} />}
            desc="源自微盟移动端核心业务，我们的目标是通过 Titian Mobile 助力开发者实现可持续地提质增效，并不断打造良好的移动端产品体验。"
          />
        </div>
        <div className={clsx(styles.btns)}>
          <div className={clsx(styles.start)} onClick={navigatorToDocs} aria-hidden="true">
            开始使用
          </div>
          <div className={clsx(styles.container)} onClick={navigatorToExample} aria-hidden="true">
            <SvgIphone className={clsx(styles.iphone)} />
          </div>
        </div>
      </div>
      <div className={clsx(styles.box)} onClick={scrollToNextPage} aria-hidden="true">
        <SvgArrow className={clsx(styles.arrow1)} />
        <SvgArrow className={clsx(styles.arrow2)} />
        <SvgArrow className={clsx(styles.arrow3)} />
      </div>
    </div>
  );
}

export default React.memo(Page);
