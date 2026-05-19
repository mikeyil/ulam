import { useRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import FormControlRadio from './FormControlRadio.jsx'

/**
 * RadioGroup: fieldset + visually hidden legend + FormControlRadio options.
 *
 * @example
 * <FormControlRadioGroup
 *   legend="Severity"
 *   name="severity"
 *   value={severity}
 *   onChange={setSeverity}
 *   disabled={false}
 *   options={[
 *     { value: 'low',    label: 'Low' },
 *     { value: 'medium', label: 'Medium' },
 *     { value: 'high',   label: 'High' },
 *   ]}
 * />
 */
export default function FormControlRadioGroup({ legend, name, value, onChange, disabled, options }) {
  const ref = useRef(null)
  useAriaDisabled(ref, disabled)

  return (
    <fieldset ref={ref} className="radio-group">
      <legend className="sr-only">{legend}</legend>
      {options.map(opt => (
        <FormControlRadio
          key={opt.value}
          name={name}
          value={opt.value}
          label={opt.label}
          checked={value === opt.value}
          disabled={disabled}
          onChange={onChange}
        />
      ))}
    </fieldset>
  )
}
