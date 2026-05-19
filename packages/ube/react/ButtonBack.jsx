import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-button-back>
 * RTL-aware back chevron button wrapper.
 *
 * Props match the original ButtonBack component API:
 *   label: string (aria-label, required)
 *   onClick: function
 *   className: string
 *
 * Usage (same as before):
 *   <ButtonBack onClick={onBack} label="Back to results" />
 *
 * The component automatically responds to html[dir="rtl"] and flips the icon direction.
 */
const ButtonBack = forwardRef(function ButtonBack(
  {
    label,
    onClick,
    className = '',
    ...rest
  },
  ref
) {
  return (
    <ube-button-back
      ref={ref}
      label={label}
      className={className}
      onClick={onClick}
      {...rest}
    />
  )
})

ButtonBack.displayName = 'ButtonBack'
export default ButtonBack
