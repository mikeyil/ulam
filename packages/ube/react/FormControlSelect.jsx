import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-control-select>
 * Native select element with enhanced styling.
 *
 * Props match the original FormControlSelect component API:
 *   id: string
 *   value: string
 *   onChange: function
 *   disabled: boolean
 *   wrapClass: string (CSS class for wrapper div)
 *   aria-invalid: boolean
 *   aria-describedby: string
 *   children: ReactNode (<option> elements)
 *
 * Usage (same as before):
 *   <FormControlSelect id="framework" value={value} onChange={e => setValue(e.target.value)}>
 *     <option value="react">React</option>
 *     <option value="vue">Vue</option>
 *   </FormControlSelect>
 */
const FormControlSelect = forwardRef(function FormControlSelect(
  {
    id,
    value,
    onChange,
    disabled,
    wrapClass,
    children,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedby,
    ...rest
  },
  ref
) {
  return (
    <ube-form-control-select
      ref={ref}
      id={id}
      value={value}
      disabled={disabled}
      wrap-class={wrapClass}
      aria-invalid={ariaInvalid}
      aria-describedby={ariaDescribedby}
      onChange={onChange}
      {...rest}
    >
      {children}
    </ube-form-control-select>
  )
})

FormControlSelect.displayName = 'FormControlSelect'
export default FormControlSelect
