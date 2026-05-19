import { useRef } from 'react'
import './form-control-button.css'
import './form-input.css'

/**
 * Consolidated text input wrapper supporting search and clear modes.
 *
 * search={true}      : renders form[role="search"], shows submit button (unless liveSearch=true)
 * liveSearch={true}  : fires onChange on keystroke, hides submit button
 * clearable={true}   : shows clear button when input has value
 * clearIcon          : custom clear button content (default: ✕)
 *
 * Pair with a visible <label> or pass label to set aria-label on wrapper.
 */
export default function FormInputText({
  id,
  type = 'text',
  value,
  onChange,
  onSubmit,
  onClear,
  search = false,
  liveSearch = false,
  clearable = false,
  placeholder,
  disabled = false,
  label,
  submitAriaLabel = 'Search',
  clearAriaLabel = 'Clear',
  clearIcon = '✕',
  wrapClassName = '',
  inputClassName = '',
  clearButtonClassName = '',
  inputRef: externalRef,
  ...rest
}) {
  const internalRef = useRef(null)
  const ref = externalRef || internalRef

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  const handleClear = () => {
    if (onClear) {
      onClear()
    } else {
      onChange('')
    }
    ref.current?.focus()
  }

  const inputElement = (
    <input
      ref={ref}
      id={id}
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      className={`form-input__field${inputClassName ? ` ${inputClassName}` : ''}`}
      {...rest}
    />
  )

  const clearButton = value && (
    <button
      type="button"
      onClick={handleClear}
      aria-label={clearAriaLabel}
      className={`form-input__clear${clearButtonClassName ? ` ${clearButtonClassName}` : ''}`}
    >
      {clearIcon}
    </button>
  )

  // Search mode: form[role="search"] with optional submit button
  if (search) {
    return (
      <form
        role="search"
        className={`form-input form-input--search${liveSearch ? ' form-input--live' : ''}${wrapClassName ? ` ${wrapClassName}` : ''}`}
        onSubmit={handleSubmit}
        aria-label={label}
      >
        {inputElement}
        {clearable && clearButton}
        {!liveSearch && (
          <button
            type="submit"
            disabled={disabled}
            aria-label={submitAriaLabel}
            className="form-input__submit"
          >
            🔍
          </button>
        )}
      </form>
    )
  }

  // Clear mode: div wrapper with clear button
  if (clearable) {
    return (
      <div className={`form-input form-input--with-clear${wrapClassName ? ` ${wrapClassName}` : ''}`}>
        {inputElement}
        {clearButton}
      </div>
    )
  }

  // Plain mode: just the input
  return inputElement
}
