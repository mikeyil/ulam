import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-link-btn-styled>
 * Anchor element styled as a button.
 *
 * Props match the original LinkBtnStyled component API:
 *   href: string (required)
 *   target: string ('_blank' | '_self' | '_parent' | '_top')
 *   rel: string (e.g., 'noopener noreferrer' for _blank links)
 *   title: string (tooltip)
 *   onClick: function
 *   className: string
 *   children: ReactNode (link label)
 *
 * Usage (same as before):
 *   <LinkBtnStyled href="https://example.com">Visit site</LinkBtnStyled>
 *   <LinkBtnStyled href="#/settings" className="btn--primary">Settings</LinkBtnStyled>
 */
const LinkBtnStyled = forwardRef(function LinkBtnStyled(
  {
    href,
    target,
    rel,
    title,
    onClick,
    className = '',
    children,
    ...rest
  },
  ref
) {
  return (
    <a
      ref={ref}
      href={href}
      target={target}
      rel={rel}
      title={title}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  )
})

LinkBtnStyled.displayName = 'LinkBtnStyled'
export default LinkBtnStyled
