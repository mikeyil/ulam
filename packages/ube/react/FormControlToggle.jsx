import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-control-toggle>
 * Accessible switch/toggle input.
 *
 * Props match the original FormControlToggle component API:
 *   id: string
 *   checked: boolean
 *   onChange: function (checked: boolean)
 *   disabled: boolean
 *
 * Usage (same as before):
 *   <label htmlFor="live-search">
 *     <FormControlToggle id="live-search" checked={liveSearch} onChange={setLiveSearch} />
 *     Live search
 *   </label>
 */
const FormControlToggle = forwardRef(function FormControlToggle(
  {
    id,
    checked,
    onChange,
    disabled,
    ...rest
  },
  ref
) {
  return (
    <ube-form-control-toggle
      ref={ref}
      id={id}
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      {...rest}
    />
  )
})

FormControlToggle.displayName = 'FormControlToggle'
export default FormControlToggle
