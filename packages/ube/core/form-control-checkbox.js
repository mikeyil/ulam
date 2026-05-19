import { UbeElement } from './base-element.js'
import '../form-controls.css'
import '../form-control-checkbox.css'

/**
 * <ube-form-control-checkbox>
 * Plain accessible checkbox input with label.
 *
 * Attributes (primitive values):
 *   checked      - boolean flag (set via hasAttribute)
 *   disabled     - boolean flag (set via hasAttribute)
 *   label        - visible label text (required)
 *
 * Events:
 *   change       - Standard change event when checked/unchecked
 *
 * Usage:
 *   <ube-form-control-checkbox label="Accept terms"></ube-form-control-checkbox>
 *
 *   const cb = document.querySelector('ube-form-control-checkbox')
 *   cb.checked = true
 *   cb.addEventListener('change', (e) => console.log('toggled'))
 */
class UbeFormControlCheckbox extends UbeElement {
  constructor() {
    super()
    this._input = null
  }

  static get observedAttributes() {
    return ['checked', 'disabled', 'label']
  }

  get checked() {
    return this.hasAttribute('checked')
  }
  set checked(val) {
    this.toggleAttribute('checked', val)
    if (this._input) {
      this._input.checked = val
    }
  }

  get disabled() {
    return this.hasAttribute('disabled')
  }
  set disabled(val) {
    this.toggleAttribute('disabled', val)
    this._applyAriaDisabled(val)
  }

  connectedCallback() {
    super.connectedCallback()
    this._setupInput()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupInput() {
    this._input = this.querySelector('input[type="checkbox"]')
    if (!this._input) {
      this._input = document.createElement('input')
      this._input.type = 'checkbox'
      this._input.className = 'control'

      const label = document.createElement('label')
      label.className = 'control__label'
      label.appendChild(this._input)
      label.appendChild(document.createTextNode(''))
      this.appendChild(label)
    }

    // Attach change listener
    this._input.addEventListener('change', this._handleChange)
    this._render()
  }

  _handleChange = (e) => {
    if (this.hasAttribute('aria-disabled')) return
    this.checked = e.target.checked
    this._emitEvent('change', { checked: e.target.checked })
  }

  _render() {
    if (!this._input) return

    const checked = this.hasAttribute('checked')
    const disabled = this.hasAttribute('disabled')
    const label = this.getAttribute('label')

    // Sync input attributes
    this._input.checked = checked
    this._input.toggleAttribute('aria-disabled', disabled)

    // Sync label text
    const labelEl = this._input.parentElement
    if (labelEl && labelEl.classList.contains('control__label')) {
      const textNode = Array.from(labelEl.childNodes).find(n => n.nodeType === 3)
      if (textNode) {
        textNode.textContent = label || ''
      }
    }
  }
}

customElements.define('ube-form-control-checkbox', UbeFormControlCheckbox)
export default UbeFormControlCheckbox
