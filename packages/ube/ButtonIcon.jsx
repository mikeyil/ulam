import { forwardRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './buttons.css'

const ButtonIcon = forwardRef(function ButtonIcon({
  icon,
  label,
  onClick,
  disabled,
  busy,
  className = '',
  variant = 'accent',
  ...rest
}, ref) {
  useAriaDisabled(ref, disabled)

  const variantClass = variant === 'accent' ? 'btn--icon-accent' : variant === 'tertiary' ? 'btn--icon-tertiary' : ''
  const busyClass = busy ? ' btn--busy' : ''

  return (
    <button
      ref={ref}
      type="button"
      onClick={disabled ? undefined : onClick}
      aria-label={label}
      aria-busy={busy ? true : undefined}
      className={`btn--icon${variantClass ? ` ${variantClass}` : ''}${busyClass}${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {icon}
    </button>
  )
})

export default ButtonIcon
