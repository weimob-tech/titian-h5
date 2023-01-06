import { translate } from '@docusaurus/Translate';
import CopyIcon from '@site/src/asset/svg/copy.svg';
import clsx from 'clsx';
// @ts-expect-error: TODO, we need to make theme-classic have type: module
import copy from 'copy-text-to-clipboard';
import React, { useCallback, useState, useRef, useEffect } from 'react';
import styles from './styles.module.css';

export default function CopyButton({ code, className }: { code: string; className: string }) {
  const [isCopied, setIsCopied] = useState(false);
  const copyTimeout = useRef(undefined);
  const handleCopyCode = useCallback(() => {
    copy(code);
    setIsCopied(true);
    copyTimeout.current = window.setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  }, [code]);
  useEffect(() => () => window.clearTimeout(copyTimeout.current), []);
  return (
    <button
      type="button"
      aria-label={
        isCopied
          ? translate({
              id: 'theme.CodeBlock.copied',
              message: 'Copied',
              description: 'The copied button label on code blocks',
            })
          : translate({
              id: 'theme.CodeBlock.copyButtonAriaLabel',
              message: 'Copy code to clipboard',
              description: 'The ARIA label for copy code blocks button',
            })
      }
      title={translate({
        id: 'theme.CodeBlock.copy',
        message: 'Copy',
        description: 'The copy button label on code blocks',
      })}
      className={clsx('clean-btn', className, styles.copyButton, isCopied && styles.copyButtonCopied)}
      onClick={handleCopyCode}
    >
      <span className={styles.copyButtonIcons} aria-hidden="true">
        {/* <svg className={styles.copyButtonIcon} viewBox="0 0 24 24">
          <path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" />
        </svg> */}
        <CopyIcon className={styles.copyButtonIcon} />
        {/* <svg
          className={styles.copyButtonIcon}
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.9427 6.25022C17.3022 6.25022 17.5983 6.52355 17.6338 6.87355L17.6372 6.94466V14.7224C17.6372 15.4753 17.3462 16.1989 16.825 16.7421C16.3037 17.2853 15.5927 17.6059 14.8405 17.6369L14.7205 17.6391H6.94271C6.76414 17.6399 6.59211 17.5719 6.46236 17.4493C6.3326 17.3266 6.2551 17.1586 6.24595 16.9803C6.2368 16.8019 6.2967 16.6269 6.4132 16.4916C6.52971 16.3563 6.69388 16.271 6.8716 16.2535L6.94271 16.2502H14.7205C15.1095 16.2502 15.4839 16.1018 15.7673 15.8353C16.0507 15.5687 16.2217 15.2041 16.2455 14.8158L16.2483 14.7224V6.94466C16.2483 6.56133 16.5594 6.25022 16.9427 6.25022ZM12.4983 2.36133C12.9595 2.3613 13.4032 2.53775 13.7384 2.85448C14.0736 3.17121 14.2749 3.60421 14.301 4.06466L14.3038 4.16688V12.5002C14.3038 12.9614 14.1274 13.4051 13.8107 13.7403C13.4939 14.0756 13.0609 14.2769 12.6005 14.303L12.4983 14.3058H4.16493C3.70374 14.3058 3.26003 14.1294 2.9248 13.8126C2.58958 13.4959 2.38826 13.0629 2.36215 12.6024L2.35938 12.5002V4.16688C2.35934 3.7057 2.53579 3.26198 2.85253 2.92676C3.16926 2.59153 3.60226 2.39022 4.06271 2.36411L4.16493 2.36133H12.4983ZM12.4983 3.75022H4.16493C4.06424 3.75022 3.96696 3.78669 3.89108 3.85287C3.8152 3.91905 3.76585 4.01046 3.75215 4.11022L3.74826 4.16688V12.5002C3.74826 12.7113 3.90493 12.8852 4.10826 12.913L4.16493 12.9169H12.4983C12.599 12.9169 12.6962 12.8804 12.7721 12.8142C12.848 12.7481 12.8973 12.6566 12.911 12.5569L12.9149 12.5002V4.16688C12.9149 4.0662 12.8785 3.96892 12.8123 3.89303C12.7461 3.81715 12.6547 3.7678 12.5549 3.75411L12.4983 3.75022Z"
            fill="#9E9E9E"
          />
        </svg> */}
        <svg className={styles.copyButtonSuccessIcon} viewBox="0 0 24 24">
          <path d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
        </svg>
      </span>
    </button>
  );
}
