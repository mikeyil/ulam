import { forwardRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './form-controls.css'
import './form-control-checkbox.css'

const FormControlCheckbox = forwardRef(function FormControlCheckbox({
  checked,
  onChange,
  label,
  disabled,
  className = '',
  ...rest
}, ref) {
  useAriaDisabled(ref, disabled)

  return (
    <label className={`control__label${className ? ` ${className}` : ''}`}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="control"
        {...rest}
      />
      {label}
    </label>
  )
})

export default FormControlCheckbox
