import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-control-checkbox>
 * Plain accessible checkbox input with label wrapper.
 *
 * Props match the original FormControlCheckbox component API:
 *   checked: boolean
 *   label: string (visible label text, required)
 *   disabled: boolean
 *   onChange: function
 *   className: string
 *
 * Usage (same as before):
 *   <FormControlCheckbox label="Accept terms" checked={accepted} onChange={setAccepted} />
 */
const FormControlCheckbox = forwardRef(function FormControlCheckbox(
  {
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
    <ube-form-control-checkbox
      ref={ref}
      checked={checked}
      label={label}
      disabled={disabled}
      className={className}
      onChange={onChange}
      {...rest}
    />
  )
})

FormControlCheckbox.displayName = 'FormControlCheckbox'
export default FormControlCheckbox
