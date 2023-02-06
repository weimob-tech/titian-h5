//@ts-nocheck
// import { useState, useRef, useEffect } from 'react';
import { TiScrollView } from '@titian-design/mobile-react';
import Page, { OptionType } from '../../components/page';
import './index.less';

const ScrollView = () => {
  const upper = () => {
    console.log('到达头部');
  };
  const lower = () => {
    console.log('到达底部');
  };

  const scroll = () => {
    console.log('滚动');
  };
  return (
    <div className="scroll-view-page">
      <div className="page-section">
        <div className="page-section-title">
          <span>Vertical Scroll</span>
          <p>纵向滚动</p>
        </div>
        <div className="page-section-spacing">
          <TiScrollView scroll-y onScrolltoupper={upper} onScrolltolower={lower} onScroll={scroll}>
            <div id="demo1" className="scroll-view-item demo-text-1"></div>
            <div id="demo2" className="scroll-view-item demo-text-2"></div>
            <div id="demo3" className="scroll-view-item demo-text-3"></div>
          </TiScrollView>
        </div>
      </div>

      <div className="page-section">
        <div className="page-section-title">
          <span>Horizontal Scroll</span>
          <p>横向滚动</p>
        </div>
        <div className="page-section-spacing">
          <TiScrollView
            scroll-x
            extStyle="width: 100%"
            onScroll={scroll}
            onScrolltoupper={upper}
            onScrolltolower={lower}
          >
            <div id="demo1" className="scroll-view-item-h demo-text-1"></div>
            <div id="demo2" className="scroll-view-item-h demo-text-2"></div>
            <div id="demo3" className="scroll-view-item-h demo-text-3"></div>
          </TiScrollView>
        </div>
      </div>
    </div>
  );
};

export default ScrollView;
