import { useThemeConfig } from '@docusaurus/theme-common';
import { useDoc } from '@docusaurus/theme-common/internal';
import useIsBrowser from '@docusaurus/useIsBrowser';
import Bar from '@site/src/asset/svg/mini-program-navbar.svg';
import clsx from 'clsx';
import React from 'react';
import styles from './style.module.scss';

export default function DocItemSideIframe() {
  const { frontMatter } = useDoc();

  // @ts-ignore
  const { baseUrl } = useThemeConfig().sideIframe;

  const { side_iframe_path } = frontMatter;

  if (!side_iframe_path) return null;
  const isBrowser = useIsBrowser();

  const isMiniApp = isBrowser ? window.location.pathname.indexOf('mini-program') !== -1 : false;

  const iframeUrl = `${baseUrl}${side_iframe_path}`;

  return (
    <div className={clsx(styles.iframeBox)}>
      {isMiniApp && !iframeUrl.includes('navbar') && <Bar />}
      <iframe
        title="navigation"
        className={`${clsx(styles.iframe)} ${isMiniApp ? '' : clsx(styles.radius12)}`}
        frameBorder="0"
        src={iframeUrl}
      />
    </div>
  );
}
