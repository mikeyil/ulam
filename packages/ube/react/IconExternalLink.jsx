import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-icon-external-link>
 * Decorative external link icon.
 *
 * Props match the original IconExternalLink component API:
 *   size: number (icon size in px, default: 11)
 *   className: string
 *
 * Usage (same as before):
 *   <a href="https://example.com">Visit site <IconExternalLink size={14} /></a>
 */
const IconExternalLink = forwardRef(function IconExternalLink(
  {
    size = 11,
    className = '',
    ...rest
  },
  ref
) {
  return (
    <ube-icon-external-link
      ref={ref}
      size={size}
      className={['external-link-icon', className].filter(Boolean).join(' ')}
      {...rest}
    />
  )
})

IconExternalLink.displayName = 'IconExternalLink'
export default IconExternalLink
