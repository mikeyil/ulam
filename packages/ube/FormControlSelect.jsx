import { useRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './form-control-select.css'

export default function FormControlSelect({ id, value, onChange, disabled, wrapClass, children, 'aria-invalid': ariaInvalid, 'aria-describedby': ariaDescribedby, ...rest }) {
  const ref = useRef(null)
  useAriaDisabled(ref, disabled)

  return (
    <div ref={ref} className={`select-wrap${wrapClass ? ` ${wrapClass}` : ''}`}>
      <select
        id={id}
        value={value}
        onChange={e => !disabled && onChange(e)}
        className="select"
        aria-invalid={ariaInvalid}
        aria-describedby={ariaDescribedby}
        {...rest}
      >
        {children}
      </select>
      <svg className="select__chevron" aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  )
}
