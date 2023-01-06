import LinkIcon from '@site/src/asset/svg/link.svg';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.css';

export default function LinkButton({ metastring, className }: { metastring: string; className: string }) {
  const links = metastring.match(/link="(.*?)"/);
  const link = links && links.length ? links[1] : '';
  const handleCopyCode = () => window.open(link);

  return (
    <button
      type="button"
      title="CodeSandbox"
      className={clsx('clean-btn', className, styles.linkButton)}
      onClick={handleCopyCode}
    >
      <LinkIcon className={styles.linkButtonIcons} />
    </button>
  );
}
