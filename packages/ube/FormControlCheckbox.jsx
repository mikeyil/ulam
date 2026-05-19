import { forwardRef } from 'react'
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
  return (
    <label className={`control__label${className ? ` ${className}` : ''}`}>
      <input
        ref={ref}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        className="control"
        {...rest}
      />
      {label}
    </label>
  )
})

export default FormControlCheckbox
