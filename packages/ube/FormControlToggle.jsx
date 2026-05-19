import { useRef } from 'react'
import { useAriaDisabled } from './useAriaDisabled.js'
import './form-control-toggle.css'

export default function FormControlToggle({ id, checked, onChange, disabled }) {
  const ref = useRef(null)
  useAriaDisabled(ref, disabled)

  return (
    <span ref={ref} className="toggle">
      <input
        type="checkbox"
        role="switch"
        id={id}
        checked={checked}
        onChange={e => !disabled && onChange(e.target.checked)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !disabled) onChange(!checked)
        }}
        className="toggle__input"
      />
      <span aria-hidden="true" className="toggle__track">
        <span role="presentation" className="toggle__thumb">
          {checked
            ? <span role="presentation" className="toggle__on" />
            : <span role="presentation" className="toggle__off" />
          }
        </span>
      </span>
    </span>
  )
}
