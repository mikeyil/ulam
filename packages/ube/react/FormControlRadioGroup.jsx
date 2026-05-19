import '../form-control-radio.css'

/**
 * FormControlRadioGroup: fieldset + legend + native radio buttons.
 * Standard radio button group with support for disabled state and custom options.
 *
 * @param {string} legend - Label for the fieldset (required, screen-reader only)
 * @param {string} name - Name attribute for radio inputs (required)
 * @param {string|number} value - Selected value
 * @param {Array} options - Array of { value, label } objects
 * @param {Function} onChange - Called with new value when selection changes
 * @param {boolean} disabled - Disable all radios in group
 * @param {string} className - Additional wrapper classes
 */
function FormControlRadioGroup({
  legend,
  name,
  value,
  options = [],
  onChange,
  disabled = false,
  className = '',
  ...rest
}) {
  const handleChange = (e) => {
    if (!disabled) {
      onChange?.(e.target.value)
    }
  }

  return (
    <fieldset
      className={`radio-group-wrapper${className ? ` ${className}` : ''}`}
      aria-disabled={disabled ? 'true' : undefined}
      {...rest}
    >
      <legend className="sr-only">{legend}</legend>
      <div className="radio-group">
        {options.map((opt) => (
          <label key={opt.value} className="radio-control">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              disabled={disabled}
              onChange={handleChange}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

export default FormControlRadioGroup
