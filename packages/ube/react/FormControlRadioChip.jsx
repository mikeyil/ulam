import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-control-radio-chip>
 * Radio button styled as a selectable chip.
 *
 * Props match the original FormControlRadioChip component API:
 *   name: string (radio group name, required)
 *   value: string (this chip's value, required)
 *   label: string (visible label, supports \n for line breaks)
 *   current: string (currently selected value)
 *   onChange: function (value: string)
 *
 * Usage (same as before):
 *   <FormControlRadioChip
 *     name="level"
 *     value="A"
 *     label="Level A"
 *     current={selectedLevel}
 *     onChange={setSelectedLevel}
 *   />
 */
const FormControlRadioChip = forwardRef(function FormControlRadioChip(
  {
    name,
    value,
    label,
    current,
    onChange,
    ...rest
  },
  ref
) {
  return (
    <ube-form-control-radio-chip
      ref={ref}
      name={name}
      value={value}
      label={label}
      current={current}
      onChange={(e) => onChange(e.target.value)}
      {...rest}
    />
  )
})

FormControlRadioChip.displayName = 'FormControlRadioChip'
export default FormControlRadioChip
