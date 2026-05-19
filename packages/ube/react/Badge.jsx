import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-badge>
 * Semantic badge for severity levels, status, and counts.
 *
 * Props match the original Badge component API:
 *   variant: string ('critical' | 'high' | 'medium' | 'best-practice' | 'info' | 'success' | 'warning' | 'neutral')
 *   prefix: string (small prefix label)
 *   bg: string (custom background color)
 *   color: string (custom text color)
 *   onClick: function (makes the badge a button)
 *   className: string
 *   children: ReactNode (badge label)
 *
 * Usage (same as before):
 *   <Badge variant="critical">Critical</Badge>
 *   <Badge variant="high" prefix="SC">2.4.3</Badge>
 *   <Badge variant="success" onClick={handleClick}>Clickable</Badge>
 */
const Badge = forwardRef(function Badge(
  {
    variant,
    prefix,
    bg,
    color,
    onClick,
    className = '',
    children,
    ...rest
  },
  ref
) {
  return (
    <ube-badge
      ref={ref}
      variant={variant}
      prefix={prefix}
      bg={bg}
      color={color}
      is-button={onClick ? 'true' : 'false'}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ube-badge>
  )
})

Badge.displayName = 'Badge'
export default Badge
