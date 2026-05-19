import { useRef, useEffect } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './form-control-button.css'
import './form-input.css'

/**
 * Consolidated text input wrapper supporting search and clear modes.
 *
 * @param {string} type - Input type (default: 'text')
 * @param {string} value - Input value
 * @param {Function} onChange - Called with new value on input change
 * @param {Function} onSubmit - Called on form submit (search mode only, if showSubmit=true)
 * @param {Function} onClear - Called on clear button click (optional, clears value if not provided)
 * @param {boolean} search - Render as form[role="search"] (default: false)
 * @param {boolean} liveSearch - Fires onChange on keystroke, requires search=true (default: false)
 * @param {boolean} showSubmit - Show submit button in search mode (default: true)
 * @param {boolean} clearable - Show clear button when value present (default: false)
 * @param {string} placeholder - Input placeholder text
 * @param {boolean} disabled - Disable input and apply aria-disabled
 * @param {string} label - Aria label or form label text
 * @param {string} width - Custom width (CSS value, default: 100%)
 * @param {string} height - Custom height (CSS value, default: auto)
 * @param {string} submitAriaLabel - Aria label for submit button (default: 'Search')
 * @param {string} clearAriaLabel - Aria label for clear button (default: 'Clear')
 * @param {string} clearIcon - Clear button content (default: ✕)
 * @param {string} wrapClassName - Additional wrapper classes
 * @param {string} inputClassName - Additional input classes
 * @param {string} clearButtonClassName - Additional clear button classes
 * @param {Ref} inputRef - Ref to input element
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
  showSubmit = true,
  clearable = false,
  placeholder,
  disabled = false,
  label,
  width = '100%',
  height,
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
  const wrapperRef = useRef(null)

  useAriaDisabled(wrapperRef, disabled)

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

  const wrapperStyle = {
    width,
    ...(height && { height }),
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
        ref={wrapperRef}
        role="search"
        style={wrapperStyle}
        className={`form-input form-input--search${liveSearch ? ' form-input--live' : ''}${wrapClassName ? ` ${wrapClassName}` : ''}`}
        onSubmit={handleSubmit}
        aria-label={label}
      >
        {inputElement}
        {clearable && clearButton}
        {showSubmit && !liveSearch && (
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
      <div
        ref={wrapperRef}
        style={wrapperStyle}
        className={`form-input form-input--with-clear${wrapClassName ? ` ${wrapClassName}` : ''}`}
      >
        {inputElement}
        {clearButton}
      </div>
    )
  }

  // Plain mode: div wrapper for consistency
  return (
    <div
      ref={wrapperRef}
      style={wrapperStyle}
      className={`form-input${wrapClassName ? ` ${wrapClassName}` : ''}`}
    >
      {inputElement}
    </div>
  )
}
