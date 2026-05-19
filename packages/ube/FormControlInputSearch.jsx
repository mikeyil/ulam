import { useRef } from 'react'
import './form-control-field.css'
import './form-control-button.css'
import './form-control-input.css'
import './form-control-input-search.css'

/**
 * Self-contained search field with form[role="search"] wrapper,
 * optional live search mode, clear button, and submit icon button.
 *
 * liveSearch={true}  : fires onChange on every keystroke, hides submit button
 * liveSearch={false} : shows submit icon button, fires onSubmit on Enter or click
 *
 * Pair with a visible <label> or pass label to set aria-label on the form.
 */
export default function FormControlInputSearch({
  id,
  value,
  onChange,
  onSubmit,
  onClear,
  liveSearch = false,
  placeholder = 'Search…',
  disabled = false,
  label,
  submitAriaLabel = 'Search',
  clearAriaLabel = 'Clear',
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
    onChange('')
    onClear?.()
    ref.current?.focus()
  }

  return (
    <form
      role="search"
      className="input-search"
      onSubmit={handleSubmit}
      aria-label={label}
      {...rest}
    >
      <input
        ref={ref}
        id={id}
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={disabled}
        placeholder={placeholder}
        className="input-search__input"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          aria-label={clearAriaLabel}
          className="input-search__clear"
        >
          ✕
        </button>
      )}
      {!liveSearch && (
        <button
          type="submit"
          disabled={disabled}
          aria-label={submitAriaLabel}
          className="input-search__submit"
        >
          🔍
        </button>
      )}
    </form>
  )
}
