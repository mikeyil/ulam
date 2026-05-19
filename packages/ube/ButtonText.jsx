import { forwardRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './buttons.css'

const Button = forwardRef(function Button({
  children,
  label,
  activeLabel,
  icon,
  activeIcon,
  active,
  variant = 'primary',
  disabled,
  busy,
  fullWidth,
  error,
  align = 'center',
  size = 'default',
  iconPosition = 'start',
  title,
  onClick,
  className = '',
  ...rest
}, ref) {
  useAriaDisabled(ref, disabled)

  const variantClass = `btn--${variant}`
  const baseClasses = `btn ${variantClass}`
  const stateClass = active ? ' btn__field--success' : ''
  const busyClass = busy ? ' btn--busy' : ''
  const fullWidthClass = fullWidth ? ' btn--full-width' : ''
  const alignClass = align !== 'center' ? ` btn--align-${align}` : ''
  const sizeClass = size !== 'default' ? ` btn--size-${size}` : ''
  const errorClass = error ? ' btn--error' : ''

  const displayIcon = active ? activeIcon : icon
  const displayLabel = active ? activeLabel : label

  const finalClassName = `${baseClasses}${stateClass}${busyClass}${fullWidthClass}${alignClass}${sizeClass}${errorClass}${className ? ` ${className}` : ''}`

  const iconElement = displayIcon && (
    <span className="btn-icon">
      {displayIcon}
    </span>
  )

  return (
    <button
      ref={ref}
      type="button"
      onClick={disabled ? undefined : onClick}
      aria-label={displayLabel}
      aria-busy={busy ? true : undefined}
      title={title}
      className={finalClassName}
      {...rest}
    >
      {iconPosition === 'start' && iconElement}
      {children}
      {iconPosition === 'end' && iconElement}
    </button>
  )
})

export default Button
