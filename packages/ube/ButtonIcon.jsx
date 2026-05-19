import { forwardRef } from 'react'
import Button from './ButtonText.jsx'

// ButtonIcon is now an alias to Button with icon-only defaults.
// Button component handles both icon-only and text variants.
const ButtonIcon = forwardRef(function ButtonIcon({
  icon,
  label,
  ...rest
}, ref) {
  return (
    <Button
      ref={ref}
      icon={icon}
      label={label}
      {...rest}
    />
  )
})

ButtonIcon.displayName = 'ButtonIcon'

export default ButtonIcon
