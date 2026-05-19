import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-link-skip-to>
 * Skip-to-main link wrapper. Hidden by default, shows on focus for keyboard navigation.
 *
 * Props match the original LinkSkipTo component API:
 *   href: string (link destination, e.g., '#main')
 *   showIcon: boolean (default: true)
 *   onClick: function
 *   onFocus: function
 *   onBlur: function
 *   tabIndex: number
 *   className: string
 *   children: ReactNode (link label)
 *
 * Usage (same as before):
 *   <LinkSkipTo href="#main">Skip to main content</LinkSkipTo>
 */
const LinkSkipTo = forwardRef(function LinkSkipTo(
  {
    href,
    showIcon = true,
    onClick,
    onFocus,
    onBlur,
    tabIndex,
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
      show-icon={showIcon ? 'true' : 'false'}
      className={`link-btn-styled skip-link ${className}`}
      tabIndex={tabIndex}
      onClick={onClick}
      onFocus={onFocus}
      onBlur={onBlur}
      {...rest}
    >
      {children}
    </a>
  )
})

LinkSkipTo.displayName = 'LinkSkipTo'
export default LinkSkipTo
