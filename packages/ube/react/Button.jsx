import { forwardRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import '../buttons.css'

/**
 * Universal button component supporting text, icon, or icon+text layouts.
 *
 * @param {ReactNode} children - Button text content (if empty, renders icon-only)
 * @param {string} label - aria-label text for accessibility
 * @param {ReactNode} icon - Icon element to display
 * @param {string} variant - Style variant: primary, secondary, tertiary (default: primary)
 * @param {boolean} disabled - Disable button and set aria-disabled
 * @param {boolean} busy - Loading state, sets aria-busy and prevents pointer events
 * @param {boolean} active - Success/active state (visual feedback)
 * @param {boolean} fullWidth - Stretch to container width
 * @param {string} align - Text alignment: left, center, right (default: center)
 * @param {string} size - Size variant: compact, default, large (default: default)
 * @param {string} iconPosition - Icon placement: start, end (default: start)
 * @param {boolean} error - Error state styling
 * @param {string} title - Tooltip text
 * @param {Function} onClick - Click handler
 * @param {string} className - Additional CSS classes
 */
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

  const displayIcon = active ? activeIcon : icon
  const displayLabel = active ? activeLabel : label
  const isIconOnly = displayIcon && !children

  // Icon-only button variant handling
  let variantClass
  if (isIconOnly) {
    variantClass = variant === 'accent' ? 'btn--icon-accent' : variant === 'tertiary' ? 'btn--icon-tertiary' : ''
  } else {
    variantClass = `btn--${variant}`
  }

  const baseClasses = isIconOnly ? `btn--icon${variantClass ? ` ${variantClass}` : ''}` : `btn ${variantClass}`
  const stateClass = active ? ' btn__field--success' : ''
  const busyClass = busy ? ' btn--busy' : ''
  const fullWidthClass = fullWidth ? ' btn--full-width' : ''
  const alignClass = !isIconOnly && align !== 'center' ? ` btn--align-${align}` : ''
  const sizeClass = !isIconOnly && size !== 'default' ? ` btn--size-${size}` : ''
  const errorClass = error ? ' btn--error' : ''

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
