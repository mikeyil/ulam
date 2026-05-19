import { forwardRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
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
  useAriaDisabled(ref, disabled)

  return (
    <label className={`control__label${className ? ` ${className}` : ''}`}>
      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="control"
        {...rest}
      />
      {label}
    </label>
  )
})

export default FormControlRadio
