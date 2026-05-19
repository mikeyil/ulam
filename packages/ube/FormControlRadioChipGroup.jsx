import { useRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import FormControlRadioChip from './FormControlRadioChip.jsx'

/**
 * RadioChipGroup: fieldset + visually hidden legend + RadioChip options.
 *
 * @example
 * <FormControlRadioChipGroup
 *   legend="Platform"
 *   name="platform"
 *   value={platform}
 *   onChange={setPlatform}
 *   disabled={false}
 *   options={[
 *     { value: 'all',    label: 'All' },
 *     { value: 'web',    label: 'Web' },
 *     { value: 'native', label: 'Native' },
 *   ]}
 * />
 */
export default function FormControlRadioChipGroup({ legend, name, value, onChange, disabled, options }) {
  const ref = useRef(null)
  useAriaDisabled(ref, disabled)

  return (
    <fieldset ref={ref}>
      <legend className="sr-only">{legend}</legend>
      <div className="radio-chip-group">
        {options.map(opt => (
          <FormControlRadioChip
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            current={value}
            disabled={disabled}
            onChange={onChange}
          />
        ))}
      </div>
    </fieldset>
  )
}
