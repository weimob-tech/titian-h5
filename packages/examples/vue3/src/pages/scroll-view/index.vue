<template>
  <div className="scroll-view-page">
    <div className="page-section">
      <div className="page-section-title">
        <span>Vertical Scroll</span>
        <p>纵向滚动</p>
      </div>
      <div className="page-section-spacing">
        <TiScrollView scroll-y @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
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
        <TiScrollView scroll-x extStyle="width: 100%" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
          <div id="demo1" className="scroll-view-item-h demo-text-1"></div>
          <div id="demo2" className="scroll-view-item-h demo-text-2"></div>
          <div id="demo3" className="scroll-view-item-h demo-text-3"></div>
        </TiScrollView>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { TiScrollView } from '@titian-design/vue';
const upper = () => {
  console.log('到达头部');
};
const lower = () => {
  console.log('到达底部');
};

const scroll = () => {
  console.log('滚动');
};
</script>
<style lang="less">
.scroll-view-page {
  .page-section-spacing {
    margin-top: 60px;

    --scroll-view-width: 100%;
    --scroll-view-height: 300px;
  }

  .scroll-view-item {
    height: 300px;
  }

  .scroll-view-item-h {
    display: inline-block;
    width: 100vw;
    height: 300px;
  }

  .demo-text-1 {
    position: relative;
    align-items: center;
    justify-content: center;

    background-color: #1aad19;

    color: #fff;
    font-size: 18px;
  }

  .demo-text-1 {
    position: relative;
    align-items: center;
    justify-content: center;

    background-color: #1aad19;

    color: #fff;
    font-size: 36px;
  }

  .demo-text-1::before {
    content: 'A';

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  .demo-text-2 {
    position: relative;
    align-items: center;
    justify-content: center;

    background-color: #2782d7;

    color: #fff;
    font-size: 36px;
  }

  .demo-text-2::before {
    content: 'B';

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  .demo-text-3 {
    position: relative;
    align-items: center;
    justify-content: center;

    background-color: #f1f1f1;

    color: #353535;
    font-size: 36px;
  }

  .demo-text-3::before {
    content: 'C';

    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }
}
</style>
