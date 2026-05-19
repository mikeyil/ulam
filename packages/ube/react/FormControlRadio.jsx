import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-control-radio>
 * Plain accessible radio input with label wrapper.
 *
 * Props match the original FormControlRadio component API:
 *   name: string (radio group name, required)
 *   value: string (this radio's value, required)
 *   checked: boolean
 *   label: string (visible label text, required)
 *   disabled: boolean
 *   onChange: function
 *   className: string
 *
 * Usage (same as before):
 *   <FormControlRadio name="theme" value="dark" label="Dark" checked={theme === 'dark'} onChange={() => setTheme('dark')} />
 */
const FormControlRadio = forwardRef(function FormControlRadio(
  {
    name,
    value,
    checked,
    label,
    disabled,
    onChange,
    className = '',
    ...rest
  },
  ref
) {
  return (
    <ube-form-control-radio
      ref={ref}
      name={name}
      value={value}
      checked={checked}
      label={label}
      disabled={disabled}
      className={className}
      onChange={onChange}
      {...rest}
    />
  )
})

FormControlRadio.displayName = 'FormControlRadio'
export default FormControlRadio
