import { forwardRef } from 'react'
import './form-controls.css'
import './form-control-radio.css'

const FormControlRadio = forwardRef(function FormControlRadio({
  name,
  value,
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
        type="radio"
        name={name}
        value={value}
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

export default FormControlRadio
