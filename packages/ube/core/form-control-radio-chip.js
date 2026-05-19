import { UbeElement } from './base-element.js'
import '../form-control-radio-chip.css'

/**
 * <ube-form-control-radio-chip>
 * Radio button styled as a selectable chip.
 * Use inside <ube-form-control-radio-chip-group>.
 *
 * Attributes (primitive values):
 *   name         - radio group name (required)
 *   value        - this chip's value (required)
 *   label        - visible label (supports \n for line breaks)
 *   current      - the currently selected value (for active state)
 *
 * Events:
 *   change       - fires when selected
 *
 * Usage:
 *   <ube-form-control-radio-chip name="level" value="A" label="Level A" current="A"></ube-form-control-radio-chip>
 */
class UbeFormControlRadioChip extends UbeElement {
  constructor() {
    super()
    this._input = null
    this._label = null
  }

  static get observedAttributes() {
    return ['name', 'value', 'label', 'current']
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

  get current() {
    return this.getAttribute('current') || ''
  }
  set current(val) {
    this.setAttribute('current', val)
  }

  get isActive() {
    return this.current === this.value
  }

  connectedCallback() {
    super.connectedCallback()
    this._setupChip()
  }

  attributeChangedCallback() {
    if (this._initialized) {
      this._render()
    }
  }

  _setupChip() {
    // Create label wrapper
    if (!this._label) {
      this._label = document.createElement('label')
      this._label.className = 'radio-chip'
      this.appendChild(this._label)
    }

    // Create input if needed
    if (!this._input) {
      this._input = document.createElement('input')
      this._input.type = 'radio'
      this._input.className = 'radio-chip__input'
      this._label.appendChild(this._input)

      // Create indicator
      const indicator = document.createElement('span')
      indicator.className = 'radio-chip__indicator'
      indicator.setAttribute('aria-hidden', 'true')
      this._label.appendChild(indicator)

      // Create label text span
      const textSpan = document.createElement('span')
      textSpan.setAttribute('aria-hidden', 'true')
      this._label.appendChild(textSpan)

      // Attach listeners
      this._input.addEventListener('change', this._handleChange)
    }

    this._render()
  }

  _handleChange = () => {
    this.current = this.value
    this._emitEvent('change', { value: this.value })
  }

  _render() {
    if (!this._label || !this._input) return

    const name = this.getAttribute('name')
    const value = this.getAttribute('value')
    const label = this.getAttribute('label') || ''
    const current = this.getAttribute('current')
    const isActive = current === value

    // Sync input
    this._input.name = name
    this._input.value = value
    this._input.checked = isActive
    this._input.setAttribute('aria-label', label.replace(/\n/g, ' '))

    // Update active class
    this._label.classList.toggle('radio-chip--active', isActive)

    // Render label text with line breaks
    const textSpan = this._label.querySelector('span:not([aria-hidden="true"])') || this._label.querySelector('span[aria-hidden="true"]:last-child')
    if (textSpan) {
      textSpan.innerHTML = ''
      const parts = label.split('\n')
      parts.forEach((part, i) => {
        if (i > 0) {
          textSpan.appendChild(document.createElement('br'))
        }
        textSpan.appendChild(document.createTextNode(part))
      })
    }
  }
}

customElements.define('ube-form-control-radio-chip', UbeFormControlRadioChip)
export default UbeFormControlRadioChip
