import { forwardRef } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-control-radio-chip-group>
 * Group container for radio chips.
 *
 * Props match the original FormControlRadioChipGroup component API:
 *   legend: string (fieldset legend, visually hidden)
 *   name: string (radio group name)
 *   value: string (currently selected value)
 *   onChange: function (value: string)
 *   options: array of {value: string, label: string}
 *
 * Usage (same as before):
 *   <FormControlRadioChipGroup
 *     legend="Platform"
 *     name="platform"
 *     value={platform}
 *     onChange={setPlatform}
 *     options={[
 *       { value: 'web', label: 'Web' },
 *       { value: 'native', label: 'Native' },
 *     ]}
 *   />
 */
const FormControlRadioChipGroup = forwardRef(function FormControlRadioChipGroup(
  {
    legend,
    name,
    value,
    onChange,
    options,
    ...rest
  },
  ref
) {
  return (
    <ube-form-control-radio-chip-group
      ref={ref}
      legend={legend}
      name={name}
      value={value}
      options={JSON.stringify(options || [])}
      onChange={(e) => onChange(e.detail.value)}
      {...rest}
    />
  )
})

FormControlRadioChipGroup.displayName = 'FormControlRadioChipGroup'
export default FormControlRadioChipGroup
