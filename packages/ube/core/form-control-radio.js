import { UbeElement } from './base-element.js'
import '../form-controls.css'
import '../form-control-radio.css'

/**
 * <ube-form-control-radio>
 * Plain accessible radio input with label.
 *
 * Attributes (primitive values):
 *   name         - radio group name (required)
 *   value        - this radio's value (required)
 *   checked      - boolean flag (set via hasAttribute)
 *   disabled     - boolean flag (set via hasAttribute)
 *   label        - visible label text (required)
 *
 * Events:
 *   change       - Standard change event when checked
 *
 * Usage:
 *   <ube-form-control-radio name="theme" value="dark" label="Dark"></ube-form-control-radio>
 *
 *   const radio = document.querySelector('ube-form-control-radio[value="dark"]')
 *   radio.checked = true
 *   radio.addEventListener('change', (e) => console.log('changed'))
 */
class UbeFormControlRadio extends UbeElement {
  constructor() {
    super()
    this._input = null
  }

  static get observedAttributes() {
    return ['name', 'value', 'checked', 'disabled', 'label']
  }

  get name() {
    return this.getAttribute('name') || ''
  }
  set name(val) {
    this.setAttribute('name', val)
  }

  get value() {
    return this.getAttribute('value') || ''
  }
  set value(val) {
    this.setAttribute('value', val)
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
    this._input = this.querySelector('input[type="radio"]')
    if (!this._input) {
      this._input = document.createElement('input')
      this._input.type = 'radio'
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
    if (e.target.checked) {
      this.checked = true
      this._emitEvent('change', { value: this.value, checked: true })
    }
  }

  _render() {
    if (!this._input) return

    const name = this.getAttribute('name')
    const value = this.getAttribute('value')
    const checked = this.hasAttribute('checked')
    const disabled = this.hasAttribute('disabled')
    const label = this.getAttribute('label')

    // Sync input attributes
    if (name) this._input.name = name
    if (value) this._input.value = value
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

customElements.define('ube-form-control-radio', UbeFormControlRadio)
export default UbeFormControlRadio
