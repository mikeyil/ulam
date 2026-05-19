import { useRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './form-control-radio-chip.css'

export default function FormControlRadioChip({ name, value, label, current, disabled, onChange }) {
  const ref = useRef(null)
  useAriaDisabled(ref, disabled)

  const isActive = current === value
  return (
    <label
      ref={ref}
      className={`radio-chip${isActive ? ' radio-chip--active' : ''}${disabled ? ' radio-chip--disabled' : ''}`}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isActive}
        onChange={() => !disabled && onChange(value)}
        className="radio-chip__input"
        aria-label={label.replace(/\n/g, ' ')}
      />
      <span className="radio-chip__indicator" aria-hidden="true" />
      <span aria-hidden="true">
        {label.split('\n').flatMap((part, i) => i === 0 ? [part] : [<br key={i} />, part])}
      </span>
    </label>
  )
}
