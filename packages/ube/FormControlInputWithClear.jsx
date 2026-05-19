import { useRef } from 'react'
import './form-control-field.css'
import './form-control-button.css'
import './form-control-input.css'
import './form-control-input-with-clear.css'

export default function FormControlInputWithClear({
  id,
  type = 'text',
  value,
  onChange,
  onClear,
  clearAriaLabel,
  wrapClassName = '',
  inputClassName = '',
  clearButtonClassName = '',
  clearIcon = '↺',
  inputRef: externalRef,
  ...rest
}) {
  const internalRef = useRef(null)
  const ref = externalRef || internalRef

  const handleClear = () => {
    if (onClear) {
      onClear()
    } else {
      onChange('')
    }
    ref.current?.focus()
  }

  return (
    <div className={`input-with-clear${wrapClassName ? ` ${wrapClassName}` : ''}`}>
      <input
        ref={ref}
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`input-with-clear__input${inputClassName ? ` ${inputClassName}` : ''}`}
        {...rest}
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={clearAriaLabel}
          className={`input-with-clear__button${clearButtonClassName ? ` ${clearButtonClassName}` : ''}`}
        >
          {clearIcon}
        </button>
      )}
    </div>
  )
}
