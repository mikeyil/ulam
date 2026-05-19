import { forwardRef, useEffect } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-input-search>
 * Self-contained search field with live or submit mode.
 *
 * Props match the original FormInputSearch component API:
 *   id: string
 *   value: string (controlled value)
 *   onChange: function (value: string)
 *   onSubmit: function (value: string, optional)
 *   onClear: function (optional)
 *   liveSearch: boolean (default: false)
 *   placeholder: string (default: 'Search…')
 *   disabled: boolean
 *   label: string (aria-label on form)
 *   submitAriaLabel: string (default: 'Search')
 *   clearAriaLabel: string (default: 'Clear')
 *   inputRef: ref
 *
 * Usage (same as before):
 *   <FormInputSearch
 *     id="site-search"
 *     value={query}
 *     onChange={setQuery}
 *     liveSearch
 *     label="Search the site"
 *   />
 *
 *   <FormInputSearch
 *     id="site-search"
 *     value={query}
 *     onChange={setQuery}
 *     onSubmit={handleSearch}
 *     label="Search the site"
 *   />
 */
const FormInputSearch = forwardRef(function FormInputSearch(
  {
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
    ...rest
  },
  ref
) {
  // Sync value to web component
  useEffect(() => {
    if (ref?.current) {
      ref.current.value = value || ''
    }
  }, [value, ref])

  // Handle input changes
  const handleInput = (e) => {
    onChange(e.target.value)
    if (liveSearch) {
      onSubmit?.(e.target.value)
    }
  }

  // Handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit?.(value)
  }

  return (
    <ube-form-input-search
      ref={ref}
      id={id}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      live-search={liveSearch ? 'true' : 'false'}
      label={label}
      submit-aria-label={submitAriaLabel}
      clear-aria-label={clearAriaLabel}
      onInput={handleInput}
      onSubmit={handleSubmit}
      {...rest}
    />
  )
})

FormInputSearch.displayName = 'FormInputSearch'
export default FormInputSearch
