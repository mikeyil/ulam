import { forwardRef, useEffect } from 'react'
import '@ulam/ube/core'

/**
 * React adapter for <ube-form-input-with-clear>
 * Generic text input with a clear button.
 *
 * Props match the original FormInputWithClear component API:
 *   id: string
 *   type: string (default: 'text')
 *   value: string
 *   onChange: function (value: string)
 *   onClear: function (optional, overrides onChange(''))
 *   placeholder: string
 *   disabled: boolean
 *   clearAriaLabel: string
 *   clearIcon: string (default: '↺')
 *   wrapClassName: string
 *   inputClassName: string
 *   clearButtonClassName: string
 *   inputRef: ref
 *
 * Usage (same as before):
 *   <FormInputWithClear
 *     id="filter"
 *     value={filter}
 *     onChange={setFilter}
 *     clearAriaLabel="Clear filter"
 *   />
 */
const FormInputWithClear = forwardRef(function FormInputWithClear(
  {
    id,
    type = 'text',
    value,
    onChange,
    onClear,
    placeholder,
    disabled,
    clearAriaLabel,
    clearIcon = '↺',
    wrapClassName = '',
    inputClassName = '',
    clearButtonClassName = '',
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
  }

  // Handle clear action
  const handleClear = () => {
    if (onClear) {
      onClear()
    } else {
      onChange('')
    }
    ref?.current?.focus()
  }

  return (
    <ube-form-input-with-clear
      ref={ref}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      clear-aria-label={clearAriaLabel}
      clear-icon={clearIcon}
      wrap-class={wrapClassName}
      input-class={inputClassName}
      button-class={clearButtonClassName}
      onInput={handleInput}
      {...rest}
    />
  )
})

FormInputWithClear.displayName = 'FormInputWithClear'
export default FormInputWithClear
