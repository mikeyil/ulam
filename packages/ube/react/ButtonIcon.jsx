import { forwardRef, useEffect } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-button-icon>
 * Icon-only button wrapper. Always requires label for accessibility.
 *
 * Props match the original ButtonIcon component API:
 *   label: string (aria-label, required)
 *   variant: 'accent' | 'tertiary' (default: 'accent')
 *   disabled: boolean
 *   icon: ReactNode (rendered element, required)
 *   onClick: function
 *   className: string
 *
 * Usage (same as before):
 *   <ButtonIcon icon={<X size={20} />} label="Close" onClick={onClose} />
 */
const ButtonIcon = forwardRef(function ButtonIcon(
  {
    label,
    variant = 'accent',
    disabled,
    icon,
    title,
    onClick,
    className = '',
    ...rest
  },
  ref
) {
  // Sync icon to web component property
  useEffect(() => {
    if (ref?.current) {
      ref.current.icon = icon || null
    }
  }, [icon, ref])

  return (
    <ube-button-icon
      ref={ref}
      label={label}
      variant={variant}
      disabled={disabled}
      title={title}
      className={className}
      onClick={onClick}
      {...rest}
    />
  )
})

ButtonIcon.displayName = 'ButtonIcon'
export default ButtonIcon
