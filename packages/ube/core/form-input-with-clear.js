import { UbeElement } from './base-element.js'
import '../form-control-button.css'
import '../form-input.css'
import '../form-input-with-clear.css'

/**
 * <ube-form-input-with-clear>
 * Generic text input with a clear button. Use for filter fields, tag inputs, etc.
 *
 * Attributes (primitive values):
 *   value              - input value
 *   type               - input type (default: 'text')
 *   id                 - input id
 *   placeholder        - input placeholder
 *   disabled           - boolean flag
 *   clear-aria-label   - aria-label for clear button
 *   clear-icon         - clear button label/icon (default: '↺')
 *   wrap-class         - CSS class for wrapper div
 *   input-class        - CSS class for input
 *   button-class       - CSS class for clear button
 *
 * Events:
 *   input              - Standard input event
 *   change             - Standard change event
 *
 * Usage:
 *   <ube-form-input-with-clear
 *     id="filter"
 *     value="search term"
 *     clear-aria-label="Clear filter"
 *   ></ube-form-input-with-clear>
 *
 *   const input = document.querySelector('ube-form-input-with-clear')
 *   input.addEventListener('input', (e) => console.log(e.target.value))
 *   input.addEventListener('change', (e) => console.log('cleared or changed'))
 */
class UbeFormInputWithClear extends UbeElement {
  constructor() {
    super()
    this._input = null
    this._button = null
    this._wrap = null
  }

  static get observedAttributes() {
    return ['value', 'type', 'id', 'placeholder', 'disabled', 'clear-aria-label', 'clear-icon', 'wrap-class', 'input-class', 'button-class']
  }

  get value() {
    return this._input ? this._input.value : this.getAttribute('value') || ''
  }
  set value(val) {
    this.setAttribute('value', val)
    if (this._input) {
      this._input.value = val
    }
    this._updateButtonVisibility()
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
    // Create wrapper if needed
    if (!this._wrap) {
      this._wrap = document.createElement('div')
      this._wrap.className = 'input-with-clear'
      this.appendChild(this._wrap)
    }

    // Create input if needed
    if (!this._input) {
      this._input = document.createElement('input')
      this._input.className = 'input-with-clear__input'
      this._wrap.appendChild(this._input)
    }

    // Attach input listeners
    this._input.addEventListener('input', this._handleInput)
    this._input.addEventListener('change', this._handleChange)

    this._render()
  }

  _handleInput = (e) => {
    this.setAttribute('value', e.target.value)
    this._updateButtonVisibility()
    this._emitEvent('input', { value: e.target.value })
  }

  _handleChange = (e) => {
    this._emitEvent('change', { value: e.target.value })
  }

  _handleClear = () => {
    const onClear = this.getAttribute('data-on-clear')
    if (!onClear || onClear === 'default') {
      this.value = ''
    }
    this._input?.focus()
    this._emitEvent('clear', { value: '' })
  }

  _updateButtonVisibility() {
    const hasValue = this.value.length > 0

    if (hasValue && !this._button) {
      this._createButton()
    } else if (!hasValue && this._button) {
      this._button.remove()
      this._button = null
    }
  }

  _createButton() {
    if (this._button) return

    this._button = document.createElement('button')
    this._button.type = 'button'
    this._button.className = 'input-with-clear__button'

    const clearAriaLabel = this.getAttribute('clear-aria-label')
    if (clearAriaLabel) {
      this._button.setAttribute('aria-label', clearAriaLabel)
    }

    const clearIcon = this.getAttribute('clear-icon') || '↺'
    this._button.textContent = clearIcon

    this._button.addEventListener('click', this._handleClear)
    this._wrap.appendChild(this._button)
  }

  _render() {
    if (!this._input || !this._wrap) return

    const value = this.getAttribute('value') || ''
    const type = this.getAttribute('type') || 'text'
    const id = this.getAttribute('id')
    const placeholder = this.getAttribute('placeholder')
    const disabled = this.hasAttribute('disabled')
    const wrapClass = this.getAttribute('wrap-class') || ''
    const inputClass = this.getAttribute('input-class') || ''
    const buttonClass = this.getAttribute('button-class') || ''

    // Sync input attributes
    this._input.type = type
    this._input.value = value
    if (id) this._input.id = id
    if (placeholder) this._input.placeholder = placeholder
    this._input.disabled = disabled

    // Sync wrapper classes
    const wrapClasses = ['input-with-clear', wrapClass].filter(Boolean)
    this._wrap.className = wrapClasses.join(' ')

    // Sync input classes
    const inputClasses = ['input-with-clear__input', inputClass].filter(Boolean)
    this._input.className = inputClasses.join(' ')

    // Sync button classes
    if (this._button) {
      const buttonClasses = ['input-with-clear__button', buttonClass].filter(Boolean)
      this._button.className = buttonClasses.join(' ')
    }

    // Update button visibility
    this._updateButtonVisibility()
  }
}

customElements.define('ube-form-input-with-clear', UbeFormInputWithClear)
export default UbeFormInputWithClear
