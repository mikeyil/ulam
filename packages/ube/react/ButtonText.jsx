import { forwardRef, useEffect } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-button-text>
 * Wraps the vanilla web component, handles React-specific patterns (JSX icons, callbacks)
 *
 * Props match the original ButtonText component API:
 *   variant: 'primary' | 'secondary' | 'tertiary' | 'danger'
 *   disabled: boolean
 *   active: boolean
 *   fullWidth: boolean
 *   label: string (aria-label)
 *   activeLabel: string (aria-label when active)
 *   icon: ReactNode (rendered element)
 *   activeIcon: ReactNode (rendered element when active)
 *   onClick: function
 *   className: string
 *   children: ReactNode (button text)
 *
 * Usage (same as before):
 *   <ButtonText variant="primary" onClick={save}>Save</ButtonText>
 *   <ButtonText icon={<Star size={16} />} active={saved}>Save</ButtonText>
 */
const ButtonText = forwardRef(function ButtonText(
  {
    children,
    label,
    activeLabel,
    icon,
    activeIcon,
    active,
    variant = 'primary',
    disabled,
    fullWidth,
    title,
    onClick,
    className = '',
    ...rest
  },
  ref
) {
  // Sync icon/activeIcon to web component properties
  useEffect(() => {
    if (ref?.current) {
      ref.current.icon = icon || null
    }
  }, [icon, ref])

  useEffect(() => {
    if (ref?.current) {
      ref.current.activeIcon = activeIcon || null
    }
  }, [activeIcon, ref])

  return (
    <ube-button-text
      ref={ref}
      variant={variant}
      disabled={disabled}
      active={active}
      full-width={fullWidth}
      label={label}
      active-label={activeLabel}
      title={title}
      className={className}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ube-button-text>
  )
})

ButtonText.displayName = 'ButtonText'
export default ButtonText
