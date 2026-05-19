import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-info-box>
 * Informational callout component.
 *
 * Props match the original InfoBox component API:
 *   label: string (optional title)
 *   className: string
 *   children: ReactNode (box content)
 *
 * Usage (same as before):
 *   <InfoBox>This setting affects all platforms.</InfoBox>
 *   <InfoBox label="Note">Additional information</InfoBox>
 */
const InfoBox = forwardRef(function InfoBox(
  {
    label,
    className = '',
    children,
    ...rest
  },
  ref
) {
  return (
    <ube-info-box
      ref={ref}
      label={label}
      className={className}
      {...rest}
    >
      {children}
    </ube-info-box>
  )
})

InfoBox.displayName = 'InfoBox'
export default InfoBox
