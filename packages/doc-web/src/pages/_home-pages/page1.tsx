import { useHistory } from '@docusaurus/router';
import MiniQrcode from '@site/src/asset/svg/mini-qrcode.svg';
import SvgTitian from '@site/src/asset/svg/titian.svg';
import Spline from '@splinetool/react-spline';
import clsx from 'clsx';
import React, { useState } from 'react';
import AnimationBox from '../_components/animation-box';
import Notice from '../_components/notice';
import styles from './page1.module.scss';

function Page({ display, leaving }: { display: string; leaving: boolean }) {
  const history = useHistory();
  const [showBgImg, setShowBgImg] = useState(true);
  const [qrcodeTab, setQrcodeTab] = useState('miniprogram');
  const splineUrl = 'https://prod.spline.design/rz-XAmMUHfSQz0LT/scene.splinecode';
  const navigatorTo = () => {
    history.push('/docs/react/components/start/quick-start');
  };
  const splineOnLoad = () => {
    setTimeout(() => {
      setShowBgImg(false);
    }, 200);
  };
  return (
    <div className={clsx(styles.page)} style={{ display }}>
      <AnimationBox position="left" leaving={leaving} className={clsx(styles.left)}>
        <div className={clsx(styles.notice)}>
          <Notice
            title={<SvgTitian />}
            desc="源自微盟移动端核心业务，我们的目标是通过 Titian Mobile 助力开发者实现可持续地提质增效，并不断打造良好的移动端产品体验。"
          />
        </div>

        <div className={clsx(styles.btns)}>
          <div className={clsx(styles.start)} onClick={navigatorTo} onKeyDown={() => {}} role="presentation">
            开始使用
          </div>
          <div className={clsx(styles.container)}>
            <MiniQrcode className={clsx(styles['mini-qrcode'])} />
            <div className={clsx(styles['qrcode-box'])}>
              {qrcodeTab === 'miniprogram' && (
                <img
                  className={clsx(styles.qrcode)}
                  src="https://image-c.weimobwmc.com/sass-admin/59a223c13d3b49628a0130448f0e983a.jpg"
                  alt=""
                />
              )}
              {qrcodeTab === 'h5' && (
                <img
                  className={clsx(styles.qrcode)}
                  src="https://image-c.weimobwmc.com/sass-admin/0b48ccec5a514ac58355a66b98ee1ebe.png"
                  alt=""
                />
              )}
              <div className={clsx(styles['qrcode-tabs'])}>
                <div
                  className={clsx(styles['qrcode-tab'], { [styles.active]: qrcodeTab === 'miniprogram' })}
                  onClick={() => setQrcodeTab('miniprogram')}
                  onKeyDown={() => {}}
                  role="presentation"
                >
                  <span className={clsx(styles['fontsize-10'])}>MiniProgram</span>
                </div>
                <div
                  className={clsx(styles['qrcode-tab'], { [styles.active]: qrcodeTab === 'h5' })}
                  onClick={() => setQrcodeTab('h5')}
                  onKeyDown={() => {}}
                  role="presentation"
                >
                  <span className={clsx(styles['fontsize-10'])}>H5</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimationBox>
      <div className={clsx(styles.right)}>
        <Spline className={clsx(styles.canvas)} scene={splineUrl} onLoad={splineOnLoad} />
        {showBgImg && (
          <div className={clsx(styles.bg)}>
            <img
              width={1920}
              height={1440}
              src="https://image-c.weimobwmc.com/sass-admin/e9dd11a5e90b4d76a244d21f5f258231.png"
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(Page);
