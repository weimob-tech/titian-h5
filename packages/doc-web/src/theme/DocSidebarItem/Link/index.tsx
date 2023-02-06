import isInternalUrl from '@docusaurus/isInternalUrl';
import Link from '@docusaurus/Link';
import { ThemeClassNames } from '@docusaurus/theme-common';
import { isActiveSidebarItem } from '@docusaurus/theme-common/internal';
import ActiveIcon from '@site/src/asset/svg/navbar-active.svg';
import IconExternalLink from '@theme/Icon/ExternalLink';
import clsx from 'clsx';
import React from 'react';
import styles from './styles.module.scss';

export default function DocSidebarItemLink({ item, onItemClick, activePath, level, ...props }: any) {
  const { href, label, className, autoAddBaseUrl, customProps } = item;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}
    >
      <Link
        className={clsx('menu__link', !isInternalLink && styles.menuExternalLink, {
          'menu__link--active': isActive,
        })}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}
      >
        {isActive && <ActiveIcon style={{ marginRight: 8 }} />}
        {label}
        {customProps?.suffix && <span className="menu__link--postfix">{customProps.suffix}</span>}
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
